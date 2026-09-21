"use client";

import {
  X,
  Check,
  User,
  Crown,
  CurrencyInr,
  QrCode,
  CalendarBlank,
  Clock,
  FileText,
  CheckCircle,
  Money
} from "@phosphor-icons/react";
import { useEffect } from "react";

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onViewPayments: () => void;
  onAddAnother: () => void;
  paymentDetails: {
    member: string;
    planName: string;
    planDuration: string;
    amount: string;
    method: "cash" | "qr";
    date: string;
    time: string;
    referenceId?: string;
  };
}

export default function PaymentSuccessModal({
  isOpen,
  onClose,
  onViewPayments,
  onAddAnother,
  paymentDetails
}: PaymentSuccessModalProps) {

  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-[2px]">

      {/* Modal Container */}
      <div
        className="relative flex flex-col items-center w-full max-w-[420px] max-h-[85vh] bg-[#0F1115] rounded-[16px] overflow-hidden shadow-2xl"
        style={{
          background: "rgba(15, 17, 21, 1)", // Solid fallback
          boxShadow: "0px 25px 60px -15px rgba(0, 0, 0, 0.85), 0px 0px 0px 1px rgba(255, 255, 255, 0.06)"
        }}
      >
        {/* Background Overlay (matches user css) */}
        <div
          className="absolute inset-0 pointer-events-none rounded-[16px] z-0"
          style={{ background: "rgba(255, 255, 255, 0.002)" }}
        />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#9CA3AF] hover:text-white transition-colors z-50 cursor-pointer rounded-full hover:bg-white/5"
        >
          <X size={16} weight="bold" />
        </button>

        {/* Fixed Header (Always visible) */}
        <div className="flex flex-col items-center gap-4 w-full p-6 pt-10 pb-4 relative z-10 shrink-0">
          <div className="flex items-center justify-center w-14 h-14 rounded-full border border-[#CCFF00] shadow-[0px_0px_20px_rgba(204,255,0,0.2)] shrink-0">
            <Check size={24} weight="bold" className="text-[#CCFF00]" />
          </div>
          <div className="flex flex-col items-center gap-1.5 text-center">
            <h2 className="font-[700] text-[18px] leading-[24px] text-white m-0">
              Payment Added Successfully!
            </h2>
            <p className="font-[400] text-[12px] leading-[16px] text-[#9CA3AF] m-0">
              The payment has been recorded and added to the history.
            </p>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex flex-col items-center w-full px-6 pb-6 relative z-10 gap-6 overflow-y-auto scrollbar-themed">

          {/* Payment Summary Box */}
          <div className="flex flex-col items-start w-full p-4 gap-4 bg-transparent border border-[#282D36] rounded-[12px]">
            <span className="font-[700] text-[12px] leading-[16px] text-[#CCFF00]">
              Payment Summary
            </span>

            <div className="flex flex-col w-full gap-3">

              {/* Member */}
              <div className="flex flex-row justify-between items-start w-full gap-2">
                <div className="flex flex-row items-center gap-2 shrink-0">
                  <User size={14} weight="regular" className="text-[#CCFF00]" />
                  <span className="font-[400] text-[12px] leading-[16px] text-[#9CA3AF] whitespace-nowrap">
                    Member
                  </span>
                </div>
                <span className="font-[600] text-[12px] leading-[16px] text-white text-right break-words">
                  {paymentDetails.member}
                </span>
              </div>

              {/* Membership Plan */}
              <div className="flex flex-row justify-between items-start w-full gap-2">
                <div className="flex flex-row items-center gap-2 shrink-0">
                  <Crown size={14} weight="regular" className="text-[#CCFF00]" />
                  <span className="font-[400] text-[12px] leading-[16px] text-[#9CA3AF] whitespace-nowrap">
                    Membership Plan
                  </span>
                </div>
                <div className="flex flex-col items-end text-right">
                  <span className="font-[600] text-[12px] leading-[16px] text-white break-words">
                    {paymentDetails.planName}
                  </span>
                  <span className="font-[400] text-[10px] leading-[14px] text-[#9CA3AF] whitespace-nowrap">
                    {paymentDetails.planDuration}
                  </span>
                </div>
              </div>

              {/* Amount Paid */}
              <div className="flex flex-row justify-between items-start w-full gap-2">
                <div className="flex flex-row items-center gap-2 shrink-0">
                  <CurrencyInr size={14} weight="regular" className="text-[#CCFF00]" />
                  <span className="font-[400] text-[12px] leading-[16px] text-[#9CA3AF] whitespace-nowrap">
                    Amount Paid
                  </span>
                </div>
                <span className="font-[700] text-[14px] leading-[16px] text-white text-right">
                  {paymentDetails.amount}
                </span>
              </div>

              {/* Payment Method */}
              <div className="flex flex-row justify-between items-start w-full pt-1 gap-2">
                <div className="flex flex-row items-center gap-2 shrink-0">
                  {paymentDetails.method === "qr" ? (
                    <QrCode size={14} weight="regular" className="text-[#CCFF00]" />
                  ) : (
                    <Money size={14} weight="regular" className="text-[#CCFF00]" />
                  )}
                  <span className="font-[400] text-[12px] leading-[16px] text-[#9CA3AF] whitespace-nowrap">
                    Payment Method
                  </span>
                </div>
                <div className="box-border flex flex-row items-center px-2 py-0.5 bg-[#CCFF00] rounded-[4px] shrink-0">
                  <span className="font-[700] text-[10px] leading-[14px] text-black uppercase whitespace-nowrap">
                    {paymentDetails.method === "qr" ? "QR PAYMENT" : "CASH PAYMENT"}
                  </span>
                </div>
              </div>

              {/* Payment Date */}
              <div className="flex flex-row justify-between items-start w-full gap-2">
                <div className="flex flex-row items-center gap-2 shrink-0">
                  <CalendarBlank size={14} weight="regular" className="text-[#CCFF00]" />
                  <span className="font-[400] text-[12px] leading-[16px] text-[#9CA3AF] whitespace-nowrap">
                    Payment Date
                  </span>
                </div>
                <span className="font-[500] text-[12px] leading-[16px] text-white text-right whitespace-nowrap">
                  {paymentDetails.date}
                </span>
              </div>

              {/* Payment Time */}
              <div className="flex flex-row justify-between items-start w-full gap-2">
                <div className="flex flex-row items-center gap-2 shrink-0">
                  <Clock size={14} weight="regular" className="text-[#CCFF00]" />
                  <span className="font-[400] text-[12px] leading-[16px] text-[#9CA3AF] whitespace-nowrap">
                    Payment Time
                  </span>
                </div>
                <span className="font-[500] text-[12px] leading-[16px] text-white text-right whitespace-nowrap">
                  {paymentDetails.time}
                </span>
              </div>

              {/* Reference ID */}
              <div className="flex flex-row justify-between items-start w-full gap-2">
                <div className="flex flex-row items-center gap-2 shrink-0">
                  <FileText size={14} weight="regular" className="text-[#CCFF00]" />
                  <span className="font-[400] text-[12px] leading-[16px] text-[#9CA3AF] whitespace-nowrap">
                    Reference ID
                  </span>
                </div>
                <span className="font-[500] text-[12px] leading-[16px] text-white text-right break-words max-w-full">
                  {paymentDetails.referenceId || "N/A"}
                </span>
              </div>

            </div>
          </div>

          {/* Success Alert */}
          <div className="flex flex-row items-start gap-2.5 w-full p-3 bg-[#111C11] border border-[#1A3316] rounded-[8px]">
            <CheckCircle size={16} weight="fill" className="text-[#CCFF00] shrink-0 mt-0.5" />
            <span className="font-[400] text-[11px] leading-[16px] text-[#D1D5DB]">
              The payment is now visible in the payments list.
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center sm:justify-between gap-3 w-full mt-4">
            <button
              onClick={onViewPayments}
              className="flex flex-col justify-center items-center py-3 w-full sm:flex-1 min-h-[44px] bg-[#13161C] border border-[#282D36] rounded-[12px] hover:bg-[#1a1e26] transition-colors cursor-pointer shrink-0"
            >
              <span className="font-[600] text-[14px] leading-[16px] text-[#CCFF00] text-center whitespace-nowrap">
                View Payments
              </span>
            </button>
            <button
              onClick={onAddAnother}
              className="flex flex-col justify-center items-center py-3 w-full sm:flex-1 min-h-[44px] bg-[#CCFF00] rounded-[12px] hover:bg-[#b8e600] transition-colors cursor-pointer shadow-[0px_4px_10px_-2px_rgba(204,255,0,0.3)] shrink-0"
            >
              <span className="font-[700] text-[14px] leading-[16px] text-black text-center whitespace-nowrap">
                Add Another Payment
              </span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
