export default function SidebarShimmer() {
  return (
    <div className="w-[256px] h-full bg-[#0E0F13] border-r border-[#1E2027] flex flex-col justify-between items-start px-4 py-6">
      <div className="flex flex-col items-start gap-8 w-full">
        {/* Logo Header Shimmer */}
        <div className="flex flex-row items-center gap-3 px-3 w-full">
          <div className="w-10 h-10 bg-[#1A1C23] animate-pulse rounded-xl flex-shrink-0" />
          <div className="flex flex-col justify-center gap-1.5 w-full">
            <div className="w-32 h-4 bg-[#1A1C23] animate-pulse rounded" />
            <div className="w-24 h-3 bg-[#1A1C23] animate-pulse rounded" />
          </div>
        </div>

        {/* Navigation Links Shimmer */}
        <div className="flex flex-col items-start gap-2 w-full">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex flex-row items-center px-4 py-3 gap-3.5 w-full h-[46px] rounded-2xl"
            >
              <div className="w-5 h-5 bg-[#1A1C23] animate-pulse rounded flex-shrink-0" />
              <div className="w-36 h-4 bg-[#1A1C23] animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
