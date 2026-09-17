import { ArrowUp } from "@phosphor-icons/react/dist/ssr";

export default function FinancesCard() {
  const breakdown = [
    { label: "UPI", amount: "₹5.2k", color: "bg-[#D4FF32]", width: "50%" },
    { label: "Card", amount: "₹2.2k", color: "bg-[#3B82F6]", width: "26%" },
    { label: "Cash", amount: "₹1.0k", color: "bg-[#F59E0B]", width: "24%" },
  ];

  return (
    <div className="w-full bg-[#14151A] border border-white/[0.06] rounded-2xl p-5 pt-[18px] flex flex-col gap-3">
      <h3 className="font-['Nimbus_Sans'] font-bold text-[16px] leading-[24px] tracking-[0.4px] text-white">
        Finances <span className="font-normal text-[#94A3B8]">(Today)</span>
      </h3>

      <div className="flex flex-col gap-1">
        <span className="font-['Nimbus_Sans'] font-bold text-[11px] leading-4 tracking-[0.55px] uppercase text-[#94A3B8]">
          TODAY&apos;S REVENUE
        </span>
        <div className="flex flex-row items-center gap-2">
          <span className="font-['Nimbus_Sans'] font-black text-[24px] leading-8 text-white">
            ₹8,450
          </span>
          <span className="font-['Nimbus_Sans'] font-bold text-[12px] leading-4 text-[#D4FF32] flex items-center gap-[2px]">
            <ArrowUp size={10} weight="bold" />+14%
          </span>
        </div>
        <span className="font-['Sora'] font-normal text-[10px] leading-[15px] text-[#94A3B8]">
          12 transactions completed
        </span>
      </div>

      <div className="flex flex-col gap-2 mt-1">
        <div className="w-full h-[6px] rounded-full flex flex-row overflow-hidden gap-[1px]">
          {breakdown.map((item, index) => (
            <div key={index} className={`h-full ${item.color} rounded-full`} style={{ width: item.width }} />
          ))}
        </div>
        <div className="flex flex-row justify-between w-full">
          {breakdown.map((item, index) => (
            <div key={index} className="flex flex-row items-center gap-1">
              <div className={`w-[6px] h-[6px] rounded-full ${item.color}`} />
              <span className="font-['Nimbus_Sans'] font-medium text-[10px] leading-3 text-[#94A3B8]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-row justify-between w-full">
          {breakdown.map((item, index) => (
            <span key={index} className="font-['Nimbus_Sans'] font-semibold text-[10px] leading-3 text-[#CBD5E1]">
              {item.amount}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
