import { Suspense } from "react";
import AddGlobalTrainerView from "@/app/(screens)/components/reusable/trainers/add/AddGlobalTrainerView";

export default function AddTrainerPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-[#0C0D10] flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#D4FF32] border-t-transparent animate-spin" />
        </div>
      }
    >
      <AddGlobalTrainerView />
    </Suspense>
  );
}
