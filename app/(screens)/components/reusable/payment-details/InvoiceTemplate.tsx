"use client";

import { PaymentDetailsData } from "./types";
import { CheckCircle, XCircle } from "@phosphor-icons/react/dist/ssr";

interface InvoiceTemplateProps {
  data: PaymentDetailsData & { gymName?: string };
}

export default function InvoiceTemplate({ data }: InvoiceTemplateProps) {
  const isSuccess = data.paymentStatus === "Recorded & Verified";

  return (
    <div className="flex flex-col w-full bg-[#191C21] rounded-2xl border border-[rgba(39,42,48,0.8)] overflow-hidden shadow-2xl relative">
      <div className="h-2 w-full bg-[#D4FF00]" />
      <div className="p-8 sm:p-12 flex flex-col gap-10">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-white m-0 uppercase tracking-tight">
              {data.gymName || "GK Fitness"}
            </h1>
            <span className="text-sm text-[#94A3B8] font-medium uppercase tracking-[1px]">Payment Invoice</span>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1">
            <span className="text-xs text-[#94A3B8] uppercase tracking-widest font-semibold">Transaction ID</span>
            <span className="text-base sm:text-lg text-white font-mono font-medium bg-[#131722] px-3 py-1 rounded-lg border border-[#272A30]">
              {data.transactionId}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-y border-[rgba(39,42,48,0.6)]">
          <div className="flex flex-col gap-4">
            <span className="text-xs text-[#94A3B8] uppercase tracking-widest font-semibold">Billed To</span>
            <div className="flex flex-col gap-1">
              <span className="text-lg text-white font-bold">{data.memberName}</span>
              <span className="text-sm text-[#C4CAAC] font-mono">{data.memberCode}</span>
              <span className="text-sm text-[#C4CAAC]">{data.phone}</span>
              <span className="text-sm text-[#C4CAAC]">{data.email}</span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-xs text-[#94A3B8] uppercase tracking-widest font-semibold">Payment Info</span>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              <span className="text-sm text-[#94A3B8]">Date:</span>
              <span className="text-sm text-white font-medium text-right">{data.paymentDate}</span>

              <span className="text-sm text-[#94A3B8]">Time:</span>
              <span className="text-sm text-white font-medium text-right">{data.paymentTime}</span>

              <span className="text-sm text-[#94A3B8]">Method:</span>
              <span className="text-sm text-white font-medium text-right uppercase">{data.paymentMethod}</span>

              <span className="text-sm text-[#94A3B8]">Status:</span>
              <div className="flex items-center justify-end gap-1.5">
                {isSuccess ? (
                  <CheckCircle size={16} weight="fill" className="text-[#34D399]" />
                ) : (
                  <XCircle size={16} weight="fill" className="text-red-500" />
                )}
                <span className={`text-sm font-semibold ${isSuccess ? 'text-[#34D399]' : 'text-red-500'}`}>
                  {data.paymentStatus}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <div className="w-full overflow-x-auto scrollbar-themed pb-4">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-[rgba(39,42,48,0.8)]">
                  <th className="pb-4 text-xs font-semibold text-[#94A3B8] uppercase tracking-widest whitespace-nowrap">Description</th>
                  <th className="pb-4 text-xs font-semibold text-[#94A3B8] uppercase tracking-widest text-center whitespace-nowrap">Duration</th>
                  <th className="pb-4 text-xs font-semibold text-[#94A3B8] uppercase tracking-widest text-right whitespace-nowrap">Valid Till</th>
                  <th className="pb-4 text-xs font-semibold text-[#94A3B8] uppercase tracking-widest text-right whitespace-nowrap">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[rgba(39,42,48,0.4)]">
                  <td className="py-6">
                    <div className="flex flex-col gap-1 items-start">
                      <span className="text-base text-white font-semibold whitespace-nowrap">{data.membershipPlan}</span>
                      <span className="text-xs text-[#D4FF00] bg-[rgba(212,255,0,0.1)] px-2 py-0.5 rounded w-fit whitespace-nowrap mt-1">
                        {data.memberStatus}
                      </span>
                    </div>
                  </td>
                  <td className="py-6 text-center text-sm text-[#C4CAAC] whitespace-nowrap">{data.planDuration}</td>
                  <td className="py-6 text-right text-sm text-[#C4CAAC] font-mono whitespace-nowrap">{data.planValidTill}</td>
                  <td className="py-6 text-right text-base text-white font-semibold font-mono whitespace-nowrap">
                    ₹{data.amountPaid.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start pt-2 gap-8">
          <div className="w-full sm:w-1/2 flex flex-col gap-2">
            <span className="text-xs text-[#94A3B8] uppercase tracking-widest font-semibold">Notes</span>
            <p className="text-sm text-[#C4CAAC] leading-relaxed">
              This is a computer generated invoice and does not require a physical signature. Thank you for choosing {data.gymName || "GK Fitness"}!
            </p>
          </div>

          <div className="w-full sm:w-[320px] flex flex-col gap-4">
            <div className="flex justify-between items-center pb-4 border-b border-[rgba(39,42,48,0.8)]">
              <span className="text-sm text-[#94A3B8]">Subtotal</span>
              <span className="text-sm text-white font-mono">₹{data.amountPaid.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center bg-[#D4FF00] p-4 rounded-xl shadow-[0_4px_15px_rgba(212,255,0,0.2)] mt-2">
              <span className="text-base text-black font-bold uppercase tracking-wide">Total Paid</span>
              <span className="text-xl text-black font-mono font-bold">₹{data.amountPaid.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
