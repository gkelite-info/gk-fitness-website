"use client";

import { Star, QrCode, ArrowRight } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import UpgradePlanModal from "./UpgradePlanModal";

interface MembershipCardProps {
  planName: string;
  daysLeft: number;
  progressPercentage: number;
  status: "active" | "expired" | "none" | "pending_activation";
  gymId: string;
  customerId?: string;
  planId?: string;
  pendingPlanId?: string;
  pendingPlanName?: string;
  pendingAmount?: number;
}

export default function MembershipCard({
  planName,
  daysLeft,
  progressPercentage,
  status,
  gymId,
  customerId,
  planId,
  pendingPlanId,
  pendingPlanName,
  pendingAmount,
}: MembershipCardProps) {
  const searchParams = useSearchParams();
  const actionParam = searchParams.get("action");
  const planIdParam = searchParams.get("planId");

  const hasUrlAction = Boolean(
  actionParam === "renew" || actionParam === "subscribe" || actionParam === "activate" || planIdParam
  );

  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(hasUrlAction);

  useEffect(() => {
  if (hasUrlAction) {
    const timer = setTimeout(() => {
      setIsUpgradeModalOpen(true);
    }, 0);
    return () => clearTimeout(timer);
  }
}, [hasUrlAction]);

const handleOpenModal = () => {
  setIsUpgradeModalOpen(true);
  if (typeof window !== "undefined") {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("action", status === "pending_activation" ? "activate" : "renew");
    const targetPlanId = planId || planIdParam;
    if (targetPlanId) currentUrl.searchParams.set("planId", targetPlanId);
    window.history.replaceState(null, "", currentUrl.toString());
  }
};

const handleCloseModal = () => {
  setIsUpgradeModalOpen(false);
  if (typeof window !== "undefined") {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.delete("action");
    currentUrl.searchParams.delete("planId");
    window.history.replaceState(null, "", currentUrl.toString());
  }
};

  return (
  <>
          <div className="bg-[#141414] border border-[#222222] rounded-3xl p-5 sm:p-6 flex flex-col justify-between h-full shadow-lg">
            <div>
              <div className="flex items-center justify-between gap-3 mb-3.5">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-full bg-[#D7FF00] flex items-center justify-center shrink-0">
                    <Star size={14} color="#000000" weight="fill" />
                  </div>
                  <span className="text-[#D7FF00] text-xs font-semibold tracking-wider uppercase truncate">
                    {planName}
                  </span>
                </div>

                {status === "active" ? (
                  <a
                    href="gk-fitness://checkin"
                    className="flex items-center gap-1.5 bg-[#1C1C1E] hover:bg-[#252528] active:scale-95 border border-[#2A2A2A] hover:border-[#D7FF00]/40 px-2.5 py-1 rounded-xl transition-all shrink-0 cursor-pointer"
                    title="Scan QR to Check In"
                  >
                    <QrCode size={16} color="#D7FF00" weight="bold" />
                    <span className="text-white text-[11px] font-semibold">Check-in</span>
                    <span className="text-[#8E8E93] text-[10px] hidden sm:inline">(QR)</span>
                  </a>
                ) : (
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide border shrink-0 ${status === "pending_activation"
                    ? "bg-[#FF9F0A]/15 border-[#FF9F0A]/30 text-[#FF9F0A]"
                    : status === "expired"
                      ? "bg-[#EF4444]/15 border-[#EF4444]/30 text-[#EF4444]"
                      : "bg-[#8E8E93]/15 border-[#8E8E93]/30 text-[#8E8E93]"
                    }`}>
                    {status === "pending_activation" ? "Pending Activation" : status === "expired" ? "Expired" : "No Plan"}
                  </span>
                )}
              </div>

              {status === "active" ? (
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-white text-3xl sm:text-4xl font-semibold tracking-tight">{daysLeft}</span>
                      <span className="text-[#8E8E93] text-sm font-medium">Days Left</span>
                    </div>
                    {!pendingPlanId && (
                      <button
                        onClick={handleOpenModal}
                        className="flex items-center gap-1 text-[#8E8E93] hover:text-[#D7FF00] transition-colors text-xs font-medium cursor-pointer"
                      >
                        <span>Upgrade Plan</span>
                        <ArrowRight size={12} weight="bold" />
                      </button>
                    )}
                  </div>

                      <div className="w-full h-1.5 bg-[#262626] rounded-full overflow-hidden mb-3">
                        <div
                          className="h-full bg-[#D7FF00] rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${Math.min(100, Math.max(0, progressPercentage))}%` }}
                        />
                      </div>

                      {pendingPlanId && (
                        <div className="mt-3 bg-[#1C160C] border border-[#F59E0B]/30 rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
                          <div className="min-w-0">
                            <span className="text-[#F59E0B] text-[10px] font-bold tracking-widest uppercase block">
                              Upgrade Pending
                            </span>
                            <span className="text-white text-xs font-semibold truncate block">
                              {pendingPlanName || "New Plan"}
                            </span>
                          </div>

                  <button
                    onClick={handleOpenModal}
                    className="w-full sm:w-auto bg-[#D7FF00] hover:bg-[#cbf200] active:scale-[0.98] text-black text-xs font-bold py-2 px-3.5 rounded-xl flex items-center justify-center gap-1.5 transition-all shrink-0 cursor-pointer whitespace-nowrap"
                  >
                    <span>Pay Upgrade</span>
                    {pendingAmount !== undefined && pendingAmount !== null && (
                      <span className="font-extrabold">
                        (₹{pendingAmount})
                      </span>
                    )}
                    <ArrowRight size={12} weight="bold" />
                  </button>
                </div>
                      )}
                    </div>
                  ) : (
                  <div className="mb-1">
                    <h3 className={`text-lg font-semibold mb-1 ${status === "pending_activation"
                      ? "text-[#FF9F0A]"
                      : status === "expired"
                        ? "text-[#EF4444]"
                        : "text-white"
                      }`}>
                      {status === "pending_activation"
                        ? "Pending Activation"
                        : status === "expired"
                          ? "Plan Expired"
                          : "No Active Plan"}
                    </h3>
                    <p className="text-[#8E8E93] text-xs font-medium mb-3">
                      {status === "pending_activation"
                        ? "Complete your payment to activate your gym membership."
                        : status === "expired"
                          ? "Renew your plan to continue your journey."
                          : "Get a membership plan to unlock all features."}
                    </p>

                  <button
                    onClick={handleOpenModal}
                    className="w-full sm:w-auto bg-[#D7FF00] hover:bg-[#cbf200] active:scale-[0.98] py-2.5 px-5 rounded-xl flex items-center justify-center gap-1.5 transition-all cursor-pointer font-bold text-black text-xs tracking-wide self-start"
                  >
                    <span>
                      {status === "pending_activation"
                        ? (pendingAmount ? `ACTIVATE MEMBERSHIP (₹${pendingAmount})` : "ACTIVATE MEMBERSHIP")
                        : status === "expired"
                          ? "RENEW PLAN"
                          : "GET A PLAN"}
                    </span>
                    <ArrowRight size={12} weight="bold" />
                  </button>
                </div>
              )}
        </div>
      </div>

    {isUpgradeModalOpen && (
      <UpgradePlanModal
        gymId={gymId}
        customerId={customerId}
        planId={planId || planIdParam || undefined}
        isActivation={status === "pending_activation" || actionParam === "activate"}
        onClose={handleCloseModal}
      />
    )}
  </>
);
}
