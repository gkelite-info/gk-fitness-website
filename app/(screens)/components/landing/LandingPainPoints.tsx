import { Warning } from "@phosphor-icons/react/dist/ssr";

export default function LandingPainPoints() {
  const problems = [
    {
      title: "Leads slip through the cracks.",
      detail: "Walk-ins and inquiries never get structured follow-ups, losing 40% of potential members.",
    },
    {
      title: "Sales depend on one person.",
      detail: "If the front-desk guy leaves or calls in sick, gym revenue freezes immediately.",
    },
    {
      title: "Members quietly churn.",
      detail: "Nobody tracks upcoming plan expirations until the member has already stopped showing up.",
    },
    {
      title: "The owner is stuck in daily firefighting.",
      detail: "You spend 12 hours a day handling machine fixes, staff issues, and petty cash complaints.",
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
          {problems.map((prob) => (
            <div
              key={prob.title}
              className="rounded-2xl bg-[#14151C] border border-white/10 hover:border-[#D4FF32]/40 text-white p-4 sm:p-5 flex items-center gap-4 shadow-lg hover:shadow-[0_0_20px_rgba(212,255,50,0.06)] transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#D4FF32]/10 text-[#D4FF32] flex items-center justify-center shrink-0 border border-[#D4FF32]/25">
                <Warning size={22} weight="bold" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {prob.title}
                </h3>
                <p className="text-xs text-[#94A3B8] mt-0.5">
                  {prob.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
