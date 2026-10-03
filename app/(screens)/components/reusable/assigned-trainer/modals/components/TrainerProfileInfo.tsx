"use client";

import { Star, Phone, EnvelopeSimple, CalendarBlank, Briefcase } from "@phosphor-icons/react/dist/ssr";
import Avatar from "../../../Avatar";

interface TrainerProfileInfoProps {
  trainerData?: any;
  activeTrainerAssignment?: any;
}

export default function TrainerProfileInfo({ trainerData, activeTrainerAssignment }: TrainerProfileInfoProps) {
  const trainerName = trainerData?.fullName || "-";
  const specialization = trainerData?.specialization || "-";
  const experience = trainerData?.experienceYears ? `${trainerData.experienceYears}+ Years of Experience` : "-";
  const phone = trainerData?.phone || "-";
  const email = trainerData?.email || "-";
  const assignedSince = activeTrainerAssignment?.assignedOn
    ? new Date(activeTrainerAssignment.assignedOn).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    : "-";
  const rating = trainerData?.rating || "4.8"; // Defaulting to 4.8 if missing as per previous dummy data
  const reviewCount = trainerData?.reviewCount || 124;

  return (
    <div className="relative flex flex-col items-start p-[20px] sm:p-[32px] w-full bg-[#181C25] border border-[#252B38] rounded-[16px] overflow-hidden shrink-0">
      <div className="absolute -top-[47px] -right-[47px] w-[192px] h-[192px] bg-[#CCFF00]/5 blur-[32px] rounded-full pointer-events-none z-0" />

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-[20px] sm:gap-[24px] w-full z-10">
        <div className="flex flex-col justify-center items-center w-[100px] h-[100px] sm:w-[144px] sm:h-[144px] bg-[#101218] border-[2px] border-[#2C3242] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] rounded-[16px] shrink-0 overflow-hidden">
          <Avatar className="w-[100px] h-[100px] sm:w-[144px] sm:h-[144px] rounded-[14px]" alt={trainerName} />
        </div>

        <div className="flex flex-col items-center sm:items-start gap-[10px] sm:gap-[12px] flex-1 w-full text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-[8px] sm:gap-[12px] w-full flex-wrap justify-center sm:justify-start">
            <h3 className="font-sans font-bold text-[24px] sm:text-[30px] leading-[30px] sm:leading-[36px] tracking-[-0.75px] text-white m-0">
              {trainerName}
            </h3>
            <div className="flex flex-col items-start px-[12px] py-[4px] bg-[#CCFF00]/15 border border-[#CCFF00]/30 rounded-full">
              <span className="font-sans font-semibold text-[11px] sm:text-[12px] leading-[16px] tracking-[0.3px] uppercase text-[#CCFF00]">
                {specialization}
              </span>
            </div>
          </div>

          <div className="flex flex-row items-center gap-[8px] w-full justify-center sm:justify-start">
            <div className="flex flex-row items-center gap-[6px]">
              <Star size={16} className="text-[#CCFF00]" weight="fill" />
              <span className="font-sans font-bold text-[14px] sm:text-[16px] leading-[20px] sm:leading-[24px] text-white">{rating}</span>
            </div>
            <span className="font-sans font-medium text-[13px] sm:text-[14px] leading-[20px] text-[#9CA3AF]">
              ({reviewCount} Reviews)
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-y-[8px] gap-x-[40px] w-full mt-[4px]">
            <div className="flex flex-row items-center gap-[10px]">
              <div className="w-[16px] h-[16px] flex justify-center items-center text-[#CCFF00]">
                <Briefcase size={16} weight="regular" />
              </div>
              <span className="font-sans font-medium text-[14px] leading-[20px] text-[#D1D5DB]">
                {experience}
              </span>
            </div>
            <div className="flex flex-row items-center gap-[10px]">
              <div className="w-[16px] h-[16px] flex justify-center items-center text-[#CCFF00]">
                <Phone size={16} weight="regular" />
              </div>
              <span className="font-mono font-normal text-[14px] leading-[20px] text-[#D1D5DB]">
                {phone}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-y-[8px] gap-x-[40px] w-full">
            <div className="flex flex-row items-center gap-[10px]">
              <div className="w-[16px] h-[16px] flex justify-center items-center text-[#CCFF00]">
                <EnvelopeSimple size={16} weight="regular" />
              </div>
              <span className="font-sans font-normal text-[14px] leading-[20px] text-[#D1D5DB]">
                {email}
              </span>
            </div>
            <div className="flex flex-row items-center gap-[10px]">
              <div className="w-[16px] h-[16px] flex justify-center items-center text-[#CCFF00]">
                <CalendarBlank size={16} weight="regular" />
              </div>
              <span className="font-sans font-normal text-[14px] leading-[20px] text-[#D1D5DB]">
                Assigned Since {assignedSince}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
