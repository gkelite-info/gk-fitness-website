import { Lock, Check, Sparkle } from "@phosphor-icons/react";

export interface PlanOption {
  planId: string;
  planName: string;
  durationMonths: number;
  price: number;
}

interface PlanSelectionGridProps {
  plans: PlanOption[];
  selectedPlanId: string | null;
  onSelectPlan: (planId: string) => void;
  isCurrentPlanActive: boolean;
  currentPlanId?: string;
  currentPlanPrice: number;
  hasPendingUpgrade: boolean;
  pendingPlanId?: string | null;
  isLoadingPlans: boolean;
}

export function PlanSelectionGrid({
  plans,
  selectedPlanId,
  onSelectPlan,
  isCurrentPlanActive,
  currentPlanId,
  currentPlanPrice,
  hasPendingUpgrade,
  pendingPlanId,
  isLoadingPlans,
}: PlanSelectionGridProps) {
  if (isLoadingPlans) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="w-6 h-6 border-2 border-[#D2F829] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (plans.length === 0) {
    return (
      <p className="text-[#9CA3AF] text-xs py-4 text-center">
        No available membership plans found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {plans.map((plan) => {
        const isCurrent = isCurrentPlanActive && plan.planId === currentPlanId;
        const isPendingUpgradePlan = Boolean(hasPendingUpgrade && plan.planId === pendingPlanId);
        const isLowerPrice = isCurrentPlanActive && Number(plan.price) < currentPlanPrice;
        const isBlocked = isCurrent || isLowerPrice || hasPendingUpgrade;
        const isSelected = !hasPendingUpgrade && selectedPlanId === plan.planId;

        return (
          <button
            key={plan.planId}
            type="button"
            disabled={isBlocked}
            onClick={() => onSelectPlan(plan.planId)}
            className={`text-left p-3.5 rounded-2xl border transition-all relative ${
              isBlocked
                ? "bg-[#141A24]/40 border-[#1F2937] opacity-40 cursor-not-allowed"
                : isSelected
                  ? "bg-[#1E2718] border-[#D2F829] shadow-md shadow-[#D2F829]/10 cursor-pointer"
                  : "bg-[#151B26] border-[#232F42] hover:border-[#374151] cursor-pointer"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-white text-sm font-bold">{plan.planName}</h4>
                <span className="text-xs text-[#9CA3AF]">{plan.durationMonths} Months</span>
              </div>
              {isCurrent ? (
                <div className="flex items-center gap-1 text-[10px] text-[#9CA3AF] bg-[#1F2937] px-2 py-0.5 rounded-md font-semibold">
                  <Lock size={11} />
                  <span>CURRENT</span>
                </div>
              ) : isPendingUpgradePlan ? (
                <div className="flex items-center gap-1 text-[10px] text-[#F59E0B] bg-[#2A1E14] border border-[#593817] px-2 py-0.5 rounded-md font-semibold">
                  <Lock size={11} />
                  <span>UPGRADE PENDING</span>
                </div>
              ) : hasPendingUpgrade ? (
                <div className="flex items-center gap-1 text-[10px] text-[#9CA3AF] bg-[#1F2937] px-2 py-0.5 rounded-md font-semibold">
                  <Lock size={11} />
                  <span>LOCKED</span>
                </div>
              ) : isLowerPrice ? (
                <div className="flex items-center gap-1 text-[10px] text-[#EF4444] bg-[#2F1B1E] border border-[#482025] px-2 py-0.5 rounded-md font-semibold">
                  <Lock size={11} />
                  <span>LOWER TIER</span>
                </div>
              ) : isSelected ? (
                <div className="w-5 h-5 rounded-full bg-[#D2F829] flex items-center justify-center text-black">
                  <Check size={12} weight="bold" />
                </div>
              ) : null}
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-base font-extrabold text-white">₹{plan.price}</span>
              {isCurrentPlanActive && Number(plan.price) >= currentPlanPrice && !isCurrent && (
                <span className="text-[10px] text-[#D2F829] flex items-center gap-0.5 font-bold">
                  <Sparkle size={11} weight="fill" /> UPGRADE
                </span>
              )}
              {hasPendingUpgrade ? (
                <span className="text-[10px] text-amber-400">Revoke pending upgrade first</span>
              ) : isLowerPrice ? (
                <span className="text-[10px] text-[#9CA3AF]">Downgrades N/A</span>
              ) : null}
            </div>
          </button>
        );
      })}
    </div>
  );
}

