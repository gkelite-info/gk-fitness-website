"use client";

import { useEffect, useState } from "react";
import { X, Copy, Check, Buildings } from "@phosphor-icons/react";
import { GymPlanPayment } from "./gymPlanRevenueTypes";

interface GymPlanRevenueDetailModalProps {
  payment: GymPlanPayment | null;
  onClose: () => void;
}

export default function GymPlanRevenueDetailModal({
  payment,
  onClose,
}: GymPlanRevenueDetailModalProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (payment) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [payment, onClose]);

  if (!payment) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 1800);
  };

  const isPaid = payment.status === "Paid";
  const initial = payment.gymName.charAt(0).toUpperCase();

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 lg:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] bg-[#0C1017] border border-[#1E2536] rounded-2xl sm:rounded-3xl flex flex-col overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#182030]">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Transaction Details
            </h2>
            <p className="text-xs sm:text-sm text-[#8492A6]">
              Gym Plan Revenue
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-[#182030] transition-colors cursor-pointer shrink-0"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <div className="p-5 sm:p-6 flex flex-col gap-6 overflow-y-auto scrollbar-thin">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[#0F1420] border border-[#1E273A]">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-[#D1FAE5] text-[#065F46] flex items-center justify-center shrink-0">
                <Buildings size={24} weight="fill" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base sm:text-lg font-bold text-white truncate">
                    {payment.gymName}
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      isPaid
                        ? "bg-[#052E16] text-[#10B981] border border-[#166534]/50"
                        : "bg-[#2A1D0D] text-[#F59E0B] border border-[#78350F]/50"
                    }`}
                  >
                    {payment.status}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-medium text-[#94A3B8] mt-0.5">
                  {payment.plan} Plan
                </span>
                <span className="text-[11px] text-[#64748B]">
                  Gym Plan Subscription
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:items-end justify-center shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#1B2232]">
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {payment.amount}
              </span>
              <span className="text-xs text-[#8492A6] mt-0.5">
                {payment.dateTime}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
              Transaction Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6 sm:gap-x-10 text-xs sm:text-sm pt-1">
              <div className="flex items-center justify-between sm:justify-start sm:gap-4 border-b border-[#161D2B] pb-2 sm:border-none sm:pb-0">
                <span className="text-[#8492A6] w-32 shrink-0">Transaction ID</span>
                <div className="flex items-center gap-2 text-white font-medium">
                  <span>{payment.transactionId}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(payment.transactionId, "txId")}
                    className="p-1 text-[#8492A6] hover:text-white transition-colors cursor-pointer"
                    title="Copy Transaction ID"
                  >
                    {copiedKey === "txId" ? (
                      <Check size={14} className="text-[#10B981]" weight="bold" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-start sm:gap-4 border-b border-[#161D2B] pb-2 sm:border-none sm:pb-0">
                <span className="text-[#8492A6] w-32 shrink-0">Payment Method</span>
                <span className="text-white font-medium">{payment.paymentMethod}</span>
              </div>

              <div className="flex items-center justify-between sm:justify-start sm:gap-4 border-b border-[#161D2B] pb-2 sm:border-none sm:pb-0">
                <span className="text-[#8492A6] w-32 shrink-0">Date & Time</span>
                <span className="text-white font-medium">{payment.dateTime}</span>
              </div>

              <div className="flex items-center justify-between sm:justify-start sm:gap-4 border-b border-[#161D2B] pb-2 sm:border-none sm:pb-0">
                <span className="text-[#8492A6] w-32 shrink-0">Reference ID</span>
                <div className="flex items-center gap-2 text-white font-medium truncate">
                  <span className="truncate max-w-[150px] sm:max-w-[170px]">{payment.referenceId}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(payment.referenceId, "refId")}
                    className="p-1 text-[#8492A6] hover:text-white transition-colors cursor-pointer shrink-0"
                    title="Copy Reference ID"
                  >
                    {copiedKey === "refId" ? (
                      <Check size={14} className="text-[#10B981]" weight="bold" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-start sm:gap-4 border-b border-[#161D2B] pb-2 sm:border-none sm:pb-0">
                <span className="text-[#8492A6] w-32 shrink-0">Type</span>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                    isPaid
                      ? "bg-[#052E16] text-[#10B981] border border-[#166534]/50"
                      : "bg-[#2A1D0D] text-[#F59E0B] border border-[#78350F]/50"
                  }`}
                >
                  {payment.status}
                </span>
              </div>

              <div className="flex items-center justify-between sm:justify-start sm:gap-4 border-b border-[#161D2B] pb-2 sm:border-none sm:pb-0">
                <span className="text-[#8492A6] w-32 shrink-0">Status</span>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                    isPaid
                      ? "bg-[#052E16] text-[#10B981] border border-[#166534]/50"
                      : "bg-[#2A1D0D] text-[#F59E0B] border border-[#78350F]/50"
                  }`}
                >
                  {payment.status}
                </span>
              </div>

              <div className="flex items-center justify-between sm:justify-start sm:gap-4 border-b border-[#161D2B] pb-2 sm:border-none sm:pb-0">
                <span className="text-[#8492A6] w-32 shrink-0">Source</span>
                <span className="text-white font-medium">{payment.source}</span>
              </div>

              <div className="flex items-center justify-between sm:justify-start sm:gap-4 border-b border-[#161D2B] pb-2 sm:border-none sm:pb-0">
                <span className="text-[#8492A6] w-32 shrink-0">Paid By</span>
                <span className="text-white font-medium">{payment.ownerName}</span>
              </div>

              <div className="flex items-center justify-between sm:justify-start sm:gap-4">
                <span className="text-[#8492A6] w-32 shrink-0">Amount</span>
                <span className="text-white font-bold">{payment.amount}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
              Related To
            </h3>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[#0B0E15] border border-[#1C2333]">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-12 h-12 rounded-xl bg-[#D1FAE5] text-[#065F46] flex items-center justify-center font-bold text-xl shrink-0">
                  {initial}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm sm:text-base font-bold text-white truncate">
                    {payment.gymName}
                  </span>
                  <span className="text-xs text-[#8492A6] mt-0.5">
                    Gym Owner: {payment.ownerName}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm pt-3 md:pt-0 border-t md:border-t-0 border-[#1B2232] shrink-0">
                <div className="flex flex-col">
                  <span className="text-[#8492A6] text-[11px] sm:text-xs">Plan Details</span>
                  <span className="inline-block px-2 py-0.5 rounded bg-[#3A1E0D] text-[#F59E0B] border border-[#78350F]/50 text-xs font-semibold mt-0.5 w-fit">
                    {payment.plan}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#8492A6] text-[11px] sm:text-xs">Plan Amount</span>
                  <span className="text-white font-semibold mt-0.5">
                    {payment.planAmountText || `${payment.amount} / month`}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#8492A6] text-[11px] sm:text-xs">Start Date</span>
                  <span className="text-white font-medium mt-0.5">{payment.startDate}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#8492A6] text-[11px] sm:text-xs">Next Renewal</span>
                  <span className="text-white font-medium mt-0.5">{payment.nextRenewal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
