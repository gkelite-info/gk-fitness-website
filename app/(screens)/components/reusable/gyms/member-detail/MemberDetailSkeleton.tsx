export default function MemberDetailSkeleton() {
  return (
    <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-[#171F2C] rounded-lg" />
        <div className="h-7 w-56 bg-[#171F2C] rounded-md" />
      </div>

      <div className="w-full min-w-0 bg-[#141720] border border-[#1E2433] rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 w-full sm:w-auto">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#1C2433] shrink-0" />
          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="h-6 w-36 sm:w-44 bg-[#1C2433] rounded" />
            <div className="h-4 w-24 sm:w-28 bg-[#1C2433] rounded" />
            <div className="h-5 w-20 bg-[#1C2433] rounded-full" />
          </div>
        </div>
        <div className="hidden sm:block w-11 h-11 rounded-full bg-[#1C2433] shrink-0" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="h-72 bg-[#141720] border border-[#1E2433] rounded-2xl p-6 flex flex-col gap-4">
          <div className="h-5 w-40 bg-[#1C2433] rounded" />
          <div className="flex flex-col gap-4 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="h-4 w-28 bg-[#1C2433] rounded" />
                <div className="h-4 w-36 bg-[#1C2433] rounded" />
              </div>
            ))}
          </div>
        </div>

        <div className="h-72 bg-[#141720] border border-[#1E2433] rounded-2xl p-6 flex flex-col gap-4">
          <div className="h-5 w-40 bg-[#1C2433] rounded" />
          <div className="flex flex-col gap-4 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex justify-between items-center">
                <div className="h-4 w-28 bg-[#1C2433] rounded" />
                <div className="h-4 w-36 bg-[#1C2433] rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
