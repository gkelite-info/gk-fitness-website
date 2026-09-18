import { Users, CheckCircle, CurrencyInr, TrendUp, ArrowUp } from "@phosphor-icons/react/dist/ssr";

export default function OverviewMetrics() {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center w-full">
        <h2 className="font-['Nimbus_Sans'] font-bold text-[20px] leading-[28px] tracking-[-0.5px] text-white">
          Today&apos;s Overview
        </h2>
        <button className="flex flex-row items-center px-[14px] py-[6px] gap-2 bg-[#16171E] border border-[#262936] rounded-lg">
          <span className="font-['Nimbus_Sans'] font-semibold text-[12px] leading-4 text-[#E2E8F0]">
            Today
          </span>
          <div className="w-[8px] h-[4.5px] bg-[#94A3B8]" style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        <MetricCard
          icon={<Users size={24} color="#D4FF32" weight="regular" />}
          label="ACTIVE CUSTOMERS"
          value="1,036"
          trend="+12%"
          subtext="vs. yesterday"
        />
        <MetricCard
          icon={<CheckCircle size={24} color="#D4FF32" weight="regular" />}
          label="CHECK-INS"
          value="286"
          trend="+8%"
          subtext="vs. yesterday"
        />
        <MetricCard
          icon={<CurrencyInr size={24} color="#D4FF32" weight="regular" />}
          label="REVENUE TODAY"
          value="₹8,450"
          trend="+14%"
          subtext="vs. yesterday"
        />
        <MetricCard
          icon={<TrendUp size={24} color="#D4FF32" weight="regular" />}
          label="MONTHLY GROWTH"
          value="+8.4%"
          trend="+2.1%"
          subtext="vs. last month"
        />
      </div>
    </div>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
  subtext: string;
}

function MetricCard({ icon, label, value, trend, subtext }: MetricCardProps) {
  return (
    <div className="flex flex-row items-center p-3 sm:p-4 xl:p-5 bg-[#14151A] border border-white/[0.06] rounded-2xl w-full h-[116px] gap-2 sm:gap-3 xl:gap-4 overflow-hidden">
      <div className="w-10 h-10 sm:w-12 sm:h-12 xl:w-14 xl:h-14 bg-[#141812] border border-[#D4FF32]/30 rounded-[10px] sm:rounded-[12px] xl:rounded-[14px] flex justify-center items-center flex-shrink-0">
        {icon}
      </div>
      <div className="flex flex-col min-w-0">
        <span className="font-['Nimbus_Sans'] font-bold text-[8px] lg:text-[9px] xl:text-[11px] leading-3 xl:leading-4 tracking-[0.55px] text-[#94A3B8] whitespace-nowrap">
          {label}
        </span>
        <span className="font-['Nimbus_Sans'] font-black text-[22px] xl:text-[28px] leading-[30px] xl:leading-[36px] text-white my-[2px]">
          {value}
        </span>
        <div className="flex flex-row items-center gap-1 flex-wrap sm:flex-nowrap">
          <span className="font-['Nimbus_Sans'] font-bold text-[10px] xl:text-[12px] leading-4 text-[#D4FF32] flex items-center gap-[2px] whitespace-nowrap">
            <ArrowUp size={10} weight="bold" />{trend}
          </span>
          <span className="font-['Sora'] font-normal text-[9px] xl:text-[11px] leading-4 text-[#94A3B8] whitespace-nowrap">
            {subtext}
          </span>
        </div>
      </div>
    </div>
  );
}
