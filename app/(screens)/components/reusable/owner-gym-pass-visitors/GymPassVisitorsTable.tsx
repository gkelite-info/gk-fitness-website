"use client";

import Avatar from "@/app/(screens)/components/reusable/Avatar";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeadCell,
  TableCell,
} from "@/app/(screens)/components/reusable/table";
import { GymPassVisitor } from "./types";

interface GymPassVisitorsTableProps {
  visitors: GymPassVisitor[];
  onView: (visitor: GymPassVisitor) => void;
}

export default function GymPassVisitorsTable({
  visitors,
  onView,
}: GymPassVisitorsTableProps) {
  if (visitors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[260px] p-8 rounded-2xl bg-[#101217] border border-[#1E222D] text-center w-full">
        <p className="text-base font-bold text-white mb-1">No visitors found</p>
        <p className="text-xs sm:text-sm text-[#94A3B8]">
          Try adjusting your search query, date range, or pass type filters
        </p>
      </div>
    );
  }

  return (
    <Table className="bg-[#101217] border-[#1C212B]">
      <TableHeader>
        <TableRow className="border-b border-[#1C212B]">
          <TableHeadCell className="w-12">#</TableHeadCell>
          <TableHeadCell>CUSTOMER NAME</TableHeadCell>
          <TableHeadCell>PHONE</TableHeadCell>
          <TableHeadCell>PASS TYPE</TableHeadCell>
          <TableHeadCell>VISIT DATE</TableHeadCell>
          <TableHeadCell>CHECK-IN TIME</TableHeadCell>
          <TableHeadCell>STATUS</TableHeadCell>
          <TableHeadCell className="text-right">ACTION</TableHeadCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {visitors.map((visitor) => {
          const isMonthly = visitor.passType === "Monthly Pass";
          const isVisited = visitor.status === "Visited";

          return (
            <TableRow
              key={visitor.id}
              className="border-b border-[#171B24] hover:bg-[#141822]/60 transition-colors"
            >
              <TableCell className="text-[#64748B] font-mono text-xs">
                {visitor.serial}
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar
                    src={visitor.avatarUrl}
                    gender={visitor.gender}
                    className="w-8 h-8 rounded-full shrink-0 ring-1 ring-white/10"
                  />
                  <span className="font-semibold text-sm text-white whitespace-nowrap">
                    {visitor.name}
                  </span>
                </div>
              </TableCell>

              <TableCell className="text-[#94A3B8] font-mono text-xs sm:text-sm">
                {visitor.phone}
              </TableCell>

              <TableCell>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                    isMonthly
                      ? "bg-[rgba(6,78,59,0.5)] border border-[rgba(52,211,153,0.3)] text-[#34D399]"
                      : "bg-[rgba(23,37,84,0.6)] border border-[rgba(56,189,248,0.3)] text-[#38BDF8]"
                  }`}
                >
                  {visitor.passType}
                </span>
              </TableCell>

              <TableCell className="text-[#94A3B8] text-xs sm:text-sm">
                {visitor.visitDate}
              </TableCell>

              <TableCell className="text-[#94A3B8] text-xs sm:text-sm">
                {visitor.checkInTime}
              </TableCell>

              <TableCell>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
                    isVisited
                      ? "bg-[rgba(6,78,59,0.4)] border border-[rgba(52,211,153,0.25)] text-[#34D399]"
                      : "bg-[rgba(76,5,25,0.4)] border border-[rgba(244,63,94,0.25)] text-[#FB7185]"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isVisited ? "bg-[#34D399]" : "bg-[#FB7185]"
                    }`}
                  />
                  {visitor.status}
                </span>
              </TableCell>

              <TableCell className="text-right">
                <button
                  type="button"
                  onClick={() => onView(visitor)}
                  className="px-3.5 py-1.5 rounded-lg border border-[#232733] bg-[#12141B] text-[#94A3B8] hover:text-[#D4FF32] hover:border-[#D4FF32] text-xs font-semibold transition-all cursor-pointer"
                >
                  View
                </button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
