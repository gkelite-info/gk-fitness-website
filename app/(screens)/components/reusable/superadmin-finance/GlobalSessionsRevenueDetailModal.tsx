"use client";

import { useEffect, useState } from "react";
import { X, Copy, Check, CalendarBlank } from "@phosphor-icons/react";
import Avatar from "@/app/(screens)/components/reusable/Avatar";
import { GlobalSessionPayment } from "./globalSessionsRevenueTypes";

interface GlobalSessionsRevenueDetailModalProps {
  payment: GlobalSessionPayment | null;
  onClose: () => void;
}

export default function GlobalSessionsRevenueDetailModal({
  payment,
  onClose,
}: GlobalSessionsRevenueDetailModalProps) {
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
  const customerEmail = payment.customerEmail || `${payment.customerName.toLowerCase().replace(/\s+/g, ".")}@gmail.com`;
  const customerPhone = payment.customerPhone || "+91 98765 43210";
  const trainerEmail = payment.trainerEmail || `${payment.trainerName.toLowerCase().replace(/\s+/g, ".")}@gkgym.com`;
  const trainerPhone = payment.trainerPhone || "+91 91234 56789";

  const sessionType = payment.sessionType || "1-to-1 Session";
  const sessionDate = payment.sessionDate || payment.date;
  const sessionTime = payment.sessionTime || `${payment.duration || "1 Hour"} Session`;
  const mode = payment.mode || "Online (Google Meet)";
  const topic = payment.topic || "Full Body Strength Training";
  const transactionId = payment.transactionId || payment.sessionId;
  const paymentDate = payment.paymentDate || `${payment.date}, 10:24 AM`;
  const referenceId = payment.referenceId || `REF-${payment.sessionId}`;

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
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Global Session Details
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-[#182030] transition-colors cursor-pointer shrink-0"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <div className="p-4 sm:p-6 flex flex-col gap-5 overflow-y-auto scrollbar-thin">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-[#0F1420] border border-[#1E273A] min-w-0 text-center sm:text-left">
              <Avatar
                src={payment.customerAvatar}
                gender={payment.customerGender || "male"}
                alt={payment.customerName}
                className="w-16 h-16 sm:w-12 sm:h-12 rounded-full shrink-0"
              />
              <div className="flex flex-col items-center sm:items-start min-w-0 flex-1">
                <span className="text-[10px] sm:text-[11px] font-semibold text-[#8492A6] uppercase tracking-wider">
                  CUSTOMER
                </span>
                <span className="text-base sm:text-lg font-bold text-white break-words leading-tight mt-0.5">
                  {payment.customerName}
                </span>
                <span className="text-xs sm:text-sm text-[#8492A6] break-all mt-1 leading-snug">
                  {customerEmail}
                </span>
                <span className="text-xs sm:text-sm text-[#8492A6] break-words mt-0.5">
                  {customerPhone}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-[#0F1420] border border-[#1E273A] min-w-0 text-center sm:text-left">
              <Avatar
                src={payment.trainerAvatar}
                gender={payment.trainerGender || "male"}
                alt={payment.trainerName}
                className="w-16 h-16 sm:w-12 sm:h-12 rounded-full shrink-0"
              />
              <div className="flex flex-col items-center sm:items-start min-w-0 flex-1">
                <span className="text-[10px] sm:text-[11px] font-semibold text-[#8492A6] uppercase tracking-wider">
                  GLOBAL TRAINER
                </span>
                <span className="text-base sm:text-lg font-bold text-white break-words leading-tight mt-0.5">
                  {payment.trainerName}
                </span>
                <span className="text-xs sm:text-sm text-[#8492A6] break-all mt-1 leading-snug">
                  {trainerEmail}
                </span>
                <span className="text-xs sm:text-sm text-[#8492A6] break-words mt-0.5">
                  {trainerPhone}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#0F1420] border border-[#1E273A] flex flex-col gap-4">
            <div className="flex items-center gap-2 text-white">
              <CalendarBlank size={18} className="text-[#8492A6]" />
              <h3 className="text-xs sm:text-sm font-bold tracking-tight">
                Session Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3.5 gap-x-8 text-xs sm:text-sm">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3 border-b border-[#161D2B] pb-2">
                  <span className="text-[#8492A6] w-24 sm:w-28 shrink-0">Session Type</span>
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-[#063323] text-[#10B981] border border-[#166534]/50 whitespace-nowrap">
                    {sessionType}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 border-b border-[#161D2B] pb-2">
                  <span className="text-[#8492A6] w-24 sm:w-28 shrink-0">Session Date</span>
                  <span className="text-white font-medium text-right">{sessionDate}</span>
                </div>

                <div className="flex items-center justify-between gap-3 border-b border-[#161D2B] pb-2">
                  <span className="text-[#8492A6] w-24 sm:w-28 shrink-0">Session Time</span>
                  <span className="text-white font-medium text-right break-words">{sessionTime}</span>
                </div>

                <div className="flex items-center justify-between gap-3 border-b border-[#161D2B] pb-2">
                  <span className="text-[#8492A6] w-24 sm:w-28 shrink-0">Mode</span>
                  <span className="text-white font-medium text-right break-words">
                    {mode}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-[#8492A6] w-24 sm:w-28 shrink-0">Topic</span>
                  <span className="text-white font-medium text-right break-words">{topic}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3 border-b border-[#161D2B] pb-2">
                  <span className="text-[#8492A6] w-24 sm:w-28 shrink-0">Amount</span>
                  <span className="text-white font-bold text-right">{payment.amount}</span>
                </div>

                <div className="flex items-center justify-between gap-3 border-b border-[#161D2B] pb-2">
                  <span className="text-[#8492A6] w-24 sm:w-28 shrink-0">Payment Method</span>
                  <span className="text-white font-medium text-right">{payment.paymentMethod}</span>
                </div>

                <div className="flex items-center justify-between gap-3 border-b border-[#161D2B] pb-2">
                  <span className="text-[#8492A6] w-24 sm:w-28 shrink-0">Transaction ID</span>
                  <div className="flex items-center gap-2 text-white font-medium min-w-0 justify-end">
                    <span className="font-mono text-xs sm:text-sm break-all">{transactionId}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(transactionId, "txId")}
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

                <div className="flex items-center justify-between gap-3 border-b border-[#161D2B] pb-2">
                  <span className="text-[#8492A6] w-24 sm:w-28 shrink-0">Payment Status</span>
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

                <div className="flex items-center justify-between gap-3 border-b border-[#161D2B] pb-2">
                  <span className="text-[#8492A6] w-24 sm:w-28 shrink-0">Payment Date</span>
                  <span className="text-white font-medium text-right break-words leading-tight">
                    {paymentDate}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-[#8492A6] w-24 sm:w-28 shrink-0">Reference ID</span>
                  <div className="flex items-center gap-2 text-white font-medium min-w-0 justify-end">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
