"use client";

import { CaretLeft } from "@phosphor-icons/react";
import { useRouter, useSearchParams } from "next/navigation";

interface TrainerProfileHeaderProps {
  trainerCode: string;
}

export default function TrainerProfileHeader({
  trainerCode,
}: TrainerProfileHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleBack = () => {
    const from = searchParams.get("from");
    if (from) {
      if (from.startsWith("/")) {
        router.push(decodeURIComponent(from));
        return;
      }
      if (from === "users") {
        router.push("/superadmin/users?tab=global-trainers");
        return;
      }
      router.push(decodeURIComponent(from));
      return;
    }
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/superadmin/trainers");
  };

  return (
    <div className="flex items-center gap-3.5 w-full">
      <button
        type="button"
        onClick={handleBack}
        aria-label="Go back"
        className="w-10 h-10 rounded-xl bg-[#13151D] border border-[#222634] flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-[#D4FF32] transition-colors cursor-pointer shrink-0"
      >
        <CaretLeft size={20} weight="bold" />
      </button>

      <div className="flex flex-col">
        <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          Global Trainer Profile
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] mt-0.5">
          Trainer ID: {trainerCode}
        </p>
      </div>
    </div>
  );
}
