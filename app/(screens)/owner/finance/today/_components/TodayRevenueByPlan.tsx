import { ChartBar, CaretRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { PlanRevenueData } from "../../_components/RevenueByPlan";

interface TodayRevenueByPlanProps {
  todaysRevenueByPlan?: PlanRevenueData[];
}

const DOT_COLORS = ["#CCFF00", "#A855F7", "#64748B", "#F59E0B", "#38BDF8"];

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

export default function TodayRevenueByPlan({ todaysRevenueByPlan = [] }: TodayRevenueByPlanProps) {
  return (
    <div className="flex flex-col p-5 w-full h-full bg-[#14171C] border border-[#20252E] rounded-[12px]">
      <div className="flex flex-row items-center gap-2 pb-6">
        <ChartBar size={16} weight="regular" className="text-[#94A3B8]" />
        <h2 className="font-[600] text-[13px] leading-[16px] text-white m-0">
          Revenue by Membership Plan
        </h2>
      </div>

      <div className="flex flex-col w-full gap-2">
        {todaysRevenueByPlan.length > 0 ? (
          todaysRevenueByPlan.map((plan, index) => {
            const dotColor = DOT_COLORS[index % DOT_COLORS.length];
            return (
              <Link
                key={plan.planId}
                href={`/owner/finance/membership-plans/${plan.planId}?name=${encodeURIComponent(plan.planName)}`}
                className="flex flex-row justify-between items-center w-full gap-2 p-2 -mx-2 rounded-[6px] hover:bg-[#1A1F26] transition-colors cursor-pointer group"
              >
                <div className="flex flex-row items-center gap-3 min-w-0 flex-1">
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: dotColor }}
                  />
                  <span className="font-[400] text-[12px] leading-[16px] text-[#94A3B8] group-hover:text-white transition-colors truncate w-full">
                    {plan.planName}
                  </span>
                </div>
                <div className="flex flex-row items-center gap-2 shrink-0">
                  <span className="font-[700] text-[12px] leading-[16px] text-white text-right">
                    {formatCurrency(plan.revenue)}
                  </span>
                  <CaretRight size={14} className="text-[#64748B] group-hover:text-white transition-colors" />
                </div>
              </Link>
            );
          })
        ) : (
          <div className="flex items-center justify-center py-6">
            <span className="text-sm text-[#94A3B8]">No revenue today yet.</span>
          </div>
        )}
      </div>
    </div>
  );
}
