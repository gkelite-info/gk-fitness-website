import Image from "next/image";

export default function LandingGymWall() {
  const gymShots = [
    { src: "/images/landing/hero-biometric.jpg", label: "GK Elite Hub · Delhi NCR" },
    { src: "/images/landing/owner-dashboard.jpg", label: "GK Performance · Sector 16" },
    { src: "/images/gym-hero.jpg", label: "GK Iron Forge · Indirapuram" },
    { src: "/images/landing/trainer-session.jpg", label: "GK Studio · Dwarka" },
    { src: "/images/landing/member-app.jpg", label: "GK Strength Lab · Noida" },
    { src: "/images/landing/global-trainer.jpg", label: "GK Virtual Arena · Remote" },
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
              alt={gym.label}
              fill
              className="object-cover brightness-90 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <span className="absolute bottom-2 left-2.5 max-w-[calc(100%-20px)] truncate rounded bg-black/75 backdrop-blur-sm px-2 py-0.5 text-[10px] sm:text-xs font-semibold text-white/95 border border-white/10">
              {gym.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
