import { Warning, UserCircleMinus, ChatCircleDots, CaretRight } from "@phosphor-icons/react/dist/ssr";

const ALERTS = [
  {
    title: "8 Memberships expiring tomorrow",
    icon: <Warning size={16} color="#F43F5E" weight="bold" />,
  },
  {
    title: "Trainer leave pending approval",
    icon: <UserCircleMinus size={16} color="#FBBF24" weight="bold" />,
  },
  {
    title: "8 Memberships expiring tomorrow",
    icon: <Warning size={16} color="#F43F5E" weight="bold" />,
  },
  {
    title: "Trainer leave pending approval",
    icon: <UserCircleMinus size={16} color="#FBBF24" weight="bold" />,
  },
  {
    title: "New support ticket received",
    icon: <ChatCircleDots size={16} color="#34D399" weight="bold" />,
  },
];

export default function AlertsRemindersCard() {
  return (
    <div className="w-full bg-[#14151A] border border-[rgba(255,255,255,0.06)] rounded-[16px] p-4 flex flex-col gap-3">
      <div className="flex flex-row justify-between items-center w-full">
        <h3 className="font-sans font-bold text-[16px] leading-[24px] tracking-[0.4px] text-white">
          Alerts & Reminders
        </h3>
        <button className="flex flex-row items-center gap-1 group cursor-pointer">
          <span className="font-sans font-semibold text-[12px] leading-4 text-[#D4FF32] group-hover:underline">
            View All
          </span>
          <CaretRight size={12} color="#D4FF32" weight="bold" />
        </button>
      </div>

      <div className="flex flex-col gap-2 sm:gap-[10px] w-full">
        {ALERTS.map((alert, index) => (
          <div key={index} className="w-full min-h-[38px] bg-[#191B22] border border-[#222530] rounded-[12px] p-2.5 flex flex-row items-center justify-between group cursor-pointer hover:bg-[#1f222b] transition-colors">
            <div className="flex flex-row items-center gap-2.5 flex-1 min-w-0 pr-2">
              <div className="flex-shrink-0 flex items-center justify-center">
                {alert.icon}
              </div>
              <span className="font-sans font-normal text-[11px] sm:text-[12px] leading-[14px] sm:leading-4 text-[#CBD5E1] group-hover:text-white transition-colors break-words">
                {alert.title}
              </span>
            </div>
            <CaretRight size={14} color="#94A3B8" weight="bold" className="flex-shrink-0 group-hover:text-white transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
}
