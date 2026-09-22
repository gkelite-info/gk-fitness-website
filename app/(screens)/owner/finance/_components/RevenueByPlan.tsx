"use client";

import { CaretRight, Crown, Cube, Star, Medal } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

const PLAN_DATA = [
  {
    name: "Gold Membership",
    members: "412 Members",
    revenue: "₹1,85,000",
    icon: <Crown size={20} weight="regular" />,
    iconBgColor: "#261F13",
    iconBorderColor: "rgba(217, 119, 6, 0.3)",
    iconColor: "#FBBF24"
  },
  {
    name: "Premium Membership",
    members: "286 Members",
    revenue: "₹1,26,000",
    icon: <Star size={20} weight="regular" />,
    iconBgColor: "#231535",
    iconBorderColor: "rgba(147, 51, 234, 0.3)",
    iconColor: "#C084FC"
  },
  {
    name: "Elite Membership",
    members: "158 Members",
    revenue: "₹74,000",
    icon: <Cube size={20} weight="regular" />,
    iconBgColor: "#112338",
    iconBorderColor: "rgba(37, 99, 235, 0.3)",
    iconColor: "#60A5FA"
  },
  {
    name: "Silver Membership",
    members: "98 Members",
    revenue: "₹42,000",
    icon: <Medal size={20} weight="regular" />,
    iconBgColor: "#1A212C",
    iconBorderColor: "rgba(71, 85, 105, 0.3)",
    iconColor: "#CBD5E1"
  }
];

export default function RevenueByPlan() {
  const router = useRouter();

  return (
    <div className="flex flex-col p-4 md:p-6 w-full h-full bg-[#111418] border border-[#1D222B] rounded-[16px] min-h-[350px]">
      <div className="flex flex-row justify-between items-center pb-4 w-full gap-2 flex-wrap">
        <h2 className="font-[700] text-[16px] leading-[24px] text-white m-0">
          Revenue by Membership Plan
        </h2>
      </div>
      <div className="flex flex-col w-full gap-1 mt-2">
        {PLAN_DATA.map((plan, index) => (
          <div 
            key={index} 
            onClick={() => router.push(`/owner/finance/membership-plans/${plan.name.split(' ')[0].toLowerCase()}`)}
            className="flex flex-row justify-between items-center p-2 w-full gap-2 hover:bg-[#1A1F26] rounded-[8px] transition-colors cursor-pointer group"
          >
            <div className="flex flex-row items-center gap-3.5 min-w-0 flex-1">
              <div 
                className="flex justify-center items-center w-10 h-10 rounded-[12px] shrink-0"
                style={{
                  backgroundColor: plan.iconBgColor,
                  borderColor: plan.iconBorderColor,
                  borderWidth: '1px'
                }}
              >
                <div style={{ color: plan.iconColor }}>
                  {plan.icon}
                </div>
              </div>
              <div className="flex flex-col items-start gap-0.5 min-w-0 flex-1 pr-2">
                <span className="font-[600] text-[12px] leading-[16px] text-white truncate w-full">
                  {plan.name}
                </span>
                <span className="font-[400] text-[11px] leading-[16px] text-[#94A3B8] truncate w-full">
                  {plan.members}
                </span>
              </div>
            </div>
            <div className="flex flex-row items-center gap-3 shrink-0">
              <span className="font-[700] text-[12px] leading-[16px] text-white text-right">
                {plan.revenue}
              </span>
              <CaretRight size={14} weight="regular" className="text-[#64748B] group-hover:text-white transition-colors shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
