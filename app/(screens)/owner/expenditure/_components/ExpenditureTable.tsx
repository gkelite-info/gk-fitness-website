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

const expensesData = [
  {
    id: 1,
    name: "Gym Rent – July 2024",
    category: { label: "Rent", color: "#EA580C", bg: "#332219", border: "#522D1B" },
    amount: "₹25,000",
    date: "Jul 1, 2024",
    paymentMethod: { label: "Bank Transfer", color: "#D1D5DB", bg: "#1A232F", border: "#273648" },
  },
  {
    id: 2,
    name: "Trainer Salaries",
    category: { label: "Staff Salaries", color: "#C084FC", bg: "#281B36", border: "#442761" },
    amount: "₹48,000",
    date: "Jul 3, 2024",
    paymentMethod: { label: "Bank Transfer", color: "#D1D5DB", bg: "#1A232F", border: "#273648" },
  },
  {
    id: 3,
    name: "Treadmill Maintenance",
    category: { label: "Maintenance", color: "#4ADE80", bg: "#1B2B1E", border: "#2B4B32" },
    amount: "₹8,500",
    date: "Jul 5, 2024",
    paymentMethod: { label: "UPI", color: "#A78BFA", bg: "#221C38", border: "#3B2D66" },
  },
  {
    id: 4,
    name: "Electricity Bill",
    category: { label: "Utilities", color: "#38BDF8", bg: "#14283B", border: "#1B4366" },
    amount: "₹6,320",
    date: "Jul 8, 2024",
    paymentMethod: { label: "UPI", color: "#A78BFA", bg: "#221C38", border: "#3B2D66" },
  },
  {
    id: 5,
    name: "Marketing – Social Media",
    category: { label: "Marketing", color: "#F472B6", bg: "#331828", border: "#5C2447" },
    amount: "₹7,500",
    date: "Jul 10, 2024",
    paymentMethod: { label: "Credit Card", color: "#FBBF24", bg: "#2E2617", border: "#52411E" },
  },
  {
    id: 6,
    name: "Whey Protein Stock",
    category: { label: "Supplements", color: "#CCFF00", bg: "#2A2C16", border: "#484D1E" },
    amount: "₹14,800",
    date: "Jul 12, 2024",
    paymentMethod: { label: "Debit Card", color: "#2DD4BF", bg: "#14282C", border: "#1E464C" },
  },
  {
    id: 7,
    name: "Cleaning Supplies",
    category: { label: "Cleaning Supplies", color: "#22D3EE", bg: "#142B2E", border: "#1D4F54" },
    amount: "₹4,350",
    date: "Jul 14, 2024",
    paymentMethod: { label: "Cash", color: "#4ADE80", bg: "#152A1D", border: "#214A31" },
  },
  {
    id: 8,
    name: "Gym Equipment (Dumbbells)",
    category: { label: "Equipment", color: "#F87171", bg: "#31171A", border: "#592228", icon: Barbell },
    amount: "₹18,200",
    date: "Jul 16, 2024",
    paymentMethod: { label: "Bank Transfer", color: "#D1D5DB", bg: "#1A232F", border: "#273648" },
  },
];

export default function ExpenditureTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [editExpense, setEditExpense] = useState<ExpenseData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successData, setSuccessData] = useState<ExpenseData | null>(null);
  
  const [viewExpense, setViewExpense] = useState<ExpenseData | null>(null);
  const [deleteExpenseId, setDeleteExpenseId] = useState<number | string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = () => {
    setIsDeleting(true);
    // Simulate API call
    setTimeout(() => {
      setIsDeleting(false);
      setDeleteExpenseId(null);
      setViewExpense(null); // Close details modal if it was open
    }, 1000);
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
          {expensesData.map((expense, idx) => (
            <TableRow key={expense.id} className={idx !== 0 ? "border-t border-[#17202A]" : ""}>
              <TableCell className="text-white font-medium text-xs">{expense.name}</TableCell>
              <TableCell>
                <div 
                  className="inline-flex flex-row items-center justify-center px-2.5 py-1 gap-1.5 rounded-full border"
                  style={{ backgroundColor: expense.category.bg, borderColor: expense.category.border }}
                >
                  {expense.category.icon && <expense.category.icon size={12} weight="fill" color={expense.category.color} />}
                  <span className="font-medium text-[11px] leading-4" style={{ color: expense.category.color }}>
                    {expense.category.label}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-white font-semibold text-xs">{expense.amount}</TableCell>
              <TableCell className="text-[#9CA3AF] font-normal text-xs">{expense.date}</TableCell>
              <TableCell>
                <div 
                  className="inline-flex flex-row items-center justify-center px-2.5 py-1 rounded-full border"
                  style={{ backgroundColor: expense.paymentMethod.bg, borderColor: expense.paymentMethod.border }}
                >
                  <span className="font-normal text-[11px] leading-4" style={{ color: expense.paymentMethod.color }}>
                    {expense.paymentMethod.label}
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
                        id: expense.id,
                        name: expense.name,
                        category: expense.category.label,
                        amount: expense.amount,
                        date: expense.date,
                        paymentMethod: expense.paymentMethod.label,
                        notes: ""
                      });
                    }} 
                  />
                  <Pen 
                    size={16} 
                    className="text-[#556475] cursor-pointer hover:text-white transition-colors"
                    onClick={() => {
                      setEditExpense({
                        id: expense.id,
                        name: expense.name,
                        category: expense.category.label,
                        amount: expense.amount,
                        date: expense.date,
                        paymentMethod: expense.paymentMethod.label,
                        notes: ""
                      });
                      setIsModalOpen(true);
                    }}
                  />
                  <Trash 
                    size={16} 
                    className="text-[#556475] cursor-pointer hover:text-[#F43F5E] transition-colors"
                    onClick={() => setDeleteExpenseId(expense.id)}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className="px-4 border-t-0">
        <Pagination
          currentPage={currentPage}
          totalPages={4}
          totalItems={32}
          itemsPerPage={8}
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
