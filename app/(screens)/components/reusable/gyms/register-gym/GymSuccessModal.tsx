"use client";

import { useEffect, useId } from "react";
import { useRouter } from "next/navigation";
import { X } from "@phosphor-icons/react";
import { GymFormData } from "./types";
import GymSuccessHeader from "./GymSuccessHeader";
import GymSuccessIdentityCard from "./GymSuccessIdentityCard";
import GymSuccessOwnerSection from "./GymSuccessOwnerSection";
import GymSuccessCredentialsSection from "./GymSuccessCredentialsSection";

interface GymSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: "create" | "edit";
  formData: GymFormData;
  gymId?: string;
  temporaryPassword?: string;
  registeredDate?: string;
}

export default function GymSuccessModal({
  isOpen,
  onClose,
  mode = "create",
  formData,
  gymId,
  temporaryPassword = "TK-9821X-Z",
  registeredDate = "20 Jul 2026",
}: GymSuccessModalProps) {
  const router = useRouter();
  const isEdit = mode === "edit";
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const resolvedGymId = gymId || "gym-1";

  const handleViewGymDetails = () => {
    onClose();
    router.push(`/superadmin/gyms/${resolvedGymId}`);
  };

  const handleBackToGyms = () => {
    onClose();
    router.push("/superadmin/gyms");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-[760px] sm:max-w-3xl bg-[#0F141E] border border-[#1C2536] rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 shadow-2xl flex flex-col my-auto max-h-[92vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 flex items-center justify-center rounded-xl text-[#94A3B8] hover:text-white bg-[#141B26]/80 hover:bg-[#1E283A] border border-[#232E42] transition-all cursor-pointer active:scale-95 z-10"
        >
          <X size={18} weight="bold" />
        </button>

        <GymSuccessHeader isEdit={isEdit} />

        <div className="mt-5 sm:mt-6">
          <GymSuccessIdentityCard
            gymName={formData.gymName}
            city={formData.city}
            state={formData.state}
            logoUrl={formData.logoUrl}
            registeredDate={registeredDate}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-5 sm:gap-6 mt-5 sm:mt-6 min-w-0">
          <GymSuccessOwnerSection
            ownerName={formData.ownerName}
            ownerEmail={formData.ownerEmail}
            ownerPhone={formData.ownerPhone}
            ownerPhoneCode={formData.ownerPhoneCode}
          />

          <GymSuccessCredentialsSection
            loginIdentifier={formData.ownerEmail || formData.gymEmail}
            temporaryPassword={temporaryPassword}
          />
        </div>

        <div className="w-full h-px bg-[#1C2536] my-6 sm:my-7 shrink-0" />

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full shrink-0">
          <button
            type="button"
            onClick={handleViewGymDetails}
            className="w-full sm:flex-1 h-12 rounded-xl bg-[#D4FF32] hover:bg-[#bde826] text-black font-extrabold text-xs sm:text-sm flex items-center justify-center transition-all cursor-pointer shadow-[0_0_20px_rgba(212,255,50,0.25)] active:scale-95 uppercase tracking-wider shrink-0"
          >
            VIEW GYM DETAILS
          </button>

          <button
            type="button"
            onClick={handleBackToGyms}
            className="w-full sm:flex-1 h-12 rounded-xl bg-[#10151F] hover:bg-[#18202D] border border-[#212A3B] text-white font-bold text-xs sm:text-sm flex items-center justify-center transition-all cursor-pointer active:scale-95 uppercase tracking-wider shrink-0"
          >
            BACK TO REGISTERED GYMS
          </button>
        </div>
      </div>
    </div>
  );
}
