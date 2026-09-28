"use client";

import React from "react";
import { CaretLeft, Pen } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

interface MembershipPaymentsHeaderProps {
  memberCode: string;
  onEditPlan?: () => void;
}

export default function MembershipPaymentsHeader({ memberCode, onEditPlan }: MembershipPaymentsHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-4 w-full shrink-0">
      
      <div className="flex flex-col items-start gap-2.5 sm:gap-1 w-full sm:w-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-3 w-full">
          
          <div className="flex flex-row items-center gap-3">
            <button 
              onClick={() => router.back()}
              className="flex items-center justify-center w-10 h-10 bg-[#1D2025] shadow-sm rounded-lg hover:bg-white/5 transition-colors shrink-0"
            >
              <CaretLeft size={20} className="text-white" weight="bold" />
            </button>
            <h1 className="font-sans font-bold text-xl sm:text-2xl leading-7 sm:leading-8 tracking-[-0.6px] text-white m-0">
              Membership & Payments
            </h1>
          </div>
          
          <div className="flex flex-row items-center px-2.5 py-1 gap-1.5 bg-[#1D2025] rounded-full shrink-0">
            <div className="w-1.5 h-1.5 bg-[#9DDF2E] rounded-full" />
            <span className="font-mono font-semibold text-[10px] leading-3 tracking-[0.5px] uppercase text-[#9DDF2E]">
              CUSTOMER ID: <span className="text-[#C4CAAC]">{memberCode}</span>
            </span>
          </div>
        </div>

        <p className="font-sans font-normal text-xs leading-4 text-[#C4CAAC] m-0 w-full pl-0 sm:pl-[52px]">
          Manage subscription tier, upcoming recurring billing cycles, and full payment audit history.
        </p>
      </div>
      
      <button 
        onClick={onEditPlan}
        className="flex flex-row items-center justify-center px-4 py-2.5 gap-2 bg-[#9DDF2E] shadow-[0_0_16px_rgba(157,223,46,0.3)] rounded-lg hover:bg-[#8acc25] transition-colors shrink-0 w-full sm:w-auto"
      >
        <Pen size={16} className="text-[#213600]" weight="bold" />
        <span className="font-sans font-semibold text-base leading-6 text-[#213600]">
          Edit Plan
        </span>
      </button>
    </div>
  );
}
