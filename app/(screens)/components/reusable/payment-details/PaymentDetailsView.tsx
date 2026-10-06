"use client";

import { useMemo } from "react";
import PaymentDetailsHeader from "./PaymentDetailsHeader";
import InvoiceTemplate from "./InvoiceTemplate";
import { PaymentDetailsData } from "./types";
import { useGymCustomerById } from "@/lib/hooks/customers/useGymCustomers";
import { useGym } from "@/lib/hooks/gyms/useGym";
import { useCustomerGymPayments } from "@/lib/hooks/customerGymPayments/useCustomerGymPayments";
import { useCustomerSpecificGymPayments } from "@/lib/hooks/useGymPayments";
import { useGymMembershipPlans } from "@/lib/hooks/useGymMembershipPlans";
import { useGymCustomerMembershipPlans } from "@/lib/hooks/gymCustomerMembershipPlans/useGymCustomerMembershipPlans";

interface PaymentDetailsViewProps {
  userId?: string;
  paymentId?: string;
}

export default function PaymentDetailsView({ userId, paymentId }: PaymentDetailsViewProps) {
  const { data: gymCustomer, isLoading: isCustomerLoading } = useGymCustomerById(userId);
  const gymId = gymCustomer?.gymId;
  const { data: gym, isLoading: isGymLoading } = useGym(gymId);
  const { data: customerPayments, isLoading: isPaymentsLoading } = useCustomerGymPayments(gymId, userId);
  const { data: gymPayments, isLoading: isGymPaymentsLoading } = useCustomerSpecificGymPayments(gymId, userId);
  const { data: membershipPlans, isLoading: isPlansLoading } = useGymMembershipPlans(gymId);
  const { data: customerMembershipPlans, isLoading: isCustomerPlansLoading } = useGymCustomerMembershipPlans(gymId, userId);

  const data: PaymentDetailsData | null = useMemo(() => {
    if (!gymCustomer || !customerPayments || !paymentId) return null;

    const allPayments = [
      ...(customerPayments || []),
      ...(gymPayments || [])
    ];

    const payment = allPayments.find(p => (p.customerPaymentId === paymentId) || (p.paymentId === paymentId) || (p.gymPaymentId === paymentId));
    if (!payment) return null;

    const memberCode = (gymCustomer.gymId && gymCustomer.customerId)
      ? `#${gymCustomer.gymId.substring(0, 4)}-${gymCustomer.customerId.substring(0, 4)}`.toUpperCase()
      : "--";

    // Find customer's active or related plan to get validTill
    const customerPlan = customerMembershipPlans?.find(p => p.planId === payment.planId) || customerMembershipPlans?.[0];

    // Extract plan details directly from the joined objects
    const planName = (payment as any)?.plan?.planName || (payment as any)?.gym_membership_plans?.planName || "No Plan";
    const durationMonths = (payment as any)?.plan?.durationMonths || (payment as any)?.gym_membership_plans?.durationMonths;

    const formatDate = (dateStr: string) => {
      const d = new Date(dateStr);
      return isNaN(d.getTime()) ? "--" : d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const formatTime = (dateStr: string) => {
      const d = new Date(dateStr);
      return isNaN(d.getTime()) ? "--" : d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    return {
      paymentId: paymentId,
      memberCode: memberCode,
      memberName: gymCustomer.fullName || "--",
      phone: gymCustomer.phone || "--",
      email: gymCustomer.email || "--",
      memberStatus: customerPlan?.is_Active ? "Active Membership" : "Inactive Membership",
      membershipPlan: planName,
      planDuration: durationMonths ? `${durationMonths} Month(s)` : "--",
      planValidTill: customerPlan?.endDate ? formatDate(customerPlan.endDate) : "--",
      amountPaid: payment.amountPaid || payment.amount || 0,
      paymentMethod: payment.paymentMethod || "--",
      transactionId: payment.transactionId || "--",
      paymentDate: payment.createdAt ? formatDate(payment.createdAt as string) : "--",
      paymentTime: payment.createdAt ? formatTime(payment.createdAt as string) : "--",
      paymentStatus: (payment.status?.toUpperCase() === "SUCCESSFUL" || payment.status?.toUpperCase() === "SUCCESS") ? "Recorded & Verified" : (payment.status || "Recorded & Verified"),
      gymName: gym?.gymName || "GK-Gym Life",
    } as PaymentDetailsData & { gymName: string };
  }, [gymCustomer, customerPayments, gymPayments, paymentId, customerMembershipPlans, gym]);

  if (isCustomerLoading || isGymLoading || isPaymentsLoading || isGymPaymentsLoading || isPlansLoading || isCustomerPlansLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full text-white bg-[#111319]">
        Loading...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full text-white bg-[#111319]">
        Payment not found
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start px-4 sm:px-6 py-8 gap-6 w-full max-w-[1024px] mx-auto overflow-y-auto scrollbar-themed h-full bg-[#111319]">
      <PaymentDetailsHeader data={data} />
      <div id="payment-invoice-content" className="flex flex-col gap-6 w-full relative">
        <InvoiceTemplate data={data} />
      </div>
    </div>
  );
}
