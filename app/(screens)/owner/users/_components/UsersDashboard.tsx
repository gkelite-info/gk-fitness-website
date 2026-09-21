"use client";

import { useState, useEffect } from "react";
import UsersHeader from "./UsersHeader";
import UsersTopBar from "./UsersTopBar";
import UsersFilterBar from "./UsersFilterBar";
import CustomersGrid from "./CustomersGrid";
import CustomersTable from "./CustomersTable";
import Pagination from "../../../components/reusable/Pagination";
import { useUser } from "@/app/context/UserContext";
import { useCustomers } from "@/lib/hooks/users/useCustomers";
import { useTrainers } from "@/lib/hooks/users/useTrainers";
import { useMembershipPlans } from "@/lib/hooks/membership/useMembershipPlans";
import { useGymCustomerMembershipPlans } from "@/lib/hooks/useGymCustomerMembershipPlans";
import PastCustomersModal from "./PastCustomersModal";
import { Customer } from "./CustomersGrid";

export default function UsersDashboard() {
  const { user, roleData } = useUser();
  const userId = user?.id;
  const gymId = roleData?.[0]?.gymId;

  const [activeTab, setActiveTab] = useState<"customers" | "trainers">("customers");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [planFilter, setPlanFilter] = useState<string>("All");

  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [isPastCustomersModalOpen, setIsPastCustomersModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setCurrentPage(1);
    }, 400);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const apiFilter = activeFilter === "All" ? "all" : activeFilter === "Active" ? "active" : "expired";

  const { data: plansData } = useMembershipPlans(gymId || null);
  const plans = plansData || [];

  const { data: customerPlansData } = useGymCustomerMembershipPlans(userId || null);
  const customerPlans = customerPlansData || [];

  const customersQuery = useCustomers(gymId || null, apiFilter, debouncedSearch, planFilter);
  const trainersQuery = useTrainers(gymId || null, apiFilter, debouncedSearch);

  useEffect(() => {
    if (activeTab === "customers") {
      if (customersQuery.data?.pages && currentPage > customersQuery.data.pages.length && customersQuery.hasNextPage && !customersQuery.isFetchingNextPage) {
        customersQuery.fetchNextPage();
      }
    } else {
      if (trainersQuery.data?.pages && currentPage > trainersQuery.data.pages.length && trainersQuery.hasNextPage && !trainersQuery.isFetchingNextPage) {
        trainersQuery.fetchNextPage();
      }
    }
  }, [currentPage, activeTab, customersQuery, trainersQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, activeFilter, planFilter]);

  const activeQuery = activeTab === "customers" ? customersQuery : trainersQuery;

  const currentPageData = activeQuery.data?.pages?.[currentPage - 1]?.data || [];
  const totalCount = activeQuery.data?.pages?.[0]?.count || 0;
  const totalPages = Math.ceil(totalCount / itemsPerPage) || 1;

  const displayCustomers: Customer[] = currentPageData.map((item: any, index: number) => {
    const isActive = item.is_Active;
    const joinedDate = item.dateOfJoining || item.createdAt;
    const formattedJoinedDate = joinedDate ? new Date(joinedDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A';

    let planName = "No Plan";
    let validTill = "N/A";

    if (activeTab === "customers") {
      const custId = item.customerId || item.id;
      const matchedCustomerPlan = (customerPlans || []).find((cp: any) => cp.customerId === custId && !cp.is_deleted);

      if (matchedCustomerPlan) {
        planName = matchedCustomerPlan.gym_membership_plans?.planName || plans.find((p: any) => p.id === matchedCustomerPlan.planId)?.name || "Unknown";
        if (matchedCustomerPlan.endDate) {
          validTill = new Date(matchedCustomerPlan.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        }
      } else if (item.gym_customer_membership_plans && item.gym_customer_membership_plans.length > 0) {
        const activeAssoc = item.gym_customer_membership_plans.find((p: any) => !p.is_deleted) || item.gym_customer_membership_plans[0];
        planName = activeAssoc.gym_membership_plans?.planName || plans.find((p: any) => p.id === activeAssoc.planId)?.name || "Unknown";
        if (activeAssoc.endDate) {
          validTill = new Date(activeAssoc.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        }
      }
    } else if (activeTab === "trainers") {
      planName = item.specialization || "General Fitness";
    }

    const idPrefix = activeTab === "customers" ? "CUST" : "TRN";
    const displayId = `${idPrefix}-${String((currentPage - 1) * itemsPerPage + index + 1).padStart(4, '0')}`;

    return {
      id: displayId,
      name: item.fullName || "?",
      status: isActive ? "Active" : "Inactive",
      phone: item.phone || "No phone",
      plan: planName,
      joinedDate: formattedJoinedDate,
      validTill
    };
  });

  return (
    <div className="flex flex-col w-full h-full pb-8">
      <UsersHeader />
      <UsersTopBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        totalCount={totalCount}
        onShowPastCustomers={() => setIsPastCustomersModalOpen(true)}
      />
      <UsersFilterBar
        activeTab={activeTab}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        planFilter={planFilter}
        onPlanFilterChange={setPlanFilter}
        plans={plans}
      />

      {activeQuery.isLoading ? (
        <div className="flex items-center justify-center py-20 mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#D2F829]"></div>
        </div>
      ) : displayCustomers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-[#161616] border border-[#242424] rounded-3xl mt-8">
          <span className="text-white text-lg font-semibold mt-4">No records found</span>
          <span className="text-[#888] text-sm mt-1 text-center px-8">
            {searchQuery
              ? 'No matching records for your search query.'
              : `You haven't added any ${activeTab} yet.`}
          </span>
        </div>
      ) : (
        <>
          {viewMode === "grid" ? (
            <CustomersGrid customers={displayCustomers} userType={activeTab} />
          ) : (
            <CustomersTable customers={displayCustomers} userType={activeTab} />
          )}

          <div className="mt-8 flex justify-center w-full">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalCount}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      )}

      {isPastCustomersModalOpen && gymId && (
        <PastCustomersModal
          gymId={gymId}
          onClose={() => setIsPastCustomersModalOpen(false)}
        />
      )}
    </div>
  );
}
