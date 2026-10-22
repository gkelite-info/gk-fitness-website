"use client";

import { useEffect, useState } from "react";
import { X, Copy, Check, Ticket, CheckCircle, CalendarBlank, User } from "@phosphor-icons/react";
import Avatar from "@/app/(screens)/components/reusable/Avatar";
import { GymPassPayment } from "./gymPassRevenueTypes";

interface GymPassRevenueDetailModalProps {
  payment: GymPassPayment | null;
  onClose: () => void;
}

export default function GymPassRevenueDetailModal({
  payment,
  onClose,
}: GymPassRevenueDetailModalProps) {
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
  const customerId = payment.customerId || `CUS${payment.transactionId.replace(/\D/g, "") || "10234"}`;
  const joinedDate = payment.joinedDate || "12 Aug 2026";

  const passPeriodStart = payment.startDate || payment.date;
  const passPeriodEnd = payment.endDate || payment.validTill;
  const passDays = payment.passDays || "30 Days";
  const validityRange = payment.validityRange || `1 Month (${passPeriodStart} - ${passPeriodEnd})`;
  const autoRenew = payment.autoRenew || "No";
  const paymentDateTime = payment.dateTime || `${payment.date}, 10:24 AM`;
  const paymentMethodDisplay = payment.paymentMethod === "UPI" ? `UPI (${customerEmail})` : payment.paymentMethod;

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
            Gym Pass Purchase Details
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[#94A3B8] hover:text-white hover:bg-[#182030] transition-colors cursor-pointer shrink-0"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <div className="p-5 sm:p-6 flex flex-col gap-5 overflow-y-auto scrollbar-thin">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-[#0F1420] border border-[#1E273A]">
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3.5 min-w-0 text-center sm:text-left">
              <Avatar
                src={payment.customerAvatar}
                gender={payment.gender || "male"}
                alt={payment.customerName}
                className="w-16 h-16 sm:w-12 sm:h-12 rounded-full shrink-0"
              />
              <div className="flex flex-col items-center sm:items-start min-w-0">
                <span className="text-base sm:text-lg font-bold text-white break-words leading-tight">
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

            <div className="flex flex-col items-center sm:items-end justify-center shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#1B2232] gap-1 text-center sm:text-right">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#112338] text-[#38BDF8] border border-[#0284C7]/40 w-fit">
                <User size={13} weight="bold" />
                <span>Customer</span>
              </span>
              <span className="text-xs text-[#8492A6] mt-1">
                Customer ID: <strong className="text-white font-medium">{customerId}</strong>
              </span>
              <span className="text-[11px] text-[#8492A6]">
                Joined on {joinedDate}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0F1420] border border-[#1E273A] flex flex-col gap-3.5">
              <div className="flex items-center gap-2 text-white">
                <Ticket size={18} className="text-[#F59E0B]" />
                <h3 className="text-xs sm:text-sm font-bold tracking-tight">
                  Pass Information
                </h3>
              </div>

              <div className="flex flex-col gap-2.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between gap-3 border-b border-[#161D2B] pb-2">
                  <span className="text-[#8492A6] shrink-0">Pass Type</span>
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-semibold bg-[#3A2209] text-[#F59E0B] border border-[#B45309]/50">
                    {payment.passType}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 border-b border-[#161D2B] pb-2">
                  <span className="text-[#8492A6] shrink-0">Price</span>
                  <span className="text-white font-bold">{payment.amount}</span>
                </div>

                <div className="flex items-center justify-between gap-3 border-b border-[#161D2B] pb-2">
                  <span className="text-[#8492A6] shrink-0">Validity</span>
                  <span className="text-white font-medium text-right text-xs">{validityRange}</span>
                </div>

                <div className="flex items-center justify-between gap-3 border-b border-[#161D2B] pb-2">
                  <span className="text-[#8492A6] shrink-0">Start Date</span>
                  <span className="text-white font-medium text-right">{passPeriodStart}</span>
                </div>

                <div className="flex items-center justify-between gap-3 border-b border-[#161D2B] pb-2">
                  <span className="text-[#8492A6] shrink-0">End Date</span>
                  <span className="text-white font-medium text-right">{passPeriodEnd}</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-[#8492A6] shrink-0">Auto-Renew</span>
                  <span className="text-white font-medium text-right">{autoRenew}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-[#0F1420] border border-[#1E273A] flex flex-col justify-between flex-1">
                <div className="flex items-center gap-1.5 w-fit px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#052E16] text-[#10B981] border border-[#166534]/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  <span>Active</span>
                </div>

                <div className="flex items-center gap-4 py-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#112338] border border-[#1E3A5F]/70 text-[#38BDF8] flex items-center justify-center shrink-0">
                    <CalendarBlank size={24} weight="bold" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] text-[#8492A6]">Pass Period</span>
                    <span className="text-sm font-bold text-white mt-0.5">{passPeriodStart}</span>
                    <span className="text-[11px] text-[#8492A6]">to</span>
                    <span className="text-sm font-bold text-white">{passPeriodEnd}</span>
                    <span className="text-xs text-[#8492A6] mt-0.5">{passDays}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#071F17] border border-[#134E35]/60 flex items-start gap-3">
                <CheckCircle size={22} weight="fill" className="text-[#10B981] shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white">Payment Successful</span>
                  <p className="text-xs text-[#94A3B8] mt-0.5 leading-relaxed">
                    This payment was completed successfully and the gym pass is active.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#0F1420] border border-[#1E273A] flex flex-col gap-3.5">
            <div className="flex items-center gap-2 text-white">
              <Ticket size={18} className="text-[#38BDF8]" />
              <h3 className="text-xs sm:text-sm font-bold tracking-tight">
                Payment Information
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3.5 gap-x-8 text-xs sm:text-sm">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3 border-b border-[#161D2B] pb-2">
                  <span className="text-[#8492A6] shrink-0">Transaction ID</span>
                  <span className="text-white font-mono text-xs sm:text-sm">{payment.transactionId}</span>
                </div>

                <div className="flex items-center justify-between gap-3 border-b border-[#161D2B] pb-2">
                  <span className="text-[#8492A6] shrink-0">Amount</span>
                  <span className="text-white font-bold text-right">{payment.amount}</span>
                </div>

                <div className="flex items-center justify-between gap-3 border-b border-[#161D2B] pb-2">
                  <span className="text-[#8492A6] shrink-0">Status</span>
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

                <div className="flex items-center justify-between gap-3">
                  <span className="text-[#8492A6] shrink-0">Source</span>
                  <span className="text-white font-medium text-right">{payment.source}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3 border-b border-[#161D2B] pb-2">
                  <span className="text-[#8492A6] shrink-0">Payment Date & Time</span>
                  <span className="text-white font-medium text-right break-words">{paymentDateTime}</span>
                </div>

                <div className="flex items-start justify-between gap-3 border-b border-[#161D2B] pb-2">
                  <span className="text-[#8492A6] shrink-0 pt-0.5">Payment Method</span>
                  <span className="text-white font-medium text-right break-all leading-snug">
                    {paymentMethodDisplay}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-[#8492A6] shrink-0">Reference ID</span>
                  <div className="flex items-center gap-2 text-white font-medium min-w-0 justify-end">
                    <span className="font-mono text-xs break-all">{payment.referenceId}</span>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
