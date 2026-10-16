"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  MagnifyingGlass,
  Clock,
  Check,
  CaretRight,
  Barbell,
} from "@phosphor-icons/react";

import CustomDropdown, { DropdownOption } from "@/app/(screens)/components/reusable/CustomDropdown";
import MonthCalendarPicker from "@/app/(screens)/components/reusable/MonthCalendarPicker";
import Pagination from "@/app/(screens)/components/reusable/Pagination";

interface GymPayoutRecord {
  id: string;
  gymName: string;
  ownerName: string;
  amount: number;
  status: "Pending" | "Paid";
  paidDate?: string;
}

const mockGymPayouts: GymPayoutRecord[] = [
  {
    id: "1",
    gymName: "Gold Fitness",
    ownerName: "Rahul Sharma",
    amount: 78500,
    status: "Pending",
  },
  {
    id: "2",
    gymName: "Power House",
    ownerName: "Amit Verma",
    amount: 62250,
    status: "Pending",
  },
  {
    id: "3",
    gymName: "Ultimate Gym",
    ownerName: "Neha Patel",
    amount: 48900,
    status: "Pending",
  },
  {
    id: "4",
    gymName: "FitCore Studio",
    ownerName: "Sandeep Iyer",
    amount: 36750,
    status: "Paid",
    paidDate: "Paid on 02 Sep 2026",
  },
  {
    id: "5",
    gymName: "Iron Edge Gym",
    ownerName: "Vikram Singh",
    amount: 28600,
    status: "Paid",
    paidDate: "Paid on 01 Sep 2026",
  },
  {
    id: "6",
    gymName: "Max Fitness",
    ownerName: "Priya Nair",
    amount: 22300,
    status: "Paid",
    paidDate: "Paid on 31 Aug 2026",
  },
];

const sortOptions: DropdownOption[] = [
  { label: "Sort by: Amount (High to Low)", value: "high-to-low" },
  { label: "Sort by: Amount (Low to High)", value: "low-to-high" },
  { label: "Sort by: Gym Name", value: "name" },
];

export default function GymPayoutsList() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSort, setSelectedSort] = useState("high-to-low");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const filtered = mockGymPayouts
    .filter((g) => {
      const matchSearch =
        g.gymName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchSearch;
    })
    .sort((a, b) => {
      if (selectedSort === "high-to-low") return b.amount - a.amount;
      if (selectedSort === "low-to-high") return a.amount - b.amount;
      return a.gymName.localeCompare(b.gymName);
    });

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const paginatedGyms = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-[#13151B] border border-[#232631] rounded-2xl p-3 sm:p-4 shadow-sm">
        <div className="relative w-full md:w-72 lg:w-80">
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
            placeholder="Search gym name or owner"
            className="w-full pl-10 pr-4 py-2 bg-[#181A22] border border-[#242836] focus:border-[#D4FF32] rounded-xl text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none transition-colors h-[40px]"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
          <MonthCalendarPicker
            value={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setCurrentPage(1);
            }}
            className="w-full sm:w-48 lg:w-52 shrink-0"
          />

          <div className="w-full sm:w-60 md:w-64 shrink-0">
            <CustomDropdown
              options={sortOptions}
              value={selectedSort}
              onChange={(val) => {
                setSelectedSort(val);
                setCurrentPage(1);
              }}
              triggerClassName="relative flex flex-row items-center justify-between px-3 py-2 w-full bg-[#181A22] border border-[#242836] rounded-xl text-xs sm:text-sm text-white transition-colors cursor-pointer h-[40px]"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
          All Gyms <span className="text-[#94A3B8] font-normal">({filtered.length})</span>
        </h2>

        <div className="flex flex-col gap-3">
          {paginatedGyms.map((gym) => {
            const isPending = gym.status === "Pending";

            return (
              <div
                key={gym.id}
                onClick={() => {
                  const base = pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
                  router.push(`${base}/${gym.id}`);
                }}
                className="w-full bg-[#13151B] border border-[#232631] hover:border-[#383D50] hover:bg-[#161822] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all cursor-pointer shadow-sm group"
              >
                <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                  <div className="w-12 h-12 rounded-full bg-[#181A22] border border-[#262B3A] flex items-center justify-center text-[#94A3B8] group-hover:text-[#D4FF32] shrink-0">
                    <Barbell size={22} weight="fill" />
                  </div>

                  <div className="flex flex-col min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-white truncate group-hover:text-[#D4FF32] transition-colors">
                      {gym.gymName}
                    </h3>
                    <span className="text-xs text-[#94A3B8] mt-0.5 truncate">
                      Owner: {gym.ownerName}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3.5 sm:gap-4 shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#1E222D]">
                  <div className="flex flex-col items-start sm:items-end">
                    <span className="text-lg sm:text-xl font-bold text-white tracking-tight leading-none">
                      ₹{gym.amount.toLocaleString("en-IN")}
                    </span>

                    <div className="mt-1.5 flex flex-col items-start sm:items-end">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          isPending
                            ? "bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/25"
                            : "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/25"
                        }`}
                      >
                        {isPending ? (
                          <Clock size={12} weight="bold" />
                        ) : (
                          <Check size={12} weight="bold" />
                        )}
                        <span>{gym.status}</span>
                      </span>

                      {gym.paidDate && (
                        <span className="text-[10px] text-[#94A3B8] mt-1 font-medium">
                          {gym.paidDate}
                        </span>
                      )}
                    </div>
                  </div>

                  <CaretRight size={16} weight="bold" className="text-[#64748B] group-hover:text-white transition-colors" />
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="w-full bg-[#13151B] border border-[#232631] rounded-2xl p-12 text-center text-[#64748B]">
              No partner gym payouts match your search.
            </div>
          )}
        </div>

        {filtered.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={filtered.length}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </div>
  );
}
