import { 
  User, 
  Buildings, 
  Users, 
  Barbell, 
  Globe, 
  Sparkle 
} from "@phosphor-icons/react/dist/ssr";

type BadgeColor = "lime" | "cyan" | "emerald" | "purple" | "amber" | "rose";

interface RoleBadge {
  name: string;
  color: BadgeColor;
}

interface RoleItem {
  step: string;
  title: string;
  subtitle: string;
  desc: string;
  badges: RoleBadge[];
  icon: typeof Buildings;
}

function getBadgeStyles(color: BadgeColor): string {
  switch (color) {
    case "lime":
      return "bg-[#D4FF32]/10 border-[#D4FF32]/35 text-[#D4FF32] hover:bg-[#D4FF32]/20 shadow-[0_0_12px_rgba(212,255,50,0.12)]";
    case "cyan":
      return "bg-[#0EA5E9]/10 border-[#0EA5E9]/35 text-[#38BDF8] hover:bg-[#0EA5E9]/20 shadow-[0_0_12px_rgba(14,165,233,0.12)]";
    case "emerald":
      return "bg-[#10B981]/10 border-[#10B981]/35 text-[#34D399] hover:bg-[#10B981]/20 shadow-[0_0_12px_rgba(16,185,129,0.12)]";
    case "purple":
      return "bg-[#A855F7]/10 border-[#A855F7]/35 text-[#C084FC] hover:bg-[#A855F7]/20 shadow-[0_0_12px_rgba(168,85,247,0.12)]";
    case "amber":
      return "bg-[#F59E0B]/10 border-[#F59E0B]/35 text-[#FBBF24] hover:bg-[#F59E0B]/20 shadow-[0_0_12px_rgba(245,158,11,0.12)]";
    case "rose":
      return "bg-[#F43F5E]/10 border-[#F43F5E]/35 text-[#FB7185] hover:bg-[#F43F5E]/20 shadow-[0_0_12px_rgba(244,63,94,0.12)]";
    default:
      return "bg-white/10 border-white/20 text-white";
  }
}

export default function LandingSystemDesign() {
  const roles: RoleItem[] = [
    {
      step: "01",
      title: "Gym Owner",
      subtitle: "Operations & Analytics",
      desc: "Complete command over revenue, staff, biometric gate hardware, lead conversions, and daily footfall across your gym branches.",
      icon: Buildings,
      badges: [
        { name: "Biometric Sync", color: "cyan" },
        { name: "Revenue & GST", color: "lime" },
        { name: "Auto-Renewals", color: "emerald" },
        { name: "Staff Payroll", color: "amber" },
        { name: "Lead Pipeline", color: "purple" },
        { name: "Equipment AMC", color: "rose" },
        { name: "QR Gate Access", color: "cyan" },
        { name: "Attendance Logs", color: "emerald" },
      ],
    },
    {
      step: "02",
      title: "Gym Customer",
      subtitle: "Member Portal & Access",
      desc: "Personalized member experience for workout tracking, customized nutrition meal plans, biometric QR check-ins, and membership renewals.",
      icon: Users,
      badges: [
        { name: "Workout Tracking", color: "lime" },
        { name: "Macro Diet Plans", color: "amber" },
        { name: "QR Gate Check-in", color: "cyan" },
        { name: "Transformation Logs", color: "emerald" },
        { name: "PT Session Booking", color: "purple" },
        { name: "Membership Card", color: "rose" },
        { name: "Streak Counter", color: "lime" },
        { name: "Video Demos", color: "cyan" },
      ],
    },
    {
      step: "03",
      title: "Gym Trainer",
      subtitle: "Client Management & PT",
      desc: "Dedicated floor portal to build custom workouts, track assigned member transformations, manage 1-on-1 PT packages, and assign meal charts.",
      icon: Barbell,
      badges: [
        { name: "Client Roster", color: "cyan" },
        { name: "Workout Builder", color: "lime" },
        { name: "Macro Plans", color: "amber" },
        { name: "1-on-1 PT Logs", color: "purple" },
        { name: "Package Deduction", color: "rose" },
        { name: "Transformation Review", color: "emerald" },
        { name: "Muscle Targeting", color: "lime" },
        { name: "Attendance Logs", color: "cyan" },
      ],
    },
    {
      step: "04",
      title: "Individual Customer",
      subtitle: "Personal Fitness App",
      desc: "Independent smart fitness app for home and gym workouts, nutrition charts, body composition tracking, and habit development on smartphone.",
      icon: User,
      badges: [
        { name: "Workout Routines", color: "lime" },
        { name: "Calorie Tracker", color: "amber" },
        { name: "Exercise Library", color: "cyan" },
        { name: "Photo Progress", color: "emerald" },
        { name: "Streak & PRs", color: "purple" },
        { name: "Diet Charts", color: "rose" },
        { name: "Habit Tracker", color: "cyan" },
        { name: "Goal Fitness Plans", color: "lime" },
      ],
    },
    {
      step: "05",
      title: "Global Trainer",
      subtitle: "Online Coaching Hub",
      desc: "Scale coaching across the globe with virtual client onboarding, video consultations, remote regimen delivery, and recurring international subscriptions.",
      icon: Globe,
      badges: [
        { name: "Global Leads", color: "purple" },
        { name: "Video Consultations", color: "cyan" },
        { name: "Remote Regimens", color: "lime" },
        { name: "Nutrition Coaching", color: "amber" },
        { name: "Video Feedback", color: "rose" },
        { name: "Milestone Tracking", color: "emerald" },
        { name: "Global Retainers", color: "purple" },
        { name: "Automated Payouts", color: "cyan" },
      ],
    },
  ];

  return (
    <section className="w-full py-12 lg:py-20 bg-[#0B0C10] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
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
            const halfIndex = Math.ceil(layer.badges.length / 2);
            const firstRowBadges = layer.badges.slice(0, halfIndex);
            const secondRowBadges = layer.badges.slice(halfIndex);

            return (
              <div
                key={layer.step}
                className="rounded-2xl bg-[#121319] border border-white/10 p-6 sm:p-8 flex flex-col justify-between hover:border-[#D4FF32]/40 transition-all duration-300 group shadow-2xl hover:shadow-[0_0_30px_rgba(212,255,50,0.06)]"
              >
                <div>
                  <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] mb-6">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-[#D4FF32]/10 border border-[#D4FF32]/25 text-[#D4FF32] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105">
                        <Icon size={24} weight="bold" />
                      </div>
                      <div>
                        <span className="text-[11px] font-extrabold text-[#D4FF32] uppercase tracking-wider block">
                          Role {layer.step} • {layer.subtitle}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-white mt-0.5 tracking-tight">
                          {layer.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-[#94A3B8] leading-relaxed font-normal">
                    {layer.desc}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-white/[0.08]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#8E99AB] uppercase tracking-wider">
                      Key Modules & Capabilities
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#CBD5E1] group-hover:text-[#D4FF32] transition-colors inline-flex items-center gap-1">
                      Scroll →
                    </span>
                  </div>

                  <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 scrollbar-track-transparent">
                    <div className="flex flex-col gap-2 min-w-max">
                      <div className="flex items-center gap-2">
                        {firstRowBadges.map((b) => (
                          <span
                            key={b.name}
                            className={`inline-flex items-center px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border text-xs sm:text-[13px] font-semibold tracking-wide whitespace-nowrap shrink-0 transition-all duration-200 cursor-default ${getBadgeStyles(
                              b.color
                            )}`}
                          >
                            {b.name}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        {secondRowBadges.map((b) => (
                          <span
                            key={b.name}
                            className={`inline-flex items-center px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl border text-xs sm:text-[13px] font-semibold tracking-wide whitespace-nowrap shrink-0 transition-all duration-200 cursor-default ${getBadgeStyles(
                              b.color
                            )}`}
                          >
                            {b.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
