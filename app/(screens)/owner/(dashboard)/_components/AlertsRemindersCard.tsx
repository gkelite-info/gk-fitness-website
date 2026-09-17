import { WarningCircle, Clock, CaretRight } from "@phosphor-icons/react/dist/ssr";

const ALERTS = [
  {
    title: "8 Memberships expiring tomorrow",
    icon: <WarningCircle size={16} color="#FB923C" weight="fill" />,
    bg: "bg-[#2C1F16]",
  },
  {
    title: "Trainer leave pending approval",
    icon: <Clock size={16} color="#60A5FA" weight="fill" />,
    bg: "bg-[#172136]",
  },
  {
    title: "8 Memberships expiring tomorrow",
    icon: <WarningCircle size={16} color="#FB923C" weight="fill" />,
    bg: "bg-[#2C1F16]",
  },
  {
    title: "Trainer leave pending approval",
    icon: <Clock size={16} color="#60A5FA" weight="fill" />,
    bg: "bg-[#172136]",
  },
  {
    title: "New support ticket received",
    icon: <Clock size={16} color="#A78BFA" weight="fill" />,
    bg: "bg-[#1E1736]",
  },
];

export default function AlertsRemindersCard() {
  return (
    <div className="w-full bg-[#14151A] border border-white/[0.06] rounded-2xl p-5 pt-[18px] flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center w-full">
        <h3 className="font-['Nimbus_Sans'] font-bold text-[16px] leading-[24px] tracking-[0.4px] text-white">
          Alerts & Reminders
        </h3>
        <button className="flex flex-row items-center gap-1 group cursor-pointer">
          <span className="font-['Nimbus_Sans'] font-semibold text-[12px] leading-4 text-[#D4FF32] group-hover:underline">
            View All
          </span>
          <CaretRight size={12} color="#D4FF32" weight="bold" />
        </button>
      </div>

      <div className="flex flex-col gap-[10px] w-full">
        {ALERTS.map((alert, index) => (
          <div key={index} className="flex flex-row items-center justify-between w-full group cursor-pointer">
            <div className="flex flex-row items-center gap-3 min-w-0">
              <div className={`w-7 h-7 flex justify-center items-center rounded-lg flex-shrink-0 ${alert.bg}`}>
                {alert.icon}
              </div>
              <span className="font-['Nimbus_Sans'] font-medium text-[13px] leading-5 text-[#E2E8F0] group-hover:text-white transition-colors truncate">
                {alert.title}
              </span>
            </div>
            <CaretRight size={14} color="#94A3B8" weight="bold" className="flex-shrink-0 ml-2 group-hover:text-white" />
          </div>
        ))}
      </div>
    </div>
  );
}
