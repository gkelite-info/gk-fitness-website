"use client";

import { use } from "react";
import { useSearchParams } from "next/navigation";
import PlanDetailsHeader from "./_components/PlanDetailsHeader";
import PlanDetailsHero from "./_components/PlanDetailsHero";
import PlanRecentPurchases from "./_components/PlanRecentPurchases";
import PlanActiveMembers from "./_components/PlanActiveMembers";

import { useUser } from "@/app/context/UserContext";
import { useFinanceDashboard } from "@/lib/hooks/finance/useFinanceDashboard";
import { CircleNotch } from "@phosphor-icons/react/dist/ssr";

interface PageProps {
  params: Promise<{
    planId: string;
  }>;
}

export default function MembershipPlanDetailsPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  
  const { user, roleData } = useUser();
  const userId = user?.id || null;
  const gymId = roleData?.[0]?.gymId || null;
  const selectedYear = new Date().getFullYear();

  const { revenueByPlan, allTransactions, customersData, customerPlans, isLoading } = useFinanceDashboard(userId, gymId, selectedYear);

  // Use the name from query params, fallback to generic "Membership Plan" if not provided
  const queryName = searchParams.get('name');
  const planName = queryName ? `${queryName} Membership` : "Membership Plan";

  const planId = resolvedParams.planId;
  const planInfo = revenueByPlan.find(p => p.planId === planId);
  const activeMembers = planInfo?.members || 0;
  const revenue = planInfo?.revenue || 0;
  const renewals = activeMembers > 0 ? Math.floor(activeMembers * 0.15) : 0; // Mock renewals based on members

  const planTransactions = allTransactions?.filter((tx: any) => tx.planId === planId) || [];
  
  const planMembers = customerPlans?.filter((cp: any) => cp.planId === planId).map((cp: any) => {
    const customer = customersData?.find((c: any) => c.customerId === cp.customerId);
    const user = customer?.users;
    return {
      name: user?.name || customer?.fullName || 'Unknown',
      joined: customer?.joiningDate || customer?.createdAt || cp.createdAt,
      expires: cp.endDate,
      status: cp.status || (cp.is_Active ? 'Active' : 'Inactive'),
      gender: user?.gender || customer?.gender || 'male'
    };
  }) || [];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 w-full min-h-screen bg-[#0C0E11]">
        <CircleNotch size={32} className="text-[#CCFF00] animate-spin mb-4" />
        <span className="font-['Sora'] text-[#8590A2]">Loading plan details...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start p-4 md:p-6 lg:p-8 w-full min-h-screen bg-[#0C0E11] gap-6 overflow-y-auto">
      
      {/* Header Area */}
      <PlanDetailsHeader planName={planName} />

      {/* Hero Section */}
      <PlanDetailsHero 
        planName={planName} 
        activeMembers={activeMembers}
        revenue={revenue}
        renewals={renewals}
      />

      {/* Main Content Areas */}
      <div className="flex flex-col lg:flex-row w-full gap-5">
        <div className="flex flex-col flex-1 w-full lg:w-auto min-w-0">
          <PlanRecentPurchases purchases={planTransactions} />
        </div>
        <div className="flex flex-col flex-[2] w-full lg:w-auto min-w-0">
          <PlanActiveMembers members={planMembers} />
        </div>
      </div>

    </div>
  );
}
