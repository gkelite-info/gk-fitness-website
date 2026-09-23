"use client";

import { useState } from "react";
import PTSessionsHeader from "./_components/PTSessionsHeader";
import PTSessionsCards, { SessionFilter } from "./_components/PTSessionsCards";
import PTSessionsTable, { SessionData } from "./_components/PTSessionsTable";

const mockSessions: SessionData[] = [
  {
    id: "1",
    time: "08:00",
    timeSuffix: "AM",
    member: "Rahul Sharma",
    avatarUrl: "",
    trainer: "Aman Verma",
    trainerColor: "#CBF425",
    workoutType: "Strength Training",
    status: "Completed",
  },
  {
    id: "2",
    time: "09:30",
    timeSuffix: "AM",
    member: "Priya Patel",
    avatarUrl: "",
    trainer: "Rohit Singh",
    trainerColor: "#D48C26",
    workoutType: "Fat Loss",
    status: "Upcoming",
  },
  {
    id: "3",
    time: "11:00",
    timeSuffix: "AM",
    member: "Siddharth Mehta",
    avatarUrl: "",
    trainer: "Rahul Sharma",
    trainerColor: "#CBF425",
    workoutType: "Muscle Gain",
    status: "Completed",
  },
  {
    id: "4",
    time: "01:00",
    timeSuffix: "PM",
    member: "Ananya Singh",
    avatarUrl: "",
    trainer: "Neha Kapoor",
    trainerColor: "#CBF425",
    workoutType: "Weight Loss",
    status: "Upcoming",
  },
  {
    id: "5",
    time: "07:30",
    timeSuffix: "PM",
    member: "Neha Agarwal",
    avatarUrl: "",
    trainer: "Neha Kapoor",
    trainerColor: "#7A889B",
    workoutType: "Fat Loss",
    status: "Cancelled",
  },
  {
    id: "6",
    time: "01:00",
    timeSuffix: "PM",
    member: "Ananya Singh",
    avatarUrl: "",
    trainer: "Neha Kapoor",
    trainerColor: "#CBF425",
    workoutType: "—",
    status: "Upcoming",
  },
];

export default function PTSessionsPage() {
  const [activeFilter, setActiveFilter] = useState<SessionFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const stats = {
    total: mockSessions.length,
    upcoming: mockSessions.filter(s => s.status === "Upcoming").length,
    completed: mockSessions.filter(s => s.status === "Completed").length,
    cancelled: mockSessions.filter(s => s.status === "Cancelled").length,
  };

  const filteredSessions = mockSessions.filter((session) => {
    const matchesFilter = activeFilter === "All" || session.status === activeFilter;
    const matchesSearch =
      session.member.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.trainer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col items-start p-7 md:px-9 md:py-7 gap-7 w-full h-full overflow-y-auto">
      <PTSessionsHeader />
      <PTSessionsCards
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        stats={{
          total: 18,
          upcoming: 6,
          completed: 10,
          cancelled: 2
        }}
      />
      <PTSessionsTable
        sessions={filteredSessions}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
    </div>
  );
}
