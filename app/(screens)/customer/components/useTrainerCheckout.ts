"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { loadRazorpayScript } from "@/lib/helpers/razorpay/loadRazorpayScript";
import { createTrainerRazorpayOrder } from "@/app/actions/customer/createTrainerRazorpayOrder";
import { createTrainerRazorpaySubscription } from "@/app/actions/customer/createTrainerRazorpaySubscription";
import { verifyTrainerPaymentAndAssign } from "@/app/actions/customer/verifyTrainerPaymentAndAssign";

interface UseTrainerCheckoutParams {
  userId?: string;
  userName?: string;
  userEmail?: string;
  userPhone?: string;
  onSuccess?: () => void;
  onClose: () => void;
}

interface PayTrainerArgs {
  trainerId: string;
  trainerName: string;
  amount: number;
  isAutoPay: boolean;
}

export function useTrainerCheckout({
  userId,
  userName,
  userEmail,
  userPhone,
  onSuccess,
  onClose,
}: UseTrainerCheckoutParams) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayTrainer = async ({
    trainerId,
    trainerName,
    amount,
    isAutoPay,
  }: PayTrainerArgs) => {
    if (!trainerId) {
      toast.error("Please select a trainer to continue.");
      return;
    }
    if (!userId) {
      toast.error("User session expired. Please log in again.");
      return;
    }

    try {
      setIsProcessing(true);
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        setIsProcessing(false);
        toast.error("Failed to load Razorpay payment gateway SDK.");
        return;
      }

      if (isAutoPay) {
        const subResult = await createTrainerRazorpaySubscription({
          trainerId,
          amount,
          trainerName,
        });

        if (!subResult.success) {
          setIsProcessing(false);
          toast.error(subResult.error || "Failed to initiate AutoPay subscription.");
          return;
        }

        const options: any = {
          key: subResult.keyId,
          subscription_id: subResult.subscriptionId,
          name: "GK-Gym Life",
          description: `Personal Trainer AutoPay: ${trainerName}`,
          prefill: {
            name: subResult.customerName || userName || "",
            email: subResult.customerEmail || userEmail || "",
            contact: subResult.customerPhone || userPhone || "",
          },
          theme: { color: "#D7FF00" },
          handler: async function (response: any) {
            try {
              toast.loading("Verifying AutoPay authorization...", { id: "trainer-pay" });
              const verifyRes = await verifyTrainerPaymentAndAssign({
                subscriptionId: response.razorpay_subscription_id || subResult.subscriptionId,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                trainerId,
                amount,
                isAutoPay: true,
                userId,
              });

              if (verifyRes.success) {
                queryClient.invalidateQueries({ queryKey: ["individualCustomerPayments"] });
                queryClient.invalidateQueries({ queryKey: ["individualCustomerTrainers"] });
                queryClient.invalidateQueries({ queryKey: ["individualCustomerTrainerPayments"] });
                toast.success(`AutoPay active with ${trainerName}!`, { id: "trainer-pay" });
                onSuccess?.();
                onClose();
                if (typeof window !== "undefined") {
                  window.location.href = "/customer";
                } else {
                  router.refresh();
                }
              } else {
                toast.error(verifyRes.error || "AutoPay verification failed.", { id: "trainer-pay" });
              }
            } catch {
              toast.error("AutoPay confirmation failed on server.", { id: "trainer-pay" });
            } finally {
              setIsProcessing(false);
            }
          },
          modal: {
            ondismiss: () => setIsProcessing(false),
          },
        };

        const razorpayInstance = new (window as any).Razorpay(options);
        razorpayInstance.on("payment.failed", function (response: any) {
          toast.error(response.error?.description || "AutoPay setup was cancelled.");
          setIsProcessing(false);
        });
        razorpayInstance.open();
        return;
      }

      const orderResult: any = await createTrainerRazorpayOrder({
        trainerId,
        amount,
        trainerName,
      });

      if (!orderResult.success) {
        setIsProcessing(false);
        toast.error(orderResult.error || "Failed to initiate payment gateway.");
        return;
      }

      const options: any = {
        key: orderResult.keyId,
        amount: orderResult.amount,
        currency: orderResult.currency || "INR",
        name: "GK-Gym Life",
        description: `Personal Trainer Plan: ${trainerName}`,
        prefill: {
          name: orderResult.customerName || userName || "",
          email: orderResult.customerEmail || userEmail || "",
          contact: orderResult.customerPhone || userPhone || "",
        },
        theme: { color: "#D7FF00" },
        handler: async function (response: any) {
          try {
            toast.loading("Verifying payment...", { id: "trainer-pay" });
            const verifyRes = await verifyTrainerPaymentAndAssign({
              orderId: response?.razorpay_order_id || orderResult?.orderId || "",
              paymentId: response.razorpay_payment_id,
              signature: response?.razorpay_signature || "",
              trainerId,
              amount,
              isAutoPay: false,
              userId,
            });

            if (verifyRes.success) {
              queryClient.invalidateQueries({ queryKey: ["individualCustomerPayments"] });
              queryClient.invalidateQueries({ queryKey: ["individualCustomerTrainers"] });
              queryClient.invalidateQueries({ queryKey: ["individualCustomerTrainerPayments"] });
              toast.success(`Booking confirmed with ${trainerName}!`, { id: "trainer-pay" });
              onSuccess?.();
              onClose();
              if (typeof window !== "undefined") {
                window.location.href = "/customer";
              } else {
                router.refresh();
              }
            } else {
              toast.error(verifyRes.error || "Payment verification failed.", { id: "trainer-pay" });
            }
          } catch {
            toast.error("Payment confirmation failed on server.", { id: "trainer-pay" });
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: () => setIsProcessing(false),
        },
      };

      if (orderResult.orderId) {
        options.order_id = orderResult.orderId;
      }

      const razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.on("payment.failed", function (response: any) {
        toast.error(response.error?.description || "Payment failed or was cancelled.");
        setIsProcessing(false);
      });
      razorpayInstance.open();
    } catch {
      toast.error("An error occurred while connecting to Razorpay.");
      setIsProcessing(false);
    }
  };

  return { isProcessing, handlePayTrainer };
}
