"use client";

import { useState } from "react";

export default function NotesSection() {
  const [notes, setNotes] = useState("");

  return (
    <div className="flex flex-col items-start p-6 gap-5 w-full h-full bg-[#10151F] border border-[#1D2636] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-xl">
      <div className="flex flex-row items-center gap-3.5 w-full">
        <div className="flex flex-row justify-center items-center w-7 h-7 bg-[rgba(23,37,84,0.8)] border border-[rgba(37,99,235,0.4)] rounded-full shrink-0">
          <span className="font-sans font-bold text-xs text-[#60A5FA]">4</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <h2 className="font-sans font-semibold text-base text-white leading-6">Notes</h2>
          <p className="font-sans font-normal text-xs text-[#94A3B8] leading-4">Add any additional details or customer requirements.</p>
        </div>
      </div>

      <div className="flex flex-col items-start w-full gap-1.5 flex-1">
        <label className="font-sans font-medium text-xs text-[#CBD5E1] leading-4">Notes / Customer Requirement</label>
        
        <div className="flex flex-col w-full h-full min-h-[126px] bg-[#0C1017] border border-[#232E40] focus-within:border-[#38BDF8] rounded-lg transition-colors overflow-hidden">
          <textarea 
            placeholder="Enter notes, customer requirements or any other relevant details..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full h-full min-h-[100px] p-3 bg-transparent border-none font-sans font-normal text-sm text-white placeholder-[#64748B] outline-none resize-none"
            maxLength={500}
          />
          <div className="flex flex-row justify-end items-center px-3 py-1.5 w-full bg-[#0C1017]">
            <span className="font-mono font-normal text-xs text-[#64748B] text-right">
              {notes.length}/500
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
