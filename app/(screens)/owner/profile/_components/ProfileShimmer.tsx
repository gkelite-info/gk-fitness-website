export default function ProfileShimmer() {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col h-full p-4 sm:p-6 lg:p-8 pt-6 gap-6 overflow-y-auto scrollbar-themed animate-pulse">
      <div className="flex flex-col gap-2 w-full shrink-0">
        <div className="h-8 w-32 bg-[#12141A] rounded-lg"></div>
        <div className="h-4 w-64 bg-[#12141A] rounded-lg"></div>
      </div>

      <div className="w-full bg-[#12141A] border border-[#232631] rounded-2xl flex flex-col items-center pt-8 pb-6 px-6 gap-6 relative shrink-0">
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-[#1E293B] rounded-2xl"></div>
          <div className="h-8 w-24 bg-[#1E293B] rounded-full"></div>
        </div>

        <div className="flex items-center gap-2 mt-2">
          <div className="h-8 w-40 bg-[#1E293B] rounded-lg"></div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 w-full border-t border-[#232631] pt-6 mt-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-4 h-4 bg-[#1E293B] rounded-full"></div>
              <div className="h-4 w-24 bg-[#1E293B] rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full shrink-0 mt-2">
        <div className="h-6 w-32 bg-[#12141A] rounded-lg"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-[#12141A] border border-[#232631] rounded-2xl p-6 flex flex-col gap-4 items-start">
              <div className="w-12 h-12 bg-[#1E293B] rounded-lg"></div>
              <div className="flex flex-col gap-2 w-full">
                <div className="h-4 w-24 bg-[#1E293B] rounded-lg"></div>
                <div className="h-8 w-16 bg-[#1E293B] rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full shrink-0 mt-2">
        <div className="h-6 w-40 bg-[#12141A] rounded-lg"></div>
        <div className="w-full bg-[#12141A] border border-[#232631] rounded-2xl flex flex-col overflow-hidden">
          {[1, 2, 3, 4, 5, 6].map((i, index) => (
            <div key={i} className={`flex items-center justify-between p-4 sm:p-5 ${index !== 5 ? 'border-b border-[#232631]' : ''}`}>
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 bg-[#1E293B] rounded-xl"></div>
                <div className="flex flex-col gap-2">
                  <div className="h-4 w-32 bg-[#1E293B] rounded-lg"></div>
                  <div className="h-3 w-48 bg-[#1E293B] rounded-lg hidden sm:block"></div>
                </div>
              </div>
              <div className="w-4 h-4 bg-[#1E293B] rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
