import {
  GlobeHemisphereWest,
  CheckCircle,
  Clock,
} from "@phosphor-icons/react/dist/ssr";
import { GlobalSessionsRevenueKpis } from "./globalSessionsRevenueTypes";

interface GlobalSessionsRevenueKpiCardsProps {
  kpis: GlobalSessionsRevenueKpis;
}

export default function GlobalSessionsRevenueKpiCards({
  kpis,
}: GlobalSessionsRevenueKpiCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-6 w-full">
      <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-3.5 sm:p-4 lg:p-5 flex items-center gap-2.5 sm:gap-3.5 lg:gap-4 transition-all hover:border-[#2D3342] min-w-0">
        <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-xl sm:rounded-2xl bg-[#0D261C] border border-[#164E37]/50 text-[#10B981] flex items-center justify-center shrink-0">
          <GlobeHemisphereWest size={22} weight="fill" className="sm:w-6 sm:h-6" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-medium text-[#94A3B8] whitespace-nowrap">
            Total Revenue
          </span>
          <span className="text-lg sm:text-xl xl:text-2xl font-bold text-white tracking-tight mt-0.5 whitespace-nowrap">
            {kpis.totalRevenue}
          </span>
          <span className="text-xs text-[#94A3B8] mt-0.5 whitespace-nowrap">
            {kpis.totalSessionsCount} sessions
          </span>
        </div>
      </div>

      <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-3.5 sm:p-4 lg:p-5 flex items-center gap-2.5 sm:gap-3.5 lg:gap-4 transition-all hover:border-[#2D3342] min-w-0">
        <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-xl sm:rounded-2xl bg-[#0E2038] border border-[#1E3A5F]/50 text-[#38BDF8] flex items-center justify-center shrink-0">
          <CheckCircle size={22} weight="fill" className="sm:w-6 sm:h-6" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-medium text-[#94A3B8] whitespace-nowrap">
            Paid
          </span>
          <span className="text-lg sm:text-xl xl:text-2xl font-bold text-white tracking-tight mt-0.5 whitespace-nowrap">
            {kpis.paidAmount}
          </span>
          <span className="text-xs text-[#94A3B8] mt-0.5 whitespace-nowrap">
            {kpis.paidSessionsCount} sessions
          </span>
        </div>
      </div>

      <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-3.5 sm:p-4 lg:p-5 flex items-center gap-2.5 sm:gap-3.5 lg:gap-4 transition-all hover:border-[#2D3342] min-w-0">
        <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-xl sm:rounded-2xl bg-[#2B1F0E] border border-[#543A14]/50 text-[#FBBF24] flex items-center justify-center shrink-0">
          <Clock size={22} weight="fill" className="sm:w-6 sm:h-6" />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-medium text-[#94A3B8] whitespace-nowrap">
            Pending
          </span>
          <span className="text-lg sm:text-xl xl:text-2xl font-bold text-white tracking-tight mt-0.5 whitespace-nowrap">
            {kpis.pendingAmount}
          </span>
          <span className="text-xs text-[#94A3B8] mt-0.5 whitespace-nowrap">
            {kpis.pendingSessionsCount} sessions
          </span>
        </div>
      </div>
    </div>
  );
}
