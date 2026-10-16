export function DemoRequestDetailShimmer() {
  return (
    <div className="w-full flex flex-col gap-6 text-white max-w-7xl mx-auto animate-pulse">
      <div>
        <div className="h-5 w-44 bg-[#141B28] rounded-md" />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="h-8 w-60 sm:w-72 bg-[#141B28] rounded-xl" />
            <div className="h-6 w-24 bg-[#141B28] rounded-full" />
          </div>
          <div className="h-4 w-72 sm:w-96 bg-[#141B28] rounded-md" />
        </div>

        <div className="flex items-center gap-3 bg-[#0E131E] border border-[#1C2638] px-4 py-2.5 rounded-xl self-start md:self-auto w-48 h-14">
          <div className="w-8 h-8 rounded-lg bg-[#141B28] shrink-0" />
          <div className="flex flex-col gap-1.5 flex-1">
            <div className="h-2.5 w-16 bg-[#141B28] rounded" />
            <div className="h-3.5 w-24 bg-[#1A2234] rounded" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="w-full bg-[#0E131E] border border-[#1C2638] rounded-2xl p-6 sm:p-8 space-y-8">
            <div>
              <div className="h-5 w-32 bg-[#141B28] rounded-md mb-5" />
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-2">
                  <div className="h-4 w-40 bg-[#141B28] rounded shrink-0" />
                  <div className="h-4 w-48 bg-[#1A2234] rounded" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-2">
                  <div className="h-4 w-40 bg-[#141B28] rounded shrink-0" />
                  <div className="h-4 w-36 bg-[#1A2234] rounded" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-2">
                  <div className="h-4 w-40 bg-[#141B28] rounded shrink-0" />
                  <div className="h-4 w-56 bg-[#1A2234] rounded" />
                </div>
              </div>
            </div>

            <div className="border-t border-[#1C2638]/70 pt-8">
              <div className="h-5 w-28 bg-[#141B28] rounded-md mb-5" />
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-2">
                  <div className="h-4 w-40 bg-[#141B28] rounded shrink-0" />
                  <div className="h-4 w-44 bg-[#1A2234] rounded" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-2">
                  <div className="h-4 w-40 bg-[#141B28] rounded shrink-0" />
                  <div className="h-4 w-32 bg-[#1A2234] rounded" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-2">
                  <div className="h-4 w-40 bg-[#141B28] rounded shrink-0" />
                  <div className="h-4 w-20 bg-[#1A2234] rounded" />
                </div>
              </div>
            </div>

            <div className="border-t border-[#1C2638]/70 pt-8">
              <div className="h-5 w-32 bg-[#141B28] rounded-md mb-5" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-2">
                <div className="h-4 w-40 bg-[#141B28] rounded shrink-0" />
                <div className="h-6 w-24 bg-[#1A2234] rounded-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-5">
          <div className="h-4 w-20 bg-[#141B28] rounded" />

          <div className="w-full bg-[#0E131E] border border-[#1C2638] rounded-2xl overflow-hidden p-4 sm:p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#141B28]" />
                <div className="h-4 w-36 bg-[#141B28] rounded" />
              </div>
              <div className="w-4 h-4 bg-[#141B28] rounded" />
            </div>

            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <div className="h-3 w-28 bg-[#141B28] rounded" />
                <div className="h-10 w-full bg-[#0A0D14] border border-[#1C2638] rounded-xl" />
              </div>

              <div className="space-y-1.5">
                <div className="h-3 w-28 bg-[#141B28] rounded" />
                <div className="h-10 w-full bg-[#0A0D14] border border-[#1C2638] rounded-xl" />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pt-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-7 w-20 bg-[#141B28] rounded-lg shrink-0"
                  />
                ))}
              </div>

              <div className="h-10 w-full bg-[#1A2234] rounded-xl mt-2" />
            </div>
          </div>

          <div className="w-full bg-[#0E131E] border border-[#1C2638] rounded-2xl overflow-hidden p-4 sm:p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#141B28]" />
                <div className="h-4 w-32 bg-[#141B28] rounded" />
              </div>
              <div className="w-4 h-4 bg-[#141B28] rounded" />
            </div>

            <div className="space-y-2 pt-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-11 w-full bg-[#0A0D14] border border-[#1C2638] rounded-xl"
                />
              ))}
              <div className="h-10 w-full bg-[#1A2234] rounded-xl mt-4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoRequestDetailShimmer;
