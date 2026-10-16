"use client";

import { useRouter } from "next/navigation";
import GymPayoutDetailsHeader from "./GymPayoutDetailsHeader";
import GymPayoutDetailsBanner from "./GymPayoutDetailsBanner";
import GymPayoutDetailsKpis from "./GymPayoutDetailsKpis";
import GymPayoutHistoryTable from "./GymPayoutHistoryTable";
import { mockPayoutDetailsMap, defaultPayoutDetails } from "./payoutDetailsData";

interface GymPayoutDetailsViewProps {
  gymId?: string;
}

export default function GymPayoutDetailsView({
  gymId = "1",
}: GymPayoutDetailsViewProps) {
  const router = useRouter();
  const data = mockPayoutDetailsMap[gymId] || defaultPayoutDetails;

  return (
    <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-[1600px] mx-auto overflow-x-hidden min-w-0">
      <GymPayoutDetailsHeader onBack={() => router.back()} />
      <GymPayoutDetailsBanner data={data} />
      <GymPayoutDetailsKpis data={data} />
      <GymPayoutHistoryTable history={data.history} />
    </div>
  );
}
