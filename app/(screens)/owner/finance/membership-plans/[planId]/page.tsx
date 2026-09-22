"use client";

import { use } from "react";
import PlanDetailsHeader from "./_components/PlanDetailsHeader";
import PlanDetailsHero from "./_components/PlanDetailsHero";
import PlanRecentPurchases from "./_components/PlanRecentPurchases";
import PlanActiveMembers from "./_components/PlanActiveMembers";

interface PageProps {
  params: Promise<{
    planId: string;
  }>;
}

export default function MembershipPlanDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  
  // Convert slug to Display Name (e.g., 'gold' -> 'Gold Membership')
  const planName = resolvedParams.planId.charAt(0).toUpperCase() + resolvedParams.planId.slice(1) + " Membership";

  return (
    <div className="flex flex-col items-start p-4 md:p-6 lg:p-8 w-full min-h-screen bg-[#0C0E11] gap-6 overflow-y-auto">
      
      {/* Header Area */}
      <PlanDetailsHeader planName={planName} />

      {/* Hero Section */}
      <PlanDetailsHero planName={planName} />

      {/* Main Content Areas */}
      <div className="flex flex-col lg:flex-row w-full gap-5">
        <div className="flex flex-col flex-1 w-full lg:w-auto min-w-0">
          <PlanRecentPurchases />
        </div>
        <div className="flex flex-col flex-[2] w-full lg:w-auto min-w-0">
          <PlanActiveMembers />
        </div>
      </div>

    </div>
  );
}
