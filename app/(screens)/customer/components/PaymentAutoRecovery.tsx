"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { checkAndVerifyOrderStatus } from "@/app/actions/customer/checkAndVerifyOrderStatus";
import { dismissRazorpay } from "@/lib/helpers/razorpay/dismissRazorpay";
import { usePaymentSession } from "./usePaymentSession";
import PaymentRecoveryBanner from "./PaymentRecoveryBanner";

export default function PaymentAutoRecovery() {
  const router = useRouter();
  const hasCheckedRecent = useRef(false);

  const { activeSession, isChecking, resumePayment, clearSession } = usePaymentSession(() => {
    router.refresh();
  });

  useEffect(() => {
    if (hasCheckedRecent.current) return;
    hasCheckedRecent.current = true;

    async function checkRecentPayment() {
      try {
        const res = await checkAndVerifyOrderStatus({});
        if (res.success && res.status === "paid") {
          dismissRazorpay();
          toast.success(
            res.type === "trainer"
              ? `Payment verified! Trainer booking confirmed with ${res.trainerName || "Trainer"}.`
              : `Payment verified! Plan "${res.planName || "Membership"}" activated successfully.`
          );
          router.refresh();
        }
      } catch {}
    }

    checkRecentPayment();
  }, [router]);

  if (!activeSession) return null;

  return (
    <PaymentRecoveryBanner
      planName={activeSession.planName}
      amount={activeSession.amount}
      onResume={resumePayment}
      onCancel={clearSession}
      isChecking={isChecking}
    />
  );
}
