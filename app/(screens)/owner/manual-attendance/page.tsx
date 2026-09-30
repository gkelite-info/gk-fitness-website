"use client";

import { useState } from "react";
import ManualAttendanceHeader from "./_components/ManualAttendanceHeader";
import ManualAttendanceFilterBar from "./_components/ManualAttendanceFilterBar";
import ManualAttendanceTable, { CustomerData } from "./_components/ManualAttendanceTable";
import Pagination from "@/app/(screens)/components/reusable/Pagination";
import AttendanceModal from "./_components/AttendanceModal";

const INITIAL_CUSTOMERS: CustomerData[] = [
  { id: "1", name: "Arjun Mehta", custId: "CUST-1001", plan: "Gold Plan", planColor: "#FBBF24", planBg: "rgba(245, 158, 11, 0.1)", attendance: "Today, 08:30 AM", isPresent: true },
  { id: "2", name: "Neha Reddy", custId: "CUST-1002", plan: "Gold Plan", planColor: "#FBBF24", planBg: "rgba(245, 158, 11, 0.1)", attendance: "Yesterday, 06:15 PM", isPresent: false },
  { id: "3", name: "Rohit Sharma", custId: "CUST-1003", plan: "Gold Plan", planColor: "#FBBF24", planBg: "rgba(245, 158, 11, 0.1)", attendance: "20 Jun 2026", isPresent: false },
  { id: "4", name: "Priya Nair", custId: "CUST-1004", plan: "Premium Plan", planColor: "#C084FC", planBg: "rgba(168, 85, 247, 0.1)", attendance: "Today, 07:15 AM", isPresent: true },
  { id: "5", name: "Karan Verma", custId: "CUST-1005", plan: "Silver Plan", planColor: "#CBD5E1", planBg: "rgba(100, 116, 139, 0.1)", attendance: "12 Jul 2026, 05:40 PM", isPresent: false },
  { id: "6", name: "Sneha Patil", custId: "CUST-1006", plan: "Gold Plan", planColor: "#FBBF24", planBg: "rgba(245, 158, 11, 0.1)", attendance: "Today, 09:00 AM", isPresent: true },
  { id: "7", name: "Vikram Singh", custId: "CUST-1007", plan: "Elite Plan", planColor: "#22D3EE", planBg: "rgba(6, 182, 212, 0.1)", attendance: "14 Jul 2026, 06:10 AM", isPresent: false },
  { id: "8", name: "Ananya Sharma", custId: "CUST-1008", plan: "Gold Plan", planColor: "#FBBF24", planBg: "rgba(245, 158, 11, 0.1)", attendance: "Today, 06:45 AM", isPresent: true },
];

export default function ManualAttendancePage() {
  const [customers, setCustomers] = useState<CustomerData[]>(INITIAL_CUSTOMERS);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showModal, setShowModal] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  const totalCount = 324;
  const itemsPerPage = 8;
  const currentPage = 1;

  const handleToggleBulkMode = () => {
    setIsBulkMode(!isBulkMode);
    if (isBulkMode) {
      setSelectedIds(new Set()); // Reset selections on cancel
    }
  };

  const handleSortToggle = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newOrder);
    setCustomers(prev => {
      const sorted = [...prev].sort((a, b) => {
        if (newOrder === 'asc') {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
      return sorted;
    });
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.size === customers.length) {
      setSelectedIds(new Set());
    } else {
      const allIds = new Set(customers.map(c => c.id));
      setSelectedIds(allIds);
    }
  };

  const handleToggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const handleToggleIndividual = (id: string) => {
    setCustomers(prev => prev.map(c => 
      c.id === id ? { 
        ...c, 
        isPresent: !c.isPresent, 
        attendance: !c.isPresent ? "Just now" : c.attendance 
      } : c
    ));
  };

  const handleSubmitBulk = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    // Apply changes before closing modal
    setCustomers(prev => prev.map(c => 
      selectedIds.has(c.id) ? { ...c, isPresent: true, attendance: "Just now" } : c
    ));
    setShowModal(false);
    setIsBulkMode(false);
    setSelectedIds(new Set());
  };

  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-8 py-6 pb-12 mx-auto max-w-[1024px] 2xl:max-w-[1200px]">
      <div className="flex flex-col items-start w-full gap-6">
        
        <ManualAttendanceHeader 
          totalCount={totalCount} 
          isBulkMode={isBulkMode} 
          onToggleBulkMode={handleToggleBulkMode} 
        />
        
        <ManualAttendanceFilterBar 
          isBulkMode={isBulkMode}
          isAllSelected={selectedIds.size === customers.length && customers.length > 0}
          onToggleSelectAll={handleToggleSelectAll}
          selectedCount={selectedIds.size}
          onSubmitBulk={handleSubmitBulk}
          onSortToggle={handleSortToggle}
        />
        
        <ManualAttendanceTable 
          customers={customers}
          isBulkMode={isBulkMode} 
          selectedIds={selectedIds}
          onToggleSelect={handleToggleSelect}
          onToggleIndividual={handleToggleIndividual}
        />
        
        <Pagination 
          currentPage={currentPage}
          totalPages={Math.ceil(totalCount / itemsPerPage)}
          totalItems={totalCount}
          itemsPerPage={itemsPerPage}
          onPageChange={() => {}}
        />

      </div>

      <AttendanceModal 
        isOpen={showModal} 
        onClose={handleCloseModal} 
        count={selectedIds.size} 
      />
    </div>
  );
}
