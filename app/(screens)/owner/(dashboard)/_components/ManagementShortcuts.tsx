import { IdentificationBadge, Wallet, ArrowsClockwise, ChartBar, Users, Barbell, CaretRight } from "@phosphor-icons/react/dist/ssr";

const SHORTCUTS = [
  {
    title: "Membership Plans",
    icon: <IdentificationBadge size={20} color="#94A3B8" weight="regular" />,
  },
  {
    title: "Payments",
    icon: <Wallet size={20} color="#94A3B8" weight="regular" />,
  },
  {
    title: "Membership Renewals",
    icon: <ArrowsClockwise size={20} color="#94A3B8" weight="regular" />,
  },
  {
    title: "Finances",
    icon: <ChartBar size={20} color="#94A3B8" weight="regular" />,
  },
  {
    title: "Total Customers",
    icon: <Users size={20} color="#94A3B8" weight="regular" />,
  },
  {
    title: "Personal Training",
    icon: <Barbell size={20} color="#94A3B8" weight="regular" />,
  },
];

export default function ManagementShortcuts() {
  return (
    <div className="w-full h-auto sm:h-[190px] bg-[#14151A] border border-white/5 rounded-2xl p-6 pt-[18px] flex flex-col gap-4">
      {/* Header */}
      <div className="flex flex-row justify-between items-center w-full">
        <h3 className="font-['Nimbus_Sans'] font-bold text-[16px] leading-[24px] tracking-[0.4px] text-white">
          Management Shortcuts
        </h3>
        <button className="flex flex-row items-center gap-1 group cursor-pointer">
          <span className="font-['Nimbus_Sans'] font-semibold text-[12px] leading-4 text-[#D4FF32] group-hover:underline">
            View All
          </span>
          <CaretRight size={12} color="#D4FF32" weight="bold" />
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full">
        {SHORTCUTS.map((shortcut, index) => (
          <button
            key={index}
            className="w-full h-[52px] bg-white/[0.02] border border-white/[0.04] rounded-xl flex flex-row items-center p-3 gap-3 hover:bg-white/[0.04] transition-colors cursor-pointer group"
          >
            <div className="group-hover:scale-110 transition-transform">
              {shortcut.icon}
            </div>
            <span className="font-['Nimbus_Sans'] font-semibold text-[13px] leading-5 text-[#E2E8F0]">
              {shortcut.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
