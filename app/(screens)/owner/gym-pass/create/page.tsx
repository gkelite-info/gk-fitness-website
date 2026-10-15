import { Suspense } from "react";
import CreateGymPassView from "@/app/(screens)/components/reusable/gym-pass/CreateGymPassView";

export default function OwnerCreateGymPassPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0C0D10]" />}>
      <CreateGymPassView />
    </Suspense>
  );
}
