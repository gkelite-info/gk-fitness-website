"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { loadRazorpayScript } from "@/lib/helpers/razorpay/loadRazorpayScript";
import { createRazorpayOrder } from "@/app/actions/customer/createRazorpayOrder";
import { createRazorpaySubscription } from "@/app/actions/customer/createRazorpaySubscription";
import { verifyPaymentAndRenewPlan } from "@/app/actions/customer/verifyPaymentAndRenewPlan";
import { checkAndVerifyOrderStatus } from "@/app/actions/customer/checkAndVerifyOrderStatus";
import { dismissRazorpay } from "@/lib/helpers/razorpay/dismissRazorpay";
import { StoredPaymentSession } from "./usePaymentSession";

interface UsePlanCheckoutParams {
  resolvedCustomerId?: string;
  resolvedGymId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  saveSession: (session: StoredPaymentSession) => void;
  clearSession: () => void;
  onSuccess: () => void;
}

export function usePlanCheckout({
  resolvedCustomerId,
  resolvedGymId,
  customerName,
  customerEmail,
  customerPhone,
  saveSession,
  clearSession,
  onSuccess,
}: UsePlanCheckoutParams) {
  const router = useRouter();
  const [renewingPlanId, setRenewingPlanId] = useState<string | null>(null);
  const [successInfo, setSuccessInfo] = useState<{
    itemName: string;
    amount: number;
    transactionId?: string;
  } | null>(null);

  const handleSuccessClose = () => {
    setSuccessInfo(null);
    onSuccess();
    router.refresh();
  };

  const handleRenew = async (
    targetPlanId: string,
    targetPlanName: string,
    amount?: number,
    isAutoPay: boolean = true
  ) => {
    try {
      setRenewingPlanId(targetPlanId);
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        toast.error("Failed to load Razorpay payment gateway SDK.");
        setRenewingPlanId(null);
        return;
      }

      let orderId = "";
      let subscriptionId: string | undefined = undefined;
      let keyId = "";
      let resolvedName = customerName || "";
      let resolvedEmail = customerEmail || "";
      let resolvedPhone = customerPhone || "";

      if (isAutoPay) {
        const subResult = await createRazorpaySubscription({
          planId: targetPlanId,
          customerId: resolvedCustomerId,
          gymId: resolvedGymId,
          amount,
        });

        if (!subResult.success) {
          toast.error(subResult.error || "Failed to initiate payment gateway.");
          setRenewingPlanId(null);
          return;
        }

        subscriptionId = subResult.subscriptionId;
        orderId = subResult.subscriptionId || "";
        keyId = subResult.keyId || "";
        resolvedName = subResult.customerName || resolvedName;
        resolvedEmail = subResult.customerEmail || resolvedEmail;
        resolvedPhone = subResult.customerPhone || resolvedPhone;
      } else {
        const orderResult = await createRazorpayOrder({
          planId: targetPlanId,
          customerId: resolvedCustomerId,
          gymId: resolvedGymId,
          amount,
        });

        if (!orderResult.success) {
          toast.error(orderResult.error || "Failed to initiate payment gateway.");
          setRenewingPlanId(null);
          return;
        }

        orderId = orderResult.orderId || "";
        keyId = orderResult.keyId || "";
        resolvedName = orderResult.customerName || resolvedName;
        resolvedEmail = orderResult.customerEmail || resolvedEmail;
        resolvedPhone = orderResult.customerPhone || resolvedPhone;
      }

      saveSession({
        orderId,
        planId: targetPlanId,
        planName: targetPlanName,
        amount: Number(amount || 0),
        currency: "INR",
        keyId,
        customerId: resolvedCustomerId,
        gymId: resolvedGymId,
        customerName: resolvedName,
        customerEmail: resolvedEmail,
        customerPhone: resolvedPhone,
        timestamp: Date.now(),
      });

      let pollerInterval: any = null;
      let isCompleted = false;
      let razorpayInstance: any = null;

      const cleanupListeners = () => {
        if (pollerInterval) clearInterval(pollerInterval);
        window.removeEventListener("focus", checkPaymentStatus);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
      };

      const finishSuccess = (payId?: string) => {
        if (isCompleted) return;
        isCompleted = true;
        cleanupListeners();
        clearSession();
        dismissRazorpay(razorpayInstance);
        setSuccessInfo({
          itemName: targetPlanName,
          amount: Number(amount || 0),
          transactionId: payId,
        });
        setRenewingPlanId(null);
      };

      const checkPaymentStatus = async () => {
        if (isCompleted) return;
        try {
          const res = await checkAndVerifyOrderStatus({
            orderId,
            planId: targetPlanId,
            customerId: resolvedCustomerId,
            gymId: resolvedGymId,
          });
          if (res.success && res.status === "paid") {
            finishSuccess(res.paymentId);
          }
        } catch {}
      };

      pollerInterval = setInterval(checkPaymentStatus, 2000);

      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          checkPaymentStatus();
        }
      };

      window.addEventListener("focus", checkPaymentStatus);
      document.addEventListener("visibilitychange", handleVisibilityChange);

      const options: any = {
        key: keyId,
        name: "GK-Gym Life",
        description: `Membership Plan: ${targetPlanName}`,
        prefill: {
          name: resolvedName,
          email: resolvedEmail,
          contact: resolvedPhone,
        },
        theme: { color: "#D7FF00" },
        handler: async function (response: any) {
          try {
            toast.loading("Verifying payment...", { id: "payment-verify" });
            const verifyResult = await verifyPaymentAndRenewPlan({
              orderId: response.razorpay_order_id || (subscriptionId ? undefined : orderId),
              subscriptionId: response.razorpay_subscription_id || subscriptionId,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              planId: targetPlanId,
              customerId: resolvedCustomerId,
              gymId: resolvedGymId,
              isAutoPay: true,
            });

            if (verifyResult.success) {
              finishSuccess(response.razorpay_payment_id);
            } else {
              await checkPaymentStatus();
            }
          } catch {
            await checkPaymentStatus();
          }
        },
        modal: {
          ondismiss: async () => {
            await checkPaymentStatus();
            cleanupListeners();
            setRenewingPlanId(null);
          },
        },
      };

      if (subscriptionId) {
        options.subscription_id = subscriptionId;
      } else {
        options.order_id = orderId;
        options.amount = Math.round(Number(amount || 0) * 100);
        options.currency = "INR";
      }

      razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.on("payment.failed", async function () {
        await checkPaymentStatus();
      });

      razorpayInstance.open();
    } catch {
      toast.error("An error occurred while connecting to Razorpay.");
      setRenewingPlanId(null);
    }
  };

  return { renewingPlanId, handleRenew, successInfo, handleSuccessClose };
}
