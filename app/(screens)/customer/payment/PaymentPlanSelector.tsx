"use client";

import { Check, CircleNotch } from "@phosphor-icons/react";

interface Plan {
  planId: string;
  planName: string;
  durationMonths: number;
  price: number;
}

interface PaymentPlanSelectorProps {
  plans: Plan[];
  selectedPlanId: string | null;
  isLoading: boolean;
  onSelectPlan: (planId: string) => void;
}

export default function PaymentPlanSelector({
  plans,
  selectedPlanId,
  isLoading,
  onSelectPlan,
}: PaymentPlanSelectorProps) {
  return (
    <div className="mb-6">
      <label className="text-white text-xs font-bold uppercase tracking-wider block mb-3">
        Select Membership Plan
      </label>

      {isLoading ? (
        <div className="flex items-center justify-center p-8 bg-[#141414] border border-[#222222] rounded-2xl">
          <CircleNotch size={24} className="animate-spin text-[#D7FF00]" />
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {plans.map((plan) => {
            const isSelected = selectedPlanId === plan.planId;
            return (
              <div
                key={plan.planId}
                onClick={() => onSelectPlan(plan.planId)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? "bg-[#181D12] border-[#D7FF00] shadow-[0_0_15px_rgba(215,255,0,0.1)]"
                    : "bg-[#141414] border-[#222222] hover:border-[#333333]"
                }`}
              >
                <div>
                  <h3 className="text-white text-sm font-bold">{plan.planName}</h3>
                  <p className="text-[#8E8E93] text-xs mt-0.5">
                    {plan.durationMonths} Month{plan.durationMonths > 1 ? "s" : ""} Validity
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[#D7FF00] font-bold text-base">
                    ₹{plan.price}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? "bg-[#D7FF00] border-[#D7FF00]"
                        : "border-[#444444]"
                    }`}
                  >
                    {isSelected && <Check size={12} weight="bold" className="text-black" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
