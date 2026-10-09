import { 
  UserPlus, 
  Fingerprint, 
  Barbell, 
  WhatsappLogo, 
  Receipt, 
  Moon,
  Clock,
  Sparkle
} from "@phosphor-icons/react/dist/ssr";

export default function LandingKeyMoments() {
  const moments = [
    {
      time: "Step 1",
      icon: UserPlus,
      title: "The Lead & Trial Moment",
      actor: "Walk-in Prospect",
      description: "A prospect walks in. Their phone and fitness goals are captured in seconds. An automated WhatsApp message is instantly dispatched with gym photos and a confirmed trial workout pass.",
    },
    {
      time: "Step 2",
      icon: Fingerprint,
      title: "The 30-Second Onboarding",
      actor: "New Member",
      description: "Payment is processed with an instant digital GST invoice. Biometric thumb or face is registered at the counter, syncing instantly across cloud gates with zero paper forms.",
    },
    {
      time: "Step 3",
      icon: Clock,
      title: "The Seamless Daily Check-in",
      actor: "Daily Attendance",
      description: "Member scans thumb at the turnstile. In 0.4 seconds, gate unlocks, daily streak updates, and batch timing rules are enforced. Expired members are politely blocked automatically.",
    },
    {
      time: "Step 4",
      icon: Barbell,
      title: "The Personalized Coaching Session",
      actor: "Trainer & Member",
      description: "Personal trainer checks off completed 1-on-1 PT package sessions on mobile. Member opens their app to view today's workout split, video guides, and custom daily meal plans.",
    },
    {
      time: "Step 5",
      icon: WhatsappLogo,
      title: "The Zero-Friction Renewal Moment",
      actor: "WhatsApp Automation",
      description: "7, 3, and 1 days before plan expiration, member receives an automated WhatsApp reminder with a direct UPI payment link. 85% renew on their phone before their plan lapses.",
    },
    {
      time: "Step 6",
      icon: Moon,
      title: "The 10:00 PM Owner Audit",
      actor: "Gym Owner",
      description: "The owner checks their phone from home. Total revenue collected, petty cash vouchers, member footfall, and net profit are balanced in one consolidated live report.",
    },
  ];

  return (
    <section className="w-full py-10 lg:py-14 bg-[#090A0E] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold text-[#D4FF32] uppercase tracking-wider mb-4">
            <Sparkle size={14} weight="fill" />
            The Member & Operations Journey
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tight leading-[1.1]">
            KEY OPERATIONAL <span className="text-[#D4FF32] not-italic">MOMENTS.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            How GK Fitness transforms every interaction inside your gym from first enquiry to annual renewal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {moments.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.title}
                className="rounded-2xl bg-[#111216] border border-white/10 p-6 sm:p-7 flex flex-col justify-between hover:border-[#D4FF32]/40 transition-all group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#D4FF32]/10 border border-[#D4FF32]/20 text-[#D4FF32] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Icon size={24} weight="bold" />
                    </div>
                    <span className="text-xs font-bold text-white/50 bg-white/[0.04] px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {m.time}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold text-[#D4FF32] uppercase tracking-wider block mb-1">
                    {m.actor}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#D4FF32] transition-colors">
                    {m.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
