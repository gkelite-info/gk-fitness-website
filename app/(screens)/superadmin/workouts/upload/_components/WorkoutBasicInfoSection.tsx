"use client";

import {
  WORKOUT_CATEGORIES,
  DIFFICULTY_OPTIONS,
} from "@/lib/types/workouts";

interface WorkoutBasicInfoSectionProps {
  exerciseName: string;
  onExerciseNameChange: (val: string) => void;
  workoutType: string;
  onWorkoutTypeChange: (val: string) => void;
  role: "male" | "female";
  onRoleChange: (val: "male" | "female") => void;
  difficulty: "beginner" | "intermediate" | "advanced";
  onDifficultyChange: (val: "beginner" | "intermediate" | "advanced") => void;
}

export function WorkoutBasicInfoSection({
  exerciseName,
  onExerciseNameChange,
  workoutType,
  onWorkoutTypeChange,
  role,
  onRoleChange,
  difficulty,
  onDifficultyChange,
}: WorkoutBasicInfoSectionProps) {
  return (
    <div className="bg-[#12141A] border border-[#232631] rounded-2xl p-5 sm:p-6 flex flex-col gap-5 w-full">
      <div>
        <h2 className="text-sm sm:text-base font-bold text-white">
          1. General Exercise Details
        </h2>
        <p className="text-xs text-[#94A3B8] mt-0.5">
          Define the exercise identity, category, and target audience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Exercise Name */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-xs font-semibold text-[#CBD5E1]">
            Exercise Name <span className="text-[#D4FF32]">*</span>
          </label>
          <input
            type="text"
            value={exerciseName}
            onChange={(e) => onExerciseNameChange(e.target.value)}
            placeholder="e.g. Incline Dumbbell Bench Press"
            className="w-full bg-[#181A20] border border-[#262A36] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#D4FF32] transition-colors"
            required
          />
        </div>

        {/* Category */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#CBD5E1]">
            Muscle Group / Category <span className="text-[#D4FF32]">*</span>
          </label>
          <select
            value={workoutType}
            onChange={(e) => onWorkoutTypeChange(e.target.value)}
            className="w-full bg-[#181A20] border border-[#262A36] rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4FF32] transition-colors cursor-pointer"
          >
            {WORKOUT_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Target Gender */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#CBD5E1]">
            Demonstration Gender <span className="text-[#D4FF32]">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2 h-[42px]">
            <button
              type="button"
              onClick={() => onRoleChange("male")}
              className={`flex items-center justify-center gap-1.5 rounded-xl text-xs font-semibold transition-all border ${
                role === "male"
                  ? "bg-blue-500/20 text-blue-300 border-blue-500/50 shadow-[0_0_12px_rgba(59,130,246,0.3)]"
                  : "bg-[#181A20] text-[#94A3B8] border-[#262A36] hover:text-white"
              }`}
            >
              <span>👨 Male Athlete</span>
            </button>
            <button
              type="button"
              onClick={() => onRoleChange("female")}
              className={`flex items-center justify-center gap-1.5 rounded-xl text-xs font-semibold transition-all border ${
                role === "female"
                  ? "bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                  : "bg-[#181A20] text-[#94A3B8] border-[#262A36] hover:text-white"
              }`}
            >
              <span>👩 Female Athlete</span>
            </button>
          </div>
        </div>

        {/* Difficulty */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-xs font-semibold text-[#CBD5E1]">
            Difficulty Level
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {DIFFICULTY_OPTIONS.map((diff) => {
              const active = difficulty === diff.id;
              return (
                <button
                  key={diff.id}
                  type="button"
                  onClick={() =>
                    onDifficultyChange(diff.id as "beginner" | "intermediate" | "advanced")
                  }
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border text-center ${
                    active
                      ? "shadow-[0_0_15px_rgba(0,0,0,0.5)] scale-[1.01]"
                      : "bg-[#181A20] text-[#94A3B8] border-[#262A36] hover:text-white"
                  }`}
                  style={
                    active
                      ? {
                          backgroundColor: diff.bg,
                          color: diff.color,
                          borderColor: diff.color,
                        }
                      : {}
                  }
                >
                  {diff.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
