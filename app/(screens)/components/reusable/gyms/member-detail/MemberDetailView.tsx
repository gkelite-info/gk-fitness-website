"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import MemberProfileBanner from "./MemberProfileBanner";
import PersonalInfoPanel from "./PersonalInfoPanel";
import AccountInfoPanel from "./AccountInfoPanel";
import { getMemberProfile } from "./types";

interface MemberDetailViewProps {
  gymId: string;
  role: string;
  memberId: string;
}

export default function MemberDetailView({
  gymId,
  role,
  memberId,
}: MemberDetailViewProps) {
  const router = useRouter();
  const profile = getMemberProfile(role, memberId);

  const getHeaderTitle = () => {
    if (role.includes("trainer")) return "Trainer Information";
    if (role.includes("owner")) return "Owner Information";
    return "Customer Information";
  };

  const handleBack = () => {
    const tabName = role.includes("trainer")
      ? "trainers"
      : role.includes("owner")
      ? "owners"
      : "customers";
    router.push(`/superadmin/gyms/${gymId}?tab=${tabName}`);
  };

  return (
    <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-full overflow-x-hidden">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleBack}
          aria-label="Back to gym members"
          className="w-9 h-9 flex items-center justify-center bg-[#18202D] hover:bg-[#202B3D] border border-[#263145] rounded-lg text-[#CBD5E1] hover:text-white transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
        >
          <ArrowLeft size={16} weight="bold" />
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          {getHeaderTitle()}
        </h1>
      </div>

      <MemberProfileBanner profile={profile} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full min-w-0">
        <PersonalInfoPanel profile={profile} />
        <AccountInfoPanel profile={profile} />
      </div>
    </div>
  );
}
