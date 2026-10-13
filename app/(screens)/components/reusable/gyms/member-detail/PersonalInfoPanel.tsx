import { User, CalendarBlank, GenderIntersex, Phone, Envelope, MapPin } from "@phosphor-icons/react";
import { MemberProfileDetails } from "./types";

interface PersonalInfoPanelProps {
  profile: MemberProfileDetails;
}

export default function PersonalInfoPanel({ profile }: PersonalInfoPanelProps) {
  const items = [
    {
      icon: CalendarBlank,
      label: "Date of Birth",
      value: profile.dateOfBirth,
    },
    {
      icon: GenderIntersex,
      label: "Gender",
      value: profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1),
    },
    {
      icon: Phone,
      label: "Phone Number",
      value: profile.phone,
    },
    {
      icon: Envelope,
      label: "Email Address",
      value: profile.email,
    },
    {
      icon: MapPin,
      label: "Address",
      value: profile.address,
    },
  ];

  return (
    <div className="w-full min-w-0 bg-[#141720] border border-[#1E2433] rounded-2xl p-4 sm:p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2.5 pb-2 border-b border-[#1E2536]">
        <User size={18} weight="bold" className="text-[#D4FF32]" />
        <h3 className="text-base font-bold text-white tracking-tight">
          Personal Information
        </h3>
      </div>

      <div className="flex flex-col gap-3.5">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex items-start justify-between gap-3 sm:gap-4 py-1.5 text-xs sm:text-sm min-w-0"
            >
              <div className="flex items-center gap-2 text-[#94A3B8] shrink-0">
                <Icon size={16} className="text-[#64748B] shrink-0" />
                <span className="whitespace-nowrap">{item.label}</span>
              </div>
              <span className="text-white font-medium text-right break-words [overflow-wrap:anywhere] min-w-0 max-w-[60%] sm:max-w-[65%] leading-snug">
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
