"use client";

import { useRouter } from "next/navigation";
import { usePaymentSession } from "./usePaymentSession";
import PaymentRecoveryBanner from "./PaymentRecoveryBanner";

export default function PaymentAutoRecovery() {
  const router = useRouter();
  const { activeSession, isChecking, resumePayment, clearSession } = usePaymentSession(() => {
    router.refresh();
  });

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
