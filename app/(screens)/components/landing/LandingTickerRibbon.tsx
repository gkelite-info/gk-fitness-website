export default function LandingTickerRibbon() {
  const items = [
    "200+ GYMS POWERED FOR GROWTH",
    "ZERO OPERATIONAL CHAOS",
    "90 DAYS TURNAROUND",
    "A DEDICATED MANAGER FOR YOUR GYM",
    "OWNERSHIP STAYS 100% YOURS",
    "REAL-TIME BIOMETRIC REVENUE AUDIT",
  ];

  const duplicatedItems = [...items, ...items];

  return (
    <div className="w-full bg-[#D4FF32] text-black py-3.5 overflow-hidden no-scrollbar shadow-[0_0_25px_rgba(212,255,50,0.25)] select-none">
      <div className="animate-ticker-continuous gap-8 text-xs sm:text-sm font-black italic uppercase tracking-wider">
        {duplicatedItems.map((text, idx) => (
          <div key={idx} className="flex items-center gap-8 shrink-0">
            <span>{text}</span>
            <span className="text-black/35 font-normal">///</span>
          </div>
        ))}
      </div>
    </div>
  );
}
