import { Barbell, UsersThree, CalendarCheck, CaretRight } from "@phosphor-icons/react/dist/ssr";

const OPERATIONS = [
  {
    title: "PT SESSIONS",
    value: "18",
    icon: <Barbell size={20} color="#D4FF32" weight="regular" />,
  },
  {
    title: "GROUP CLASSES",
    value: "6",
    icon: <UsersThree size={20} color="#D4FF32" weight="regular" />,
  },
  {
    title: "RENEWALS",
    value: "5",
    icon: <CalendarCheck size={20} color="#D4FF32" weight="regular" />,
  },
];

interface OperationsMetricsProps {
  ptSessionsCount: number;
}

export default function OperationsMetrics({ ptSessionsCount }: OperationsMetricsProps) {
  return (
    <div className="w-full bg-[#14151A] border border-[rgba(255,255,255,0.06)] rounded-[16px] p-4 sm:p-6 flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center w-full">
        <h3 className="font-sans font-bold text-[16px] leading-[24px] tracking-[0.4px] text-white">
          Today&apos;s Operations
        </h3>
        <button className="flex flex-row items-center gap-1 group cursor-pointer">
          <span className="font-sans font-semibold text-[12px] leading-4 text-[#D4FF32] group-hover:underline">
            View Details
          </span>
          <CaretRight size={12} color="#D4FF32" weight="bold" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full">
        <div className="w-full bg-[#191B22] border border-[#222530] rounded-[12px] p-2 sm:p-[14px] flex flex-col items-center justify-center min-h-[80px]">
          <div className="flex-shrink-0">
            <Barbell size={20} color="#D4FF32" weight="regular" />
          </div>
          <span className="font-sans font-bold text-[20px] leading-[28px] text-white mt-1.5">
            {ptSessionsCount}
          </span>
          <span className="font-sans font-semibold text-[9px] sm:text-[10px] leading-[13px] sm:leading-[15px] tracking-[0.5px] uppercase text-[#94A3B8] text-center mt-0.5 break-words">
            PT SESSIONS
          </span>
        </div>

        <div className="w-full bg-[#191B22] border border-[#222530] rounded-[12px] p-2 sm:p-[14px] flex flex-col items-center justify-center min-h-[80px]">
          <div className="flex-shrink-0">
            <UsersThree size={20} color="#D4FF32" weight="regular" />
          </div>
          <span className="font-sans font-bold text-[20px] leading-[28px] text-white mt-1.5">
            0
          </span>
          <span className="font-sans font-semibold text-[9px] sm:text-[10px] leading-[13px] sm:leading-[15px] tracking-[0.5px] uppercase text-[#94A3B8] text-center mt-0.5 break-words">
            GROUP CLASSES
          </span>
        </div>

        <div className="w-full bg-[#191B22] border border-[#222530] rounded-[12px] p-2 sm:p-[14px] flex flex-col items-center justify-center min-h-[80px]">
          <div className="flex-shrink-0">
            <CalendarCheck size={20} color="#D4FF32" weight="regular" />
          </div>
          <span className="font-sans font-bold text-[20px] leading-[28px] text-white mt-1.5">
            0
          </span>
          <span className="font-sans font-semibold text-[9px] sm:text-[10px] leading-[13px] sm:leading-[15px] tracking-[0.5px] uppercase text-[#94A3B8] text-center mt-0.5 break-words">
            RENEWALS
          </span>
        </div>
      </div>
    </div>
  );
}
