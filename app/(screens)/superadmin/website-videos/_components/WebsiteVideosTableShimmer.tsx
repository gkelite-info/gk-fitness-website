export function WebsiteVideosTableShimmer() {
  return (
    <div className="w-full bg-[#0B0E14] border border-[#1B2232] rounded-2xl overflow-hidden shadow-xl animate-pulse">
      <div className="w-full overflow-x-auto scrollbar-themed">
        <table className="w-full min-w-[760px] text-left border-collapse">
          <thead>
            <tr className="border-b border-[#1B2232] bg-[#0E121A]/80 text-[#64748B] text-xs font-semibold uppercase tracking-wider">
              <th scope="col" className="py-4 px-3 w-10 text-center">
                <div className="w-5 h-5 rounded bg-[#161D2B] mx-auto" />
              </th>
              <th scope="col" className="py-4 px-3 w-12">
                <div className="h-3 w-4 bg-[#161D2B] rounded" />
              </th>
              <th scope="col" className="py-4 px-4 w-48">
                <div className="h-3 w-16 bg-[#161D2B] rounded" />
              </th>
              <th scope="col" className="py-4 px-4 w-44">
                <div className="h-3 w-24 bg-[#161D2B] rounded" />
              </th>
              <th scope="col" className="py-4 px-4 w-36">
                <div className="h-3 w-16 bg-[#161D2B] rounded" />
              </th>
              <th scope="col" className="py-4 px-4 text-right pr-6">
                <div className="h-3 w-16 bg-[#161D2B] rounded ml-auto" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#171E2C]/60">
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="hover:bg-[#121622]/40 transition-colors">
                <td className="py-5 px-3 text-center">
                  <div className="w-5 h-5 rounded bg-[#141B28] mx-auto" />
                </td>
                <td className="py-5 px-3">
                  <div className="h-4 w-5 bg-[#141B28] rounded font-mono" />
                </td>
                <td className="py-5 px-4">
                  <div className="w-28 sm:w-32 h-16 sm:h-20 rounded-xl bg-[#141B28] relative overflow-hidden flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-[#1C2538]" />
                    <div className="absolute bottom-1.5 right-1.5 h-3.5 w-8 rounded bg-[#1C2538]" />
                  </div>
                </td>
                <td className="py-5 px-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="h-4 w-24 bg-[#141B28] rounded" />
                    <div className="h-3 w-16 bg-[#141B28]/70 rounded" />
                  </div>
                </td>
                <td className="py-5 px-4">
                  <div className="h-6 w-20 rounded-full bg-[#141B28]" />
                </td>
                <td className="py-5 px-4 text-right pr-6">
                  <div className="flex items-center justify-end gap-2">
                    <div className="h-8 w-18 rounded-lg bg-[#141B28]" />
                    <div className="h-8 w-16 rounded-lg bg-[#141B28]" />
                    <div className="h-8 w-16 rounded-lg bg-[#141B28]" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 border-t border-[#1C2333] flex items-center justify-between">
        <div className="h-4 w-36 bg-[#141B28] rounded" />
        <div className="flex items-center gap-2">
          <div className="h-8 w-20 bg-[#141B28] rounded-lg" />
          <div className="h-8 w-20 bg-[#141B28] rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default WebsiteVideosTableShimmer;
