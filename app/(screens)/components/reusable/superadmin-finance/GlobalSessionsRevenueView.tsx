"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import GlobalSessionsRevenueHeader from "./GlobalSessionsRevenueHeader";
import GlobalSessionsRevenueKpiCards from "./GlobalSessionsRevenueKpiCards";
import GlobalSessionsRevenueFilterBar from "./GlobalSessionsRevenueFilterBar";
import GlobalSessionsRevenueTable from "./GlobalSessionsRevenueTable";
import GlobalSessionsRevenueDetailModal from "./GlobalSessionsRevenueDetailModal";
import {
  GLOBAL_SESSION_PAYMENTS,
  GLOBAL_SESSIONS_REVENUE_KPIS,
} from "./globalSessionsRevenueMockData";
import {
  GlobalSessionPayment,
  GlobalSessionsRevenueKpis,
} from "./globalSessionsRevenueTypes";

export default function GlobalSessionsRevenueView() {
  const router = useRouter();

  const [selectedMonthDate, setSelectedMonthDate] = useState<Date>(new Date());
  const [isThisMonth, setIsThisMonth] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [selectedTrainer, setSelectedTrainer] = useState("All Trainers");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<GlobalSessionPayment | null>(null);

  const itemsPerPage = 10;

  const handleMonthDateChange = (date: Date) => {
    setSelectedMonthDate(date);
    const now = new Date();
    setIsThisMonth(
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    );
    setCurrentPage(1);
  };

  const handleBackToFinance = () => {
    router.push("/superadmin/finance");
  };

  const hasActiveFilters = Boolean(
    searchTerm ||
    selectedTrainer !== "All Trainers" ||
    selectedStatus !== "All Status" ||
    fromDate ||
    toDate
  );

  const handleClearAll = () => {
    setSearchTerm("");
    setFromDate(null);
    setToDate(null);
    setSelectedTrainer("All Trainers");
    setSelectedStatus("All Status");
    setCurrentPage(1);
  };

  const filteredPayments = useMemo(() => {
    return GLOBAL_SESSION_PAYMENTS.filter((payment) => {
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesQuery =
          payment.customerName.toLowerCase().includes(query) ||
          payment.trainerName.toLowerCase().includes(query) ||
          payment.sessionId.toLowerCase().includes(query) ||
          payment.amount.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      if (selectedTrainer !== "All Trainers" && payment.trainerName !== selectedTrainer) {
        return false;
      }

      if (selectedStatus !== "All Status" && payment.status !== selectedStatus) {
        return false;
      }

      if (fromDate || toDate) {
        const paymentDateObj = new Date(payment.date);
        paymentDateObj.setHours(0, 0, 0, 0);
        const paymentTime = paymentDateObj.getTime();

        if (fromDate) {
          const fromObj = new Date(fromDate);
          fromObj.setHours(0, 0, 0, 0);
          if (paymentTime < fromObj.getTime()) return false;
        }

        if (toDate) {
          const toObj = new Date(toDate);
          toObj.setHours(23, 59, 59, 999);
          if (paymentTime > toObj.getTime()) return false;
        }
      }

      return true;
    });
  }, [searchTerm, selectedTrainer, selectedStatus, fromDate, toDate]);

  const kpis: GlobalSessionsRevenueKpis = useMemo(() => {
    if (!hasActiveFilters) {
      return GLOBAL_SESSIONS_REVENUE_KPIS;
    }

    const totalCount = filteredPayments.length;
    const paidList = filteredPayments.filter((p) => p.status === "Paid");
    const pendingList = filteredPayments.filter((p) => p.status === "Pending");

    const totalSum = filteredPayments.reduce((acc, p) => acc + p.numericAmount, 0);
    const paidSum = paidList.reduce((acc, p) => acc + p.numericAmount, 0);
    const pendingSum = pendingList.reduce((acc, p) => acc + p.numericAmount, 0);

    const formatter = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

    return {
      totalRevenue: formatter.format(totalSum),
      totalSessionsCount: totalCount,
      paidAmount: formatter.format(paidSum),
      paidSessionsCount: paidList.length,
      pendingAmount: formatter.format(pendingSum),
      pendingSessionsCount: pendingList.length,
    };
  }, [filteredPayments, hasActiveFilters]);

  const totalItems = hasActiveFilters ? filteredPayments.length : GLOBAL_SESSIONS_REVENUE_KPIS.totalSessionsCount;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const paginatedPayments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPayments.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPayments, currentPage, itemsPerPage]);

  return (
    <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6 sm:gap-7 max-w-full overflow-x-hidden min-w-0">
      <GlobalSessionsRevenueHeader
        selectedDate={selectedMonthDate}
        onDateChange={handleMonthDateChange}
        isThisMonth={isThisMonth}
        onBack={handleBackToFinance}
      />

      <GlobalSessionsRevenueKpiCards kpis={kpis} />

      <GlobalSessionsRevenueFilterBar
        searchTerm={searchTerm}
        onSearchChange={(val) => {
          setSearchTerm(val);
          setCurrentPage(1);
        }}
        fromDate={fromDate}
        onFromDateChange={(date) => {
          setFromDate(date);
          setCurrentPage(1);
        }}
        toDate={toDate}
        onToDateChange={(date) => {
          setToDate(date);
          setCurrentPage(1);
        }}
        selectedTrainer={selectedTrainer}
        onTrainerChange={(val) => {
          setSelectedTrainer(val);
          setCurrentPage(1);
        }}
        selectedStatus={selectedStatus}
        onStatusChange={(val) => {
          setSelectedStatus(val);
          setCurrentPage(1);
        }}
        hasActiveFilters={hasActiveFilters}
        onClearAll={handleClearAll}
      />

      <GlobalSessionsRevenueTable
        payments={paginatedPayments}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onViewPayment={setSelectedPayment}
      />

      <GlobalSessionsRevenueDetailModal
        payment={selectedPayment}
        onClose={() => setSelectedPayment(null)}
      />
    </div>
  );
}
