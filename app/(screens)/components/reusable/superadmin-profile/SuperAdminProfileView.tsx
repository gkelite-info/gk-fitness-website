"use client";

import { useUser } from "@/app/context/UserContext";
import SuperAdminProfileHeader from "./SuperAdminProfileHeader";
import SuperAdminProfileHeroCard from "./SuperAdminProfileHeroCard";
import SuperAdminContactCard from "./SuperAdminContactCard";
import SuperAdminSettingsCard from "./SuperAdminSettingsCard";

export default function SuperAdminProfileView() {
  const { profile } = useUser();

  const name = profile?.name || "Amit Verma";
  const email = profile?.email || "amit.verma@gkgymlife.com";
  const role = profile?.role ? profile.role.toUpperCase().replace("_", " ") : "SUPER ADMIN";
  const status = profile?.status || "Active Member";
  const avatarUrl = profile?.profilePhoto || null;
  const gender = profile?.gender || "male";

  return (
    <div className="w-full bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-5 sm:gap-6 max-w-6xl mx-auto overflow-x-hidden min-w-0 pb-12">
      <SuperAdminProfileHeader />

      <SuperAdminProfileHeroCard
        name={name}
        role={role}
        joinedOn="20 May 2026"
        avatarUrl={avatarUrl}
        gender={gender}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 w-full items-start">
        <SuperAdminContactCard
          email={email}
          phone="+91 98765 43210"
          joinedOn="20 May 2026"
          role={role}
          status={status}
        />

        <SuperAdminSettingsCard />
      </div>
    </div>
  );
}
