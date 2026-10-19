"use client";

import { useState } from "react";
import {
  MagnifyingGlass,
  CaretDown,
  CaretRight,
  ArrowsDownUp,
  Buildings,
  User,
  Users,
  Ticket,
} from "@phosphor-icons/react";
import Pagination from "@/app/(screens)/components/reusable/Pagination";
import { RevenueTransaction } from "./types";

interface RevenueTransactionsTableProps {
  transactions: RevenueTransaction[];
  onViewDetails: (tx: RevenueTransaction) => void;
}

export default function RevenueTransactionsTable({
  transactions,
  onViewDetails,
}: RevenueTransactionsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All Status");
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const statusOptions = ["All Status", "Paid", "Pending", "Failed"];

  const getSourceIcon = (category: RevenueTransaction["sourceCategory"]) => {
    switch (category) {
      case "gym-labels":
        return (
          <div className="w-7 h-7 rounded-lg bg-[#0D261C] border border-[#164E37]/40 flex items-center justify-center shrink-0">
            <Buildings size={15} weight="fill" className="text-[#10B981]" />
          </div>
        );
      case "customer-plans":
        return (
          <div className="w-7 h-7 rounded-lg bg-[#0E2038] border border-[#1E3A5F]/40 flex items-center justify-center shrink-0">
            <User size={15} weight="fill" className="text-[#38BDF8]" />
          </div>
        );
      case "global-sessions":
        return (
          <div className="w-7 h-7 rounded-lg bg-[#241432] border border-[#482069]/40 flex items-center justify-center shrink-0">
            <Users size={15} weight="fill" className="text-[#C084FC]" />
          </div>
        );
      case "gym-pass":
        return (
          <div className="w-7 h-7 rounded-lg bg-[#2E180E] border border-[#633017]/40 flex items-center justify-center shrink-0">
            <Ticket size={15} weight="fill" className="text-[#FB923C]" />
          </div>
        );
      default:
        return null;
    }
  };

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const handleStatusChange = (val: string) => {
    setStatusFilter(val);
    setCurrentPage(1);
    setIsStatusOpen(false);
  };

  const filtered = transactions.filter((tx) => {
    const matchesSearch =
      tx.paidBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.amount.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.source.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" || tx.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const paginatedTransactions = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-4 sm:p-5 flex flex-col gap-4 w-full">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 px-3.5 py-2 bg-[#181D26] border border-[#262F3E] rounded-xl flex-1 max-w-md">
          <MagnifyingGlass size={16} className="text-[#64748B] shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by name, reference or amount..."
            className="bg-transparent border-none outline-none text-xs sm:text-sm text-white placeholder-[#64748B] w-full"
          />
        </div>

        <div className="relative flex items-center gap-2 shrink-0 self-end sm:self-auto">
          <span className="text-xs text-[#64748B] font-medium">Status</span>
          <button
            type="button"
            onClick={() => setIsStatusOpen(!isStatusOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#181D26] border border-[#262F3E] text-xs font-semibold text-white hover:border-[#383D50] transition-colors cursor-pointer select-none"
          >
            <span>{statusFilter}</span>
            <CaretDown
              size={12}
              className={`text-[#94A3B8] transition-transform ${
                isStatusOpen ? "rotate-180 text-white" : ""
              }`}
            />
          </button>

          {isStatusOpen && (
            <div className="absolute right-0 top-full mt-1.5 z-30 w-32 bg-[#181D26] border border-[#262F3E] rounded-xl py-1 shadow-2xl backdrop-blur-md">
              {statusOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleStatusChange(opt)}
                  className={`w-full text-left px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                    statusFilter === opt
                      ? "text-[#D4FF32] bg-[#232B3C]"
                      : "text-[#CBD5E1] hover:text-white hover:bg-[#1E2432]"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-full overflow-x-auto scrollbar-none">
        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="border-b border-[#181B24] text-[11px] font-semibold text-[#64748B] tracking-wider">
              <th className="py-2.5 px-3">
                <div className="flex items-center gap-1 cursor-pointer hover:text-white select-none">
                  <span>Date</span>
                  <ArrowsDownUp size={11} />
                </div>
              </th>
              <th className="py-2.5 px-3">
                <div className="flex items-center gap-1 cursor-pointer hover:text-white select-none">
                  <span>Source</span>
                  <ArrowsDownUp size={11} />
                </div>
              </th>
              <th className="py-2.5 px-3">
                <div className="flex items-center gap-1 cursor-pointer hover:text-white select-none">
                  <span>Paid By</span>
                  <ArrowsDownUp size={11} />
                </div>
              </th>
              <th className="py-2.5 px-3">
                <div className="flex items-center gap-1 cursor-pointer hover:text-white select-none">
                  <span>Reference</span>
                  <ArrowsDownUp size={11} />
                </div>
              </th>
              <th className="py-2.5 px-3">
                <div className="flex items-center gap-1 cursor-pointer hover:text-white select-none">
                  <span>Amount</span>
                  <ArrowsDownUp size={11} />
                </div>
              </th>
              <th className="py-2.5 px-3">
                <div className="flex items-center gap-1 cursor-pointer hover:text-white select-none">
                  <span>Status</span>
                  <ArrowsDownUp size={11} />
                </div>
              </th>
              <th className="py-2.5 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#181B24]/60">
            {paginatedTransactions.map((tx) => (
              <tr
                key={tx.id}
                className="hover:bg-[#161822] transition-colors group cursor-pointer"
                onClick={() => onViewDetails(tx)}
              >
                <td className="py-3 px-3 text-xs font-medium text-[#CBD5E1] whitespace-nowrap">
                  {tx.date}
                </td>
                <td className="py-3 px-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {getSourceIcon(tx.sourceCategory)}
                    <span className="text-xs sm:text-sm font-semibold text-white">
                      {tx.source}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-3 text-xs sm:text-sm font-medium text-[#CBD5E1] whitespace-nowrap">
                  {tx.paidBy}
                </td>
                <td className="py-3 px-3 text-xs sm:text-sm font-medium text-[#94A3B8] whitespace-nowrap">
                  {tx.reference}
                </td>
                <td className="py-3 px-3 text-xs sm:text-sm font-bold text-white whitespace-nowrap">
                  {tx.amount}
                </td>
                <td className="py-3 px-3 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium bg-[#0D261C] text-[#10B981] border border-[#164E37]/50">
                    {tx.status}
                  </span>
                </td>
                <td className="py-3 px-3 text-right whitespace-nowrap">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetails(tx);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#181D26] hover:bg-[#232B3C] border border-[#262F3E] text-xs font-semibold text-white transition-colors cursor-pointer"
                  >
                    <span>View</span>
                    <CaretRight size={12} weight="bold" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
