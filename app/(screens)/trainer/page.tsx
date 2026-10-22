import { Suspense } from "react";
import { getTrainerIndividualClients } from "@/app/actions/trainer/getTrainerIndividualClients";
import TrainerIndividualMembershipsView from "../components/reusable/trainers/TrainerIndividualMembershipsView";

export default async function TrainerDashboard() {
  const initialData = await getTrainerIndividualClients("all");

  return (
    <div className="min-h-screen bg-[#0C0D10] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <span className="text-[#D7FF00] text-xs uppercase font-semibold tracking-wider">
            Trainer Coaching Portal
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-white mt-1">
            Client Memberships & Schedules
          </h1>
          <p className="text-[#8E8E93] text-xs md:text-sm mt-1">
            Monitor your personal training clients, active membership durations, and payment logs.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="space-y-4">
              <div className="h-28 bg-[#141414] border border-[#222222] rounded-2xl animate-pulse" />
              <div className="h-96 bg-[#141414] border border-[#222222] rounded-3xl animate-pulse" />
            </div>
          }
        >
          <TrainerIndividualMembershipsView initialData={initialData} />
        </Suspense>
      </div>
    </div>
  );
}
