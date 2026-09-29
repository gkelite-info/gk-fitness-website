"use client";

import { CaretLeft } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";

interface ChangeTrainerHeaderProps {
  customerName: string;
  customerId: string;
  onBack?: () => void;
}

export default function ChangeTrainerHeader({ customerName, customerId, onBack }: ChangeTrainerHeaderProps) {
  const router = useRouter();
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-[16px] shrink-0">
      <div className="flex flex-row items-center gap-[16px] w-full sm:w-auto">
        <button
          onClick={handleBack}
          className="flex justify-center items-center w-[44px] h-[44px] bg-[#141822] border border-[#272E3D] rounded-[12px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#1A1F2B] transition-colors cursor-pointer shrink-0"
        >
          <CaretLeft size={20} className="text-[#E2E8F0]" weight="bold" />
        </button>
        <div className="flex flex-col items-start gap-[2px]">
          <h1 className="font-sans font-bold text-[20px] sm:text-[24px] leading-[26px] sm:leading-[32px] tracking-[-0.5px] text-white">
            Change Trainer
          </h1>
          <span className="font-sans font-normal text-[12px] sm:text-[14px] leading-[16px] sm:leading-[20px] text-[#94A3B8]">
            Customer: <span className="text-[#CCFF00]">{customerName} ({customerId})</span>
          </span>
        </div>
      </div>
    </div>
  );
}
