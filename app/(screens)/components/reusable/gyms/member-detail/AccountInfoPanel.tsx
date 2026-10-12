import { ShieldCheck, CalendarBlank, Barbell, Star, Clock, User } from "@phosphor-icons/react";
import { MemberProfileDetails } from "./types";

interface AccountInfoPanelProps {
  profile: MemberProfileDetails;
}

export default function AccountInfoPanel({ profile }: AccountInfoPanelProps) {
  const isTrainer = profile.role === "trainer";
  const isOwner = profile.role === "owner";

  const fourthLabel = isTrainer ? "Certifications" : isOwner ? "Equity / Stake" : "Renewal Date";
  const fifthLabel = isTrainer ? "Active Clients" : isOwner ? "Role Responsibility" : "Assigned Trainer";

  const items = [
    {
      icon: CalendarBlank,
      label: "Joined Date",
      value: profile.joinedDate,
      isHighlight: false,
    },
    {
      icon: Barbell,
      label: "Current Gym",
      value: profile.currentGym,
      isHighlight: false,
    },
    {
      icon: Star,
      label: profile.highlightLabel,
      value: profile.highlightValue,
      isHighlight: true,
    },
    {
      icon: Clock,
      label: fourthLabel,
      value: profile.renewalOrCert,
      isHighlight: false,
    },
    {
      icon: User,
      label: fifthLabel,
      value: profile.assignedPersonOrBatches,
      isHighlight: false,
    },
  ];

  return (
    <div className="w-full min-w-0 bg-[#141720] border border-[#1E2433] rounded-2xl p-4 sm:p-6 flex flex-col gap-4">
      <div className="flex items-center gap-2.5 pb-2 border-b border-[#1E2536]">
        <ShieldCheck size={18} weight="bold" className="text-[#D4FF32]" />
        <h3 className="text-base font-bold text-white tracking-tight">
          Account Information
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
              <span
                className={`font-medium text-right break-words [overflow-wrap:anywhere] min-w-0 max-w-[60%] sm:max-w-[65%] leading-snug ${
                  item.isHighlight ? "text-[#D4FF32] font-bold" : "text-white"
                }`}
              >
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
