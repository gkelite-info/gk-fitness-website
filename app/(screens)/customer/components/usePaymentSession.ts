"use client";

import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { checkAndVerifyOrderStatus } from "@/app/actions/customer/checkAndVerifyOrderStatus";
import { verifyPaymentAndRenewPlan } from "@/app/actions/customer/verifyPaymentAndRenewPlan";
import { loadRazorpayScript } from "@/lib/helpers/razorpay/loadRazorpayScript";

export interface StoredPaymentSession {
  orderId: string;
  planId: string;
  planName: string;
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

  const checkStatus = useCallback(async (session: StoredPaymentSession) => {
    setIsChecking(true);
    try {
      const result = await checkAndVerifyOrderStatus({
        orderId: session.orderId,
        planId: session.planId,
        customerId: session.customerId,
        gymId: session.gymId,
      });

      if (result.success && result.status === "paid") {
        clearSession();
        toast.success(`Payment verified! Plan "${result.planName || session.planName}" renewed successfully.`);
        onRenewSuccess(result.planName || session.planName);
        return true;
      }

      if (result.status === "failed") {
        clearSession();
        toast.error("Previous payment attempt failed. Please choose a plan to retry.");
        return false;
      }

      return false;
    } catch (err) {
      console.error("Failed to check payment status:", err);
      return false;
    } finally {
      setIsChecking(false);
    }
  }, [clearSession, onRenewSuccess]);

  const resumePayment = useCallback(async () => {
    if (!activeSession) return;

    const isAlreadyPaid = await checkStatus(activeSession);
    if (isAlreadyPaid) return;

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      toast.error("Failed to load Razorpay payment gateway.");
      return;
    }

    const options = {
      key: activeSession.keyId,
      amount: Math.round(activeSession.amount * 100),
      currency: activeSession.currency || "INR",
      name: "GK-Gym Life",
      description: `Plan Renewal: ${activeSession.planName}`,
      order_id: activeSession.orderId,
      prefill: {
        name: activeSession.customerName || "",
        email: activeSession.customerEmail || "",
        contact: activeSession.customerPhone || "",
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
            planId: activeSession.planId,
            customerId: activeSession.customerId,
            gymId: activeSession.gymId,
          });

          if (verifyResult.success) {
            clearSession();
            toast.success(`Plan "${activeSession.planName}" renewed successfully!`, { id: "payment-verify" });
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

    const razorpayInstance = new (window as any).Razorpay(options);
    razorpayInstance.on("payment.failed", function (response: any) {
      toast.error(response.error?.description || "Payment failed or was cancelled.");
    });

    razorpayInstance.open();
  }, [activeSession, checkStatus, clearSession, onRenewSuccess]);

  useEffect(() => {
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
  }, [checkStatus]);

  return {
    activeSession,
    isChecking,
    saveSession,
    clearSession,
    resumePayment,
  };
}
