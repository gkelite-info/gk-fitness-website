"use client";

import { Suspense } from "react";
import { UploadWorkoutHeader } from "./_components/UploadWorkoutHeader";
import { WorkoutFormContainer } from "./_components/WorkoutFormContainer";

function UploadWorkoutContent() {
  return (
    <div className="w-full flex flex-col gap-6 p-4 sm:p-6 lg:p-8 min-h-screen bg-[#0C0D10]">
      <UploadWorkoutHeader />
      <WorkoutFormContainer />
    </div>
  );
}

export default function UploadWorkoutPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full p-8 text-center text-[#94A3B8]">
          Loading exercise upload screen...
        </div>
      }
    >
      <UploadWorkoutContent />
    </Suspense>
  );
}
