import Image from "next/image";

export default function LandingPillarsCarousel() {
  const pillars = [
    {
      num: "01",
      title: "CRM & TECHNOLOGY",
      desc: "Complete member database, automated WhatsApp renewals, lead capture pipelines, and cloud access from mobile.",
      image: "/images/landing/hero-biometric.jpg",
    },
    {
      num: "02",
      title: "OPERATIONS & STAFFING",
      desc: "We hire, train, and manage your front desk team, floor trainers, and housekeeping staff so operations run 24/7.",
      image: "/images/landing/owner-dashboard.jpg",
    },
    {
      num: "03",
      title: "MEMBER RETENTION & DIETS",
      desc: "Personalized nutrition meal plans, workout splits, and video guides delivered straight to members to eliminate churn.",
      image: "/images/landing/member-app.jpg",
    },
    {
      num: "04",
      title: "BIOMETRIC HARDWARE SYNC",
      desc: "Direct integration with turnstiles and thumb scanners to enforce morning/evening batch rules and block expired entry.",
      image: "/images/gym-hero.jpg",
    },
    {
      num: "05",
      title: "FINANCE & EXPENSE AUDIT",
      desc: "Automated daily cash reconciliation, digital GST tax invoices, and categorized expense audits for 100% peace of mind.",
      image: "/images/landing/trainer-session.jpg",
    },
  ];

  return (
    <section className="w-full py-10 lg:py-14 bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-7">
          <h2 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tight leading-[1.1]">
            EVERYTHING A GYM NEEDS TO GROW —{" "}
            <span className="text-[#D4FF32] not-italic">
              IN ONE PARTNER.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#94A3B8] max-w-2xl mx-auto">
            From the software and hardware on your counter to on-ground staff management and member results.
          </p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar scrollbar-none snap-x">
          {pillars.map((pillar) => (
            <div
              key={pillar.num}
              className="w-72 sm:w-80 shrink-0 rounded-2xl bg-[#111216] border border-white/10 overflow-hidden snap-center group hover:border-[#D4FF32]/50 transition-all"
            >
              <div className="relative h-44 sm:h-52 w-full overflow-hidden">
                <Image
                  src={pillar.image}
                  alt={pillar.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111216] via-transparent to-transparent" />
                <span className="absolute bottom-3 left-4 text-3xl font-black italic text-white/90 drop-shadow-md">
                  {pillar.num}
                </span>
              </div>

              <div className="p-5 flex flex-col justify-start">
                <h3 className="text-base font-black italic uppercase tracking-wider text-white group-hover:text-[#D4FF32] transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-7 text-center">
          <a
            href="#audit-form"
            className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-[#D4FF32] hover:bg-[#C2EF2B] text-black font-extrabold text-sm uppercase italic tracking-wider transition-all shadow-[0_4px_25px_rgba(212,255,50,0.35)] active:scale-[0.98]"
          >
            BOOK MY FREE GYM AUDIT
          </a>
        </div>
      </div>
    </section>
  );
}
