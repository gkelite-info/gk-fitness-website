import { User, EnvelopeSimple, Phone, MapPin } from "@phosphor-icons/react";
import Avatar from "../../Avatar";

interface GymOwnerAndAddressSectionProps {
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  ownerAvatarUrl?: string;
  address: string;
  className?: string;
}

export default function GymOwnerAndAddressSection({
  ownerName,
  ownerEmail,
  ownerPhone,
  ownerAvatarUrl,
  address,
  className = "",
}: GymOwnerAndAddressSectionProps) {
  return (
    <div className={`flex flex-col h-full w-full min-w-0 ${className}`}>
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2 text-[#D4FF32] text-xs font-bold uppercase tracking-wider">
          <User size={15} weight="bold" />
          <span>OWNER DETAILS</span>
        </div>

        <div className="bg-[#0F141E] border border-[#1C2536] rounded-2xl p-5 sm:p-6 flex flex-col gap-4 shadow-sm">
          <div className="flex items-center gap-3.5">
            <Avatar
              src={ownerAvatarUrl}
              alt={ownerName}
              className="w-12 h-12 rounded-full border border-[#222E42] shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  title={ownerName}
                  className="text-base font-bold text-white tracking-tight truncate max-w-full"
                >
                  {ownerName}
                </span>
                <span className="bg-[#D4FF32] text-black text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-wider shrink-0">
                  OWNER
                </span>
              </div>
              <span className="text-xs text-[#94A3B8] mt-0.5 truncate">
                Primary Gym Administrator
              </span>
            </div>
          </div>

          <div className="w-full h-px bg-[#1C2536]" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm text-[#CBD5E1]">
            <div
              title={ownerEmail}
              className="flex items-center gap-2 min-w-0 flex-1 cursor-default group"
            >
              <EnvelopeSimple size={16} className="text-[#64748B] shrink-0 group-hover:text-[#D4FF32] transition-colors" />
              <span className="truncate">{ownerEmail}</span>
            </div>

            <div
              title={ownerPhone}
              className="flex items-center gap-2 shrink-0 cursor-default group"
            >
              <Phone size={16} className="text-[#64748B] shrink-0 group-hover:text-[#D4FF32] transition-colors" />
              <span className="whitespace-nowrap">{ownerPhone}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 flex-1 mt-6">
        <div className="flex items-center gap-2 text-[#D4FF32] text-xs font-bold uppercase tracking-wider">
          <MapPin size={15} weight="bold" />
          <span>ADDRESS</span>
        </div>

        <div
          title={address}
          className="bg-[#0F141E] border border-[#1C2536] rounded-2xl p-5 sm:p-6 shadow-sm flex-1"
        >
          <p className="text-sm text-[#CBD5E1] leading-relaxed">
            {address}
          </p>
        </div>
      </div>
    </div>
  );
}
