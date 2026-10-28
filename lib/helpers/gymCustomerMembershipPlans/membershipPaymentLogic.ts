import type { GymCustomerMembershipHistoryActionType } from './gymCustomerMembershipHistories';
import {
  parseDurationMonths,
  calculatePlanExpiryDate,
  calculatePlanStats,
  calculateUpgradePayable,
  getCalendarDaysDifference,
} from '@/lib/planCalculations';

export interface PlanTransitionInfo {
  actionType: GymCustomerMembershipHistoryActionType;
  previousPlanId: string | null;
  finalStartDate: string;
  finalEndDate: string;
  unusedCredit: number;
  daysCarriedOver: number;
  payableAmount: number;
}

export { parseDurationMonths };

export function getPlanRemainingDays(endDateStr: string | null | undefined): { remainingDays: number; isExpired: boolean } {
  if (!endDateStr) return { remainingDays: 0, isExpired: false };
  const diffDays = getCalendarDaysDifference(endDateStr, new Date());
  const isExpired = diffDays < 0;
  const remainingDays = Math.max(0, diffDays);
  return { remainingDays, isExpired };
}

export const calculateRemainingDays = (endDateStr?: string | null): number => {
  return getPlanRemainingDays(endDateStr).remainingDays;
};

export function calculatePlanUpgrade({
  currentPlanPrice,
  currentDurationMonths,
  remainingDays,
  isCurrentPlanActive,
  newPlanPrice,
}: {
  currentPlanPrice: number;
  currentDurationMonths: number | string;
  remainingDays: number;
  isCurrentPlanActive: boolean;
  newPlanPrice: number;
}) {
  const currentMonths = parseDurationMonths(currentDurationMonths);
  const totalStandardDays = Math.max(1, currentMonths * 30);
  const currentDailyRate = Number((currentPlanPrice / totalStandardDays).toFixed(2));
  if (!isCurrentPlanActive || currentPlanPrice <= 0 || remainingDays <= 0) {
    return {
      unusedCredit: 0,
      payableAmount: newPlanPrice,
      currentDailyRate: 0,
      isUpgrade: false,
    };
  }
  const rawCredit = (remainingDays / totalStandardDays) * currentPlanPrice;
  const unusedCredit = Math.min(currentPlanPrice, Math.max(0, Number(rawCredit.toFixed(2))));
  const payableAmount = Math.max(0, Number((newPlanPrice - unusedCredit).toFixed(2)));
  return {
    unusedCredit,
    payableAmount,
    currentDailyRate,
    isUpgrade: true,
  };
}

export function getMembershipStatus(plan: {
  startDate?: string | null;
  endDate?: string | null;
  is_Active?: boolean;
}) {
  const hasDates = Boolean(plan.startDate && plan.endDate);
  const { remainingDays, isExpired: isPastEndDate } = getPlanRemainingDays(plan.endDate);
  const isPending = !hasDates || (!plan.startDate && !plan.endDate);
  const isExpired = !isPending && (isPastEndDate || remainingDays <= 0);
  const isInactive = !isPending && !isExpired && plan.is_Active === false;
  const isActive = !isPending && !isExpired && !isInactive && remainingDays > 0;
  return {
    isPending,
    isExpired,
    isInactive,
    isActive,
    remainingDays,
  };
}

export interface UpgradeCalculationResult {
  isUpgrade: boolean;
  newPlanPrice: number;
  newPlanMonths: number;
  newDailyRate: number;
  currentDailyRate: number;
  remainingDays: number;
  unusedCredit: number;
  payableAmount: number;
}

export interface CurrentPlanCalculationInput {
  planId?: string | null;
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  is_Active?: boolean;
  isActive?: boolean;
  is_deleted?: boolean | null;
  customAmount?: number | null;
  paymentStatus?: string | null;
  plan?: {
    planId?: string;
    planName?: string;
    price?: number;
    durationMonths?: string | number | null;
  };
  price?: number;
  durationMonths?: string | number | null;
}

export interface SelectedNewPlanCalculationInput {
  planId?: string;
  planName?: string;
  price?: number;
  durationMonths?: string | number | null;
}

export function computeUpgradeCalculation(
  currentPlan: CurrentPlanCalculationInput | null | undefined,
  selectedNewPlan: SelectedNewPlanCalculationInput | null | undefined
): UpgradeCalculationResult | null {
  if (!selectedNewPlan) return null;
  const newPlanPrice = Number(selectedNewPlan.price || 0);
  const newPlanMonths = parseDurationMonths(selectedNewPlan.durationMonths);
  const newTotalDays = Math.max(1, newPlanMonths * 30);
  const newDailyRate = Number((newPlanPrice / newTotalDays).toFixed(2));
  const currentPlanPrice = Number(currentPlan?.plan?.price ?? currentPlan?.customAmount ?? currentPlan?.price ?? 0);
  const currentPlanMonths = parseDurationMonths(currentPlan?.plan?.durationMonths || currentPlan?.durationMonths || 1);

  const stats = calculatePlanStats({
    planPrice: currentPlanPrice,
    durationMonths: currentPlanMonths,
    startDate: currentPlan?.startDate,
    endDate: currentPlan?.endDate,
    isActive: (currentPlan?.is_Active ?? currentPlan?.isActive) !== false,
  });

  if (!stats.isPlanActive || currentPlanPrice <= 0) {
    return {
      isUpgrade: false,
      newPlanPrice,
      newPlanMonths,
      newDailyRate,
      currentDailyRate: 0,
      remainingDays: 0,
      unusedCredit: 0,
      payableAmount: newPlanPrice,
    };
  }

  const upgradePayable = calculateUpgradePayable({
    newPlanPrice,
    unusedCredit: stats.unusedCredit,
  });

  return {
    isUpgrade: true,
    newPlanPrice,
    newPlanMonths,
    newDailyRate,
    currentDailyRate: stats.dailyRate,
    remainingDays: stats.standardRemainingDays,
    unusedCredit: stats.unusedCredit,
    payableAmount: upgradePayable.payableAmount,
  };
}

export function toDateString(d: Date | string | null | undefined): string {
  if (!d) return new Date().toISOString().split('T')[0];
  if (typeof d === 'string') return d.includes('T') ? d.split('T')[0] : d;
  return d.toISOString().split('T')[0];
}

export function calculateEndDate(startDate: Date | string, durationMonths: number): string {
  return calculatePlanExpiryDate(startDate, durationMonths);
}

export function normalizePaymentMethod(method?: string | null): 'cash' | 'upi' | 'card' | 'netbanking' | 'other' {
  if (!method) return 'upi';
  const m = method.toLowerCase();
  if (m.includes('cash')) return 'cash';
  if (m.includes('card')) return 'card';
  if (m.includes('net') || m.includes('bank')) return 'netbanking';
  if (m.includes('upi') || m.includes('qr')) return 'upi';
  return 'other';
}

export function determinePlanActionAndProration({
  newPlan,
  existingCustomerPlan,
  previousHistory,
}: {
  newPlan: { planId: string; planName: string; price: number; durationMonths?: string | number | null };
  existingCustomerPlan: CurrentPlanCalculationInput | null;
  previousHistory?: CurrentPlanCalculationInput | null;
}): PlanTransitionInfo {
  const today = new Date();
  const todayStr = toDateString(today);
  const newDurationMonths = parseDurationMonths(newPlan.durationMonths);
  const newPlanPrice = Number(newPlan.price) || 0;

  const isPendingActivation =
    !existingCustomerPlan ||
    !existingCustomerPlan.startDate ||
    !existingCustomerPlan.endDate ||
    (!existingCustomerPlan.is_Active && !existingCustomerPlan.endDate);

  if (isPendingActivation) {
    if (previousHistory?.endDate) {
      const prevEnd = new Date(toDateString(previousHistory.endDate));
      const isPrevActive = previousHistory.paymentStatus === 'paid' && prevEnd.getTime() >= new Date(todayStr).getTime();
      if (isPrevActive) {
        const prevPrice = Number(previousHistory.plan?.price ?? previousHistory.customAmount ?? 0);
        if (newPlanPrice < prevPrice) {
          throw new Error("Plan downgrade is not permitted. Only upgrades to higher-priced plans are allowed.");
        }
        const calc = computeUpgradeCalculation(previousHistory, newPlan);
        const unusedCredit = calc?.unusedCredit ?? 0;
        const remainingDays = calc?.remainingDays ?? 0;
        const payableAmount = calc?.payableAmount ?? newPlanPrice;
        return {
          actionType: 'UPGRADED', previousPlanId: previousHistory.planId || null, finalStartDate: todayStr,
          finalEndDate: calculateEndDate(today, newDurationMonths), unusedCredit, daysCarriedOver: remainingDays, payableAmount,
        };
      }
      return {
        actionType: 'RENEWED', previousPlanId: previousHistory.planId || null, finalStartDate: todayStr,
        finalEndDate: calculateEndDate(today, newDurationMonths), unusedCredit: 0, daysCarriedOver: 0, payableAmount: newPlanPrice,
      };
    }
    return {
      actionType: 'ASSIGNED', previousPlanId: null, finalStartDate: todayStr,
      finalEndDate: calculateEndDate(today, newDurationMonths), unusedCredit: 0, daysCarriedOver: 0, payableAmount: newPlanPrice,
    };
  }

  const existingEndDateStr = toDateString(existingCustomerPlan.endDate);
  const existingEndDate = new Date(existingEndDateStr);
  const isExistingActive =
    existingCustomerPlan.is_Active !== false &&
    !existingCustomerPlan.is_deleted &&
    Boolean(existingCustomerPlan.endDate) &&
    existingEndDate.getTime() >= new Date(todayStr).getTime();

  if (!isExistingActive) {
    return {
      actionType: 'RENEWED', previousPlanId: existingCustomerPlan.planId || null, finalStartDate: todayStr,
      finalEndDate: calculateEndDate(today, newDurationMonths), unusedCredit: 0, daysCarriedOver: 0, payableAmount: newPlanPrice,
    };
  }

  if (existingCustomerPlan.planId === newPlan.planId) {
    return {
      actionType: 'EXTENDED', previousPlanId: existingCustomerPlan.planId || null, finalStartDate: existingEndDateStr,
      finalEndDate: calculateEndDate(existingEndDate, newDurationMonths), unusedCredit: 0, daysCarriedOver: 0, payableAmount: newPlanPrice,
    };
  }

  const currentPlanPrice = Number(existingCustomerPlan.plan?.price ?? existingCustomerPlan.customAmount ?? 0);
  if (newPlanPrice < currentPlanPrice) {
    throw new Error("Plan downgrade is not permitted. Only upgrades to higher-priced plans are allowed.");
  }
  const calc = computeUpgradeCalculation(existingCustomerPlan, newPlan);
  const unusedCredit = calc?.unusedCredit ?? 0;
  const remainingDays = calc?.remainingDays ?? 0;
  const payableAmount = calc?.payableAmount ?? newPlanPrice;

  return {
    actionType: 'UPGRADED', previousPlanId: existingCustomerPlan.planId || null, finalStartDate: todayStr,
    finalEndDate: calculateEndDate(today, newDurationMonths), unusedCredit, daysCarriedOver: remainingDays, payableAmount,
  };
}

export {
  executeMembershipPaymentSuccess,
  type ExecuteMembershipPaymentSuccessParams,
} from './executeMembershipPaymentSuccess';
