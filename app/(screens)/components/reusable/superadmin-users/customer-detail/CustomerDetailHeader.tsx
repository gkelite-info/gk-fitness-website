"use client";

import { CaretLeft } from "@phosphor-icons/react";
import { useRouter, useSearchParams } from "next/navigation";

interface CustomerDetailHeaderProps {
  onBack?: () => void;
}

export default function CustomerDetailHeader({
  onBack,
}: CustomerDetailHeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }
    const from = searchParams.get("from");
    if (from) {
      router.push(decodeURIComponent(from));
      return;
    }
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/superadmin/users?tab=individual-customers");
  };

  return (
    <div className="flex items-center gap-3.5 w-full">
      <button
        type="button"
        onClick={handleBack}
        aria-label="Go back to individual customers"
        className="w-10 h-10 rounded-xl bg-[#13151D] border border-[#222634] flex items-center justify-center text-[#94A3B8] hover:text-white hover:border-[#D4FF32] transition-colors cursor-pointer shrink-0"
      >
        <CaretLeft size={20} weight="bold" />
      </button>

      <div className="flex flex-col">
        <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
          Individual Customer Information
        </h1>
      </div>
    </div>
  );
}
