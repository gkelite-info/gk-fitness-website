"use client";

import { useState, useMemo, useEffect } from "react";
import MembershipExpiryHeader from "./_components/MembershipExpiryHeader";
import MembershipExpiryCards from "./_components/MembershipExpiryCards";
import MembershipExpiryFilterBar from "./_components/MembershipExpiryFilterBar";
import MembershipExpiryTable, { ExpiringMember } from "./_components/MembershipExpiryTable";
import Pagination from "@/app/(screens)/components/reusable/Pagination";
import { useGymCustomerMembershipPlans } from "@/lib/hooks/gymCustomerMembershipPlans/useGymCustomerMembershipPlans";
import { useUser } from "@/app/context/UserContext";

export default function MembershipExpiryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("soonest");

  const { roleData } = useUser();
  const gymId = roleData?.[0]?.gymId;

  const { data: plansData, isLoading } = useGymCustomerMembershipPlans(gymId);
  const itemsPerPage = 8;

  const mappedData: ExpiringMember[] = useMemo(() => {
    if (!plansData) return [];

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    return plansData
      .filter((plan: any) => plan.endDate && new Date(plan.endDate).getTime() >= now.getTime())
      .map((plan: any) => {
        const endDate = new Date(plan.endDate);
        endDate.setHours(0, 0, 0, 0);
        const diffTime = endDate.getTime() - now.getTime();
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        const customer = plan.gym_customers;
        const generatedMemberId = plan.GymCustomerMembershipPlanId 
          ? `MEM${plan.GymCustomerMembershipPlanId.substring(0, 4).toUpperCase()}` 
          : "MEM---";
        
        return {
          id: plan.customerId,
          name: customer?.fullName || "Unknown",
          memberId: generatedMemberId,
          plan: plan.plan?.planName || "Custom Plan",
          planColor: "#FBBF24",
          phone: customer?.phone || "N/A",
          expiryDate: endDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          daysLeft,
          gender: "male",
        };
      })
      .filter((member: ExpiringMember) => member.daysLeft <= 7);
  }, [plansData]);

  const todayCount = mappedData.filter((m) => m.daysLeft === 0).length;
  const next3DaysCount = mappedData.filter((m) => m.daysLeft > 0 && m.daysLeft <= 3).length;
  const next7DaysCount = mappedData.filter((m) => m.daysLeft > 3 && m.daysLeft <= 7).length;
  const total7Days = mappedData.length;

  const filteredAndSortedData = useMemo(() => {
    let result = [...mappedData];

    if (searchTerm) {
      const lowerQuery = searchTerm.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(lowerQuery) ||
          m.memberId.toLowerCase().includes(lowerQuery) ||
          m.phone.toLowerCase().includes(lowerQuery)
      );
    }

    if (activeFilter === "today") {
      result = result.filter((m) => m.daysLeft === 0);
    } else if (activeFilter === "next3") {
      result = result.filter((m) => m.daysLeft > 0 && m.daysLeft <= 3);
    } else if (activeFilter === "next7") {
      result = result.filter((m) => m.daysLeft > 3 && m.daysLeft <= 7);
    }

    if (sortBy === "soonest") {
      result.sort((a, b) => a.daysLeft - b.daysLeft);
    } else if (sortBy === "latest") {
      result.sort((a, b) => b.daysLeft - a.daysLeft);
    } else if (sortBy === "name_asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name_desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [mappedData, searchTerm, activeFilter, sortBy]);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeFilter, sortBy]);

  const totalCount = filteredAndSortedData.length;
  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#0A0D14] p-4 md:p-6 lg:p-8 overflow-x-hidden">
      <div className="flex flex-col max-w-[1200px] w-full mx-auto gap-6">
        <MembershipExpiryHeader />
        
        <MembershipExpiryCards 
          total7Days={total7Days}
          todayCount={todayCount}
          next3DaysCount={next3DaysCount}
          next7DaysCount={next7DaysCount}
        />
        
        <div className="flex flex-col w-full">
          <MembershipExpiryFilterBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            total7Days={total7Days}
            todayCount={todayCount}
            next3DaysCount={next3DaysCount}
            next7DaysCount={next7DaysCount}
          />
          <MembershipExpiryTable data={paginatedData} isLoading={isLoading} />
        </div>

        {totalCount > 0 && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={Math.ceil(totalCount / itemsPerPage)} 
            totalItems={totalCount}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage} 
          />
        )}
      </div>
    </div>
  );
}
