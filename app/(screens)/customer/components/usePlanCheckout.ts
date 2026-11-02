"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { loadRazorpayScript } from "@/lib/helpers/razorpay/loadRazorpayScript";
import { createRazorpayOrder } from "@/app/actions/customer/createRazorpayOrder";
import { createRazorpaySubscription } from "@/app/actions/customer/createRazorpaySubscription";
import { verifyPaymentAndRenewPlan } from "@/app/actions/customer/verifyPaymentAndRenewPlan";
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
  const [renewingPlanId, setRenewingPlanId] = useState<string | null>(null);

  const handleRenew = async (
    targetPlanId: string,
    targetPlanName: string,
    amount?: number,
    isAutoPay: boolean = false
  ) => {
    try {
      setRenewingPlanId(targetPlanId);
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        toast.error("Failed to load Razorpay payment gateway SDK.");
        setRenewingPlanId(null);
        return;
      }

      if (isAutoPay) {
        const subResult = await createRazorpaySubscription({
          planId: targetPlanId,
          customerId: resolvedCustomerId,
          gymId: resolvedGymId,
          amount,
        });

        if (!subResult.success) {
          toast.error(subResult.error || "Failed to initiate AutoPay subscription.");
          setRenewingPlanId(null);
          return;
        }

        saveSession({
          orderId: subResult.subscriptionId || "",
          planId: targetPlanId,
          planName: targetPlanName,
          amount: Number(subResult.amount) / 100,
          currency: subResult.currency || "INR",
          keyId: subResult.keyId || "",
          customerId: resolvedCustomerId,
          gymId: resolvedGymId,
          customerName: subResult.customerName || customerName || "",
          customerEmail: subResult.customerEmail || customerEmail || "",
          customerPhone: subResult.customerPhone || customerPhone || "",
          timestamp: Date.now(),
        });

        const options: any = {
          key: subResult.keyId,
          subscription_id: subResult.subscriptionId,
          name: "GK-Gym Life",
          description: `AutoPay Membership: ${targetPlanName}`,
          prefill: {
            name: subResult.customerName || customerName || "",
            email: subResult.customerEmail || customerEmail || "",
            contact: subResult.customerPhone || customerPhone || "",
          },
          theme: { color: "#D7FF00" },
          handler: async function (response: any) {
            try {
              toast.loading("Verifying AutoPay authorization...", { id: "payment-verify" });
              const verifyResult = await verifyPaymentAndRenewPlan({
                subscriptionId: response.razorpay_subscription_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                planId: targetPlanId,
                customerId: resolvedCustomerId,
                gymId: resolvedGymId,
                isAutoPay: true,
              });
              if (verifyResult.success) {
                clearSession();
                toast.success(`AutoPay for "${targetPlanName}" activated successfully!`, { id: "payment-verify" });
                onSuccess();
              } else {
                toast.error(verifyResult.error || "AutoPay verification failed.", { id: "payment-verify" });
              }
            } catch {
              toast.error("AutoPay verification failed on server.", { id: "payment-verify" });
            } finally {
              setRenewingPlanId(null);
            }
          },
          modal: { ondismiss: () => setRenewingPlanId(null) },
        };

        const razorpayInstance = new (window as any).Razorpay(options);
        razorpayInstance.on("payment.failed", function (response: any) {
          toast.error(response.error?.description || "AutoPay setup was cancelled.");
          setRenewingPlanId(null);
        });
        razorpayInstance.open();
        return;
      }

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

      saveSession({
        orderId: orderResult.orderId || "",
        planId: targetPlanId,
        planName: targetPlanName,
        amount: Number(orderResult.amount) / 100,
        currency: orderResult.currency || "INR",
        keyId: orderResult.keyId || "",
        customerId: resolvedCustomerId,
        gymId: resolvedGymId,
        customerName: orderResult.customerName || customerName || "",
        customerEmail: orderResult.customerEmail || customerEmail || "",
        customerPhone: orderResult.customerPhone || customerPhone || "",
        timestamp: Date.now(),
      });

      const options: any = {
        key: orderResult.keyId,
        amount: orderResult.amount,
        currency: orderResult.currency,
        name: "GK-Gym Life",
        description: `Plan Renewal: ${targetPlanName}`,
        prefill: {
          name: orderResult.customerName || customerName || "",
          email: orderResult.customerEmail || customerEmail || "",
          contact: orderResult.customerPhone || customerPhone || "",
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
              onSuccess();
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

  return { renewingPlanId, handleRenew };
}
