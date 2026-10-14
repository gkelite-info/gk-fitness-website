"use client";

import { useState, useEffect, useMemo } from "react";
import { getDemoRequestsAction, DemoRequestItem, DemoRequestsStats } from "@/app/actions/demoRequests";
import { DemoRequestsKPIs } from "./_components/DemoRequestsKPIs";
import { DemoRequestsFilters } from "./_components/DemoRequestsFilters";
import { DemoRequestsTable } from "./_components/DemoRequestsTable";
import { DemoRequestDetailsModal } from "./_components/DemoRequestDetailsModal";
import { CircleNotch } from "@phosphor-icons/react";

export default function DemoRequestsPage() {
  const [items, setItems] = useState<DemoRequestItem[]>([]);
  const [stats, setStats] = useState<DemoRequestsStats>({
    total: 24,
    newRequests: 12,
    demoScheduled: 6,
    contacted: 4,
    converted: 1,
    notInterested: 1,
  });
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDateRange, setSelectedDateRange] = useState("last_30_days");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [selectedRequest, setSelectedRequest] = useState<DemoRequestItem | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      const res = await getDemoRequestsAction();
      if (res.success && res.data) {
        setItems(res.data);
        if (res.stats) {
          setStats(res.stats);
        }
      }
      setLoading(false);
    };

    fetchRequests();
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          item.ownerName.toLowerCase().includes(q) ||
          item.gymName.toLowerCase().includes(q) ||
          item.city.toLowerCase().includes(q) ||
          item.email.toLowerCase().includes(q) ||
          item.mobile.includes(q);
        if (!match) return false;
      }

      if (selectedPlan !== "all" && item.plan !== selectedPlan) {
        return false;
      }

      if (selectedStatus !== "all" && item.status !== selectedStatus) {
        return false;
      }

      return true;
    });
  }, [items, searchQuery, selectedPlan, selectedStatus]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedPlan("all");
    setSelectedStatus("all");
    setSelectedDateRange("last_30_days");
    setCurrentPage(1);
  };

  const handleStatusUpdated = (id: string, newStatus: DemoRequestItem["status"]) => {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
    );
    if (selectedRequest && selectedRequest.id === id) {
      setSelectedRequest({ ...selectedRequest, status: newStatus });
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 p-4 sm:p-6 lg:p-8 text-white min-h-[calc(100vh-101px)]">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Demo Requests
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8]">
          View and manage gym demo requests from potential owners.
        </p>
      </div>

      <DemoRequestsKPIs
        stats={stats}
        selectedStatus={selectedStatus}
        onSelectStatus={(status) => {
          setSelectedStatus(status);
          setCurrentPage(1);
        }}
      />

      <DemoRequestsFilters
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        selectedPlan={selectedPlan}
        onPlanChange={(plan) => {
          setSelectedPlan(plan);
          setCurrentPage(1);
        }}
        selectedStatus={selectedStatus}
        onStatusChange={(status) => {
          setSelectedStatus(status);
          setCurrentPage(1);
        }}
        selectedDateRange={selectedDateRange}
        onDateRangeChange={setSelectedDateRange}
        onClearFilters={handleClearFilters}
      />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <CircleNotch size={32} className="animate-spin text-[#D4FF32]" />
          <span className="text-xs text-[#94A3B8]">Loading demo requests...</span>
        </div>
      ) : (
        <DemoRequestsTable
          items={filteredItems}
          currentPage={currentPage}
          pageSize={pageSize}
          totalCount={filteredItems.length}
          onPageChange={setCurrentPage}
          onSelectRequest={setSelectedRequest}
        />
      )}

      <DemoRequestDetailsModal
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
        onStatusUpdated={handleStatusUpdated}
      />
    </div>
  );
}
