"use client";

import { useRouter } from "next/navigation";
import GymPayoutsHeader from "./GymPayoutsHeader";
import GymPayoutsList from "./GymPayoutsList";

export default function GymPayoutsView() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-[1600px] mx-auto overflow-x-hidden min-w-0">
      <GymPayoutsHeader onBack={() => router.back()} />
      <GymPayoutsList />
    </div>
  );
}
