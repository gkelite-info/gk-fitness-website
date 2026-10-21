"use client";

import { CaretRight } from "@phosphor-icons/react";
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
import { GymPlanPayment, GymPlanType, PaymentStatusType } from "./gymPlanRevenueTypes";

interface GymPlanRevenueTableProps {
  payments: GymPlanPayment[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onViewPayment: (payment: GymPlanPayment) => void;
}

function PlanBadge({ plan }: { plan: GymPlanType }) {
  switch (plan) {
    case "Gold - White Label":
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-[#451A03] text-[#F59E0B] border border-[#78350F]/40 whitespace-nowrap">
          Gold - White Label
        </span>
      );
    case "Silver":
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-[#1E293B] text-[#93C5FD] border border-[#334155]/50 whitespace-nowrap">
          Silver
        </span>
      );
    case "Platinum":
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-[#3B1C5A] text-[#C084FC] border border-[#581C87]/50 whitespace-nowrap">
          Platinum
        </span>
      );
    case "Gold":
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-[#451A03] text-[#F59E0B] border border-[#78350F]/40 whitespace-nowrap">
          Gold
        </span>
      );
    case "Basic":
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-[#1E222A] text-[#94A3B8] border border-[#2D3342]/50 whitespace-nowrap">
          Basic
        </span>
      );
  }
}

function StatusBadge({ status }: { status: PaymentStatusType }) {
  if (status === "Paid") {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#052E16] text-[#10B981] border border-[#166534]/50 whitespace-nowrap">
        Paid
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#451A03] text-[#FB923C] border border-[#9A3412]/50 whitespace-nowrap">
      Pending
    </span>
  );
}

export default function GymPlanRevenueTable({
  payments,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onViewPayment,
}: GymPlanRevenueTableProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Table className="bg-[#12141A] border border-[#232631]">
        <TableHeader className="bg-[#12141A] border-b border-[#1E222D]">
          <TableRow className="hover:bg-transparent">
            <TableHeadCell className="py-3.5 px-4 text-[#94A3B8] font-semibold text-xs tracking-normal normal-case">
              Date
            </TableHeadCell>
            <TableHeadCell className="py-3.5 px-4 text-[#94A3B8] font-semibold text-xs tracking-normal normal-case">
              Gym Name
            </TableHeadCell>
            <TableHeadCell className="py-3.5 px-4 text-[#94A3B8] font-semibold text-xs tracking-normal normal-case">
              Owner Name
            </TableHeadCell>
            <TableHeadCell className="py-3.5 px-4 text-[#94A3B8] font-semibold text-xs tracking-normal normal-case">
              Plan
            </TableHeadCell>
            <TableHeadCell className="py-3.5 px-4 text-[#94A3B8] font-semibold text-xs tracking-normal normal-case">
              Amount
            </TableHeadCell>
            <TableHeadCell className="py-3.5 px-4 text-[#94A3B8] font-semibold text-xs tracking-normal normal-case">
              Status
            </TableHeadCell>
            <TableHeadCell className="py-3.5 px-4 text-[#94A3B8] font-semibold text-xs tracking-normal normal-case text-right">
              Action
            </TableHeadCell>
          </TableRow>
        </TableHeader>

        <TableBody className="divide-y divide-[#1A1D27]">
          {payments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-12 text-[#94A3B8]">
                No gym plan payments found matching your criteria.
              </TableCell>
            </TableRow>
          ) : (
            payments.map((payment) => (
              <TableRow
                key={payment.id}
                className="hover:bg-[#161822] transition-colors group cursor-pointer"
                onClick={() => onViewPayment(payment)}
              >
                <TableCell className="py-3.5 px-4 text-xs font-medium text-[#CBD5E1]">
                  {payment.date}
                </TableCell>
                <TableCell className="py-3.5 px-4">
                  <div className="flex items-center gap-2.5">
                    <Avatar
                      src={payment.gymLogo}
                      alt={payment.gymName}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full shrink-0"
                    />
                    <span className="text-xs sm:text-sm font-semibold text-white whitespace-nowrap">
                      {payment.gymName}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-3.5 px-4 text-xs sm:text-sm text-[#CBD5E1]">
                  {payment.ownerName}
                </TableCell>
                <TableCell className="py-3.5 px-4">
                  <PlanBadge plan={payment.plan} />
                </TableCell>
                <TableCell className="py-3.5 px-4 text-xs sm:text-sm font-semibold text-white">
                  {payment.amount}
                </TableCell>
                <TableCell className="py-3.5 px-4">
                  <StatusBadge status={payment.status} />
                </TableCell>
                <TableCell className="py-3.5 px-4 text-right">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewPayment(payment);
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#232631] bg-[#14161A] hover:bg-[#1E222D] text-xs font-medium text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
                  >
                    <span>View</span>
                    <CaretRight size={12} weight="bold" />
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
        itemLabel="payments"
        format="dash"
        hideBorder
      />
    </div>
  );
}
