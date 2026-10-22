import {
  Coins,
  CreditCard,
  Clock,
  ChartBar,
} from "@phosphor-icons/react/dist/ssr";
import { RevenueVsPayoutsKpi } from "./revenueVsPayoutsTypes";

interface RevenueVsPayoutsKpisProps {
  kpis: RevenueVsPayoutsKpi[];
}

export default function RevenueVsPayoutsKpiCards({ kpis }: RevenueVsPayoutsKpisProps) {
  const getIconConfig = (variant: RevenueVsPayoutsKpi["variant"]) => {
    switch (variant) {
      case "revenue":
        return {
          icon: <Coins size={20} weight="fill" className="text-[#00E599]" />,
          bg: "bg-[#0B2A1E] border-[#135E42]/60",
          subColor: "text-[#00E599]",
        };
      case "payouts":
        return {
          icon: <CreditCard size={20} weight="fill" className="text-[#C084FC]" />,
          bg: "bg-[#271536] border-[#532675]/60",
          subColor: "text-[#00E599]",
        };
      case "net":
        return {
          icon: <ChartBar size={20} weight="fill" className="text-[#00E599]" />,
          bg: "bg-[#0B2A1E] border-[#135E42]/60",
          subColor: "text-[#00E599]",
        };
      case "pending":
        return {
          icon: <Clock size={20} weight="fill" className="text-[#FBBF24]" />,
          bg: "bg-[#2E1F0A] border-[#684712]/60",
          subColor: "text-[#8492A6]",
        };
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 sm:gap-4 w-full">
      {kpis.map((kpi) => {
        const config = getIconConfig(kpi.variant);
        return (
          <div
            key={kpi.id}
            className="bg-[#12141A] border border-[#232631] rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-3 transition-all hover:border-[#343B4E] min-w-0"
          >
            <div className="flex items-center justify-between gap-2.5 w-full">
              <span className="text-xs sm:text-sm font-medium text-[#94A3B8] whitespace-nowrap">
                {kpi.title}
              </span>
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 border ${config.bg}`}
              >
                {config.icon}
              </div>
            </div>

            <div className="flex flex-col min-w-0 my-0.5">
              <span className="text-xl sm:text-2xl font-bold text-white tracking-tight whitespace-nowrap">
                {kpi.amount}
              </span>
            </div>

            <div className="pt-2 border-t border-[#1C202C] flex items-center justify-between text-xs min-w-0">
              <span className={`font-semibold ${config.subColor} whitespace-nowrap`}>
                {kpi.comparisonText}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
