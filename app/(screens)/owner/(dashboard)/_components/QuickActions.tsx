import { UserPlus, Megaphone, QrCode, Cube, CreditCard, Fingerprint, Barbell, CaretRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

const ACTIONS = [
  {
    title: "Add Member",
    icon: <UserPlus size={24} color="#34D399" weight="regular" />,
    baseBg: "bg-[rgba(20,27,22,0.9)]",
    baseBorder: "border-[rgba(16,185,129,0.3)]",
    baseShadow: "shadow-[0_10px_24px_-8px_rgba(34,197,94,0.28)]",
    iconGradient: "bg-gradient-to-br from-[#34D399]/20 to-[#84CC16]/20",
    iconBorder: "border-[#34D399]/40",
    iconShadow: "shadow-[0_0_15px_rgba(34,197,94,0.3)]",
  },
  {
    title: "Announcement",
    icon: <Megaphone size={24} color="#C084FC" weight="regular" className="scale-x-[-1]" />,
    baseBg: "bg-[rgba(26,20,36,0.9)]",
    baseBorder: "border-[rgba(168,85,247,0.3)]",
    baseShadow: "shadow-[0_10px_24px_-8px_rgba(168,85,247,0.28)]",
    iconGradient: "bg-gradient-to-br from-[#C084FC]/20 to-[#D946EF]/20",
    iconBorder: "border-[#C084FC]/40",
    iconShadow: "shadow-[0_0_15px_rgba(168,85,247,0.3)]",
  },
  {
    title: "Open Check-in QR",
    icon: <QrCode size={24} color="#22D3EE" weight="regular" />,
    baseBg: "bg-[rgba(17,28,36,0.9)]",
    baseBorder: "border-[rgba(6,182,212,0.3)]",
    baseShadow: "shadow-[0_10px_24px_-8px_rgba(6,182,212,0.28)]",
    iconGradient: "bg-gradient-to-br from-[#22D3EE]/20 to-[#0EA5E9]/20",
    iconBorder: "border-[#22D3EE]/40",
    iconShadow: "shadow-[0_0_15px_rgba(6,182,212,0.3)]",
  },
  {
    title: "Manage Inventory",
    icon: <Cube size={24} color="#FB923C" weight="regular" />,
    baseBg: "bg-[rgba(34,23,17,0.9)]",
    baseBorder: "border-[rgba(249,115,22,0.3)]",
    baseShadow: "shadow-[0_10px_24px_-8px_rgba(249,115,22,0.28)]",
    iconGradient: "bg-gradient-to-br from-[#FB923C]/20 to-[#F59E0B]/20",
    iconBorder: "border-[#FB923C]/40",
    iconShadow: "shadow-[0_0_15px_rgba(249,115,22,0.3)]",
  },
  {
    title: "Record Payment",
    icon: <CreditCard size={24} color="#FACC15" weight="regular" />,
    baseBg: "bg-[rgba(32,28,16,0.9)]",
    baseBorder: "border-[rgba(245,158,11,0.3)]",
    baseShadow: "shadow-[0_10px_24px_-8px_rgba(234,179,8,0.28)]",
    iconGradient: "bg-gradient-to-br from-[#FACC15]/20 to-[#F59E0B]/20",
    iconBorder: "border-[#FACC15]/40",
    iconShadow: "shadow-[0_0_15px_rgba(234,179,8,0.3)]",
  },
  {
    title: "Manage Biometric",
    icon: <Fingerprint size={24} color="#FB7185" weight="regular" />,
    baseBg: "bg-[rgba(34,19,25,0.9)]",
    baseBorder: "border-[rgba(244,63,94,0.3)]",
    baseShadow: "shadow-[0_10px_24px_-8px_rgba(244,63,94,0.28)]",
    iconGradient: "bg-gradient-to-br from-[#FB7185]/20 to-[#EC4899]/20",
    iconBorder: "border-[#FB7185]/40",
    iconShadow: "shadow-[0_0_15px_rgba(244,63,94,0.3)]",
  },
  {
    title: "Create Plan",
    icon: <Image src="/images/Createplan.png" alt="Create Plan" width={24} height={24} quality={100} unoptimized className="object-contain" />,
    baseBg: "bg-[rgba(20,22,40,0.9)]",
    baseBorder: "border-[rgba(99,102,241,0.3)]",
    baseShadow: "shadow-[0_10px_24px_-8px_rgba(99,102,241,0.28)]",
    iconGradient: "bg-gradient-to-br from-[#818CF8]/20 to-[#3B82F6]/20",
    iconBorder: "border-[#818CF8]/40",
    iconShadow: "shadow-[0_0_15px_rgba(99,102,241,0.3)]",
  },
  {
    title: "PT Sessions",
    icon: <Barbell size={24} color="#F87171" weight="regular" className="-rotate-45" />,
    baseBg: "bg-[rgba(35,19,19,0.9)]",
    baseBorder: "border-[rgba(239,68,68,0.3)]",
    baseShadow: "shadow-[0_10px_24px_-8px_rgba(239,68,68,0.28)]",
    iconGradient: "bg-gradient-to-br from-[#F87171]/20 to-[#F43F5E]/20",
    iconBorder: "border-[#F87171]/40",
    iconShadow: "shadow-[0_0_15px_rgba(239,68,68,0.3)]",
  },
];

export default function QuickActions() {
  return (
    <div className="w-full h-auto bg-[#14151A] border border-[rgba(255,255,255,0.06)] rounded-[16px] p-4 sm:p-6 flex flex-col gap-5">
      <div className="flex flex-row justify-between items-center w-full">
        <h3 className="font-sans font-bold text-[16px] leading-[24px] tracking-[0.4px] text-white">
          Quick Actions
        </h3>
        <button className="flex flex-row items-center gap-1 group cursor-pointer">
          <span className="font-sans font-semibold text-[12px] leading-4 text-[#D4FF32] group-hover:underline">
            View All
          </span>
          <CaretRight size={12} color="#D4FF32" weight="bold" />
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full h-full">
        {ACTIONS.map((action, index) => (
          <button
            key={index}
            className={`w-full min-h-[114px] flex flex-col justify-center items-center px-2 py-4 rounded-[12px] border ${action.baseBg} ${action.baseBorder} ${action.baseShadow} hover:scale-[1.02] hover:brightness-110 transition-all duration-200 isolate relative group cursor-pointer`}
          >
            <div
              className={`w-11 h-11 flex justify-center items-center rounded-xl border ${action.iconGradient} ${action.iconBorder} ${action.iconShadow} mb-2.5 transition-transform group-hover:scale-105`}
            >
              {action.icon}
            </div>
            <span className="font-sans font-medium text-[11px] sm:text-[12px] leading-[14px] sm:leading-[15px] text-center text-[#E2E8F0] w-full">
              {action.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
