"use client";

import { useState } from "react";
import { MagnifyingGlass, CaretRight } from "@phosphor-icons/react";
import { Table, TableHeader, TableBody, TableRow, TableHeadCell, TableCell } from "@/app/(screens)/components/reusable/table";
import Dropdown from "@/app/(screens)/components/reusable/Dropdown";
import MonthCalendarPicker from "@/app/(screens)/components/reusable/MonthCalendarPicker";
import Pagination from "@/app/(screens)/components/reusable/Pagination";
import { GymOwnerPayout } from "./types";

interface GymOwnerPayoutsTableProps {
  payouts: GymOwnerPayout[];
  onViewDetails: (payout: GymOwnerPayout) => void;
}

const STATUS_OPTIONS = [
  { label: "Status: All", value: "all" },
  { label: "Paid", value: "Paid" },
  { label: "Pending", value: "Pending" },
];

export default function GymOwnerPayoutsTable({
  payouts,
  onViewDetails,
}: GymOwnerPayoutsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMonthDate, setSelectedMonthDate] = useState<Date | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleMonthChange = (date: Date) => {
    setSelectedMonthDate(date);
    setCurrentPage(1);
  };

  const formattedFilterMonth = selectedMonthDate
    ? selectedMonthDate.toLocaleString("en-US", { month: "short", year: "numeric" })
    : null;

  const filtered = payouts.filter((p) => {
    const matchesSearch = p.gymName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    const matchesMonth = !formattedFilterMonth || p.payoutMonth.toLowerCase() === formattedFilterMonth.toLowerCase();
    return matchesSearch && matchesStatus && matchesMonth;
  });

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-4 sm:p-5 lg:p-6 flex flex-col gap-4 sm:gap-5 w-full">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 w-full">
        <div className="flex flex-col gap-1 min-w-0">
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Gym Owner Payouts
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8]">
            Payouts to gym owners based on gym pass customer entries.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto">
          <div className="flex items-center gap-2 px-3 py-2 bg-[#181D26] border border-[#262F3E] rounded-xl flex-1 sm:w-60 min-w-0">
            <MagnifyingGlass size={16} className="text-[#64748B] shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search gym name..."
              className="bg-transparent border-none outline-none text-xs sm:text-sm text-white placeholder-[#64748B] w-full"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="w-1/2 sm:w-36 shrink-0">
              <MonthCalendarPicker
                value={selectedMonthDate || new Date(2026, 9, 1)}
                onChange={handleMonthChange}
                label={formattedFilterMonth || "Payout Month"}
                className="w-full"
              />
            </div>

            <div className="w-1/2 sm:w-32 shrink-0">
              <Dropdown
                options={STATUS_OPTIONS}
                value={statusFilter}
                onChange={(val) => {
                  setStatusFilter(val);
                  setCurrentPage(1);
                }}
                placeholder="Status"
                triggerClassName="flex items-center justify-between px-3 py-2 h-[40px] bg-[#181A22] border border-[#242836] hover:border-[#383D50] rounded-xl text-xs sm:text-sm text-white cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto scrollbar-none rounded-xl">
        <Table className="border-0 bg-transparent rounded-none">
          <TableHeader className="bg-[#101217] border-b border-[#1E222D]">
            <TableRow className="border-none hover:bg-transparent">
              <TableHeadCell className="py-3 px-4 text-xs font-semibold text-[#848C99]">
                Gym Name
              </TableHeadCell>
              <TableHeadCell className="py-3 px-4 text-xs font-semibold text-[#848C99]">
                Payout Month
              </TableHeadCell>
              <TableHeadCell className="py-3 px-4 text-xs font-semibold text-[#848C99]">
                Gym Pass Entries
              </TableHeadCell>
              <TableHeadCell className="py-3 px-4 text-xs font-semibold text-[#848C99]">
                Amount
              </TableHeadCell>
              <TableHeadCell className="py-3 px-4 text-xs font-semibold text-[#848C99]">
                Status
              </TableHeadCell>
              <TableHeadCell className="py-3 px-4 text-xs font-semibold text-[#848C99] text-right">
                View Details
              </TableHeadCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-[#181B24]">
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-[#64748B] text-xs sm:text-sm">
                  No payouts found matching criteria.
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((payout) => {
                const isPaid = payout.status === "Paid";
                return (
                  <TableRow
                    key={payout.id}
                    onClick={() => onViewDetails(payout)}
                    className="hover:bg-[#161822] transition-colors cursor-pointer group"
                  >
                    <TableCell className="py-3.5 px-4 text-xs sm:text-sm font-semibold text-white whitespace-nowrap">
                      {payout.gymName}
                    </TableCell>
                    <TableCell className="py-3.5 px-4 text-xs sm:text-sm text-[#94A3B8] whitespace-nowrap">
                      {payout.payoutMonth}
                    </TableCell>
                    <TableCell className="py-3.5 px-4 text-xs sm:text-sm text-[#CBD5E1] whitespace-nowrap">
                      {payout.entries}
                    </TableCell>
                    <TableCell className="py-3.5 px-4 text-xs sm:text-sm font-bold text-white whitespace-nowrap">
                      {payout.amount}
                    </TableCell>
                    <TableCell className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold ${
                          isPaid
                            ? "bg-[#0D261C] text-[#10B981] border border-[#164E37]"
                            : "bg-[#281E10] text-[#F59E0B] border border-[#4E3717]"
                        }`}
                      >
                        {payout.status}
                      </span>
                    </TableCell>
                    <TableCell className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewDetails(payout);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181D26] hover:bg-[#232B3C] border border-[#262F3E] text-xs font-semibold text-white transition-colors cursor-pointer group-hover:border-[#383D50]"
                      >
                        <span>View Details</span>
                        <CaretRight size={12} weight="bold" className="text-[#94A3B8] group-hover:text-white" />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
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
