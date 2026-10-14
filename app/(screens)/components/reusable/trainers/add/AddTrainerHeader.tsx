"use client";

import { CaretLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

interface AddTrainerHeaderProps {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
}

export default function AddTrainerHeader({
  title = "Add New Global Trainer",
  subtitle = "Add trainer details and create their account",
  onBack,
}: AddTrainerHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
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
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] mt-0.5">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
