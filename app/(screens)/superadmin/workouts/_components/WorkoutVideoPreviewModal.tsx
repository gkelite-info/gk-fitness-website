"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, PencilSimple, Barbell, Play, Sparkle } from "@phosphor-icons/react";
import { WorkoutVideoItem, EQUIPMENT_OPTIONS, DIFFICULTY_OPTIONS } from "@/lib/types/workouts";
import { getWorkoutMediaUrl } from "@/lib/helpers/workoutVideos/workoutVideoHelper";

interface WorkoutVideoPreviewModalProps {
  exercise: WorkoutVideoItem | null;
  onClose: () => void;
}

export function WorkoutVideoPreviewModal({
  exercise,
  onClose,
}: WorkoutVideoPreviewModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!exercise) return null;

  const mediaUrl = getWorkoutMediaUrl(exercise.videoUrl);
  const isGif = exercise.videoUrl?.toLowerCase().endsWith(".gif");
  const diffConfig = DIFFICULTY_OPTIONS.find(
    (d) => d.id === (exercise.difficulty || "intermediate").toLowerCase()
  ) || DIFFICULTY_OPTIONS[1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-[#0E1015] border border-[#232631] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#1F222C]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#D4FF32]/10 border border-[#D4FF32]/20 flex items-center justify-center">
              <Barbell size={20} weight="fill" className="text-[#D4FF32]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white line-clamp-1">
                {exercise.exerciseName || "Exercise Demonstration"}
              </h2>
              <span className="text-xs text-[#94A3B8]">
                Category: {exercise.workouts?.workoutType || "N/A"} • Gender: {exercise.workouts?.role || "male"}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-[#181A20] border border-[#262A36] text-[#94A3B8] hover:text-white flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-[16/10] bg-black flex items-center justify-center overflow-hidden">
          {mediaUrl ? (
            isGif ? (
              <img
                src={mediaUrl}
                alt={exercise.exerciseName || "Demonstration"}
                className="w-full h-full object-contain"
              />
            ) : (
              <video
                src={mediaUrl}
                className="w-full h-full object-contain"
                controls
                autoPlay
                loop
                playsInline
              />
            )
          ) : (
            <div className="text-sm text-[#64748B]">No demonstration video available</div>
          )}
        </div>

        {/* Specs Details */}
        <div className="p-5 flex flex-col gap-4 overflow-y-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#141720] border border-[#232733] rounded-xl p-3">
              <span className="text-[11px] text-[#94A3B8] font-medium block">Difficulty</span>
              <span
                className="text-xs font-bold mt-1 inline-block px-2 py-0.5 rounded"
                style={{
                  backgroundColor: diffConfig.bg,
                  color: diffConfig.color,
                  border: `1px solid ${diffConfig.border}`,
                }}
              >
                {diffConfig.label}
              </span>
            </div>

            <div className="bg-[#141720] border border-[#232733] rounded-xl p-3">
              <span className="text-[11px] text-[#94A3B8] font-medium block">Default Sets</span>
              <span className="text-sm font-bold text-white mt-0.5 block">
                {exercise.defaultSets ?? 3} Sets
              </span>
            </div>

            <div className="bg-[#141720] border border-[#232733] rounded-xl p-3">
              <span className="text-[11px] text-[#94A3B8] font-medium block">Default Reps</span>
              <span className="text-sm font-bold text-white mt-0.5 block">
                {exercise.defaultReps || "10-12"}
              </span>
            </div>

            <div className="bg-[#141720] border border-[#232733] rounded-xl p-3">
              <span className="text-[11px] text-[#94A3B8] font-medium block">Primary Muscle</span>
              <span className="text-xs font-bold text-[#D4FF32] mt-0.5 block">
                {exercise.primaryMuscle || "CHEST"}
              </span>
            </div>
          </div>

          {/* Equipment */}
          <div>
            <h4 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">
              Required Equipment
            </h4>
            <div className="flex flex-wrap gap-2">
              {(exercise.equipment || ["BODY_ONLY"]).map((eqId, idx) => {
                const eqMeta = EQUIPMENT_OPTIONS.find((e) => e.id === eqId);
                return (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-3 py-1 rounded-xl bg-[#181A20] border border-[#2B303E] text-white"
                  >
                    🏋️ {eqMeta?.label || eqId}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Secondary Muscles */}
          {exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-2">
                Secondary Target Muscles
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {exercise.secondaryMuscles.map((muscle, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium px-2.5 py-1 rounded-lg bg-[#141720] border border-[#232733] text-[#CBD5E1]"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-[#1F222C] bg-[#0A0C0F]">
          <span className="text-xs text-[#64748B] font-mono truncate max-w-xs">
            ID: {exercise.workoutVideoId}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#181A20] border border-[#262A36] text-sm text-[#94A3B8] hover:text-white transition-colors"
            >
              Close
            </button>
            <Link
              href={`/superadmin/workouts/edit/${exercise.workoutVideoId}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D4FF32] text-black text-sm font-semibold hover:bg-[#c2ed25] transition-colors"
            >
              <PencilSimple size={16} weight="bold" />
              <span>Edit Exercise</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
