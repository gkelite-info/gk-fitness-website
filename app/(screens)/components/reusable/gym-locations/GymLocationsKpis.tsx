import { Buildings, MapPin, Clock } from "@phosphor-icons/react";
import { GymLocationsKpiStats } from "./gymLocationsTypes";

interface GymLocationsKpisProps {
  stats: GymLocationsKpiStats;
}

export default function GymLocationsKpis({ stats }: GymLocationsKpisProps) {
  const cards = [
    {
      label: "Total Gyms",
      value: stats.totalGyms,
      icon: Buildings,
      iconColor: "text-[#22C55E]",
      bgBox: "bg-[#132A1E] border border-[#165330]",
    },
    {
      label: "Locations Added",
      value: stats.locationsAdded,
      icon: MapPin,
      iconColor: "text-[#2DD4BF]",
      bgBox: "bg-[#102B28] border border-[#144A42]",
    },
    {
      label: "Locations Pending",
      value: stats.locationsPending,
      icon: Clock,
      iconColor: "text-[#F59E0B]",
      bgBox: "bg-[#2D2314] border border-[#523F1C]",
    },
  ];

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 lg:gap-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.label}
            className="w-full bg-[#13151B] border border-[#232631] rounded-2xl p-4 sm:p-5 flex items-center gap-4 shadow-sm transition-all"
          >
            <div
              className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl ${card.bgBox} flex items-center justify-center shrink-0 shadow-inner`}
            >
              <Icon size={22} weight="fill" className={card.iconColor} />
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-xs font-medium text-[#94A3B8] tracking-normal">
                {card.label}
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight mt-0.5">
                {card.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
