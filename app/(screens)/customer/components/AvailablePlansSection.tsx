"use client";

import { Crown, Star, Diamond, CheckCircle, CaretRight, Lock } from "@phosphor-icons/react";
import { computeUpgradeCalculation } from "@/lib/helpers/gymCustomerMembershipPlans/membershipPaymentLogic";

interface Plan {
  planId: string;
  planName: string;
  durationMonths: number;
  price: number;
}

interface AvailablePlansSectionProps {
  currentPlan?: any;
  plans: Plan[];
  isLoading: boolean;
  onRenew: (planId: string, planName: string, amount?: number, isAutoPay?: boolean) => void;
  renewingPlanId: string | null;
  isCurrentActive?: boolean;
  isPendingActivation?: boolean;
  remainingDays?: number;
  isAutoPay?: boolean;
}

export default function AvailablePlansSection({
  currentPlan,
  plans,
  isLoading,
  onRenew,
  renewingPlanId,
  isCurrentActive = false,
  isPendingActivation = false,
  remainingDays = 0,
  isAutoPay = true,
}: AvailablePlansSectionProps) {
  if (currentPlan?.pendingPlanId || (plans.length === 0 && !isLoading)) {
    return null;
  }

  const currentPrice = Number(currentPlan?.plan?.price ?? currentPlan?.customAmount ?? currentPlan?.price ?? 0);
  const sectionTitle = isPendingActivation || !currentPlan
    ? "AVAILABLE MEMBERSHIP PLANS"
    : isCurrentActive
    ? "UPGRADE TO HIGHER TIER PLANS"
    : "OTHER AVAILABLE PLANS";

  return (
    <div>
      <span className="text-[#8E8E93] text-[10px] font-bold tracking-widest uppercase block mb-3">
        {sectionTitle}
      </span>

      {isLoading ? (
        <div className="py-8 flex justify-center items-center">
          <div className="w-8 h-8 border-2 border-[#D7FF00] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : plans.length === 0 ? (
        <div className="bg-[#1C1C1E] rounded-2xl sm:rounded-3xl p-5 mb-4 border border-[#27272A] text-center">
          <p className="text-[#8E8E93] text-xs">
            No membership plans are currently available.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {plans.map((plan, index) => {
            const isFirst = index % 2 === 0;
            const isRenewingThis = renewingPlanId === plan.planId;
            const iconBg = isFirst ? "bg-[#374151]" : "bg-[#6D28D9]";
            const checkColor = isFirst ? "#D7FF00" : "#A78BFA";
            const planPrice = Number(plan.price || 0);
            const calc = computeUpgradeCalculation(currentPlan, plan);
            const isUpgradeWithCredit = Boolean(calc?.isUpgrade && calc.unusedCredit > 0);
            const payableAmount = isUpgradeWithCredit && calc ? calc.payableAmount : planPrice;

            const isHigherPrice = planPrice > currentPrice;
            const isEligibleUpgrade = isCurrentActive && isHigherPrice;
            const isDowngradeLocked = isCurrentActive && !isHigherPrice;

            const isPlanDisabled = Boolean(
              isPendingActivation ||
              isDowngradeLocked ||
              isRenewingThis
            );

            return (
              <div
                key={plan.planId}
                className="bg-[#1C1C1E] rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-[#27272A] hover:border-[#38383B] transition-colors"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${iconBg} flex items-center justify-center mr-3 sm:mr-4 shrink-0 shadow-md`}>
                    <Crown size={24} color="#FFFFFF" weight="regular" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-white text-base sm:text-lg font-semibold truncate">{plan.planName}</span>
                      {isEligibleUpgrade && (
                        <span className="bg-[#D7FF00]/15 border border-[#D7FF00]/30 text-[#D7FF00] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                          Upgrade Tier
                        </span>
                      )}
                      {isDowngradeLocked && (
                        <span className="bg-[#27272A] border border-[#38383B] text-[#8E8E93] text-[9px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 flex items-center gap-1">
                          <Lock size={10} /> Locked
                        </span>
                      )}
                      {!isCurrentActive && (
                        isFirst ? (
                          <Star size={16} color="#EAB308" weight="fill" className="shrink-0" />
                        ) : (
                          <Diamond size={16} color="#A78BFA" weight="regular" className="shrink-0" />
                        )
                      )}
                    </div>
                    <div className="flex items-baseline mt-0.5 gap-1.5 flex-wrap">
                      <span className="text-white text-sm sm:text-base font-semibold">₹{plan.price}</span>
                      <span className="text-[#8E8E93] text-[11px] font-medium">+ GST (0%)</span>
                      <span className="text-[#8E8E93] text-xs">
                        / {plan.durationMonths} Month{plan.durationMonths > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle size={16} color={checkColor} weight="regular" className="shrink-0" />
                    <span className="text-white text-xs">Full Access to Gym Facility & Equipment</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle size={16} color={checkColor} weight="regular" className="shrink-0" />
                    <span className="text-white text-xs">
                      {plan.durationMonths} Month{plan.durationMonths > 1 ? "s" : ""} Gym Membership Validity
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle size={16} color={checkColor} weight="regular" className="shrink-0" />
                    <span className="text-white text-xs">Locker & Shower Facilities</span>
                  </div>
                </div>

                {isEligibleUpgrade && isUpgradeWithCredit && calc && (
                  <div className="bg-[#141414] border border-[#27272A] rounded-2xl p-3.5 mb-4 space-y-1.5">
                    <div className="flex justify-between text-xs text-[#8E8E93]">
                      <span>New Plan Price</span>
                      <span className="text-white font-medium">₹{calc.newPlanPrice}</span>
                    </div>
                    <div className="flex justify-between text-xs text-[#D7FF00]">
                      <span>Credit from Current Plan ({calc.remainingDays} days left)</span>
                      <span className="font-semibold">-₹{calc.unusedCredit}</span>
                    </div>
                    <div className="border-t border-[#222222] pt-1.5 flex justify-between items-baseline">
                      <span className="text-xs font-semibold text-white">Net Amount to Pay</span>
                      <span className="text-base font-bold text-[#D7FF00]">₹{calc.payableAmount}</span>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => {
                    if (isPlanDisabled) return;
                    onRenew(
                      plan.planId,
                      plan.planName,
                      isEligibleUpgrade && isUpgradeWithCredit ? payableAmount : planPrice,
                      true
                    );
                  }}
                  disabled={isPlanDisabled}
                  className={`w-full py-3.5 px-4 sm:px-5 rounded-2xl flex items-center justify-center transition-all min-h-[46px] touch-manipulation ${
                    isPlanDisabled
                      ? "bg-[#27272A] text-[#8E8E93] cursor-not-allowed opacity-60"
                      : "bg-[#D7FF00] hover:bg-[#cbf200] text-black active:scale-[0.99] active:opacity-90 cursor-pointer shadow-lg shadow-[#D7FF00]/10"
                  }`}
                >
                  {isRenewingThis ? (
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  ) : isPendingActivation ? (
                    <span className="text-xs font-bold tracking-wider uppercase">
                      Activate Assigned Plan First
                    </span>
                  ) : isDowngradeLocked ? (
                    <span className="text-xs font-bold tracking-wider uppercase text-center">
                      Plan Active {remainingDays > 0 ? `(${remainingDays} Days Left)` : ""}
                    </span>
                  ) : isEligibleUpgrade ? (
                    <>
                      <span className="text-xs font-bold tracking-wider mr-1 uppercase">
                        Upgrade Plan (₹{payableAmount})
                      </span>
                      <CaretRight size={15} color="#000000" weight="bold" />
                    </>
                  ) : (
                    <>
                      <span className="text-xs font-bold tracking-wider mr-1 uppercase">
                        Choose Plan (₹{payableAmount})
                      </span>
                      <CaretRight size={15} color="#000000" weight="bold" />
                    </>
                  )}
                </button>
                {isDowngradeLocked && (
                  <p className="text-[11px] text-[#8E8E93] text-center mt-2">
                    Available after your current plan expires
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
