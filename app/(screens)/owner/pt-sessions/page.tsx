"use client";

import { useState } from "react";
import PTSessionsHeader from "./_components/PTSessionsHeader";
import PTSessionsCards, { SessionFilter } from "./_components/PTSessionsCards";
import PTSessionsTable, { SessionData } from "./_components/PTSessionsTable";
import { useUser } from "@/app/context/UserContext";
import { useCustomerTrainersByGym } from "@/lib/hooks/customerTrainers/useCustomerTrainers";

export default function PTSessionsPage() {
  const [activeFilter, setActiveFilter] = useState<SessionFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const { roleData } = useUser();
  const gymId = roleData?.[0]?.gymId;

  const { data: customerTrainers, isLoading } = useCustomerTrainersByGym(gymId);

  const selectedDayShort = selectedDate.toLocaleDateString('en-US', { weekday: 'short' });
  const selectedDateMidnight = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());

  const validTrainers = (customerTrainers || []).filter((ct: any) => {
    const matchesDay = Array.isArray(ct.weekDays) && ct.weekDays.includes(selectedDayShort);

    const assignedDate = ct.assignedOn ? new Date(new Date(ct.assignedOn).setHours(0, 0, 0, 0)) : null;
    const expiryDate = ct.expiryOn ? new Date(new Date(ct.expiryOn).setHours(23, 59, 59, 999)) : null;

    const afterAssigned = assignedDate ? selectedDateMidnight >= assignedDate : true;
    const beforeExpiry = expiryDate ? selectedDateMidnight <= expiryDate : true;

    return matchesDay && afterAssigned && beforeExpiry && ct.isActive;
  });

  const allSessions: SessionData[] = validTrainers.map((ct: any) => {
    let time = "00:00";
    let timeSuffix = "AM";
    if (ct.timings) {
      const parts = ct.timings.trim().split(/\s+/);
      time = parts[0] || "00:00";
      timeSuffix = parts[1] || "AM";
    }

    const customerUser = Array.isArray(ct.customer?.user) ? ct.customer?.user[0] : ct.customer?.user;

    return {
      id: ct.customerTrainerId,
      time,
      timeSuffix,
      member: ct.customer?.fullName || customerUser?.name || "Unknown Member",
      avatarUrl: customerUser?.profilePhoto || "",
      trainer: ct.trainer?.fullName || "Unknown Trainer",
      trainerColor: "#CBF425",
      workoutType: ct.trainer?.specialization || "—",
      status: "-",
      customerId: ct.customerId,
      gymId: ct.gymId,
    };
  });

  const stats = {
    total: allSessions.length,
    upcoming: allSessions.filter(s => s.status === "Upcoming").length,
    completed: allSessions.filter(s => s.status === "Completed").length,
    cancelled: allSessions.filter(s => s.status === "Cancelled").length,
  };

  const filteredSessions = allSessions.filter((session) => {
    const matchesFilter = activeFilter === "All" || session.status === activeFilter;
    const matchesSearch =
      session.member.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.trainer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col items-start p-7 md:px-9 md:py-7 gap-7 w-full h-full overflow-y-auto">
      <PTSessionsHeader selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <PTSessionsCards
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        stats={stats}
      />
      <PTSessionsTable
        sessions={filteredSessions}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedDate={selectedDate}
      />
    </div>
  );
}
