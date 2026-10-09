import { 
  Fingerprint, 
  Cpu, 
  ArrowsClockwise, 
  Browsers, 
  ShieldCheck, 
  Sparkle 
} from "@phosphor-icons/react/dist/ssr";

export default function LandingSystemDesign() {
  const architecturalLayers = [
    {
      step: "01",
      title: "Edge Hardware Layer",
      subtitle: "Biometrics & Turnstiles",
      desc: "Connects directly to fingerprint and facial recognition scanners via TCP/IP protocols. Enforces instant gate authorization and morning/evening shift batch restrictions in under 400ms.",
      badges: ["0.4s response time", "Anti-passback protection", "Offline mode sync"],
      icon: Fingerprint,
    },
    {
      step: "02",
      title: "Event-Driven Automation Engine",
      subtitle: "WhatsApp, Alerts & Triggers",
      desc: "Background cron schedulers continuously monitor member expiration thresholds, daily attendance streaks, and follow-up deadlines to dispatch automated WhatsApp reminders and payment links.",
      badges: ["Daily threshold scanning", "Automated WhatsApp API", "Instant payment slips"],
      icon: ArrowsClockwise,
    },
    {
      step: "03",
      title: "Fitness & Nutrition Engine",
      subtitle: "Workouts, Videos & Diets",
      desc: "A proprietary content and coaching engine allowing trainers to structure exercise splits with exercise video demonstration guides and personalized macro nutrition meal plans.",
      badges: ["Exercise video library", "Macro nutrition planner", "Client progress tracker"],
      icon: Cpu,
    },
    {
      step: "04",
      title: "Multi-Role Experience Layer",
      subtitle: "5 Dedicated Web Portals",
      desc: "Strict role-based interfaces with isolated permissions for Gym Owners, Floor Trainers, Global Online Coaches, Gym Members/Athletes, and Superadmin Fleet Managers.",
      badges: ["Isolated permission trees", "Mobile responsive PWA", "Bank-grade data encryption"],
      icon: Browsers,
    },
  ];

  return (
    <section className="w-full py-10 lg:py-14 bg-[#0B0C10] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold text-[#D4FF32] uppercase tracking-wider mb-4">
            <Sparkle size={14} weight="fill" />
            System Architecture
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tight leading-[1.1]">
            HOW GK FITNESS IS <span className="text-[#D4FF32] not-italic">DESIGNED.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Built from the ground up as a closed-loop operating system where hardware, software, and human operations synchronize in real time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {architecturalLayers.map((layer) => {
            const Icon = layer.icon;
            return (
              <div
                key={layer.step}
                className="rounded-2xl bg-[#121319] border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-[#D4FF32]/40 transition-all group shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-[#D4FF32]/10 border border-[#D4FF32]/20 text-[#D4FF32] flex items-center justify-center shrink-0">
                        <Icon size={22} weight="bold" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-[#D4FF32] uppercase tracking-wider block">
                          Layer {layer.step} • {layer.subtitle}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                          {layer.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                    {layer.desc}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-white/[0.06] flex flex-wrap gap-2">
                  {layer.badges.map((b) => (
                    <span
                      key={b}
                      className="px-2.5 py-1 rounded-lg bg-black/50 border border-white/[0.06] text-[11px] font-medium text-white/80"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
