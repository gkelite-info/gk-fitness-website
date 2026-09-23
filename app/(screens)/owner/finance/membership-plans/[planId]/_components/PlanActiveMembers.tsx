"use client";

import { useState, useMemo } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import Avatar from "@/app/(screens)/components/reusable/Avatar";
import { Table } from "@/app/(screens)/components/reusable/table/Table";
import Pagination from "@/app/(screens)/components/reusable/Pagination";
import { TableHeader } from "@/app/(screens)/components/reusable/table/TableHeader";
import { TableBody } from "@/app/(screens)/components/reusable/table/TableBody";
import { TableHeadCell, TableRow, TableCell } from "@/app/(screens)/components/reusable/table/TableCells";

interface PlanActiveMembersProps {
  members?: any[];
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

export default function PlanActiveMembers({ members = [] }: PlanActiveMembersProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 8;

  const filteredMembers = useMemo(() => {
    if (!searchQuery.trim()) return members;
    return members.filter(m => 
      m.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [members, searchQuery]);

  const totalItems = filteredMembers.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const currentMembers = filteredMembers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex flex-col p-4 md:p-5 w-full bg-[#12151B] border border-[#20252E] rounded-[16px]">
      <h2 className="font-[700] text-[16px] leading-[24px] text-white m-0 pb-4">
        Active Members
      </h2>

      <div className="relative w-full mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlass size={16} className="text-[#64748B]" />
        </div>
        <input 
          type="text" 
          placeholder="Search members..." 
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full bg-[#1A1F26] border border-[#20252E] rounded-[8px] pl-10 pr-4 py-2.5 text-[13px] text-white placeholder-[#64748B] focus:outline-none focus:border-[#F59E0B] focus:ring-1 focus:ring-[#F59E0B] transition-all"
        />
      </div>

      <Table className="bg-transparent border-none">
        <TableHeader className="bg-transparent border-b border-[#20252E]">
          <TableRow className="hover:bg-transparent">
            <TableHeadCell className="px-2 font-[600] text-[#64748B] tracking-normal">NAME</TableHeadCell>
            <TableHeadCell className="px-2 font-[600] text-[#64748B] tracking-normal">JOINED</TableHeadCell>
            <TableHeadCell className="px-2 font-[600] text-[#64748B] tracking-normal">EXPIRES</TableHeadCell>
            <TableHeadCell className="px-2 font-[600] text-[#64748B] tracking-normal">STATUS</TableHeadCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentMembers.length > 0 ? (
            currentMembers.map((member, index) => (
              <TableRow key={index} className="hover:bg-[#1A1F26] border-b border-[#20252E]/50 last:border-0 cursor-pointer group">
                <TableCell className="px-2 py-3">
                  <div className="flex flex-row items-center gap-3">
                    <div className="w-7 h-7 rounded-full shrink-0 flex items-center justify-center overflow-hidden bg-slate-700/60">
                      <Avatar gender={member.gender} className="w-[26px] h-[26px]" />
                    </div>
                    <span className="font-[600] text-[13px] text-white whitespace-nowrap group-hover:text-white transition-colors">
                      {member.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-2 py-3">
                  <span className="font-[400] text-[13px] text-[#8590A2] whitespace-nowrap group-hover:text-[#94A3B8] transition-colors">
                    {formatDate(member.joined)}
                  </span>
                </TableCell>
                <TableCell className="px-2 py-3">
                  <span className="font-[400] text-[13px] text-[#8590A2] whitespace-nowrap group-hover:text-[#94A3B8] transition-colors">
                    {formatDate(member.expires)}
                  </span>
                </TableCell>
                <TableCell className="px-2 py-3">
                  <div className="inline-flex items-center justify-center px-2 py-0.5 bg-[#1B3019] border border-[#264D23] rounded-[4px]">
                    <span className="font-[500] text-[11px] leading-[16px] text-[#A3E635]">
                      {member.status}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>
                <div className="flex items-center justify-center py-6">
                  <span className="text-sm text-[#94A3B8]">No active members found.</span>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      {totalItems > 0 && (
        <div className="px-2">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
