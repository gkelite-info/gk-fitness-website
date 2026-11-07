"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getWorkoutVideoByIdAction } from "@/app/actions/workoutVideos";
import { WorkoutVideoItem } from "@/lib/types/workouts";
import { UploadWorkoutHeader } from "../../upload/_components/UploadWorkoutHeader";
import { WorkoutFormContainer } from "../../upload/_components/WorkoutFormContainer";

interface EditWorkoutPageProps {
  params: Promise<{ id: string }>;
}

export default function EditWorkoutPage({ params }: EditWorkoutPageProps) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [exercise, setExercise] = useState<WorkoutVideoItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadExercise() {
      if (!resolvedParams?.id) return;
      setLoading(true);
      const res = await getWorkoutVideoByIdAction(resolvedParams.id);
      if (res.success && res.data) {
        setExercise(res.data);
      } else {
        toast.error(res.error || "Exercise demonstration not found");
        router.push("/superadmin/workouts");
      }
      setLoading(false);
    }
    loadExercise();
  }, [resolvedParams?.id, router]);

  if (loading) {
    return (
      <div className="w-full flex flex-col gap-6 p-4 sm:p-6 lg:p-8 min-h-screen bg-[#0C0D10]">
        <div className="h-10 w-48 bg-[#12141A] rounded-xl animate-pulse" />
        <div className="w-full h-96 bg-[#12141A] border border-[#232631] rounded-2xl animate-pulse" />
      </div>
    );
  }

  if (!exercise) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-6 p-4 sm:p-6 lg:p-8 min-h-screen bg-[#0C0D10]">
      <UploadWorkoutHeader isEditing />
      <WorkoutFormContainer initialExercise={exercise} />
    </div>
  );
}
