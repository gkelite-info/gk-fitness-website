"use client";

import { ArrowLeft, Info, CircleNotch } from "@phosphor-icons/react";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { useUser } from "@/app/context/UserContext";
import { useGymCustomerMembershipPlans } from "@/lib/hooks/gymCustomerMembershipPlans/useGymCustomerMembershipPlans";
import { getAvailablePlans } from "@/app/actions/customer/getAvailablePlans";
import { createRazorpayOrder } from "@/app/actions/customer/createRazorpayOrder";
import { verifyPaymentAndRenewPlan } from "@/app/actions/customer/verifyPaymentAndRenewPlan";
import { loadRazorpayScript } from "@/lib/helpers/razorpay/loadRazorpayScript";
import PaymentRecoveryBanner from "../components/PaymentRecoveryBanner";
import { usePaymentSession } from "../components/usePaymentSession";
import PaymentPlanSelector from "./PaymentPlanSelector";
import PaymentSummaryCard from "./PaymentSummaryCard";

interface Plan {
  planId: string;
  planName: string;
  durationMonths: number;
  price: number;
}

interface PaymentClientViewProps {
  gymId: string;
  customerId?: string;
  preselectedPlanId?: string;
}

export default function PaymentClientView({
  gymId,
  customerId,
  preselectedPlanId,
}: PaymentClientViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, profile, roleData } = useUser();

  const [availablePlans, setAvailablePlans] = useState<Plan[]>([]);
  const [isLoadingPlans, setIsLoadingPlans] = useState(true);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(
    preselectedPlanId || searchParams.get("planId") || null
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const resolvedCustomerId = customerId || roleData?.[0]?.customerId || user?.id;
  const resolvedGymId = gymId || roleData?.[0]?.gymId;

  const {
    data: customerPlans,
    refetch: refetchCustomerPlans,
  } = useGymCustomerMembershipPlans(resolvedGymId, resolvedCustomerId);

  const handleRenewSuccess = useCallback(async () => {
    await refetchCustomerPlans();
    router.refresh();
  }, [refetchCustomerPlans, router]);

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
    async function loadPlans() {
      if (resolvedGymId) {
        try {
          const plans = await getAvailablePlans(resolvedGymId);
          setAvailablePlans(plans);
          if (!selectedPlanId && plans.length > 0) {
            setSelectedPlanId(plans[0].planId);
          }
        } catch (error) {
          console.error("Failed to load plans:", error);
        }
      }
      setIsLoadingPlans(false);
    }
    loadPlans();
  }, [resolvedGymId, selectedPlanId]);

  const handleStartPayment = async () => {
    if (!selectedPlanId) {
      toast.error("Please select a plan to continue.");
      return;
    }

    const targetPlan = availablePlans.find((p) => p.planId === selectedPlanId);
    if (!targetPlan) {
      toast.error("Selected plan details could not be found.");
      return;
    }

    try {
      setIsProcessing(true);

      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        toast.error("Failed to load Razorpay payment gateway SDK.");
        setIsProcessing(false);
        return;
      }

      const orderResult = await createRazorpayOrder({
        planId: targetPlan.planId,
        customerId: resolvedCustomerId,
        gymId: resolvedGymId,
      });

      if (!orderResult.success) {
        toast.error(orderResult.error || "Failed to initiate payment gateway.");
        setIsProcessing(false);
        return;
      }

      saveSession({
        orderId: orderResult.orderId || "",
        planId: targetPlan.planId,
        planName: targetPlan.planName,
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
        description: `Plan Renewal: ${targetPlan.planName}`,
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
              planId: targetPlan.planId,
              customerId: resolvedCustomerId,
              gymId: resolvedGymId,
            });
            if (verifyResult.success) {
              clearSession();
              toast.success(`Plan "${targetPlan.planName}" renewed successfully!`, { id: "payment-verify" });
              await refetchCustomerPlans();
              router.push("/customer");
            } else {
              toast.error(verifyResult.error || "Payment verification failed.", { id: "payment-verify" });
            }
          } catch {
            toast.error("Payment verification failed on server.", { id: "payment-verify" });
          } finally {
            setIsProcessing(false);
          }
        },
        modal: { ondismiss: () => setIsProcessing(false) },
      };

      if (orderResult.orderId) {
        options.order_id = orderResult.orderId;
      }

      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.on("payment.failed", function (response: any) {
        console.error("Payment failed:", response.error);
        toast.error(response.error?.description || "Payment failed or was cancelled.");
        setIsProcessing(false);
      });

      razorpayInstance.open();
    } catch (error) {
      console.error("Payment gateway error:", error);
      toast.error("An error occurred while connecting to Razorpay.");
      setIsProcessing(false);
    }
  };

  const selectedPlan = availablePlans.find((p) => p.planId === selectedPlanId);

  return (
    <div className="flex flex-col pb-24 max-w-xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.push("/customer")}
          className="flex items-center gap-2 text-[#9CA3AF] hover:text-white transition-colors cursor-pointer text-sm font-semibold"
        >
          <ArrowLeft size={18} weight="bold" />
          Back to Dashboard
        </button>
      </div>

      <div className="mb-6">
        <h1 className="text-white text-2xl font-bold tracking-tight">
          Membership Checkout
        </h1>
        <p className="text-[#8E8E93] text-xs mt-1">
          Review your plan details and renew securely via Razorpay
        </p>
      </div>

      {activeSession && (
        <PaymentRecoveryBanner
          planName={activeSession.planName}
          amount={activeSession.amount}
          onResume={resumePayment}
          onCancel={clearSession}
          isChecking={isChecking}
        />
      )}

      {currentPlan && (
        <div className="bg-[#141414] border border-[#222222] rounded-2xl p-4 mb-5 flex items-center justify-between">
          <div>
            <span className="text-[#8E8E93] text-[11px] font-medium uppercase tracking-wider block">
              Current Membership
            </span>
            <span className="text-white text-sm font-bold mt-0.5 block">
              {currentPlan.plan?.planName || "Member Plan"}
            </span>
          </div>
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${currentPlan.endDate && new Date(currentPlan.endDate) > new Date()
              ? "bg-[#D7FF00]/10 text-[#D7FF00]"
              : "bg-[#EF4444]/10 text-[#EF4444]"
            }`}>
            {currentPlan.endDate && new Date(currentPlan.endDate) > new Date()
              ? "Active Plan"
              : "Expired"}
          </span>
        </div>
      )}

      <div className="bg-[#1C1C1E] border border-[#D7FF00]/25 rounded-2xl p-4 mb-6 flex gap-3 items-start">
        <Info size={22} className="text-[#D7FF00] shrink-0 mt-0.5" weight="fill" />
        <div className="flex-1">
          <h4 className="text-white text-xs font-semibold mb-1">Physical Gym Access</h4>
          <p className="text-[#8E8E93] text-xs leading-relaxed">
            Your payment is processed through RBI-authorized Razorpay gateway with 256-bit SSL encryption. Domestic UPI, RuPay, Visa, Mastercard, and Netbanking are supported.
          </p>
        </div>
      </div>

      <PaymentPlanSelector
        plans={availablePlans}
        selectedPlanId={selectedPlanId}
        isLoading={isLoadingPlans}
        onSelectPlan={(id) => setSelectedPlanId(id)}
      />

      <PaymentSummaryCard
        planName={selectedPlan?.planName}
        durationMonths={selectedPlan?.durationMonths}
        price={selectedPlan?.price}
      />

      <button
        onClick={handleStartPayment}
        disabled={isProcessing || !selectedPlan}
        className="w-full bg-[#D7FF00] hover:bg-[#cbf500] text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-sm shadow-[0_10px_20px_-10px_rgba(215,255,0,0.4)] cursor-pointer"
      >
        {isProcessing ? (
          <>
            <CircleNotch size={18} className="animate-spin" />
            Connecting Gateway...
          </>
        ) : (
          `Pay ₹${selectedPlan?.price || 0} via Razorpay`
        )}
      </button>
    </div>
  );
}
