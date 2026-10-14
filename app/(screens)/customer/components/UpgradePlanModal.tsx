"use client";

import { X, Info } from "@phosphor-icons/react";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUser } from "@/app/context/UserContext";
import { useGymCustomerMembershipPlans } from "@/lib/hooks/gymCustomerMembershipPlans/useGymCustomerMembershipPlans";
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
  const { user, profile, roleData } = useUser();
  const [availablePlans, setAvailablePlans] = useState<Plan[]>([]);
  const [isLoadingGymPlans, setIsLoadingGymPlans] = useState(true);
  const [renewingPlanId, setRenewingPlanId] = useState<string | null>(null);

  const resolvedCustomerId = customerId || roleData?.[0]?.customerId || user?.id;
  const resolvedGymId = gymId || roleData?.[0]?.gymId;

  const {
    data: customerPlans,
    isLoading: isLoadingCustomerPlans,
    refetch: refetchCustomerPlans,
  } = useGymCustomerMembershipPlans(resolvedGymId, resolvedCustomerId);

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
    if (!customerPlans || customerPlans.length === 0) return null;
    return customerPlans[0];
  }, [customerPlans]);

  useEffect(() => {
    async function loadGymPlans() {
      if (resolvedGymId) {
        try {
          const plans = await getAvailablePlans(resolvedGymId);
          setAvailablePlans(plans);
        } catch (error) {
          console.error("Failed to fetch available plans:", error);
        }
      }
      setIsLoadingGymPlans(false);
    }
    loadGymPlans();
  }, [resolvedGymId]);

  const otherAvailablePlans = useMemo(() => {
    if (!availablePlans) return [];
    if (!currentPlan) return availablePlans;

    return availablePlans.filter((plan) => {
      const isSameId = currentPlan.planId && plan.planId === currentPlan.planId;
      const isSameName =
        currentPlan.plan?.planName &&
        plan.planName &&
        currentPlan.plan.planName.trim().toLowerCase() === plan.planName.trim().toLowerCase();

      return !isSameId && !isSameName;
    });
  }, [availablePlans, currentPlan]);

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

      if (!orderResult.success || !orderResult.orderId) {
        toast.error(orderResult.error || "Failed to initiate payment gateway.");
        setRenewingPlanId(null);
        return;
      }

      saveSession({
        orderId: orderResult.orderId,
        planId: targetPlanId,
        planName: targetPlanName,
        amount: Number(orderResult.amount) / 100,
        currency: orderResult.currency,
        keyId: orderResult.keyId,
        customerId: resolvedCustomerId,
        gymId: resolvedGymId,
        customerName: orderResult.customerName || profile?.name || "",
        customerEmail: orderResult.customerEmail || user?.email || "",
        customerPhone: orderResult.customerPhone || "",
        timestamp: Date.now(),
      });

      const options = {
        key: orderResult.keyId,
        amount: orderResult.amount,
        currency: orderResult.currency,
        name: "GK-Gym Life",
        description: `Plan Renewal: ${targetPlanName}`,
        order_id: orderResult.orderId,
        prefill: {
          name: orderResult.customerName || profile?.name || "",
          email: orderResult.customerEmail || user?.email || "",
          contact: orderResult.customerPhone || "",
        },
        theme: {
          color: "#D7FF00",
        },
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
          } catch (verifyErr) {
            console.error("Verification error:", verifyErr);
            toast.error("Payment verification failed on server.", { id: "payment-verify" });
          } finally {
            setRenewingPlanId(null);
          }
        },
        modal: {
          ondismiss: function () {
            setRenewingPlanId(null);
          },
        },
      };

      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.on("payment.failed", function (response: any) {
        console.error("Payment failed:", response.error);
        toast.error(response.error?.description || "Payment failed or was cancelled.");
        setRenewingPlanId(null);
      });

      razorpayInstance.open();
    } catch (error) {
      console.error("Payment gateway error:", error);
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
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center text-[#8E8E93] hover:text-white transition-colors cursor-pointer"
          >
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

          <CurrentPlanSection
            currentPlan={currentPlan}
            isLoading={isLoadingCustomerPlans}
            onRenew={handleRenew}
            renewingPlanId={renewingPlanId}
          />

          <AvailablePlansSection
            plans={otherAvailablePlans}
            isLoading={isLoadingGymPlans}
            onRenew={handleRenew}
            renewingPlanId={renewingPlanId}
          />
        </div>

        <div className="p-5 border-t border-[#222222] bg-[#141414]">
          <button
            onClick={onClose}
            className="w-full bg-[#2A2A2A] hover:bg-[#333333] text-white font-semibold py-3.5 rounded-xl transition-colors text-sm cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
