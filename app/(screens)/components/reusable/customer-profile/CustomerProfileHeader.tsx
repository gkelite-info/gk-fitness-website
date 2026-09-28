"use client";

import { Pen, CaretLeft } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

interface CustomerProfileHeaderProps {
  onEditMember?: () => void;
}

export default function CustomerProfileHeader({ onEditMember }: CustomerProfileHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full shrink-0">
      <div className="flex flex-row items-center gap-3">
        <button 
          onClick={() => router.back()}
          className="flex items-center justify-center w-9 h-9 bg-[#11151D] border border-[#242C3A] rounded-xl hover:bg-white/5 transition-colors shrink-0 cursor-pointer"
        >
          <CaretLeft size={20} className="text-[#7E8B9F]" weight="bold" />
        </button>
        <div className="flex flex-col items-start gap-1">
          <h1 className="font-sans font-bold text-2xl sm:text-[30px] leading-9 tracking-tight text-white m-0">
            Customer Profile
          </h1>
          <p className="font-sans font-normal text-sm leading-5 text-[#9CA3AF] m-0">
            View and manage member details, membership, trainer and more.
          </p>
        </div>
      </div>
      <button 
        onClick={onEditMember}
        className="flex flex-row items-center px-4 py-2 gap-2 bg-white/5 border border-[rgba(210,248,2,0.6)] shadow-sm rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
      >
        <Pen size={14} className="text-[#D2F802]" />
        <span className="font-sans font-semibold text-xs leading-4 text-[#D2F802]">
          Edit Member
        </span>
      </button>
    </div>
  );
}
