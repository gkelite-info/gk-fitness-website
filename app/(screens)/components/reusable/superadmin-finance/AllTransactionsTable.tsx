"use client";

import { CaretRight } from "@phosphor-icons/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeadCell,
  TableCell,
} from "@/app/(screens)/components/reusable/table";
import Avatar from "@/app/(screens)/components/reusable/Avatar";
import Pagination from "@/app/(screens)/components/reusable/Pagination";
import { FinanceTransactionRecord } from "./types";

interface AllTransactionsTableProps {
  transactions: FinanceTransactionRecord[];
  currentPage: number;
  onPageChange: (page: number) => void;
  onViewDetails: (tx: FinanceTransactionRecord) => void;
  itemsPerPage?: number;
}

export default function AllTransactionsTable({
  transactions,
  currentPage,
  onPageChange,
  onViewDetails,
  itemsPerPage = 8,
}: AllTransactionsTableProps) {
  const totalItems = transactions.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getSourceBadge = (source: string, category: string) => {
    switch (category) {
      case "gym-label":
        return "bg-[#2A1B3D] text-[#C084FC] border-[#582987]/30";
      case "trainer-payout":
        return "bg-[#14293D] text-[#38BDF8] border-[#1E4A6F]/30";
      case "customer-plan":
        return "bg-[#3D2614] text-[#FB923C] border-[#7A3F18]/30";
      case "global-session":
        return "bg-[#0F2E2E] text-[#2DD4BF] border-[#185E59]/30";
      case "gym-pass":
        return "bg-[#331429] text-[#F472B6] border-[#681E4E]/30";
      case "gym-payout":
        return "bg-[#332B10] text-[#FACC15] border-[#6B5A14]/30";
      default:
        return "bg-[#1E222D] text-[#94A3B8] border-[#2E3545]";
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full min-w-0">
      <Table tableClassName="w-full">
        <TableHeader>
          <TableRow>
            <TableHeadCell>Date</TableHeadCell>
            <TableHeadCell>Transaction ID</TableHeadCell>
            <TableHeadCell>From / To</TableHeadCell>
            <TableHeadCell>Source</TableHeadCell>
            <TableHeadCell>Amount</TableHeadCell>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell className="text-right">Action</TableHeadCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedTransactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-10 text-[#64748B]">
                No transactions found matching your criteria.
              </TableCell>
            </TableRow>
          ) : (
            paginatedTransactions.map((tx) => (
              <TableRow key={tx.id} className="border-b border-[#1E222D]">
                <TableCell className="font-medium text-white text-xs sm:text-sm">
                  {tx.date}
                </TableCell>

                <TableCell className="font-medium text-[#94A3B8] text-xs sm:text-sm">
                  {tx.id}
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Avatar
                      src={tx.avatarUrl}
                      gender={tx.gender}
                      alt={tx.fromToName}
                      className="w-7 h-7 rounded-full shrink-0"
                    />
                    <span className="font-medium text-white text-xs sm:text-sm whitespace-nowrap">
                      {tx.fromToName}
                    </span>
                  </div>
                </TableCell>

                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-medium border whitespace-nowrap ${getSourceBadge(
                      tx.source,
                      tx.sourceCategory
                    )}`}
                  >
                    {tx.source}
                  </span>
                </TableCell>

                <TableCell className="font-bold text-white text-xs sm:text-sm">
                  {tx.amount}
                </TableCell>

                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-medium border whitespace-nowrap ${
                      tx.type === "Payment Received"
                        ? "bg-[#0D2B1E] text-[#10B981] border-[#165636]/40"
                        : "bg-[#331818] text-[#F87171] border-[#6B2424]/40"
                    }`}
                  >
                    {tx.type}
                  </span>
                </TableCell>

                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-medium border whitespace-nowrap ${
                      tx.status === "Paid"
                        ? "bg-[#0D2B1E] text-[#10B981] border-[#165636]/40"
                        : tx.status === "Pending"
                        ? "bg-[#332410] text-[#F59E0B] border-[#6B4614]/40"
                        : "bg-[#331818] text-[#F87171] border-[#6B2424]/40"
                    }`}
                  >
                    {tx.status}
                  </span>
                </TableCell>

                <TableCell className="text-right">
                  <button
                    type="button"
                    onClick={() => onViewDetails(tx)}
                    className="inline-flex items-center gap-1 text-xs text-[#94A3B8] hover:text-[#D4FF32] transition-colors cursor-pointer group whitespace-nowrap"
                  >
                    <span>View</span>
                    <CaretRight
                      size={12}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {totalItems > 0 && (
        <div className="w-full pt-1">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={onPageChange}
            hideBorder
          />
        </div>
      )}
    </div>
  );
}
