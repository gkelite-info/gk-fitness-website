"use client";

import { Barbell, ArrowRight, Clock, CalendarBlank, ShieldCheck, User } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import TrainerPaymentModal from "./TrainerPaymentModal";
import { TrainerMembershipData } from "@/app/actions/customer/getTrainerMembership";

interface TrainerPlanCardProps {
  initialData: TrainerMembershipData;
}

export default function TrainerPlanCard({ initialData }: TrainerPlanCardProps) {
  const searchParams = useSearchParams();
  const actionParam = searchParams.get("action");
  const trainerIdParam = searchParams.get("trainerId");
  const trainerNameParam = searchParams.get("trainerName");
  const amountParam = searchParams.get("amount");

  const [isModalOpen, setIsModalOpen] = useState(
    actionParam === "book-trainer" || actionParam === "renew-trainer"
  );

  useEffect(() => {
    if (actionParam === "book-trainer" || actionParam === "renew-trainer") {
      setIsModalOpen(true);
    }
  }, [actionParam, trainerIdParam]);

  const activeTrainerId = trainerIdParam || initialData.trainerId || "";
  const activeTrainerName = trainerNameParam || initialData.trainerName || "Personal Trainer";
  const activeTrainerPrice = Number(amountParam) > 0 ? Number(amountParam) : initialData.trainerPrice;

  const handleOpenModal = () => {
    setIsModalOpen(true);
    if (typeof window !== "undefined") {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.set("action", "renew-trainer");
      if (initialData.trainerId) currentUrl.searchParams.set("trainerId", initialData.trainerId);
      window.history.replaceState(null, "", currentUrl.toString());
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    if (typeof window !== "undefined") {
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.delete("action");
      currentUrl.searchParams.delete("trainerId");
      currentUrl.searchParams.delete("trainerName");
      currentUrl.searchParams.delete("amount");
      window.history.replaceState(null, "", currentUrl.toString());
    }
  };

  const status = initialData.status;

  return (
    <>
      <div className="bg-[#141414] border border-[#222222] rounded-3xl p-5 mb-4 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#D7FF00] flex items-center justify-center">
              <Barbell size={14} color="#000000" weight="bold" />
            </div>
            <span className="text-[#D7FF00] text-xs font-semibold tracking-wider uppercase">
              Personal Trainer Plan
            </span>
          </div>

          {status === "active" && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#34C759]/15 border border-[#34C759]/30 text-[#34C759] text-[10px] font-semibold">
              Active Coaching
            </span>
          )}
          {status === "pending" && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#FF9F0A]/15 border border-[#FF9F0A]/30 text-[#FF9F0A] text-[10px] font-semibold">
              Pending Review
            </span>
          )}
          {status === "expired" && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#EF4444]/15 border border-[#EF4444]/30 text-[#EF4444] text-[10px] font-semibold">
              Expired
            </span>
          )}
        </div>

        {status === "active" ? (
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <div className="flex items-baseline gap-2">
                <span className="text-white text-4xl font-semibold">{initialData.daysLeft}</span>
                <span className="text-[#8E8E93] text-sm font-medium">Days Left</span>
              </div>
              <div className="text-right">
                <span className="text-white text-sm font-semibold">{initialData.trainerName}</span>
                <p className="text-[#8E8E93] text-[11px] capitalize">{initialData.specialization} Coach</p>
              </div>
            </div>

            <div className="w-full h-1.5 bg-[#262626] rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-[#D7FF00] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${initialData.progressPercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-[#8E8E93] pt-1 border-t border-[#1F1F1F]">
              <div className="flex items-center gap-1.5">
                <Clock size={12} weight="bold" className="text-[#D7FF00]" />
                <span className="text-[11px] truncate max-w-[150px]">{initialData.timings || "Flexible"}</span>
              </div>
              <button
                onClick={handleOpenModal}
                className="flex items-center gap-1 text-[#8E8E93] hover:text-[#D7FF00] transition-colors cursor-pointer"
              >
                <span className="text-xs font-medium">Renew Plan</span>
                <ArrowRight size={12} weight="bold" />
              </button>
            </div>
          </div>
        ) : status === "pending" ? (
          <div className="mb-1">
            <h3 className="text-[#FF9F0A] text-lg font-semibold mb-1">
              Request Under Review: {initialData.trainerName}
            </h3>
            <p className="text-[#8E8E93] text-xs font-medium mb-3">
              Your trainer request has been submitted. Complete the monthly fee payment to confirm your booking.
            </p>
            <button
              onClick={handleOpenModal}
              className="bg-[#D7FF00] hover:bg-[#bce000] py-2 px-4 rounded-xl flex items-center justify-center gap-1.5 active:opacity-80 transition-all cursor-pointer"
            >
              <span className="text-black text-xs font-bold tracking-wide">
                COMPLETE PAYMENT {initialData.trainerPrice > 0 ? `(₹${initialData.trainerPrice})` : ""}
              </span>
              <ArrowRight size={12} color="#000000" weight="bold" />
            </button>
          </div>
        ) : status === "expired" ? (
          <div className="mb-1">
            <h3 className="text-[#EF4444] text-lg font-semibold mb-1">
              Trainer Plan Expired
            </h3>
            <p className="text-[#8E8E93] text-xs font-medium mb-3">
              Renew coaching with {initialData.trainerName} to maintain your daily guidance.
            </p>
            <button
              onClick={handleOpenModal}
              className="bg-[#D7FF00] hover:bg-[#bce000] py-2 px-4 rounded-xl flex items-center justify-center gap-1.5 active:opacity-80 transition-all cursor-pointer"
            >
              <span className="text-black text-xs font-bold tracking-wide">
                RENEW TRAINER PLAN
              </span>
              <ArrowRight size={12} color="#000000" weight="bold" />
            </button>
          </div>
        ) : (
          <div className="mb-1">
            <h3 className="text-white text-lg font-semibold mb-1">
              Personal Trainer Coaching
            </h3>
            <p className="text-[#8E8E93] text-xs font-medium mb-3">
              Get dedicated 1-on-1 guidance, customized workouts, and nutrition adjustments.
            </p>
            <button
              onClick={handleOpenModal}
              className="bg-[#2A2A2A] hover:bg-[#333333] text-white py-2 px-4 rounded-xl flex items-center justify-center gap-1.5 active:opacity-80 transition-all cursor-pointer border border-[#3A3A3A]"
            >
              <span className="text-xs font-semibold tracking-wide">
                BOOK A TRAINER
              </span>
              <ArrowRight size={12} weight="bold" />
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <TrainerPaymentModal
          trainerId={activeTrainerId}
          trainerName={activeTrainerName}
          trainerPrice={activeTrainerPrice}
          specialization={initialData.specialization}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
