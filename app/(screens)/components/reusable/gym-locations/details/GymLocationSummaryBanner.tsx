import { User, MapPin, Clock } from "@phosphor-icons/react";
import { GymLocationItem } from "../gymLocationsTypes";

interface GymLocationSummaryBannerProps {
  gym: GymLocationItem;
}

export default function GymLocationSummaryBanner({ gym }: GymLocationSummaryBannerProps) {
  const isAdded = gym.status === "added";

  return (
    <div className="w-full bg-[#13151B] border border-[#232631] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm min-w-0 max-w-full overflow-hidden">
      <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#181A22] border border-[#262A37] overflow-hidden shrink-0 shadow-sm relative">
          {gym.imageUrl ? (
            <img
              src={gym.imageUrl}
              alt={gym.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-black text-white font-bold text-xs uppercase">
              {gym.name.slice(0, 2)}
            </div>
          )}
        </div>

        <div className="flex flex-col min-w-0">
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug truncate">
            {gym.name}
          </h2>

          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#94A3B8] mt-1">
            <User size={15} weight="regular" className="text-[#94A3B8] shrink-0" />
            <span className="truncate">Owner: {gym.ownerName}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-[#1E222D] min-w-0">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#94A3B8]">
          <MapPin size={16} weight="fill" className="text-[#94A3B8] shrink-0" />
          <div className="flex flex-col">
            <span className="text-[11px] text-[#64748B] font-medium leading-tight">City</span>
            <span className="text-white font-medium truncate">{gym.location}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#94A3B8]">
          <Clock size={16} weight="fill" className="text-[#94A3B8] shrink-0" />
          <div className="flex flex-col">
            <span className="text-[11px] text-[#64748B] font-medium leading-tight">Location Status</span>
            <div className="mt-0.5">
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
      </div>
    </div>
  );
}
