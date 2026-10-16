export default function LandingVideosShimmer() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-4 sm:gap-6 overflow-hidden">
      {[1, 2, 3, 4].map((n) => (
        <div
          key={n}
          className="h-80 sm:h-96 w-56 sm:w-64 shrink-0 rounded-2xl bg-[#0E1015] border border-white/5 relative overflow-hidden flex flex-col justify-between p-4 sm:p-5 shadow-2xl animate-pulse"
        >
          <div className="flex items-center justify-between z-10">
            <div className="h-6 w-20 rounded-full bg-white/10" />
            <div className="h-5 w-12 rounded-md bg-white/5" />
          </div>

          <div className="flex items-center justify-center my-auto z-10">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-white/20" />
            </div>
          </div>

          <div className="flex flex-col gap-2 z-10 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/10 shrink-0" />
              <div className="flex flex-col gap-1 flex-1">
                <div className="h-3.5 w-24 bg-white/15 rounded" />
                <div className="h-2.5 w-16 bg-white/10 rounded" />
              </div>
            </div>
            <div className="h-3 w-full bg-white/10 rounded mt-1" />
            <div className="h-3 w-4/5 bg-white/10 rounded" />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#07080B] via-transparent to-[#07080B]/40 pointer-events-none" />
        </div>
      ))}
    </div>
  );
}
