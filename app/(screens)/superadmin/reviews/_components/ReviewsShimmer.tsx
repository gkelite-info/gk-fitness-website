interface ReviewsShimmerProps {
  viewMode: "cards" | "table";
}

export function ReviewsShimmer({ viewMode }: ReviewsShimmerProps) {
  if (viewMode === "table") {
    return (
      <div className="w-full bg-[#0B0E14] border border-[#1B2232] rounded-2xl overflow-hidden shadow-xl animate-pulse">
        <div className="w-full overflow-x-auto scrollbar-themed">
          <table className="w-full min-w-[840px] text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1B2232] bg-[#0E121A]/80 text-[#64748B] text-xs font-semibold uppercase tracking-wider">
                <th scope="col" className="py-4 px-3 w-10 text-center">
                  <div className="w-5 h-5 rounded bg-[#161D2B] mx-auto" />
                </th>
                <th scope="col" className="py-4 px-4 w-60">
                  <div className="h-3 w-20 bg-[#161D2B] rounded" />
                </th>
                <th scope="col" className="py-4 px-3 w-32">
                  <div className="h-3 w-14 bg-[#161D2B] rounded" />
                </th>
                <th scope="col" className="py-4 px-3 w-36">
                  <div className="h-3 w-16 bg-[#161D2B] rounded" />
                </th>
                <th scope="col" className="py-4 px-4">
                  <div className="h-3 w-24 bg-[#161D2B] rounded" />
                </th>
                <th scope="col" className="py-4 px-3 w-32">
                  <div className="h-3 w-20 bg-[#161D2B] rounded" />
                </th>
                <th scope="col" className="py-4 px-3 w-28">
                  <div className="h-3 w-14 bg-[#161D2B] rounded" />
                </th>
                <th scope="col" className="py-4 px-4 w-32 text-right">
                  <div className="h-3 w-16 bg-[#161D2B] rounded ml-auto" />
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#171E2C]/60">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <tr key={i} className="hover:bg-[#121622]/40 transition-colors">
                  <td className="py-4 px-3 text-center">
                    <div className="w-5 h-5 rounded bg-[#141B28] mx-auto" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#141B28] shrink-0" />
                      <div className="flex flex-col gap-1.5 min-w-0">
                        <div className="h-3.5 w-28 bg-[#141B28] rounded" />
                        <div className="h-2.5 w-36 bg-[#141B28]/60 rounded" />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-3">
                    <div className="h-5 w-20 rounded-md bg-[#141B28]" />
                  </td>
                  <td className="py-4 px-3">
                    <div className="h-3.5 w-24 bg-[#141B28] rounded" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col gap-1">
                      <div className="h-3 w-48 bg-[#141B28] rounded" />
                      <div className="h-2.5 w-32 bg-[#141B28]/60 rounded" />
                    </div>
                  </td>
                  <td className="py-4 px-3">
                    <div className="h-3 w-20 bg-[#141B28] rounded" />
                  </td>
                  <td className="py-4 px-3">
                    <div className="h-6 w-20 rounded-full bg-[#141B28]" />
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <div className="w-7 h-7 rounded-lg bg-[#141B28]" />
                      <div className="w-7 h-7 rounded-lg bg-[#141B28]" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 w-full">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="bg-[#0B0E14] border border-[#1B2232] rounded-2xl p-5 flex flex-col justify-between gap-4 animate-pulse"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[#141B28] shrink-0" />
              <div className="flex flex-col gap-1.5">
                <div className="h-4 w-28 bg-[#141B28] rounded" />
                <div className="h-3 w-20 bg-[#141B28]/60 rounded" />
              </div>
            </div>
            <div className="h-6 w-18 rounded-full bg-[#141B28]" />
          </div>

          <div className="flex items-center gap-1">
            <div className="h-3.5 w-20 bg-[#141B28] rounded" />
          </div>

          <div className="flex flex-col gap-2">
            <div className="h-3 w-full bg-[#141B28] rounded" />
            <div className="h-3 w-5/6 bg-[#141B28] rounded" />
            <div className="h-3 w-2/3 bg-[#141B28] rounded" />
          </div>

          <div className="w-full h-24 rounded-xl bg-[#141B28]" />

          <div className="pt-3 border-t border-[#161D2B] flex items-center justify-between">
            <div className="h-3 w-20 bg-[#141B28] rounded" />
            <div className="flex items-center gap-2">
              <div className="h-8 w-18 rounded-xl bg-[#141B28]" />
              <div className="h-8 w-8 rounded-xl bg-[#141B28]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

