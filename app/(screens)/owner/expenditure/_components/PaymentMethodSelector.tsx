"use client";
import React from "react";
import { 
  Bank,
  Money,
  CreditCard,
  QrCode
} from "@phosphor-icons/react";

interface PaymentMethodSelectorProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

export default function PaymentMethodSelector({ paymentMethod, setPaymentMethod }: PaymentMethodSelectorProps) {
  const getStyles = (id: string) => {
    const isSelected = paymentMethod === id;
    const base = "flex flex-row justify-center items-center px-3 sm:px-3.5 py-2 gap-1.5 sm:gap-2 h-[34px] rounded-xl border transition-all cursor-pointer";
    switch(id) {
      case "upi":
        return isSelected
          ? `${base} bg-[rgba(59,7,100,0.5)] border-[rgba(168,85,247,0.8)] shadow-[0_0_10px_rgba(168,85,247,0.15)] text-[#E9D5FF]`
          : `${base} bg-[#090D13] border-[rgba(168,85,247,0.4)] hover:bg-[rgba(168,85,247,0.05)] text-[#A855F7]`;
      case "bank":
        return isSelected
          ? `${base} bg-[rgba(15,23,42,0.5)] border-[rgba(56,189,248,0.8)] shadow-[0_0_10px_rgba(56,189,248,0.15)] text-[#E0F2FE]`
          : `${base} bg-[#090D13] border-[rgba(56,189,248,0.4)] hover:bg-[rgba(56,189,248,0.05)] text-[#38BDF8]`;
      case "cash":
        return isSelected
          ? `${base} bg-[rgba(6,78,59,0.5)] border-[rgba(52,211,153,0.8)] shadow-[0_0_10px_rgba(52,211,153,0.15)] text-[#A7F3D0]`
          : `${base} bg-[#090D13] border-[rgba(52,211,153,0.4)] hover:bg-[rgba(52,211,153,0.05)] text-[#34D399]`;
      case "credit":
        return isSelected
          ? `${base} bg-[rgba(120,53,15,0.5)] border-[rgba(251,191,36,0.8)] shadow-[0_0_10px_rgba(251,191,36,0.15)] text-[#FDE68A]`
          : `${base} bg-[#090D13] border-[rgba(251,191,36,0.4)] hover:bg-[rgba(251,191,36,0.05)] text-[#FBBF24]`;
      case "debit":
        return isSelected
          ? `${base} bg-[rgba(8,47,73,0.5)] border-[rgba(34,211,238,0.8)] shadow-[0_0_10px_rgba(34,211,238,0.15)] text-[#CFFAFE]`
          : `${base} bg-[#090D13] border-[rgba(34,211,238,0.4)] hover:bg-[rgba(34,211,238,0.05)] text-[#22D3EE]`;
      default:
        return base;
    }
  };

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <label className="font-sans font-medium text-xs leading-4 text-[#CBD5E1]">
        Payment Method <span className="text-[#F87171]">*</span>
      </label>
      <div className="flex flex-row flex-wrap items-center gap-2.5 w-full">
        <button onClick={() => setPaymentMethod("upi")} className={getStyles("upi")}>
          <QrCode size={16} className="shrink-0" />
          <span className="font-sans font-medium text-[11px] sm:text-xs leading-4 whitespace-nowrap">UPI</span>
        </button>
        <button onClick={() => setPaymentMethod("bank")} className={getStyles("bank")}>
          <Bank size={16} className="shrink-0" />
          <span className="font-sans font-medium text-[11px] sm:text-xs leading-4 whitespace-nowrap">Bank Transfer</span>
        </button>
        <button onClick={() => setPaymentMethod("cash")} className={getStyles("cash")}>
          <Money size={16} className="shrink-0" />
          <span className="font-sans font-medium text-[11px] sm:text-xs leading-4 whitespace-nowrap">Cash</span>
        </button>
        <button onClick={() => setPaymentMethod("credit")} className={getStyles("credit")}>
          <CreditCard size={16} className="shrink-0" />
          <span className="font-sans font-medium text-[11px] sm:text-xs leading-4 whitespace-nowrap">Credit Card</span>
        </button>
        <button onClick={() => setPaymentMethod("debit")} className={getStyles("debit")}>
          <CreditCard size={16} className="shrink-0" />
          <span className="font-sans font-medium text-[11px] sm:text-xs leading-4 whitespace-nowrap">Debit Card</span>
        </button>
      </div>
    </div>
  );
}
