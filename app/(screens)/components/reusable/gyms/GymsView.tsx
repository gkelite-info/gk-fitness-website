"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import GymCard from "../cards/GymCard";
import GymListRow from "./GymListRow";
import GymsHeader from "./GymsHeader";
import GymsFilterTabs from "./GymsFilterTabs";
import ConfirmationModal from "../ConfirmationModal";
import Pagination from "../Pagination";
import toast from "react-hot-toast";
import { GymItem, GymFilterTab, GymSortOption, ViewMode, getInitialGyms } from "./types";

export default function GymsView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const tabParam = (searchParams.get("tab") as GymFilterTab) || "all";
  const currentTab: GymFilterTab = ["all", "active", "inactive"].includes(tabParam)
    ? tabParam
    : "all";

  const monthParam = searchParams.get("month") || "";

  const [gymsList, setGymsList] = useState<GymItem[]>(getInitialGyms);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<GymSortOption>("recent");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [gymToDelete, setGymToDelete] = useState<GymItem | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleTabChange = (newTab: GymFilterTab) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", newTab);
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
    setCurrentPage(1);
  };

  const handleMonthChange = (newMonth: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newMonth) {
      params.set("month", newMonth);
    } else {
      params.delete("month");
    }
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  const counts = useMemo(() => {
    let baseList = gymsList;
    if (monthParam) {
      baseList = baseList.filter((g) => g.registeredMonth === monthParam);
    }
    const active = baseList.filter((g) => g.status === "active").length;
    const inactive = baseList.filter((g) => g.status === "inactive").length;
    return { all: baseList.length, active, inactive };
  }, [gymsList, monthParam]);

  const filteredGyms = useMemo(() => {
    let list = gymsList;
    if (currentTab === "active") list = list.filter((g) => g.status === "active");
    if (currentTab === "inactive") list = list.filter((g) => g.status === "inactive");

    if (monthParam) {
      list = list.filter((g) => g.registeredMonth === monthParam);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (g) =>
          g.name.toLowerCase().includes(q) ||
          g.area.toLowerCase().includes(q) ||
          g.city.toLowerCase().includes(q) ||
          g.status.toLowerCase().includes(q) ||
          `${g.name} - ${g.area}`.toLowerCase().includes(q) ||
          `${g.city} • ${g.area}`.toLowerCase().includes(q)
      );
    }

    if (sortOption === "name") {
      list = [...list].sort((a, b) => a.area.localeCompare(b.area));
    } else if (sortOption === "members") {
      list = [...list].sort((a, b) => b.totalMembers - a.totalMembers);
    }

    return list;
  }, [gymsList, currentTab, monthParam, searchQuery, sortOption]);

  const totalPages = Math.ceil(filteredGyms.length / itemsPerPage) || 1;
  const paginatedGyms = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredGyms.slice(start, start + itemsPerPage);
  }, [filteredGyms, currentPage]);

  const handleDeleteClick = (gym: GymItem) => {
    setGymToDelete(gym);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!gymToDelete) return;
    setGymsList((prev) => prev.filter((g) => g.id !== gymToDelete.id));
    toast.success(`Gym "${gymToDelete.name} - ${gymToDelete.area}" deleted successfully`, {
      id: "delete-gym-toast",
    });
    setIsDeleteModalOpen(false);
    setGymToDelete(null);
  };

  return (
    <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-full overflow-x-hidden min-w-0">
      <GymsHeader
        totalCount={counts.all}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        onAddGym={() => router.push("/superadmin/gyms/create")}
      />

      <GymsFilterTabs
        currentTab={currentTab}
        onTabChange={handleTabChange}
        counts={counts}
        sortOption={sortOption}
        onSortChange={setSortOption}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        selectedMonth={monthParam}
        onMonthChange={handleMonthChange}
      />

      {paginatedGyms.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[380px] sm:min-h-[460px] p-8 sm:p-14 rounded-2xl bg-[#13151D] border border-[#222634] text-center w-full">
          <p className="text-base sm:text-lg font-bold text-white mb-1.5">No gyms found</p>
          <p className="text-xs sm:text-sm text-[#94A3B8]">Try adjusting your search query, tab, or month filter</p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 min-w-0 w-full">
          {paginatedGyms.map((gym) => (
            <GymCard
              key={gym.id}
              gym={gym}
              onSelect={(g) => router.push(`/superadmin/gyms/${g.id}`)}
              onEdit={(g) => router.push(`/superadmin/gyms/${g.id}/edit`)}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {paginatedGyms.map((gym) => (
            <GymListRow
              key={gym.id}
              gym={gym}
              onSelect={(g) => router.push(`/superadmin/gyms/${g.id}`)}
              onEdit={(g) => router.push(`/superadmin/gyms/${g.id}/edit`)}
              onDelete={handleDeleteClick}
            />
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredGyms.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setGymToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Gym"
        message={`Are you sure you want to delete "${gymToDelete?.name} - ${gymToDelete?.area}"? This action cannot be undone.`}
        confirmText="Delete Gym"
        isDestructive={true}
      />
    </div>
  );
}
