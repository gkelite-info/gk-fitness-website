"use client";

import { useState, useMemo, useEffect } from "react";
import ExpenditureHeader from "./ExpenditureHeader";
import ExpenditureCards from "./ExpenditureCards";
import ExpenditureFilterBar from "./ExpenditureFilterBar";
import ExpenditureTable from "./ExpenditureTable";
import { useUser } from "@/app/context/UserContext";
import { useGymExpenses } from "@/lib/hooks/gymExpenses/useGymExpenses";

export default function ExpenditureClient() {
  const { roleData } = useUser();
  const gymId = roleData?.[0]?.gymId;

  const { data: expensesData = [], isLoading } = useGymExpenses(gymId);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [paymentMethod, setPaymentMethod] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 600);
    return () => clearTimeout(handler);
  }, [search]);

  const filteredExpenses = useMemo(() => {
    return expensesData.filter((expense: any) => {
      if (expense.is_deleted || expense.deletedAt) return false;

      if (category !== "all" && expense.category?.toLowerCase() !== category.toLowerCase()) {
        return false;
      }

      if (paymentMethod !== "all" && expense.paymentMethod?.toLowerCase() !== paymentMethod.toLowerCase()) {
        return false;
      }

      if (fromDate) {
        const expenseDate = new Date(expense.date);
        const fromDateObj = new Date(fromDate);
        fromDateObj.setHours(0, 0, 0, 0);
        expenseDate.setHours(0, 0, 0, 0);
        if (expenseDate < fromDateObj) return false;
      }

      if (toDate) {
        const expenseDate = new Date(expense.date);
        const toDateObj = new Date(toDate);
        toDateObj.setHours(23, 59, 59, 999);
        if (expenseDate > toDateObj) return false;
      }

      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase();
        const matchesTitle = expense.expenseTitle?.toLowerCase().includes(searchLower);
        const matchesNotes = expense.notes?.toLowerCase().includes(searchLower);
        const matchesAmount = expense.amount?.toString().includes(searchLower);
        if (!matchesTitle && !matchesNotes && !matchesAmount) return false;
      }

      return true;
    });
  }, [expensesData, debouncedSearch, category, paymentMethod, fromDate, toDate]);

  return (
    <div className="flex flex-col gap-6 w-full h-full min-w-0">
      <ExpenditureHeader />
      <ExpenditureCards expensesData={expensesData} />
      <ExpenditureFilterBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />
      <ExpenditureTable
        filteredExpenses={filteredExpenses}
        isLoading={isLoading}
      />
    </div>
  );
}
