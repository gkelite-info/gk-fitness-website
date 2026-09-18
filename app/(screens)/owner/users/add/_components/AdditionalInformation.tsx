"use client";

import { FileText } from "@phosphor-icons/react";

export default function AdditionalInformation() {
  return (
    <div className="flex flex-col items-start p-4 md:p-5 gap-[15px] w-full bg-[#161B22] border border-[#14161A] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-xl">
      <div className="flex flex-row items-center pb-4 w-full border-b border-[rgba(35,42,53,0.6)]">
        <FileText weight="fill" className="text-[#D4FF32]" size={14} />
        <div className="pl-2.5">
          <h2 className="font-sans font-bold text-xs leading-4 tracking-[0.6px] uppercase text-[#D4FF32]">
            Additional Information
          </h2>
        </div>
      </div>

      <div className="flex flex-col items-start gap-1.5 w-full">
        <label className="w-full font-sans font-medium text-[11px] leading-4 text-[#D1D5DB]">
          Bio / About Trainer
        </label>
        <div className="flex flex-row justify-center items-start px-3 py-2 w-full min-h-[96px] bg-[#1A2029] border border-[#14161A] rounded-lg">
          <textarea
            placeholder="Brief history of achievements, training style, etc..."
            className="w-full h-full bg-transparent outline-none font-sans font-normal text-xs leading-4 text-white placeholder:text-[#6B7280] resize-none"
          />
        </div>
      </div>
    </div>
  );
}
