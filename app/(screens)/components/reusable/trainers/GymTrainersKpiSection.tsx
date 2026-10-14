import { User, CheckCircle, IdentificationBadge, UserPlus } from "@phosphor-icons/react";
import { GymTrainerKpis } from "./types";

interface GymTrainersKpiSectionProps {
  kpis: GymTrainerKpis;
}

export default function GymTrainersKpiSection({
  kpis,
}: GymTrainersKpiSectionProps) {
  const cards = [
    {
      label: "TOTAL TRAINERS",
      value: kpis.totalTrainers,
      icon: User,
      iconColor: "text-[#D4FF32]",
      iconBg: "bg-[#182315] border-[#263720]",
    },
    {
      label: "ACTIVE TRAINERS",
      value: kpis.activeTrainers,
      icon: CheckCircle,
      iconColor: "text-[#F59E0B]",
      iconBg: "bg-[#2E1E0E] border-[#4A3117]",
    },
    {
      label: "SPECIALIZATIONS",
      value: kpis.specializations,
      icon: IdentificationBadge,
      iconColor: "text-[#C084FC]",
      iconBg: "bg-[#241530] border-[#3E2353]",
    },
    {
      label: "NEW THIS MONTH",
      value: kpis.newThisMonth,
      icon: UserPlus,
      iconColor: "text-[#38BDF8]",
      iconBg: "bg-[#0F2231] border-[#1B3B52]",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full min-w-0">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="bg-[#0F141E] border border-[#1C2536] rounded-2xl p-3.5 sm:p-6 flex flex-col items-center justify-center text-center shadow-sm hover:border-[#2A374E] transition-colors"
          >
            <div
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center mb-2 sm:mb-3 shadow-inner shrink-0 ${card.iconBg} ${card.iconColor}`}
            >
              <Icon size={18} className="sm:hidden" weight="bold" />
              <Icon size={22} className="hidden sm:block" weight="bold" />
            </div>
            <span className="text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
              {card.value}
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] mt-1.5 sm:mt-2 text-center leading-tight">
              {card.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
