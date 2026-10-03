"use client";

import { User, IdentificationCard, ShieldCheck } from "@phosphor-icons/react/dist/ssr";

interface TrainerAboutSectionProps {
  trainerData?: any;
}

export default function TrainerAboutSection({ trainerData }: TrainerAboutSectionProps) {
  const description = trainerData?.bio || "-";
  const certifications = trainerData?.qualification || "-";
  const specialization = trainerData?.specialization || "-";

  return (
    <div className="flex flex-col justify-between items-start p-[24px] flex-[1.5] w-full min-h-[302px] bg-[#181C25] border border-[#252B38] rounded-[12px]">
      <div className="flex flex-col items-start gap-[11px] w-full">
        <div className="flex flex-row items-center gap-[10px] w-full">
          <div className="w-[20px] h-[20px] text-[#CCFF00] flex justify-center items-center">
            <User size={18} weight="regular" />
          </div>
          <h4 className="font-sans font-bold text-[16px] leading-[24px] tracking-[0.4px] uppercase text-[#CCFF00] m-0">
            ABOUT TRAINER
          </h4>
        </div>
        <p className="font-sans font-normal text-[14px] leading-[23px] text-[#D1D5DB] m-0 pb-[12px]">
          {description}
        </p>
      </div>

      <div className="flex flex-col items-start pt-[12px] gap-[16px] w-full border-t border-[#232835] mt-auto">
        <div className="flex flex-row items-start gap-[12px] w-full">
          <div className="flex flex-col items-center p-[8px] w-[34px] h-[34px] bg-[#202533] border border-[#2D3446] rounded-[8px] mt-[2px] shrink-0">
            <div className="w-[16px] h-[16px] text-[#CCFF00] flex justify-center items-center">
               <IdentificationCard size={16} weight="regular" />
            </div>
          </div>
          <div className="flex flex-col items-start gap-[2px]">
            <h5 className="font-sans font-semibold text-[12px] leading-[16px] tracking-[0.6px] uppercase text-[#9CA3AF] m-0">
              CERTIFICATIONS
            </h5>
            <span className="font-sans font-medium text-[14px] leading-[20px] text-white">
              {certifications}
            </span>
          </div>
        </div>
        <div className="flex flex-row items-start gap-[12px] w-full">
          <div className="flex flex-col items-center p-[8px] w-[34px] h-[34px] bg-[#202533] border border-[#2D3446] rounded-[8px] mt-[2px] shrink-0">
            <div className="w-[16px] h-[16px] text-[#CCFF00] flex justify-center items-center">
               <ShieldCheck size={16} weight="regular" />
            </div>
          </div>
          <div className="flex flex-col items-start gap-[2px]">
            <h5 className="font-sans font-semibold text-[12px] leading-[16px] tracking-[0.6px] uppercase text-[#9CA3AF] m-0">
              SPECIALIZATION
            </h5>
            <span className="font-sans font-medium text-[14px] leading-[20px] text-white">
              {specialization}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
