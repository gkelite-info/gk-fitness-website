export function DemoRequestsListShimmer() {
  return (
    <div className="w-full flex flex-col gap-6 p-4 sm:p-6 lg:p-8 text-white min-h-[calc(100vh-101px)] animate-pulse">
      <div className="flex flex-col gap-2">
        <div className="h-8 w-48 sm:w-64 bg-[#141B28] rounded-xl" />
        <div className="h-4 w-72 sm:w-96 bg-[#141B28] rounded-lg" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-4 sm:p-5 rounded-2xl bg-[#0E131E] border border-[#1C2638] flex flex-col justify-between h-28 sm:h-32"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 w-20 bg-[#1A2234] rounded-md" />
              <div className="w-8 h-8 rounded-xl bg-[#1A2234]" />
            </div>
            <div className="h-7 w-16 bg-[#1A2234] rounded-lg mt-2" />
          </div>
        ))}
      </div>

      <div className="p-4 rounded-2xl bg-[#0E131E] border border-[#1C2638] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="h-10 flex-1 bg-[#070A10] border border-[#1C2638] rounded-xl" />
        <div className="flex items-center gap-2 overflow-x-auto">
          <div className="h-10 w-28 bg-[#141B28] border border-[#1C2638] rounded-xl shrink-0" />
          <div className="h-10 w-28 bg-[#141B28] border border-[#1C2638] rounded-xl shrink-0" />
          <div className="h-10 w-32 bg-[#141B28] border border-[#1C2638] rounded-xl shrink-0" />
          <div className="h-10 w-20 bg-[#141B28] border border-[#1C2638] rounded-xl shrink-0" />
        </div>
      </div>

      <div className="w-full bg-[#0C101A] border border-[#1C2333] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1050px]">
            <thead>
              <tr className="bg-[#0F1420] border-b border-[#1C2333]">
                <th className="py-4 px-4 w-12"><div className="h-3 w-4 bg-[#1A2234] rounded mx-auto" /></th>
                <th className="py-4 px-4"><div className="h-3 w-24 bg-[#1A2234] rounded" /></th>
                <th className="py-4 px-4"><div className="h-3 w-20 bg-[#1A2234] rounded" /></th>
                <th className="py-4 px-4"><div className="h-3 w-16 bg-[#1A2234] rounded" /></th>
                <th className="py-4 px-4"><div className="h-3 w-24 bg-[#1A2234] rounded" /></th>
                <th className="py-4 px-4"><div className="h-3 w-20 bg-[#1A2234] rounded" /></th>
                <th className="py-4 px-3"><div className="h-3 w-14 bg-[#1A2234] rounded mx-auto" /></th>
                <th className="py-4 px-3"><div className="h-3 w-16 bg-[#1A2234] rounded mx-auto" /></th>
                <th className="py-4 px-4"><div className="h-3 w-24 bg-[#1A2234] rounded" /></th>
                <th className="py-4 px-4"><div className="h-3 w-20 bg-[#1A2234] rounded mx-auto" /></th>
                <th className="py-4 px-4"><div className="h-3 w-14 bg-[#1A2234] rounded mx-auto" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#171E2C]">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <tr key={i} className="hover:bg-[#121826]/75 transition-colors">
                  <td className="py-4 px-4 text-center">
                    <div className="h-4 w-4 bg-[#141B28] rounded mx-auto" />
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#18233A] shrink-0" />
                      <div className="h-4 w-28 bg-[#141B28] rounded-md" />
                    </div>
                  </td>
                  <td className="py-4 px-4"><div className="h-4 w-24 bg-[#141B28] rounded-md" /></td>
                  <td className="py-4 px-4"><div className="h-4 w-20 bg-[#141B28] rounded-md" /></td>
                  <td className="py-4 px-4"><div className="h-4 w-24 bg-[#141B28] rounded-md" /></td>
                  <td className="py-4 px-4"><div className="h-4 w-32 bg-[#141B28] rounded-md" /></td>
                  <td className="py-4 px-3"><div className="h-5 w-16 bg-[#141B28] rounded-full mx-auto" /></td>
                  <td className="py-4 px-3"><div className="h-4 w-8 bg-[#141B28] rounded mx-auto" /></td>
                  <td className="py-4 px-4"><div className="h-4 w-28 bg-[#141B28] rounded-md" /></td>
                  <td className="py-4 px-4"><div className="h-6 w-24 bg-[#141B28] rounded-full mx-auto" /></td>
                  <td className="py-4 px-4"><div className="h-7 w-16 bg-[#141B28] rounded-xl mx-auto" /></td>
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
    </div>
  );
}

export default DemoRequestsListShimmer;
