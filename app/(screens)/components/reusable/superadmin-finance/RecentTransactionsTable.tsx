"use client";

import {
  Ticket,
  User,
  Users,
  Buildings,
  CaretRight,
} from "@phosphor-icons/react";
import {
  Table,
  TableHeader,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
} from "@/app/(screens)/components/reusable/table";
import Pagination from "@/app/(screens)/components/reusable/Pagination";
import {
  RecentTransactionItem,
  RecentTransactionSourceType,
} from "./recentTransactionsTypes";

interface RecentTransactionsTableProps {
  transactions: RecentTransactionItem[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onViewTransaction: (tx: RecentTransactionItem) => void;
}

export default function RecentTransactionsTable({
  transactions,
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onViewTransaction,
}: RecentTransactionsTableProps) {
  const getSourceIcon = (sourceType: RecentTransactionSourceType) => {
    switch (sourceType) {
      case "pass":
        return (
          <div className="w-8 h-8 rounded-lg bg-[#2E180E] border border-[#633017]/40 flex items-center justify-center shrink-0">
            <Ticket size={16} weight="fill" className="text-[#FB923C]" />
          </div>
        );
      case "global":
        return (
          <div className="w-8 h-8 rounded-lg bg-[#0E2038] border border-[#1E3A5F]/40 flex items-center justify-center shrink-0">
            <User size={16} weight="fill" className="text-[#38BDF8]" />
          </div>
        );
      case "plan":
        return (
          <div className="w-8 h-8 rounded-lg bg-[#241432] border border-[#482069]/40 flex items-center justify-center shrink-0">
            <Users size={16} weight="fill" className="text-[#C084FC]" />
          </div>
        );
      case "gym":
      case "payout":
        return (
          <div className="w-8 h-8 rounded-lg bg-[#0D261C] border border-[#164E37]/40 flex items-center justify-center shrink-0">
            <Buildings size={16} weight="fill" className="text-[#10B981]" />
          </div>
        );
      case "trainer":
        return (
          <div className="w-8 h-8 rounded-lg bg-[#241432] border border-[#482069]/40 flex items-center justify-center shrink-0">
            <User size={16} weight="fill" className="text-[#C084FC]" />
          </div>
        );
    }
  };

  return (
    <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-4 sm:p-5 flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between pb-1">
        <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
          Transactions ({totalItems})
        </h2>
      </div>

      <div className="w-full overflow-x-auto scrollbar-none rounded-xl">
        <Table className="border-0 bg-transparent rounded-none min-w-[700px]">
          <TableHeader className="bg-[#101217] border-b border-[#1E222D]">
            <TableRow className="border-none hover:bg-transparent">
              <TableHeadCell className="py-3 px-4 text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                Date
              </TableHeadCell>
              <TableHeadCell className="py-3 px-4 text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                Source
              </TableHeadCell>
              <TableHeadCell className="py-3 px-4 text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                Type
              </TableHeadCell>
              <TableHeadCell className="py-3 px-4 text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                Amount
              </TableHeadCell>
              <TableHeadCell className="py-3 px-4 text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                Status
              </TableHeadCell>
              <TableHeadCell className="py-3 px-4 text-xs font-semibold text-[#64748B] uppercase tracking-wider text-right">
                Action
              </TableHeadCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-[#181B24]/60">
            {transactions.length === 0 ? (
              <TableRow className="border-none hover:bg-transparent">
                <TableCell
                  colSpan={6}
                  className="py-12 text-center text-[#94A3B8] text-sm"
                >
                  No transactions found matching your filters.
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((tx) => {
                const isPayment = tx.type === "Payment Received";
                const isPaid = tx.status === "Paid";

                return (
                  <TableRow
                    key={tx.id}
                    className="border-none hover:bg-[#161822] transition-colors group cursor-pointer"
                    onClick={() => onViewTransaction(tx)}
                  >
                    <TableCell className="py-3.5 px-4 text-xs font-medium text-[#CBD5E1] whitespace-nowrap">
                      {tx.date}
                    </TableCell>

                    <TableCell className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        {getSourceIcon(tx.sourceType)}
                        <span className="text-xs sm:text-sm font-semibold text-white">
                          {tx.source}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                          isPayment
                            ? "bg-[#0D261C] text-[#10B981] border-[#164E37]/50"
                            : "bg-[#2D151B] text-[#F87171] border-[#522222]/50"
                        }`}
                      >
                        {tx.type}
                      </span>
                    </TableCell>

                    <TableCell className="py-3.5 px-4 text-xs sm:text-sm font-bold text-white whitespace-nowrap">
                      {tx.amount}
                    </TableCell>

                    <TableCell className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold border ${
                          isPaid
                            ? "bg-[#0D261C] text-[#10B981] border-[#164E37]/50"
                            : "bg-[#2B1F0E] text-[#FBBF24] border-[#543A14]/50"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </TableCell>

                    <TableCell className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onViewTransaction(tx);
                        }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#181D26] border border-[#262F3E] text-xs font-semibold text-[#CBD5E1] hover:text-white hover:border-[#383D50] hover:bg-[#202735] transition-all cursor-pointer"
                      >
                        <span>View</span>
                        <CaretRight size={12} weight="bold" />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })
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
        itemLabel="transactions"
        format="to"
      />
    </div>
  );
}
