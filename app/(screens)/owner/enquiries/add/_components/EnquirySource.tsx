"use client";

import { useState } from "react";
import { ShareNetwork, UserPlus } from "@phosphor-icons/react";

export default function EnquirySource() {
  const [addedVia, setAddedVia] = useState("social");
  const [source, setSource] = useState("google");

  const sources = [
    { id: "google", label: "Google", colorClass: "text-[#93C5FD] bg-[rgba(30,58,138,0.4)] border-[rgba(37,99,235,0.5)]" },
    { id: "instagram", label: "Instagram", colorClass: "text-[#F0ABFC] bg-[rgba(131,58,180,0.2)] border-[rgba(193,53,132,0.4)]" },
    { id: "facebook", label: "Facebook", colorClass: "text-[#60A5FA] bg-[rgba(24,119,242,0.2)] border-[rgba(24,119,242,0.4)]" },
    { id: "referral", label: "Referral", colorClass: "text-[#D8B4FE] bg-[rgba(88,28,135,0.3)] border-[rgba(168,85,247,0.4)]" },
    { id: "walkin", label: "Walk-in", colorClass: "text-[#6EE7B7] bg-[rgba(2,44,34,0.4)] border-[rgba(5,150,105,0.4)]" },
    { id: "owner", label: "Owner Added", colorClass: "text-[#CBD5E1] bg-[#0C1017] border-[#232E40]" },
    { id: "other", label: "Other", colorClass: "text-[#CBD5E1] bg-[#0C1017] border-[#232E40]" },
  ];

  return (
    <div className="flex flex-col items-start p-6 gap-5 w-full bg-[#10151F] border border-[#1D2636] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-xl">
      <div className="flex flex-row items-center gap-3.5 w-full">
        <div className="flex flex-row justify-center items-center w-7 h-7 bg-[rgba(23,37,84,0.8)] border border-[rgba(37,99,235,0.4)] rounded-full shrink-0">
          <span className="font-sans font-bold text-xs text-[#60A5FA]">3</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <h2 className="font-sans font-semibold text-base text-white leading-6">Enquiry Source</h2>
          <p className="font-sans font-normal text-xs text-[#94A3B8] leading-4">How did the customer find us?</p>
        </div>
      </div>

      <div className="flex flex-col items-start w-full gap-5">
        
        <div className="flex flex-col items-start w-full gap-2">
          <label className="font-sans font-medium text-xs text-[#CBD5E1] leading-4">Added Via <span className="text-[#EF4444]">*</span></label>
          <div className="flex flex-col sm:flex-row items-start w-full gap-2.5">
            <button
              onClick={() => setAddedVia("social")}
              className={`flex flex-row justify-center items-center px-4 py-2.5 gap-2 h-[42px] border rounded-lg transition-colors cursor-pointer flex-1 w-full sm:w-auto ${
                addedVia === "social" 
                ? "bg-[rgba(12,36,25,0.3)] border-[#23C55E]" 
                : "bg-[#0C1017] border-[#232E40]"
              }`}
            >
              <ShareNetwork size={16} weight="bold" className={addedVia === "social" ? "text-[#34D399]" : "text-[#94A3B8]"} />
              <span className={`font-sans font-medium text-sm leading-5 text-center ${
                addedVia === "social" ? "text-[#34D399]" : "text-[#CBD5E1]"
              }`}>
                Social Media
              </span>
            </button>

            <button
              onClick={() => setAddedVia("walkin")}
              className={`flex flex-row justify-center items-center px-4 py-2.5 gap-2 h-[42px] border rounded-lg transition-colors cursor-pointer flex-1 w-full sm:w-auto ${
                addedVia === "walkin" 
                ? "bg-[rgba(12,36,25,0.3)] border-[#23C55E]" 
                : "bg-[#0C1017] border-[#232E40]"
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.6667 4.66667C10.6667 5.40305 10.0697 6 9.33333 6C8.59695 6 8 5.40305 8 4.66667C8 3.93029 8.59695 3.33333 9.33333 3.33333C10.0697 3.33333 10.6667 3.93029 10.6667 4.66667Z" stroke={addedVia === "walkin" ? "#34D399" : "#94A3B8"} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.33333 7.33333L6 14H4.66667L6.66667 7.33333" stroke={addedVia === "walkin" ? "#34D399" : "#94A3B8"} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 7.33333V14H11.3333V9.33333" stroke={addedVia === "walkin" ? "#34D399" : "#94A3B8"} strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className={`font-sans font-medium text-sm leading-5 text-center ${
                addedVia === "walkin" ? "text-[#34D399]" : "text-[#CBD5E1]"
              }`}>
                Walk-in
              </span>
            </button>

            <button
              onClick={() => setAddedVia("owner")}
              className={`flex flex-row justify-center items-center px-4 py-2.5 gap-2 h-[42px] border rounded-lg transition-colors cursor-pointer flex-1 w-full sm:w-auto ${
                addedVia === "owner" 
                ? "bg-[rgba(12,36,25,0.3)] border-[#23C55E]" 
                : "bg-[#0C1017] border-[#232E40]"
              }`}
            >
              <UserPlus size={16} weight="bold" className={addedVia === "owner" ? "text-[#34D399]" : "text-[#94A3B8]"} />
              <span className={`font-sans font-medium text-sm leading-5 text-center ${
                addedVia === "owner" ? "text-[#34D399]" : "text-[#CBD5E1]"
              }`}>
                Owner Added
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col items-start w-full gap-2">
          <label className="font-sans font-medium text-xs text-[#CBD5E1] leading-4">Source <span className="text-[#EF4444]">*</span></label>
          <div className="flex flex-row flex-wrap items-center w-full gap-2">
            {sources.map((s) => (
              <button
                key={s.id}
                onClick={() => setSource(s.id)}
                className={`flex flex-row justify-center items-center px-3.5 py-1.5 border rounded-full transition-all cursor-pointer ${
                  s.colorClass
                } ${source === s.id ? "ring-1 ring-white/30 brightness-125" : "opacity-80 hover:opacity-100"}`}
              >
                <span className="font-sans font-medium text-xs leading-4 text-center">
                  {s.label}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
