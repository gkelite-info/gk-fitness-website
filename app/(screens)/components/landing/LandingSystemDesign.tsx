
import { 
  User, 
  Buildings, 
  Users, 
  Barbell, 
  Globe, 
  Sparkle 
} from "@phosphor-icons/react/dist/ssr";

export default function LandingSystemDesign() {
  const roles = [
    {
      step: "01",
      title: "Gym Owner",
      subtitle: "Operations & Analytics",
      desc: "Get real-time insights into daily revenue, active member count, trainer performance, and full operational control from anywhere.",
      badges: ["Revenue Analytics", "Staff Management", "Growth Metrics"],
      icon: Buildings,
    },
    {
      step: "02",
      title: "Gym Customer",
      subtitle: "Member Portal & Access",
      desc: "Track daily workouts, follow customized nutrition meal plans, check membership status, and check in effortlessly with QR codes.",
      badges: ["Workout Tracking", "Diet Plans", "QR Check-in"],
      icon: Users,
    },
    {
      step: "03",
      title: "Gym Trainer",
      subtitle: "Client Management",
      desc: "Manage assigned clients, schedule floor training sessions, update meal plans dynamically, and track attendance and body transformations.",
      badges: ["Client Roster", "Session Scheduling", "Result Tracking"],
      icon: Barbell,
    },
    {
      step: "04",
      title: "Individual Customer",
      subtitle: "Personal Fitness App",
      desc: "Access customized workout routines, personalized nutrition diet charts, and track daily progress directly from their smartphone.",
      badges: ["Workout Tracker", "Diet Charts", "Progress Analytics"],
      icon: User,
    },
    {
      step: "05",
      title: "Global Trainer",
      subtitle: "Online Coaching Hub",
      desc: "Expand reach beyond the physical gym by managing remote clients, providing virtual guidance, and conducting online classes globally.",
      badges: ["Remote Coaching", "Virtual Classes", "Global Reach"],
      icon: Globe,
    },
  ];

  return (
    <section className="w-full py-10 lg:py-14 bg-[#0B0C10] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold text-[#D4FF32] uppercase tracking-wider mb-4">
            <Sparkle size={14} weight="fill" />
            Ecosystem Roles
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tight leading-[1.1]">
            HOW GK- GYM LIFE IS <span className="text-[#D4FF32] not-italic">DESIGNED.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Built from the ground up as a closed-loop operating system where everyone — from owners to customers — gets a dedicated experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {roles.map((layer) => {
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
                          Role {layer.step} • {layer.subtitle}
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
