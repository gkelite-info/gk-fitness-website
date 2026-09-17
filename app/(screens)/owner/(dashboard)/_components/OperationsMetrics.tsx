import { Barbell, UsersThree, ArrowsClockwise, CaretRight } from "@phosphor-icons/react/dist/ssr";

const OPERATIONS = [
  {
    title: "PT SESSIONS",
    value: "18",
    icon: <Barbell size={20} color="#D4FF32" weight="fill" />,
  },
  {
    title: "GROUP CLASSES",
    value: "6",
    icon: <UsersThree size={20} color="#D4FF32" weight="fill" />,
  },
  {
    title: "RENEWALS",
    value: "5",
    icon: <ArrowsClockwise size={20} color="#D4FF32" weight="bold" />,
  },
];

export default function OperationsMetrics() {
  return (
    <div className="w-full bg-[#14151A] border border-white/[0.06] rounded-2xl p-6 pt-[18px] flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center w-full">
        <h3 className="font-['Nimbus_Sans'] font-bold text-[16px] leading-[24px] tracking-[0.4px] text-white">
          Today&apos;s Operations
        </h3>
        <button className="flex flex-row items-center gap-1 group cursor-pointer">
          <span className="font-['Nimbus_Sans'] font-semibold text-[12px] leading-4 text-[#D4FF32] group-hover:underline">
            View Details
          </span>
          <CaretRight size={12} color="#D4FF32" weight="bold" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3 w-full">
        {OPERATIONS.map((op, index) => (
          <div
            key={index}
            className="w-full bg-white/[0.02] border border-white/[0.04] rounded-[14px] p-4 flex flex-col items-center justify-center gap-2"
          >
            {op.icon}
            <span className="font-['Nimbus_Sans'] font-black text-[28px] leading-[34px] text-white">
              {op.value}
            </span>
            <span className="font-['Nimbus_Sans'] font-bold text-[10px] leading-3 tracking-[0.5px] uppercase text-[#94A3B8] text-center">
              {op.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
