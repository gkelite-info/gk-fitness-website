"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  getDemoRequestsAction,
  DemoRequestItem,
  DemoRequestsStats,
} from "@/app/actions/demoRequests";
import { DemoRequestsKPIs } from "./_components/DemoRequestsKPIs";
import { DemoRequestsFilters } from "./_components/DemoRequestsFilters";
import { DemoRequestsTable } from "./_components/DemoRequestsTable";
import { DemoRequestDetailsModal } from "./_components/DemoRequestDetailsModal";
import { DemoRequestsListShimmer } from "./_components/DemoRequestsListShimmer";

export default function DemoRequestsPage() {
  const [items, setItems] = useState<DemoRequestItem[]>([]);
  const [stats, setStats] = useState<DemoRequestsStats>({
    total: 0,
    pendingRequests: 0,
    newRequests: 0,
    demoScheduled: 0,
    contacted: 0,
    converted: 0,
    notInterested: 0,
  });
  const [initialLoading, setInitialLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedDateRange, setSelectedDateRange] = useState("last_30_days");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [selectedRequest, setSelectedRequest] = useState<DemoRequestItem | null>(null);
  const isInitialMount = useRef(true);

  const fetchFilteredData = useCallback(
    async (
      search: string,
      plan: string,
      status: string,
      dateRange: string,
      isInitial = false
    ) => {
      if (isInitial) {
        setInitialLoading(true);
      } else {
        setTableLoading(true);
      }

      const res = await getDemoRequestsAction({
        search,
        plan,
        status,
        dateRange,
      });

      if (res.success && res.data) {
        setItems(res.data);
        if (res.stats) {
          setStats(res.stats);
        }
      }

      if (isInitial) {
        setInitialLoading(false);
      } else {
        setTableLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchFilteredData(searchQuery, selectedPlan, selectedStatus, selectedDateRange, true);
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    setTableLoading(true);
    setCurrentPage(1);

    const timer = setTimeout(() => {
      fetchFilteredData(searchQuery, selectedPlan, selectedStatus, selectedDateRange, false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedPlan, selectedStatus, selectedDateRange, fetchFilteredData]);

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

  if (initialLoading) {
    return <DemoRequestsListShimmer />;
  }

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
        }}
        selectedPlan={selectedPlan}
        onPlanChange={(plan) => {
          setSelectedPlan(plan);
        }}
        selectedStatus={selectedStatus}
        onStatusChange={(status) => {
          setSelectedStatus(status);
        }}
        selectedDateRange={selectedDateRange}
        onDateRangeChange={setSelectedDateRange}
        onClearFilters={handleClearFilters}
      />

      <DemoRequestsTable
        items={items}
        currentPage={currentPage}
        pageSize={pageSize}
        totalCount={items.length}
        onPageChange={setCurrentPage}
        onSelectRequest={setSelectedRequest}
        loading={tableLoading}
      />

      <DemoRequestDetailsModal
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
        onStatusUpdated={handleStatusUpdated}
      />
    </div>
  );
}
