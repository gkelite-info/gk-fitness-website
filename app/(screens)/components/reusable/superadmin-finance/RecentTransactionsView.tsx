"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import RecentTransactionsHeader from "./RecentTransactionsHeader";
import RecentTransactionsKpiCards from "./RecentTransactionsKpiCards";
import RecentTransactionsFilterBar from "./RecentTransactionsFilterBar";
import RecentTransactionsTable from "./RecentTransactionsTable";
import RecentTransactionDetailModal from "./RecentTransactionDetailModal";
import {
  RECENT_TRANSACTIONS_DATA,
  INITIAL_RECENT_TRANSACTIONS_KPIS,
} from "./recentTransactionsMockData";
import {
  RecentTransactionItem,
  RecentTransactionsKpis,
} from "./recentTransactionsTypes";

export default function RecentTransactionsView() {
  const router = useRouter();

  const [selectedHeaderDate, setSelectedHeaderDate] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [selectedSource, setSelectedSource] = useState("All Sources");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTx, setSelectedTx] = useState<RecentTransactionItem | null>(null);

  const itemsPerPage = 8;

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const mainEl = document.querySelector("main");
    if (mainEl) {
      mainEl.scrollTo({ top: 0, left: 0, behavior: "instant" });
      mainEl.scrollTop = 0;
    }
  }, []);

  const handleBackToFinance = () => {
    router.push("/superadmin/finance");
  };

  const hasActiveFilters = Boolean(
    searchTerm ||
    selectedSource !== "All Sources" ||
    selectedStatus !== "All Status" ||
    fromDate ||
    toDate
  );

  const handleClearAll = () => {
    setSearchTerm("");
    setFromDate(null);
    setToDate(null);
    setSelectedSource("All Sources");
    setSelectedStatus("All Status");
    setCurrentPage(1);
  };

  const filteredTransactions = useMemo(() => {
    return RECENT_TRANSACTIONS_DATA.filter((tx) => {
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesQuery =
          tx.id.toLowerCase().includes(query) ||
          tx.source.toLowerCase().includes(query) ||
          tx.customerName.toLowerCase().includes(query) ||
          tx.amount.toLowerCase().includes(query) ||
          tx.referenceId.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      if (selectedSource !== "All Sources" && tx.source !== selectedSource) {
        return false;
      }

      if (selectedStatus !== "All Status" && tx.status !== selectedStatus) {
        return false;
      }

      if (fromDate || toDate) {
        const txDate = new Date(tx.date);
        txDate.setHours(0, 0, 0, 0);
        const txTime = txDate.getTime();

        if (fromDate) {
          const fromObj = new Date(fromDate);
          fromObj.setHours(0, 0, 0, 0);
          if (txTime < fromObj.getTime()) return false;
        }

        if (toDate) {
          const toObj = new Date(toDate);
          toObj.setHours(23, 59, 59, 999);
          if (txTime > toObj.getTime()) return false;
        }
      }

      return true;
    });
  }, [searchTerm, selectedSource, selectedStatus, fromDate, toDate]);

  const kpis: RecentTransactionsKpis = useMemo(() => {
    if (!hasActiveFilters) {
      return INITIAL_RECENT_TRANSACTIONS_KPIS;
    }

    const totalCount = filteredTransactions.length;
    const paidList = filteredTransactions.filter((t) => t.status === "Paid");
    const pendingList = filteredTransactions.filter((t) => t.status === "Pending");
    const receivedSum = filteredTransactions
      .filter((t) => t.type === "Payment Received")
      .reduce((acc, t) => acc + t.numericAmount, 0);

    const formatter = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

    return {
      totalTransactions: totalCount,
      paymentsReceived: formatter.format(receivedSum),
      paid: paidList.length,
      pending: pendingList.length,
    };
  }, [filteredTransactions, hasActiveFilters]);

  const totalItems = filteredTransactions.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTransactions, currentPage, itemsPerPage]);

  return (
    <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6 sm:gap-7 max-w-full overflow-x-hidden min-w-0">
      <RecentTransactionsHeader
        selectedDate={selectedHeaderDate}
        onDateChange={setSelectedHeaderDate}
        onBack={handleBackToFinance}
      />

      <RecentTransactionsKpiCards kpis={kpis} />

      <RecentTransactionsFilterBar
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
        selectedSource={selectedSource}
        onSourceChange={(val) => {
          setSelectedSource(val);
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

      <RecentTransactionsTable
        transactions={paginatedTransactions}
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onViewTransaction={setSelectedTx}
      />

      <RecentTransactionDetailModal
        transaction={selectedTx}
        onClose={() => setSelectedTx(null)}
      />
    </div>
  );
}
