"use client";

import { useRouter } from "next/navigation";
import {
  CalendarBlank,
  GenderIntersex,
  MapPin,
  User,
  Phone,
  Envelope,
  Barbell,
  IdentificationCard,
  PencilSimple,
  ChartLineUp,
} from "@phosphor-icons/react";
import Avatar from "../../Avatar";
import { MemberProfileDetails } from "./types";

interface OwnerProfileDetailProps {
  profile: MemberProfileDetails;
  gymId: string;
}

export default function OwnerProfileDetail({
  profile,
  gymId,
}: OwnerProfileDetailProps) {
  const router = useRouter();

  const handleEditOwner = () => {
    router.push(`/superadmin/gyms/${gymId}/edit`);
  };

  return (
    <div className="flex flex-col gap-4 sm:gap-5 w-full min-w-0 max-w-5xl mx-auto">
      <div className="w-full bg-[#141720] border border-[#1E2433] rounded-2xl p-4 sm:p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shrink-0 border-2 border-[#262C3E] shadow-md">
            <Avatar
              src={profile.avatarSrc}
              gender={profile.gender}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#D4FF32]">
              <IdentificationCard size={16} weight="bold" />
              <span>Owner ID: {profile.codeId}</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white truncate mt-0.5">
              {profile.name}
            </h2>
          </div>
        </div>

        <div className="w-full bg-[#10131B] border border-[#1C2230] rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#1E2512] border border-[#3C4A1D] text-[#D4FF32] flex items-center justify-center shrink-0">
              <Barbell size={22} weight="fill" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold text-white truncate">
                {profile.currentGym}
              </span>
              <span className="text-xs text-[#94A3B8] truncate">
                {profile.gymLocation || "Hyderabad, India"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] shrink-0 sm:self-center">
            <CalendarBlank size={15} className="text-[#64748B] shrink-0" />
            <span>Joined On:</span>
            <span className="text-white font-medium">{profile.joinedDate}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 w-full items-start">
        <div className="flex flex-col gap-4 sm:gap-5 w-full">
          <div className="w-full bg-[#141720] border border-[#1E2433] rounded-2xl p-4 sm:p-5 flex flex-col gap-3.5">
            <div className="flex items-center gap-2 pb-2.5 border-b border-[#1E2536]">
              <User size={18} weight="bold" className="text-[#D4FF32]" />
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Personal Information
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-[#94A3B8] shrink-0">
                  <User size={16} className="text-[#64748B] shrink-0" />
                  <span>Full Name</span>
                </div>
                <span className="text-white font-medium text-right">{profile.name}</span>
              </div>

              <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-[#94A3B8] shrink-0">
                  <CalendarBlank size={16} className="text-[#64748B] shrink-0" />
                  <span>Date of Birth</span>
                </div>
                <span className="text-white font-medium text-right">{profile.dateOfBirth}</span>
              </div>

              <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-[#94A3B8] shrink-0">
                  <GenderIntersex size={16} className="text-[#64748B] shrink-0" />
                  <span>Gender</span>
                </div>
                <span className="text-white font-medium text-right capitalize">{profile.gender}</span>
              </div>

              <div className="flex items-start justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-[#94A3B8] shrink-0 mt-0.5">
                  <MapPin size={16} className="text-[#64748B] shrink-0" />
                  <span>Address</span>
                </div>
                <span className="text-white font-medium text-right max-w-[65%] break-words">
                  {profile.address}
                </span>
              </div>
            </div>
          </div>

          <div className="hidden md:block w-full">
            <button
              type="button"
              onClick={handleEditOwner}
              className="w-full h-12 rounded-xl bg-[#181B24] hover:bg-[#222736] border border-[#242B3C] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
            >
              <PencilSimple size={18} weight="bold" />
              <span>Edit Owner</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:gap-5 w-full">
          <div className="w-full bg-[#141720] border border-[#1E2433] rounded-2xl p-4 sm:p-5 flex flex-col gap-3.5">
            <div className="flex items-center gap-2 pb-2.5 border-b border-[#1E2536]">
              <Phone size={18} weight="bold" className="text-[#D4FF32]" />
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Contact Information
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-[#94A3B8] shrink-0">
                  <Phone size={16} className="text-[#64748B] shrink-0" />
                  <span>Phone Number</span>
                </div>
                <span className="text-white font-medium text-right">{profile.phone}</span>
              </div>

              <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-[#94A3B8] shrink-0">
                  <Envelope size={16} className="text-[#64748B] shrink-0" />
                  <span>Email Address</span>
                </div>
                <span className="text-white font-medium text-right break-all">{profile.email}</span>
              </div>
            </div>
          </div>

          <div className="w-full bg-[#141720] border border-[#1E2433] rounded-2xl p-4 sm:p-5 flex flex-col gap-3.5">
            <div className="flex items-center gap-2 pb-2.5 border-b border-[#1E2536]">
              <CalendarBlank size={18} weight="bold" className="text-[#D4FF32]" />
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Account Information
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-[#94A3B8] shrink-0">
                  <CalendarBlank size={16} className="text-[#64748B] shrink-0" />
                  <span>Account Created On</span>
                </div>
                <span className="text-white font-medium text-right">
                  {profile.accountCreatedOn || profile.joinedDate}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-[#94A3B8] shrink-0">
                  <ChartLineUp size={16} className="text-[#64748B] shrink-0" />
                  <span>Account Status</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#162111] border border-[#2D3E14] text-[#D4FF32]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF32] shadow-[0_0_6px_#D4FF32] shrink-0" />
                  <span className="capitalize">{profile.status}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="block md:hidden w-full pt-1">
        <button
          type="button"
          onClick={handleEditOwner}
          className="w-full h-12 rounded-xl bg-[#181B24] hover:bg-[#222736] border border-[#242B3C] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
        >
          <PencilSimple size={18} weight="bold" />
          <span>Edit Owner</span>
        </button>
      </div>
    </div>
  );
}
