import { UserPlus, Megaphone, QrCode, Cube, CreditCard, Fingerprint, Barbell, CaretRight, CurrencyCircleDollar, UsersThree, Certificate } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

const ACTIONS = [
  {
    title: "Add Users",
    icon: <UserPlus size={24} color="#34D399" weight="regular" />,
    href: "/owner/users/add",
    baseBg: "bg-[rgba(20,27,22,0.9)]",
    baseBorder: "border-[rgba(16,185,129,0.3)]",
    baseShadow: "shadow-[0_10px_24px_-8px_rgba(34,197,94,0.28)]",
    iconGradient: "bg-gradient-to-br from-[#34D399]/20 to-[#84CC16]/20",
    iconBorder: "border-[#34D399]/40",
    iconShadow: "shadow-[0_0_15px_rgba(34,197,94,0.3)]",
  },
  {
    title: "Expenditure",
    href: "/owner/expenditure",
    icon: <CurrencyCircleDollar size={24} color="#A855F7" weight="regular" />,
    baseBg: "bg-[rgba(27,20,38,0.9)]",
    baseBorder: "border-[rgba(168,85,247,0.3)]",
    baseShadow: "shadow-[0_10px_24px_-8px_rgba(168,85,247,0.28)]",
    iconGradient: "bg-gradient-to-br from-[#A855F7]/20 to-[#D946EF]/20",
    iconBorder: "border-[#A855F7]/40",
    iconShadow: "shadow-[0_0_15px_rgba(168,85,247,0.3)]",
  },
  {
    title: "Enquiries",
    href: "/owner/enquiries",
    icon: <UsersThree size={24} color="#38BDF8" weight="regular" />,
    baseBg: "bg-[rgba(15,23,42,0.9)]",
    baseBorder: "border-[rgba(56,189,248,0.3)]",
    baseShadow: "shadow-[0_10px_24px_-8px_rgba(56,189,248,0.28)]",
    iconGradient: "bg-gradient-to-br from-[#38BDF8]/20 to-[#0EA5E9]/20",
    iconBorder: "border-[#38BDF8]/40",
    iconShadow: "shadow-[0_0_15px_rgba(56,189,248,0.3)]",
  },
  {
    title: "Manage Inventory",
    href: "/owner/inventory",
    icon: <Cube size={24} color="#FB923C" weight="regular" />,
    baseBg: "bg-[rgba(34,23,17,0.9)]",
    baseBorder: "border-[rgba(249,115,22,0.3)]",
    baseShadow: "shadow-[0_10px_24px_-8px_rgba(249,115,22,0.28)]",
    iconGradient: "bg-gradient-to-br from-[#FB923C]/20 to-[#F59E0B]/20",
    iconBorder: "border-[#FB923C]/40",
    iconShadow: "shadow-[0_0_15px_rgba(249,115,22,0.3)]",
  },
  {
    title: "Finance",
    href: "/owner/finance",
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
    href: "/owner/biometric",
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
    href: "/owner/membership-plans",
    icon: <Certificate size={24} color="#818CF8" weight="regular" />,
    baseBg: "bg-[rgba(20,22,40,0.9)]",
    baseBorder: "border-[rgba(99,102,241,0.3)]",
    baseShadow: "shadow-[0_10px_24px_-8px_rgba(99,102,241,0.28)]",
    iconGradient: "bg-gradient-to-br from-[#818CF8]/20 to-[#3B82F6]/20",
    iconBorder: "border-[#818CF8]/40",
    iconShadow: "shadow-[0_0_15px_rgba(99,102,241,0.3)]",
  },
  {
    title: "PT Sessions",
    href: "/owner/pt-sessions",
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
        {/* <button className="flex flex-row items-center gap-1 group cursor-pointer">
          <span className="font-sans font-semibold text-[12px] leading-4 text-[#D4FF32] group-hover:underline">
            View All
          </span>
          <CaretRight size={12} color="#D4FF32" weight="bold" />
        </button> */}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full h-full">
        {ACTIONS.map((action, index) => {
          const Content = (
            <div
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
            </div>
          );

          if (action.href) {
            return (
              <Link href={action.href} key={index} className="w-full">
                {Content}
              </Link>
            );
          }

          return (
            <button key={index} className="w-full text-left">
              {Content}
            </button>
          );
        })}
      </div>
    </div>
  );
}
