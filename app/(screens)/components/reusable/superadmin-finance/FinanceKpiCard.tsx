import {
  Coins,
  CreditCard,
  WarningCircle,
  ChartBar,
  ArrowUp,
  ArrowDown,
} from "@phosphor-icons/react/dist/ssr";
import { FinanceKpi } from "./types";

interface FinanceKpiCardProps {
  kpi: FinanceKpi;
}

export default function FinanceKpiCard({ kpi }: FinanceKpiCardProps) {
  const getIconConfig = () => {
    switch (kpi.variant) {
      case "revenue":
        return {
          icon: <Coins size={22} weight="fill" className="text-[#10B981]" />,
          bg: "bg-[#0D261C] border-[#164E37]/50",
          trendColor: "text-[#10B981]",
        };
      case "payouts":
        return {
          icon: <CreditCard size={22} weight="fill" className="text-[#F87171]" />,
          bg: "bg-[#2D151B] border-[#522222]/50",
          trendColor: "text-[#F87171]",
        };
      case "pending":
        return {
          icon: <WarningCircle size={22} weight="fill" className="text-[#FBBF24]" />,
          bg: "bg-[#2B1F0E] border-[#543A14]/50",
          trendColor: "text-[#FBBF24]",
        };
      case "net":
        return {
          icon: <ChartBar size={22} weight="fill" className="text-[#38BDF8]" />,
          bg: "bg-[#0E2038] border-[#1E3A5F]/50",
          trendColor: "text-[#10B981]",
        };
    }
  };

  const config = getIconConfig();
  const TrendIcon = kpi.trend === "up" ? ArrowUp : ArrowDown;

  return (
    <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-3.5 transition-all hover:border-[#343B4E]">
      <div className="flex items-center gap-3">
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${config.bg}`}
        >
          {config.icon}
        </div>
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-xs font-medium text-[#94A3B8] whitespace-nowrap">
            {kpi.title}
          </span>
          <span className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5 whitespace-nowrap">
            {kpi.amount}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs whitespace-nowrap">
        <div className={`flex items-center gap-0.5 font-bold shrink-0 ${config.trendColor}`}>
          <TrendIcon size={12} weight="bold" className="shrink-0" />
          <span>{kpi.changePercentage}%</span>
        </div>
        <span className="text-[#64748B] font-medium shrink-0">{kpi.comparisonText}</span>
      </div>
    </div>
  );
}
