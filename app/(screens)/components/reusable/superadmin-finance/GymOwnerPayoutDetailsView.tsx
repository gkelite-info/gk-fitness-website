"use client";

import { useState } from "react";
import { ArrowLeft, Clock, CheckCircle, CreditCard } from "@phosphor-icons/react";
import ConfirmationModal from "@/app/(screens)/components/reusable/ConfirmationModal";
import PayoutDetailsTopCards from "./PayoutDetailsTopCards";
import PayoutCalculationCard from "./PayoutCalculationCard";
import { GymOwnerPayout } from "./types";

interface GymOwnerPayoutDetailsViewProps {
  payout: GymOwnerPayout;
  onBack: () => void;
}

export default function GymOwnerPayoutDetailsView({
  payout,
  onBack,
}: GymOwnerPayoutDetailsViewProps) {
  const [currentStatus, setCurrentStatus] = useState<"Paid" | "Pending">(payout.status);
  const [paidDate, setPaidDate] = useState<string | null>(payout.paidDate || null);
  const [referenceId, setReferenceId] = useState<string | null>(payout.referenceId || null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleConfirmPayment = () => {
    setIsConfirming(true);
    setTimeout(() => {
      setCurrentStatus("Paid");
      setPaidDate(new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }));
      setReferenceId(`TXN-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsConfirming(false);
      setIsConfirmModalOpen(false);
    }, 400);
  };

  const isPaid = currentStatus === "Paid";


  return (
    <div className="flex flex-col gap-6 sm:gap-7 w-full max-w-full">
      <div className="flex items-center gap-3.5 w-full">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to Payouts"
          className="w-9 h-9 flex items-center justify-center bg-[#18202D] hover:bg-[#202B3D] border border-[#263145] rounded-lg text-[#CBD5E1] hover:text-white transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
        >
          <ArrowLeft size={16} weight="bold" />
        </button>

        <div className="flex flex-col min-w-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white leading-tight">
            Gym Owner Payout Details
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-normal mt-0.5">
            View payout information for this gym owner.
          </p>
        </div>
      </div>

      <PayoutDetailsTopCards
        gymName={payout.gymName}
        payoutMonth={payout.payoutMonth}
        status={currentStatus}
        amount={payout.amount}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 w-full items-start lg:items-stretch">
        <div className="lg:col-span-7 bg-[#12141A] border border-[#232631] rounded-2xl p-5 sm:p-6 lg:p-7 flex flex-col justify-between lg:h-full">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight pb-2 border-b border-[#1E222D]">
              Payout Information
            </h2>

            <div className="flex flex-col divide-y divide-[#181B24]">
              <div className="flex items-center justify-between py-3.5 sm:py-4 gap-4">
                <span className="text-xs sm:text-sm font-medium text-[#94A3B8]">
                  Gym Name
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white text-right">
                  {payout.gymName}
                </span>
              </div>

              <div className="flex items-center justify-between py-3.5 sm:py-4 gap-4">
                <span className="text-xs sm:text-sm font-medium text-[#94A3B8]">
                  Payout Month
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white text-right">
                  {payout.payoutMonth}
                </span>
              </div>

              <div className="flex items-center justify-between py-3.5 sm:py-4 gap-4">
                <span className="text-xs sm:text-sm font-medium text-[#94A3B8]">
                  Total Gym Pass Entries
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white text-right">
                  {payout.entries}
                </span>
              </div>

              <div className="flex items-center justify-between py-3.5 sm:py-4 gap-4">
                <span className="text-xs sm:text-sm font-medium text-[#94A3B8]">
                  Rate Per Entry
                </span>
                <span className="text-xs sm:text-sm font-semibold text-white text-right">
                  ₹{payout.ratePerEntry}
                </span>
              </div>

              <div className="flex items-center justify-between py-3.5 sm:py-4 gap-4">
                <span className="text-xs sm:text-sm font-medium text-[#94A3B8]">
                  Total Payout
                </span>
                <span className="text-sm sm:text-base font-bold text-[#D4FF32] text-right">
                  {payout.amount}
                </span>
              </div>

              <div className="flex items-center justify-between py-3.5 sm:py-4 gap-4">
                <span className="text-xs sm:text-sm font-medium text-[#94A3B8]">
                  Status
                </span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold ${
                    isPaid
                      ? "bg-[#0D261C] text-[#10B981] border border-[#164E37]"
                      : "bg-[#281E10] text-[#F59E0B] border border-[#4E3717]"
                  }`}
                >
                  {currentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#12141A] border border-[#232631] rounded-2xl p-5 sm:p-6 lg:p-7 flex flex-col justify-between gap-5 sm:gap-6 lg:h-full">
          <div className="flex flex-col gap-4 sm:gap-5">
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight pb-2 border-b border-[#1E222D]">
              Payment Action
            </h2>


            <button
              type="button"
              disabled={isPaid}
              onClick={() => !isPaid && setIsConfirmModalOpen(true)}
              className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                isPaid
                  ? "bg-[#163523] border border-[#1E603A] text-[#10B981] cursor-default"
                  : "bg-[#D4FF32] text-black hover:bg-[#c3ee27] shadow-[0_0_20px_rgba(212,255,50,0.25)] cursor-pointer"
              }`}
            >
              {isPaid ? (
                <>
                  <CheckCircle size={18} weight="fill" />
                  <span>Marked as Paid</span>
                </>
              ) : (
                <>
                  <CreditCard size={18} weight="fill" />
                  <span>Mark as Paid</span>
                </>
              )}
            </button>


            <div className="flex flex-col gap-3.5 pt-3">
              <span className="text-xs font-semibold text-[#94A3B8]">
                Payment Details (After Marked as Paid)
              </span>

              <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-[#161922] border border-[#232836]">
                <span className="text-xs text-[#94A3B8]">Paid Date</span>
                <span className="text-xs font-semibold text-white">
                  {paidDate || "—"}
                </span>
              </div>

              <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-[#161922] border border-[#232836]">
                <span className="text-xs text-[#94A3B8]">Transaction / Reference ID</span>
                <span className="text-xs font-semibold text-white font-mono">
                  {referenceId || "—"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#161922] border border-[#232836] text-[#94A3B8] text-xs">
            <Clock size={16} className="text-[#64748B] shrink-0" />
            <span>
              {isPaid
                ? "Payout has been marked as paid."
                : "Paid Date and Reference ID will appear after the payout is marked as paid."}
            </span>
          </div>
        </div>
      </div>


      <PayoutCalculationCard
        entriesOrSessions={payout.entries}
        entriesLabel="Entries"
        rate={payout.ratePerEntry}
        totalAmount={payout.amount}
      />

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleConfirmPayment}
        title="Confirm Payment"
        message={`Are you sure you want to mark the payout of ${payout.amount} for ${payout.gymName} as paid?`}
        confirmText="Mark as Paid"
        cancelText="Cancel"
        isConfirming={isConfirming}
        confirmingText="Processing..."
        isDestructive={false}
        icon={<CreditCard size={32} weight="fill" className="text-[#D4FF32]" />}
      />
    </div>
  );
}

