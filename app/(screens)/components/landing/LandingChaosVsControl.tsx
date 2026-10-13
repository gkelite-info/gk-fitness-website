import { XCircle, CheckCircle, Warning, Sparkle, ShieldCheck, Skull } from "@phosphor-icons/react/dist/ssr";

export default function LandingChaosVsControl() {
  const chaosPoints = [
    { title: "Proxy Entries & Buddy Passes", desc: "Unrecorded friends and non-paying gym-goers slipping through manual paper logs." },
    { title: "Silent Expiry Bleed", desc: "Members working out 30+ days past plan expiry because front desk failed to notice." },
    { title: "Lost Workout & Diet Retention", desc: "Generic paper charts that members abandon within a week, leading to high drop-outs." },
    { title: "Disorganized Inquiry Leads", desc: "Walk-ins jotted on sticky pads with zero systematic follow-ups or trial tracking." },
    { title: "Cash & Expense Discrepancies", desc: "Untracked petty cash expenses, disputed fees, and no real-time audit trail." },
    { title: "Unaccountable PT Sessions", desc: "Trainers canceling client slots or claiming commissions with zero verified check-in data." },
  ];

  const controlPoints = [
    { title: "Hardware-Synced Biometrics", desc: "Direct turnstile gate enforcement that blocks expired or non-active members instantly." },
    { title: "Automated WhatsApp Recovery", desc: "Multi-stage automated reminder alerts with direct UPI payment links sent days before expiry." },
    { title: "In-App Diets & Guided Workouts", desc: "Customized macro meal plans and exercise video regimens assigned to each member." },
    { title: "Systematic Lead Conversion CRM", desc: "Digital pipeline tracking walk-ins, phone calls, and automated trial session follow-ups." },
    { title: "Real-Time P&L & Expense Audits", desc: "Digital GST receipts, categorized vouchers, and automated daily cash reconciliation." },
    { title: "Digital PT Slot Verification", desc: "Trainers verify sessions digitally, eliminating false claims and boosting member trust." },
  ];

  return (
    <section id="difference" className="w-full py-20 lg:py-28 bg-[#090A0D] border-y border-white/[0.08] relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#D4FF32]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold text-[#D4FF32] uppercase tracking-wider mb-4 shadow-sm">
            <Warning size={15} weight="bold" />
            Operational Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            The Difference Between A Struggling Gym And A{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4FF32] to-emerald-400">
              Profit Machine
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto">
            Compare traditional gym chaos against the streamlined, automated power of the GK- Gym Life ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="relative rounded-3xl bg-[#111217] border border-red-500/20 p-7 sm:p-9 flex flex-col justify-between overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.07] mb-7">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-red-400 bg-red-500/10 px-2.5 py-1 rounded-md border border-red-500/20">
                    <Skull size={14} weight="bold" />
                    Traditional Gym Approach
                  </span>
                  <h3 className="text-2xl font-black text-white mt-2">The Operational Chaos</h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0 shadow-lg">
                  <XCircle size={26} weight="bold" />
                </div>
              </div>

              <div className="space-y-4">
                {chaosPoints.map((point) => (
                  <div key={point.title} className="flex items-start gap-3.5 p-3 rounded-xl bg-black/30 border border-white/[0.04]">
                    <XCircle size={20} weight="fill" className="text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white/90">{point.title}</h4>
                      <p className="text-xs text-[#94A3B8] mt-0.5 leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-white/[0.07] flex items-center justify-between bg-red-500/5 p-4 rounded-2xl border border-red-500/15">
              <span className="text-xs font-semibold text-red-400">
                Estimated Net Loss: 20% to 35% of monthly recurring dues
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-300 bg-red-500/20 px-2 py-0.5 rounded">
                High Risk
              </span>
            </div>
          </div>

          <div className="relative rounded-3xl bg-[#111319] border border-[#D4FF32]/40 p-7 sm:p-9 flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(212,255,50,0.08)]">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4FF32]/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/[0.07] mb-7">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#D4FF32] bg-[#D4FF32]/10 px-2.5 py-1 rounded-md border border-[#D4FF32]/30">
                    <Sparkle size={14} weight="fill" />
                    GK Powered Ecosystem
                  </span>
                  <h3 className="text-2xl font-black text-white mt-2">The Automated Engine</h3>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#D4FF32]/10 border border-[#D4FF32]/30 flex items-center justify-center text-[#D4FF32] shrink-0 shadow-[0_0_20px_rgba(212,255,50,0.2)]">
                  <ShieldCheck size={26} weight="fill" />
                </div>
              </div>

              <div className="space-y-4">
                {controlPoints.map((point) => (
                  <div key={point.title} className="flex items-start gap-3.5 p-3 rounded-xl bg-white/[0.02] border border-[#D4FF32]/15 hover:border-[#D4FF32]/40 transition-colors">
                    <CheckCircle size={20} weight="fill" className="text-[#D4FF32] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-white">{point.title}</h4>
                      <p className="text-xs text-[#94A3B8] mt-0.5 leading-relaxed">{point.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-white/[0.07] flex items-center justify-between bg-[#D4FF32]/5 p-4 rounded-2xl border border-[#D4FF32]/25">
              <span className="text-xs font-bold text-[#D4FF32]">
                Guaranteed Control: 99.8% accurate attendance & +38% renewals
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-black bg-[#D4FF32] px-2 py-0.5 rounded">
                Verified ROI
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
