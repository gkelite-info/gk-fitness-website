"use client";

import { useState } from "react";
import Link from "next/link";
import { CaretLeft, Plus } from "@phosphor-icons/react";
import Pagination from "@/app/(screens)/components/reusable/Pagination";
import ConvertedMetricsCards from "./ConvertedMetricsCards";
import ConvertedFiltersToolbar from "./ConvertedFiltersToolbar";
import ConvertedMembersTable from "./ConvertedMembersTable";
import { useGymEnquiries } from "@/lib/hooks/gymEnquiries/useGymEnquiries";

export default function ConvertedMembersClient() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSource, setSelectedSource] = useState("All");
  const [selectedPlan, setSelectedPlan] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");

  const { data: enquiries = [], isLoading } = useGymEnquiries();

  const rawConverted = enquiries.filter((e: any) => e.status === "converted");
  
  const mappedMembers = rawConverted.map((e: any, index: number) => ({
    id: index + 1,
    name: e.fullName || "Unknown",
    email: e.email || "N/A",
    phone: e.mobile || "N/A",
    source: e.enquirySource ? e.enquirySource.charAt(0).toUpperCase() + e.enquirySource.slice(1) : "Unknown",
    addedVia: e.addedThrough === 'socialmedia' ? "Social Media" : "Owner Added",
    plan: e.plan?.planName || e.interestedIn || "N/A",
    date: e.updatedAt ? new Date(e.updatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : "N/A",
    rawDate: e.updatedAt || ""
  }));

  const filteredMembers = mappedMembers.filter(member => {
    // Top active filter cards
    if (activeFilter === "This Month") {
       const [, m, y] = member.date.split(' ');
       const currentMonth = new Date().toLocaleString('en-GB', { month: 'short' });
       const currentYear = new Date().getFullYear().toString();
       if (m !== currentMonth || y !== currentYear) return false;
    } else if (activeFilter === "Social Media") {
       if (member.addedVia !== "Social Media") return false;
    } else if (activeFilter === "Walk-in") {
       if (member.addedVia !== "Owner Added") return false;
    }

    // Toolbar filters
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      if (!member.name.toLowerCase().includes(term) && 
          !member.phone.toLowerCase().includes(term) && 
          !member.email.toLowerCase().includes(term)) {
        return false;
      }
    }
    
    if (selectedSource !== "All" && member.source.toLowerCase() !== selectedSource.toLowerCase()) {
      return false;
    }

    if (selectedPlan !== "All" && member.plan !== selectedPlan) {
      return false;
    }

    if (selectedDate && member.rawDate) {
      const memberD = new Date(member.rawDate);
      const selectedD = new Date(selectedDate);
      if (memberD.toDateString() !== selectedD.toDateString()) {
        return false;
      }
    }

    return true;
  });

  const totalItems = filteredMembers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentMembers = filteredMembers.slice(startIndex, startIndex + itemsPerPage);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const thisMonthTotal = rawConverted.filter((e: any) => {
    if (!e.updatedAt) return false;
    const d = new Date(e.updatedAt);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  }).length;

  const lastMonthTotal = rawConverted.filter((e: any) => {
    if (!e.updatedAt) return false;
    const d = new Date(e.updatedAt);
    return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;
  }).length;

  const totalTrend = lastMonthTotal > 0 ? Math.round(((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100) : 0;
  const thisMonthTrend = thisMonthTotal - lastMonthTotal;

  const socialMediaThisMonth = rawConverted.filter((e: any) => {
    if (!e.updatedAt || e.addedThrough !== 'socialmedia') return false;
    const d = new Date(e.updatedAt);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  }).length;

  const socialMediaLastMonth = rawConverted.filter((e: any) => {
    if (!e.updatedAt || e.addedThrough !== 'socialmedia') return false;
    const d = new Date(e.updatedAt);
    return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;
  }).length;
  
  const socialTrend = socialMediaThisMonth - socialMediaLastMonth;

  const walkinThisMonth = rawConverted.filter((e: any) => {
    if (!e.updatedAt || (e.addedThrough !== 'walkin' && e.addedThrough !== 'owner')) return false;
    const d = new Date(e.updatedAt);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  }).length;

  const walkinLastMonth = rawConverted.filter((e: any) => {
    if (!e.updatedAt || (e.addedThrough !== 'walkin' && e.addedThrough !== 'owner')) return false;
    const d = new Date(e.updatedAt);
    return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;
  }).length;

  const walkinTrend = walkinThisMonth - walkinLastMonth;

  const socialMediaCount = rawConverted.filter((e: any) => e.addedThrough === 'socialmedia').length;
  const walkinCount = rawConverted.filter((e: any) => e.addedThrough === 'walkin' || e.addedThrough === 'owner').length;

  const counts = {
    total: rawConverted.length,
    thisMonth: thisMonthTotal,
    social: socialMediaCount,
    walkin: walkinCount,
    totalTrend,
    thisMonthTrend,
    socialTrend,
    walkinTrend
  };

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

      <ConvertedMetricsCards activeFilter={activeFilter} onFilterChange={setActiveFilter} counts={counts} />

      <ConvertedFiltersToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedSource={selectedSource}
        onSourceChange={setSelectedSource}
        selectedPlan={selectedPlan}
        onPlanChange={setSelectedPlan}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      <div className="flex-1 w-full bg-[#101520] border border-[#1F2738] rounded-2xl flex flex-col overflow-hidden min-h-[400px]">
        {isLoading ? (
          <div className="flex flex-1 items-center justify-center min-h-[400px] text-[#94A3B8] font-sans">
            Loading converted members...
          </div>
        ) : (
          <>
            <ConvertedMembersTable members={currentMembers} />
            
            <div className="w-full mt-auto px-4 sm:px-6">
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
