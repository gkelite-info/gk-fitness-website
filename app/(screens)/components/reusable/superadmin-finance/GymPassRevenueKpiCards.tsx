import { Ticket, CreditCard, Clock, TrendUp } from "@phosphor-icons/react/dist/ssr";
import { GymPassRevenueKpis } from "./gymPassRevenueTypes";

interface GymPassRevenueKpiCardsProps {
  kpis: GymPassRevenueKpis;
}

export default function GymPassRevenueKpiCards({
  kpis,
}: GymPassRevenueKpiCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-6 w-full">
      <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-3 transition-all hover:border-[#2D3342] min-w-0">
        <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#0B251B] border border-[#164E37]/50 text-[#10B981] flex items-center justify-center shrink-0">
            <Ticket size={22} weight="fill" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-[#94A3B8] whitespace-nowrap">
              Total Revenue
            </span>
            <span className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5 whitespace-nowrap">
              {kpis.totalRevenue}
            </span>
            <span className="text-xs text-[#94A3B8] mt-0.5 whitespace-nowrap">
              {kpis.totalPurchasesCount} purchases
            </span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#181D26] border border-[#232B3A] flex items-center justify-center text-[#94A3B8] shrink-0">
          <TrendUp size={14} weight="bold" />
        </div>
      </div>

      <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-3 transition-all hover:border-[#2D3342] min-w-0">
        <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#0B251B] border border-[#164E37]/50 text-[#10B981] flex items-center justify-center shrink-0">
            <CreditCard size={22} weight="fill" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-[#94A3B8] whitespace-nowrap">
              Paid
            </span>
            <span className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5 whitespace-nowrap">
              {kpis.paidAmount}
            </span>
            <span className="text-xs text-[#94A3B8] mt-0.5 whitespace-nowrap">
              {kpis.paidPurchasesCount} purchases
            </span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#181D26] border border-[#232B3A] flex items-center justify-center text-[#94A3B8] shrink-0">
          <TrendUp size={14} weight="bold" />
        </div>
      </div>

      <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-3 transition-all hover:border-[#2D3342] min-w-0">
        <div className="flex items-center gap-3 sm:gap-3.5 min-w-0">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#2A1D0D] border border-[#4E3717]/50 text-[#F59E0B] flex items-center justify-center shrink-0">
            <Clock size={22} weight="fill" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-medium text-[#94A3B8] whitespace-nowrap">
              Pending
            </span>
            <span className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5 whitespace-nowrap">
              {kpis.pendingAmount}
            </span>
            <span className="text-xs text-[#94A3B8] mt-0.5 whitespace-nowrap">
              {kpis.pendingPurchasesCount} purchases
            </span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#181D26] border border-[#232B3A] flex items-center justify-center text-[#94A3B8] shrink-0">
          <Clock size={14} weight="bold" />
        </div>
      </div>
    </div>
  );
}
