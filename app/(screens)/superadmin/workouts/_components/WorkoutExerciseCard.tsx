"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Play,
  PencilSimple,
  Trash,
  Barbell,
  ArrowsClockwise,
  Eye,
} from "@phosphor-icons/react";
import { WorkoutVideoItem, EQUIPMENT_OPTIONS, DIFFICULTY_OPTIONS } from "@/lib/types/workouts";
import { getWorkoutMediaUrl } from "@/lib/helpers/workoutVideos/workoutVideoHelper";

interface WorkoutExerciseCardProps {
  exercise: WorkoutVideoItem;
  onPreview: (exercise: WorkoutVideoItem) => void;
  onDelete: (exercise: WorkoutVideoItem) => void;
}

export function WorkoutExerciseCard({
  exercise,
  onPreview,
  onDelete,
}: WorkoutExerciseCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const mediaUrl = getWorkoutMediaUrl(exercise.videoUrl);
  const isGif = exercise.videoUrl?.toLowerCase().endsWith(".gif");

  const diffConfig = DIFFICULTY_OPTIONS.find(
    (d) => d.id === (exercise.difficulty || "intermediate").toLowerCase()
  ) || DIFFICULTY_OPTIONS[1];

  const role = exercise.workouts?.role || "male";
  const workoutType = exercise.workouts?.workoutType || "workout";

  return (
    <div
      className="bg-[#12141A] border border-[#232631] rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:border-[#383E50] hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Media Preview Box */}
      <div className="relative aspect-[16/10] bg-[#0A0B0E] overflow-hidden flex items-center justify-center cursor-pointer" onClick={() => onPreview(exercise)}>
        {mediaUrl ? (
          isGif ? (
            <img
              src={mediaUrl}
              alt={exercise.exerciseName || "Exercise preview"}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <video
              src={mediaUrl}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              autoPlay={isHovered}
            />
          )
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 text-[#475569]">
            <Barbell size={36} weight="duotone" />
            <span className="text-xs">No preview</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[#D4FF32] border border-[#D4FF32]/30">
            {workoutType}
          </span>
          <span
            className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md backdrop-blur-md border ${
              role === "female"
                ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                : "bg-blue-500/20 text-blue-300 border-blue-500/30"
            }`}
          >
            {role}
          </span>
        </div>

        <div className="absolute top-2.5 right-2.5 flex items-center gap-1">
          <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-black/70 backdrop-blur-md text-[#94A3B8] border border-white/10">
            {isGif ? "GIF" : "VIDEO"}
          </span>
        </div>

        {/* Play Overlay Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-11 h-11 rounded-full bg-[#D4FF32] text-black flex items-center justify-center shadow-[0_0_20px_rgba(212,255,50,0.6)] transform scale-90 group-hover:scale-100 transition-transform">
            <Play size={20} weight="fill" className="ml-0.5" />
          </div>
        </div>

        {/* Bottom Specs Strip over preview */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-md backdrop-blur-md"
              style={{
                backgroundColor: diffConfig.bg,
                color: diffConfig.color,
                borderColor: diffConfig.border,
                borderWidth: 1,
              }}
            >
              {diffConfig.label}
            </span>
          </div>

          <span className="text-[11px] font-semibold text-white/90 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
            {exercise.defaultSets ?? 3} Sets × {exercise.defaultReps || "10-12"}
          </span>
        </div>
      </div>

      {/* Card Info Content */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <h3
            className="text-sm font-bold text-white leading-tight line-clamp-1 hover:text-[#D4FF32] transition-colors cursor-pointer"
            onClick={() => onPreview(exercise)}
            title={exercise.exerciseName || "Untitled Exercise"}
          >
            {exercise.exerciseName || "Untitled Exercise"}
          </h3>

          {/* Primary / Secondary Muscles */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            {exercise.primaryMuscle && (
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#181A20] text-[#E2E8F0] border border-[#2B303E]">
                🎯 {exercise.primaryMuscle}
              </span>
            )}
            {exercise.secondaryMuscles &&
              exercise.secondaryMuscles.slice(0, 2).map((m, idx) => (
                <span
                  key={idx}
                  className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-[#16181F] text-[#94A3B8] border border-[#232733]"
                >
                  {m}
                </span>
              ))}
            {exercise.secondaryMuscles && exercise.secondaryMuscles.length > 2 && (
              <span className="text-[10px] text-[#64748B]">
                +{exercise.secondaryMuscles.length - 2}
              </span>
            )}
          </div>

          {/* Equipment Pills */}
          <div className="flex flex-wrap items-center gap-1 mt-2.5">
            {(exercise.equipment || ["BODY_ONLY"]).map((eqId, idx) => {
              const eqMeta = EQUIPMENT_OPTIONS.find((e) => e.id === eqId);
              return (
                <span
                  key={idx}
                  className="text-[10px] font-medium px-2 py-0.5 rounded bg-[#1C202B] text-[#A5B4FC] border border-[#2D3346]"
                >
                  {eqMeta?.label || eqId}
                </span>
              );
            })}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-[#1F222C] mt-1">
          <button
            onClick={() => onPreview(exercise)}
            className="text-xs font-semibold text-[#94A3B8] hover:text-[#D4FF32] transition-colors flex items-center gap-1.5"
          >
            <Eye size={15} />
            <span>Preview</span>
          </button>

          <div className="flex items-center gap-1.5">
            <Link
              href={`/superadmin/workouts/edit/${exercise.workoutVideoId}`}
              className="p-1.5 rounded-lg bg-[#181A20] border border-[#262A36] text-[#94A3B8] hover:text-[#D4FF32] hover:border-[#D4FF32]/40 transition-all"
              title="Edit exercise"
            >
              <PencilSimple size={15} />
            </Link>

            <button
              onClick={() => onDelete(exercise)}
              className="p-1.5 rounded-lg bg-[#181A20] border border-[#262A36] text-[#94A3B8] hover:text-red-400 hover:border-red-500/40 transition-all"
              title="Delete exercise"
            >
              <Trash size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
