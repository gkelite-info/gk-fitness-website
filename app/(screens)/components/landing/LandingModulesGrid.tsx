import { 
  Fingerprint, 
  UsersThree, 
  CurrencyInr, 
  Barbell, 
  BellRinging, 
  Package, 
  ForkKnife,
  GlobeHemisphereWest,
  WhatsappLogo,
  CheckCircle,
  Sparkle
} from "@phosphor-icons/react/dist/ssr";

export default function LandingModulesGrid() {
  return (
    <section id="modules" className="w-full py-20 lg:py-28 bg-[#090A0D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#D4FF32] bg-[#D4FF32]/10 border border-[#D4FF32]/25 px-3 py-1 rounded-full">
            <Sparkle size={13} weight="fill" />
            Core Architecture
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mt-4">
            Built Specifically For Modern Gyms That Want To Scale
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#94A3B8]">
            Every module is tailored to plug revenue leaks, automate repetitive reception desk tasks, and create an unforgettable member experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-3xl bg-gradient-to-br from-[#14151C] to-[#0E0F14] border border-white/[0.08] hover:border-[#D4FF32]/40 p-7 sm:p-9 flex flex-col justify-between transition-all group shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-13 h-13 rounded-2xl bg-[#D4FF32]/10 border border-[#D4FF32]/30 flex items-center justify-center text-[#D4FF32]">
                  <Fingerprint size={28} weight="bold" />
                </div>
                <span className="text-xs font-bold text-[#D4FF32] bg-[#D4FF32]/10 border border-[#D4FF32]/30 px-3 py-1 rounded-full uppercase tracking-wider">
                  Hardware-Enforced Control
                </span>
              </div>

              <h3 className="text-2xl font-black text-white group-hover:text-[#D4FF32] transition-colors">
                Biometric Hardware Sync & Batch Timing Rules
              </h3>
              <p className="mt-3 text-sm text-[#94A3B8] leading-relaxed max-w-xl">
                Direct integration with fingerprint scanners and facial recognition turnstiles. Enforces morning and evening shift rules in real time, automatically terminating door access the second a plan lapses.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-black/40 border border-white/[0.04] text-xs text-white/90 flex items-center gap-2">
                <CheckCircle size={16} weight="fill" className="text-[#D4FF32] shrink-0" />
                <span>Zero buddy passes</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/[0.04] text-xs text-white/90 flex items-center gap-2">
                <CheckCircle size={16} weight="fill" className="text-[#D4FF32] shrink-0" />
                <span>Morning/Evening shifts</span>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/[0.04] text-xs text-white/90 flex items-center gap-2">
                <CheckCircle size={16} weight="fill" className="text-[#D4FF32] shrink-0" />
                <span>Instant cloud deactivation</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-[#14151C] border border-white/[0.08] hover:border-[#D4FF32]/40 p-7 flex flex-col justify-between transition-all group shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-13 h-13 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#D4FF32]">
                  <ForkKnife size={28} weight="bold" />
                </div>
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  Member Results
                </span>
              </div>

              <h3 className="text-xl font-black text-white group-hover:text-[#D4FF32] transition-colors">
                Workouts & Custom Meal Plans
              </h3>
              <p className="mt-3 text-sm text-[#94A3B8] leading-relaxed">
                Empower your trainers to build personalized workout splits with exercise video guides and customized macro nutrition plans delivered straight to members.
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF32]" />
                <span>Video-guided exercise demo library</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF32]" />
                <span>Custom macro meal plans</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-[#14151C] border border-white/[0.08] hover:border-[#D4FF32]/40 p-7 flex flex-col justify-between transition-all group shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-13 h-13 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#D4FF32]">
                  <WhatsappLogo size={28} weight="fill" className="text-[#25D366]" />
                </div>
                <span className="text-[11px] font-bold text-[#25D366] bg-[#25D366]/10 px-2.5 py-1 rounded-full">
                  Zero Churn
                </span>
              </div>

              <h3 className="text-xl font-black text-white group-hover:text-[#D4FF32] transition-colors">
                WhatsApp Renewal Automation
              </h3>
              <p className="mt-3 text-sm text-[#94A3B8] leading-relaxed">
                Automated reminders at 7, 3, and 1 days before expiry with direct UPI payment links. Recovers lost renewals without front-desk phone tag.
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-white/[0.06] p-3 rounded-xl bg-black/40 border border-white/[0.04]">
              <span className="text-[11px] text-[#25D366] font-bold flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                "Hi Alex! Your Annual Pass expires in 3 days. Tap to renew via UPI."
              </span>
            </div>
          </div>

          <div className="rounded-3xl bg-[#14151C] border border-white/[0.08] hover:border-[#D4FF32]/40 p-7 flex flex-col justify-between transition-all group shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-13 h-13 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#D4FF32]">
                  <CurrencyInr size={28} weight="bold" />
                </div>
                <span className="text-[11px] font-bold text-[#D4FF32] bg-[#D4FF32]/10 px-2.5 py-1 rounded-full">
                  Daily P&L
                </span>
              </div>

              <h3 className="text-xl font-black text-white group-hover:text-[#D4FF32] transition-colors">
                Finance, GST & Expense Audits
              </h3>
              <p className="mt-3 text-sm text-[#94A3B8] leading-relaxed">
                Track membership collections, installment plans, petty cash vouchers, and trainer payouts in real time. Full financial transparency.
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF32]" />
                <span>Digital GST tax invoices & receipts</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF32]" />
                <span>Daily expense voucher categorization</span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-[#14151C] border border-white/[0.08] hover:border-[#D4FF32]/40 p-7 flex flex-col justify-between transition-all group shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-13 h-13 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#D4FF32]">
                  <GlobeHemisphereWest size={28} weight="bold" />
                </div>
                <span className="text-[11px] font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full">
                  Hybrid Revenue
                </span>
              </div>

              <h3 className="text-xl font-black text-white group-hover:text-[#D4FF32] transition-colors">
                Floor PT & Global Trainers
              </h3>
              <p className="mt-3 text-sm text-[#94A3B8] leading-relaxed">
                Log in-house floor PT slot deductions and expand your gym brand into remote online personal training across borders.
              </p>
            </div>

            <div className="mt-8 pt-5 border-t border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF32]" />
                <span>1-on-1 personal training packages</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF32]" />
                <span>Remote virtual coaching network</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
