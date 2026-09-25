import { 
  CheckCircle, 
  Clock, 
  X, 
  EnvelopeSimple, 
  ArrowsLeftRight, 
  Users, 
  Notepad, 
  CalendarBlank 
} from "@phosphor-icons/react";
import { useState } from "react";

export default function AddFollowUpLeftColumn() {
  const [outcome, setOutcome] = useState("Interested");

  return (
    <div className="flex flex-col gap-5 w-full h-full">
      <div className="flex flex-col p-4 sm:p-5 bg-[#151D28] border border-[#212D3B] rounded-xl gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 bg-[#CCFF00]/10 rounded border border-[#CCFF00]/30 shrink-0">
            <CheckCircle size={14} weight="bold" className="text-[#CCFF00]" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-sans font-bold text-sm text-white">Outcome</h3>
            <p className="font-sans text-[11px] text-[#94A3B8]">Select the outcome of this interaction.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <button 
            onClick={() => setOutcome("Interested")}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border transition-colors ${
              outcome === "Interested" 
                ? "bg-[#CCFF00] border-[#CCFF00] text-black shadow-sm" 
                : "bg-[#0D131A] border-[#212D3B] text-[#CBD5E1] hover:border-[#94A3B8]/50"
            }`}
          >
            <CheckCircle size={14} weight="bold" />
            <span className="font-sans font-semibold text-xs whitespace-nowrap">Interested</span>
          </button>
          
          <button 
            onClick={() => setOutcome("Call Later")}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border transition-colors ${
              outcome === "Call Later" 
                ? "bg-[#CCFF00] border-[#CCFF00] text-black shadow-sm" 
                : "bg-[#0D131A] border-[#212D3B] text-[#CBD5E1] hover:border-[#94A3B8]/50"
            }`}
          >
            <Clock size={14} />
            <span className="font-sans font-medium text-xs whitespace-nowrap">Call Later</span>
          </button>
          
          <button 
            onClick={() => setOutcome("Not Interested")}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border transition-colors ${
              outcome === "Not Interested" 
                ? "bg-[#CCFF00] border-[#CCFF00] text-black shadow-sm" 
                : "bg-[#0D131A] border-[#212D3B] text-[#CBD5E1] hover:border-[#94A3B8]/50"
            }`}
          >
            <X size={14} />
            <span className="font-sans font-medium text-xs whitespace-nowrap">Not Interested</span>
          </button>

          <button 
            onClick={() => setOutcome("No Response")}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border transition-colors ${
              outcome === "No Response" 
                ? "bg-[#CCFF00] border-[#CCFF00] text-black shadow-sm" 
                : "bg-[#0D131A] border-[#212D3B] text-[#CBD5E1] hover:border-[#94A3B8]/50"
            }`}
          >
            <EnvelopeSimple size={14} />
            <span className="font-sans font-medium text-xs whitespace-nowrap">No Response</span>
          </button>

          <button 
            onClick={() => setOutcome("Visited Gym")}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border transition-colors ${
              outcome === "Visited Gym" 
                ? "bg-[#CCFF00] border-[#CCFF00] text-black shadow-sm" 
                : "bg-[#0D131A] border-[#212D3B] text-[#CBD5E1] hover:border-[#94A3B8]/50"
            }`}
          >
            <ArrowsLeftRight size={14} />
            <span className="font-sans font-medium text-xs whitespace-nowrap">Visited Gym</span>
          </button>

          <button 
            onClick={() => setOutcome("Converted")}
            className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg border transition-colors ${
              outcome === "Converted" 
                ? "bg-[#CCFF00] border-[#CCFF00] text-black shadow-sm" 
                : "bg-[#0D131A] border-[#212D3B] text-[#CBD5E1] hover:border-[#94A3B8]/50"
            }`}
          >
            <Users size={14} />
            <span className="font-sans font-medium text-xs whitespace-nowrap">Converted</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col p-4 sm:p-5 bg-[#151D28] border border-[#212D3B] rounded-xl gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded border border-[#CCFF00] shrink-0">
            <Notepad size={14} className="text-[#CCFF00]" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-sans font-bold text-sm text-white">Follow-up Notes</h3>
            <p className="font-sans text-[11px] text-[#94A3B8]">Add details about the conversation, customer interest, objections, or next steps.</p>
          </div>
        </div>
        
        <div className="relative w-full">
          <textarea 
            placeholder="Add notes about the conversation, customer interest, objections, or next steps..."
            className="w-full h-[92px] bg-[#0D131A] border border-[#212D3B] rounded-lg p-3 pt-3 pb-8 font-sans text-xs text-[#E2E8F0] placeholder:text-[#64748B] resize-none outline-none focus:border-[#38BDF8] transition-colors"
          />
          <span className="absolute bottom-2 right-3 font-mono text-[10px] text-[#64748B]">0/1000</span>
        </div>
      </div>

      <div className="flex flex-col p-4 sm:p-5 bg-[#151D28] border border-[#212D3B] rounded-xl gap-4 flex-1">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded border border-[#38BDF8] shrink-0">
            <CalendarBlank size={14} className="text-[#38BDF8]" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-sans font-bold text-sm text-white">Next Follow-up</h3>
            <p className="font-sans text-[11px] text-[#94A3B8]">Schedule the next follow-up date and time.</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full">
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="font-sans font-medium text-[11px] text-[#94A3B8]">Date</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <CalendarBlank size={14} className="text-[#94A3B8]" />
              </div>
              <input 
                type="text" 
                defaultValue="24 Sep 2026"
                className="w-full bg-[#0D131A] border border-[#212D3B] rounded-lg py-2.5 pl-9 pr-3 font-sans font-medium text-xs text-[#E2E8F0] outline-none focus:border-[#38BDF8] transition-colors"
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5 flex-1">
            <label className="font-sans font-medium text-[11px] text-[#94A3B8]">Time (Optional)</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Clock size={14} className="text-[#94A3B8]" />
              </div>
              <input 
                type="text" 
                defaultValue="06:00 PM"
                className="w-full bg-[#0D131A] border border-[#212D3B] rounded-lg py-2.5 pl-9 pr-3 font-sans font-medium text-xs text-[#E2E8F0] outline-none focus:border-[#38BDF8] transition-colors"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
