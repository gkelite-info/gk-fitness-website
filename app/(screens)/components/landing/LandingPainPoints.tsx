import { 
  UserPlus, 
  CalendarCheck, 
  Barbell, 
  TrendUp 
} from "@phosphor-icons/react/dist/ssr";

export default function LandingPainPoints() {
  const highlights = [
    {
      title: "Enquiries & Member Directory Management",
      detail: "Capture walk-in inquiries instantly, maintain a centralized digital member directory, and prevent potential leads from slipping away.",
      icon: UserPlus,
    },
    {
      title: "Membership Expirations & Manual Renewals",
      detail: "Get real-time visibility into expiring plans and overdue accounts. Manually record cash or UPI renewals with immediate payment tracking.",
      icon: CalendarCheck,
    },
    {
      title: "Trainer Rosters & PT Session Management",
      detail: "Assign certified trainers to members, monitor one-on-one personal training sessions, and deliver tailored workout & nutrition programs.",
      icon: Barbell,
    },
    {
      title: "Daily Revenue Analytics & Inventory Maintenance",
      detail: "Track daily collections and monthly growth in real time, monitor gym equipment upkeep, and maintain complete operational control.",
      icon: TrendUp,
    },
  ];

  return (
    <section className="w-full py-10 lg:py-14 bg-[#090A0E] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tight leading-[1.1]">
            RUNNING A GYM IS A FULL-TIME JOB{" "}
            <span className="text-[#D4FF32] block sm:inline">
              MOST OWNERS NEVER SIGNED UP FOR.
            </span>
          </h2>
          <p className="mt-5 text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto">
            Owners are great at fitness. Growth needs systems, a team and technology — that's what we bring.
          </p>
        </div>

        <div className="space-y-3.5">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="rounded-2xl bg-[#14151C] border border-white/10 hover:border-[#D4FF32]/40 text-white p-4 sm:p-5 flex items-center gap-4 shadow-lg hover:shadow-[0_0_20px_rgba(212,255,50,0.06)] transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#D4FF32]/10 text-[#D4FF32] flex items-center justify-center shrink-0 border border-[#D4FF32]/25 group-hover:scale-105 transition-transform">
                  <Icon size={22} weight="bold" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] mt-0.5">
                    {item.detail}
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
