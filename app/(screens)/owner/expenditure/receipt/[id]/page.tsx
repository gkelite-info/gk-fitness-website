"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchGymExpenseById } from "@/lib/helpers/gymExpenses";
import { useGym } from "@/lib/hooks/gyms/useGym";

export default function ReceiptPrintPage() {
  const params = useParams();
  const id = params?.id as string;

  const [expense, setExpense] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadExpense() {
      if (!id) return;
      try {
        const data = await fetchGymExpenseById(id);
        setExpense(data);
      } catch (error) {
        console.error("Failed to load expense:", error);
      } finally {
        setLoading(false);
      }
    }
    loadExpense();
  }, [id]);

  const { data: gymData } = useGym(expense?.gymId);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-black">Loading receipt...</div>;
  }

  if (!expense) {
    return <div className="flex items-center justify-center min-h-screen text-black">Receipt not found</div>;
  }

  const capitalize = (str: string) => str ? str.charAt(0).toUpperCase() + str.slice(1) : str;

  const dateStr = expense.date;
  const titleStr = expense.expenseTitle;
  const amountStr = expense.amount;
  const notesStr = expense.notes;

  let receiptUrl = null;
  if (expense.receiptUrl) {
    receiptUrl = expense.receiptUrl.startsWith('http')
      ? expense.receiptUrl
      : `/api/receipt?file=${expense.receiptUrl}`;
  }

  return (
    <div className="bg-white min-h-screen flex flex-col items-center py-10 px-4 print:py-0 print:px-0 print:min-h-0">
      <div className="w-full max-w-3xl bg-white p-8 sm:p-12 shadow-xl border border-gray-100 rounded-xl print:shadow-none print:border-none print:p-0 print:m-0">
        <div className="flex justify-end mb-8 print:hidden">
          <button
            onClick={() => window.print()}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm"
          >
            Print Receipt
          </button>
        </div>

        <div className="flex flex-row justify-between items-start mb-8 sm:mb-12 border-b border-gray-200 pb-6 sm:pb-8">
          <div className="font-bold text-black text-2xl sm:text-4xl tracking-tight leading-none">
            {gymData?.gymName || "GK Gym Life"}
          </div>
          <div className="text-right">
            <div className="font-bold text-black text-xl sm:text-2xl leading-none tracking-widest text-gray-800">INVOICE</div>
            <div className="text-gray-500 text-sm sm:text-base mt-2 font-medium">#{expense.gymExpenseId.split('-')[0].toUpperCase()}</div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-8 sm:gap-0 mb-10 sm:mb-14">
          <div className="text-sm sm:text-base text-gray-600 leading-relaxed">
            <span className="text-xs font-bold text-gray-400 tracking-wider mb-2 block">BILL TO</span>
            <span className="font-bold text-black text-lg block mb-1">{gymData?.gymName || "GK Gym Life"}</span>
            {gymData?.address || "123 Fitness Street"}<br />
            {gymData?.city || "Indore"}, {gymData?.state || "Madhya Pradesh"}<br />
            India {gymData?.pincode ? `- ${gymData.pincode}` : ""}
          </div>
          <div className="text-sm sm:text-base text-gray-600 text-left sm:text-right leading-relaxed">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:block sm:space-y-2">
              <div className="text-gray-500 sm:inline-block sm:w-28 sm:text-right">Invoice Date:</div>
              <div className="text-black font-semibold sm:inline-block">{new Date(dateStr).toLocaleDateString()}</div>

              <div className="text-gray-500 sm:inline-block sm:w-28 sm:text-right mt-1">Due Date:</div>
              <div className="text-black font-semibold sm:inline-block">{new Date(dateStr).toLocaleDateString()}</div>

              <div className="text-gray-500 sm:inline-block sm:w-28 sm:text-right mt-1">Payment Method:</div>
              <div className="text-black font-semibold sm:inline-block">{capitalize(expense.paymentMethod)}</div>
            </div>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden mb-10">
          <div className="flex justify-between bg-gray-50 border-b border-gray-200 px-6 py-3">
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Description</div>
            <div className="text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Amount</div>
          </div>
          <div className="flex justify-between items-start gap-4 px-6 py-6">
            <div>
              <div className="text-base font-semibold text-black leading-tight mb-1">{titleStr}</div>
              <div className="text-sm text-gray-500">Category: {capitalize(expense.category)}</div>
            </div>
            <div className="text-lg text-black font-bold shrink-0">₹{amountStr}</div>
          </div>
          <div className="flex justify-between items-center bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="text-base font-bold text-gray-800">TOTAL AMOUNT</div>
            <div className="text-xl font-black text-black">₹{amountStr}</div>
          </div>
        </div>

        {notesStr && (
          <div className="mb-12">
            <h4 className="text-sm font-bold text-gray-800 mb-2">Notes</h4>
            <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-100">{notesStr}</p>
          </div>
        )}

        {receiptUrl && (
          <div className="mt-12 pt-10 border-t border-gray-200 break-before-page print:pt-0 print:mt-0 print:border-none">
            <h4 className="text-lg font-bold text-black mb-6 text-center print:hidden">Attached Receipt</h4>
            <div className="w-full flex items-center justify-center bg-gray-50 p-4 sm:p-8 rounded-xl border border-gray-200 break-inside-avoid print:p-0 print:border-none print:bg-white">
              <img
                src={receiptUrl}
                alt="Expense Attached Receipt"
                className="max-w-full max-h-[85vh] object-contain rounded shadow-sm print:shadow-none"
              />
            </div>
          </div>
        )}

        <div className="mt-16 text-center text-sm text-gray-400 print:block print:mt-8">
          This is a computer generated invoice and does not require a physical signature.
        </div>
      </div>
    </div>
  );
}
