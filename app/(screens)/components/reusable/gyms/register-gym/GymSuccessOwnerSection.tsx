interface GymSuccessOwnerSectionProps {
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  ownerPhoneCode?: string;
}

export default function GymSuccessOwnerSection({
  ownerName,
  ownerEmail,
  ownerPhone,
  ownerPhoneCode = "+91",
}: GymSuccessOwnerSectionProps) {
  const formattedPhone = `${ownerPhoneCode} ${ownerPhone}`.trim();
  const displayName = ownerName || "Rahul Sharma";
  const displayEmail = ownerEmail || "rahul.sharma@fitness.com";
  const displayPhone = ownerPhone ? formattedPhone : "+91 98765 43210";

  return (
    <div className="flex flex-col min-w-0">
      <h4 className="text-[11px] sm:text-xs font-bold text-[#D4FF32] uppercase tracking-wider mb-2.5 sm:mb-3">
        OWNER DETAILS
      </h4>

      <div className="w-full bg-[#141B26] border border-[#1F2A3D] rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col justify-between gap-3.5 sm:gap-4 flex-1">
        <div className="flex items-center justify-between gap-3 text-xs sm:text-sm min-w-0">
          <span className="text-[#94A3B8] whitespace-nowrap shrink-0">Full Name</span>
          <span className="text-white font-semibold text-right break-words min-w-0">
            {displayName}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2.5 sm:gap-3 text-xs sm:text-sm min-w-0">
          <span className="text-[#94A3B8] whitespace-nowrap shrink-0">Email Address</span>
          <span
            title={displayEmail}
            className="text-white font-semibold text-right text-xs sm:text-[13px] break-words [overflow-wrap:anywhere] min-w-0 flex-1 leading-snug"
          >
            {displayEmail}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 text-xs sm:text-sm min-w-0">
          <span className="text-[#94A3B8] whitespace-nowrap shrink-0">Phone Number</span>
          <span className="text-white font-semibold text-right whitespace-nowrap shrink-0">
            {displayPhone}
          </span>
        </div>
      </div>
    </div>
  );
}
