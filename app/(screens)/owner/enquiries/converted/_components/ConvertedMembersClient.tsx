"use client";

import { useState } from "react";
import Link from "next/link";
import { CaretLeft, Plus } from "@phosphor-icons/react";
import Pagination from "@/app/(screens)/components/reusable/Pagination";
import ConvertedMetricsCards from "./ConvertedMetricsCards";
import ConvertedFiltersToolbar from "./ConvertedFiltersToolbar";
import ConvertedMembersTable from "./ConvertedMembersTable";

// Mock Data
const ALL_MEMBERS = [
  { id: 1, name: "Rahul Sharma", email: "rahul.sharma@gmail.com", phone: "9876543210", source: "Instagram", addedVia: "Social Media", plan: "Gym Membership", date: "22 Sep 2026" },
  { id: 2, name: "Sneha Patel", email: "sneha.patel@gmail.com", phone: "9876543211", source: "Google", addedVia: "Owner Added", plan: "Personal Training", date: "23 Sep 2026" },
  { id: 3, name: "Amit Kumar", email: "amit.kumar99@outlook.com", phone: "9876543212", source: "Facebook", addedVia: "Social Media", plan: "Gym Membership", date: "25 Sep 2026" },
  { id: 4, name: "Neha Kapoor", email: "neha.kapoor@gmail.com", phone: "9876543213", source: "Referral", addedVia: "Owner Added", plan: "Group Class", date: "21 Sep 2026" },
  { id: 5, name: "Vikram Singh", email: "vikram.singh@yahoo.com", phone: "9876543214", source: "Walk-in", addedVia: "Owner Added", plan: "Gym Membership", date: "20 Sep 2026" },
  { id: 6, name: "Priya Nair", email: "priya.nair@hotmail.com", phone: "9876543215", source: "Instagram", addedVia: "Social Media", plan: "Personal Training", date: "24 Sep 2026" },
  { id: 7, name: "Karan Mehta", email: "mehta.karan@gmail.com", phone: "9876543216", source: "Google", addedVia: "Owner Added", plan: "Gym Membership", date: "26 Sep 2026" },
  { id: 8, name: "Ananya Reddy", email: "ananya.reddy@gmail.com", phone: "9876543217", source: "Facebook", addedVia: "Social Media", plan: "Group Class", date: "28 Sep 2026" },
];

export default function ConvertedMembersClient() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredMembers = ALL_MEMBERS.filter(member => {
    if (activeFilter === "All") return true;
    if (activeFilter === "This Month") return member.date.includes("Sep 2026");
    if (activeFilter === "Social Media") return member.addedVia === "Social Media";
    if (activeFilter === "Walk-in") return member.addedVia === "Owner Added";
    return true;
  });

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#0E1217] p-4 sm:p-6 lg:p-8 gap-6 sm:gap-8 overflow-x-hidden">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 w-full">
        <div className="flex items-center gap-3">
          <Link 
            href="/owner/enquiries" 
            className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1A2230] border border-[#2B3648] hover:bg-[#232D3F] transition-colors shrink-0"
          >
            <CaretLeft size={16} className="text-white" />
          </Link>
          <div className="flex flex-col">
            <h1 className="font-sans font-bold text-xl sm:text-2xl text-white tracking-tight">Converted Members</h1>
            <p className="font-sans text-[11px] sm:text-xs text-[#94A3B8]">Track members converted from enquiries and review their original source and conversion details.</p>
          </div>
        </div>
        <Link 
          href="/owner/enquiries/add"
          className="flex items-center justify-center px-4 py-2 sm:py-2.5 gap-2 bg-[#D4FF00] rounded-xl hover:brightness-105 transition-all shadow-[0_0_20px_rgba(212,255,0,0.25)] shrink-0 w-full sm:w-auto cursor-pointer"
        >
          <Plus size={16} weight="bold" className="text-black" />
          <span className="font-sans font-bold text-sm text-black">Add Enquiry</span>
        </Link>
      </div>

      <ConvertedMetricsCards activeFilter={activeFilter} onFilterChange={setActiveFilter} />

      <ConvertedFiltersToolbar />

      <div className="flex-1 w-full bg-[#101520] border border-[#1F2738] rounded-2xl flex flex-col overflow-hidden min-h-[400px]">
        <ConvertedMembersTable members={filteredMembers} />
        
        <div className="w-full mt-auto px-4 sm:px-6">
          <Pagination 
            currentPage={currentPage}
            totalPages={4}
            onPageChange={setCurrentPage}
            itemsPerPage={8}
            totalItems={32}
          />
        </div>
      </div>
    </div>
  );
}
