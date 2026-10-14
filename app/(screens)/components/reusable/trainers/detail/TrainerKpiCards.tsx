import { UsersThree, Star, Clock, Certificate } from "@phosphor-icons/react";
import { TrainerItem } from "../types";

interface TrainerKpiCardsProps {
  trainer: TrainerItem;
}

export default function TrainerKpiCards({ trainer }: TrainerKpiCardsProps) {
  const cards = [
    {
      value: "230+",
      label: "Clients Trained",
      icon: UsersThree,
      isSpecial: false,
    },
    {
      value: `${trainer.rating}`,
      label: `Rating (${trainer.reviewCount} Reviews)`,
      icon: Star,
      isSpecial: false,
    },
    {
      value: "ACE",
      label: "Certified",
      icon: Certificate,
      isSpecial: true,
    },
    {
      value: `${trainer.experienceYears}+`,
      label: "Years Experience",
      icon: Clock,
      isSpecial: false,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 w-full min-w-0">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.label}
            className="bg-[#0F141E] border border-[#1C2536] rounded-2xl p-3.5 sm:p-5 flex flex-col items-center justify-center text-center shadow-sm hover:border-[#2A374E] transition-colors min-h-[96px] h-full"
          >
            <div className="w-9 h-9 rounded-full bg-[#182315] border border-[#263720] flex items-center justify-center text-[#D4FF32] mb-2 shrink-0">
              <Icon size={18} weight="bold" />
            </div>

            <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-none">
              {c.value}
            </span>

            <span className="text-[11px] sm:text-xs font-semibold text-[#94A3B8] mt-1.5 leading-tight text-center break-words max-w-full">
              {c.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
