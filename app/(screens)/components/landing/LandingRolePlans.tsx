"use client";

import { useState } from "react";
import { 
  Check, 
  ArrowRight,
  Sparkle,
  Medal,
  Crown,
  SketchLogo,
  Star,
  ShieldCheck,
  Trophy,
  Diamond
} from "@phosphor-icons/react";
import LandingConsultationModal from "./LandingConsultationModal";

export default function LandingRolePlans() {
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<string | null>(null);

  const gymPlans = [
    {
      name: "Basic",
      icon: Sparkle,
      iconColor: "text-[#D4FF32]",
      features: [
        "Customer Management",
        "Attendance Tracking",
        "Basic Reports",
        "Member App Access",
        "Standard Support",
      ],
    },
    {
      name: "Silver",
      icon: Medal,
      iconColor: "text-blue-400",
      features: [
        "Everything in Basic",
        "Biometric & QR Management",
        "Inventory Management",
        "Multiple Owner Login",
        "Advanced Reports",
      ],
    },
    {
      name: "Gold",
      icon: Crown,
      iconColor: "text-amber-400",
      features: [
        "Everything in Silver",
        "Own Gym Branding",
        "Multiple Owner Login",
        "Advanced Analytics",
        "Priority Support",
      ],
    },
    {
      name: "Platinum",
      icon: SketchLogo,
      iconColor: "text-purple-400",
      features: [
        "Everything in Gold",
        "Advanced Analytics",
        "Premium Support",
        "Dedicated Account Support",
        "All Premium Features",
      ],
    },
  ];

  const customerPlans = [
    {
      name: "Basic",
      icon: Sparkle,
      iconColor: "text-[#D4FF32]",
      features: [
        "Personalized Workout Plans",
        "Attendance & QR Check-in",
        "Water & Hydration Tracker",
        "Community Access",
        "Standard Member Support",
      ],
    },
    {
      name: "Silver",
      icon: Medal,
      iconColor: "text-blue-400",
      features: [
        "Everything in Basic",
        "Personalized Nutrition & Diet Plans",
        "Healthy Recipe Library Access",
        "Weekly Workout Split Schedules",
        "Trainer Guidance & Form Tips",
      ],
    },
    {
      name: "Gold",
      icon: Crown,
      iconColor: "text-amber-400",
      features: [
        "Everything in Silver",
        "1-on-1 PT Session Booking",
        "Body Transformation & Progress Photos",
        "Dynamic Macro & Calorie Tracking",
        "Priority Trainer Assistance",
      ],
    },
    {
      name: "Platinum",
      icon: SketchLogo,
      iconColor: "text-purple-400",
      features: [
        "Everything in Gold",
        "Dedicated Personal Fitness Coach",
        "Custom Monthly Diet Consultations",
        "VIP Priority Floor Access",
        "All Premium Features Included",
      ],
    },
  ];

  const renderPlanCard = (plan: typeof gymPlans[0], category: "Gym" | "Customer") => {
    const Icon = plan.icon;
    return (
      <div
        key={`${category}-${plan.name}`}
        className="rounded-2xl bg-[#121319] border border-white/10 hover:border-[#D4FF32]/50 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-xl hover:shadow-[0_0_25px_rgba(212,255,50,0.08)] group"
      >
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <h4 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#D4FF32] transition-colors">
              {plan.name}
            </h4>
            <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0">
              <Icon size={20} weight="fill" className={plan.iconColor} />
            </div>
          </div>

          <ul className="space-y-3 mt-5 mb-6">
            {plan.features.map((feat) => (
              <li key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#CBD5E1] leading-snug">
                <Check size={16} weight="bold" className="text-[#D4FF32] shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-white/[0.08]">
          <button
            type="button"
            onClick={() => setSelectedPlanForModal(`${category} - ${plan.name} Plan`)}
            className="w-full h-11 rounded-xl bg-[#D4FF32] hover:bg-[#C2EF2B] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(212,255,50,0.18)] active:scale-[0.98] cursor-pointer"
          >
            Request For Demo
            <ArrowRight size={15} weight="bold" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full mt-12 pt-10 border-t border-white/10">
      <div className="mb-14">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <span className="text-sm sm:text-base font-black uppercase tracking-widest text-[#D4FF32] block">
              Gym Plans
            </span>
            <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
              Complete operations, staff coordination, and revenue systems for fitness centers
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {gymPlans.map((plan) => renderPlanCard(plan, "Gym"))}
        </div>
      </div>

      <div>
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <span className="text-sm sm:text-base font-black uppercase tracking-widest text-[#D4FF32] block">
              Customers Plans
            </span>
            <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
              Tailored workout routines, personalized nutrition diet plans, and progress tracking
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {customerPlans.map((plan) => renderPlanCard(plan, "Customer"))}
        </div>
      </div>

      <LandingConsultationModal
        isOpen={!!selectedPlanForModal}
        onClose={() => setSelectedPlanForModal(null)}
        selectedRole={selectedPlanForModal || "Gym Owner"}
      />
    </div>
  );
}
