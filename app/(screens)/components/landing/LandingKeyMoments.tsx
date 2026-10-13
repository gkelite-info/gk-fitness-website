import Image from "next/image";
import { Sparkle } from "@phosphor-icons/react/dist/ssr";

export default function LandingKeyMoments() {
  const moments = [
    {
      time: "Step 1",
      image: "/images/landing_page/Neon Gym Reception Enquiries.png",
      title: "The Lead & Trial Moment",
      actor: "Walk-in Lead & Reception",
      description: "A prospect walks in. Staff captures their contact info in 10 seconds. Automated WhatsApp welcome instantly shares gym photos, pricing, and a confirmed trial pass.",
    },
    {
      time: "Step 2",
      image: "/images/landing_page/Fitlevel Gym Check-In Experience.png",
      title: "The 30-Second Onboarding",
      actor: "Turnstile Gate & Biometrics",
      description: "Instant digital GST invoice generation. Biometric thumb or facial recognition is registered at the desk, syncing immediately across access gates with zero paper forms.",
    },
    {
      time: "Step 3",
      image: "/images/landing_page/Push Day_ Stronger Than Yesterday.png",
      title: "The Personalized Coaching Split",
      actor: "Training Floor & Coach",
      description: "Trainers log completed 1-on-1 PT package sessions on mobile. Members open their app to track today's push day routine, exercise sets, and personal strength records.",
    },
    {
      time: "Step 4",
      image: "/images/landing_page/Weekly Meal Planner at the Gym.png",
      title: "The Weekly Nutrition Planner",
      actor: "Diet Hub & Member Retention",
      description: "Custom nutrition charts and weekly meal plans are prescribed directly to the member's profile, providing clear daily macros that boost retention and real results.",
    },
    {
      time: "Step 5",
      image: "/images/landing_page/Gym Reception Follow-Up Conversation.png",
      title: "The Zero-Friction Renewal Moment",
      actor: "Renewal Automation & Desk",
      description: "Staff conducts warm follow-ups backed by smart WhatsApp renewal alerts sent 7, 3, and 1 day prior, with direct UPI payment links so members renew on time.",
    },
    {
      time: "Step 6",
      image: "/images/landing_page/Gym Manager Reviewing Financial Dashboard.png",
      title: "The Daily Revenue & Expense Audit",
      actor: "Owner & Manager Audit",
      description: "Managers and owners monitor net profit, daily cash vs digital collections, attendance footfalls, and maintenance logs in one unified live dashboard.",
    },
  ];

  return (
    <section className="w-full py-10 lg:py-14 bg-[#090A0E] text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-bold text-[#D4FF32] uppercase tracking-wider mb-4">
            <Sparkle size={14} weight="fill" />
            The Member &amp; Operations Journey
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tight leading-[1.1]">
            KEY OPERATIONAL <span className="text-[#D4FF32] not-italic">MOMENTS.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            How GK- Gym Life transforms every interaction inside your gym from first enquiry to annual renewal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {moments.map((m) => (
            <div
              key={m.title}
              className="rounded-2xl bg-[#111216] border border-white/10 overflow-hidden flex flex-col justify-between hover:border-[#D4FF32]/40 transition-all group shadow-lg hover:-translate-y-1"
            >
              <div>
                <div className="relative h-48 sm:h-52 w-full overflow-hidden">
                  <Image
                    src={m.image}
                    alt={m.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111216] via-black/20 to-transparent" />
                  <span className="absolute top-3 right-3 text-xs font-bold text-white bg-black/75 backdrop-blur-sm px-3 py-1 rounded-full uppercase tracking-wider border border-white/10">
                    {m.time}
                  </span>
                </div>

                <div className="p-6">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
