"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, ArrowRight } from "@phosphor-icons/react";
import LandingConsultationModal from "./LandingConsultationModal";
import { getAllPlansGroupedAction } from "@/app/actions/subscriptions";
import { DynamicSubscriptionPlan } from "@/lib/helpers/subscriptions/subscriptionsHelper";
import {
  DEFAULT_GYM_PLANS,
  DEFAULT_CUSTOMER_PLANS,
  getPlanVisual,
} from "@/lib/constants/landingPlans";

export default function LandingRolePlans() {
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<{ id: string | null; name: string } | null>(null);
  const [gymPlans, setGymPlans] = useState<DynamicSubscriptionPlan[]>(DEFAULT_GYM_PLANS);
  const [customerPlans, setCustomerPlans] = useState<DynamicSubscriptionPlan[]>(DEFAULT_CUSTOMER_PLANS);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPlans() {
      try {
        const res = await getAllPlansGroupedAction();
        if (res.success) {
          if (res.gymPlans && res.gymPlans.length > 0) {
            setGymPlans(res.gymPlans);
          }
          if (res.customerPlans && res.customerPlans.length > 0) {
            setCustomerPlans(res.customerPlans);
          }
        }
      } catch (err) {
        console.error("Failed to load plans:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadPlans();
  }, []);

  const renderPlanCard = (plan: DynamicSubscriptionPlan, category: "Gym" | "Customer", index: number) => {
    const visual = getPlanVisual(plan.name, index);
    const Icon = visual.icon;

    return (
      <div
        key={`${category}-${plan.id || plan.name}-${index}`}
        className="h-[390px] sm:h-[410px] rounded-2xl bg-[#121319] border border-white/10 hover:border-[#D4FF32]/50 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-[0_0_25px_rgba(212,255,50,0.08)] group"
      >
        <div className="flex items-center justify-between gap-2 pb-2 shrink-0 border-b border-white/[0.06]">
          <h4 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#D4FF32] transition-colors truncate">
            {plan.name}
          </h4>
          <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0">
            <Icon size={20} weight="fill" className={visual.iconColor} />
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-themed my-3 pr-1.5">
          <ul className="space-y-3">
            {plan.features.map((feat, fIdx) => (
              <li key={`${feat}-${fIdx}`} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#CBD5E1] leading-snug">
                <Check size={16} weight="bold" className="text-[#D4FF32] shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-white/[0.08] shrink-0">
          {category === "Customer" ? (
            <Link
              href="/login"
              className="w-full h-11 rounded-xl bg-[#D4FF32] hover:bg-[#C2EF2B] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(212,255,50,0.18)] active:scale-[0.98]"
            >
              Login
              <ArrowRight size={15} weight="bold" />
            </Link>
          ) : (
            <button
              type="button"
              onClick={() =>
                setSelectedPlanForModal({
                  id: plan.id && plan.id.startsWith("default-") ? null : plan.id,
                  name: `${category} - ${plan.name} Plan`,
                })
              }
              className="w-full h-11 rounded-xl bg-[#D4FF32] hover:bg-[#C2EF2B] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(212,255,50,0.18)] active:scale-[0.98] cursor-pointer"
            >
              Request For Demo
              <ArrowRight size={15} weight="bold" />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full mt-12 pt-10 border-t border-white/10">
      <div className="mb-14">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-black uppercase tracking-widest text-[#D4FF32]">
                Gym Plans [ B2B ]
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
              Complete operations, staff coordination, and revenue systems for fitness centers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {gymPlans.map((plan, idx) => renderPlanCard(plan, "Gym", idx))}
        </div>
      </div>

      <div>
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-black uppercase tracking-widest text-[#D4FF32]">
                Customer Plans [ B2C ]
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
              Tailored workout routines, personalized nutrition diet plans, and progress tracking
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {customerPlans.map((plan, idx) => renderPlanCard(plan, "Customer", idx))}
        </div>
      </div>

      <LandingConsultationModal
        isOpen={!!selectedPlanForModal}
        onClose={() => setSelectedPlanForModal(null)}
        selectedRole={selectedPlanForModal?.name || "Gym Owner"}
        subscriptionPlanId={selectedPlanForModal?.id || null}
      />
    </div>
  );
}
