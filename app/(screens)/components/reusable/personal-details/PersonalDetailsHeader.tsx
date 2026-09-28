"use client";

import { CaretLeft, Pen } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

interface PersonalDetailsHeaderProps {
  memberCode: string;
  onEdit?: () => void;
}

export default function PersonalDetailsHeader({ memberCode, onEdit }: PersonalDetailsHeaderProps) {
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
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          <h1 className="font-sans font-extrabold text-2xl leading-8 tracking-[-0.6px] text-white m-0">
            Personal Details
          </h1>
          <div className="flex flex-row items-center px-3 py-1 bg-[#11151D] border border-[#242C3A] rounded-full">
            <span className="font-sans font-bold text-xs leading-4 tracking-[0.3px] text-[#7E8B9F]">
              CUSTOMER ID: <span className="text-[#CCFF00]">{memberCode}</span>
            </span>
          </div>
        </div>
      </div>
      
      <button 
        onClick={onEdit}
        className="flex flex-row items-center px-5 py-2.5 gap-2 bg-[#CCFF00] shadow-[0_0_20px_rgba(204,255,0,0.25)] rounded-xl hover:bg-[#bbf000] transition-colors shrink-0 cursor-pointer"
      >
        <Pen size={16} className="text-black" weight="bold" />
        <span className="font-sans font-bold text-sm leading-5 tracking-[0.35px] text-black">
          Edit Personal Details
        </span>
      </button>
    </div>
  );
}
