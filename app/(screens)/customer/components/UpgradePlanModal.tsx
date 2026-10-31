"use client";

import { X, Info } from "@phosphor-icons/react";
import { useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { useGymCustomerMembershipPlans } from "@/lib/hooks/gymCustomerMembershipPlans/useGymCustomerMembershipPlans";
import { useIndividualCustomerPlans } from "@/lib/hooks/individual/membership/individualCustomerPlan";
import { useSubscriptions } from "@/lib/hooks/superadmin/subscriptions/subscriptions";
import CurrentPlanSection from "./CurrentPlanSection";
import AvailablePlansSection from "./AvailablePlansSection";
import PaymentRecoveryBanner from "./PaymentRecoveryBanner";
import { usePaymentSession } from "./usePaymentSession";
import { usePlanCheckout } from "./usePlanCheckout";
import { calculateRemainingDays } from "@/lib/helpers/gymCustomerMembershipPlans/membershipPaymentLogic";

interface UpgradePlanModalProps {
  gymId: string;
  customerId?: string;
  planId?: string;
  isActivation?: boolean;
  onClose: () => void;
}

interface Plan {
  planId: string;
  planName: string;
  durationMonths: number;
  price: number;
}

export default function UpgradePlanModal({
  gymId,
  customerId,
  planId,
  isActivation,
  onClose,
}: UpgradePlanModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, profile, roleData, role } = useUser();
  const { data: indivCustomerPlans, refetch: refetchIndivPlans } = useIndividualCustomerPlans(user?.id);

  const hasIndivPlans = Boolean(indivCustomerPlans && indivCustomerPlans.length > 0);
  const isIndividual = role === "individual" || profile?.role === "individual" || hasIndivPlans || !gymId;

  const resolvedCustomerId = isIndividual ? user?.id : (customerId || roleData?.[0]?.customerId || user?.id);
  const resolvedGymId = isIndividual ? undefined : (gymId || roleData?.[0]?.gymId);

  const { data: customerPlans, isLoading: isLoadingCustomerPlans, refetch: refetchCustomerPlans } =
    useGymCustomerMembershipPlans(resolvedGymId, resolvedCustomerId);

  const { data: subscriptionsData, isLoading: isLoadingSubscriptions } = useSubscriptions(undefined, "customer");

  const handleRenewSuccess = useCallback(async () => {
    if (isIndividual) await refetchIndivPlans();
    else await refetchCustomerPlans();
    router.refresh();
    onClose();
  }, [isIndividual, refetchIndivPlans, refetchCustomerPlans, router, onClose]);

  const { activeSession, isChecking, saveSession, clearSession, resumePayment } =
    usePaymentSession(handleRenewSuccess);

  const { renewingPlanId, handleRenew } = usePlanCheckout({
    resolvedCustomerId,
    resolvedGymId,
    customerName: profile?.name || user?.user_metadata?.fullName || user?.email?.split("@")[0] || "",
    customerEmail: user?.email || "",
    customerPhone: user?.phone || (profile as any)?.phone || "",
    saveSession,
    clearSession,
    onSuccess: handleRenewSuccess,
  });

  const allPlans: Plan[] = useMemo(() => {
    if (!subscriptionsData) return [];
    return subscriptionsData
      .filter(
        (sub: any) =>
          !sub.is_deleted &&
          sub.isActive !== false &&
          (sub.planFor === "customer" || sub.planFor === "customers" || sub.planFor === "individual_customer")
      )
      .map((sub: any) => ({
        planId: sub.subscriptionPlanId,
        planName: sub.planName,
        durationMonths: sub.durationMonths || 1,
        price: Number(sub.price) || 0,
      }));
  }, [subscriptionsData]);

  const currentPlan = useMemo(() => {
    if (isIndividual) {
      const activeIndiv =
        indivCustomerPlans?.find((p: any) => p.isActive && p.endDate && new Date(p.endDate).getTime() > Date.now() && p.status !== "pending" && p.transactionId) ||
        indivCustomerPlans?.[0] ||
        (roleData && roleData[0]);

      if (!activeIndiv) return null;
      const subMatch = allPlans.find((s) => s.planId === activeIndiv.subscriptionPlanId);
      const isIndivActive = Boolean(activeIndiv.isActive) && Boolean(activeIndiv.endDate && new Date(activeIndiv.endDate).getTime() > Date.now()) && activeIndiv.status !== "pending" && Boolean(activeIndiv.transactionId);

      return {
        planId: activeIndiv.subscriptionPlanId,
        customAmount: activeIndiv.customAmount ?? subMatch?.price,
        startDate: activeIndiv.startDate,
        endDate: activeIndiv.endDate,
        isActive: isIndivActive,
        is_Active: isIndivActive,
        status: activeIndiv.status || (isIndivActive ? "active" : "pending"),
        pendingAmount: activeIndiv.customAmount ?? subMatch?.price,
        plan: {
          planId: activeIndiv.subscriptionPlanId,
          planName: subMatch?.planName || activeIndiv.subscription?.planName || "Individual Subscription",
          price: subMatch?.price ?? activeIndiv.customAmount,
          durationMonths: 1,
        },
      };
    }
    return (!customerPlans || customerPlans.length === 0) ? null : customerPlans[0];
  }, [isIndividual, indivCustomerPlans, roleData, allPlans, customerPlans]);

  const effectiveCurrentPlan = useMemo(() => {
    const targetPlanId = planId || searchParams.get("planId") || currentPlan?.planId;
    const matched = targetPlanId ? allPlans.find((p) => p.planId === targetPlanId) : null;

    if (currentPlan) {
      const priceNum = (currentPlan.customAmount && Number(currentPlan.customAmount) > 0)
        ? Number(currentPlan.customAmount)
        : (matched?.price ?? currentPlan.plan?.price ?? 0);
      return {
        ...currentPlan,
        customAmount: priceNum,
        pendingAmount: currentPlan.pendingAmount !== undefined && currentPlan.pendingAmount !== null ? Number(currentPlan.pendingAmount) : null,
        plan: {
          planId: currentPlan.plan?.planId || currentPlan.planId || matched?.planId,
          planName: currentPlan.plan?.planName || matched?.planName || "Membership Plan",
          price: matched?.price ?? currentPlan.plan?.price ?? priceNum,
          durationMonths: currentPlan.plan?.durationMonths || matched?.durationMonths || 1,
        },
      };
    }
    if (matched) {
      return { planId: matched.planId, customAmount: matched.price, startDate: null, endDate: null, isActive: false, is_Active: false, plan: matched };
    }
    return null;
  }, [currentPlan, allPlans, planId, searchParams]);

  const remainingDays = useMemo(
    () => calculateRemainingDays(effectiveCurrentPlan?.endDate),
    [effectiveCurrentPlan?.endDate]
  );

  const isPendingActivation = useMemo(() => {
    if (!effectiveCurrentPlan) return false;
    return (
      !effectiveCurrentPlan.startDate ||
      !effectiveCurrentPlan.endDate ||
      (!Boolean(effectiveCurrentPlan.is_Active ?? effectiveCurrentPlan.isActive) && !effectiveCurrentPlan.endDate) ||
      (effectiveCurrentPlan as any)?.status === "pending"
    );
  }, [effectiveCurrentPlan]);

  const isCurrentActive = useMemo(() => {
    return Boolean(
      (effectiveCurrentPlan?.is_Active ?? effectiveCurrentPlan?.isActive) &&
      effectiveCurrentPlan?.startDate &&
      effectiveCurrentPlan?.endDate &&
      (effectiveCurrentPlan as any)?.status !== "pending" &&
      remainingDays > 0
    );
  }, [effectiveCurrentPlan, remainingDays]);

  const hasPendingUpgrade = useMemo(() => {
    return Boolean(effectiveCurrentPlan?.pendingPlanId || currentPlan?.pendingPlanId || (effectiveCurrentPlan as any)?.pendingPlan);
  }, [effectiveCurrentPlan?.pendingPlanId, currentPlan?.pendingPlanId, effectiveCurrentPlan]);

  const otherAvailablePlans = useMemo(() => {
    if (!allPlans || allPlans.length === 0) return [];
    if (!effectiveCurrentPlan) return allPlans;
    return allPlans.filter((plan) => {
      const isSameId = effectiveCurrentPlan.planId && plan.planId === effectiveCurrentPlan.planId;
      const isSameName =
        effectiveCurrentPlan.plan?.planName &&
        plan.planName &&
        effectiveCurrentPlan.plan.planName.trim().toLowerCase() === plan.planName.trim().toLowerCase();
      return !isSameId && !isSameName;
    });
  }, [allPlans, effectiveCurrentPlan]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#141414] border border-[#222222] rounded-3xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-[#222222]">
          <div>
            <h2 className="text-white text-xl font-semibold">
              {isPendingActivation ? "Activate Membership" : hasPendingUpgrade ? "Upgrade Membership" : "Gym Membership"}
            </h2>
            <p className="text-[#8E8E93] text-xs mt-0.5">
              {isPendingActivation ? "Complete payment for your assigned membership plan" : hasPendingUpgrade ? "Complete payment for your pending plan upgrade" : "Physical Gym Access & Companion Plan"}
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#8E8E93] hover:text-white transition-colors cursor-pointer">
            <X size={16} weight="bold" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
          {activeSession && (
            <PaymentRecoveryBanner planName={activeSession.planName} amount={activeSession.amount} onResume={resumePayment} onCancel={clearSession} isChecking={isChecking} />
          )}
          <div className="bg-[#1C1C1E] border border-[#D7FF00]/25 rounded-2xl p-4 mb-6 flex gap-3 items-start">
            <Info size={22} className="text-[#D7FF00] shrink-0 mt-0.5" weight="fill" />
            <div className="flex-1">
              <h4 className="text-white text-xs font-semibold mb-1">
                {isPendingActivation ? "Activate Assigned Plan" : hasPendingUpgrade ? "Upgrade Assigned Plan" : "Physical Gym Membership"}
              </h4>
              <p className="text-[#8E8E93] text-xs leading-relaxed">
                {isPendingActivation
                  ? "Your assigned plan is pending activation. Complete payment for your assigned plan above to get started."
                  : hasPendingUpgrade
                  ? "Your membership upgrade is ready. Complete your payment below to activate your upgraded plan."
                  : isCurrentActive
                  ? `Your current plan is active with ${remainingDays} days remaining. Plan selection will unlock once expired.`
                  : "Membership plans cover entry and physical equipment access. Choose a plan to pay and activate securely via Razorpay."}
              </p>
            </div>
          </div>
          {effectiveCurrentPlan && (
            <CurrentPlanSection
              currentPlan={effectiveCurrentPlan}
              isLoading={isLoadingSubscriptions || (isLoadingCustomerPlans && !effectiveCurrentPlan)}
              onRenew={handleRenew}
              renewingPlanId={renewingPlanId}
            />
          )}
          <AvailablePlansSection
            currentPlan={effectiveCurrentPlan}
            plans={otherAvailablePlans}
            isLoading={isLoadingSubscriptions}
            onRenew={handleRenew}
            renewingPlanId={renewingPlanId}
            isCurrentActive={isCurrentActive}
            isPendingActivation={isPendingActivation}
            remainingDays={remainingDays}
          />
        </div>
        <div className="p-5 border-t border-[#222222] bg-[#141414]">
          <button onClick={onClose} className="w-full bg-[#2A2A2A] hover:bg-[#333333] text-white font-semibold py-3.5 rounded-xl transition-colors text-sm cursor-pointer">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
