"use client";

import { FileText } from "@phosphor-icons/react/dist/ssr";
import { useParams } from "next/navigation";
import { useGymCustomerById } from "@/lib/hooks/customers/useGymCustomers";
import { useCustomerOnboardingData } from "@/lib/hooks/customers/useCustomerOnboardingData";

export default function AssessmentCard() {
  const params = useParams();
  const customerId = params?.id as string;
  const { data: customer } = useGymCustomerById(customerId);
  const userId = customer?.userId || customer?.users?.userId;
  const { data: onboarding } = useCustomerOnboardingData(userId);
  return (
    <div className="flex flex-col items-start p-[24px] w-full bg-[#15181E] border border-[#212630] rounded-[16px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] gap-[16px]">

      <div className="flex flex-row items-center gap-[8px] w-full">
        <FileText size={16} className="text-[#CCFF00]" weight="fill" />
        <h4 className="font-sans font-bold text-[14px] leading-[20px] tracking-[0.7px] uppercase text-white m-0">
          Assessment & Preference
        </h4>
      </div>

      <div className="flex flex-col w-full gap-[12px]">
        <div className="flex flex-row flex-wrap justify-between items-center p-[12px] w-full bg-[#1B1F27] border border-[#252B37] rounded-[12px] gap-[12px]">
          <span className="font-sans font-normal text-[12px] leading-[16px] text-[#9CA3AF]">
            Target Weight:
          </span>
          <div className="flex flex-row items-baseline gap-[4px] text-right">
            <span className="font-sans font-semibold text-[12px] leading-[16px] text-white whitespace-nowrap">
              {onboarding?.targetWeight ? `${onboarding.targetWeight} kg` : '-'}
            </span>
            <span className="font-sans font-normal text-[12px] leading-[16px] text-[#64748B] whitespace-nowrap">
              (Current: {onboarding?.weight ? `${onboarding.weight} kg` : '-'})
            </span>
          </div>
        </div>

        {/* <div className="flex flex-row flex-wrap justify-between items-center p-[12px] w-full bg-[#1B1F27] border border-[#252B37] rounded-[12px] gap-[12px]">
          <span className="font-sans font-normal text-[12px] leading-[16px] text-[#9CA3AF]">
            Weekly Commitment:
          </span>
          <span className="font-sans font-semibold text-[12px] leading-[16px] text-[#CCFF00] whitespace-nowrap text-right">
            4 Days / Week
          </span>
        </div> */}
      </div>
    </div>
  );
}
