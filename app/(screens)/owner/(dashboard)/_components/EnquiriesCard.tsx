import { Fire, Sun, Snowflake, Sparkle } from "@phosphor-icons/react/dist/ssr";

export default function EnquiriesCard() {
  const breakdown = [
    { label: "Hot", count: 8, icon: <Fire size={16} color="#F87171" weight="bold" />, iconBg: "bg-[#F87171]/15" },
    { label: "Cold", count: 3, icon: <Snowflake size={16} color="#38BDF8" weight="bold" />, iconBg: "bg-[#38BDF8]/15" },
    { label: "Warm", count: 11, icon: <Sun size={16} color="#FBBF24" weight="bold" />, iconBg: "bg-[#FBBF24]/15" },
    { label: "Others", count: 2, icon: <Sparkle size={16} color="#C084FC" weight="bold" />, iconBg: "bg-[#C084FC]/15" },
  ];

  return (
    <div className="w-full bg-[#14151A] border border-[#222328] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.4),0px_4px_6px_-4px_rgba(0,0,0,0.4)] rounded-[16px] p-[14px] flex flex-col md:flex-row items-stretch gap-[14px] min-h-[150px]">
      <div className="flex flex-col items-center justify-center flex-shrink-0 w-full md:w-[140px] h-auto md:h-full min-h-[120px] bg-[#191B22] border border-[#222530] rounded-[12px] py-4 md:py-0">
        <span className="font-sans font-bold text-[28px] leading-[34px] text-white">
          24
        </span>
        <span className="font-sans font-semibold text-[11px] leading-[14px] text-[#F59E0B] mt-1 whitespace-nowrap">
          Open Enquiries
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 w-full flex-1">
        {breakdown.map((item, index) => (
          <div key={index} className="flex flex-row items-center justify-between w-full h-[54px] bg-[#191B22] border border-[#222530] rounded-[12px] px-3 sm:px-4 hover:bg-[#1f222b] transition-colors cursor-default">
            <div className="flex flex-row items-center gap-3">
              <div className={`w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0 ${item.iconBg}`}>
                {item.icon}
              </div>
              <span className="font-sans font-medium text-[14px] leading-5 text-[#E2E8F0]">
                {item.label}
              </span>
            </div>
            <span className="font-sans font-bold text-[16px] leading-[20px] text-white">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
