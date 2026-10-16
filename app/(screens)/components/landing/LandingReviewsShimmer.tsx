interface LandingReviewsShimmerProps {
  count?: number;
}

export default function LandingReviewsShimmer({ count = 3 }: LandingReviewsShimmerProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-2xl bg-[#121319] border border-white/5 p-6 flex flex-col justify-between shadow-xl min-h-[260px]"
        >
          <div>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-white/10 shrink-0 border border-white/5" />
                <div className="flex flex-col gap-1.5">
                  <div className="h-4 w-28 bg-white/15 rounded" />
                  <div className="h-3 w-20 bg-white/10 rounded" />
                </div>
              </div>

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div key={s} className="w-3.5 h-3.5 rounded-full bg-white/10" />
                ))}
              </div>
            </div>

            <div className="space-y-2.5 my-4">
              <div className="h-3.5 w-full bg-white/10 rounded" />
              <div className="h-3.5 w-5/6 bg-white/10 rounded" />
              <div className="h-3.5 w-4/6 bg-white/5 rounded" />
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
            <div className="h-3 w-24 bg-white/10 rounded" />
            <div className="h-6 w-16 bg-white/5 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}
