import { FileText, CreditCard, CalendarCheck, CurrencyInr, Users, User, CaretRight } from "@phosphor-icons/react/dist/ssr";

const SHORTCUTS = [
  {
    title: "Membership Plans",
    icon: <FileText size={16} color="#D4FF32" weight="regular" />,
  },
  {
    title: "Payments",
    icon: <CreditCard size={16} color="#D4FF32" weight="regular" />,
  },
  {
    title: "Membership Renewals",
    icon: <CalendarCheck size={16} color="#D4FF32" weight="regular" />,
  },
  {
    title: "Finances",
    icon: <CurrencyInr size={16} color="#D4FF32" weight="regular" />,
  },
  {
    title: "Total Customers",
    icon: <Users size={16} color="#D4FF32" weight="regular" />,
  },
  {
    title: "Personal Training",
    icon: <User size={16} color="#D4FF32" weight="regular" />,
  },
];

export default function ManagementShortcuts() {
  return (
    <div className="w-full h-auto bg-[#14151A] border border-[rgba(255,255,255,0.06)] rounded-[16px] p-4 sm:p-6 flex flex-col gap-4">
      <div className="flex flex-row justify-between items-center w-full">
        <h3 className="font-sans font-bold text-[16px] leading-[24px] tracking-[0.4px] text-white">
          Management Shortcuts
        </h3>
        <button className="flex flex-row items-center gap-1 group cursor-pointer">
          <span className="font-sans font-semibold text-[12px] leading-4 text-[#D4FF32] group-hover:underline">
            View All
          </span>
          <CaretRight size={12} color="#D4FF32" weight="bold" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full">
        {SHORTCUTS.map((shortcut, index) => (
          <button
            key={index}
            className="w-full min-h-[42px] bg-[#191B22] border border-[#222530] rounded-[12px] flex flex-row items-center py-2 px-4 gap-[10px] hover:bg-[#1f222b] transition-colors cursor-pointer group"
          >
            <div className="group-hover:scale-110 transition-transform flex-shrink-0 flex items-center justify-center">
              {shortcut.icon}
            </div>
            <span className="font-sans font-medium text-[11px] lg:text-[12px] leading-[14px] lg:leading-4 text-[#CBD5E1] text-left break-words">
              {shortcut.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
