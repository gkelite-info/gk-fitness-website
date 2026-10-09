import LandingAuditForm from "./LandingAuditForm";
import LandingRolePlans from "./LandingRolePlans";

export default function LandingHero() {
  const points = [
    "500+ Gyms already powered",
    "Present in 4+ cities",
    "1L+ registered users",
    "Dedicated manager & same-day demo call",
  ];

  return (
    <section className="relative w-full pt-6 pb-12 lg:pt-10 lg:pb-16 bg-[#090A0E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 flex flex-col justify-center pt-2 lg:pt-6">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase italic tracking-tight leading-[1.05]">
              YOUR GYM GETS <br />
              A MANAGER. <br />
              <span className="text-[#D4FF32] not-italic">GK- GYM LIFE.</span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-[#CBD5E1] font-normal leading-relaxed max-w-xl">
              We don't just give you software. GK- Gym Life powers your end-to-end ops, manual renewals, and finances — while the ownership stays 100% yours.
            </p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 max-w-xl">
              {points.map((pt) => (
                <li key={pt} className="flex items-center gap-2.5 text-sm sm:text-base font-bold text-white">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF32] shrink-0 shadow-[0_0_10px_rgba(212,255,50,0.8)]" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 w-full">
            <LandingAuditForm />
          </div>
        </div>

        <LandingRolePlans />
      </div>
    </section>
  );
}
