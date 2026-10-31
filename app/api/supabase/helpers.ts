import { createClient } from "@/app/api/supabase/client";
import { User } from "@supabase/supabase-js";

async function fetchRoleData(supabase: any, role: string, userId: string, email: string) {
  const cleanEmail = email ? email.trim().toLowerCase() : "";
  switch (role) {
    case 'owner': {
      let query = supabase.from('gym_owners').select('*');
      if (userId && cleanEmail) {
        query = query.or(`userId.eq.${userId},ownerEmail.ilike.${cleanEmail}`);
      } else if (userId) {
        query = query.eq('userId', userId);
      } else if (cleanEmail) {
        query = query.ilike('ownerEmail', cleanEmail);
      }
      const { data } = await query;
      return data || [];
    }
    case 'trainer': {
      let query = supabase.from('gym_trainers').select('*');
      if (userId && cleanEmail) {
        query = query.or(`userId.eq.${userId},email.ilike.${cleanEmail}`);
      } else if (userId) {
        query = query.eq('userId', userId);
      } else if (cleanEmail) {
        query = query.ilike('email', cleanEmail);
      }
      const { data } = await query;
      return data || [];
    }
    case 'globaltrainer': {
      const { data } = await supabase.from('global_trainers').select('*').ilike('email', cleanEmail);
      return data || [];
    }
    case 'customer': {
      const { data } = await supabase.from('gym_customers').select('*').ilike('email', cleanEmail);
      if (data && data.length > 0) return data;
      const { data: indivData } = await supabase.from('individual_customer_plans').select('*').eq('userId', userId);
      return indivData || [];
    }
    case 'individual': {
      const { data } = await supabase.from('individual_customer_plans').select('*').eq('userId', userId);
      return data || [];
    }
    default:
      return [];
  }
}

export async function fetchUserProfile() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user) {
    let { data: userProfile } = await supabase
      .from("users")
      .select("*")
      .eq("userId", session.user.id)
      .maybeSingle();

    if (!userProfile && session.user.email) {
      const { data: emailProfile } = await supabase
        .from("users")
        .select("*")
        .ilike("email", session.user.email.toLowerCase().trim())
        .maybeSingle();
      if (emailProfile) {
        userProfile = emailProfile;
      }
    }

    if (!userProfile) return { user: session.user, profile: null, roleData: [] };

    const roleData = await fetchRoleData(supabase, userProfile.role, session.user.id, userProfile.email);

    if ((!userProfile.name || userProfile.name.includes("@")) && roleData && roleData.length > 0) {
      const realName = roleData[0].ownerFullname || roleData[0].fullName || roleData[0].name;
      if (realName) {
        userProfile.name = realName;
      }
    }

    return { user: session.user, profile: userProfile, roleData };
  }
  return { user: null, profile: null, roleData: [] };
}

export function subscribeToAuthChanges(
  callback: (user: User | null, profile: any | null, roleData: any[]) => void,
  onLoading?: () => void
) {
  const supabase = createClient();
  let currentUserId: string | null = null;
  let isFirstEvent = true;

  const { data: authListener } = supabase.auth.onAuthStateChange(
    async (event, session) => {
      if (isFirstEvent) {
        isFirstEvent = false;
        currentUserId = session?.user?.id || null;
        return;
      }

      if (event === "SIGNED_OUT") {
        currentUserId = null;
        if (onLoading) onLoading();
        callback(null, null, []);
        return;
      }

      if (session?.user) {
        if (currentUserId === session.user.id) return;

        currentUserId = session.user.id;
        if (onLoading) onLoading();

        let { data: userProfile } = await supabase
          .from("users")
          .select("*")
          .eq("userId", session.user.id)
          .maybeSingle();

        if (!userProfile && session.user.email) {
          const { data: emailProfile } = await supabase
            .from("users")
            .select("*")
            .ilike("email", session.user.email.toLowerCase().trim())
            .maybeSingle();
          if (emailProfile) {
            userProfile = emailProfile;
          }
        }

        if (userProfile) {
          const roleData = await fetchRoleData(supabase, userProfile.role, session.user.id, userProfile.email);
          if ((!userProfile.name || userProfile.name.includes("@")) && roleData && roleData.length > 0) {
            const realName = roleData[0].ownerFullname || roleData[0].fullName || roleData[0].name;
            if (realName) {
              userProfile.name = realName;
            }
          }
          callback(session.user, userProfile, roleData);
        } else {
          callback(session.user, null, []);
        }
      }
    }
  );

  return authListener;
}

export async function logoutUser() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut({ scope: 'local' });
  if (error) {
    throw error;
  }
}
