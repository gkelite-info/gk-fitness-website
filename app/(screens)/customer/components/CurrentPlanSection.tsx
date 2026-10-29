"use client";

import { Crown, CheckCircle, XCircle, CaretRight } from "@phosphor-icons/react";
import { parseDurationMonths } from "@/lib/helpers/gymCustomerMembershipPlans/membershipPaymentLogic";
import { calculatePlanStats } from "@/lib/planCalculations";

export interface CurrentCustomerPlan {
  planId?: string;
  startDate?: string | null;
  endDate?: string | null;
  is_Active?: boolean;
  isActive?: boolean;
  customAmount?: number | null;
  pendingPlanId?: string | null;
  pendingAmount?: number | string | null;
  pendingPlan?: { planName?: string };
  plan?: {
    planId?: string;
    planName?: string;
    price?: number;
    durationMonths?: string | number | null;
  };
  durationMonths?: string | number | null;
  price?: number;
}

interface CurrentPlanSectionProps {
  currentPlan: CurrentCustomerPlan | null | undefined;
  isLoading: boolean;
  onRenew: (planId: string, planName: string, amount?: number) => void;
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

  const numericAmount = Number(currentPlan.plan?.price ?? currentPlan.customAmount ?? currentPlan.price ?? 0);
  const currentPlanMonths = parseDurationMonths(currentPlan.plan?.durationMonths || currentPlan.durationMonths || 1);
  const planAmount = numericAmount > 0 ? `₹${numericAmount}` : (currentPlan.plan?.price ? `₹${currentPlan.plan.price}` : "₹0");

  const stats = calculatePlanStats({
    planPrice: numericAmount,
    durationMonths: currentPlanMonths,
    startDate: currentPlan.startDate,
    endDate: currentPlan.endDate,
    isActive: Boolean(currentPlan.is_Active ?? currentPlan.isActive),
  });

  const remainingDays = stats.standardRemainingDays;
  const isPendingActivation =
    !currentPlan.startDate ||
    !currentPlan.endDate ||
  (!Boolean(currentPlan.is_Active ?? currentPlan.isActive) && !currentPlan.endDate) ||
    (currentPlan as any).status === "pending";
  const isExpired = !isPendingActivation && (stats.isExpired || remainingDays === 0);
  const isActive = !isPendingActivation && stats.isPlanActive && (currentPlan as any).status !== "pending";
  const statusLabel = isPendingActivation ? "Pending Activation" : isExpired ? "Expired" : (isActive ? "Active" : "Inactive");
  const statusColor = isPendingActivation ? "#F59E0B" : isExpired ? "#EF4444" : (isActive ? "#D7FF00" : "#8E8E93");
  const planName = currentPlan.plan?.planName || "Membership Plan";
  const currentDailyRate = stats.dailyRate;
  const unusedCredit = stats.unusedCredit;

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
        {isPendingActivation ? "ASSIGNED MEMBERSHIP PLAN" : "YOUR CURRENT PLAN"}
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
              <span className="text-[#8E8E93] text-xs ml-1">
                {currentPlanMonths > 1 ? `/ ${currentPlanMonths} Months` : "/ Month"}
              </span>
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

        {isActive && unusedCredit > 0 && (
          <div className="mt-3 pt-3 border-t border-[#27272A] flex items-center justify-between text-xs">
            <span className="text-[#8E8E93]">
              Daily Rate: <span className="text-white font-medium">₹{currentDailyRate}/day</span> ({remainingDays} days left)
            </span>
            <span className="text-[#D7FF00] font-semibold">
              Unused Credit: ₹{unusedCredit}
            </span>
          </div>
        )}

        {currentPlan?.pendingPlanId && (
          <div className="mt-4 pt-3.5 border-t border-[#27272A] bg-[#221B13] border border-[#5E4218] rounded-2xl p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[#F59E0B] text-[10px] font-bold tracking-widest uppercase">
                UPGRADE PENDING
              </span>
              {currentPlan.pendingAmount !== undefined && currentPlan.pendingAmount !== null && (
                <span className="text-[#D7FF00] font-extrabold text-sm">
                  ₹{Number(currentPlan.pendingAmount)}
                </span>
              )}
            </div>
            <h4 className="text-white text-sm font-bold">
              {currentPlan.pendingPlan?.planName || "New Plan"}
            </h4>
            <p className="text-gray-400 text-[11px] mt-0.5">
              Your gym owner initiated an upgrade. Complete payment below to activate your new tier!
            </p>
            <button
              onClick={() => onRenew(currentPlan.pendingPlanId!, currentPlan.pendingPlan?.planName || "Upgraded Plan")}
              disabled={isRenewingThis}
              className="w-full bg-[#D7FF00] hover:bg-[#cbf200] text-black font-bold text-xs py-3 px-4 rounded-xl mt-3 flex items-center justify-center transition-all active:scale-[0.99] cursor-pointer"
            >
              <span className="mr-1 uppercase tracking-wider">
                COMPLETE UPGRADE PAYMENT {currentPlan.pendingAmount !== undefined && currentPlan.pendingAmount !== null ? `(₹${Number(currentPlan.pendingAmount)})` : ""}
              </span>
              <CaretRight size={14} color="#000000" weight="bold" />
            </button>
          </div>
        )}

        {(!isActive || isExpired || isPendingActivation) && (
          <button
            onClick={() => onRenew(targetPlanId!, planName)}
            disabled={isRenewingThis || !targetPlanId}
            className="w-full bg-[#D7FF00] hover:bg-[#cbf200] py-3.5 px-5 rounded-2xl flex items-center justify-center mt-4 transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
          >
            {isRenewingThis ? (
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span className="text-black text-xs font-bold tracking-wider mr-1 uppercase">
                  {isPendingActivation ? "ACTIVATE MEMBERSHIP NOW" : "RENEW PLAN"}
                </span>
                <CaretRight size={15} color="#000000" weight="bold" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
