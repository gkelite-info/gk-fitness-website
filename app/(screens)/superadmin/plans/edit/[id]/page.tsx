"use client";

import { useParams } from "next/navigation";
import PlanForm from "../../components/PlanForm";

export default function EditPlanPage() {
  const params = useParams();
  const id = params.id;
  
  
  const mockInitialData = {
    planName: "Gold",
    labelName: "White Label",
    planFor: "gym_owner",
    price: "3499",
    selectedFeatures: [
      "Own Gym Label",
      "Biometric Management System",
      "Multiple Owner Login",
      "Customer Management",
      "Attendance Tracking"
    ]
  };

  return <PlanForm isEdit={true} initialData={mockInitialData} />;
}
