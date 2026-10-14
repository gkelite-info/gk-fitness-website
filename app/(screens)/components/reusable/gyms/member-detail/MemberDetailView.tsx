"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import { useRouter, useSearchParams } from "next/navigation";
import MemberProfileBanner from "./MemberProfileBanner";
import PersonalInfoPanel from "./PersonalInfoPanel";
import AccountInfoPanel from "./AccountInfoPanel";
import TrainerProfileDetail from "./TrainerProfileDetail";
import OwnerProfileDetail from "./OwnerProfileDetail";
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
  const searchParams = useSearchParams();
  const fromSource = searchParams.get("from");
  const profile = getMemberProfile(role, memberId);
  const isTrainer = role.includes("trainer");
  const isOwner = role.includes("owner");

  const getHeaderTitle = () => {
    if (isTrainer) return "Trainer Information";
    if (isOwner) return "Owner Information";
    return "Customer Information";
  };

  const handleBack = () => {
    if (fromSource) {
      let targetPath = fromSource;
      try {
        targetPath = decodeURIComponent(fromSource);
      } catch {
        targetPath = fromSource;
      }

      if (targetPath.startsWith("/")) {
        router.push(targetPath);
        return;
      }
      if (targetPath === "users") {
        const tab = isTrainer
          ? "trainers"
          : isOwner
          ? "owners"
          : "gym-customers";
        router.push(`/superadmin/users?tab=${tab}`);
        return;
      }
      if (targetPath === "gym-customers") {
        router.push("/superadmin/users?tab=gym-customers");
        return;
      }
      if (targetPath === "owners") {
        router.push("/superadmin/users?tab=owners");
        return;
      }
      if (targetPath === "trainers" || targetPath === "gym-trainers") {
        router.push("/superadmin/users?tab=trainers");
        return;
      }
      router.push(targetPath);
      return;
    }

    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }

    const tabName = isTrainer
      ? "trainers"
      : isOwner
      ? "owners"
      : "customers";
    router.push(`/superadmin/gyms/${gymId}?tab=${tabName}`);
  };

  return (
    <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-5 sm:gap-6 max-w-full overflow-x-hidden">
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

      {isTrainer ? (
        <TrainerProfileDetail profile={profile} />
      ) : isOwner ? (
        <OwnerProfileDetail profile={profile} gymId={gymId} />
      ) : (
        <div className="flex flex-col gap-5 w-full min-w-0 max-w-5xl mx-auto">
          <MemberProfileBanner profile={profile} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full min-w-0">
            <PersonalInfoPanel profile={profile} />
            <AccountInfoPanel profile={profile} />
          </div>
        </div>
      )}
    </div>
  );
}
