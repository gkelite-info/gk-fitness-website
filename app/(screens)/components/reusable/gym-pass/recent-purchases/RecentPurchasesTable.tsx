"use client";

import { useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import CustomDropdown from "@/app/(screens)/components/reusable/CustomDropdown";
import MonthCalendarPicker from "@/app/(screens)/components/reusable/MonthCalendarPicker";
import Pagination from "@/app/(screens)/components/reusable/Pagination";
import { SHORT_MONTHS } from "@/app/(screens)/components/reusable/monthCalendarUtils";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeadCell,
  TableCell,
} from "@/app/(screens)/components/reusable/table";
import {
  mockPurchasesList,
  passTypeFilterOptions,
} from "./recentPurchasesData";

export default function RecentPurchasesTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPassType, setSelectedPassType] = useState("All Passes");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const selectedMonthStr = SHORT_MONTHS[selectedDate.getMonth()];
  const selectedYearStr = selectedDate.getFullYear().toString();

  const filtered = mockPurchasesList.filter((item) => {
    const search = searchTerm.toLowerCase();
    const matchSearch =
      item.name.toLowerCase().includes(search) ||
      item.customerId.toLowerCase().includes(search) ||
      item.phone.toLowerCase().includes(search) ||
      item.email.toLowerCase().includes(search);
    const matchType =
      selectedPassType === "All Passes" || item.passType === selectedPassType;
    const matchDate =
      item.dateText.toLowerCase().includes(selectedMonthStr.toLowerCase()) &&
      item.dateText.includes(selectedYearStr);
    return matchSearch && matchType && matchDate;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const paginatedPurchases = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#13151B] border border-[#232631] rounded-2xl p-3 sm:p-4 shadow-sm">
        <div className="relative w-full md:w-80 lg:w-96">
          <MagnifyingGlass
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search customer, transaction ID, email or phone.."
            className="w-full pl-10 pr-4 py-2 bg-[#181A22] border border-[#242836] focus:border-[#D4FF32] rounded-xl text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none transition-colors h-[40px]"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
          <div className="w-full sm:w-40">
            <CustomDropdown
              options={passTypeFilterOptions}
              value={selectedPassType}
              onChange={(val) => {
                setSelectedPassType(val);
                setCurrentPage(1);
              }}
              triggerClassName="relative flex flex-row items-center justify-between px-3 py-2 w-full bg-[#181A22] border border-[#242836] rounded-xl text-xs sm:text-sm text-white transition-colors cursor-pointer h-[40px]"
            />
          </div>

          <div className="w-full sm:w-48 lg:w-52">
            <MonthCalendarPicker
              value={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                setCurrentPage(1);
              }}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="w-full bg-[#13151B] border border-[#232631] rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <Table className="border-none rounded-none bg-transparent">
          <TableHeader className="bg-transparent border-b border-[#1E222D]">
            <TableRow className="hover:bg-transparent">
              <TableHeadCell className="py-4 pl-5">Customer</TableHeadCell>
              <TableHeadCell className="py-4 px-4">Contact Details (Mobile & Email)</TableHeadCell>
              <TableHeadCell className="py-4 px-4">Pass Type</TableHeadCell>
              <TableHeadCell className="py-4 px-4">Time & Date</TableHeadCell>
              <TableHeadCell className="py-4 pr-5 text-right">Amount</TableHeadCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-[#181A22]">
            {paginatedPurchases.map((item) => {
              const isMonthly = item.passType === "Monthly Pass";

              return (
                <TableRow key={item.id} className="hover:bg-[#161822] transition-colors">
                  <TableCell className="py-3.5 pl-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#1E293B] border border-[#334155] text-[#93C5FD] font-bold text-xs flex items-center justify-center shrink-0">
                        {item.initials}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-white truncate text-xs sm:text-sm">
                          {item.name}
                        </span>
                        <span className="text-[11px] text-[#64748B] font-mono mt-0.5">
                          {item.customerId}
                        </span>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="py-3.5 px-4">
                    <div className="flex flex-col min-w-0">
                      <span className="text-white font-medium text-xs sm:text-sm">
                        {item.phone}
                      </span>
                      <span className="text-[11px] text-[#64748B] truncate mt-0.5">
                        {item.email}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="py-3.5 px-4">
                    <span
                      className={`inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap ${
                        isMonthly
                          ? "bg-[#8B5CF6]/15 text-[#C4B5FD] border border-[#8B5CF6]/30"
                          : "bg-[#10B981]/15 text-[#6EE7B7] border border-[#10B981]/30"
                      }`}
                    >
                      {item.passType}
                    </span>
                  </TableCell>

                  <TableCell className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="text-white font-medium text-xs sm:text-sm">
                        {item.timeAgo} • <span className="text-[#94A3B8]">{item.exactTime}</span>
                      </span>
                      <span className="text-[11px] text-[#64748B] mt-0.5">
                        {item.dateText}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell className="py-3.5 pr-5 text-right font-bold text-white text-sm sm:text-base whitespace-nowrap">
                    ₹{item.amount.toLocaleString("en-IN")}
                  </TableCell>
                </TableRow>
              );
            })}

            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-12 text-center text-[#64748B]">
                  No recent purchases match your filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="p-4 border-t border-[#1E222D] bg-[#13151B]">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filtered.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
}
