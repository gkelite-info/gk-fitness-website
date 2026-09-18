import { Fire, Sun, Snowflake, Sparkle } from "@phosphor-icons/react/dist/ssr";

export default function EnquiriesCard() {
  const breakdown = [
    { label: "Hot", count: 8, icon: <Fire size={14} color="#F87171" weight="bold" />, iconBg: "bg-[#F87171]/15" },
    { label: "Warm", count: 11, icon: <Sun size={14} color="#FBBF24" weight="bold" />, iconBg: "bg-[#FBBF24]/15" },
    { label: "Cold", count: 3, icon: <Snowflake size={14} color="#00E1FF" weight="bold" />, iconBg: "bg-[#00E1FF]/15" },
    { label: "Others", count: 2, icon: <Sparkle size={14} color="#C084FC" weight="bold" />, iconBg: "bg-[#C084FC]/15" },
  ];

  return (
    <div className="w-full h-full bg-[#14151A] border border-[#222328] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.4),0px_4px_6px_-4px_rgba(0,0,0,0.4)] p-[14px] sm:p-4 flex flex-col justify-between items-center gap-2">
      <div className="flex flex-col items-center">
        <span className="font-sans font-bold text-[32px] leading-[36px] text-white">
          24
        </span>
        <span className="font-sans font-semibold text-[13px] leading-5 text-[#F59E0B] mt-0.5">
          Open Enquiries
        </span>
      </div>

      <div className="flex flex-col gap-[7px] w-full mt-1">
        {breakdown.map((item, index) => (
          <div key={index} className="flex flex-row justify-between items-center w-full min-h-[36px] bg-transparent border border-[#222530] rounded-[12px] px-3 py-1.5">
            <div className="flex flex-row items-center gap-3">
              <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${item.iconBg}`}>
                {item.icon}
              </div>
              <span className="font-sans font-medium text-[12px] leading-4 text-[#CBD5E1]">
                {item.label}
              </span>
            </div>
            <span className="font-sans font-bold text-[13px] leading-4 text-white">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
