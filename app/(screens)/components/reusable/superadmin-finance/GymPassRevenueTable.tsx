"use client";

import {
  Table,
  TableHeader,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
} from "@/app/(screens)/components/reusable/table";
import Avatar from "@/app/(screens)/components/reusable/Avatar";
import Pagination from "@/app/(screens)/components/reusable/Pagination";
import { GymPassPayment } from "./gymPassRevenueTypes";

interface GymPassRevenueTableProps {
  payments: GymPassPayment[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onViewPayment: (payment: GymPassPayment) => void;
}

function StatusBadge({ status }: { status: "Paid" | "Pending" }) {
  if (status === "Paid") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#052E16] text-[#10B981] border border-[#166534]/50 whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
        <span>Paid</span>
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#2A1D0D] text-[#F59E0B] border border-[#78350F]/50 whitespace-nowrap">
      <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />
      <span>Pending</span>
    </span>
  );
}

export default function GymPassRevenueTable({
  payments,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onViewPayment,
}: GymPassRevenueTableProps) {
  return (
    <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-4 sm:p-5 flex flex-col gap-4 w-full">
      <div className="w-full overflow-x-auto scrollbar-none rounded-xl">
        <Table className="border-0 bg-transparent rounded-none">
          <TableHeader className="bg-[#101217] border-b border-[#1E222D]">
            <TableRow className="border-none hover:bg-transparent">
              <TableHeadCell className="py-3.5 px-4 text-xs font-semibold text-[#848C99]">
                Date
              </TableHeadCell>
              <TableHeadCell className="py-3.5 px-4 text-xs font-semibold text-[#848C99]">
                Customer Name
              </TableHeadCell>
              <TableHeadCell className="py-3.5 px-4 text-xs font-semibold text-[#848C99]">
                Pass Type
              </TableHeadCell>
              <TableHeadCell className="py-3.5 px-4 text-xs font-semibold text-[#848C99]">
                Amount
              </TableHeadCell>
              <TableHeadCell className="py-3.5 px-4 text-xs font-semibold text-[#848C99]">
                Payment Method
              </TableHeadCell>
              <TableHeadCell className="py-3.5 px-4 text-xs font-semibold text-[#848C99]">
                Status
              </TableHeadCell>
              <TableHeadCell className="py-3.5 px-4 text-xs font-semibold text-[#848C99] text-right">
                Action
              </TableHeadCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-[#181B24]">
            {payments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-xs sm:text-sm text-[#64748B]">
                  No gym pass purchases found matching your criteria.
                </TableCell>
              </TableRow>
            ) : (
              payments.map((payment) => (
                <TableRow
                  key={payment.id}
                  onClick={() => onViewPayment(payment)}
                  className="hover:bg-[#161822] transition-colors cursor-pointer group"
                >
                  <TableCell className="py-3.5 px-4 text-xs sm:text-sm text-[#94A3B8] whitespace-nowrap">
                    {payment.date}
                  </TableCell>
                  <TableCell className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <Avatar
                        src={payment.customerAvatar}
                        alt={payment.customerName}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full shrink-0"
                      />
                      <span className="text-xs sm:text-sm font-semibold text-white">
                        {payment.customerName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3.5 px-4 text-xs sm:text-sm text-[#CBD5E1] whitespace-nowrap">
                    {payment.passType}
                  </TableCell>
                  <TableCell className="py-3.5 px-4 text-xs sm:text-sm font-bold text-white whitespace-nowrap">
                    {payment.amount}
                  </TableCell>
                  <TableCell className="py-3.5 px-4 text-xs sm:text-sm text-[#CBD5E1] whitespace-nowrap">
                    {payment.paymentMethod}
                  </TableCell>
                  <TableCell className="py-3.5 px-4 whitespace-nowrap">
                    <StatusBadge status={payment.status} />
                  </TableCell>
                  <TableCell className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewPayment(payment);
                      }}
                      className="px-3.5 py-1 rounded-lg border border-[#10B981]/40 text-[#10B981] hover:bg-[#10B981]/15 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      View
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
        itemLabel="purchases"
        format="dash"
        hideBorder
      />
    </div>
  );
}
