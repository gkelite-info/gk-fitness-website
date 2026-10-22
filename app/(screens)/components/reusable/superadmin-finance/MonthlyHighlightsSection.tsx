import { TrendUp, CreditCard, Star } from "@phosphor-icons/react/dist/ssr";
import { HighlightCardData } from "./revenueVsPayoutsTypes";

interface MonthlyHighlightsSectionProps {
  highlights: HighlightCardData[];
}

export default function MonthlyHighlightsSection({
  highlights,
}: MonthlyHighlightsSectionProps) {
  const getIconConfig = (type: HighlightCardData["type"]) => {
    switch (type) {
      case "revenue":
        return {
          icon: <TrendUp size={20} weight="bold" className="text-[#00E599]" />,
          bg: "bg-[#0B2A1E] border-[#135E42]/60",
        };
      case "payout":
        return {
          icon: <CreditCard size={20} weight="fill" className="text-[#C084FC]" />,
          bg: "bg-[#271536] border-[#532675]/60",
        };
      case "net":
        return {
          icon: <Star size={20} weight="fill" className="text-[#00E599]" />,
          bg: "bg-[#0B2A1E] border-[#135E42]/60",
        };
    }
  };

  return (
    <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-4 sm:p-6 flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-0.5">
        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
          Monthly Highlights
        </h2>
        <p className="text-xs sm:text-sm text-[#8492A6]">
          Key months based on revenue, payouts and net revenue.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
        {highlights.map((item) => {
          const config = getIconConfig(item.type);
          return (
            <div
              key={item.title}
              className="flex items-center gap-3.5 p-4 rounded-xl bg-[#0F131A] border border-[#1E2536] min-w-0"
            >
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border ${config.bg}`}
              >
                {config.icon}
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-[11px] sm:text-xs font-medium text-[#8492A6] truncate">
                  {item.title}
                </span>
                <span className="text-sm sm:text-base font-bold text-white mt-0.5">
                  {item.month}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white/90 mt-0.5">
                  {item.amount}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
