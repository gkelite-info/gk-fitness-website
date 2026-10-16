import { useRouter } from "next/navigation";
import { DotsThreeVertical } from "@phosphor-icons/react";
import { DemoRequestItem } from "@/app/actions/demoRequests";
import Pagination from "@/app/(screens)/components/reusable/Pagination";

interface DemoRequestsTableProps {
  items: DemoRequestItem[];
  currentPage: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  onSelectRequest?: (item: DemoRequestItem) => void;
  loading?: boolean;
}

export function DemoRequestsTable({
  items,
  currentPage,
  pageSize,
  totalCount,
  onPageChange,
  onSelectRequest,
  loading = false,
}: DemoRequestsTableProps) {
  const router = useRouter();
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const currentItems = items.slice(startIndex, startIndex + pageSize);

  const getPlanBadge = (plan: DemoRequestItem["plan"]) => {
    const p = (plan || "Basic").toLowerCase();
    if (p.includes("platinum")) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#A855F7]/20 border border-[#A855F7]/45 text-[#C084FC]">
          Platinum
        </span>
      );
    }
    if (p.includes("gold")) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#F59E0B]/20 border border-[#F59E0B]/45 text-[#FBBF24]">
          Gold
        </span>
      );
    }
    if (p.includes("silver")) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#3B82F6]/20 border border-[#3B82F6]/45 text-[#60A5FA]">
          Silver
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#10B981]/20 border border-[#10B981]/45 text-[#34D399]">
        {plan || "Basic"}
      </span>
    );
  };

  const getStatusBadge = (status: DemoRequestItem["status"]) => {
    switch (status) {
      case "Pending":
      case "New":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#10B981]/15 text-[#34D399] border border-[#10B981]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            Pending
          </span>
        );
      case "Contacted":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#3B82F6]/15 text-[#60A5FA] border border-[#3B82F6]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
            Contacted
          </span>
        );
      case "Demo Scheduled":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#8B5CF6]/15 text-[#C084FC] border border-[#8B5CF6]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
            Demo Scheduled
          </span>
        );
      case "Converted":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#06B6D4]/15 text-[#22D3EE] border border-[#06B6D4]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
            Converted
          </span>
        );
      case "Not Interested":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EF4444]/15 text-[#F87171] border border-[#EF4444]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
            Not Interested
          </span>
        );
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full bg-[#0C101A] border border-[#1C2333] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1050px]">
            <thead>
              <tr className="bg-[#0F1420] border-b border-[#1C2333] text-[11px] font-bold text-[#8E99AB] uppercase tracking-wider">
                <th className="py-3.5 px-4 w-12 text-center">#</th>
                <th className="py-3.5 px-4">Owner Name</th>
                <th className="py-3.5 px-4">Gym Name</th>
                <th className="py-3.5 px-4">City</th>
                <th className="py-3.5 px-4">Mobile Number</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-3 text-center">Plan</th>
                <th className="py-3.5 px-3 text-center">Members</th>
                <th className="py-3.5 px-4">Requested On</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#171E2C] text-xs">
              {loading ? (
                [1, 2, 3, 4, 5, 6].map((i) => (
                  <tr key={i} className="animate-pulse hover:bg-[#121826]/75 transition-colors">
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
                ))
              ) : currentItems.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-16 text-center text-xs text-[#64748B]">
                    No demo requests found matching your filters.
                  </td>
                </tr>
              ) : (
                currentItems.map((item, index) => {
                  const rowNum = startIndex + index + 1;
                return (
                  <tr
                    key={item.id}
                    className="hover:bg-[#121826]/75 transition-colors group"
                  >
                    <td className="py-4 px-4 text-center font-medium text-[#64748B]">
                      {rowNum}
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#18233A] border border-[#2B3B5E] flex items-center justify-center text-[11px] font-bold text-[#60A5FA] shrink-0">
                          {item.initials}
                        </div>
                        <span className="font-semibold text-white whitespace-nowrap">
                          {item.ownerName}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-[#CBD5E1] font-medium whitespace-nowrap">
                      {item.gymName}
                    </td>

                    <td className="py-4 px-4 text-[#94A3B8] whitespace-nowrap">
                      {item.city}
                    </td>

                    <td className="py-4 px-4 text-[#CBD5E1] whitespace-nowrap font-mono">
                      {item.mobile}
                    </td>

                    <td className="py-4 px-4 text-[#94A3B8] whitespace-nowrap">
                      {item.email}
                    </td>

                    <td className="py-4 px-3 text-center whitespace-nowrap">
                      {getPlanBadge(item.plan)}
                    </td>

                    <td className="py-4 px-3 text-center font-semibold text-white">
                      {item.members}
                    </td>

                    <td className="py-4 px-4 text-[#8E99AB] whitespace-nowrap">
                      {item.requestedOn}
                    </td>

                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>

                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => router.push(`/superadmin/demo-requests/${item.id}`)}
                          className="px-3 py-1.5 rounded-lg bg-[#141A28] border border-[#232C40] hover:border-[#D4FF32]/50 hover:bg-[#1B2234] hover:text-[#D4FF32] text-white text-xs font-semibold transition-all cursor-pointer"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => router.push(`/superadmin/demo-requests/${item.id}`)}
                          className="p-1.5 text-[#64748B] hover:text-white rounded-lg hover:bg-[#1E2536] transition-colors cursor-pointer"
                        >
                          <DotsThreeVertical size={16} weight="bold" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
            </tbody>
          </table>
        </div>
      </div>

      {loading ? (
        <div className="p-4 border-t border-[#1C2333] flex items-center justify-between animate-pulse">
          <div className="h-4 w-36 bg-[#141B28] rounded" />
          <div className="flex items-center gap-2">
            <div className="h-8 w-20 bg-[#141B28] rounded-lg" />
            <div className="h-8 w-20 bg-[#141B28] rounded-lg" />
          </div>
        </div>
      ) : (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalCount}
          itemsPerPage={pageSize}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
