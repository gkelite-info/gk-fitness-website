import { MapPin, CaretRight } from "@phosphor-icons/react";
import { GymLocationItem } from "./gymLocationsTypes";

interface GymLocationCardProps {
  gym: GymLocationItem;
  onAction?: (gym: GymLocationItem) => void;
}

export default function GymLocationCard({ gym, onAction }: GymLocationCardProps) {
  const isAdded = gym.status === "added";

  return (
    <div className="w-full bg-[#13151B] border border-[#232631] hover:border-[#383D4E] rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all shadow-sm group min-w-0">
      <div className="flex items-start gap-3.5 sm:gap-4 min-w-0">
        <div className="w-[74px] h-[74px] sm:w-[84px] sm:h-[84px] rounded-xl shrink-0 overflow-hidden bg-[#181A22] border border-[#262A37] relative shadow-sm">
          {gym.imageUrl ? (
            <img
              src={gym.imageUrl}
              alt={gym.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#181A22] text-[#94A3B8] font-bold text-xs uppercase">
              {gym.name.slice(0, 2)}
            </div>
          )}
        </div>

        <div className="flex flex-col min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug break-words">
            {gym.name}
          </h3>

          <span className="text-xs text-[#94A3B8] font-normal mt-0.5 break-words">
            Owner: {gym.ownerName}
          </span>

          <div className="flex items-center gap-1.5 mt-1 text-xs text-[#94A3B8] min-w-0">
            <MapPin size={14} weight="fill" className="text-[#94A3B8] shrink-0" />
            <span className="break-words">{gym.location}</span>
          </div>

          <div className="mt-2.5">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${isAdded
                  ? "bg-[rgba(34,197,94,0.12)] border border-[rgba(34,197,94,0.25)] text-[#22C55E]"
                  : "bg-[rgba(245,158,11,0.12)] border border-[rgba(245,158,11,0.25)] text-[#F59E0B]"
                }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${isAdded ? "bg-[#22C55E]" : "bg-[#F59E0B]"
                  } shrink-0`}
              />
              {isAdded ? "Location Added" : "Location Not Added"}
            </span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onAction?.(gym)}
        className={`w-full h-[40px] sm:h-[42px] rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-all mt-4 sm:mt-5 cursor-pointer ${isAdded
            ? "border border-[#282C3A] hover:border-[#D4FF32] bg-[#161822] hover:bg-[#1C202C] text-white hover:text-[#D4FF32]"
            : "bg-[#D4FF32] hover:bg-[#c5ec2b] text-black shadow-[0_0_15px_rgba(212,255,50,0.22)] active:scale-[0.99]"
          }`}
      >
        <span>{isAdded ? "View & Edit" : "Add Location"}</span>
        <CaretRight size={14} weight="bold" />
      </button>
    </div>
  );
}
