"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FinanceHeaderTabs from "./FinanceHeaderTabs";
import PayoutCategoryPills from "./PayoutCategoryPills";
import PayoutKpiCards from "./PayoutKpiCards";
import GymOwnerPayoutsTable from "./GymOwnerPayoutsTable";
import GlobalTrainerPayoutsTable from "./GlobalTrainerPayoutsTable";
import {
  GYM_OWNER_PAYOUTS,
  GLOBAL_TRAINER_PAYOUTS,
  GYM_OWNER_KPI,
  GLOBAL_TRAINER_KPI,
} from "./payoutMockData";
import { GymOwnerPayout, GlobalTrainerPayout } from "./types";

interface SuperAdminPayoutsViewProps {
  onSelectGymOwnerPayout: (payout: GymOwnerPayout) => void;
  onSelectTrainerPayout: (payout: GlobalTrainerPayout) => void;
}

export default function SuperAdminPayoutsView({
  onSelectGymOwnerPayout,
  onSelectTrainerPayout,
}: SuperAdminPayoutsViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const subtabParam = searchParams.get("subtab");
  const selectedSubTab: "gym-owners" | "global-trainers" =
    subtabParam === "global-trainers" ? "global-trainers" : "gym-owners";

  const handleSelectSubTab = (tab: "gym-owners" | "global-trainers") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", "payouts");
    params.set("subtab", tab);
    params.delete("id");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const isGymOwners = selectedSubTab === "gym-owners";
  const currentKpis = isGymOwners ? GYM_OWNER_KPI : GLOBAL_TRAINER_KPI;

  return (
    <div className="flex flex-col gap-6 sm:gap-7 w-full">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Finance
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8]">
          Manage payouts for gym owners and global trainers.
        </p>
      </div>

      <FinanceHeaderTabs />

      <PayoutCategoryPills
        selectedSubTab={selectedSubTab}
        onSelectSubTab={handleSelectSubTab}
      />

      <PayoutKpiCards
        totalPayable={currentKpis.totalPayable}
        totalPayableSub={currentKpis.totalPayableSub}
        paid={currentKpis.paid}
        paidSub={currentKpis.paidSub}
        pending={currentKpis.pending}
        pendingSub={currentKpis.pendingSub}
        variant={isGymOwners ? "gym" : "trainer"}
      />


      {isGymOwners ? (
        <GymOwnerPayoutsTable
          payouts={GYM_OWNER_PAYOUTS}
          onViewDetails={onSelectGymOwnerPayout}
        />
      ) : (
        <GlobalTrainerPayoutsTable
          payouts={GLOBAL_TRAINER_PAYOUTS}
          onViewDetails={onSelectTrainerPayout}
        />
      )}
    </div>
  );
}
