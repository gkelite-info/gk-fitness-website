"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import GymPlanRevenueHeader from "./GymPlanRevenueHeader";
import GymPlanRevenueKpiCards from "./GymPlanRevenueKpiCards";
import GymPlanRevenueFilterBar from "./GymPlanRevenueFilterBar";
import GymPlanRevenueTable from "./GymPlanRevenueTable";
import GymPlanRevenueDetailModal from "./GymPlanRevenueDetailModal";
import {
  GYM_PLAN_PAYMENTS,
  GYM_PLAN_REVENUE_KPIS,
} from "./gymPlanRevenueMockData";
import { GymPlanPayment, GymPlanRevenueKpis } from "./gymPlanRevenueTypes";

export default function GymPlanRevenueView() {
  const router = useRouter();

  const [selectedMonthDate, setSelectedMonthDate] = useState<Date>(new Date());
  const [isThisMonth, setIsThisMonth] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [selectedPlan, setSelectedPlan] = useState("All Plans");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState<GymPlanPayment | null>(null);

  const itemsPerPage = 10;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const mainEl = document.querySelector("main");
    if (mainEl) {
      mainEl.scrollTo({ top: 0, left: 0, behavior: "instant" });
      mainEl.scrollTop = 0;
    }
  }, []);

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
    selectedPlan !== "All Plans" ||
    selectedStatus !== "All Status" ||
    fromDate ||
    toDate
  );

  const handleClearAll = () => {
    setSearchTerm("");
    setFromDate(null);
    setToDate(null);
    setSelectedPlan("All Plans");
    setSelectedStatus("All Status");
    setCurrentPage(1);
  };

  const filteredPayments = useMemo(() => {
    return GYM_PLAN_PAYMENTS.filter((payment) => {
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesQuery =
          payment.gymName.toLowerCase().includes(query) ||
          payment.ownerName.toLowerCase().includes(query) ||
          payment.plan.toLowerCase().includes(query) ||
          payment.amount.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      if (selectedPlan !== "All Plans" && payment.plan !== selectedPlan) {
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
  }, [searchTerm, selectedPlan, selectedStatus, fromDate, toDate]);

  const kpis: GymPlanRevenueKpis = useMemo(() => {
    if (!hasActiveFilters) {
      return GYM_PLAN_REVENUE_KPIS;
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
      totalPaymentsCount: totalCount,
      paidAmount: formatter.format(paidSum),
      paidPaymentsCount: paidList.length,
      pendingAmount: formatter.format(pendingSum),
      pendingPaymentsCount: pendingList.length,
    };
  }, [filteredPayments, hasActiveFilters]);

  const totalItems = filteredPayments.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const paginatedPayments = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPayments.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPayments, currentPage, itemsPerPage]);

  return (
    <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6 sm:gap-7 max-w-full overflow-x-hidden min-w-0">
      <GymPlanRevenueHeader
        selectedDate={selectedMonthDate}
        onDateChange={handleMonthDateChange}
        isThisMonth={isThisMonth}
        onBack={handleBackToFinance}
      />

      <GymPlanRevenueKpiCards kpis={kpis} />

      <GymPlanRevenueFilterBar
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
        selectedPlan={selectedPlan}
        onPlanChange={(val) => {
          setSelectedPlan(val);
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

      <GymPlanRevenueTable
        payments={paginatedPayments}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onViewPayment={setSelectedPayment}
      />

      <GymPlanRevenueDetailModal
        payment={selectedPayment}
        onClose={() => setSelectedPayment(null)}
      />
    </div>
  );
}
