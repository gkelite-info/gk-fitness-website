"use client";

import { useState } from "react";
import FinanceHeaderTabs from "./FinanceHeaderTabs";
import TransactionsKpiCards from "./TransactionsKpiCards";
import TransactionsFilterBar from "./TransactionsFilterBar";
import AllTransactionsTable from "./AllTransactionsTable";
import { TRANSACTIONS_MOCK_DATA } from "./transactionsMockData";
import {
  FinanceTransactionRecord,
  TransactionFilterType,
  TransactionFilterSource,
} from "./types";

interface SuperAdminTransactionsViewProps {
  onSelectTransaction: (tx: FinanceTransactionRecord) => void;
}

export default function SuperAdminTransactionsView({
  onSelectTransaction,
}: SuperAdminTransactionsViewProps) {
  const [selectedType, setSelectedType] =
    useState<TransactionFilterType>("All");
  const [selectedSource, setSelectedSource] =
    useState<TransactionFilterSource>("All");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);

  const handleClearFilters = () => {
    setSelectedType("All");
    setSelectedSource("All");
    setFromDate(null);
    setToDate(null);
    setSearchTerm("");
    setSelectedStatus("All Status");
    setCurrentPage(1);
  };

  const filteredTransactions = TRANSACTIONS_MOCK_DATA.filter((tx) => {
    if (selectedType !== "All" && tx.type !== selectedType) {
      return false;
    }

    if (selectedSource !== "All") {
      const sourceKey = selectedSource.toLowerCase().replace(/s$/, "");
      const txSourceKey = tx.source.toLowerCase().replace(/s$/, "");
      if (!txSourceKey.includes(sourceKey) && !sourceKey.includes(txSourceKey)) {
        return false;
      }
    }

    if (selectedStatus !== "All Status" && tx.status !== selectedStatus) {
      return false;
    }

    if (searchTerm.trim() !== "") {
      const query = searchTerm.toLowerCase();
      const matchId = tx.id.toLowerCase().includes(query);
      const matchName = tx.fromToName.toLowerCase().includes(query);
      const matchSource = tx.source.toLowerCase().includes(query);
      const matchRef = tx.referenceId.toLowerCase().includes(query);
      const matchAmount = tx.amount.toLowerCase().includes(query);

      if (!matchId && !matchName && !matchSource && !matchRef && !matchAmount) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="flex flex-col gap-6 sm:gap-7 w-full max-w-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Finance
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8]">
          Complete financial history of all transactions.
        </p>
      </div>

      <FinanceHeaderTabs />

      <div className="flex flex-col gap-1">
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          All Transactions
        </h2>
        <p className="text-xs sm:text-sm text-[#94A3B8]">
          View and track all incoming and outgoing transactions.
        </p>
      </div>

      <TransactionsKpiCards />

      <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-4 sm:p-5 flex flex-col gap-5 w-full">
        <TransactionsFilterBar
          selectedType={selectedType}
          onTypeChange={(type) => {
            setSelectedType(type);
            setCurrentPage(1);
          }}
          selectedSource={selectedSource}
          onSourceChange={(source) => {
            setSelectedSource(source);
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
          searchTerm={searchTerm}
          onSearchChange={(search) => {
            setSearchTerm(search);
            setCurrentPage(1);
          }}
          selectedStatus={selectedStatus}
          onStatusChange={(status) => {
            setSelectedStatus(status);
            setCurrentPage(1);
          }}
          onClear={handleClearFilters}
        />

        <AllTransactionsTable
          transactions={filteredTransactions}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onViewDetails={onSelectTransaction}
          itemsPerPage={8}
        />
      </div>
    </div>
  );
}
