"use client";

import { useState } from "react";
import UsersHeader from "./UsersHeader";
import UsersTopBar from "./UsersTopBar";
import UsersFilterBar from "./UsersFilterBar";
import CustomersGrid from "./CustomersGrid";
import CustomersTable from "./CustomersTable";
import Pagination from "../../../components/reusable/Pagination";
import { Customer } from "./CustomersGrid";

const MOCK_CUSTOMERS: Customer[] = [
  { id: "CUST-1001", name: "Arjun Mehta", status: "Active", phone: "+91 98765 43210", plan: "Gold Plan", joinedDate: "12 May 2026", validTill: "12 Aug 2026" },
  { id: "CUST-1002", name: "Neha Reddy", status: "Active", phone: "+91 91234 56789", plan: "Gold Plan", joinedDate: "16 May 2026", validTill: "18 Jul 2026" },
  { id: "CUST-1003", name: "Rohit Sharma", status: "Inactive", phone: "+91 99887 66554", plan: "Gold Plan", joinedDate: "20 Apr 2026", validTill: "20 Jun 2026" },
  { id: "CUST-1005", name: "Karan Malhotra", status: "Active", phone: "+91 81899 77665", plan: "Gold Plan", joinedDate: "28 May 2026", validTill: "28 Aug 2026" },
  { id: "CUST-1006", name: "Priya Singh", status: "Active", phone: "+91 77654 33210", plan: "Silver Plan", joinedDate: "05 Jun 2026", validTill: "05 Sep 2026" },
  { id: "CUST-1007", name: "Amit Patel", status: "Inactive", phone: "+91 98877 66554", plan: "Bronze Plan", joinedDate: "10 Mar 2026", validTill: "10 May 2026" },
  { id: "CUST-1008", name: "Sneha Gupta", status: "Active", phone: "+91 91223 34455", plan: "Gold Plan", joinedDate: "22 May 2026", validTill: "22 Nov 2026" },
  { id: "CUST-1009", name: "Vikram Singh", status: "Active", phone: "+91 88990 01122", plan: "Silver Plan", joinedDate: "15 Jun 2026", validTill: "15 Sep 2026" },
];

export default function UsersDashboard() {
  const [activeTab, setActiveTab] = useState<"customers" | "trainers">("customers");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 100; // Mock total pages to demonstrate pagination

  const filteredCustomers = MOCK_CUSTOMERS.filter((customer) => {
    if (activeFilter === "All") return true;
    return customer.status === activeFilter;
  });

  return (
    <div className="flex flex-col w-full h-full pb-8">
      <UsersHeader />
      <UsersTopBar activeTab={activeTab} onTabChange={setActiveTab} />
      <UsersFilterBar 
        activeTab={activeTab}
        viewMode={viewMode} 
        onViewModeChange={setViewMode} 
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      
      {viewMode === "grid" ? (
        <CustomersGrid customers={filteredCustomers} />
      ) : (
        <CustomersTable customers={filteredCustomers} />
      )}

      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        totalItems={2000}
        itemsPerPage={20}
        onPageChange={setCurrentPage} 
      />
    </div>
  );
}
