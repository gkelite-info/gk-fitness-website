export default function GymDetailSkeleton() {
  return (
    <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6 animate-pulse">
      <div className="flex justify-between items-center border-b border-[#20293A] pb-4">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 bg-[#171F2C] rounded-lg" />
          <div className="w-11 h-11 bg-[#171F2C] rounded-xl" />
          <div className="h-6 w-40 bg-[#171F2C] rounded-md" />
        </div>
        <div className="flex gap-6">
          <div className="h-8 w-28 bg-[#171F2C] rounded-md" />
          <div className="h-8 w-24 bg-[#171F2C] rounded-md" />
          <div className="h-8 w-24 bg-[#171F2C] rounded-md" />
        </div>
      </div>

      <div className="flex justify-between items-center gap-4">
        <div className="h-10 w-full sm:w-96 bg-[#171F2C] rounded-xl" />
        <div className="h-10 w-40 bg-[#171F2C] rounded-xl" />
      </div>

      <div className="flex gap-2">
        <div className="h-7 w-20 bg-[#171F2C] rounded-full" />
        <div className="h-7 w-24 bg-[#171F2C] rounded-full" />
        <div className="h-7 w-24 bg-[#171F2C] rounded-full" />
      </div>

      <div className="flex flex-col gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="w-full h-24 bg-[#141A24] border border-[#202939] rounded-2xl p-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-[52px] h-[52px] rounded-full bg-[#1C2433]" />
              <div className="flex flex-col gap-2">
                <div className="h-4 w-32 bg-[#1C2433] rounded" />
                <div className="h-3 w-48 bg-[#1C2433] rounded" />
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="h-8 w-24 bg-[#1C2433] rounded" />
              <div className="h-8 w-20 bg-[#1C2433] rounded-full" />
              <div className="w-9 h-9 bg-[#1C2433] rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
