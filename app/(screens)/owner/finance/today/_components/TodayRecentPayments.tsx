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

export interface TodayPaymentData {
  gymPaymentId: string;
  name: string;
  plan: string;
  amount: number;
  paymentDate: string;
  createdAt?: string;
  method: string;
  gender: "male" | "female";
}

interface TodayRecentPaymentsProps {
  payments?: TodayPaymentData[];
}

const formatCurrency = (val: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

const formatTimeOnly = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });
};

const formatDateOnly = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' });
};

const renderMethodIcon = (method: string) => {
  const m = method.toLowerCase();
  if (m.includes('upi')) return <Lightning size={16} weight="fill" className="text-[#CCFF00]" />;
  if (m.includes('card')) return <CreditCard size={16} weight="fill" className="text-[#A855F7]" />;
  if (m.includes('cash')) return <Money size={16} weight="fill" className="text-[#F59E0B]" />;
  if (m.includes('bank') || m.includes('transfer')) return <Bank size={16} weight="fill" className="text-[#3B82F6]" />;
  return <Money size={16} weight="fill" className="text-[#94A3B8]" />;
};

export default function TodayRecentPayments({ payments = [] }: TodayRecentPaymentsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const handleOpenDetails = (id: string) => {
    router.push(`/owner/payments/${id}`);
  };

  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.max(1, Math.ceil(payments.length / ITEMS_PER_PAGE));
  const displayPayments = payments.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col p-4 md:p-6 w-full bg-[#111418] border border-[#1D222B] rounded-[16px]">
      <div className="flex flex-row justify-between items-center pb-6 w-full gap-2 flex-wrap">
        <div className="flex flex-row items-center gap-2">
          <Clock size={16} className="text-[#94A3B8]" />
          <h2 className="font-[600] text-[13px] leading-[16px] text-white m-0">
            All Payments
          </h2>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHeadCell>MEMBER</TableHeadCell>
            <TableHeadCell>MEMBERSHIP PLAN</TableHeadCell>
            <TableHeadCell>DATE</TableHeadCell>
            <TableHeadCell>TIME</TableHeadCell>
            <TableHeadCell>AMOUNT</TableHeadCell>
            <TableHeadCell>PAYMENT METHOD</TableHeadCell>
            <TableHeadCell></TableHeadCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayPayments.length > 0 ? (
            displayPayments.map((payment) => (
              <TableRow key={payment.gymPaymentId} className="hover:bg-[#1A1F26] border-b border-[#1B2029] last:border-0 transition-colors">
                <TableCell>
                  <div className="flex flex-row items-center gap-3 cursor-pointer" onClick={() => handleOpenDetails(payment.gymPaymentId)}>
                    <div className="w-8 h-8 rounded-full shrink-0 flex items-center justify-center overflow-hidden bg-slate-700/60">
                      <Avatar gender={payment.gender} className="w-[30px] h-[30px]" />
                    </div>
                    <span className="font-[600] text-[13px] text-white whitespace-nowrap hover:underline">
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
                    {formatDateOnly(payment.createdAt || payment.paymentDate)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-[400] text-[13px] text-[#94A3B8] whitespace-nowrap">
                    {formatTimeOnly(payment.createdAt || payment.paymentDate)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="font-[700] text-[13px] text-white whitespace-nowrap">
                    {formatCurrency(payment.amount)}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-row items-center gap-2">
                    {renderMethodIcon(payment.method)}
                    <span className="font-[400] text-[13px] text-[#94A3B8] whitespace-nowrap capitalize">
                      {payment.method || 'Unknown'}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => handleOpenDetails(payment.gymPaymentId)}
                    className="flex items-center justify-center text-[#64748B] hover:text-white transition-colors cursor-pointer"
                  >
                    <Eye size={20} weight="regular" />
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7}>
                <div className="flex items-center justify-center py-6">
                  <span className="text-sm text-[#94A3B8]">No payments recorded.</span>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={payments.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
