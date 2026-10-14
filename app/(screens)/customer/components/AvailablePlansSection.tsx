"use client";

import { Crown, Star, Diamond, CheckCircle, CaretRight } from "@phosphor-icons/react";

interface Plan {
  planId: string;
  planName: string;
  durationMonths: number;
  price: number;
}

interface AvailablePlansSectionProps {
  plans: Plan[];
  isLoading: boolean;
  onRenew: (planId: string, planName: string) => void;
  renewingPlanId: string | null;
}

export default function AvailablePlansSection({
  plans,
  isLoading,
  onRenew,
  renewingPlanId,
}: AvailablePlansSectionProps) {
  return (
    <div>
      <span className="text-[#8E8E93] text-[10px] font-bold tracking-widest uppercase block mb-3">
        OTHER AVAILABLE PLANS
      </span>

      {isLoading ? (
        <div className="py-8 flex justify-center items-center">
          <div className="w-8 h-8 border-2 border-[#D7FF00] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : plans.length === 0 ? (
        <div className="bg-[#1C1C1E] rounded-3xl p-5 mb-4 border border-[#27272A] text-center">
          <p className="text-[#8E8E93] text-xs">
            No other gym plans are currently available. You can renew your current plan above.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {plans.map((plan, index) => {
            const isFirst = index % 2 === 0;
            const isRenewingThis = renewingPlanId === plan.planId;
            const iconBg = isFirst ? "bg-[#374151]" : "bg-[#6D28D9]";
            const checkColor = isFirst ? "#D7FF00" : "#A78BFA";

            return (
              <div
                key={plan.planId}
                className="bg-[#1C1C1E] rounded-3xl p-5 border border-[#27272A] hover:border-[#38383B] transition-colors"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center mr-4 shrink-0`}>
                    <Crown size={28} color="#FFFFFF" weight="regular" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-white text-lg font-semibold truncate">{plan.planName}</span>
                      {isFirst ? (
                        <Star size={16} color="#EAB308" weight="fill" className="shrink-0" />
                      ) : (
                        <Diamond size={16} color="#A78BFA" weight="regular" className="shrink-0" />
                      )}
                    </div>
                    <div className="flex items-baseline mt-0.5">
                      <span className="text-white text-base font-semibold">₹{plan.price}</span>
                      <span className="text-[#8E8E93] text-xs ml-1">
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

                <button
                  onClick={() => onRenew(plan.planId, plan.planName)}
                  disabled={isRenewingThis}
                  className="w-full bg-[#D7FF00] hover:bg-[#cbf200] py-3.5 px-5 rounded-2xl flex items-center justify-center transition-all active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                >
                  {isRenewingThis ? (
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span className="text-black text-xs font-bold tracking-wider mr-1 uppercase">
                        RENEW PLAN
                      </span>
                      <CaretRight size={15} color="#000000" weight="bold" />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
