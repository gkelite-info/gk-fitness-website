"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus } from "@phosphor-icons/react";
import Pagination from "../../components/reusable/Pagination";
import PlanCard from "../../components/reusable/cards/PlanCard";

const MOCK_OWNER_PLANS = Array.from({ length: 4 }).map((_, i) => ({
  id: `owner-${i}`,
  name: i === 0 ? "Basic" : i === 1 ? "Silver" : i === 2 ? "Gold" : i === 3 ? "Platinum" : `Plan ${i + 1}`,
  status: "Active",
  price: i === 0 ? "999" : i === 1 ? "1,999" : i === 2 ? "3,499" : i === 3 ? "5,999" : `${(i+1) * 1000}`,
  billingCycle: "/ month",
  badge: i === 2 ? "White Label" : i === 3 ? "Premium Plan" : null,
  features: [
    "Customer Management",
    "Attendance Tracking",
    "Basic Reports",
    "Member App Access",
    "Support"
  ]
}));

const MOCK_CUSTOMER_PLANS = Array.from({ length: 4 }).map((_, i) => ({
  id: `cust-${i}`,
  name: i === 0 ? "1 Month Pass" : i === 1 ? "3 Month Pass" : "Annual Pass",
  status: "Active",
  price: i === 0 ? "1,500" : i === 1 ? "4,000" : "12,000",
  billingCycle: "",
  badge: i === 2 ? "Best Value" : null,
  features: [
    "Full Gym Access",
    "Locker Room",
    "Free Water",
    "1 PT Session",
  ]
}));

function PlansSubscriptionsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "gyms";

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    setCurrentPage(1);
  }, [currentTab]);

  const activePlans = currentTab === "gyms" ? MOCK_OWNER_PLANS : MOCK_CUSTOMER_PLANS;
  
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 w-full">
        {paginatedPlans.map((plan) => (
          <PlanCard key={plan.id} {...plan} />
        ))}
      </div>

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
