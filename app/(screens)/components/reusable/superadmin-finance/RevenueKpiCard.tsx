import { ArrowUp, CurrencyInr, CreditCard } from "@phosphor-icons/react/dist/ssr";

interface RevenueKpiCardProps {
  title: string;
  value: string;
  changePercentage: number;
  variant: "revenue" | "transactions";
}

export default function RevenueKpiCard({
  title,
  value,
  changePercentage,
  variant,
}: RevenueKpiCardProps) {
  const isRevenue = variant === "revenue";

  return (
    <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-2 sm:gap-4 transition-all hover:border-[#343B4E] relative overflow-hidden flex-1 min-w-0">
      <div className="flex items-center gap-3 sm:gap-3.5 z-10 min-w-0 shrink-0">
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 border ${
            isRevenue
              ? "bg-[#202713] border-[#3E4D1D]"
              : "bg-[#26131A] border-[#481E2C]"
          }`}
        >
          {isRevenue ? (
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#D4FF32] flex items-center justify-center text-black shadow-[0_0_10px_rgba(212,255,50,0.35)] shrink-0">
              <CurrencyInr size={18} weight="bold" />
            </div>
          ) : (
            <CreditCard size={24} weight="fill" className="text-[#8B1E3F]" />
          )}
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-xs font-medium text-[#94A3B8] whitespace-nowrap">
            {title}
          </span>
          <span className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight mt-0.5 whitespace-nowrap">
            {value}
          </span>
          <div className="flex items-center gap-1 mt-1 text-[11px] sm:text-xs whitespace-nowrap">
            <div className="flex items-center gap-0.5 font-bold text-[#D4FF32]">
              <ArrowUp size={12} weight="bold" className="shrink-0" />
              <span>{changePercentage}%</span>
            </div>
            <span className="text-[#94A3B8] font-medium">vs last month</span>
          </div>
        </div>
      </div>

      <div className="w-24 sm:w-36 md:w-44 h-12 sm:h-16 shrink-0 flex items-end justify-end pointer-events-none z-0">
        <svg
          viewBox="0 0 140 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible drop-shadow-[0_0_8px_rgba(212,255,50,0.4)]"
        >
          <defs>
            <linearGradient
              id={`kpi-grad-${variant}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="#D4FF32" stopOpacity="0.4" />
              <stop offset="70%" stopColor="#D4FF32" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#D4FF32" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d={
              isRevenue
                ? "M 0 46 C 25 46, 40 48, 60 40 C 80 32, 95 38, 110 24 C 122 14, 130 5, 140 5 L 140 60 L 0 60 Z"
                : "M 0 50 C 20 50, 30 42, 45 36 C 60 30, 70 48, 85 44 C 100 40, 112 12, 130 4 C 135 2, 138 4, 140 6 L 140 60 L 0 60 Z"
            }
            fill={`url(#kpi-grad-${variant})`}
          />

          <path
            d={
              isRevenue
                ? "M 0 46 C 25 46, 40 48, 60 40 C 80 32, 95 38, 110 24 C 122 14, 130 5, 140 5"
                : "M 0 50 C 20 50, 30 42, 45 36 C 60 30, 70 48, 85 44 C 100 40, 112 12, 130 4 C 135 2, 138 4, 140 6"
            }
            stroke="#D4FF32"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
