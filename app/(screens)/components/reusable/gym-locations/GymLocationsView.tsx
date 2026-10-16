"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GymLocationsHeader from "./GymLocationsHeader";
import GymLocationsKpis from "./GymLocationsKpis";
import GymLocationsFilterBar from "./GymLocationsFilterBar";
import GymLocationCard from "./GymLocationCard";
import Pagination from "@/app/(screens)/components/reusable/Pagination";
import { initialGymLocations, getGymLocations } from "./gymLocationsData";
import { GymLocationItem, GymLocationsKpiStats } from "./gymLocationsTypes";

export default function GymLocationsView() {
  const router = useRouter();
  const [gyms, setGyms] = useState<GymLocationItem[]>(initialGymLocations);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setGyms(getGymLocations());

    const handleUpdate = () => {
      setGyms(getGymLocations());
    };

    window.addEventListener("gymLocationsUpdated", handleUpdate);
    return () => window.removeEventListener("gymLocationsUpdated", handleUpdate);
  }, []);

  const stats: GymLocationsKpiStats = {
    totalGyms: gyms.length,
    locationsAdded: gyms.filter((g) => g.status === "added").length,
    locationsPending: gyms.filter((g) => g.status === "not_added").length,
  };

  const filteredGyms = gyms.filter((gym) => {
    const search = searchTerm.toLowerCase().trim();
    const matchesSearch =
      search === "" ||
      gym.name.toLowerCase().includes(search) ||
      gym.ownerName.toLowerCase().includes(search) ||
      gym.location.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "all" || gym.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filteredGyms.length / itemsPerPage));
  const paginatedGyms = filteredGyms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAction = (gym: GymLocationItem) => {
    router.push(`/superadmin/gym-locations/${gym.id}`);
  };

  return (
    <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-5 sm:gap-6 max-w-[1600px] mx-auto overflow-x-hidden min-w-0">
      <GymLocationsHeader />

      <GymLocationsKpis stats={stats} />

      <GymLocationsFilterBar
        searchTerm={searchTerm}
        onSearchChange={(val) => {
          setSearchTerm(val);
          setCurrentPage(1);
        }}
        statusFilter={statusFilter}
        onStatusChange={(val) => {
          setStatusFilter(val);
          setCurrentPage(1);
        }}
      />

      {paginatedGyms.length > 0 ? (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {paginatedGyms.map((gym) => (
            <GymLocationCard
              key={gym.id}
              gym={gym}
              onAction={handleAction}
            />
          ))}
        </div>
      ) : (
        <div className="w-full bg-[#13151B] border border-[#232631] rounded-2xl p-12 text-center text-[#64748B] flex flex-col items-center justify-center gap-2">
          <span className="text-sm font-medium">No gym locations match your search or filters.</span>
        </div>
      )}

      <div className="w-full bg-[#13151B] border border-[#232631] rounded-2xl px-4 py-3 sm:py-3.5 shadow-sm">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={filteredGyms.length}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
          hideBorder
        />
      </div>
    </div>
  );
}
