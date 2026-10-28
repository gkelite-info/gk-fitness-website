"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { X, Lock, Receipt } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import { getAvailablePlans } from "@/app/actions/customer/getAvailablePlans";
import { changeCustomerPlan } from "@/app/actions/owner/changeCustomerPlan";
import { parseDurationMonths, computeUpgradeCalculation } from "@/lib/helpers/gymCustomerMembershipPlans/membershipPaymentLogic";
import { calculatePlanStats } from "@/lib/planCalculations";
import { UpgradeSummaryBox } from "./UpgradeSummaryBox";
import { PlanSelectionGrid, type PlanOption } from "./PlanSelectionGrid";

interface CurrentChangePlan {
  planId?: string;
  pendingPlanId?: string | null;
  pendingPlanName?: string | null;
  pendingAmount?: number | null;
  pendingPlan?: { planName?: string };
  planName?: string;
  price?: number;
  durationMonths?: string | number;
  startDate?: string | null;
  endDate?: string | null;
  is_Active?: boolean;
  isActive?: boolean;
  customAmount?: number | null;
  plan?: {
    planId?: string;
    planName?: string;
    price?: number;
    durationMonths?: string | number | null;
  };
}

interface ChangePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerId: string;
  customerName: string;
  gymId: string;
  currentPlan?: CurrentChangePlan | null;
  onSuccess?: () => void;
}

export default function ChangePlanModal({
  isOpen, onClose, customerId, customerName, gymId, currentPlan, onSuccess,
}: ChangePlanModalProps) {
  const [plans, setPlans] = useState<PlanOption[]>([]);
  const [isLoadingPlans, setIsLoadingPlans] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    if (isOpen && gymId) {
      getAvailablePlans(gymId)
        .then((data: PlanOption[] | null) => {
          if (isSubscribed) {
            setPlans(data || []);
            setIsLoadingPlans(false);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch gym plans:", err);
          toast.error("Could not load membership plans");
          if (isSubscribed) setIsLoadingPlans(false);
        });
    }
    return () => {
      isSubscribed = false;
    };
  }, [isOpen, gymId]);

  const currentPlanPrice = Number(currentPlan?.plan?.price ?? currentPlan?.customAmount ?? currentPlan?.price ?? 0);
  const currentPlanMonths = parseDurationMonths(currentPlan?.plan?.durationMonths || currentPlan?.durationMonths || 1);

  const stats = useMemo(() => {
    return calculatePlanStats({
      planPrice: currentPlanPrice,
      durationMonths: currentPlanMonths,
      startDate: currentPlan?.startDate,
      endDate: currentPlan?.endDate,
      isActive: (currentPlan?.is_Active ?? currentPlan?.isActive) !== false,
    });
  }, [
    currentPlanPrice,
    currentPlanMonths,
    currentPlan?.startDate,
    currentPlan?.endDate,
    currentPlan?.is_Active,
    currentPlan?.isActive,
  ]);

  const remainingDays = stats.standardRemainingDays;
  const isCurrentPlanActive = stats.isPlanActive;
  const currentUnusedCredit = stats.unusedCredit;

  const hasPendingUpgrade = Boolean(currentPlan?.pendingPlanId);
  const pendingPlanName =
    currentPlan?.pendingPlanName ||
    currentPlan?.pendingPlan?.planName ||
    plans.find((p) => p.planId === currentPlan?.pendingPlanId)?.planName ||
    "New Plan";

  const selectedPlan = useMemo(() => {
    if (hasPendingUpgrade) return null;
    return plans.find((p) => p.planId === selectedPlanId) || null;
  }, [plans, selectedPlanId, hasPendingUpgrade]);

  const calculation = useMemo(() => {
    if (!selectedPlan) return null;
    return computeUpgradeCalculation(currentPlan, selectedPlan);
  }, [currentPlan, selectedPlan]);

  const handleConfirm = async () => {
    if (hasPendingUpgrade) return toast.error("An upgrade is already pending. Revoke it before selecting another plan");
    if (!selectedPlanId) return toast.error("Please select a new membership plan");
    if (selectedPlanId === currentPlan?.planId && isCurrentPlanActive) {
      return toast.error("Cannot select member's current active plan");
    }
    if (isCurrentPlanActive && selectedPlan && Number(selectedPlan.price) < currentPlanPrice) {
      return toast.error("Plan downgrade is not permitted. Only higher-priced plans can be selected.");
    }
    try {
      setIsSubmitting(true);
      const res = await changeCustomerPlan({
        customerId, gymId, newPlanId: selectedPlanId,
        notes: `Plan changed to ${selectedPlan?.planName} by owner`,
      });
      if (!res.success) return toast.error(res.error || "Failed to update membership plan");
      toast.success(isCurrentPlanActive ? `Pending upgrade set to ${res.planName}. Active access remains undisturbed!` : `Membership plan updated to ${res.planName}!`);
      onSuccess?.();
      onClose();
    } catch {
      toast.error("An error occurred while changing the plan");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-[#10141D] border border-[#1F2937] rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-[#1F2937]">
          <div>
            <h2 className="text-white text-lg font-bold tracking-tight">Upgrade Membership Plan</h2>
            <p className="text-[#9CA3AF] text-xs mt-0.5">
              Updating plan for <span className="text-[#D2F829] font-medium">{customerName}</span>
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#18202F] flex items-center justify-center text-[#9CA3AF] hover:text-white transition-colors cursor-pointer">
            <X size={16} weight="bold" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5 custom-scrollbar">
          {currentPlan && (
            <div className="bg-[#151B26] border border-[#232F42] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[#9CA3AF] text-[10px] uppercase font-bold tracking-wider block mb-0.5">Current Plan</span>
                <h4 className="text-white text-sm font-bold">{currentPlan.planName || "Active Plan"}</h4>
                <div className="flex items-center gap-2 mt-1 text-xs text-[#9CA3AF]">
                  <span>₹{currentPlanPrice}</span>
                  <span>•</span>
                  <span>{currentPlanMonths ? `${currentPlanMonths} Mo` : "-"}</span>
                  <span>•</span>
                  <span>{isCurrentPlanActive ? `${remainingDays} days remaining` : "Expired / Inactive"}</span>
                </div>
              </div>
              {isCurrentPlanActive && currentUnusedCredit > 0 && (
                <div className="bg-[#1C2618] border border-[#2F471B] px-3 py-1.5 rounded-xl self-start sm:self-auto">
                  <span className="text-[10px] text-[#A3E635] block font-medium">Unused Credit</span>
                  <span className="text-sm font-extrabold text-[#D2F829]">₹{currentUnusedCredit}</span>
                </div>
              )}
            </div>
          )}

          {hasPendingUpgrade && (
            <div className="bg-[#2A1E14] border border-[#593817] rounded-2xl p-4 flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5 text-amber-400">
                <Lock size={16} weight="bold" />
              </div>
              <div>
                <h4 className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                  Upgrade Pending ({pendingPlanName})
                </h4>
                <p className="text-[#D1D5DB] text-xs mt-1 leading-relaxed">
                  An upgrade to <span className="font-semibold text-white">{pendingPlanName}</span> is already awaiting payment. You cannot select another plan until this pending upgrade is completed or revoked.
                </p>
              </div>
            </div>
          )}

          <div>
            <div className="flex items-baseline justify-between mb-2">
              <label className="text-white text-xs font-bold uppercase tracking-wider block">
                {hasPendingUpgrade ? "Plan Selection Locked" : "Select New Plan"}
              </label>
              <span className="text-[10px] text-[#9CA3AF]">
                {hasPendingUpgrade ? "Revoke Required" : isCurrentPlanActive ? "Only higher-priced plans allowed" : ""}
              </span>
            </div>
            <PlanSelectionGrid
              plans={plans}
              selectedPlanId={selectedPlanId}
              onSelectPlan={setSelectedPlanId}
              isCurrentPlanActive={isCurrentPlanActive}
              currentPlanId={currentPlan?.planId}
              currentPlanPrice={currentPlanPrice}
              hasPendingUpgrade={hasPendingUpgrade}
              pendingPlanId={currentPlan?.pendingPlanId}
              isLoadingPlans={isLoadingPlans}
            />
          </div>

          <UpgradeSummaryBox calculation={calculation} />
        </div>

        <div className="p-4 sm:p-5 border-t border-[#1F2937] bg-[#10141D] flex flex-col sm:flex-row gap-2.5 items-center justify-between">
          <Link
            href={`/owner/payments/create?customerId=${customerId}`}
            onClick={onClose}
            className="text-xs text-[#D2F829] hover:underline flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <Receipt size={14} />
            <span>Record Payment & Receipt</span>
          </Link>
          <div className="flex gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#232F42] text-xs font-bold text-[#9CA3AF] hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!selectedPlanId || isSubmitting || hasPendingUpgrade}
              onClick={handleConfirm}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#D2F829] hover:bg-[#c3e620] text-black text-xs font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <span>{hasPendingUpgrade ? "Upgrade Already Pending" : "Confirm & Update Plan"}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
