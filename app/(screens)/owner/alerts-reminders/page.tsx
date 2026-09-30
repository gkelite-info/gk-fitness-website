"use client";

import AlertsHeader from "./_components/AlertsHeader";
import AlertsFilterBar from "./_components/AlertsFilterBar";
import AlertsTable from "./_components/AlertsTable";

export default function AlertsRemindersPage() {
  return (
    <div className="flex flex-col items-start px-4 sm:px-8 py-6 pb-12 gap-5 w-full max-w-[1024px] mx-auto">
      <AlertsHeader />
      <AlertsFilterBar />
      <AlertsTable />
    </div>
  );
}
