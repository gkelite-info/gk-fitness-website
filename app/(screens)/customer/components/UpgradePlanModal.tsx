"use client";

import { X, Info } from "@phosphor-icons/react";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUser } from "@/app/context/UserContext";
import { useGymCustomerMembershipPlans } from "@/lib/hooks/gymCustomerMembershipPlans/useGymCustomerMembershipPlans";
import { useSubscriptions } from "@/lib/hooks/superadmin/subscriptions/subscriptions";
import { getAvailablePlans } from "@/app/actions/customer/getAvailablePlans";
import { createRazorpayOrder } from "@/app/actions/customer/createRazorpayOrder";
import { verifyPaymentAndRenewPlan } from "@/app/actions/customer/verifyPaymentAndRenewPlan";
import { loadRazorpayScript } from "@/lib/helpers/razorpay/loadRazorpayScript";
import CurrentPlanSection from "./CurrentPlanSection";
import AvailablePlansSection from "./AvailablePlansSection";
import PaymentRecoveryBanner from "./PaymentRecoveryBanner";
import { usePaymentSession } from "./usePaymentSession";

interface UpgradePlanModalProps {
  gymId: string;
  customerId?: string;
  onClose: () => void;
}

interface Plan {
  planId: string;
  planName: string;
  durationMonths: number;
  price: number;
}

export default function UpgradePlanModal({ gymId, customerId, onClose }: UpgradePlanModalProps) {
  const router = useRouter();
  const { user, profile, roleData, role } = useUser();
  const isIndividual = role === "individual" || profile?.role === "individual";
  const [availablePlans, setAvailablePlans] = useState<Plan[]>([]);
  const [isLoadingGymPlans, setIsLoadingGymPlans] = useState(true);
  const [renewingPlanId, setRenewingPlanId] = useState<string | null>(null);

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

  const otherAvailablePlans = useMemo(() => {
    if (!effectivePlans) return [];
    if (!currentPlan) return effectivePlans;
    return effectivePlans.filter((plan) => {
      const isSameId = currentPlan.planId && plan.planId === currentPlan.planId;
      const isSameName = currentPlan.plan?.planName && plan.planName && currentPlan.plan.planName.trim().toLowerCase() === plan.planName.trim().toLowerCase();
      return !isSameId && !isSameName;
    });
  }, [effectivePlans, currentPlan]);

  const handleRenew = async (targetPlanId: string, targetPlanName: string) => {
    try {
      setRenewingPlanId(targetPlanId);
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        toast.error("Failed to load Razorpay payment gateway SDK.");
        setRenewingPlanId(null);
        return;
      }
      const orderResult = await createRazorpayOrder({
        planId: targetPlanId,
        customerId: resolvedCustomerId,
        gymId: resolvedGymId,
      });
      if (!orderResult.success) {
        toast.error(orderResult.error || "Failed to initiate payment gateway.");
        setRenewingPlanId(null);
        return;
      }
      saveSession({
        orderId: orderResult.orderId || "",
        planId: targetPlanId,
        planName: targetPlanName,
        amount: Number(orderResult.amount) / 100,
        currency: orderResult.currency || "INR",
        keyId: orderResult.keyId || "",
        customerId: resolvedCustomerId,
        gymId: resolvedGymId,
        customerName: orderResult.customerName || profile?.name || "",
        customerEmail: orderResult.customerEmail || user?.email || "",
        customerPhone: orderResult.customerPhone || "",
        timestamp: Date.now(),
      });
      const options: any = {
        key: orderResult.keyId,
        amount: orderResult.amount,
        currency: orderResult.currency,
        name: "GK-Gym Life",
        description: `Plan Renewal: ${targetPlanName}`,
        prefill: {
          name: orderResult.customerName || profile?.name || "",
          email: orderResult.customerEmail || user?.email || "",
          contact: orderResult.customerPhone || "",
        },
        theme: { color: "#D7FF00" },
        handler: async function (response: any) {
          try {
            toast.loading("Verifying payment...", { id: "payment-verify" });
            const verifyResult = await verifyPaymentAndRenewPlan({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              planId: targetPlanId,
              customerId: resolvedCustomerId,
              gymId: resolvedGymId,
            });
            if (verifyResult.success) {
              clearSession();
              toast.success(`Plan "${targetPlanName}" renewed successfully!`, { id: "payment-verify" });
              await refetchCustomerPlans();
              router.refresh();
              onClose();
            } else {
              toast.error(verifyResult.error || "Payment verification failed.", { id: "payment-verify" });
            }
          } catch {
            toast.error("Payment verification failed on server.", { id: "payment-verify" });
          } finally {
            setRenewingPlanId(null);
          }
        },
        modal: { ondismiss: () => setRenewingPlanId(null) },
      };
      if (orderResult.orderId) {
        options.order_id = orderResult.orderId;
      }
      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.on("payment.failed", function (response: any) {
        console.error("Payment failed:", response.error);
        toast.error(response.error?.description || "Payment failed or was cancelled.");
        setRenewingPlanId(null);
      });
      razorpayInstance.open();
    } catch {
      toast.error("An error occurred while connecting to Razorpay.");
      setRenewingPlanId(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#141414] border border-[#222222] rounded-3xl w-full max-w-lg max-h-[85vh] flex flex-col overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-[#222222]">
          <div>
            <h2 className="text-white text-xl font-semibold">Gym Membership</h2>
            <p className="text-[#8E8E93] text-xs mt-0.5">Physical Gym Access & Companion Plan</p>
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
              <h4 className="text-white text-xs font-semibold mb-1">Physical Gym Membership</h4>
              <p className="text-[#8E8E93] text-xs leading-relaxed">
                Membership plans cover entry and access to physical gym facilities, fitness equipment, and in-person trainer guidance. Choose a plan to pay and renew securely via Razorpay.
              </p>
            </div>
          </div>
          <CurrentPlanSection currentPlan={currentPlan} isLoading={isIndividual ? false : isLoadingCustomerPlans} onRenew={handleRenew} renewingPlanId={renewingPlanId} />
          <AvailablePlansSection plans={otherAvailablePlans} isLoading={isPlansLoading} onRenew={handleRenew} renewingPlanId={renewingPlanId} />
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
