"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, MagnifyingGlass } from "@phosphor-icons/react";
import PlanCard from "./components/PlanCard";
import RetentionSummary from "./components/RetentionSummary";
import Dropdown from "@/app/(screens)/components/reusable/Dropdown";
import { useUser } from "@/app/context/UserContext";
import { useGymMembershipPlans } from "@/lib/hooks/useGymMembershipPlans";
import { useGymCustomerMembershipPlans } from "@/lib/hooks/useGymCustomerMembershipPlans";
import { useGymPayments } from "@/lib/hooks/useGymPayments";
import { useQuery } from "@tanstack/react-query";
import { getOwnerGymId } from "@/lib/helpers/trainers/trainerHelper";
import { fetchCustomerGymPayments } from "@/lib/helpers/customerGymPayments/customerGymPayments";

export default function MembershipPlansPage() {
  const { user } = useUser();
  const { data: rawPlans, isLoading: isPlansLoading } = useGymMembershipPlans(user?.id || null);
  const { data: customerPlans } = useGymCustomerMembershipPlans(user?.id || null);
  const { data: manualPayments } = useGymPayments(user?.id || null);

  const { data: customerPayments } = useQuery({
    queryKey: ['allCustomerPaymentsForGym', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const gymId = await getOwnerGymId(user.id);
      if (!gymId) return [];
      return await fetchCustomerGymPayments(gymId);
    },
    enabled: !!user?.id,
  });

  const payments = [...(manualPayments || []), ...(customerPayments || [])];

  const [activeTab, setActiveTab] = useState("Active Plans");
  const [billingCycle, setBillingCycle] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const billingOptions = [
    { label: "All Billing Cycles", value: "all" },
    { label: "Monthly", value: "monthly" },
    { label: "Quarterly", value: "quarterly" },
    { label: "Yearly", value: "yearly" },
  ];

  const formattedPlans = (rawPlans || []).map((plan: any) => {
    const extractedFeatures = plan.gym_membership_plan_features
      ?.map((f: any) => f.features?.featureName)
      .filter(Boolean) || [];

    const featuresList = extractedFeatures.length > 0
      ? extractedFeatures
      : [];

    const rawDur = plan.durationMonths;
    let durationStr = "1 Month";
    let isYearly = false;
    let isMonthly = false;
    let isQuarterly = false;

    if (rawDur) {
      const s = String(rawDur).toLowerCase().trim();
      if (s.includes("year")) {
        const num = parseInt(s.match(/\d+/)?.[0] || "1", 10);
        durationStr = num === 1 ? "1 Year" : `${num} Years`;
        isYearly = true;
      } else {
        const num = parseInt(s.match(/\d+/)?.[0] || "1", 10);
        if (num >= 12) {
          durationStr = num === 12 ? "1 Year" : `${num / 12} Years`;
          isYearly = true;
        } else {
          durationStr = num === 1 ? "1 Month" : `${num} Months`;
          if (num === 3) isQuarterly = true;
          else isMonthly = true;
        }
      }
    } else {
      isMonthly = true;
    }

    const membersCount = (customerPlans || []).filter(
      (cp: any) => cp.planId === plan.planId
    ).length;

    return {
      id: plan.planId,
      title: plan.planName || "Membership Plan",
      price: `₹${Number(plan.price || 0).toLocaleString("en-IN")}`,
      period: isYearly ? "/ Year" : "/ Month",
      status: plan.is_deleted ? "Inactive" : (plan.is_Active ? "Active" : "Inactive"),
      features: featuresList,
      duration: durationStr,
      members: membersCount,
      isYearly,
      isMonthly,
      isQuarterly,
    };
  });

  const filteredPlans = formattedPlans.filter((plan) => {
    if (searchQuery && !plan.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (billingCycle === "monthly" && !plan.isMonthly) return false;
    if (billingCycle === "quarterly" && !plan.isQuarterly) return false;
    if (billingCycle === "yearly" && !plan.isYearly) return false;
    if (activeTab === "Active Plans" && plan.status !== "Active") return false;
    if (activeTab === "Inactive Plans" && plan.status !== "Inactive") return false;
    return true;
  });

  const dotColors = ["bg-[#F59E0B]", "bg-[#D4FF32]", "bg-[#A855F7]", "bg-[#34D399]", "bg-[#22D3EE]", "bg-[#FB7185]"];
  
  const retentionData = filteredPlans.map((plan, index) => {
    const planPayments = (payments || []).filter((p: any) => p.planId === plan.id);
    const totalAmount = planPayments.reduce((sum: number, p: any) => sum + Number(p.amountPaid || 0), 0);
    
    const allEntriesForPlan = (customerPlans || []).filter((cp: any) => cp.planId === plan.id || cp.plan?.planId === plan.id);
    
    const customerCounts = new Map<string, number>();
    allEntriesForPlan.forEach((cp: any) => {
      customerCounts.set(cp.customerId, (customerCounts.get(cp.customerId) || 0) + 1);
    });
    
    const totalUniqueCustomers = customerCounts.size;
    let renewedCustomers = 0;
    customerCounts.forEach(count => {
      if (count > 1) renewedCustomers++;
    });
    
    let renewalRateStr = "—";
    if (totalUniqueCustomers > 0) {
      renewalRateStr = `${((renewedCustomers / totalUniqueCustomers) * 100).toFixed(1)}%`;
    }

    const dotColor = dotColors[index % dotColors.length];

    return {
      tierName: plan.title,
      duration: plan.duration,
      monthlyRate: plan.price,
      activeMembers: `${plan.members} Members`,
      currentMrr: `₹${totalAmount.toLocaleString("en-IN")}`,
      renewalRate: renewalRateStr,
      status: plan.status,
      dotColor,
    };
  });

  const activeCount = formattedPlans.filter((p) => p.status === "Active").length;
  const inactiveCount = formattedPlans.filter((p) => p.status === "Inactive").length;

  const tabs = [
    { name: "Active Plans", count: activeCount },
    { name: "Inactive Plans", count: inactiveCount },
  ];

  return (
    <div className="w-full h-full flex flex-col p-6 md:p-8 overflow-y-auto scrollbar-themed">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 mt-2 w-full">
        <div className="flex flex-col gap-1">
          <h1 className="text-white text-[24px] font-[800] font-['Plus_Jakarta_Sans',sans-serif] leading-[32px] tracking-[-0.6px] m-0">
            Membership Plans
          </h1>
          <p className="text-[#9CA3AF] text-[14px] font-[400] font-['Plus_Jakarta_Sans',sans-serif] leading-[20px] m-0">
            Manage and configure membership tiers, pricing, and member perks
          </p>
        </div>
        <Link href="/owner/membership-plans/create">
          <button className="h-[40px] px-4 py-2.5 rounded-[12px] bg-[#D4FF00] text-black font-bold font-['Plus_Jakarta_Sans',sans-serif] text-[14px] leading-[20px] flex items-center justify-center gap-2 hover:bg-[#c2eb00] transition-colors shrink-0 shadow-[0px_4px_20px_-3px_rgba(212,255,0,0.35)] relative cursor-pointer">
            <div className="absolute inset-0 bg-white/0 rounded-[12px] shadow-[0px_4px_20px_-3px_rgba(212,255,0,0.35)] pointer-events-none" />
            <Plus size={20} weight="bold" className="relative z-10" />
            <span className="relative z-10">Create New Plan</span>
          </button>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-8 w-full border-b border-[#20252B]">
        <div className="flex flex-row items-end gap-[24px] w-full lg:w-auto overflow-x-auto overflow-y-hidden scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className="flex flex-col justify-end h-[44px] cursor-pointer outline-none shrink-0"
              >
                <div className="flex flex-row items-center gap-[6px] mb-[12px]">
                  <span className={`font-['Plus_Jakarta_Sans',sans-serif] text-[14px] leading-[20px] whitespace-nowrap ${
                    isActive ? "font-[700] text-[#FFFFFF]" : "font-[600] text-[#9CA3AF]"
                  }`}>
                    {tab.name}
                  </span>
                  <div
                    className={`px-2 flex flex-col items-center justify-center h-[16px] rounded-full ${
                      isActive ? "bg-[#D4FF00]" : "bg-[#20252B]"
                    }`}
                  >
                    <span className={`font-['Plus_Jakarta_Sans',sans-serif] font-[700] text-[12px] leading-[16px] ${
                      isActive ? "text-[#000000]" : "text-[#D1D5DB]"
                    }`}>
                      {tab.count}
                    </span>
                  </div>
                </div>
                {isActive ? (
                  <div className="h-[2px] w-full bg-[#D4FF00] rounded-t-[4px] shadow-[0px_-2px_12px_1px_rgba(212,255,0,0.7)]" />
                ) : (
                  <div className="h-[2px] w-full bg-transparent" />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex flex-row items-center gap-[12px] w-full lg:w-auto pb-[12px]">
          <Dropdown
            options={billingOptions}
            value={billingCycle}
            onChange={setBillingCycle}
            triggerClassName="h-[34px] pl-[14px] pr-[12px] py-[8px] bg-[#171B20] border border-[#262B32] rounded-[12px] flex flex-row items-center justify-between text-[#D1D5DB] hover:text-white hover:border-[#333845] transition-colors w-[177px] shrink-0 cursor-pointer"
          />

          <div className="relative w-[176px] h-[34px] shrink-0">
            <MagnifyingGlass
              size={14}
              className="absolute left-[10px] top-1/2 -translate-y-1/2 text-[#6B7280]"
            />
            <input
              type="text"
              placeholder="Search plans..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-full pl-[32px] pr-[12px] py-[8px] bg-[#171B20] border border-[#262B32] rounded-[12px] text-white placeholder-[#6B7280] font-['Plus_Jakarta_Sans',sans-serif] text-[12px] leading-[15px] focus:outline-none focus:border-[#D4FF00] transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-row overflow-x-auto gap-6 mb-12 w-[calc(100%+48px)] -ml-6 px-6 md:w-full md:ml-0 md:px-0 justify-start pb-4 scrollbar-themed snap-x">
        {isPlansLoading ? (
          <div className="text-[#9CA3AF] text-[14px] py-8 font-['Plus_Jakarta_Sans',sans-serif]">Loading plans...</div>
        ) : filteredPlans.length === 0 ? (
          <div className="text-[#9CA3AF] text-[14px] py-8 font-['Plus_Jakarta_Sans',sans-serif]">No membership plans found.</div>
        ) : (
          filteredPlans.map((plan) => (
            <PlanCard key={plan.id} {...plan} />
          ))
        )}
      </div>

      <RetentionSummary data={retentionData} />
    </div>
  );
}
