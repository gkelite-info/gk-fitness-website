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
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-[#3D1F08] text-[#F59E0B] border border-[#78350F]/50 whitespace-nowrap">
          Gold - White Label
        </span>
      );
    case "Silver":
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-[#182638] text-[#60A5FA] border border-[#1E3A5F]/50 whitespace-nowrap">
          Silver
        </span>
      );
    case "Platinum":
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-[#2D163D] text-[#C084FC] border border-[#581C87]/50 whitespace-nowrap">
          Platinum
        </span>
      );
    case "Gold":
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-[#3D1F08] text-[#F59E0B] border border-[#78350F]/50 whitespace-nowrap">
          Gold
        </span>
      );
    case "Basic":
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-[#1A1E26] text-[#94A3B8] border border-[#2D3342]/50 whitespace-nowrap">
          Basic
        </span>
      );
  }
}

function StatusBadge({ status }: { status: PaymentStatusType }) {
  if (status === "Paid") {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-[#0D261C] text-[#10B981] border border-[#164E37] whitespace-nowrap">
        Paid
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold bg-[#281E10] text-[#F59E0B] border border-[#4E3717] whitespace-nowrap">
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
    <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-4 sm:p-5 flex flex-col gap-4 w-full">
      <div className="w-full overflow-x-auto scrollbar-none rounded-xl">
        <Table className="border-0 bg-transparent rounded-none">
          <TableHeader className="bg-[#101217] border-b border-[#1E222D]">
            <TableRow className="border-none hover:bg-transparent">
              <TableHeadCell className="py-3.5 px-4 text-[#848C99] font-semibold text-xs tracking-normal normal-case">
                Date
              </TableHeadCell>
              <TableHeadCell className="py-3.5 px-4 text-[#848C99] font-semibold text-xs tracking-normal normal-case">
                Gym Name
              </TableHeadCell>
              <TableHeadCell className="py-3.5 px-4 text-[#848C99] font-semibold text-xs tracking-normal normal-case">
                Owner Name
              </TableHeadCell>
              <TableHeadCell className="py-3.5 px-4 text-[#848C99] font-semibold text-xs tracking-normal normal-case">
                Plan
              </TableHeadCell>
              <TableHeadCell className="py-3.5 px-4 text-[#848C99] font-semibold text-xs tracking-normal normal-case">
                Amount
              </TableHeadCell>
              <TableHeadCell className="py-3.5 px-4 text-[#848C99] font-semibold text-xs tracking-normal normal-case">
                Status
              </TableHeadCell>
              <TableHeadCell className="py-3.5 px-4 text-[#848C99] font-semibold text-xs tracking-normal normal-case text-right">
                Action
              </TableHeadCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-[#181B24]">
            {payments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10 text-xs sm:text-sm text-[#64748B]">
                  No gym plan payments found matching your criteria.
                </TableCell>
              </TableRow>
            ) : (
              payments.map((payment) => (
                <TableRow
                  key={payment.id}
                  className="hover:bg-[#161822] transition-colors cursor-pointer group"
                  onClick={() => onViewPayment(payment)}
                >
                  <TableCell className="py-3.5 px-4 text-xs sm:text-sm text-[#94A3B8] whitespace-nowrap">
                    {payment.date}
                  </TableCell>
                  <TableCell className="py-3.5 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${payment.avatarBg || "bg-[#064E3B]"} ${payment.avatarColor || "text-[#10B981]"} flex items-center justify-center font-bold text-xs shrink-0`}
                      >
                        {payment.avatarLetter || payment.gymName.charAt(0)}
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-white whitespace-nowrap">
                        {payment.gymName}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="py-3.5 px-4 text-xs sm:text-sm text-[#CBD5E1] whitespace-nowrap">
                    {payment.ownerName}
                  </TableCell>
                  <TableCell className="py-3.5 px-4 whitespace-nowrap">
                    <PlanBadge plan={payment.plan} />
                  </TableCell>
                  <TableCell className="py-3.5 px-4 text-xs sm:text-sm font-bold text-white whitespace-nowrap">
                    {payment.amount}
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
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#262F3E] bg-[#181D26] hover:bg-[#202736] text-xs font-semibold text-[#CBD5E1] hover:text-white transition-colors cursor-pointer"
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
      </div>

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
