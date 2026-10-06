"use client";
import { useState } from "react";
import { Table } from "@/app/(screens)/components/reusable/table/Table";
import { TableHeader } from "@/app/(screens)/components/reusable/table/TableHeader";
import { TableBody } from "@/app/(screens)/components/reusable/table/TableBody";
import { TableRow, TableHeadCell, TableCell } from "@/app/(screens)/components/reusable/table/TableCells";
import { ArrowDown, Barbell, Eye, Pen, Trash } from "@phosphor-icons/react";
import AddExpenseModal, { ExpenseData } from "./AddExpenseModal";
import ExpenseSuccessModal from "./ExpenseSuccessModal";
import ExpenseDetailsModal from "./ExpenseDetailsModal";
import ConfirmationModal from "@/app/(screens)/components/reusable/ConfirmationModal";
import Pagination from "@/app/(screens)/components/reusable/Pagination";
import { useDeleteGymExpense } from "@/lib/hooks/gymExpenses/useGymExpenses";

export default function ExpenditureTable({ filteredExpenses = [], isLoading = false }: { filteredExpenses?: any[], isLoading?: boolean }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [editExpense, setEditExpense] = useState<ExpenseData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successData, setSuccessData] = useState<ExpenseData | null>(null);

  const [viewExpense, setViewExpense] = useState<ExpenseData | null>(null);
  const [deleteExpenseId, setDeleteExpenseId] = useState<number | string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteExpenseMutation = useDeleteGymExpense();

  const handleDeleteConfirm = () => {
    if (!deleteExpenseId) return;
    setIsDeleting(true);
    deleteExpenseMutation.mutate(deleteExpenseId.toString(), {
      onSuccess: () => {
        setIsDeleting(false);
        setDeleteExpenseId(null);
        setViewExpense(null);
      },
      onError: () => {
        setIsDeleting(false);
      }
    });
  };

  // Pagination logic
  const itemsPerPage = 8;
  const totalItems = filteredExpenses.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentExpenses = filteredExpenses.slice(startIndex, startIndex + itemsPerPage);

  const getCategoryStyles = (category: string) => {
    switch (category?.toLowerCase()) {
      case "rent": return { color: "#EA580C", bg: "#332219", border: "#522D1B" };
      case "salaries": return { color: "#C084FC", bg: "#281B36", border: "#442761" };
      case "maintenance": return { color: "#4ADE80", bg: "#1B2B1E", border: "#2B4B32" };
      case "utilities": return { color: "#38BDF8", bg: "#14283B", border: "#1B4366" };
      case "marketing": return { color: "#F472B6", bg: "#331828", border: "#5C2447" };
      case "supplements": return { color: "#CCFF00", bg: "#2A2C16", border: "#484D1E" };
      case "cleaning": return { color: "#22D3EE", bg: "#142B2E", border: "#1D4F54" };
      case "equipment": return { color: "#F87171", bg: "#31171A", border: "#592228" };
      default: return { color: "#D1D5DB", bg: "#1A232F", border: "#273648" };
    }
  };

  const getPaymentStyles = (method: string) => {
    switch (method?.toLowerCase()) {
      case "upi": return { color: "#A78BFA", bg: "#221C38", border: "#3B2D66" };
      case "credit_card": return { color: "#FBBF24", bg: "#2E2617", border: "#52411E" };
      case "debit_card": return { color: "#2DD4BF", bg: "#14282C", border: "#1E464C" };
      case "cash": return { color: "#4ADE80", bg: "#152A1D", border: "#214A31" };
      case "bank": 
      default: return { color: "#D1D5DB", bg: "#1A232F", border: "#273648" };
    }
  };

  return (
    <>
      <div className="w-full flex flex-col bg-[#11161D] border border-[#1A232C] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-xl shrink-0">
        <Table className="border-none bg-transparent rounded-t-xl rounded-b-none">
          <TableHeader className="bg-[#131922] border-b border-[#1B242E]">
            <TableRow className="hover:bg-transparent">
              <TableHeadCell className="text-[#D1D5DB] capitalize font-semibold tracking-normal text-xs py-3.5">Expense Name</TableHeadCell>
              <TableHeadCell className="text-[#D1D5DB] capitalize font-semibold tracking-normal text-xs py-3.5">Category</TableHeadCell>
              <TableHeadCell className="text-[#D1D5DB] capitalize font-semibold tracking-normal text-xs py-3.5">Amount</TableHeadCell>
              <TableHeadCell className="text-[#D1D5DB] capitalize font-semibold tracking-normal text-xs py-3.5 cursor-pointer">
                <div className="flex flex-row items-center gap-1">
                  Date <ArrowDown size={12} className="text-[#9CA3AF]" />
                </div>
              </TableHeadCell>
              <TableHeadCell className="text-[#D1D5DB] capitalize font-semibold tracking-normal text-xs py-3.5">Payment Method</TableHeadCell>
              <TableHeadCell className="text-[#D1D5DB] capitalize font-semibold tracking-normal text-xs py-3.5 text-right">Actions</TableHeadCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-[#9CA3AF]">Loading expenses...</TableCell>
              </TableRow>
            ) : currentExpenses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-[#9CA3AF]">No expenses found.</TableCell>
              </TableRow>
            ) : (
              currentExpenses.map((expense: any, idx: number) => {
                const catStyles = getCategoryStyles(expense.category);
                const payStyles = getPaymentStyles(expense.paymentMethod);
                
                return (
                  <TableRow key={expense.gymExpenseId} className={idx !== 0 ? "border-t border-[#17202A]" : ""}>
                    <TableCell className="text-white font-medium text-xs">{expense.expenseTitle}</TableCell>
                    <TableCell>
                      <div
                        className="inline-flex flex-row items-center justify-center px-2.5 py-1 gap-1.5 rounded-full border"
                        style={{ backgroundColor: catStyles.bg, borderColor: catStyles.border }}
                      >
                        <span className="font-medium text-[11px] leading-4 capitalize" style={{ color: catStyles.color }}>
                          {expense.category || "Other"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-white font-semibold text-xs">₹{expense.amount?.toLocaleString('en-IN')}</TableCell>
                    <TableCell className="text-[#9CA3AF] font-normal text-xs">{new Date(expense.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</TableCell>
                    <TableCell>
                      <div
                        className="inline-flex flex-row items-center justify-center px-2.5 py-1 rounded-full border"
                        style={{ backgroundColor: payStyles.bg, borderColor: payStyles.border }}
                      >
                        <span className="font-normal text-[11px] leading-4 capitalize" style={{ color: payStyles.color }}>
                          {expense.paymentMethod?.replace('_', ' ') || "Bank"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center w-full gap-3">
                        <Eye
                          size={18}
                          className="text-[#556475] cursor-pointer hover:text-white transition-colors"
                          onClick={() => {
                            setViewExpense({
                              id: expense.gymExpenseId,
                              name: expense.expenseTitle,
                              category: expense.category,
                              amount: expense.amount.toString(),
                              date: expense.date,
                              paymentMethod: expense.paymentMethod,
                              notes: expense.notes,
                              receiptUrl: expense.receiptUrl,
                              addedBy: expense.createdBy_user?.name || "Unknown",
                            });
                          }}
                        />
                        <Pen
                          size={16}
                          className="text-[#556475] cursor-pointer hover:text-white transition-colors"
                          onClick={() => {
                            setEditExpense({
                              id: expense.gymExpenseId,
                              name: expense.expenseTitle,
                              category: expense.category,
                              amount: expense.amount.toString(),
                              date: expense.date,
                              paymentMethod: expense.paymentMethod,
                              notes: expense.notes,
                              receiptUrl: expense.receiptUrl,
                              addedBy: expense.createdBy_user?.name || "Unknown",
                            });
                            setIsModalOpen(true);
                          }}
                        />
                        <Trash
                          size={16}
                          className="text-[#556475] cursor-pointer hover:text-[#F43F5E] transition-colors"
                          onClick={() => setDeleteExpenseId(expense.gymExpenseId)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        <div className="px-4 border-t-0">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <AddExpenseModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditExpense(null);
        }}
        initialData={editExpense}
        onSuccess={(data) => {
          setIsModalOpen(false);
          setEditExpense(null);
          setSuccessData(data);
        }}
      />
      <ExpenseSuccessModal
        isOpen={!!successData}
        onClose={() => setSuccessData(null)}
        expenseData={successData}
        onAddAnother={() => {
          setSuccessData(null);
          setIsModalOpen(true);
        }}
      />

      <ExpenseDetailsModal
        isOpen={!!viewExpense}
        onClose={() => setViewExpense(null)}
        expenseData={viewExpense}
        onEdit={() => {
          setViewExpense(null);
          setEditExpense(viewExpense);
          setIsModalOpen(true);
        }}
        onDelete={() => setDeleteExpenseId(viewExpense?.id || null)}
      />

      <ConfirmationModal
        isOpen={!!deleteExpenseId}
        onClose={() => !isDeleting && setDeleteExpenseId(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Expense"
        message="Are you sure you want to delete this expense? This action cannot be undone."
        confirmText="Delete"
        confirmingText="Deleting..."
        isDestructive={true}
      />
    </>
  );
}
