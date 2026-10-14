"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import TrainersHeader from "./TrainersHeader";
import GlobalTrainersKpiSection from "./GlobalTrainersKpiSection";
import TrainersSearchBar from "./TrainersSearchBar";
import TrainerCard from "./TrainerCard";
import Pagination from "../Pagination";
import ConfirmationModal from "../ConfirmationModal";
import { GLOBAL_TRAINERS_KPIS, MOCK_GLOBAL_TRAINERS } from "./mockData";
import { TrainerItem, TrainerSortOption } from "./types";

const ITEMS_PER_PAGE = 6;

export default function GlobalTrainersView() {
  const router = useRouter();
  const [trainersList, setTrainersList] = useState<TrainerItem[]>(MOCK_GLOBAL_TRAINERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<TrainerSortOption>("recent");
  const [currentPage, setCurrentPage] = useState(1);
  const [trainerToDelete, setTrainerToDelete] = useState<TrainerItem | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const filteredTrainers = useMemo(() => {
    let list = [...trainersList];

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
  }, [trainersList, searchQuery, sortOption]);

  const totalPages = Math.ceil(filteredTrainers.length / ITEMS_PER_PAGE);
  const paginatedTrainers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTrainers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTrainers, currentPage]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleSortChange = (sort: TrainerSortOption) => {
    setSortOption(sort);
    setCurrentPage(1);
  };

  const handleConfirmDelete = () => {
    if (!trainerToDelete) return;
    setTrainersList((prev) => prev.filter((t) => t.id !== trainerToDelete.id));
    toast.success(`Trainer "${trainerToDelete.name}" removed successfully`, {
      id: "trainer-delete-toast",
    });
    setIsDeleteModalOpen(false);
    setTrainerToDelete(null);
  };

  return (
    <div className="flex flex-col gap-6 w-full min-w-0">
      <TrainersHeader
        title="Global Trainers"
        subtitle="Manage and oversee all global trainers"
        showAddButton
        onAddTrainer={() => router.push("/superadmin/trainers/add")}
      />

      <GlobalTrainersKpiSection kpis={GLOBAL_TRAINERS_KPIS} />

      <TrainersSearchBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        count={filteredTrainers.length}
        label="All Trainers"
        sortOption={sortOption}
        onSortChange={handleSortChange}
        showSort
      />

      {paginatedTrainers.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5 w-full min-w-0">
          {paginatedTrainers.map((trainer: TrainerItem) => (
            <TrainerCard
              key={trainer.id}
              trainer={trainer}
              variant="global"
              onView={(t) => router.push(`/superadmin/trainers/${t.id}`)}
              onEdit={(t) => router.push(`/superadmin/trainers/${t.id}/edit`)}
              onDelete={(t) => {
                setTrainerToDelete(t);
                setIsDeleteModalOpen(true);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="w-full py-16 flex flex-col items-center justify-center text-center bg-[#0F141E] border border-[#1C2536] rounded-2xl">
          <span className="text-base font-semibold text-white">
            No trainers found
          </span>
          <span className="text-xs text-[#94A3B8] mt-1">
            Try adjusting your search query or filters
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

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setTrainerToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Remove Global Trainer"
        message={`Are you sure you want to remove "${trainerToDelete?.name || "this trainer"}"? This action cannot be undone.`}
        confirmText="Remove Trainer"
        cancelText="Cancel"
      />
    </div>
  );
}
