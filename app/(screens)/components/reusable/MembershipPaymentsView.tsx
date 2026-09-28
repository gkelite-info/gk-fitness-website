"use client";

import React from "react";
import MembershipPaymentsHeader from "./membership-payments/MembershipPaymentsHeader";
import PlanHeroCard from "./membership-payments/PlanHeroCard";
import PaymentHistoryTable from "./membership-payments/PaymentHistoryTable";
import { MembershipPaymentsData, PaymentRecord } from "./membership-payments/types";

// Re-export types for consumers
export type { MembershipPaymentsData, PaymentRecord };

interface MembershipPaymentsViewProps {
  data: MembershipPaymentsData;
  onEditPlan?: () => void;
}

export default function MembershipPaymentsView({ data, onEditPlan }: MembershipPaymentsViewProps) {
  return (
    <div className="flex flex-col items-start px-4 sm:px-6 py-6 gap-6 w-full max-w-[1051px] mx-auto overflow-y-auto scrollbar-themed h-full bg-[#111319]">
      
      {/* Header section */}
      <MembershipPaymentsHeader 
        memberCode={data.memberCode} 
        onEditPlan={onEditPlan} 
      />

      {/* Plan Hero Card */}
      <PlanHeroCard 
        plan={data.plan} 
        onEditPlan={onEditPlan} 
      />

      {/* Payment History Table */}
      <PaymentHistoryTable 
        payments={data.payments} 
      />

    </div>
  );
}
