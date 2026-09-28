"use client";

import { MagnifyingGlass, Funnel, CalendarBlank, Check, CaretDown } from "@phosphor-icons/react";
import { Table, TableHeader, TableBody, TableRow, TableHeadCell, TableCell } from "../table";
import { PaymentRecord } from "./types";
import Pagination from "../Pagination";
import Dropdown from "../Dropdown";
interface PaymentHistoryTableProps {
  payments: PaymentRecord[];
}

export default function PaymentHistoryTable({ payments }: PaymentHistoryTableProps) {
  return (
    <div className="flex flex-col p-6 w-full bg-[#191C21] rounded-2xl relative shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]">
      
      {/* Header with Search & Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 gap-4 w-full">
        <div className="flex flex-row items-center gap-3">
          <h2 className="font-sans font-semibold text-xl leading-7 text-white m-0">
            Payment History
          </h2>
          <div className="flex flex-row items-center px-2.5 py-0.5 bg-[#1D2025] rounded-full">
            <span className="font-mono font-semibold text-[10px] leading-3.5 text-[#C4CAAC]">
              {payments.length} records
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex flex-row items-center w-full sm:w-[256px] h-9 bg-[#1D2025] rounded-lg">
            <MagnifyingGlass size={14} className="absolute left-3 text-[#C4CAAC]" />
            <input 
              type="text"
              placeholder="Filter TXN ID..."
              className="w-full h-full pl-9 pr-3 bg-transparent border-none outline-none text-xs text-[#C4CAAC] placeholder:text-[#C4CAAC]"
            />
          </div>
          {/* Filter Dropdown */}
          <div className="w-full sm:w-[120px] shrink-0 relative">
            <Dropdown
              options={[
                { label: "All Status", value: "all" },
                { label: "Success", value: "success" },
                { label: "Failed", value: "failed" },
              ]}
              value="all"
              onChange={() => {}}
              triggerClassName="relative flex flex-row items-center px-3.5 w-full bg-[#1D2025] rounded-lg h-9 hover:bg-white/5 transition-colors cursor-pointer outline-none"
              icon={<Funnel size={12} className="text-[#9DDF2E]" weight="fill" />}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto scrollbar-themed border-t border-[rgba(29,32,37,0.6)] pt-1">
        <Table>
          <TableHeader className="bg-[rgba(29,32,37,0.4)]">
            <TableRow>
              <TableHeadCell className="text-[#C4CAAC] font-mono tracking-[0.5px]">DATE</TableHeadCell>
              <TableHeadCell className="text-[#C4CAAC] font-mono tracking-[0.5px]">AMOUNT</TableHeadCell>
              <TableHeadCell className="text-[#C4CAAC] font-mono tracking-[0.5px]">METHOD</TableHeadCell>
              <TableHeadCell className="text-[#C4CAAC] font-mono tracking-[0.5px]">TRANSACTION ID</TableHeadCell>
              <TableHeadCell className="text-[#C4CAAC] font-mono tracking-[0.5px]">STATUS</TableHeadCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment, index) => (
              <TableRow key={payment.id} className={`border-b border-[rgba(29,32,37,0.6)] ${index === 0 ? 'border-t-0' : ''} hover:bg-[#1D2025]/50 transition-colors`}>
                
                {/* DATE */}
                <TableCell>
                  <div className="flex flex-row items-center gap-2.5 py-2">
                    <CalendarBlank size={14} className="text-[#C4CAAC]" />
                    <span className="font-sans font-medium text-sm text-white">
                      {payment.date}
                    </span>
                  </div>
                </TableCell>
                
                {/* AMOUNT */}
                <TableCell>
                  <span className="font-sans font-semibold text-base text-white">
                    ₹{payment.amount.toLocaleString()}
                  </span>
                </TableCell>
                
                {/* METHOD */}
                <TableCell>
                  <div className="flex flex-row items-center px-2 py-0.5 gap-1.5 bg-[#1D2025] rounded w-fit">
                    <div className="w-1.5 h-1.5 bg-[#9DDF2E] rounded-full" />
                    <span className="font-mono font-medium text-xs text-[#E1E2EA]">
                      {payment.method}
                    </span>
                  </div>
                </TableCell>
                
                {/* TRANSACTION ID */}
                <TableCell>
                  <span className="font-mono font-medium text-xs text-[#C4CAAC]">
                    {payment.transactionId}
                  </span>
                </TableCell>
                
                {/* STATUS */}
                <TableCell>
                  <div className="flex flex-row items-center px-2.5 py-0.5 gap-1 bg-[rgba(157,223,46,0.1)] rounded-full w-fit">
                    <Check size={10} className="text-[#9DDF2E]" weight="bold" />
                    <span className="font-mono font-semibold text-[10px] text-[#9DDF2E]">
                      {payment.status}
                    </span>
                  </div>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      <Pagination 
        currentPage={1} 
        totalPages={1} 
        totalItems={payments.length} 
        itemsPerPage={payments.length || 1} 
        onPageChange={() => {}} 
      />

    </div>
  );
}
