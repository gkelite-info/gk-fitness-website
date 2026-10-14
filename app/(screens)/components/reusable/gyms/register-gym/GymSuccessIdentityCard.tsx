import { CalendarBlank } from "@phosphor-icons/react";
import Image from "next/image";

interface GymSuccessIdentityCardProps {
  gymName: string;
  city: string;
  state: string;
  logoUrl?: string;
  registeredDate?: string;
}

export default function GymSuccessIdentityCard({
  gymName,
  city,
  state,
  logoUrl,
  registeredDate,
}: GymSuccessIdentityCardProps) {
  const displayDate = registeredDate || "20 Jul 2026";
  const displayLocation = [city, state].filter(Boolean).join(", ") || "Hyderabad, Telangana";

  return (
    <div className="w-full bg-[#141B26] border border-[#1F2A3D] rounded-xl sm:rounded-2xl p-3.5 sm:p-4 flex items-center gap-3.5 sm:gap-4 min-w-0">
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white border border-[#2D394E] flex items-center justify-center shrink-0 overflow-hidden relative shadow-sm">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={gymName || "Gym Logo"}
            fill
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-white flex items-center justify-center text-[#0F141E] font-black text-lg select-none">
            {gymName ? gymName.charAt(0).toUpperCase() : "G"}
          </div>
        )}
      </div>

      <div className="flex flex-col min-w-0 flex-1 justify-center">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-base sm:text-lg font-bold text-white truncate max-w-[200px] sm:max-w-xs">
            {gymName || "PowerHouse Gym"}
          </h3>
          <span className="bg-[#D4FF32] text-black font-extrabold text-[10px] sm:text-xs px-2 py-0.5 rounded uppercase tracking-wider shrink-0 select-none">
            ACTIVE
          </span>
        </div>

        <p className="text-xs sm:text-sm text-[#94A3B8] truncate mt-0.5">
          {displayLocation}
        </p>

        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#64748B] mt-1 shrink-0">
          <CalendarBlank size={13} weight="bold" className="shrink-0 text-[#94A3B8]" />
          <span>Registered: {displayDate}</span>
        </div>
      </div>
    </div>
  );
}
