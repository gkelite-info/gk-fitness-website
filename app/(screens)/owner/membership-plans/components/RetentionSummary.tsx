"use client";

import { useState } from "react";
import { Table, TableHeader, TableBody, TableRow, TableHeadCell, TableCell } from "@/app/(screens)/components/reusable/table";
import Pagination from "@/app/(screens)/components/reusable/Pagination";

export interface SummaryData {
  tierName: string;
  duration: string;
  monthlyRate: string;
  activeMembers: string;
  currentMrr: string;
  renewalRate: string;
  status: string;
  dotColor: string;
}

const tableData: SummaryData[] = [
  {
    tierName: "Basic Membership",
    duration: "1 Month",
    monthlyRate: "₹799",
    activeMembers: "42 Members",
    currentMrr: "₹33,558",
    renewalRate: "82.4%",
    status: "Active",
    dotColor: "bg-[#F59E0B]", 
  },
  {
    tierName: "Premium Membership",
    duration: "3 Months",
    monthlyRate: "₹1,299",
    activeMembers: "138 Members",
    currentMrr: "₹1,79,262",
    renewalRate: "94.1%",
    status: "Active",
    dotColor: "bg-[#D4FF32]", 
  },
  {
    tierName: "Elite Membership",
    duration: "6 Months",
    monthlyRate: "₹2,499",
    activeMembers: "0 Members",
    currentMrr: "₹0",
    renewalRate: "—",
    status: "Active",
    dotColor: "bg-[#A855F7]", 
  },
];

interface RetentionSummaryProps {
  data?: SummaryData[];
}

export default function RetentionSummary({ data = tableData }: RetentionSummaryProps) {
  const [autoRenew, setAutoRenew] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="w-full bg-[#15161C] border border-[#232631] rounded-[24px] p-6 flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-[16px] w-full">
        <div className="flex flex-col gap-[0px]">
          <h2 className="text-white text-[16px] font-[700] font-['Plus_Jakarta_Sans',sans-serif] leading-[24px] m-0">
            Membership Plan Configuration & Retention Summary
          </h2>
          <p className="text-[#9CA3AF] text-[12px] font-[400] font-['Plus_Jakarta_Sans',sans-serif] leading-[16px] m-0 mt-[2px]">
            Live breakdown of revenue contribution and renewal rates per plan
          </p>
        </div>
        {/* <div className="flex flex-row items-center gap-[8px] shrink-0">
          <span className="text-[#9CA3AF] text-[12px] font-[500] font-['Plus_Jakarta_Sans',sans-serif] leading-[16px]">
            Auto-renew reminder:
          </span>
          <button
            onClick={() => setAutoRenew(!autoRenew)}
            className={`relative w-[36px] h-[20px] rounded-full transition-colors duration-200 ease-in-out cursor-pointer outline-none ${
              autoRenew ? "bg-[#D4FF00]" : "bg-[#232631]"
            }`}
          >
            <div
              className={`absolute w-[16px] h-[16px] rounded-full bg-white shadow-sm top-[2px] transition-all duration-200 ease-in-out ${
                autoRenew ? "left-[18px]" : "left-[2px]"
              }`}
            />
          </button>
        </div> */}
      </div>

      <Table className="border-none bg-transparent rounded-none">
        <TableHeader className="bg-transparent border-[#232631]">
          <TableRow className="hover:bg-transparent">
            <TableHeadCell className="pb-4 px-0 text-[#64748B] font-['Nimbus_Sans'] uppercase tracking-wider text-xs font-bold">
              TIER NAME
            </TableHeadCell>
            <TableHeadCell className="pb-4 px-0 text-[#64748B] font-['Nimbus_Sans'] uppercase tracking-wider text-xs font-bold">
              DURATION
            </TableHeadCell>
            <TableHeadCell className="pb-4 px-0 text-[#64748B] font-['Nimbus_Sans'] uppercase tracking-wider text-xs font-bold">
              MONTHLY RATE
            </TableHeadCell>
            <TableHeadCell className="pb-4 px-0 text-[#64748B] font-['Nimbus_Sans'] uppercase tracking-wider text-xs font-bold">
              ACTIVE MEMBERS
            </TableHeadCell>
            <TableHeadCell className="pb-4 px-0 text-[#64748B] font-['Nimbus_Sans'] uppercase tracking-wider text-xs font-bold">
              CURRENT MRR
            </TableHeadCell>
            <TableHeadCell className="pb-4 px-0 text-[#64748B] font-['Nimbus_Sans'] uppercase tracking-wider text-xs font-bold">
              RENEWAL RATE
            </TableHeadCell>
            <TableHeadCell className="pb-4 px-0 text-[#64748B] font-['Nimbus_Sans'] uppercase tracking-wider text-xs font-bold text-right">
              STATUS
            </TableHeadCell>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-[#232631]">
          {data.map((row, index) => (
            <TableRow key={index} className="hover:bg-[#1E2028] transition-colors">
              <TableCell className="py-5 px-0">
                <div className="flex flex-row items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${row.dotColor}`} />
                  <span className="text-white text-sm font-semibold font-['Nimbus_Sans']">
                    {row.tierName}
                  </span>
                </div>
              </TableCell>
              <TableCell className="py-5 px-0">
                <span className="text-[#94A3B8] text-sm font-medium font-['Nimbus_Sans']">
                  {row.duration}
                </span>
              </TableCell>
              <TableCell className="py-5 px-0">
                <span className="text-[#94A3B8] text-sm font-medium font-['Nimbus_Sans']">
                  {row.monthlyRate}
                </span>
              </TableCell>
              <TableCell className="py-5 px-0">
                <span className="text-[#94A3B8] text-sm font-medium font-['Nimbus_Sans']">
                  {row.activeMembers}
                </span>
              </TableCell>
              <TableCell className="py-5 px-0">
                <span className={`text-sm font-bold font-['Nimbus_Sans'] ${row.currentMrr !== "₹0" ? "text-[#D4FF32]" : "text-[#94A3B8]"}`}>
                  {row.currentMrr}
                </span>
              </TableCell>
              <TableCell className="py-5 px-0">
                <span className="text-[#94A3B8] text-sm font-medium font-['Nimbus_Sans']">
                  {row.renewalRate}
                </span>
              </TableCell>
              <TableCell className="py-5 px-0 text-right">
                <div className="flex justify-end">
                  <div className="px-3 py-1 rounded-full border border-[#D4FF32]/30 bg-[#D4FF32]/10 text-[#D4FF32] text-xs font-semibold font-['Nimbus_Sans'] w-fit">
                    {row.status}
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="-mt-6 relative z-10">
        <Pagination 
          currentPage={currentPage} 
          totalPages={1} 
          totalItems={data.length} 
          itemsPerPage={10} 
          onPageChange={setCurrentPage} 
        />
      </div>
    </div>
  );
}
