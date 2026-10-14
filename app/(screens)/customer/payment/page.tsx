import { Suspense } from "react";
import { getMembership } from "@/app/actions/customer/getMembership";
import PaymentClientView from "./PaymentClientView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Membership Checkout | GK-Gym Life",
  description: "Secure payment gateway for GK-Gym Life membership renewals.",
};

export default async function CustomerPaymentPage({
  searchParams,
}: {
  searchParams: Promise<{ planId?: string }>;
}) {
  const membership = await getMembership();
  const resolvedSearchParams = await searchParams;

  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-[50vh]">
          <div className="w-10 h-10 border-2 border-[#D7FF00] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <PaymentClientView
        gymId={membership?.gymId || ""}
        customerId={membership?.customerId || ""}
        preselectedPlanId={resolvedSearchParams?.planId}
      />
    </Suspense>
  );
}
