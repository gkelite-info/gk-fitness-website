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
import Dropdown from "@/app/(screens)/components/reusable/Dropdown";

interface AddFollowUpRightColumnProps {
  enquiry: any;
  category: string;
  setCategory: (val: string) => void;
  status: string;
  setStatus: (val: string) => void;
}

export default function AddFollowUpRightColumn({
  enquiry,
  category,
  setCategory,
  status,
  setStatus
}: AddFollowUpRightColumnProps) {

  const statusOptions = [
    { label: "New", value: "new" },
    { label: "Follow-up", value: "followup" },
    { label: "Converted", value: "converted" },
    { label: "Not Interested", value: "notinterested" },
  ];

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
            onClick={() => setCategory("hot")}
            className={`flex items-center justify-between py-2.5 px-3 sm:px-4 gap-1 sm:gap-2 rounded-lg border transition-colors ${
              category === "hot" 
                ? "bg-red-950/40 border-red-500/80 shadow-[0_1px_3px_rgba(0,0,0,0.1)]" 
                : "bg-[#0D131A] border-[#212D3B] hover:border-[#94A3B8]/50"
            }`}
          >
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <Fire size={14} weight={category === "hot" ? "fill" : "regular"} className="text-red-400 shrink-0" />
              <span className={`font-sans font-semibold text-xs truncate ${category === "hot" ? "text-red-400" : "text-[#CBD5E1]"}`}>Hot</span>
            </div>
            {category === "hot" && (
              <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center shrink-0">
                <span className="w-2.5 h-2.5 border-2 border-white rounded-full"></span>
              </div>
            )}
          </button>
          
          <button 
            onClick={() => setCategory("warm")}
            className={`flex items-center justify-between py-2.5 px-3 sm:px-4 gap-1 sm:gap-2 rounded-lg border transition-colors ${
              category === "warm" 
                ? "bg-amber-950/40 border-amber-500/80 shadow-[0_1px_3px_rgba(0,0,0,0.1)]" 
                : "bg-[#0D131A] border-[#212D3B] hover:border-[#94A3B8]/50"
            }`}
          >
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <User size={14} weight={category === "warm" ? "fill" : "regular"} className="text-amber-400 shrink-0" />
              <span className={`font-sans font-medium text-xs truncate ${category === "warm" ? "text-amber-400" : "text-[#CBD5E1]"}`}>Warm</span>
            </div>
            {category === "warm" && (
              <div className="w-4 h-4 bg-amber-500 rounded-full flex items-center justify-center shrink-0">
                <span className="w-2.5 h-2.5 border-2 border-white rounded-full"></span>
              </div>
            )}
          </button>
          
          <button 
            onClick={() => setCategory("cold")}
            className={`flex items-center justify-between py-2.5 px-3 sm:px-4 gap-1 sm:gap-2 rounded-lg border transition-colors ${
              category === "cold" 
                ? "bg-sky-950/40 border-sky-500/80 shadow-[0_1px_3px_rgba(0,0,0,0.1)]" 
                : "bg-[#0D131A] border-[#212D3B] hover:border-[#94A3B8]/50"
            }`}
          >
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <Snowflake size={14} weight={category === "cold" ? "fill" : "regular"} className="text-sky-400 shrink-0" />
              <span className={`font-sans font-medium text-xs truncate ${category === "cold" ? "text-sky-400" : "text-[#CBD5E1]"}`}>Cold</span>
            </div>
            {category === "cold" && (
              <div className="w-4 h-4 bg-sky-500 rounded-full flex items-center justify-center shrink-0">
                <span className="w-2.5 h-2.5 border-2 border-white rounded-full"></span>
              </div>
            )}
          </button>

          <button 
            onClick={() => setCategory("other")}
            className={`flex items-center justify-between py-2.5 px-3 sm:px-4 gap-1 sm:gap-2 rounded-lg border transition-colors ${
              category === "other" 
                ? "bg-slate-800/40 border-slate-500/80 shadow-[0_1px_3px_rgba(0,0,0,0.1)]" 
                : "bg-[#0D131A] border-[#212D3B] hover:border-[#94A3B8]/50"
            }`}
          >
            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <DotsThree size={14} weight="bold" className="text-slate-400 shrink-0" />
              <span className={`font-sans font-medium text-xs truncate ${category === "other" ? "text-slate-300" : "text-[#CBD5E1]"}`}>Other</span>
            </div>
            {category === "other" && (
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

        <Dropdown 
          options={statusOptions}
          value={status}
          onChange={setStatus}
          triggerClassName="flex flex-row items-center justify-between px-3 w-full h-[38px] bg-[#0D131A] border border-[#212D3B] rounded-lg cursor-pointer"
        />
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
              <span className="font-sans font-semibold text-[11px] text-fuchsia-300 capitalize">{enquiry?.enquirySource || 'Unknown'}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="font-sans text-[11px] text-[#94A3B8]">Added via</span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-900/40 border border-emerald-800/40 rounded">
              <span className="font-sans font-semibold text-[11px] text-emerald-300 capitalize">{enquiry?.addedThrough || 'Unknown'}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-sans text-[11px] text-[#94A3B8]">Interested in</span>
            <div className="flex items-center gap-1.5">
              <Barbell size={12} className="text-emerald-400" />
              <span className="font-sans font-semibold text-[11px] text-emerald-400 capitalize">{enquiry?.interestedIn || 'Unknown'}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-sans text-[11px] text-[#94A3B8]">Preferred plan</span>
            <div className="flex items-center gap-1.5">
              <Crown size={12} className="text-amber-400" />
              <span className="font-sans font-semibold text-[11px] text-amber-200">
                {enquiry?.plan ? enquiry.plan.planName : "None"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
