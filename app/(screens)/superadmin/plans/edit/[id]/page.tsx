"use client";

import { useParams } from "next/navigation";
import PlanForm from "../../components/PlanForm";
import { useSubscription } from "@/lib/hooks/superadmin/subscriptions/subscriptions";

export default function EditPlanPage() {
  const params = useParams();
  const id = params.id as string;
  const { data: dbPlan, isLoading } = useSubscription(id);

  if (isLoading) {
    return (
      <div className="w-full h-full p-8 flex items-center justify-center bg-[#0C0D10] text-white">
        <p className="text-sm text-[#9CA3AF]">Loading plan details...</p>
      </div>
    );
  }

  const activeFeatures = (dbPlan?.subscription_features || [])
    .filter((f: any) => !f.is_deleted)
    .map((f: any) => f.featureName);

  const initialData = dbPlan ? {
    subscriptionPlanId: dbPlan.subscriptionPlanId,
    planName: dbPlan.planName,
    labelName: dbPlan.label || "",
    planFor: dbPlan.planFor,
    price: dbPlan.price != null ? String(dbPlan.price) : "",
    selectedFeatures: activeFeatures,
  } : undefined;

  return <PlanForm isEdit={true} initialData={initialData} />;
}
