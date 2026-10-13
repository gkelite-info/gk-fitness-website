export default function GymsSkeleton() {
  return (
    <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6 animate-pulse">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col gap-2">
          <div className="h-8 w-48 bg-[#1B1E28] rounded-lg" />
          <div className="h-4 w-64 bg-[#1B1E28] rounded-md" />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="h-11 w-full sm:w-72 bg-[#1B1E28] rounded-xl" />
          <div className="h-11 w-28 bg-[#1B1E28] rounded-xl" />
        </div>
      </div>

      <div className="flex justify-between items-center py-2">
        <div className="flex gap-2">
          <div className="h-9 w-24 bg-[#1B1E28] rounded-full" />
          <div className="h-9 w-24 bg-[#1B1E28] rounded-full" />
          <div className="h-9 w-24 bg-[#1B1E28] rounded-full" />
        </div>
        <div className="h-9 w-32 bg-[#1B1E28] rounded-xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-56 bg-[#13151D] border border-[#222634] rounded-2xl p-5 flex flex-col justify-between"
          >
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-[#1B1E28] rounded-xl" />
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-5 w-32 bg-[#1B1E28] rounded" />
                <div className="h-3 w-40 bg-[#1B1E28] rounded" />
                <div className="h-3 w-24 bg-[#1B1E28] rounded" />
              </div>
            </div>
            <div className="flex justify-between items-end pt-4 border-t border-[#1C202B]">
              <div className="h-10 w-28 bg-[#1B1E28] rounded" />
              <div className="w-10 h-10 bg-[#1B1E28] rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
