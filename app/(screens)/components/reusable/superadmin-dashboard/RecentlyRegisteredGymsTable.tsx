"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MagnifyingGlass, MapPin, Funnel } from "@phosphor-icons/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeadCell,
  TableCell,
} from "@/app/(screens)/components/reusable/table";
import Dropdown from "@/app/(screens)/components/reusable/Dropdown";
import { RECENT_GYMS_DATA, GYM_FILTER_OPTIONS } from "./types";

export default function RecentlyRegisteredGymsTable() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredGyms = useMemo(() => {
    let result = RECENT_GYMS_DATA;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (g) =>
          g.gymName.toLowerCase().includes(q) ||
          g.ownerName.toLowerCase().includes(q) ||
          g.location.toLowerCase().includes(q)
      );
    }
    if (statusFilter !== "All") {
      result = result.filter((g) => g.status === statusFilter);
    }
    return result;
  }, [searchQuery, statusFilter]);

  return (
    <div className="w-full min-h-[328px] bg-[#0F1722] border border-[#172332] rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.05)] flex flex-col relative">
      <div className="p-3.5 sm:p-5 border-b border-[#172332] flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-30">
        <h3 className="text-sm font-semibold text-white tracking-normal leading-5">
          Recently Registered Gyms
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
              placeholder="Search gyms..."
              className="w-full h-[30px] pl-8 pr-3 rounded-lg bg-[#141F2D] border border-[#202F43] text-xs text-white placeholder-[#94A3B8] outline-none focus:border-[#38BDF8] transition-colors"
            />
          </div>

          <div className="w-[130px] sm:w-[140px] shrink-0">
            <Dropdown
              options={GYM_FILTER_OPTIONS}
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
        tableClassName="min-w-[760px]"
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
              OWNER NAME
            </TableHeadCell>
            <TableHeadCell className="!py-3 !px-4 !text-[#94A3B8] !text-[11px] !font-medium !tracking-wider">
              LOCATION
            </TableHeadCell>
            <TableHeadCell className="!py-3 !px-4 !text-[#94A3B8] !text-[11px] !font-medium !tracking-wider">
              REGISTERED ON
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
          {filteredGyms.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="!py-14 text-center text-[#94A3B8] text-xs">
                No gyms found matching the selected filter.
              </TableCell>
            </TableRow>
          ) : (
            filteredGyms.map((gym) => (
              <TableRow
                key={gym.id}
                className="hover:!bg-[#121B27] transition-colors border-b border-[#172332] last:border-0"
              >
                <TableCell className="!py-3.5 !px-4 text-center text-[#94A3B8] font-medium">
                  {gym.serial}
                </TableCell>
                <TableCell className="!py-3.5 !px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md overflow-hidden bg-[#1E293B] border border-[#233549] shrink-0 relative">
                      {gym.logoUrl ? (
                        <Image
                          src={gym.logoUrl}
                          alt={gym.gymName}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs font-bold text-white bg-[#1E2A3A]">
                          {gym.gymName.charAt(0)}
                        </div>
                      )}
                    </div>
                    <span className="font-medium text-white truncate max-w-[150px]">
                      {gym.gymName}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="!py-3.5 !px-4 text-[#CBD5E1] whitespace-nowrap">
                  {gym.ownerName}
                </TableCell>
                <TableCell className="!py-3.5 !px-4 text-[#CBD5E1] whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={14} weight="fill" className="text-[#F43F5E] shrink-0" />
                    <span>{gym.location}</span>
                  </div>
                </TableCell>
                <TableCell className="!py-3.5 !px-4 text-[#CBD5E1] whitespace-nowrap">
                  {gym.registeredOn}
                </TableCell>
                <TableCell className="!py-3.5 !px-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium ${
                      gym.status === "Active"
                        ? "bg-[rgba(2,44,34,0.7)] border border-[rgba(6,95,70,0.4)] text-[#34D399]"
                        : "bg-[rgba(69,26,3,0.7)] border border-[rgba(146,64,14,0.4)] text-[#FBBF24]"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        gym.status === "Active" ? "bg-[#34D399]" : "bg-[#FBBF24]"
                      }`}
                    />
                    {gym.status}
                  </span>
                </TableCell>
                <TableCell className="!py-3.5 !px-4 text-center whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => router.push(`/superadmin/gyms/${gym.id}`)}
                    className="h-[26px] px-3 rounded-md bg-[#141E2B] hover:bg-[#1F2C3E] border border-[#233549] text-[11px] font-medium text-[#E2E8F0] hover:text-white transition-all cursor-pointer active:scale-95"
                  >
                    View Details
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
