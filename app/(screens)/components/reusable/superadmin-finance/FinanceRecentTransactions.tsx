"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Ticket,
  User,
  Users,
  Buildings,
  ArrowUpRight,
  CaretRight,
} from "@phosphor-icons/react";
import { RECENT_TRANSACTIONS } from "./mockData";
import { RecentTransaction } from "./types";

export default function FinanceRecentTransactions() {
  const router = useRouter();

  const getSourceIcon = (type: RecentTransaction["sourceType"]) => {
    switch (type) {
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
        return (
          <div className="w-8 h-8 rounded-lg bg-[#0D261C] border border-[#164E37]/40 flex items-center justify-center shrink-0">
            <Buildings size={16} weight="fill" className="text-[#10B981]" />
          </div>
        );
      case "payout":
        return (
          <div className="w-8 h-8 rounded-lg bg-[#0D261C] border border-[#164E37]/40 flex items-center justify-center shrink-0">
            <Buildings size={16} weight="fill" className="text-[#10B981]" />
          </div>
        );
    }
  };

  return (
    <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-5 flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between pb-3 border-b border-[#1E222D]">
        <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
          Recent Transactions
        </h2>
        <Link
          href="/superadmin/finance/recent-transactions"
          className="text-xs sm:text-sm font-semibold text-[#94A3B8] hover:text-[#D4FF32] flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>View All</span>
          <CaretRight size={14} weight="bold" />
        </Link>
      </div>

      <div className="w-full overflow-x-auto scrollbar-none">
        <table className="w-full text-left border-collapse min-w-[680px]">
          <thead>
            <tr className="border-b border-[#181B24] text-[11px] font-semibold text-[#64748B] uppercase tracking-wider">
              <th className="py-2.5 px-3">Date</th>
              <th className="py-2.5 px-3">Source</th>
              <th className="py-2.5 px-3">Type</th>
              <th className="py-2.5 px-3">Amount</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#181B24]/60">
            {RECENT_TRANSACTIONS.map((tx) => {
              const isPayment = tx.type === "Payment Received";
              const isPaid = tx.status === "Paid";

              return (
                <tr
                  key={tx.id}
                  onClick={() => router.push("/superadmin/finance/recent-transactions")}
                  className="hover:bg-[#161822] transition-colors group cursor-pointer"
                >
                  <td className="py-3 px-3 text-xs font-medium text-[#CBD5E1] whitespace-nowrap">
                    {tx.date}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      {getSourceIcon(tx.sourceType)}
                      <span className="text-xs sm:text-sm font-semibold text-white">
                        {tx.source}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${
                        isPayment
                          ? "bg-[#0D261C] text-[#10B981] border-[#164E37]/50"
                          : "bg-[#2D151B] text-[#F87171] border-[#522222]/50"
                      }`}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-xs sm:text-sm font-bold text-white whitespace-nowrap">
                    {tx.amount}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border ${
                        isPaid
                          ? "bg-[#0D261C] text-[#10B981] border-[#164E37]/50"
                          : "bg-[#2B1F0E] text-[#FBBF24] border-[#543A14]/50"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <CaretRight
                      size={14}
                      weight="bold"
                      className="text-[#64748B] group-hover:text-white group-hover:translate-x-0.5 transition-all inline-block"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
