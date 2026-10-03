"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlass, CaretRight, Plus } from "@phosphor-icons/react";
import { Table } from "@/app/(screens)/components/reusable/table/Table";
import { TableHeader } from "@/app/(screens)/components/reusable/table/TableHeader";
import { TableBody } from "@/app/(screens)/components/reusable/table/TableBody";
import { TableCell } from "@/app/(screens)/components/reusable/table/TableCells";
import Avatar from "@/app/(screens)/components/reusable/Avatar";
import Pagination from "@/app/(screens)/components/reusable/Pagination";
import PaymentMethodBadge, { PaymentMethod } from "./PaymentMethodBadge";

export interface Transaction {
  id: string;
  name: string;
  time: string;
  membershipTier: string;
  membershipDuration: string;
  amount: string;
  method: PaymentMethod;
  timestamp: number;
  avatarUrl?: string;
}

interface PaymentsTableProps {
  transactions: Transaction[];
  isLoading?: boolean;
}

export default function PaymentsTable({ transactions, isLoading }: PaymentsTableProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState<"All" | "Today" | "This Month">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 5;

  const filteredTransactions = transactions.filter(tx => {
    if (searchQuery && !tx.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    if (activeFilter === "Today") {
      const txDate = new Date(tx.timestamp);
      const today = new Date();
      if (txDate.toDateString() !== today.toDateString()) {
        return false;
      }
    } else if (activeFilter === "This Month") {
      const txDate = new Date(tx.timestamp);
      const today = new Date();
      if (txDate.getMonth() !== today.getMonth() || txDate.getFullYear() !== today.getFullYear()) {
        return false;
      }
    }

    return true;
  });

  const totalItems = filteredTransactions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  
  const currentTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col items-start gap-4 w-full">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full gap-4">
        <div className="flex flex-col w-full lg:max-w-[320px] relative shrink-0">
          <div className="absolute left-[14px] top-1/2 -translate-y-1/2 flex items-center justify-center w-4 h-4 text-[#94A3B8]">
            <MagnifyingGlass size={16} weight="bold" />
          </div>
          <input
            type="text"
            placeholder="Search member..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="box-border flex flex-row items-center pl-9 pr-4 py-2.5 w-full h-[38px] bg-[#13161C] border border-[#212634] rounded-[12px] font-['Plus_Jakarta_Sans'] font-[500] text-[12px] leading-[15px] text-white placeholder-[#6B7280] focus:outline-none focus:border-[#BBF225] transition-colors"
          />
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-start md:justify-between lg:justify-end gap-4 w-full lg:w-auto">
          <div className="box-border flex flex-row items-center justify-between md:justify-start p-1 h-[40px] w-full md:w-auto bg-[#13161C] border border-[#212634] rounded-[12px] overflow-x-auto no-scrollbar shrink-0">
            <button 
              onClick={() => { setActiveFilter("All"); setCurrentPage(1); }}
              className={`flex flex-col justify-center items-center px-4 py-1.5 h-[30px] rounded-[8px] cursor-pointer transition-colors shrink-0 ${
                activeFilter === "All" 
                  ? "bg-[#1A2312] border border-[#3E551D] shadow-[inset_0px_2px_4px_1px_rgba(0,0,0,0.05)]" 
                  : "hover:bg-[#1f242e]"
              }`}
            >
              <span className={`font-['Plus_Jakarta_Sans'] font-[600] text-[12px] leading-[16px] text-center ${
                activeFilter === "All" ? "text-[#BBF225]" : "text-[#9CA3AF] font-[500]"
              }`}>
                All
              </span>
            </button>
            <button 
              onClick={() => { setActiveFilter("Today"); setCurrentPage(1); }}
              className={`flex flex-col justify-center items-center px-4 py-1.5 h-[28px] rounded-[8px] cursor-pointer transition-colors shrink-0 ${
                activeFilter === "Today" 
                  ? "bg-[#1A2312] border border-[#3E551D] shadow-[inset_0px_2px_4px_1px_rgba(0,0,0,0.05)] h-[30px]" 
                  : "hover:bg-[#1f242e]"
              }`}
            >
              <span className={`font-['Plus_Jakarta_Sans'] font-[600] text-[12px] leading-[16px] text-center ${
                activeFilter === "Today" ? "text-[#BBF225]" : "text-[#9CA3AF] font-[500]"
              }`}>
                Today
              </span>
            </button>
            <button 
              onClick={() => { setActiveFilter("This Month"); setCurrentPage(1); }}
              className={`flex flex-col justify-center items-center px-4 py-1.5 h-[28px] rounded-[8px] cursor-pointer transition-colors shrink-0 ${
                activeFilter === "This Month" 
                  ? "bg-[#1A2312] border border-[#3E551D] shadow-[inset_0px_2px_4px_1px_rgba(0,0,0,0.05)] h-[30px]" 
                  : "hover:bg-[#1f242e]"
              }`}
            >
              <span className={`font-['Plus_Jakarta_Sans'] font-[600] text-[12px] leading-[16px] text-center ${
                activeFilter === "This Month" ? "text-[#BBF225]" : "text-[#9CA3AF] font-[500]"
              }`}>
                This Month
              </span>
            </button>
          </div>

          <button onClick={() => router.push("/owner/payments/create")} className="flex flex-row justify-center items-center px-5 py-2.5 gap-2 h-[38px] w-full md:w-auto bg-[#BBF225] rounded-[12px] shrink-0 cursor-pointer shadow-[0px_4px_6px_-1px_rgba(187,242,37,0.1),0px_2px_4px_-2px_rgba(187,242,37,0.1)] hover:bg-[#aade1a] transition-colors">
            <Plus size={16} weight="bold" className="text-black shrink-0" />
            <span className="font-['Plus_Jakarta_Sans'] font-[700] text-[12px] leading-[16px] text-center text-black">
              Add Payment
            </span>
          </button>
        </div>
      </div>

      <div className="w-full bg-[#12151C] border border-[#1E2330] rounded-[16px] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.2),0px_8px_10px_-6px_rgba(0,0,0,0.2)]">
        <Table>
          <TableHeader>
            <tr>
              <th className="px-6 py-3.5 text-left font-['Plus_Jakarta_Sans'] font-[700] text-[11px] leading-[16px] tracking-[0.55px] uppercase text-[#9CA3AF]">
                MEMBER
              </th>
              <th className="px-6 py-3.5 text-left font-['Plus_Jakarta_Sans'] font-[700] text-[11px] leading-[16px] tracking-[0.55px] uppercase text-[#9CA3AF]">
                MEMBERSHIP
              </th>
              <th className="px-6 py-3.5 text-left font-['Plus_Jakarta_Sans'] font-[700] text-[11px] leading-[16px] tracking-[0.55px] uppercase text-[#9CA3AF]">
                AMOUNT
              </th>
              <th className="px-6 py-3.5 text-left font-['Plus_Jakarta_Sans'] font-[700] text-[11px] leading-[16px] tracking-[0.55px] uppercase text-[#9CA3AF]">
                METHOD
              </th>
              <th className="px-6 py-3.5 w-16"></th>
            </tr>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="py-8">
                  <div className="w-full flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#D2F829]"></div>
                  </div>
                </td>
              </tr>
            ) : currentTransactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8">
                  <div className="w-full flex justify-center text-[#9CA3AF]">
                    No payments found.
                  </div>
                </td>
              </tr>
            ) : (
              currentTransactions.map((tx) => (
                <tr key={tx.id} onClick={() => router.push(`/owner/payments/${tx.id}`)} className="border-t border-[#171A23] hover:bg-[#1a1e28] transition-colors cursor-pointer group">
                  <TableCell className="px-6 py-3">
                    <div className="flex flex-row items-center gap-3.5">
                      <div className="w-9 h-9">
                        <Avatar className="w-full h-full" src={tx.avatarUrl} />
                      </div>
                      <div className="flex flex-col items-start justify-center">
                        <span className="font-['Plus_Jakarta_Sans'] font-[700] text-[14px] leading-[20px] text-[#F3F4F6]">
                          {tx.name}
                        </span>
                        <span className="font-['Plus_Jakarta_Sans'] font-[400] text-[11px] leading-[20px] text-[#9CA3AF]">
                          {tx.time}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-3">
                    <div className="flex flex-col items-start justify-center">
                      <span className="font-['Plus_Jakarta_Sans'] font-[700] text-[14px] leading-[20px] text-[#F3F4F6]">
                        {tx.membershipTier}
                      </span>
                      <span className="font-['Plus_Jakarta_Sans'] font-[400] text-[11px] leading-[20px] text-[#9CA3AF]">
                        {tx.membershipDuration}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-3">
                    <span className="font-['Plus_Jakarta_Sans'] font-[700] text-[14px] leading-[20px] tracking-[-0.35px] text-white">
                      {tx.amount}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-3">
                    <PaymentMethodBadge method={tx.method} />
                  </TableCell>
                  <TableCell className="px-6 py-3">
                    <div className="flex justify-end pr-4">
                      <CaretRight size={16} weight="bold" className="text-[#6B7280] group-hover:text-white transition-colors" />
                    </div>
                  </TableCell>
                </tr>
              ))
            )}
          </TableBody>
        </Table>
        <div className="px-6 pb-2">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
