"use client";

import Image from "next/image";
import { TrendUp, Clock, ShieldCheck, UserCheck, ArrowRight } from "@phosphor-icons/react";

interface LandingGrowthMetricsProps {
  onOpenConsultation: () => void;
}

export default function LandingGrowthMetrics({ onOpenConsultation }: LandingGrowthMetricsProps) {
  const metrics = [
    {
      icon: TrendUp,
      value: "+38%",
      label: "Higher Renewal Rate",
      description: "Automated WhatsApp payment alerts and expiry notifications stop members from quietly lapsing.",
    },
    {
      icon: ShieldCheck,
      value: "100%",
      label: "Zero-Proxy Entry",
      description: "Hardware-enforced biometric authorization ensures only members with valid dues enter the facility.",
    },
    {
      icon: Clock,
      value: "15+ Hrs",
      label: "Admin Time Saved Weekly",
      description: "Replaces manual registers, receipts, and phone follow-ups with automated cloud workflows.",
    },
    {
      icon: UserCheck,
      value: "3.2x",
      label: "Lead-to-Member Conversion",
      description: "Fast digital inquiry tracking turns one-time walk-ins and trial athletes into loyal annual members.",
    },
  ];

  return (
    <section id="growth" className="w-full py-16 lg:py-24 bg-[#0C0D10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4FF32] px-3 py-1 rounded-full bg-[#15161C] border border-[#232631]">
            Tangible ROI
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-4">
            Proven Results From Gyms Operating On GK- Gym Life
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#94A3B8]">
            Built by gym operators for gym operators. The numbers speak for themselves.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="rounded-2xl bg-[#14151A] border border-[#232631] p-6 flex flex-col justify-between hover:border-[#D4FF32]/40 transition-colors"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#1D2028] border border-[#2A2E3B] flex items-center justify-center text-[#D4FF32] mb-5">
                    <Icon size={24} weight="bold" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {item.value}
                  </div>
                  <h3 className="text-base font-bold text-white mt-1">{item.label}</h3>
                  <p className="mt-2 text-xs text-[#94A3B8] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 rounded-2xl border border-[#D4FF32]/30 p-8 sm:p-12 text-center relative overflow-hidden shadow-[0_0_40px_rgba(212,255,50,0.08)]">
          <Image
            src="/images/gym-hero.jpg"
            alt="GK- Gym Life Gym Interior"
            fill
            className="object-cover brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0C0D10]/95 via-[#0C0D10]/80 to-[#0C0D10]/95 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Ready To Put Your Gym On Autopilot?
            </h3>
            <p className="mt-3 text-sm sm:text-base text-[#94A3B8]">
              Join the growing network of GK Powered Gyms. Get a customized demo and see how our hardware and software stack can transform your gym within 7 days.
            </p>
            <button
              type="button"
              onClick={onOpenConsultation}
              className="mt-6 h-12 px-8 rounded-xl bg-[#D4FF32] hover:bg-[#C2EF2B] text-black font-bold text-sm sm:text-base flex items-center gap-2 transition-all active:scale-[0.98] shadow-[0_0_25px_rgba(212,255,50,0.3)] cursor-pointer"
            >
              Book Your Free Consultation
              <ArrowRight size={18} weight="bold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
