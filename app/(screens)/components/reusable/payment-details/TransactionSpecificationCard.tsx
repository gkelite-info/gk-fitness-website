"use client";

import { useState } from "react";
import { User, CalendarBlank, CurrencyInr, CreditCard, Copy, Check } from "@phosphor-icons/react/dist/ssr";
import toast from "react-hot-toast";
import { PaymentDetailsData } from "./types";

interface TransactionSpecificationCardProps {
  data: PaymentDetailsData;
}

export default function TransactionSpecificationCard({ data }: TransactionSpecificationCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.transactionId);
    setCopied(true);
    toast.success("Transaction ID copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-start p-7 w-full bg-[#0A0C11] border border-[rgba(31,36,51,0.8)] rounded-2xl relative shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] hover:border-[rgba(212,255,0,0.4)] transition-all duration-300">
      
      <div className="flex flex-row justify-start items-center w-full pb-5 border-b border-[rgba(31,36,51,0.6)] mb-6 gap-3">
        <div className="w-3 h-3 bg-[#D4FF00] rounded-full shadow-[0_0_8px_#D4FF00]" />
        <h4 className="font-sans font-bold text-base leading-6 tracking-[0.8px] uppercase text-[#E2E8F0] m-0">
          Transaction Specification
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full">
        
        <div className="group/card flex flex-col justify-between items-start p-4 bg-[rgba(19,23,34,0.8)] border border-[rgba(31,36,51,0.7)] rounded-xl min-h-[124px] hover:bg-[rgba(212,255,0,0.1)] hover:border-[rgba(212,255,0,0.4)] hover:shadow-[0_0_15px_rgba(212,255,0,0.1)] transition-all duration-300 cursor-pointer">
          <div className="flex flex-row justify-between items-center w-full">
            <span className="font-sans font-medium text-xs text-[#94A3B8] group-hover/card:text-[#D4FF00] transition-colors duration-300">Membership Plan</span>
            <div className="flex justify-center items-center w-8 h-8 bg-[rgba(31,36,51,0.6)] border border-[#D4FF00]/20 rounded-lg group-hover/card:bg-[#D4FF00] transition-colors duration-300">
              <User size={16} className="text-[#D4FF00] group-hover/card:text-black transition-colors duration-300" />
            </div>
          </div>
          <div className="flex flex-col mt-3 gap-0.5">
            <span className="font-sans font-bold text-lg leading-7 text-white group-hover/card:text-[#D4FF00] transition-colors duration-300">
              {data.membershipPlan}
            </span>
          </div>
        </div>

        <div className="group/card flex flex-col justify-between items-start p-4 bg-[rgba(19,23,34,0.8)] border border-[rgba(31,36,51,0.7)] rounded-xl min-h-[124px] hover:bg-[rgba(212,255,0,0.1)] hover:border-[rgba(212,255,0,0.4)] hover:shadow-[0_0_15px_rgba(212,255,0,0.1)] transition-all duration-300 cursor-pointer">
          <div className="flex flex-row justify-between items-center w-full">
            <span className="font-sans font-medium text-xs text-[#94A3B8] group-hover/card:text-[#D4FF00] transition-colors duration-300">Plan Duration</span>
            <div className="flex justify-center items-center w-8 h-8 bg-[rgba(31,36,51,0.6)] border border-[#D4FF00]/20 rounded-lg group-hover/card:bg-[#D4FF00] transition-colors duration-300">
              <CalendarBlank size={16} className="text-[#D4FF00] group-hover/card:text-black transition-colors duration-300" />
            </div>
          </div>
          <div className="flex flex-col mt-3 gap-0.5">
            <span className="font-sans font-bold text-lg leading-7 text-white group-hover/card:text-[#D4FF00] transition-colors duration-300">
              {data.planDuration}
            </span>
            <span className="font-sans font-normal text-xs text-[#94A3B8] group-hover/card:text-[#D4FF00]/70 transition-colors duration-300">
              Valid till {data.planValidTill}
            </span>
          </div>
        </div>

        <div className="group/card flex flex-col justify-between items-start p-4 bg-[rgba(19,23,34,0.8)] border border-[rgba(31,36,51,0.7)] rounded-xl min-h-[124px] hover:bg-[rgba(212,255,0,0.1)] hover:border-[rgba(212,255,0,0.4)] hover:shadow-[0_0_15px_rgba(212,255,0,0.1)] transition-all duration-300 cursor-pointer">
          <div className="flex flex-row justify-between items-center w-full">
            <span className="font-sans font-medium text-xs text-[#94A3B8] group-hover/card:text-[#D4FF00] transition-colors duration-300">Amount Paid</span>
            <div className="flex justify-center items-center w-8 h-8 bg-[rgba(31,36,51,0.6)] border border-[#D4FF00]/20 rounded-lg group-hover/card:bg-[#D4FF00] transition-colors duration-300">
              <CurrencyInr size={16} className="text-[#D4FF00] group-hover/card:text-black transition-colors duration-300" />
            </div>
          </div>
          <div className="flex flex-col mt-3 gap-0.5">
            <span className="font-sans font-bold text-2xl leading-8 tracking-[-0.6px] text-white group-hover/card:text-[#D4FF00] transition-colors duration-300">
              ₹{data.amountPaid.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="group/card flex flex-col justify-between items-start p-4 bg-[rgba(19,23,34,0.8)] border border-[rgba(31,36,51,0.7)] rounded-xl min-h-[124px] hover:bg-[rgba(212,255,0,0.1)] hover:border-[rgba(212,255,0,0.4)] hover:shadow-[0_0_15px_rgba(212,255,0,0.1)] transition-all duration-300 cursor-pointer">
          <div className="flex flex-row justify-between items-center w-full">
            <span className="font-sans font-medium text-xs text-[#94A3B8] group-hover/card:text-[#D4FF00] transition-colors duration-300">Payment Method</span>
            <div className="flex justify-center items-center w-8 h-8 bg-[rgba(31,36,51,0.6)] border border-[#D4FF00]/20 rounded-lg group-hover/card:bg-[#D4FF00] transition-colors duration-300">
              <CreditCard size={16} className="text-[#D4FF00] group-hover/card:text-black transition-colors duration-300" />
            </div>
          </div>
          <div className="flex flex-col mt-3 gap-1.5">
            <div className="flex flex-row items-center px-3 py-1 bg-[rgba(212,255,0,0.1)] border border-[rgba(212,255,0,0.4)] rounded min-h-[26px] w-fit max-w-full group-hover/card:bg-[#D4FF00] transition-colors duration-300">
              <span className="font-sans font-extrabold text-[11px] sm:text-xs leading-tight tracking-[0.6px] text-[#D4FF00] uppercase truncate group-hover/card:text-black transition-colors duration-300">
                {data.paymentMethod}
              </span>
            </div>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full mt-4">
        
        <div className="group/card flex flex-col justify-between items-start p-4 bg-[rgba(19,23,34,0.6)] border border-[rgba(31,36,51,0.6)] rounded-xl min-h-[84px] hover:bg-[rgba(212,255,0,0.1)] hover:border-[rgba(212,255,0,0.4)] hover:shadow-[0_0_15px_rgba(212,255,0,0.1)] transition-all duration-300 cursor-pointer">
          <span className="font-sans font-medium text-xs text-[#94A3B8] group-hover/card:text-[#D4FF00] transition-colors duration-300">Transaction ID</span>
          <div className="flex flex-row justify-between items-center w-full mt-2 gap-2">
            <span className="font-mono font-semibold text-sm leading-5 tracking-[0.35px] text-white truncate group-hover/card:text-[#D4FF00] transition-colors duration-300">
              {data.transactionId}
            </span>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleCopy();
              }}
              className="flex items-center justify-center w-6 h-6 bg-[rgba(31,36,51,0.6)] rounded-lg hover:bg-white/10 transition-colors cursor-pointer group-hover/card:bg-[rgba(31,36,51,0.9)]"
            >
              {copied ? (
                <Check size={12} weight="bold" className="text-[#34D399]" />
              ) : (
                <Copy size={12} className="text-[#D4FF00] group-hover/card:text-white transition-colors duration-300" />
              )}
            </button>
          </div>
        </div>

        <div className="group/card flex flex-col justify-between items-start p-4 bg-[rgba(19,23,34,0.6)] border border-[rgba(31,36,51,0.6)] rounded-xl min-h-[84px] hover:bg-[rgba(212,255,0,0.1)] hover:border-[rgba(212,255,0,0.4)] hover:shadow-[0_0_15px_rgba(212,255,0,0.1)] transition-all duration-300 cursor-pointer">
          <span className="font-sans font-medium text-xs text-[#94A3B8] group-hover/card:text-[#D4FF00] transition-colors duration-300">Payment Date</span>
          <span className="font-sans font-semibold text-sm leading-5 text-white mt-2 group-hover/card:text-[#D4FF00] transition-colors duration-300">
            {data.paymentDate}
          </span>
        </div>

        <div className="group/card flex flex-col justify-between items-start p-4 bg-[rgba(19,23,34,0.6)] border border-[rgba(31,36,51,0.6)] rounded-xl min-h-[84px] hover:bg-[rgba(212,255,0,0.1)] hover:border-[rgba(212,255,0,0.4)] hover:shadow-[0_0_15px_rgba(212,255,0,0.1)] transition-all duration-300 cursor-pointer">
          <span className="font-sans font-medium text-xs text-[#94A3B8] group-hover/card:text-[#D4FF00] transition-colors duration-300">Payment Time</span>
          <span className="font-sans font-semibold text-sm leading-5 text-white mt-2 group-hover/card:text-[#D4FF00] transition-colors duration-300">
            {data.paymentTime}
          </span>
        </div>

        <div className="group/card flex flex-col justify-between items-start p-4 bg-[rgba(19,23,34,0.6)] border border-[rgba(31,36,51,0.6)] rounded-xl min-h-[84px] hover:bg-[rgba(212,255,0,0.1)] hover:border-[rgba(212,255,0,0.4)] hover:shadow-[0_0_15px_rgba(212,255,0,0.1)] transition-all duration-300 cursor-pointer">
          <span className="font-sans font-medium text-xs text-[#94A3B8] group-hover/card:text-[#D4FF00] transition-colors duration-300">Payment Status</span>
          <div className="flex flex-row items-center gap-2 mt-2">
            <div className="w-2 h-2 bg-[#34D399] shadow-[0_0_8px_#34D399] rounded-full" />
            <span className="font-sans font-bold text-sm leading-5 text-[#34D399]">
              {data.paymentStatus}
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
