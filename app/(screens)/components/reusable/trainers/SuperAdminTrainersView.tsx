"use client";

import { useRouter, useSearchParams } from "next/navigation";
import TrainersPillNav from "./TrainersPillNav";
import GlobalTrainersView from "./GlobalTrainersView";
import GymTrainersView from "./GymTrainersView";
import { TrainerTab } from "./types";

export default function SuperAdminTrainersView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentTab: TrainerTab =
    searchParams.get("tab") === "gym" ? "gym" : "global";

  const handleTabChange = (tab: TrainerTab) => {
    router.push(`/superadmin/trainers?tab=${tab}`);
  };

  return (
    <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-full overflow-x-hidden min-w-0">
      <TrainersPillNav
        activeTab={currentTab}
        onTabChange={handleTabChange}
      />

      {currentTab === "global" ? (
        <GlobalTrainersView />
      ) : (
        <GymTrainersView />
      )}
    </div>
  );
}
