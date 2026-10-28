"use client";

import { useMemo } from "react";
import { calculatePlanStats, calculateUpgradePayable } from "@/lib/planCalculations";

export interface ActiveMembershipPlanInput {
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  is_Active?: boolean;
  isActive?: boolean;
  customAmount?: number | null;
  plan?: {
    price?: number;
    durationMonths?: string | number | null;
  };
  durationMonths?: string | number | null;
  price?: number;
}

export interface SelectedNewPlanInput {
  price?: number;
  durationMonths?: string | number | null;
}

export function useCustomerMembershipCalculation(
  activePlan: ActiveMembershipPlanInput | null | undefined,
  selectedNewPlan?: SelectedNewPlanInput | null
) {
  const planStats = useMemo(() => {
    if (!activePlan) return null;

    const price = Number(activePlan.plan?.price ?? activePlan.customAmount ?? activePlan.price ?? 0);
    const duration = activePlan.plan?.durationMonths || activePlan.durationMonths || 1;
    return calculatePlanStats({
      planPrice: price,
      durationMonths: duration,
      startDate: activePlan.startDate,
      endDate: activePlan.endDate,
      isActive: (activePlan.is_Active ?? activePlan.isActive) !== false,
    });
  }, [activePlan]);

  const upgradeInfo = useMemo(() => {
    if (!planStats || !selectedNewPlan) return null;
    return calculateUpgradePayable({
      newPlanPrice: Number(selectedNewPlan.price || 0),
      unusedCredit: planStats.unusedCredit,
    });
  }, [planStats, selectedNewPlan]);

  return { planStats, upgradeInfo };
}
