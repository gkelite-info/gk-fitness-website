"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Check, CircleNotch } from "@phosphor-icons/react";
import { saveWorkoutVideoAction } from "@/app/actions/workoutVideos";
import { WorkoutVideoItem, WORKOUT_CATEGORIES } from "@/lib/types/workouts";
import { WorkoutBasicInfoSection } from "./WorkoutBasicInfoSection";
import { WorkoutCustomTargetSection } from "./WorkoutCustomTargetSection";
import { WorkoutVideoSection } from "./WorkoutVideoSection";

interface WorkoutFormContainerProps {
  initialExercise?: WorkoutVideoItem | null;
}

export function WorkoutFormContainer({ initialExercise }: WorkoutFormContainerProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialCat =
    initialExercise?.workouts?.workoutType || "chest";
  const initialCatConfig =
    WORKOUT_CATEGORIES.find((c) => c.value === initialCat) || WORKOUT_CATEGORIES[0];

  const [exerciseName, setExerciseName] = useState(initialExercise?.exerciseName || "");
  const [workoutType, setWorkoutType] = useState(initialCat);
  const [role, setRole] = useState<"male" | "female">(
    (initialExercise?.workouts?.role as "male" | "female") || "male"
  );
  const [difficulty, setDifficulty] = useState<"beginner" | "intermediate" | "advanced">(
    (initialExercise?.difficulty as "beginner" | "intermediate" | "advanced") || "intermediate"
  );

  const [equipment, setEquipment] = useState<string[]>(
    initialExercise?.equipment && initialExercise.equipment.length > 0
      ? initialExercise.equipment
      : ["BODY_ONLY"]
  );
  const [primaryMuscle, setPrimaryMuscle] = useState(
    initialExercise?.primaryMuscle || initialCatConfig.primaryMuscle
  );
  const [secondaryMuscles, setSecondaryMuscles] = useState<string[]>(
    initialExercise?.secondaryMuscles || []
  );
  const [defaultSets, setDefaultSets] = useState(initialExercise?.defaultSets ?? 3);
  const [defaultReps, setDefaultReps] = useState(initialExercise?.defaultReps || "10-12");

  const [videoUrl, setVideoUrl] = useState(initialExercise?.videoUrl || "");

  const handleWorkoutTypeChange = (newType: string) => {
    setWorkoutType(newType);
    const cat = WORKOUT_CATEGORIES.find((c) => c.value === newType);
    if (cat) {
      setPrimaryMuscle(cat.primaryMuscle);
    }
  };

  const handleToggleEquipment = (eqId: string) => {
    setEquipment((prev) => {
      if (prev.includes(eqId)) {
        const next = prev.filter((id) => id !== eqId);
        return next.length === 0 ? ["BODY_ONLY"] : next;
      } else {
        return [...prev.filter((id) => id !== "BODY_ONLY"), eqId];
      }
    });
  };

  const handleToggleSecondaryMuscle = (muscle: string) => {
    setSecondaryMuscles((prev) =>
      prev.includes(muscle) ? prev.filter((m) => m !== muscle) : [...prev, muscle]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!exerciseName.trim()) {
      toast.error("Please enter an exercise name");
      return;
    }
    if (!videoUrl.trim()) {
      toast.error("Please provide or upload a video / GIF demonstration file");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading(
      initialExercise ? "Updating exercise demonstration..." : "Saving exercise to library..."
    );

    try {
      const res = await saveWorkoutVideoAction({
        workoutVideoId: initialExercise?.workoutVideoId,
        exerciseName,
        workoutType,
        role,
        difficulty,
        equipment,
        primaryMuscle,
        secondaryMuscles,
        defaultSets,
        defaultReps,
        videoUrl,
      });

      if (!res.success) {
        throw new Error(res.error || "Failed to save exercise");
      }

      toast.success(
        initialExercise
          ? "Exercise updated successfully!"
          : "Exercise demonstration created successfully!",
        { id: toastId }
      );

      router.push("/superadmin/workouts");
    } catch (err: any) {
      toast.error(err.message || "Failed to save exercise", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full max-w-4xl">
      <WorkoutBasicInfoSection
        exerciseName={exerciseName}
        onExerciseNameChange={setExerciseName}
        workoutType={workoutType}
        onWorkoutTypeChange={handleWorkoutTypeChange}
        role={role}
        onRoleChange={setRole}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
      />

      <WorkoutCustomTargetSection
        equipment={equipment}
        onToggleEquipment={handleToggleEquipment}
        primaryMuscle={primaryMuscle}
        onPrimaryMuscleChange={setPrimaryMuscle}
        secondaryMuscles={secondaryMuscles}
        onToggleSecondaryMuscle={handleToggleSecondaryMuscle}
        defaultSets={defaultSets}
        onDefaultSetsChange={setDefaultSets}
        defaultReps={defaultReps}
        onDefaultRepsChange={setDefaultReps}
      />

      <WorkoutVideoSection
        videoUrl={videoUrl}
        onVideoUrlChange={setVideoUrl}
      />

      {/* Submit Buttons */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => router.push("/superadmin/workouts")}
          disabled={isSubmitting}
          className="px-5 py-2.5 rounded-xl bg-[#181A20] border border-[#262A36] text-sm font-semibold text-[#94A3B8] hover:text-white transition-colors"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#D4FF32] text-black text-sm font-bold hover:bg-[#c2ed25] transition-all shadow-[0_4px_16px_rgba(212,255,50,0.25)] active:scale-[0.98] disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <CircleNotch size={18} className="animate-spin" />
              <span>Saving Exercise...</span>
            </>
          ) : (
            <>
              <Check size={18} weight="bold" />
              <span>{initialExercise ? "Save Changes" : "Create Exercise"}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
