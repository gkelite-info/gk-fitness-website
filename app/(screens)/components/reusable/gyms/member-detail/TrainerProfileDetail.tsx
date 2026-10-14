"use client";

import { useState } from "react";
import {
  CalendarBlank,
  GenderIntersex,
  MapPin,
  Info,
  User,
  CheckCircle,
  PhoneCall,
  Globe,
} from "@phosphor-icons/react";
import toast from "react-hot-toast";
import Avatar from "../../Avatar";
import ConfirmationModal from "../../ConfirmationModal";
import { MemberProfileDetails } from "./types";

interface TrainerProfileDetailProps {
  profile: MemberProfileDetails;
}

export default function TrainerProfileDetail({ profile }: TrainerProfileDetailProps) {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isConverting, setIsConverting] = useState(false);

  const handleConfirmConvert = () => {
    setIsConverting(true);
    setTimeout(() => {
      setIsConverting(false);
      setIsConfirmModalOpen(false);
      toast.success(`${profile.name} converted to Global Trainer successfully!`, {
        id: "convert-trainer-toast",
      });
    }, 600);
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
            <h2 className="text-lg sm:text-xl font-bold text-white truncate">
              {profile.name}
            </h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#D4FF32] shadow-[0_0_6px_#D4FF32] shrink-0" />
              <span className="text-xs font-bold text-[#D4FF32] uppercase tracking-wider">
                {profile.status}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-[#1E2536]" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
              TRAINER ID
            </span>
            <span className="text-xs sm:text-sm font-bold text-[#D4FF32]">
              {profile.codeId}
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
              PHONE
            </span>
            <span className="text-xs sm:text-sm font-medium text-white">
              {profile.phone}
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
              EMAIL
            </span>
            <span className="text-xs sm:text-sm font-medium text-white break-all">
              {profile.email}
            </span>
          </div>

          <div className="flex flex-col gap-0.5">
            <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">
              SPECIALIZATION
            </span>
            <span className="text-xs sm:text-sm font-medium text-white truncate">
              {profile.specialization || profile.highlightValue}
            </span>
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
              onClick={() => setIsConfirmModalOpen(true)}
              className="w-full h-12 rounded-xl bg-[#D4FF32] hover:bg-[#bde826] text-black font-extrabold text-sm flex items-center justify-center transition-all cursor-pointer shadow-[0_0_20px_rgba(212,255,50,0.25)] active:scale-95"
            >
              Convert to Global Trainer
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:gap-5 w-full">
          <div className="w-full bg-[#141720] border border-[#1E2433] rounded-2xl p-4 sm:p-5 flex flex-col gap-3.5">
            <div className="flex items-center gap-2 pb-2.5 border-b border-[#1E2536]">
              <Info size={18} weight="bold" className="text-[#D4FF32]" />
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Account Information
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-[#94A3B8] shrink-0">
                  <CheckCircle size={16} className="text-[#64748B] shrink-0" />
                  <span>Account Status</span>
                </div>
                <span className="text-[#34D399] font-bold text-right capitalize">
                  {profile.status}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-[#94A3B8] shrink-0">
                  <User size={16} className="text-[#64748B] shrink-0" />
                  <span>Added By</span>
                </div>
                <span className="text-white font-medium text-right">
                  {profile.addedBy || profile.currentGym}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-[#94A3B8] shrink-0">
                  <CalendarBlank size={16} className="text-[#64748B] shrink-0" />
                  <span>Added On</span>
                </div>
                <span className="text-white font-medium text-right">{profile.joinedDate}</span>
              </div>
            </div>
          </div>

          <div className="w-full bg-[#141720] border border-[#1E2433] rounded-2xl p-4 sm:p-5 flex flex-col gap-3.5">
            <div className="flex items-center gap-2 pb-2.5 border-b border-[#1E2536]">
              <Info size={18} weight="bold" className="text-[#D4FF32]" />
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                Additional Information
              </h3>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-[#94A3B8] shrink-0">
                  <PhoneCall size={16} className="text-[#64748B] shrink-0" />
                  <span>Emergency Contact</span>
                </div>
                <span className="text-white font-medium text-right">
                  {profile.emergencyContact || "Ramesh Verma (Father)"}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-[#94A3B8] shrink-0">
                  <PhoneCall size={16} className="text-[#64748B] shrink-0" />
                  <span>Emergency Phone</span>
                </div>
                <span className="text-white font-medium text-right">
                  {profile.emergencyPhone || "+91 91234 56789"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="block md:hidden w-full pt-1">
        <button
          type="button"
          onClick={() => setIsConfirmModalOpen(true)}
          className="w-full h-12 rounded-xl bg-[#D4FF32] hover:bg-[#bde826] text-black font-extrabold text-sm flex items-center justify-center transition-all cursor-pointer shadow-[0_0_20px_rgba(212,255,50,0.25)] active:scale-95"
        >
          Convert to Global Trainer
        </button>
      </div>

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmConvert}
        title="Convert to Global Trainer"
        message={`Are you sure you want to convert ${profile.name} to a Global Trainer? This will grant platform-wide access and training privileges.`}
        confirmText="Convert to Global Trainer"
        cancelText="Cancel"
        isConfirming={isConverting}
        confirmingText="Converting..."
        isDestructive={false}
        icon={<Globe size={32} weight="duotone" className="text-[#D4FF32]" />}
      />
    </div>
  );
}
