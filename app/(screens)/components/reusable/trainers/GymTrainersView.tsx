"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import TrainersHeader from "./TrainersHeader";
import GymTrainersKpiSection from "./GymTrainersKpiSection";
import TrainersSearchBar from "./TrainersSearchBar";
import TrainerCard from "./TrainerCard";
import Pagination from "../Pagination";
import { MOCK_GYM_TRAINERS, GYM_TRAINERS_KPIS } from "./mockData";
import { TrainerItem, TrainerSortOption } from "./types";

const ITEMS_PER_PAGE = 6;

export default function GymTrainersView() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<TrainerSortOption>("recent");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTrainers = useMemo(() => {
    let list = [...MOCK_GYM_TRAINERS];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.specialization.toLowerCase().includes(q) ||
          t.skills?.some((s) => s.toLowerCase().includes(q))
      );
    }

    if (sortOption === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === "experience") {
      list.sort((a, b) => b.experienceYears - a.experienceYears);
    } else if (sortOption === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [searchQuery, sortOption]);

  const totalPages = Math.ceil(filteredTrainers.length / ITEMS_PER_PAGE);
  const paginatedTrainers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTrainers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTrainers, currentPage]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleTrainerSelect = (trainer: TrainerItem) => {
    router.push(
      `/superadmin/gyms/gym-1/trainers/${trainer.id}?from=${encodeURIComponent("/superadmin/trainers?tab=gym-trainers")}`
    );
  };

  return (
    <div className="flex flex-col gap-6 w-full min-w-0">
      <TrainersHeader
        title="Gym Trainers"
        subtitle="Power Fitness, Hyderabad"
      />

      <GymTrainersKpiSection kpis={GYM_TRAINERS_KPIS} />

      <TrainersSearchBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        count={filteredTrainers.length}
        label="All Trainers"
        sortOption={sortOption}
        onSortChange={setSortOption}
        showSort={true}
      />

      {paginatedTrainers.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full min-w-0">
          {paginatedTrainers.map((trainer: TrainerItem) => (
            <TrainerCard
              key={trainer.id}
              trainer={trainer}
              variant="gym"
              onClick={handleTrainerSelect}
            />
          ))}
        </div>
      ) : (
        <div className="w-full py-16 flex flex-col items-center justify-center text-center bg-[#0F141E] border border-[#1C2536] rounded-2xl">
          <span className="text-base font-semibold text-white">
            No gym trainers found
          </span>
          <span className="text-xs text-[#94A3B8] mt-1">
            Try adjusting your search query
          </span>
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredTrainers.length}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
