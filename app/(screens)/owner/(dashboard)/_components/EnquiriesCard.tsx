import { Fire, ThermometerSimple, Snowflake, DotsThreeOutline } from "@phosphor-icons/react/dist/ssr";

export default function EnquiriesCard() {
  const breakdown = [
    { label: "Hot", count: 8, icon: <Fire size={14} color="#F87171" weight="fill" /> },
    { label: "Warm", count: 11, icon: <ThermometerSimple size={14} color="#FB923C" weight="fill" /> },
    { label: "Cold", count: 3, icon: <Snowflake size={14} color="#60A5FA" weight="fill" /> },
    { label: "Others", count: 2, icon: <DotsThreeOutline size={14} color="#94A3B8" weight="fill" /> },
  ];

  return (
    <div className="w-full bg-[#14151A] border border-white/[0.06] rounded-2xl p-5 pt-[18px] flex flex-col gap-3">
      <div className="flex flex-col items-center gap-0">
        <span className="font-['Nimbus_Sans'] font-black text-[28px] leading-[36px] text-white">
          24
        </span>
        <span className="font-['Nimbus_Sans'] font-semibold text-[12px] leading-4 text-[#D4FF32]">
          Open Enquiries
        </span>
      </div>

      <div className="flex flex-col gap-[6px] w-full mt-1">
        {breakdown.map((item, index) => (
          <div key={index} className="flex flex-row justify-between items-center w-full h-[28px] bg-white/[0.02] rounded-lg px-3">
            <div className="flex flex-row items-center gap-2">
              {item.icon}
              <span className="font-['Nimbus_Sans'] font-medium text-[12px] leading-[15px] text-[#CBD5E1]">
                {item.label}
              </span>
            </div>
            <span className="font-['Nimbus_Sans'] font-bold text-[13px] leading-[16px] text-white">
              {item.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
