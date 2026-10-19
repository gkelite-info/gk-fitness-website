import BreakdownItemRow from "./BreakdownItemRow";
import { REVENUE_BREAKDOWN } from "./mockData";

export default function RevenueBreakdownCard() {
  return (
    <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-5 flex flex-col gap-3.5">
      <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap pb-3 border-b border-[#1E222D]">
        <h2 className="text-sm sm:text-base font-bold text-white tracking-tight whitespace-nowrap">
          Revenue Breakdown
        </h2>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#181D26] text-[#CBD5E1] border border-[#262F3E] whitespace-nowrap shrink-0">
          Total: ₹12,31,900
        </span>
      </div>

      <div className="flex flex-col gap-2 pt-1">
        {REVENUE_BREAKDOWN.map((item) => (
          <BreakdownItemRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
