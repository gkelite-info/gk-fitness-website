"use client";

import { useState } from "react";
import { Clock, Check } from "@phosphor-icons/react";
import { PayoutHistoryItem } from "./payoutDetailsData";
import MonthCalendarPicker from "@/app/(screens)/components/reusable/MonthCalendarPicker";
import Pagination from "@/app/(screens)/components/reusable/Pagination";
import { SHORT_MONTHS, MONTH_NAMES } from "@/app/(screens)/components/reusable/monthCalendarUtils";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeadCell,
  TableCell,
} from "@/app/(screens)/components/reusable/table";

interface GymPayoutHistoryTableProps {
  history: PayoutHistoryItem[];
}

export default function GymPayoutHistoryTable({
  history,
}: GymPayoutHistoryTableProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const selectedMonthStr = SHORT_MONTHS[selectedDate.getMonth()];
  const selectedYearStr = selectedDate.getFullYear().toString();

  const filteredHistory = history.filter(
    (item) =>
      item.date.includes(selectedMonthStr) &&
      item.date.includes(selectedYearStr)
  );

  const totalPages = Math.max(1, Math.ceil(filteredHistory.length / itemsPerPage));
  const paginatedHistory = filteredHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full bg-[#13151B] border border-[#232631] rounded-2xl shadow-sm flex flex-col p-4 sm:p-5 gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Clock size={20} weight="fill" className="text-[#D4FF32] shrink-0" />
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Payout History{" "}
            <span className="text-[#94A3B8] font-normal text-sm">
              ({filteredHistory.length})
            </span>
          </h3>
        </div>

        <div className="w-full sm:w-auto shrink-0">
          <MonthCalendarPicker
            value={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setCurrentPage(1);
            }}
            className="w-full sm:w-48 lg:w-52 shrink-0"
          />
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <Table className="border-none rounded-none bg-transparent">
          <TableHeader className="bg-transparent border-b border-[#1E222D]">
            <TableRow className="hover:bg-transparent">
              <TableHeadCell className="py-3 pl-3 sm:pl-4 text-[#8E95A9]">Date</TableHeadCell>
              <TableHeadCell className="py-3 px-3 text-[#8E95A9]">Time</TableHeadCell>
              <TableHeadCell className="py-3 px-3 text-[#8E95A9]">Amount</TableHeadCell>
              <TableHeadCell className="py-3 px-3 text-[#8E95A9]">Status</TableHeadCell>
              <TableHeadCell className="py-3 pr-3 sm:pr-4 text-[#8E95A9]">Reference ID</TableHeadCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-[#181A22]">
            {paginatedHistory.map((item) => {
              const isPaid = item.status === "Paid";

              return (
                <TableRow key={item.id} className="hover:bg-[#161822] transition-colors">
                  <TableCell className="py-3.5 pl-3 sm:pl-4 font-medium text-white text-xs sm:text-sm whitespace-nowrap">
                    {item.date}
                  </TableCell>

                  <TableCell className="py-3.5 px-3 text-xs sm:text-sm text-[#94A3B8] whitespace-nowrap">
                    {item.time}
                  </TableCell>

                  <TableCell className="py-3.5 px-3 font-bold text-white text-xs sm:text-sm whitespace-nowrap">
                    ₹{item.amount.toLocaleString("en-IN")}
                  </TableCell>

                  <TableCell className="py-3.5 px-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        isPaid
                          ? "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/25"
                          : "bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/25"
                      }`}
                    >
                      {isPaid ? (
                        <Check size={12} weight="bold" />
                      ) : (
                        <Clock size={12} weight="bold" />
                      )}
                      <span>{item.status}</span>
                    </span>
                  </TableCell>

                  <TableCell className="py-3.5 pr-3 sm:pr-4 text-xs font-mono text-[#94A3B8] tracking-wider whitespace-nowrap">
                    {item.referenceId}
                  </TableCell>
                </TableRow>
              );
            })}

            {filteredHistory.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-10 text-center text-[#64748B]">
                  <p className="text-sm">
                    No payout history found for{" "}
                    <span className="text-white font-semibold">
                      {MONTH_NAMES[selectedDate.getMonth()]} {selectedYearStr}
                    </span>
                    .
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {filteredHistory.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredHistory.length}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}
