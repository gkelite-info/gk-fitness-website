"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus } from "@phosphor-icons/react";
import Pagination from "../../components/reusable/Pagination";
import PlanCard from "../../components/reusable/cards/PlanCard";
import { useSubscriptions } from "@/lib/hooks/superadmin/subscriptions/subscriptions";

function PlansSubscriptionsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "gyms";

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { data: plansData = [], isLoading, error } = useSubscriptions(undefined, currentTab);

  useEffect(() => {
    setCurrentPage(1);
  }, [currentTab]);

  useEffect(() => {
    console.log(`[PlansPage] Loaded ${plansData.length} plans for tab "${currentTab}":`, plansData);
    if (error) {
      console.error(`[PlansPage] Error loading plans for tab "${currentTab}":`, error);
    }
  }, [plansData, currentTab, error]);

  const activePlans = plansData.map((plan: any) => {
    const activeFeatures = (plan.subscription_features || [])
      .filter((f: any) => !f.is_deleted)
      .map((f: any) => f.featureName);

    const formattedPrice = plan.price != null
      ? Number(plan.price).toLocaleString("en-IN")
      : "0";

    return {
      id: plan.subscriptionPlanId,
      name: plan.planName,
      status: plan.isActive ? "Active" : "Inactive",
      price: formattedPrice,
      billingCycle: plan.planFor === "gyms" ? "/ month" : "",
      badge: plan.label || null,
      features: activeFeatures,
    };
  });

  const totalItems = activePlans.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedPlans = activePlans.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleTabChange = (tab: string) => {
    router.push(`?tab=${tab}`);
  };

  return (
    <div className="w-full h-full p-6 sm:p-8 flex flex-col gap-6 bg-[#0C0D10] text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-[22px] sm:text-[24px] font-bold tracking-tight text-white leading-tight">
            Plans & Subscriptions
          </h1>
          <p className="text-[11.5px] font-normal text-[#9CA3AF]">
            Create and manage subscription plans for gym owners and individual customers.
          </p>
        </div>
        <button onClick={() => router.push("/superadmin/plans/add")} className="hidden sm:flex cursor-pointer px-4 py-2 bg-[#BBF246] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-[6px] text-black font-semibold text-[11.5px] items-center justify-center gap-1.5 transition-all active:scale-[0.98] shrink-0 self-auto touch-manipulation">
          <Plus size={13} weight="bold" />
          Add Plan
        </button>
      </div>

      <div className="flex flex-row items-center justify-between sm:justify-start w-full sm:w-auto gap-4">
        <div className="flex flex-row items-center bg-[#101620] border border-[#1D2634] p-1 rounded-[6.5px] shrink-0">
          <button
            onClick={() => handleTabChange("gyms")}
            className={`cursor-pointer px-4 py-1.5 rounded-[5px] text-[10px] font-semibold transition-all ${
              currentTab === "gyms"
                ? "bg-[#172216] border border-[#364923] text-[#BBF246] shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                : "text-[#9CA3AF] hover:text-white border border-transparent"
            }`}
          >
            Gyms
          </button>
          <button
            onClick={() => handleTabChange("customers")}
            className={`cursor-pointer px-4 py-1.5 rounded-[5px] text-[10px] font-semibold transition-all ${
              currentTab === "customers"
                ? "bg-[#172216] border border-[#364923] text-[#BBF246] shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                : "text-[#9CA3AF] hover:text-white border border-transparent"
            }`}
          >
            Customers
          </button>
        </div>

        <button onClick={() => router.push("/superadmin/plans/add")} className="sm:hidden cursor-pointer px-4 py-2 bg-[#BBF246] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-[6px] text-black font-semibold text-[11.5px] flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] shrink-0 touch-manipulation whitespace-nowrap">
          <Plus size={13} weight="bold" />
          Add Plan
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 w-full">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-[#111722] border border-[#1B2533] rounded-[10px] p-5 h-[340px] animate-pulse flex flex-col justify-between">
              <div className="flex flex-col gap-4">
                <div className="h-5 bg-[#1D2634] rounded w-2/3" />
                <div className="h-4 bg-[#1D2634] rounded w-1/3" />
                <div className="h-8 bg-[#1D2634] rounded w-1/2 mt-2" />
                <div className="flex flex-col gap-2 mt-4">
                  <div className="h-3 bg-[#1D2634] rounded w-full" />
                  <div className="h-3 bg-[#1D2634] rounded w-4/5" />
                  <div className="h-3 bg-[#1D2634] rounded w-3/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : activePlans.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center py-16 px-4 bg-[#101620] border border-[#1D2634] rounded-xl text-center">
          <p className="text-sm font-semibold text-white mb-1">
            No plans found for {currentTab === "gyms" ? "Gyms" : "Customers"}
          </p>
          <p className="text-xs text-[#9CA3AF] mb-4">Click "Add Plan" to create your first subscription plan.</p>
          <button onClick={() => router.push("/superadmin/plans/add")} className="cursor-pointer px-4 py-2 bg-[#BBF246] rounded-[6px] text-black font-semibold text-xs flex items-center gap-1.5 transition-all hover:brightness-110 active:scale-[0.98]">
            <Plus size={14} weight="bold" /> Add Plan
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 w-full">
          {paginatedPlans.map((plan) => (
            <PlanCard key={plan.id} {...plan} />
          ))}
        </div>
      )}

      {totalItems > 12 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}

export default function PlansSubscriptionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0E0F13] flex items-center justify-center text-white">Loading plans...</div>}>
      <PlansSubscriptionsContent />
    </Suspense>
  );
}
