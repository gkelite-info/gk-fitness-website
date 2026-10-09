import Image from "next/image";

export default function LandingGymWall() {
  const gymShots = [
    { src: "/images/landing_page/Neon Gym Reception Enquiries.png", label: "Front Desk · Lead Inquiries & Walk-ins" },
    { src: "/images/landing_page/Fitlevel Gym Check-In Experience.png", label: "Turnstile Gate · Biometric & QR Check-in" },
    { src: "/images/landing_page/Push Day_ Stronger Than Yesterday.png", label: "Training Floor · Workout Splits & Coaching" },
    { src: "/images/landing_page/Weekly Meal Planner at the Gym.png", label: "Nutrition Hub · Custom Member Meal Plans" },
    { src: "/images/landing_page/Gym Manager Reviewing Financial Dashboard.png", label: "Analytics Hub · Live Revenue & Billing Dash" },
    { src: "/images/landing_page/Gym Reception Follow-Up Conversation.png", label: "Front Counter · WhatsApp Automated Follow-ups" },
    { src: "/images/landing_page/Gym Owner Reviewing Expenses.png", label: "Owner Portal · Expense & Cash Flow Audits" },
    { src: "/images/landing_page/Gym Staff Inspecting Equipment.png", label: "Floor Audit · Equipment & Maintenance Checks" },
    { src: "/images/landing_page/Gym Announcements in Action.png", label: "Community · Live Broadcasts & Announcements" },
    { src: "/images/landing_page/Post-Workout Performance Dashboard.png", label: "Member App · Attendance & Milestone Tracker" },
  ];

  const duplicatedShots = [...gymShots, ...gymShots];

  return (
    <div className="w-full overflow-hidden no-scrollbar bg-black py-2.5 border-b border-white/[0.08] select-none">
      <div className="animate-marquee-continuous gap-3">
        {duplicatedShots.map((gym, idx) => (
          <div
            key={idx}
            className="relative h-28 sm:h-36 w-48 sm:w-60 shrink-0 rounded-xl overflow-hidden bg-[#15161C] border border-white/10 group shadow-md"
          >
            <Image
              src={gym.src}
              alt="Gym Life Operational Shot"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
