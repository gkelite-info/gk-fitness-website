"use client";

import { Star, QrCode, ArrowRight } from "@phosphor-icons/react";
import { useState } from "react";
import UpgradePlanModal from "./UpgradePlanModal";

interface MembershipCardProps {
  planName: string;
  daysLeft: number;
  progressPercentage: number;
  status: "active" | "expired" | "none";
  gymId: string;
}

export default function MembershipCard({ planName, daysLeft, progressPercentage, status, gymId }: MembershipCardProps) {
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  return (
    <>
      <div className="bg-[#141414] border border-[#222222] rounded-3xl p-5 mb-4 flex flex-row items-center justify-between">
        <div className="flex-1 pr-3">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-full bg-[#D7FF00] flex items-center justify-center">
              <Star size={14} color="#000000" weight="fill" />
            </div>
            <span className="text-[#D7FF00] text-xs font-semibold tracking-wider">
              {planName}
            </span>
          </div>

          {status === "active" ? (
            <>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-white text-4xl font-semibold">{daysLeft}</span>
                <span className="text-[#8E8E93] text-sm font-medium">Days Left</span>
              </div>

              <div className="w-full h-1.5 bg-[#262626] rounded-full overflow-hidden mb-4">
                <div 
                  className="h-full bg-[#D7FF00] rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${progressPercentage}%` }} 
                />
              </div>
              
              <button 
                onClick={() => setIsUpgradeModalOpen(true)}
                className="flex items-center gap-1.5 text-[#8E8E93] hover:text-white transition-colors"
              >
                <span className="text-xs font-medium">Upgrade Plan</span>
                <ArrowRight size={12} weight="bold" />
              </button>
            </>
          ) : (
            <div className="mb-1">
              <h3 className="text-[#EF4444] text-xl font-semibold mb-1">
                {status === "expired" ? "Plan Expired" : "No Active Plan"}
              </h3>
              <p className="text-[#8E8E93] text-xs font-medium mb-4">
                {status === "expired" 
                  ? "Renew your plan to continue your journey." 
                  : "Get a membership plan to unlock all features."}
              </p>
              
              <button 
                onClick={() => setIsUpgradeModalOpen(true)}
                className="bg-[#D7FF00] py-2.5 px-5 rounded-xl self-start active:opacity-80 transition-opacity flex items-center justify-center"
              >
                <span className="text-black text-xs font-bold tracking-wide">
                  {status === "expired" ? "RENEW PLAN" : "GET A PLAN"}
                </span>
              </button>
            </div>
          )}
        </div>

        {status === "active" && (
          <>
            <div className="w-[1px] h-20 bg-[#262626] mx-2" />

            <a 
              href="gk-fitness://checkin"
              className="flex flex-col items-center justify-center pl-2 active:opacity-80 hover:opacity-90 transition-opacity cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center mb-1">
                <QrCode size={26} color="#D7FF00" />
              </div>
              <span className="text-white text-[11px] font-semibold text-center">Check-in</span>
              <span className="text-[#8E8E93] text-[10px] text-center">(QR)</span>
            </a>
          </>
        )}
      </div>
      
      {isUpgradeModalOpen && (
        <UpgradePlanModal 
          gymId={gymId} 
          onClose={() => setIsUpgradeModalOpen(false)} 
        />
      )}
    </>
  );
}
