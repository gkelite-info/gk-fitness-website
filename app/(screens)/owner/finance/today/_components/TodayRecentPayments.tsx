"use client";

import { useState } from "react";
import { Clock, Lightning, CreditCard, Money, Bank, Eye } from "@phosphor-icons/react/dist/ssr";
import Avatar from "@/app/(screens)/components/reusable/Avatar";
import { Table } from "@/app/(screens)/components/reusable/table/Table";
import { TableHeader } from "@/app/(screens)/components/reusable/table/TableHeader";
import { TableBody } from "@/app/(screens)/components/reusable/table/TableBody";
import { TableHeadCell, TableRow, TableCell } from "@/app/(screens)/components/reusable/table/TableCells";
import Pagination from "@/app/(screens)/components/reusable/Pagination";
import { useRouter } from "next/navigation";

const PAYMENTS_DATA = [
  {
    name: "Rahul Sharma",
    plan: "Gold Membership",
    time: "09:45 AM",
    amount: "₹2,500",
    method: "UPI",
    gender: "male" as const
  },
  {
    name: "Sneha Patel",
    plan: "Premium Membership",
    time: "09:15 AM",
    amount: "₹2,999",
    method: "Card",
    gender: "female" as const
  },
  {
    name: "Amit Kumar",
    plan: "Gold Membership",
    time: "08:40 AM",
    amount: "₹2,500",
    method: "Cash",
    gender: "male" as const
  },
  {
    name: "Neha Kapoor",
    plan: "Silver Membership",
    time: "08:10 AM",
    amount: "₹650",
    method: "Net Banking",
    gender: "female" as const
  }
];

const renderMethodIcon = (method: string) => {
  switch(method) {
    case 'UPI': return <Lightning size={16} weight="fill" className="text-[#CCFF00]" />;
    case 'Card': return <CreditCard size={16} weight="fill" className="text-[#A855F7]" />;
    case 'Cash': return <Money size={16} weight="fill" className="text-[#F59E0B]" />;
    case 'Net Banking': return <Bank size={16} weight="fill" className="text-[#3B82F6]" />;
    default: return null;
  }
};

export default function TodayRecentPayments() {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const handleOpenDetails = (index: number) => {
    router.push(`/owner/finance/today/payments/${index}`);
  };

  return (
    <div className="flex flex-col p-4 md:p-6 w-full bg-[#111418] border border-[#1D222B] rounded-[16px]">
      <div className="flex flex-row justify-between items-center pb-6 w-full gap-2 flex-wrap">
        <div className="flex flex-row items-center gap-2">
          <Clock size={16} className="text-[#94A3B8]" />
          <h2 className="font-[600] text-[13px] leading-[16px] text-white m-0">
            Recent Payments
          </h2>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHeadCell>MEMBER</TableHeadCell>
            <TableHeadCell>MEMBERSHIP PLAN</TableHeadCell>
            <TableHeadCell>TIME</TableHeadCell>
            <TableHeadCell>AMOUNT</TableHeadCell>
            <TableHeadCell>PAYMENT METHOD</TableHeadCell>
            <TableHeadCell></TableHeadCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {PAYMENTS_DATA.map((payment, index) => (
            <TableRow key={index} className="hover:bg-[#1A1F26] border-b border-[#1B2029] last:border-0">
              <TableCell>
                <div className="flex flex-row items-center gap-3">
                  <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center overflow-hidden bg-slate-700/60">
                    <Avatar gender={payment.gender} className="w-[30px] h-[30px]" />
                  </div>
                  <span className="font-[600] text-[13px] text-white whitespace-nowrap">
                    {payment.name}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span className="font-[400] text-[13px] text-[#94A3B8] whitespace-nowrap">
                  {payment.plan}
                </span>
              </TableCell>
              <TableCell>
                <span className="font-[400] text-[13px] text-[#94A3B8] whitespace-nowrap">
                  {payment.time}
                </span>
              </TableCell>
              <TableCell>
                <span className="font-[700] text-[13px] text-white whitespace-nowrap">
                  {payment.amount}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex flex-row items-center gap-2">
                  {renderMethodIcon(payment.method)}
                  <span className="font-[400] text-[13px] text-[#94A3B8] whitespace-nowrap">
                    {payment.method}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <button 
                  onClick={() => handleOpenDetails(index)}
                  className="flex items-center justify-center text-[#64748B] hover:text-white transition-colors cursor-pointer"
                >
                  <Eye size={20} weight="regular" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={1}
        totalItems={PAYMENTS_DATA.length}
        itemsPerPage={10}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
