"use client";

import { useEffect, useState } from "react";
import { X, Copy, Check } from "@phosphor-icons/react";
import Avatar from "@/app/(screens)/components/reusable/Avatar";
import { CustomerPlanPayment } from "./customerPlanRevenueTypes";

interface CustomerPlanRevenueDetailModalProps {
  payment: CustomerPlanPayment | null;
  onClose: () => void;
}

export default function CustomerPlanRevenueDetailModal({
  payment,
  onClose,
}: CustomerPlanRevenueDetailModalProps) {
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
  const dateTime = payment.dateTime || `${payment.date}, 10:24 AM`;
  const customerType = payment.customerType || "Individual Customer";
  const referenceId = payment.referenceId || `REF-ICP-${payment.transactionId.replace(/\D/g, "") || "10235"}`;
  const source = payment.source || "Individual Customer Plan Revenue";
  const billingCycle = payment.billingCycle || "Monthly";
  const startDate = payment.startDate || payment.date;
  const nextRenewal = payment.nextRenewal || "15 Nov 2026";

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
              Individual Customer Plan Revenue
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
          <div className="flex flex-col gap-4 p-4 sm:p-5 rounded-2xl bg-[#0F1420] border border-[#1E273A]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3.5 min-w-0">
                <Avatar
                  src={payment.customerAvatar}
                  gender={payment.gender}
                  alt={payment.customerName}
                  className="w-12 h-12 shrink-0"
                />
                <div className="flex flex-col min-w-0">
                  <span className="text-[#8492A6] text-[11px] sm:text-xs">
                    Customer
                  </span>
                  <span className="text-base sm:text-lg font-bold text-white whitespace-nowrap">
                    {payment.customerName}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-start sm:items-end shrink-0">
                <span className="text-[#8492A6] text-[11px] sm:text-xs">Plan</span>
                <span className="inline-flex items-center justify-center px-3.5 py-1 rounded-lg text-xs font-semibold bg-[#182638] text-[#60A5FA] border border-[#1E3A5F]/60 mt-1 whitespace-nowrap">
                  {payment.plan} Plan
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-3.5 border-t border-[#1B2232]">
              <div className="flex flex-col shrink-0">
                <span className="text-[#8492A6] text-[11px] sm:text-xs">Amount</span>
                <span className="text-lg sm:text-xl font-extrabold text-white mt-0.5 whitespace-nowrap">
                  {payment.amount}
                </span>
              </div>

              <div className="flex flex-col shrink-0">
                <span className="text-[#8492A6] text-[11px] sm:text-xs">Status</span>
                <span
                  className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold mt-1 whitespace-nowrap ${
                    isPaid
                      ? "bg-[#052E16] text-[#10B981] border border-[#166534]/50"
                      : "bg-[#2A1D0D] text-[#F59E0B] border border-[#78350F]/50"
                  }`}
                >
                  {payment.status}
                </span>
              </div>

              <div className="flex flex-col shrink-0 sm:text-right">
                <span className="text-[#8492A6] text-[11px] sm:text-xs whitespace-nowrap">
                  Date & Time
                </span>
                <span className="text-xs sm:text-sm font-medium text-white mt-1 whitespace-nowrap">
                  {dateTime}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#0F1420] border border-[#1E273A] flex flex-col gap-4">
            <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
              Transaction Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3.5 gap-x-8 text-xs sm:text-sm">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-4 border-b border-[#161D2B] pb-2">
                  <span className="text-[#8492A6] w-28 sm:w-32 shrink-0">Transaction ID</span>
                  <div className="flex items-center gap-2 text-white font-medium min-w-0">
                    <span className="font-mono text-xs sm:text-sm break-all">{payment.transactionId}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(payment.transactionId, "txId")}
                      className="p-1 text-[#8492A6] hover:text-white transition-colors cursor-pointer shrink-0"
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

                <div className="flex items-center justify-between gap-4 border-b border-[#161D2B] pb-2">
                  <span className="text-[#8492A6] w-28 sm:w-32 shrink-0">Date & Time</span>
                  <span className="text-white font-medium text-right break-words">{dateTime}</span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b border-[#161D2B] pb-2">
                  <span className="text-[#8492A6] w-28 sm:w-32 shrink-0">Payment Method</span>
                  <span className="text-white font-medium text-right">{payment.paymentMethod}</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-[#8492A6] w-28 sm:w-32 shrink-0">Reference ID</span>
                  <div className="flex items-center gap-2 text-white font-medium min-w-0">
                    <span className="font-mono text-xs sm:text-sm break-all">{referenceId}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(referenceId, "refId")}
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
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-4 border-b border-[#161D2B] pb-2">
                  <span className="text-[#8492A6] w-24 shrink-0">Status</span>
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

                <div className="flex items-center justify-between gap-4 border-b border-[#161D2B] pb-2">
                  <span className="text-[#8492A6] w-24 shrink-0">Amount</span>
                  <span className="text-white font-bold text-right">{payment.amount}</span>
                </div>

                <div className="flex items-start justify-between gap-4 border-b border-[#161D2B] pb-2">
                  <span className="text-[#8492A6] w-24 shrink-0">Source</span>
                  <span className="text-white font-medium text-right leading-snug break-words">
                    {source}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#0F1420] border border-[#1E273A] flex flex-col gap-4">
            <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight">
              Related To
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3.5 gap-x-8 text-xs sm:text-sm">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-4 border-b border-[#161D2B] pb-2">
                  <span className="text-[#8492A6] w-28 sm:w-32 shrink-0">Customer Name</span>
                  <span className="text-white font-medium text-right">{payment.customerName}</span>
                </div>

                <div className="flex items-center justify-between gap-2 sm:gap-4 border-b border-[#161D2B] pb-2">
                  <span className="text-[#8492A6] w-24 sm:w-28 shrink-0">Customer Type</span>
                  <span className="text-white font-medium text-right text-xs sm:text-sm">
                    {customerType}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-[#8492A6] w-28 sm:w-32 shrink-0">Plan</span>
                  <span className="text-white font-medium text-right">{payment.plan} Plan</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-4 border-b border-[#161D2B] pb-2">
                  <span className="text-[#8492A6] w-24 shrink-0">Billing Cycle</span>
                  <span className="text-white font-medium text-right">{billingCycle}</span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b border-[#161D2B] pb-2">
                  <span className="text-[#8492A6] w-24 shrink-0">Start Date</span>
                  <span className="text-white font-medium text-right">{startDate}</span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-[#8492A6] w-24 shrink-0">Next Renewal</span>
                  <span className="text-white font-medium text-right">{nextRenewal}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
