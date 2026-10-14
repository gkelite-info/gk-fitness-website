"use client";

import { Crown, CheckCircle, XCircle, CaretRight } from "@phosphor-icons/react";

interface CurrentPlanSectionProps {
  currentPlan: any;
  isLoading: boolean;
  onRenew: (planId: string, planName: string) => void;
  renewingPlanId: string | null;
}

export default function CurrentPlanSection({
  currentPlan,
  isLoading,
  onRenew,
  renewingPlanId,
}: CurrentPlanSectionProps) {
  if (isLoading) {
    return (
      <div className="mb-6">
        <span className="text-[#8E8E93] text-[10px] font-bold tracking-widest uppercase block mb-3">
          YOUR CURRENT PLAN
        </span>
        <div className="bg-[#1C1C1E] rounded-3xl p-6 border border-[#27272A] flex justify-center items-center h-32">
          <div className="w-7 h-7 border-2 border-[#D7FF00] border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!currentPlan) {
    return (
      <div className="mb-6">
        <span className="text-[#8E8E93] text-[10px] font-bold tracking-widest uppercase block mb-3">
          YOUR CURRENT PLAN
        </span>
        <div className="bg-[#1C1C1E] rounded-3xl p-5 border border-[#27272A] text-center">
          <p className="text-[#8E8E93] text-xs">No active or previous membership plan found.</p>
        </div>
      </div>
    );
  }

  const isExpired = currentPlan.endDate ? new Date(currentPlan.endDate).getTime() < Date.now() : false;
  const isActive = Boolean(currentPlan.is_Active ?? currentPlan.isActive);
  const statusLabel = isExpired ? "Expired" : (isActive ? "Active" : "Inactive");
  const statusColor = isExpired ? "#EF4444" : (isActive ? "#D7FF00" : "#8E8E93");
  const planName = currentPlan.plan?.planName || "Membership Plan";
  const planAmount = currentPlan.customAmount
    ? `₹${currentPlan.customAmount}`
    : currentPlan.plan?.price
      ? `₹${currentPlan.plan.price}`
      : "₹0";

  const targetPlanId = currentPlan.planId || currentPlan.plan?.planId;
  const isRenewingThis = renewingPlanId === targetPlanId;

  const formattedEndDate = currentPlan.endDate
    ? new Date(currentPlan.endDate).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    : null;

  return (
    <div className="mb-6">
      <span className="text-[#8E8E93] text-[10px] font-bold tracking-widest uppercase block mb-3">
        YOUR CURRENT PLAN
      </span>
      <div className="bg-[#1C1C1E] rounded-3xl p-5 border border-[#27272A]">
        <div className="flex items-center">
          <div className="w-14 h-14 rounded-2xl bg-[#EAB308] flex items-center justify-center mr-4 shrink-0 shadow-lg">
            <Crown size={28} color="#FFFFFF" weight="regular" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white text-lg font-semibold truncate mb-0.5">{planName}</h3>
            <div className="flex items-baseline mb-1.5">
              <span className="text-white text-base font-semibold">{planAmount}</span>
              <span className="text-[#8E8E93] text-xs ml-1">/ Month</span>
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <div className="flex items-center">
                {isExpired || !isActive ? (
                  <XCircle size={14} color={statusColor} weight="fill" />
                ) : (
                  <CheckCircle size={14} color={statusColor} weight="fill" />
                )}
                <span style={{ color: statusColor }} className="text-xs font-semibold ml-1.5">
                  {statusLabel}
                </span>
              </div>
              {formattedEndDate && (
                <span className="text-[#8E8E93] text-[11px]">
                  • {isExpired ? "Expired" : "Expires"} {formattedEndDate}
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={() => onRenew(targetPlanId, planName)}
          disabled={isRenewingThis || !targetPlanId}
          className="w-full bg-[#D7FF00] hover:bg-[#cbf200] py-3.5 px-5 rounded-2xl flex items-center justify-center mt-4 transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
        >
          {isRenewingThis ? (
            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span className="text-black text-xs font-bold tracking-wider mr-1 uppercase">
                RENEW PLAN
              </span>
              <CaretRight size={15} color="#000000" weight="bold" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
