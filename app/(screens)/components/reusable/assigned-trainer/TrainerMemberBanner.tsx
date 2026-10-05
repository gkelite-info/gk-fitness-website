"use client";

import Avatar from "./../Avatar";
import { useCustomerOnboardingData } from "@/lib/hooks/customers/useCustomerOnboardingData";

interface TrainerMemberBannerProps {
  customer?: any;
  activeTrainerAssignment?: any;
}

export default function TrainerMemberBanner({ customer, activeTrainerAssignment }: TrainerMemberBannerProps) {
  const { data: onboardingData } = useCustomerOnboardingData(customer?.id);
  const memberName = customer?.fullName || "-";
  const email = customer?.email || "-";
  const phone = customer?.phone || "-";

  const joinedDate = customer?.createdAt
    ? new Date(customer.createdAt).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    : "-";
  const status = customer?.is_Active ? "Active" : "Inactive";
  const memberStatusColor = customer?.is_Active ? "text-[#34D399]" : "text-gray-400";
  const memberStatusBg = customer?.is_Active ? "bg-[#10B989]/10 border-[#10B989]/20" : "bg-gray-500/10 border-gray-500/20";
  const memberStatusDot = customer?.is_Active ? "bg-[#34D399]" : "bg-gray-400";

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between p-6 w-full bg-[#15181E] border border-[#212630] rounded-2xl gap-6 lg:gap-4 mt-6 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.2),0px_4px_6px_-4px_rgba(0,0,0,0.2)]">
      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 w-full lg:w-auto flex-1">
        <Avatar className="w-[56px] h-[56px]" alt={memberName} />

        <div className="flex flex-col items-center sm:items-start gap-2 min-w-0 flex-1 w-full sm:w-auto">
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 w-full">
            <h3 className="font-sans font-bold text-[18px] leading-[28px] text-white m-0 break-words text-center sm:text-left">
              {memberName}
            </h3>
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-row items-center px-2.5 py-0.5 border border-[#CCFF00]/30 rounded-full bg-[#CCFF00]/10 shrink-0">
                <span className="font-sans font-bold text-[11px] leading-[16px] text-[#CCFF00] uppercase tracking-[0.275px]">
                  MEMBER
                </span>
              </div>
              <div className={`flex flex-row items-center gap-1.5 px-2.5 py-0.5 ${memberStatusBg} border rounded-full shrink-0`}>
                <div className={`w-1.5 h-1.5 ${memberStatusDot} rounded-full`} />
                <span className={`font-sans font-semibold text-[11px] leading-[16px] ${memberStatusColor}`}>
                  {status}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-start gap-1 sm:gap-3 text-[12px] leading-[16px] text-[#9CA3AF] w-full text-center sm:text-left">
            <span className="break-all sm:break-words">{email}</span>
            <div className="w-1 h-1 bg-[#9CA3AF] rounded-full shrink-0 hidden sm:block" />
            <span className="whitespace-nowrap">{phone}</span>
            <div className="w-1 h-1 bg-[#9CA3AF] rounded-full shrink-0 hidden sm:block" />
            <span className="whitespace-nowrap hidden sm:block">Joined: {joinedDate}</span>
          </div>
        </div>
      </div>

      <div className="hidden lg:block w-[1px] h-[32px] bg-[#232936] shrink-0" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-[#232936] lg:border-none">
        <div className="flex flex-col items-start lg:items-end gap-0.5 w-full sm:w-auto">
          <span className="font-sans font-medium text-[11px] leading-[16px] uppercase text-[#9CA3AF] tracking-[0.55px]">
            Primary Target
          </span>
          <span className="font-sans font-bold text-[14px] leading-[20px] text-white break-words">
            {onboardingData?.primaryGoal || "-"}
          </span>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-0.5 w-full sm:w-auto">
          <span className="font-sans font-medium text-[11px] leading-[16px] uppercase text-[#9CA3AF] tracking-[0.55px]">
            Preferred Slot
          </span>
          <span className="font-sans font-bold text-[14px] leading-[20px] text-[#CCFF00] break-words">
            {activeTrainerAssignment?.timings || "-"}
          </span>
        </div>
      </div>

    </div>
  );
}
