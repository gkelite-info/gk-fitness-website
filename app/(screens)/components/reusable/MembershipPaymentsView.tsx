"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import MembershipPaymentsHeader from "./membership-payments/MembershipPaymentsHeader";
import PlanHeroCard from "./membership-payments/PlanHeroCard";
import PaymentHistoryTable from "./membership-payments/PaymentHistoryTable";
import { MembershipPaymentsData, PaymentRecord } from "./membership-payments/types";
import { useGymCustomerById } from "@/lib/hooks/customers/useGymCustomers";
import { useGymCustomerMembershipPlans } from "@/lib/hooks/gymCustomerMembershipPlans/useGymCustomerMembershipPlans";
import { useCustomerGymPayments } from "@/lib/hooks/customerGymPayments/useCustomerGymPayments";
import { useCustomerSpecificGymPayments } from "@/lib/hooks/useGymPayments";
import { useGymMembershipPlans } from "@/lib/hooks/useGymMembershipPlans";

export type { MembershipPaymentsData, PaymentRecord };

interface MembershipPaymentsViewProps {
  onEditPlan?: () => void;
  userId?: string;
}

export default function MembershipPaymentsView({ onEditPlan, userId }: MembershipPaymentsViewProps) {
  const router = useRouter();

  const { data: gymCustomer, isLoading: isCustomerLoading } = useGymCustomerById(userId);
  const gymId = gymCustomer?.gymId;

  const { data: customerPlans, isLoading: isPlansLoading } = useGymCustomerMembershipPlans(gymId, userId);
  const { data: membershipPlans, isLoading: isMembershipPlansLoading } = useGymMembershipPlans(gymId);
  const { data: customerPayments, isLoading: isPaymentsLoading } = useCustomerGymPayments(gymId, userId);
  const { data: gymPayments, isLoading: isGymPaymentsLoading } = useCustomerSpecificGymPayments(gymId, userId);

  const activeCustomerPlan = useMemo(() => {
    if (!customerPlans || customerPlans.length === 0) return null;
    return customerPlans.find(p => p.is_Active) || customerPlans[0];
  }, [customerPlans]);

  const activePlanDetails = useMemo(() => {
    if (!activeCustomerPlan || !membershipPlans) return null;
    return membershipPlans.find(p => p.planId === activeCustomerPlan.planId);
  }, [activeCustomerPlan, membershipPlans]);

  const data: MembershipPaymentsData = useMemo(() => {
    const formatDate = (dateStr: string) => {
      const d = new Date(dateStr);
      return isNaN(d.getTime()) ? "--" : d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const memberCode = (gymCustomer?.gymId && gymCustomer?.customerId)
      ? `#${gymCustomer.gymId.substring(0, 4)}-${gymCustomer.customerId.substring(0, 4)}`.toUpperCase()
      : "--";

    const formattedStartDate = activeCustomerPlan?.startDate ? formatDate(activeCustomerPlan.startDate) : "--";
    const formattedEndDate = activeCustomerPlan?.endDate ? formatDate(activeCustomerPlan.endDate) : "--";

    const plan = {
      name: (activeCustomerPlan as any)?.plan?.planName || (activeCustomerPlan as any)?.gym_membership_plans?.planName || (activePlanDetails as any)?.planName || activePlanDetails?.name || "No Plan Assigned",
      tier: "Tier 03",
      status: (activeCustomerPlan?.is_Active ? "ACTIVE" : "INACTIVE") as "ACTIVE" | "INACTIVE",
      startDate: formattedStartDate,
      expiryDate: formattedEndDate,
      planStatus: (activeCustomerPlan?.is_Active ? "Active" : "Expired") as "Active" | "Expired" | "Cancelled",
      renewalDate: formattedEndDate,
    };

    const allPayments = [
      ...(customerPayments || []),
      ...(gymPayments || [])
    ].sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());

    const payments: PaymentRecord[] = allPayments.map(p => ({
      id: p.customerPaymentId || p.paymentId || "",
      date: p.createdAt ? formatDate(p.createdAt as string) : "--",
      amount: p.amountPaid || 0,
      method: p.paymentMethod || "--",
      transactionId: p.transactionId || "--",
      status: p.status || "Success",
    }));

    return {
      memberCode,
      plan,
      payments
    };
  }, [gymCustomer, activeCustomerPlan, activePlanDetails, customerPayments, gymPayments]);

  if (isCustomerLoading || isPlansLoading || isPaymentsLoading || isMembershipPlansLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full text-white bg-[#111319]">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start px-4 sm:px-6 py-6 gap-6 w-full max-w-[1051px] mx-auto overflow-y-auto scrollbar-themed h-full bg-[#111319]">

      <MembershipPaymentsHeader
        memberCode={data.memberCode}
        onEditPlan={onEditPlan}
      />

      <PlanHeroCard
        plan={data.plan}
      // onEditPlan={onEditPlan}
      />

      <PaymentHistoryTable
        payments={data.payments}
        onViewDetails={(paymentId) => {
          if (userId) {
            router.push(`/owner/users/${userId}/payment-details/${paymentId}`);
          }
        }}
      />
    </div>
  );
}
