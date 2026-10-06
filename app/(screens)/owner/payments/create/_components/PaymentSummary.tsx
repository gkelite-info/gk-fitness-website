"use client";

import {
  User,
  Crown,
  CalendarBlank,
  Clock,
  FileText,
  PencilSimple,
  CaretRight,
  QrCode,
  Money
} from "@phosphor-icons/react";
import Avatar from "@/app/(screens)/components/reusable/Avatar";

interface PaymentSummaryProps {
  paymentMethod: "cash" | "qr";
  formData?: any;
}

export default function PaymentSummary({ paymentMethod, formData }: PaymentSummaryProps) {
  let formattedDate = "N/A";
  if (formData?.paymentDate) {
    try {
      const dateObj = new Date(formData.paymentDate);
      const day = String(dateObj.getDate()).padStart(2, '0');
      const month = dateObj.toLocaleString('en-GB', { month: 'short' });
      const year = dateObj.getFullYear();
      formattedDate = `${day} ${month} ${year}`;
    } catch (e) {
      formattedDate = formData.paymentDate;
    }
  }

  let formattedTime = "N/A";
  if (formData?.paymentTime) {
    try {
      const [hoursStr, minutes] = formData.paymentTime.split(":");
      const hours = parseInt(hoursStr, 10);
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const paddedHours = String(formattedHours).padStart(2, '0');
      formattedTime = `${paddedHours}:${minutes} ${ampm}`;
    } catch (e) {
      formattedTime = formData.paymentTime;
    }
  }

  return (
    <div className="hidden lg:flex flex-col items-start p-5 gap-5 w-full lg:col-span-5 xl:col-span-4 bg-[#14171D] border border-[#282D36] rounded-[16px] sticky top-6 self-start">
      <div className="flex flex-col items-start pb-4 border-b border-[#282D36] w-full gap-1">
        <h2 className="font-[700] text-[14px] leading-[20px] text-white m-0">
          Payment Summary
        </h2>
        <span className="font-[400] text-[11px] leading-[16px] text-[#9CA3AF]">
          Review details before saving
        </span>
      </div>

      <div className="box-border flex flex-row justify-between items-center p-3 w-full bg-[#191D24] border border-[#282D36] rounded-[12px]">
        <div className="flex flex-row items-center gap-3">
          <div className="flex flex-row justify-center items-center w-9 h-9 bg-[#1E2A14] border border-[rgba(204,255,0,0.3)] rounded-full shrink-0 overflow-hidden">
            <Avatar className="w-full h-full" src={formData?.customer?.userAccount?.profilePhoto} />
          </div>
          <div className="flex flex-col items-start gap-0.5">
            <span className="font-[700] text-[12px] leading-[15px] text-white">
              {formData?.customer?.fullName || "Select a Member"}
            </span>
            <span className="font-[400] text-[11px] leading-[16px] text-[#9CA3AF]">
              {formData?.customer?.phone || "No number"}
            </span>
          </div>
        </div>
        <CaretRight size={16} weight="bold" className="text-[#CCFF00]" />
      </div>

      <div className="box-border flex flex-row justify-between items-center p-3 w-full bg-[#191D24] border border-[#282D36] rounded-[12px]">
        <div className="flex flex-row items-center gap-3">
          <div className="flex flex-row justify-center items-center w-9 h-9 bg-[#202715] rounded-full shrink-0">
            <Crown size={16} weight="fill" className="text-[#CCFF00]" />
          </div>
          <div className="flex flex-col items-start gap-0.5">
            <span className="font-[700] text-[12px] leading-[15px] text-white">
              {formData?.plan?.planName || "No Plan Selected"}
            </span>
            <span className="font-[400] text-[11px] leading-[16px] text-[#9CA3AF]">
              {formData?.plan?.durationMonths ? `${formData.plan.durationMonths} Month(s)` : "Choose a plan"}
            </span>
          </div>
        </div>
        {formData?.plan && (
          <div className="box-border flex flex-col items-center px-2.5 py-0.5 bg-[#172E12] border border-[rgba(21,128,61,0.4)] rounded-full">
            <span className="font-[600] text-[10px] leading-[15px] text-[#4ADE80]">
              Active Plan
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col items-start pt-1 gap-3 w-full">
        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row items-center gap-2 shrink-0">
            <User size={14} weight="regular" className="text-[#9CA3AF]" />
            <span className="font-[400] text-[12px] leading-[16px] text-[#9CA3AF] whitespace-nowrap">
              Amount
            </span>
          </div>
          <span className="font-[700] text-[14px] leading-[20px] text-white text-right">
            ₹{formData?.amount || "0"}
          </span>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row items-center gap-2 shrink-0">
            <QrCode size={14} weight="regular" className="text-[#9CA3AF]" />
            <span className="font-[400] text-[12px] leading-[16px] text-[#9CA3AF] whitespace-nowrap">
              Payment Method
            </span>
          </div>
          {paymentMethod === "qr" ? (
            <div className="box-border flex flex-row items-center px-2.5 py-0.5 gap-1.5 bg-[#1A2512] border border-[rgba(204,255,0,0.4)] rounded-full">
              <QrCode size={12} weight="bold" className="text-[#CCFF00]" />
              <span className="font-[600] text-[11px] leading-[16px] text-[#CCFF00]">
                QR Code
              </span>
            </div>
          ) : (
            <div className="box-border flex flex-row items-center px-2.5 py-0.5 gap-1.5 bg-[#1A2512] border border-[rgba(204,255,0,0.4)] rounded-full">
              <Money size={12} weight="bold" className="text-[#CCFF00]" />
              <span className="font-[600] text-[11px] leading-[16px] text-[#CCFF00]">
                Cash
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row items-center gap-2 shrink-0">
            <CalendarBlank size={14} weight="regular" className="text-[#9CA3AF]" />
            <span className="font-[400] text-[12px] leading-[16px] text-[#9CA3AF] whitespace-nowrap">
              Payment Date
            </span>
          </div>
          <span className="font-[500] text-[12px] leading-[16px] text-white text-right">
            {formattedDate}
          </span>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row items-center gap-2 shrink-0">
            <Clock size={14} weight="regular" className="text-[#9CA3AF]" />
            <span className="font-[400] text-[12px] leading-[16px] text-[#9CA3AF] whitespace-nowrap">
              Payment Time
            </span>
          </div>
          <span className="font-[500] text-[12px] leading-[16px] text-white text-right">
            {formattedTime}
          </span>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row items-center gap-2 shrink-0">
            <FileText size={14} weight="regular" className="text-[#9CA3AF]" />
            <span className="font-[400] text-[12px] leading-[16px] text-[#9CA3AF] whitespace-nowrap">
              Transaction Ref.
            </span>
          </div>
          <span className="font-[400] text-[12px] leading-[16px] text-[#9CA3AF] italic text-right max-w-[120px] truncate" title={formData?.transactionId || ""}>
            {paymentMethod === "qr" ? (formData?.transactionId || "-") : "N/A"}
          </span>
        </div>

        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex flex-row items-center gap-2 shrink-0">
            <PencilSimple size={14} weight="regular" className="text-[#9CA3AF]" />
            <span className="font-[400] text-[12px] leading-[16px] text-[#9CA3AF] whitespace-nowrap">
              Notes
            </span>
          </div>
          <span className="font-[400] text-[12px] leading-[16px] text-[#9CA3AF] italic text-right max-w-[120px] truncate" title={formData?.notes || ""}>
            {formData?.notes || "-"}
          </span>
        </div>
      </div>
    </div>
  );
}
