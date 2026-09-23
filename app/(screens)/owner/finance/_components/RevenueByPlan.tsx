"use client";

import { CaretRight, Crown, Cube, Star, Medal } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

export interface PlanRevenueData {
  planId: string;
  planName: string;
  revenue: number;
  members: number;
}

interface RevenueByPlanProps {
  revenueByPlan?: PlanRevenueData[];
}

const PLAN_STYLES = [
  {
    icon: <Crown size={20} weight="regular" />,
    iconBgColor: "#261F13",
    iconBorderColor: "rgba(217, 119, 6, 0.3)",
    iconColor: "#FBBF24"
  },
  {
    icon: <Star size={20} weight="regular" />,
    iconBgColor: "#231535",
    iconBorderColor: "rgba(147, 51, 234, 0.3)",
    iconColor: "#C084FC"
  },
  {
    icon: <Cube size={20} weight="regular" />,
    iconBgColor: "#112338",
    iconBorderColor: "rgba(37, 99, 235, 0.3)",
    iconColor: "#60A5FA"
  },
  {
    icon: <Medal size={20} weight="regular" />,
    iconBgColor: "#1A212C",
    iconBorderColor: "rgba(71, 85, 105, 0.3)",
    iconColor: "#CBD5E1"
  }
];

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

export default function RevenueByPlan({ revenueByPlan = [] }: RevenueByPlanProps) {
  const router = useRouter();
  const displayPlans = revenueByPlan.slice(0, 4);

  return (
    <div className="flex flex-col p-4 md:p-6 w-full h-full bg-[#111418] border border-[#1D222B] rounded-[16px] min-h-[350px]">
      <div className="flex flex-row justify-between items-center pb-4 w-full gap-2 flex-wrap">
        <h2 className="font-[700] text-[16px] leading-[24px] text-white m-0">
          Revenue by Membership Plan
        </h2>
      </div>
      <div className="flex flex-col w-full gap-3 mt-2">
        {displayPlans.length > 0 ? (
          displayPlans.map((plan, index) => {
            const style = PLAN_STYLES[index % PLAN_STYLES.length];
            return (
              <div 
                key={plan.planId} 
                className="flex flex-row justify-between items-center py-2 px-3 -mx-3 w-[calc(100%+24px)] gap-2 cursor-pointer hover:bg-[#1A1F26] rounded-xl transition-all"
                onClick={() => router.push(`/owner/finance/membership-plans/${plan.planId}?name=${encodeURIComponent(plan.planName)}`)}
              >
                <div className="flex flex-row items-center gap-3.5 min-w-0 flex-1">
                  <div
                    className="flex justify-center items-center w-10 h-10 rounded-[12px] shrink-0"
                    style={{
                      backgroundColor: style.iconBgColor,
                      borderColor: style.iconBorderColor,
                      borderWidth: '1px'
                    }}
                  >
                    <div style={{ color: style.iconColor }}>
                      {style.icon}
                    </div>
                  </div>
                  <div className="flex flex-col items-start gap-0.5 min-w-0 flex-1 pr-2">
                    <span className="font-[600] text-[12px] leading-[16px] text-white truncate w-full">
                      {plan.planName}
                    </span>
                    <span className="font-[400] text-[11px] leading-[16px] text-[#94A3B8] truncate w-full">
                      {plan.members} Members
                    </span>
                  </div>
                </div>
                <div className="flex flex-row items-center gap-3 shrink-0">
                  <span className="font-[700] text-[12px] leading-[16px] text-white text-right">
                    {formatCurrency(plan.revenue)}
                  </span>
                  <CaretRight size={14} weight="regular" className="text-[#64748B] shrink-0" />
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center py-10">
            <span className="text-sm text-[#94A3B8]">No revenue data yet.</span>
          </div>
        )}
      </div>
    </div>
  );
}
