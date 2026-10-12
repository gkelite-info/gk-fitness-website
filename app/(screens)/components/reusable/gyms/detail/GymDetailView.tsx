"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import GymDetailHeader from "./GymDetailHeader";
import GymDetailFilters from "./GymDetailFilters";
import MemberRowCard from "./MemberRowCard";
import Pagination from "../../Pagination";
import {
  MemberItem,
  DetailTab,
  DetailStatus,
  getFullCustomersList,
  getTrainersList,
  INITIAL_OWNERS,
} from "./types";

interface GymDetailViewProps {
  gymId: string;
}

export default function GymDetailView({ gymId }: GymDetailViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const tabParam = (searchParams.get("tab") as DetailTab) || "customers";
  const activeTab: DetailTab = ["customers", "trainers", "owners"].includes(tabParam)
    ? tabParam
    : "customers";

  const [customersList] = useState<MemberItem[]>(() => getFullCustomersList());
  const [trainersList] = useState<MemberItem[]>(() => getTrainersList());
  const [ownersList] = useState<MemberItem[]>(INITIAL_OWNERS);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<DetailStatus>("all");
  const [sortOption, setSortOption] = useState("active");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const currentDataset =
    activeTab === "customers"
      ? customersList
      : activeTab === "trainers"
      ? trainersList
      : ownersList;

  const counts = useMemo(() => {
    const active = currentDataset.filter((m) => m.status === "active").length;
    const inactive = currentDataset.filter((m) => m.status === "inactive").length;
    return { all: currentDataset.length, active, inactive };
  }, [currentDataset]);

  const headerCounts = useMemo(
    () => ({
      customers: customersList.length,
      trainers: trainersList.length,
      owners: ownersList.length,
    }),
    [customersList, trainersList, ownersList]
  );

  const handleTabChange = (tab: DetailTab) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
    setCurrentPage(1);
    setStatusFilter("all");
    setSearchQuery("");
  };

  const filteredMembers = useMemo(() => {
    let list = currentDataset;
    if (statusFilter === "active") list = list.filter((m) => m.status === "active");
    if (statusFilter === "inactive") list = list.filter((m) => m.status === "inactive");

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((m) => m.name.toLowerCase().includes(q) || m.phone.includes(q));
    }

    if (sortOption === "active") {
      list = [...list].sort((a, b) => (a.status === "active" ? -1 : 1));
    } else if (sortOption === "inactive") {
      list = [...list].sort((a, b) => (a.status === "inactive" ? -1 : 1));
    } else if (sortOption === "name") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [currentDataset, statusFilter, searchQuery, sortOption]);

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage) || 1;
  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredMembers.slice(start, start + itemsPerPage);
  }, [filteredMembers, currentPage]);

  return (
    <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
      <GymDetailHeader
        gymName="Gold Fitness"
        activeTab={activeTab}
        onTabChange={handleTabChange}
        counts={headerCounts}
      />

      <GymDetailFilters
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
        statusFilter={statusFilter}
        onStatusChange={(st) => {
          setStatusFilter(st);
          setCurrentPage(1);
        }}
        counts={counts}
        sortOption={sortOption}
        onSortChange={setSortOption}
        activeTabLabel={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
      />

      {paginatedMembers.length === 0 ? (
        <div className="w-full p-12 text-center rounded-2xl bg-[#141A24] border border-[#202939]">
          <p className="text-base font-bold text-white mb-1">No members found</p>
          <p className="text-xs text-[#94A3B8]">Try adjusting your search query or filter</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {paginatedMembers.map((member) => {
            const roleSlug =
              member.role === "trainer"
                ? "trainers"
                : member.role === "owner"
                ? "owners"
                : "customers";

            return (
              <MemberRowCard
                key={member.id}
                member={member}
                isOwnerTab={activeTab === "owners"}
                onSelect={(m) => router.push(`/superadmin/gyms/${gymId}/${roleSlug}/${m.id}`)}
              />
            );
          })}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredMembers.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
