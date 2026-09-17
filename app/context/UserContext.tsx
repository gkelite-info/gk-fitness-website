"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { fetchUserProfile, subscribeToAuthChanges } from "@/app/api/supabase/helpers";
import { User } from "@supabase/supabase-js";

interface UserProfile {
  userId: string;
  name: string;
  email: string;
  role: string;
  status: string;
  profilePhoto: string | null;
}

interface UserContextType {
  user: User | null;
  profile: UserProfile | null;
  roleData: any[];
  loading: boolean;
  role: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [roleData, setRoleData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const { user, profile, roleData } = await fetchUserProfile();
      setUser(user);
      setProfile(profile);
      setRoleData(roleData || []);
      setLoading(false);
    }

    loadUser();

    const authListener = subscribeToAuthChanges((newUser, newProfile, newRoleData) => {
      setLoading(true);
      setUser(newUser);
      setProfile(newProfile);
      setRoleData(newRoleData || []);
      setLoading(false);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, profile, roleData, loading, role: profile?.role || null }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
