"use client";

import { useRouter } from "next/navigation";
import RecentPurchasesHeader from "./RecentPurchasesHeader";
import RecentPurchasesTable from "./RecentPurchasesTable";

export default function RecentPurchasesDetailView() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-[1600px] mx-auto overflow-x-hidden min-w-0">
      <RecentPurchasesHeader onBack={() => router.back()} />
      <RecentPurchasesTable />
    </div>
  );
}
