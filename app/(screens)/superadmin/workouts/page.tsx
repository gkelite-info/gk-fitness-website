"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import {
  getWorkoutVideosAction,
  deleteWorkoutVideoAction,
  getWorkoutVideoStatsAction,
} from "@/app/actions/workoutVideos";
import { WorkoutVideoItem, WorkoutVideoStats } from "@/lib/types/workouts";
import Pagination from "@/app/(screens)/components/reusable/Pagination";
import { WorkoutsHeader } from "./_components/WorkoutsHeader";
import { WorkoutsStatsBar } from "./_components/WorkoutsStatsBar";
import { WorkoutsFilters } from "./_components/WorkoutsFilters";
import { WorkoutExerciseCard } from "./_components/WorkoutExerciseCard";
import { WorkoutVideoPreviewModal } from "./_components/WorkoutVideoPreviewModal";
import { WorkoutDeleteModal } from "./_components/WorkoutDeleteModal";
import { Barbell } from "@phosphor-icons/react";

export default function WorkoutsCatalogPage() {
  const [exercises, setExercises] = useState<WorkoutVideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedEquipment, setSelectedEquipment] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [stats, setStats] = useState<WorkoutVideoStats>({
    total: 0,
    male: 0,
    female: 0,
    chestUpper: 0,
    backArms: 0,
    legsCore: 0,
  });

  const [previewExercise, setPreviewExercise] = useState<WorkoutVideoItem | null>(null);
  const [deletingExercise, setDeletingExercise] = useState<WorkoutVideoItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadStats = useCallback(async () => {
    const res = await getWorkoutVideoStatsAction();
    setStats(res);
  }, []);

  const loadExercises = useCallback(async () => {
    setLoading(true);
    const res = await getWorkoutVideosAction({
      query: searchQuery,
      workoutType: selectedCategory,
      role: selectedRole,
      difficulty: selectedDifficulty,
      equipment: selectedEquipment,
      page: currentPage,
      limit: pageSize,
    });

    if (res.success) {
      setExercises(res.data);
      setTotalCount(res.total);
      setTotalPages(res.totalPages);
    } else {
      toast.error(res.error || "Failed to load workout exercises");
    }
    setLoading(false);
  }, [
    searchQuery,
    selectedCategory,
    selectedRole,
    selectedDifficulty,
    selectedEquipment,
    currentPage,
    pageSize,
  ]);

  useEffect(() => {
    loadExercises();
    loadStats();
  }, [loadExercises, loadStats]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedRole("all");
    setSelectedDifficulty("all");
    setSelectedEquipment("all");
    setCurrentPage(1);
  };

  const handleConfirmDelete = async () => {
    if (!deletingExercise) return;
    setIsDeleting(true);
    const res = await deleteWorkoutVideoAction(deletingExercise.workoutVideoId);
    if (res.success) {
      toast.success("Exercise removed from library");
      setDeletingExercise(null);
      loadExercises();
      loadStats();
    } else {
      toast.error(res.error || "Failed to delete exercise");
    }
    setIsDeleting(false);
  };

  return (
    <div className="w-full flex flex-col gap-6 p-4 sm:p-6 lg:p-8 min-h-screen bg-[#0C0D10]">
      <WorkoutsHeader totalCount={totalCount} />
      <WorkoutsStatsBar stats={stats} />

      <WorkoutsFilters
        searchQuery={searchQuery}
        onSearchChange={(val) => {
          setSearchQuery(val);
          setCurrentPage(1);
        }}
        selectedCategory={selectedCategory}
        onCategoryChange={(val) => {
          setSelectedCategory(val);
          setCurrentPage(1);
        }}
        selectedRole={selectedRole}
        onRoleChange={(val) => {
          setSelectedRole(val);
          setCurrentPage(1);
        }}
        selectedDifficulty={selectedDifficulty}
        onDifficultyChange={(val) => {
          setSelectedDifficulty(val);
          setCurrentPage(1);
        }}
        selectedEquipment={selectedEquipment}
        onEquipmentChange={(val) => {
          setSelectedEquipment(val);
          setCurrentPage(1);
        }}
        onClearFilters={handleClearFilters}
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-[#12141A] border border-[#232631] rounded-2xl overflow-hidden aspect-[16/19] animate-pulse flex flex-col justify-between p-4"
            >
              <div className="w-full aspect-[16/10] bg-[#181A20] rounded-xl" />
              <div className="flex flex-col gap-2 mt-4">
                <div className="h-4 w-3/4 bg-[#181A20] rounded" />
                <div className="h-3 w-1/2 bg-[#181A20] rounded" />
              </div>
              <div className="h-8 w-full bg-[#181A20] rounded-xl mt-4" />
            </div>
          ))}
        </div>
      ) : exercises.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-[#12141A] border border-[#232631] rounded-3xl text-center gap-3">
          <div className="w-16 h-16 rounded-2xl bg-[#181A20] border border-[#262A36] flex items-center justify-center text-[#64748B]">
            <Barbell size={32} />
          </div>
          <h3 className="text-lg font-bold text-white mt-1">No Exercises Found</h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] max-w-sm">
            No workout exercises match your current search and filter selections.
          </p>
          <button
            onClick={handleClearFilters}
            className="mt-2 px-4 py-2 rounded-xl bg-[#D4FF32] text-black text-xs font-semibold hover:bg-[#c2ed25] transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
            {exercises.map((exercise) => (
              <WorkoutExerciseCard
                key={exercise.workoutVideoId}
                exercise={exercise}
                onPreview={(ex) => setPreviewExercise(ex)}
                onDelete={(ex) => setDeletingExercise(ex)}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-2">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalCount}
                itemsPerPage={pageSize}
                itemLabel="exercises"
                onPageChange={(p) => setCurrentPage(p)}
              />
            </div>
          )}
        </>
      )}

      {/* Modals */}
      <WorkoutVideoPreviewModal
        exercise={previewExercise}
        onClose={() => setPreviewExercise(null)}
      />

      <WorkoutDeleteModal
        exercise={deletingExercise}
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingExercise(null)}
      />
    </div>
  );
}
