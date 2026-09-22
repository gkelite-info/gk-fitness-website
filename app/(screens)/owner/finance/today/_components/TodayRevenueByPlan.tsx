import { ChartBar, CaretRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const PLAN_DATA = [
  { id: "gold", name: "Gold Membership", revenue: "₹5,100", dotColor: "#CCFF00" },
  { id: "premium", name: "Premium Membership", revenue: "₹2,700", dotColor: "#A855F7" },
  { id: "silver", name: "Silver Membership", revenue: "₹650", dotColor: "#64748B" }
];

export default function TodayRevenueByPlan() {
  return (
    <div className="flex flex-col p-5 w-full h-full bg-[#14171C] border border-[#20252E] rounded-[12px]">
      <div className="flex flex-row items-center gap-2 pb-6">
        <ChartBar size={16} weight="regular" className="text-[#94A3B8]" />
        <h2 className="font-[600] text-[13px] leading-[16px] text-white m-0">
          Revenue by Membership Plan
        </h2>
      </div>

      <div className="flex flex-col w-full gap-2">
        {PLAN_DATA.map((plan, index) => (
          <Link 
            key={index} 
            href={`/owner/finance/membership-plans/${plan.id}`}
            className="flex flex-row justify-between items-center w-full gap-2 p-2 -mx-2 rounded-[6px] hover:bg-[#1A1F26] transition-colors cursor-pointer group"
          >
            <div className="flex flex-row items-center gap-3 min-w-0 flex-1">
              <div 
                className="w-2 h-2 rounded-full shrink-0" 
                style={{ backgroundColor: plan.dotColor }}
              />
              <span className="font-[400] text-[12px] leading-[16px] text-[#94A3B8] group-hover:text-white transition-colors truncate w-full">
                {plan.name}
              </span>
            </div>
            <div className="flex flex-row items-center gap-2 shrink-0">
              <span className="font-[700] text-[12px] leading-[16px] text-white text-right">
                {plan.revenue}
              </span>
              <CaretRight size={14} className="text-[#64748B] group-hover:text-white transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
