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
    let isMounted = true;

    fetchUserProfile().then(({ user, profile, roleData }) => {
      if (isMounted) {
        setUser(user);
        setProfile(profile);
        setRoleData(roleData || []);
        setLoading(false);
      }
    });

    const authListener = subscribeToAuthChanges(
      (newUser, newProfile, newRoleData) => {
        if (isMounted) {
          setUser(newUser);
          setProfile(newProfile);
          setRoleData(newRoleData || []);
          setLoading(false);
        }
      },
      () => {
        if (isMounted) setLoading(true);
      }
    );

    return () => {
      isMounted = false;
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
