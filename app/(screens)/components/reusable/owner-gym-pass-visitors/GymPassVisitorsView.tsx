"use client";

import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import GymPassVisitorsHeader from "./GymPassVisitorsHeader";
import GymPassVisitorsKpis from "./GymPassVisitorsKpis";
import GymPassVisitorsFilters from "./GymPassVisitorsFilters";
import GymPassVisitorsTable from "./GymPassVisitorsTable";
import VisitorDetailsModal from "./VisitorDetailsModal";
import Pagination from "@/app/(screens)/components/reusable/Pagination";
import { MOCK_VISITORS, VISITOR_KPI_STATS } from "./mockData";
import { GymPassVisitor } from "./types";

export default function GymPassVisitorsView() {
  const [visitorsList, setVisitorsList] = useState<GymPassVisitor[]>(MOCK_VISITORS);
  const [searchQuery, setSearchQuery] = useState("");
  const [passType, setPassType] = useState("All Pass Types");
  const [status, setStatus] = useState("All Status");
  const [fromDate, setFromDate] = useState<Date>(new Date(2026, 9, 1));
  const [toDate, setToDate] = useState<Date>(new Date(2026, 9, 31));

  const [selectedVisitor, setSelectedVisitor] = useState<GymPassVisitor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const filteredVisitors = useMemo(() => {
    let list = [...visitorsList];

    if (passType !== "All Pass Types") {
      list = list.filter((v) => v.passType === passType);
    }

    if (status !== "All Status") {
      list = list.filter((v) => v.status === status);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (v) =>
          v.name.toLowerCase().includes(q) ||
          v.phone.toLowerCase().includes(q) ||
          v.email.toLowerCase().includes(q) ||
          v.customerId.toLowerCase().includes(q) ||
          v.passId.toLowerCase().includes(q)
      );
    }

    return list;
  }, [visitorsList, passType, status, searchQuery]);

  const totalPages = Math.ceil(filteredVisitors.length / itemsPerPage) || 1;
  const paginatedVisitors = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredVisitors.slice(start, start + itemsPerPage);
  }, [filteredVisitors, currentPage]);

  const handleViewVisitor = (visitor: GymPassVisitor) => {
    setSelectedVisitor(visitor);
    setIsModalOpen(true);
  };

  const handleCancelVisit = (id: string) => {
    setVisitorsList((prev) =>
      prev.map((v) =>
        v.id === id
          ? {
              ...v,
              status: "Cancelled",
              duration: "Cancelled",
              checkInTime: "--:--",
              checkOutTime: "--:--",
            }
          : v
      )
    );
    if (selectedVisitor && selectedVisitor.id === id) {
      setSelectedVisitor((prev) =>
        prev
          ? {
              ...prev,
              status: "Cancelled",
              duration: "Cancelled",
              checkInTime: "--:--",
              checkOutTime: "--:--",
            }
          : null
      );
    }
    toast.success("Visit has been cancelled");
    setIsModalOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-full overflow-x-hidden min-w-0">
      <GymPassVisitorsHeader
        dateRangeText="01 Oct 2026 - 31 Oct 2026"
        onDateRangeClick={() => toast("Viewing date range: Oct 2026")}
      />

      <GymPassVisitorsKpis stats={VISITOR_KPI_STATS} />

      <GymPassVisitorsFilters
        fromDate={fromDate}
        onFromDateChange={setFromDate}
        toDate={toDate}
        onToDateChange={setToDate}
        passType={passType}
        onPassTypeChange={(val) => {
          setPassType(val);
          setCurrentPage(1);
        }}
        status={status}
        onStatusChange={(val) => {
          setStatus(val);
          setCurrentPage(1);
        }}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
      />

      <GymPassVisitorsTable
        visitors={paginatedVisitors}
        onView={handleViewVisitor}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredVisitors.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      <VisitorDetailsModal
        visitor={selectedVisitor}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCancelVisit={handleCancelVisit}
      />
    </div>
  );
}
