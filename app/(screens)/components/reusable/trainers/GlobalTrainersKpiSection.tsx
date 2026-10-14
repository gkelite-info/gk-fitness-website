import { User, Buildings, Globe, CheckCircle } from "@phosphor-icons/react";
import { TrainerKpis } from "./types";

interface GlobalTrainersKpiSectionProps {
  kpis: TrainerKpis;
}

export default function GlobalTrainersKpiSection({
  kpis,
}: GlobalTrainersKpiSectionProps) {
  const cards = [
    {
      label: "TOTAL TRAINERS",
      value: kpis.totalTrainers,
      icon: User,
      iconColor: "text-[#D4FF32]",
      iconBg: "bg-[#182315] border-[#263720]",
    },
    {
      label: "FROM GYMS",
      value: kpis.fromGyms,
      icon: Buildings,
      iconColor: "text-[#38BDF8]",
      iconBg: "bg-[#0F2231] border-[#1B3B52]",
    },
    {
      label: "ADDED DIRECTLY",
      value: kpis.addedDirectly,
      icon: Globe,
      iconColor: "text-[#C084FC]",
      iconBg: "bg-[#241530] border-[#3E2353]",
    },
    {
      label: "ACTIVE TRAINERS",
      value: kpis.activeTrainers,
      icon: CheckCircle,
      iconColor: "text-[#F59E0B]",
      iconBg: "bg-[#2E1E0E] border-[#4A3117]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full min-w-0">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="bg-[#0F141E] border border-[#1C2536] rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center text-center shadow-sm hover:border-[#2A374E] transition-colors"
          >
            <div
              className={`w-11 h-11 rounded-full border flex items-center justify-center mb-3 shadow-inner ${card.iconBg} ${card.iconColor}`}
            >
              <Icon size={22} weight="bold" />
            </div>
            <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
              {card.value}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] mt-2">
              {card.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
