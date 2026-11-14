"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import toast from "react-hot-toast";
import { checkAndVerifyOrderStatus } from "@/app/actions/customer/checkAndVerifyOrderStatus";
import { verifyPaymentAndRenewPlan } from "@/app/actions/customer/verifyPaymentAndRenewPlan";
import { loadRazorpayScript } from "@/lib/helpers/razorpay/loadRazorpayScript";

export interface StoredPaymentSession {
  orderId: string;
  planId?: string;
  planName: string;
  trainerId?: string;
  trainerName?: string;
  paymentType?: "membership" | "trainerfee";
  amount: number;
  currency: string;
  keyId: string;
  customerId?: string;
  gymId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  timestamp: number;
}

const STORAGE_KEY = "gk_active_payment_session";
const SESSION_EXPIRY_MS = 15 * 60 * 1000;

export function usePaymentSession(onRenewSuccess: (planName: string) => void) {
  const [activeSession, setActiveSession] = useState<StoredPaymentSession | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const isCheckingRef = useRef(false);

  const clearSession = useCallback(() => {
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
    setActiveSession(null);
  }, []);

  const saveSession = useCallback((session: StoredPaymentSession) => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch (e) {
      console.error(e);
    }
    setActiveSession(session);
  }, []);

  const checkStatus = useCallback(
    async (session: StoredPaymentSession) => {
      if (isCheckingRef.current) return false;
      isCheckingRef.current = true;
      setIsChecking(true);
      try {
        const result = await checkAndVerifyOrderStatus({
          orderId: session.orderId,
          planId: session.planId,
          trainerId: session.trainerId,
          paymentType: session.paymentType,
          customerId: session.customerId,
          gymId: session.gymId,
        });

        if (result.success && result.status === "paid") {
          clearSession();
          const displayName = result.type === "trainer"
            ? (result.trainerName || session.trainerName || "Trainer")
            : (result.planName || session.planName);
          toast.success(
            result.type === "trainer"
              ? `Payment verified! Trainer booking confirmed with ${displayName}.`
              : `Payment verified! Plan "${displayName}" activated successfully.`
          );
          onRenewSuccess(displayName);
          return true;
        }

        if (result.status === "failed") {
          clearSession();
          toast.error("Previous payment attempt was cancelled or failed. Please retry.");
          return false;
        }

        return false;
      } catch (err) {
        console.error("Failed to check payment status:", err);
        return false;
      } finally {
        isCheckingRef.current = false;
        setIsChecking(false);
      }
    },
    [clearSession, onRenewSuccess]
  );

  const resumePayment = useCallback(async () => {
    if (!activeSession) return;

    const isAlreadyPaid = await checkStatus(activeSession);
    if (isAlreadyPaid) return;

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      toast.error("Failed to load Razorpay payment gateway.");
      return;
    }

    const isSubscription = activeSession.orderId.startsWith("sub_");

    const options: any = {
      key: activeSession.keyId,
      name: "GK-Gym Life",
      description: `Plan: ${activeSession.planName}`,
      prefill: {
        name: activeSession.customerName || "",
        email: activeSession.customerEmail || "",
        contact: activeSession.customerPhone || "",
      },
      theme: { color: "#D7FF00" },
      handler: async function (response: any) {
        try {
          toast.loading("Verifying payment...", { id: "payment-verify" });
          const verifyResult = await verifyPaymentAndRenewPlan({
            orderId: isSubscription ? undefined : (response.razorpay_order_id || activeSession.orderId),
            subscriptionId: isSubscription ? (response.razorpay_subscription_id || activeSession.orderId) : undefined,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            planId: activeSession.planId || "",
            customerId: activeSession.customerId,
            gymId: activeSession.gymId,
            isAutoPay: isSubscription,
          });

          if (verifyResult.success) {
            clearSession();
            toast.success(`Plan "${activeSession.planName}" activated successfully!`, { id: "payment-verify" });
            onRenewSuccess(activeSession.planName);
          } else {
            toast.error(verifyResult.error || "Payment verification failed.", { id: "payment-verify" });
          }
        } catch (verifyErr) {
          console.error("Verification error:", verifyErr);
          toast.error("Payment verification failed on server.", { id: "payment-verify" });
        }
      },
      modal: {
        ondismiss: function () {},
      },
    };

    if (isSubscription) {
      options.subscription_id = activeSession.orderId;
    } else {
      options.order_id = activeSession.orderId;
      options.amount = Math.round(activeSession.amount * 100);
      options.currency = activeSession.currency || "INR";
    }

    const razorpayInstance = new (window as any).Razorpay(options);
    razorpayInstance.on("payment.failed", function (response: any) {
      toast.error(response.error?.description || "Payment failed or was cancelled.");
    });

    razorpayInstance.open();
  }, [activeSession, checkStatus, clearSession, onRenewSuccess]);

  useEffect(() => {
    const inspectAndRecoverSession = () => {
      try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        if (!raw) return;

        const parsed: StoredPaymentSession = JSON.parse(raw);
        const isExpired = Date.now() - (parsed.timestamp || 0) > SESSION_EXPIRY_MS;

        if (isExpired) {
          sessionStorage.removeItem(STORAGE_KEY);
          return;
        }

        setActiveSession(parsed);
        checkStatus(parsed);
      } catch (e) {
        console.error("Failed to parse payment session from storage:", e);
      }
    };

    inspectAndRecoverSession();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        inspectAndRecoverSession();
      }
    };

    window.addEventListener("focus", inspectAndRecoverSession);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("focus", inspectAndRecoverSession);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [checkStatus]);

  return {
    activeSession,
    isChecking,
    saveSession,
    clearSession,
    resumePayment,
  };
}
