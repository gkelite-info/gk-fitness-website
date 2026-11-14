"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { loadRazorpayScript } from "@/lib/helpers/razorpay/loadRazorpayScript";
import { createTrainerRazorpayOrder } from "@/app/actions/customer/createTrainerRazorpayOrder";
import { createTrainerRazorpaySubscription } from "@/app/actions/customer/createTrainerRazorpaySubscription";
import { verifyTrainerPaymentAndAssign } from "@/app/actions/customer/verifyTrainerPaymentAndAssign";
import { checkAndVerifyOrderStatus } from "@/app/actions/customer/checkAndVerifyOrderStatus";
import { dismissRazorpay } from "@/lib/helpers/razorpay/dismissRazorpay";

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
  isAutoPay?: boolean;
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
  const [successInfo, setSuccessInfo] = useState<{
    itemName: string;
    amount: number;
    transactionId?: string;
  } | null>(null);

  const handleSuccessClose = () => {
    setSuccessInfo(null);
    queryClient.invalidateQueries({ queryKey: ["individualCustomerPayments"] });
    queryClient.invalidateQueries({ queryKey: ["individualCustomerTrainers"] });
    queryClient.invalidateQueries({ queryKey: ["individualCustomerTrainerPayments"] });
    queryClient.invalidateQueries({ queryKey: ["activeGlobalTrainer"] });
    onSuccess?.();
    onClose();
    router.refresh();
  };

  const handlePayTrainer = async ({
    trainerId,
    trainerName,
    amount,
    isAutoPay = true,
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

      let orderId = "";
      let subscriptionId: string | undefined = undefined;
      let keyId = "";
      let customerName = userName || "";
      let customerEmail = userEmail || "";
      let customerPhone = userPhone || "";

      if (isAutoPay) {
        const subResult = await createTrainerRazorpaySubscription({
          trainerId,
          amount,
          trainerName,
        });

        if (!subResult.success) {
          setIsProcessing(false);
          toast.error(subResult.error || "Failed to initiate payment gateway.");
          return;
        }

        subscriptionId = subResult.subscriptionId;
        orderId = subResult.subscriptionId || "";
        keyId = subResult.keyId || "";
        customerName = subResult.customerName || customerName;
        customerEmail = subResult.customerEmail || customerEmail;
        customerPhone = subResult.customerPhone || customerPhone;
      } else {
        const orderResult = await createTrainerRazorpayOrder({
          trainerId,
          amount,
          trainerName,
        });

        if (!orderResult.success) {
          setIsProcessing(false);
          toast.error(orderResult.error || "Failed to initiate payment gateway.");
          return;
        }

        orderId = orderResult.orderId || "";
        keyId = orderResult.keyId || "";
        customerName = orderResult.customerName || customerName;
        customerEmail = orderResult.customerEmail || customerEmail;
        customerPhone = orderResult.customerPhone || customerPhone;
      }

      try {
        sessionStorage.setItem(
          "gk_active_payment_session",
          JSON.stringify({
            orderId,
            subscriptionId,
            trainerId,
            trainerName,
            amount,
            paymentType: "trainerfee",
            timestamp: Date.now(),
          })
        );
      } catch {}

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
        dismissRazorpay(razorpayInstance);
        try {
          sessionStorage.removeItem("gk_active_payment_session");
        } catch {}

        queryClient.invalidateQueries({ queryKey: ["individualCustomerPayments"] });
        queryClient.invalidateQueries({ queryKey: ["individualCustomerTrainers"] });
        queryClient.invalidateQueries({ queryKey: ["individualCustomerTrainerPayments"] });
        queryClient.invalidateQueries({ queryKey: ["activeGlobalTrainer"] });

        setSuccessInfo({
          itemName: trainerName,
          amount,
          transactionId: payId,
        });
        setIsProcessing(false);
      };

      const checkPaymentStatus = async () => {
        if (isCompleted) return;
        try {
          const res = await checkAndVerifyOrderStatus({
            orderId,
            trainerId,
            paymentType: "trainerfee",
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
        description: `Personal Trainer Plan: ${trainerName}`,
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone,
        },
        theme: { color: "#D7FF00" },
        handler: async function (response: any) {
          try {
            toast.loading("Verifying payment...", { id: "trainer-pay" });
            const verifyRes = await verifyTrainerPaymentAndAssign({
              orderId: response?.razorpay_order_id || (subscriptionId ? undefined : orderId),
              subscriptionId: response?.razorpay_subscription_id || subscriptionId,
              paymentId: response.razorpay_payment_id,
              signature: response?.razorpay_signature || "",
              trainerId,
              amount,
              isAutoPay: Boolean(subscriptionId),
              userId,
            });

            if (verifyRes.success) {
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
            setIsProcessing(false);
          },
        },
      };

      if (subscriptionId) {
        options.subscription_id = subscriptionId;
      } else {
        options.order_id = orderId;
        options.amount = Math.round(amount * 100);
        options.currency = "INR";
      }

      razorpayInstance = new (window as any).Razorpay(options);
      razorpayInstance.on("payment.failed", async function () {
        await checkPaymentStatus();
      });

      razorpayInstance.open();
    } catch {
      toast.error("An error occurred while connecting to Razorpay.");
      setIsProcessing(false);
    }
  };

  return { isProcessing, handlePayTrainer, successInfo, handleSuccessClose };
}
