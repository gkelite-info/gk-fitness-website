"use client";

import { Crown, Star, Sparkle, Phone, CaretRight } from "@phosphor-icons/react";
import Avatar from "../../Avatar";
import { MemberItem } from "./types";

interface MemberRowCardProps {
  member: MemberItem;
  isOwnerTab: boolean;
  onSelect?: (member: MemberItem) => void;
}

export default function MemberRowCard({
  member,
  isOwnerTab,
  onSelect,
}: MemberRowCardProps) {
  const isActive = member.status === "active";

  const renderTierTag = () => {
    if (member.role === "owner") {
      return (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-[#D4FF00]">
          <Crown size={14} weight="fill" className="text-[#D4FF00]" />
          <span>Gym Owner</span>
        </span>
      );
    }

    if (member.role === "trainer") {
      return (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-[#38BDF8]">
          <Star size={14} weight="fill" className="text-[#38BDF8]" />
          <span>Certified Trainer</span>
        </span>
      );
    }

    if (member.membershipTier === "Platinum") {
      return (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-[#38BDF8]">
          <Star size={14} weight="fill" className="text-[#38BDF8]" />
          <span>Platinum Membership</span>
        </span>
      );
    }

    if (member.membershipTier === "Elite") {
      return (
        <span className="flex items-center gap-1.5 text-xs font-semibold text-[#C084FC]">
          <Sparkle size={14} weight="fill" className="text-[#C084FC]" />
          <span>Elite Membership</span>
        </span>
      );
    }

    return (
      <span className="flex items-center gap-1.5 text-xs font-semibold text-[#FBBF24]">
        <Crown size={14} weight="fill" className="text-[#FBBF24]" />
        <span>Gold Membership</span>
      </span>
    );
  };

  return (
    <div className="w-full bg-[#141A24] border border-[#202939] hover:border-[#2C384E] rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 transition-all duration-200 group">
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-[52px] h-[52px] rounded-full overflow-hidden shrink-0 border-2 border-[#222D3F]">
          <Avatar
            src={member.avatarSrc}
            gender={member.gender}
            className="w-full h-full object-cover"
            alt={member.name}
          />
        </div>

        <div className="flex flex-col min-w-0">
          <h3 className="text-white font-semibold text-base leading-snug break-words">
            {member.name}
          </h3>

          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-1 text-xs">
            {renderTierTag()}
            <span className="text-[#475569]">•</span>
            <span className="flex items-center gap-1 text-[#CBD5E1]">
              <Phone size={13} className="text-[#94A3B8] shrink-0" />
              <span>{member.phone}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between lg:justify-end gap-4 sm:gap-6 lg:gap-8 w-full lg:w-auto pt-3 lg:pt-0 border-t lg:border-t-0 border-[#1E2635]">
        {!isOwnerTab && (
          <div className="flex items-center gap-6 sm:gap-8 flex-wrap">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium text-[#94A3B8] tracking-wider uppercase leading-none">
                ATTENDANCE
              </span>
              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-bold leading-none ${
                    isActive ? "text-white" : "text-[#FB7185]"
                  }`}
                >
                  {member.attendancePct}%
                </span>
                <div className="w-16 h-1.5 bg-[#202939] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      isActive ? "bg-[#D4FF00]" : "bg-[#F43F5E]"
                    }`}
                    style={{ width: `${Math.min(100, Math.max(0, member.attendancePct))}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium text-[#94A3B8] tracking-wider uppercase leading-none">
                LAST CHECKED IN
              </span>
              <span className="text-xs font-medium text-[#E2E8F0] leading-none">
                {member.lastCheckedIn}
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto ml-auto">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 ${
              isActive
                ? "bg-[rgba(2,44,34,0.8)] border border-[rgba(16,185,129,0.3)] text-[#34D399]"
                : "bg-[rgba(76,5,25,0.6)] border border-[rgba(244,63,94,0.3)] text-[#FB7185]"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                isActive ? "bg-[#34D399]" : "bg-[#FB7185]"
              }`}
            />
            <span>{isActive ? "Active" : "Inactive"}</span>
          </span>

          <button
            type="button"
            onClick={() => onSelect?.(member)}
            aria-label={`View details for ${member.name}`}
            className="w-9 h-9 rounded-xl bg-[#1B2230] hover:bg-[#252E40] border border-[#232D3D] text-[#94A3B8] hover:text-white flex items-center justify-center transition-all cursor-pointer active:scale-95 shrink-0 ml-auto sm:ml-0"
          >
            <CaretRight size={16} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}
