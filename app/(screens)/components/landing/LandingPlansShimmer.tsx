interface LandingPlansShimmerProps {
  count?: number;
}

export default function LandingPlansShimmer({ count = 4 }: LandingPlansShimmerProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 animate-pulse">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="h-[400px] sm:h-[420px] rounded-2xl bg-[#121319] border border-white/5 p-5 sm:p-6 flex flex-col justify-between shadow-xl"
        >
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-white/[0.06]">
            <div className="h-6 w-32 bg-white/10 rounded-lg" />
            <div className="w-9 h-9 rounded-xl bg-white/5" />
          </div>

          <div className="flex-1 my-4 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-4 h-4 rounded-full bg-white/10 shrink-0" />
              <div className="h-3.5 w-full bg-white/10 rounded" />
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-4 h-4 rounded-full bg-white/10 shrink-0" />
              <div className="h-3.5 w-4/5 bg-white/10 rounded" />
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-4 h-4 rounded-full bg-white/10 shrink-0" />
              <div className="h-3.5 w-5/6 bg-white/10 rounded" />
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-4 h-4 rounded-full bg-white/10 shrink-0" />
              <div className="h-3.5 w-3/4 bg-white/10 rounded" />
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-4 h-4 rounded-full bg-white/10 shrink-0" />
              <div className="h-3.5 w-2/3 bg-white/10 rounded" />
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.08]">
            <div className="w-full h-11 rounded-xl bg-white/10" />
          </div>
        </div>
      ))}
    </div>
  );
}
