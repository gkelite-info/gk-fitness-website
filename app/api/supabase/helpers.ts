import { createClient } from "@/app/api/supabase/client";
import { User } from "@supabase/supabase-js";

async function fetchRoleData(supabase: any, role: string, userId: string, email: string) {
  switch (role) {
    case 'owner': {
      const { data } = await supabase.from('gym_owners').select('*').eq('userId', userId);
      return data || [];
    }
    case 'trainer': {
      const { data } = await supabase.from('gym_trainers').select('*').eq('userId', userId);
      return data || [];
    }
    case 'globaltrainer': {
      const { data } = await supabase.from('global_trainers').select('*').eq('email', email);
      return data || [];
    }
    case 'customer': {
      const { data } = await supabase.from('gym_customers').select('*').eq('email', email);
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
    const { data: userProfile, error } = await supabase
      .from("users")
      .select("*")
      .eq("userId", session.user.id)
      .single();

    if (error || !userProfile) return { user: session.user, profile: null, roleData: [] };

    const roleData = await fetchRoleData(supabase, userProfile.role, session.user.id, userProfile.email);

    return { user: session.user, profile: userProfile, roleData };
  }
  return { user: null, profile: null, roleData: [] };
}

export function subscribeToAuthChanges(
  callback: (user: User | null, profile: any | null, roleData: any[]) => void
) {
  const supabase = createClient();
  const { data: authListener } = supabase.auth.onAuthStateChange(
    async (event, session) => {
      if (session?.user) {
        const { data: userProfile } = await supabase
          .from("users")
          .select("*")
          .eq("userId", session.user.id)
          .single();
          
        if (userProfile) {
           const roleData = await fetchRoleData(supabase, userProfile.role, session.user.id, userProfile.email);
           callback(session.user, userProfile, roleData);
        } else {
           callback(session.user, null, []);
        }
      } else {
        callback(null, null, []);
      }
    }
  );

  return authListener;
}
