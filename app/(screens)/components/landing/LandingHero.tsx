import LandingAuditForm from "./LandingAuditForm";

export default function LandingHero() {
  const points = [
    "200+ gyms already powered",
    "A dedicated manager",
    "We call the same day",
  ];

  return (
    <section className="relative w-full pt-6 pb-10 lg:pt-10 lg:pb-14 bg-[#090A0E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 flex flex-col justify-center pt-2 lg:pt-6">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase italic tracking-tight leading-[1.05]">
              YOUR GYM GETS <br />
              A MANAGER. <span className="text-[#D4FF32] not-italic">GK FITNESS.</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-[#CBD5E1] font-normal leading-relaxed max-w-xl">
              We don't just give you software. GK Fitness runs your ops, sales, staffing and member retention — and the ownership stays yours.
            </p>

            <ul className="mt-6 space-y-3">
              {points.map((pt) => (
                <li key={pt} className="flex items-center gap-3 text-sm sm:text-base font-bold text-white">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF32] shrink-0 shadow-[0_0_10px_rgba(212,255,50,0.8)]" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 pt-6 border-t border-white/10 hidden sm:flex items-center gap-6 text-xs text-[#94A3B8]">
              <div>
                <span className="text-white font-bold block text-base">₹35,000 + GST</span>
                <span>All-in operations management</span>
              </div>
              <div className="w-px h-8 bg-white/10" />
              <div>
                <span className="text-white font-bold block text-base">90 Days</span>
                <span>Turnaround guarantee</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 w-full">
            <LandingAuditForm />
          </div>
        </div>
      </div>
    </section>
  );
}
