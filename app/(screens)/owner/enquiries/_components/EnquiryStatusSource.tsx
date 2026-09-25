import { getCategoryBadge, getStatusBadge, getAddedViaBadge, getSourceBadge } from "./EnquiryBadges";
import { ChartBar } from "@phosphor-icons/react";

export default function EnquiryStatusSource() {
  return (
    <div className="flex flex-col p-5 bg-[#141B24] border border-[#202938] rounded-2xl gap-4">
      <div className="flex items-center gap-2 pb-3 border-b border-[#1E2634]">
        <div className="flex items-center justify-center w-7 h-7 bg-purple-500/10 rounded-lg">
          <ChartBar size={16} weight="bold" className="text-purple-400" />
        </div>
        <h3 className="font-sans font-bold text-[13px] text-white tracking-wide uppercase">Status & Source</h3>
      </div>
      
      <div className="flex flex-col">
        <div className="flex items-center justify-between py-2 border-b border-[#1C2430]">
          <span className="font-sans font-medium text-xs text-[#9CA3AF]">Current Category</span>
          {getCategoryBadge("Warm")}
        </div>
        <div className="flex items-center justify-between py-2 border-b border-[#1C2430]">
          <span className="font-sans font-medium text-xs text-[#9CA3AF]">Current Status</span>
          {getStatusBadge("Follow-up")}
        </div>
        <div className="flex items-center justify-between py-2 border-b border-[#1C2430]">
          <span className="font-sans font-medium text-xs text-[#9CA3AF]">Added Via</span>
          {getAddedViaBadge("Social Media")}
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="font-sans font-medium text-xs text-[#9CA3AF]">Source</span>
          {getSourceBadge("Instagram")}
        </div>
      </div>
    </div>
  );
}
