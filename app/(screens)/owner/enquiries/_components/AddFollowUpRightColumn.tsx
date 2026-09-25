import { 
  Fire, 
  User, 
  Snowflake, 
  DotsThree, 
  Clock,
  CaretDown,
  Info,
  InstagramLogo,
  ShareNetwork,
  Barbell,
  Crown
} from "@phosphor-icons/react";
import { useState } from "react";

export default function AddFollowUpRightColumn() {
  const [category, setCategory] = useState("Hot");

  return (
    <div className="flex flex-col gap-5 w-full h-full">
      <div className="flex flex-col p-4 sm:p-5 bg-[#151D28] border border-[#212D3B] rounded-xl gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded border border-[#CBD5E1] shrink-0">
            <span className="w-2.5 h-2.5 bg-[#CBD5E1] rounded-full" style={{ maskImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'currentColor\'%3E%3Cpath d=\'M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.41l9 9c.36.36.86.59 1.41.59s1.05-.23 1.41-.59l7-7c.36-.36.59-.86.59-1.41s-.23-1.05-.59-1.41zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z\'/%3E%3C/svg%3E")', WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'currentColor\'%3E%3Cpath d=\'M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.41l9 9c.36.36.86.59 1.41.59s1.05-.23 1.41-.59l7-7c.36-.36.59-.86.59-1.41s-.23-1.05-.59-1.41zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z\'/%3E%3C/svg%3E")' }}></span>
          </div>
          <div className="flex flex-col">
            <h3 className="font-sans font-bold text-sm text-white">Update Category</h3>
            <p className="font-sans text-[11px] text-[#94A3B8]">Update the enquiry category if required.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setCategory("Hot")}
            className={`flex items-center justify-between py-2.5 px-3 sm:px-4 gap-1 sm:gap-2 rounded-lg border transition-colors ${
              category === "Hot" 
                ? "bg-red-950/40 border-red-500/80 shadow-[0_1px_3px_rgba(0,0,0,0.1)]" 
                : "bg-[#0D131A] border-[#212D3B] hover:border-[#94A3B8]/50"
            }`}
          >
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <Fire size={14} weight={category === "Hot" ? "fill" : "regular"} className="text-red-400 shrink-0" />
              <span className={`font-sans font-semibold text-xs truncate ${category === "Hot" ? "text-red-400" : "text-[#CBD5E1]"}`}>Hot</span>
            </div>
            {category === "Hot" && (
              <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center shrink-0">
                <span className="w-2.5 h-2.5 border-2 border-white rounded-full"></span>
              </div>
            )}
          </button>
          
          <button 
            onClick={() => setCategory("Warm")}
            className={`flex items-center justify-between py-2.5 px-3 sm:px-4 gap-1 sm:gap-2 rounded-lg border transition-colors ${
              category === "Warm" 
                ? "bg-amber-950/40 border-amber-500/80 shadow-[0_1px_3px_rgba(0,0,0,0.1)]" 
                : "bg-[#0D131A] border-[#212D3B] hover:border-[#94A3B8]/50"
            }`}
          >
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <User size={14} weight={category === "Warm" ? "fill" : "regular"} className="text-amber-400 shrink-0" />
              <span className={`font-sans font-medium text-xs truncate ${category === "Warm" ? "text-amber-400" : "text-[#CBD5E1]"}`}>Warm</span>
            </div>
            {category === "Warm" && (
              <div className="w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center shrink-0">
                <span className="w-2.5 h-2.5 border-2 border-white rounded-full"></span>
              </div>
            )}
          </button>
          
          <button 
            onClick={() => setCategory("Cold")}
            className={`flex items-center justify-between py-2.5 px-3 sm:px-4 gap-1 sm:gap-2 rounded-lg border transition-colors ${
              category === "Cold" 
                ? "bg-sky-950/40 border-sky-500/80 shadow-[0_1px_3px_rgba(0,0,0,0.1)]" 
                : "bg-[#0D131A] border-[#212D3B] hover:border-[#94A3B8]/50"
            }`}
          >
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <Snowflake size={14} weight={category === "Cold" ? "fill" : "regular"} className="text-sky-400 shrink-0" />
              <span className={`font-sans font-medium text-xs truncate ${category === "Cold" ? "text-sky-400" : "text-[#CBD5E1]"}`}>Cold</span>
            </div>
            {category === "Cold" && (
              <div className="w-4 h-4 bg-sky-500 rounded-full flex items-center justify-center shrink-0">
                <span className="w-2.5 h-2.5 border-2 border-white rounded-full"></span>
              </div>
            )}
          </button>

          <button 
            onClick={() => setCategory("Other")}
            className={`flex items-center justify-between py-2.5 px-3 sm:px-4 gap-1 sm:gap-2 rounded-lg border transition-colors ${
              category === "Other" 
                ? "bg-slate-800/40 border-slate-500/80 shadow-[0_1px_3px_rgba(0,0,0,0.1)]" 
                : "bg-[#0D131A] border-[#212D3B] hover:border-[#94A3B8]/50"
            }`}
          >
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <DotsThree size={14} weight="bold" className="text-slate-400 shrink-0" />
              <span className={`font-sans font-medium text-xs truncate ${category === "Other" ? "text-slate-300" : "text-[#CBD5E1]"}`}>Other</span>
            </div>
            {category === "Other" && (
              <div className="w-4 h-4 bg-slate-500 rounded-full flex items-center justify-center shrink-0">
                <span className="w-2.5 h-2.5 border-2 border-white rounded-full"></span>
              </div>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col p-4 sm:p-5 bg-[#151D28] border border-[#212D3B] rounded-xl gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 rounded border border-[#CBD5E1] shrink-0">
            <Clock size={14} className="text-[#CBD5E1]" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-sans font-bold text-sm text-white">Status</h3>
            <p className="font-sans text-[11px] text-[#94A3B8]">Update the current status.</p>
          </div>
        </div>

        <div className="flex items-center justify-between px-3 py-2.5 bg-[#0D131A] border border-[#212D3B] rounded-lg cursor-pointer">
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-amber-400" />
            <span className="font-sans font-medium text-xs text-[#E2E8F0]">Follow-up</span>
          </div>
          <CaretDown size={14} className="text-[#94A3B8]" />
        </div>
      </div>

      <div className="flex flex-col p-4 sm:p-5 bg-[#151D28] border border-[#212D3B] rounded-xl gap-4 flex-1">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 bg-slate-600/80 rounded-full shrink-0">
            <Info size={14} weight="bold" className="text-white" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-sans font-bold text-sm text-white">Enquiry Information</h3>
            <p className="font-sans text-[11px] text-[#94A3B8]">Quick details for reference.</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="font-sans text-[11px] text-[#94A3B8]">Source</span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-fuchsia-900/40 border border-fuchsia-800/40 rounded">
              <InstagramLogo size={12} className="text-fuchsia-400" />
              <span className="font-sans font-semibold text-[11px] text-fuchsia-300">Instagram</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="font-sans text-[11px] text-[#94A3B8]">Added via</span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-900/40 border border-emerald-800/40 rounded">
              <ShareNetwork size={12} className="text-emerald-400" />
              <span className="font-sans font-semibold text-[11px] text-emerald-300">Social Media</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-sans text-[11px] text-[#94A3B8]">Interested in</span>
            <div className="flex items-center gap-1.5">
              <Barbell size={12} className="text-emerald-400" />
              <span className="font-sans font-semibold text-[11px] text-emerald-400">Gym Membership</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-sans text-[11px] text-[#94A3B8]">Preferred plan</span>
            <div className="flex items-center gap-1.5">
              <Crown size={12} className="text-amber-400" />
              <span className="font-sans font-semibold text-[11px] text-amber-200">Gold Plan</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
