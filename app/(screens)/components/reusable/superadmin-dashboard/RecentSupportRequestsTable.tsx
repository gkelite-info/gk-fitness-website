"use client";

import { useState, useMemo } from "react";
import { MagnifyingGlass, Funnel } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeadCell,
  TableCell,
} from "@/app/(screens)/components/reusable/table";
import Dropdown from "@/app/(screens)/components/reusable/Dropdown";
import {
  RECENT_SUPPORT_REQUESTS_DATA,
  REQUEST_FILTER_OPTIONS,
  CATEGORY_STYLES,
  STATUS_STYLES,
} from "./types";

export default function RecentSupportRequestsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredRequests = useMemo(() => {
    let result = RECENT_SUPPORT_REQUESTS_DATA;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (r) =>
          r.gymName.toLowerCase().includes(q) ||
          r.subject.toLowerCase().includes(q) ||
          r.requestedBy.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "All") {
      result = result.filter((r) => r.status === statusFilter);
    }
    return result;
  }, [searchQuery, statusFilter]);

  return (
    <div
      id="support-requests-section"
      className="w-full min-h-[355px] bg-[#0F1722] border border-[#172332] rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.05)] flex flex-col relative"
    >
      <div className="p-3.5 sm:p-5 border-b border-[#172332] flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-30">
        <h3 className="text-sm font-semibold text-white tracking-normal leading-5">
          Recent Support Requests
        </h3>

        <div className="flex items-center gap-2.5">
          <div className="relative w-full sm:w-[213px]">
            <MagnifyingGlass
              size={14}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search requests..."
              className="w-full h-[30px] pl-8 pr-3 rounded-lg bg-[#141F2D] border border-[#202F43] text-xs text-white placeholder-[#94A3B8] outline-none focus:border-[#38BDF8] transition-colors"
            />
          </div>

          <div className="w-[145px] sm:w-[155px] shrink-0">
            <Dropdown
              options={REQUEST_FILTER_OPTIONS}
              value={statusFilter}
              onChange={(val) => setStatusFilter(val)}
              placeholder="Filter"
              direction="down"
              align="right"
              noTruncate
              icon={<Funnel size={13} className="text-[#94A3B8]" />}
              triggerClassName="relative flex flex-row items-center px-3 py-1.5 w-full bg-[#141F2D] border border-[#202F43] rounded-lg cursor-pointer h-[30px] hover:border-[#38BDF8] text-xs font-medium text-[#CBD5E1]"
            />
          </div>
        </div>
      </div>

      <Table
        className="!border-0 !rounded-none !bg-transparent w-full max-w-full flex-1 rounded-b-xl"
        tableClassName="min-w-[850px]"
      >
        <TableHeader className="!bg-[rgba(18,28,41,0.6)] !border-b !border-[#172332]">
          <TableRow className="border-b border-[#172332]">
            <TableHeadCell className="!py-3 !px-4 !w-10 text-center !text-[#94A3B8] !text-[11px] !font-medium !tracking-wider">
              #
            </TableHeadCell>
            <TableHeadCell className="!py-3 !px-4 !text-[#94A3B8] !text-[11px] !font-medium !tracking-wider">
              GYM NAME
            </TableHeadCell>
            <TableHeadCell className="!py-3 !px-4 !text-[#94A3B8] !text-[11px] !font-medium !tracking-wider">
              SUBJECT
            </TableHeadCell>
            <TableHeadCell className="!py-3 !px-4 !text-[#94A3B8] !text-[11px] !font-medium !tracking-wider">
              REQUESTED BY
            </TableHeadCell>
            <TableHeadCell className="!py-3 !px-4 !text-[#94A3B8] !text-[11px] !font-medium !tracking-wider">
              CATEGORY
            </TableHeadCell>
            <TableHeadCell className="!py-3 !px-4 !text-[#94A3B8] !text-[11px] !font-medium !tracking-wider">
              DATE
            </TableHeadCell>
            <TableHeadCell className="!py-3 !px-4 !text-[#94A3B8] !text-[11px] !font-medium !tracking-wider">
              STATUS
            </TableHeadCell>
            <TableHeadCell className="!py-3 !px-4 text-center !text-[#94A3B8] !text-[11px] !font-medium !tracking-wider">
              ACTIONS
            </TableHeadCell>
          </TableRow>
        </TableHeader>
        <TableBody className="!divide-[#172332]">
          {filteredRequests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="!py-14 text-center text-[#94A3B8] text-xs">
                No support requests found matching the selected filter.
              </TableCell>
            </TableRow>
          ) : (
            filteredRequests.map((req) => {
              const statusStyle = STATUS_STYLES[req.status] || STATUS_STYLES["Open"];
              return (
                <TableRow
                  key={req.id}
                  className="hover:!bg-[#121B27] transition-colors border-b border-[#172332] last:border-0"
                >
                  <TableCell className="!py-3.5 !px-4 text-center text-[#94A3B8] font-medium">
                    {req.serial}
                  </TableCell>
                  <TableCell className="!py-3.5 !px-4 font-medium text-white whitespace-nowrap">
                    {req.gymName}
                  </TableCell>
                  <TableCell
                    className="!py-3.5 !px-4 text-[#CBD5E1] max-w-[220px] truncate"
                    title={req.subject}
                  >
                    {req.subject}
                  </TableCell>
                  <TableCell className="!py-3.5 !px-4 text-[#CBD5E1] whitespace-nowrap">
                    {req.requestedBy}
                  </TableCell>
                  <TableCell className="!py-3.5 !px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded border text-[11px] font-medium ${
                        CATEGORY_STYLES[req.category] || "bg-[#1E293B] border-[#334155] text-white"
                      }`}
                    >
                      {req.category}
                    </span>
                  </TableCell>
                  <TableCell className="!py-3.5 !px-4 text-[#CBD5E1] whitespace-nowrap">
                    {req.date}
                  </TableCell>
                  <TableCell className="!py-3.5 !px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${statusStyle.wrapper}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
                      {req.status}
                    </span>
                  </TableCell>
                  <TableCell className="!py-3.5 !px-4 text-center whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() =>
                        toast(`Support Ticket #${req.serial}: ${req.subject}`, { icon: "🎫" })
                      }
                      className="h-[26px] px-3 rounded-md bg-[#141E2B] hover:bg-[#1F2C3E] border border-[#233549] text-[11px] font-medium text-[#E2E8F0] hover:text-white transition-all cursor-pointer active:scale-95"
                    >
                      View
                    </button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
