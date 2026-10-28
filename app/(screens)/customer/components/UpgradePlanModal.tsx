"use client";

import { X, Info } from "@phosphor-icons/react";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
import { useGymCustomerMembershipPlans } from "@/lib/hooks/gymCustomerMembershipPlans/useGymCustomerMembershipPlans";
import { useSubscriptions } from "@/lib/hooks/superadmin/subscriptions/subscriptions";
import { getAvailablePlans } from "@/app/actions/customer/getAvailablePlans";
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
  const isIndividual = role === "individual" || profile?.role === "individual";
  const [availablePlans, setAvailablePlans] = useState<Plan[]>([]);
  const [isLoadingGymPlans, setIsLoadingGymPlans] = useState(true);

  const resolvedCustomerId = isIndividual ? user?.id : (customerId || roleData?.[0]?.customerId || user?.id);
  const resolvedGymId = isIndividual ? undefined : (gymId || roleData?.[0]?.gymId);

  const {
    data: customerPlans,
    isLoading: isLoadingCustomerPlans,
    refetch: refetchCustomerPlans,
  } = useGymCustomerMembershipPlans(resolvedGymId, resolvedCustomerId);

  const {
    data: individualSubscriptions,
    isLoading: isLoadingIndividualSubs,
  } = useSubscriptions(undefined, "customer", { enabled: isIndividual });

  const handleRenewSuccess = useCallback(async () => {
    await refetchCustomerPlans();
    router.refresh();
    onClose();
  }, [refetchCustomerPlans, router, onClose]);

  const {
    activeSession,
    isChecking,
    saveSession,
    clearSession,
    resumePayment,
  } = usePaymentSession(handleRenewSuccess);

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

  const currentPlan = useMemo(() => {
    if (isIndividual) {
      if (!roleData || roleData.length === 0) return null;
      const activeIndiv =
        roleData.find((p: any) => p.isActive && p.endDate && new Date(p.endDate).getTime() > Date.now()) ||
        roleData[0];
      if (!activeIndiv) return null;
      const subMatch = individualSubscriptions?.find((s: any) => s.subscriptionPlanId === activeIndiv.subscriptionPlanId);
      const isIndivActive = Boolean(activeIndiv.isActive) && Boolean(activeIndiv.endDate && new Date(activeIndiv.endDate).getTime() > Date.now());
      return {
        planId: activeIndiv.subscriptionPlanId,
        customAmount: activeIndiv.customAmount ?? subMatch?.price,
        startDate: activeIndiv.startDate,
        endDate: activeIndiv.endDate,
        isActive: isIndivActive,
        is_Active: isIndivActive,
        plan: {
          planId: activeIndiv.subscriptionPlanId,
          planName: subMatch?.planName || "Individual Subscription",
          price: subMatch?.price,
        },
      };
    }
    if (!customerPlans || customerPlans.length === 0) return null;
    return customerPlans[0];
  }, [isIndividual, roleData, individualSubscriptions, customerPlans]);

  const mappedIndividualPlans: Plan[] = useMemo(() => {
    if (!isIndividual || !individualSubscriptions) return [];
    return individualSubscriptions
      .filter((sub: any) => !sub.is_deleted && sub.isActive !== false && (sub.planFor === "customer" || sub.planFor === "customers" || sub.planFor === "individual_customer"))
      .map((sub: any) => ({
        planId: sub.subscriptionPlanId,
        planName: sub.planName,
        durationMonths: 1,
        price: Number(sub.price) || 0,
      }));
  }, [isIndividual, individualSubscriptions]);

  useEffect(() => {
    async function loadGymPlans() {
      if (isIndividual) {
        setIsLoadingGymPlans(false);
        return;
      }
      if (resolvedGymId) {
        try {
          const plans = await getAvailablePlans(resolvedGymId);
          setAvailablePlans(plans);
        } catch (error) {
          console.error("Failed to fetch available plans:", error);
        }
      } else {
        setAvailablePlans([]);
      }
      setIsLoadingGymPlans(false);
    }
    loadGymPlans();
  }, [resolvedGymId, isIndividual]);

  const effectivePlans = isIndividual ? mappedIndividualPlans : availablePlans;
  const isPlansLoading = isIndividual ? isLoadingIndividualSubs : isLoadingGymPlans;

  const effectiveCurrentPlan = useMemo(() => {
    const targetPlanId = planId || searchParams.get("planId") || currentPlan?.planId;
    const matched = targetPlanId ? effectivePlans.find((p) => p.planId === targetPlanId) : null;

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
      return {
        planId: matched.planId,
        customAmount: matched.price,
        startDate: null,
        endDate: null,
        isActive: false,
        is_Active: false,
        plan: matched,
      };
    }

    return null;
  }, [currentPlan, effectivePlans, planId, searchParams]);

  const isActivationMode = useMemo(() => {
    if (isActivation) return true;
    if (searchParams.get("action") === "activate") return true;
    if (effectiveCurrentPlan) {
      return !effectiveCurrentPlan.startDate || !effectiveCurrentPlan.endDate || (!Boolean(effectiveCurrentPlan.is_Active ?? effectiveCurrentPlan.isActive) && !effectiveCurrentPlan.endDate);
    }
    return false;
  }, [isActivation, searchParams, effectiveCurrentPlan]);

  const hasPendingUpgrade = useMemo(() => {
    return Boolean(
      effectiveCurrentPlan?.pendingPlanId ||
      currentPlan?.pendingPlanId ||
      (effectiveCurrentPlan as any)?.pendingPlan
    );
  }, [effectiveCurrentPlan?.pendingPlanId, currentPlan?.pendingPlanId, effectiveCurrentPlan]);

  const remainingDays = useMemo(() => calculateRemainingDays(effectiveCurrentPlan?.endDate), [effectiveCurrentPlan?.endDate]);
  const isCurrentActive = useMemo(() => {
    return Boolean(
      (effectiveCurrentPlan?.is_Active ?? effectiveCurrentPlan?.isActive) &&
      effectiveCurrentPlan?.startDate &&
      effectiveCurrentPlan?.endDate &&
      remainingDays > 0
    );
  }, [effectiveCurrentPlan, remainingDays]);

  const otherAvailablePlans = useMemo(() => {
    if (!effectivePlans || isActivationMode || hasPendingUpgrade) return [];
    if (!effectiveCurrentPlan) return effectivePlans;
    const currentPrice = Number(effectiveCurrentPlan.plan?.price ?? effectiveCurrentPlan.customAmount ?? 0);
    return effectivePlans.filter((plan) => {
      const isSameId = effectiveCurrentPlan.planId && plan.planId === effectiveCurrentPlan.planId;
      const isSameName = effectiveCurrentPlan.plan?.planName && plan.planName && effectiveCurrentPlan.plan.planName.trim().toLowerCase() === plan.planName.trim().toLowerCase();
      if (isSameId || isSameName) return false;
      if (isCurrentActive && Number(plan.price) < currentPrice) return false;
      return true;
    });
  }, [effectivePlans, effectiveCurrentPlan, isCurrentActive, isActivationMode, hasPendingUpgrade]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#141414] border border-[#222222] rounded-3xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-[#222222]">
          <div>
            <h2 className="text-white text-xl font-semibold">
              {isActivationMode ? "Activate Membership" : hasPendingUpgrade ? "Upgrade Membership" : "Gym Membership"}
            </h2>
            <p className="text-[#8E8E93] text-xs mt-0.5">
              {isActivationMode
                ? "Complete payment for your assigned membership plan"
                : hasPendingUpgrade
                  ? "Complete payment for your pending plan upgrade"
                  : "Physical Gym Access & Companion Plan"}
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#8E8E93] hover:text-white transition-colors cursor-pointer">
            <X size={16} weight="bold" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
          {activeSession && (
            <PaymentRecoveryBanner
              planName={activeSession.planName}
              amount={activeSession.amount}
              onResume={resumePayment}
              onCancel={clearSession}
              isChecking={isChecking}
            />
          )}
          <div className="bg-[#1C1C1E] border border-[#D7FF00]/25 rounded-2xl p-4 mb-6 flex gap-3 items-start">
            <Info size={22} className="text-[#D7FF00] shrink-0 mt-0.5" weight="fill" />
            <div className="flex-1">
              <h4 className="text-white text-xs font-semibold mb-1">
                {isActivationMode ? "Activate Assigned Plan" : hasPendingUpgrade ? "Upgrade Assigned Plan" : "Physical Gym Membership"}
              </h4>
              <p className="text-[#8E8E93] text-xs leading-relaxed">
                {isActivationMode
                  ? "Your gym has assigned this membership plan for you. Complete your payment below to activate your gym access and start working out."
                  : hasPendingUpgrade
                    ? "Your gym owner initiated a membership upgrade for you. Complete your payment below to activate your upgraded plan."
                    : "Membership plans cover entry and access to physical gym facilities, fitness equipment, and in-person trainer guidance. Choose a plan to pay and renew securely via Razorpay."}
              </p>
            </div>
          </div>
          <CurrentPlanSection
            currentPlan={effectiveCurrentPlan}
            isLoading={isIndividual ? false : (isLoadingCustomerPlans && !effectiveCurrentPlan)}
            onRenew={handleRenew}
            renewingPlanId={renewingPlanId}
          />
          {!isActivationMode && !hasPendingUpgrade && (
            <AvailablePlansSection
              currentPlan={effectiveCurrentPlan}
              plans={otherAvailablePlans}
              isLoading={isPlansLoading}
              onRenew={handleRenew}
              renewingPlanId={renewingPlanId}
            />
          )}
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
