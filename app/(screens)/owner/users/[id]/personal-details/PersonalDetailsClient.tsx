"use client";

import { useMemo } from "react";
import PersonalDetailsView, { PersonalDetailsData } from "@/app/(screens)/components/reusable/PersonalDetailsView";
import { useGymCustomerById } from "@/lib/hooks/customers/useGymCustomers";
import { useUserById } from "@/lib/hooks/users/useUsers";
import { useAssignedTrainersByCustomer } from "@/lib/hooks/customerTrainers/useCustomerTrainers";
import { useCustomerOnboardingData } from "@/lib/hooks/customers/useCustomerOnboardingData";
import { useCustomerGoalPreference } from "@/lib/hooks/customers/useCustomerGoalPreferences";

export default function PersonalDetailsClient({ id }: { id: string }) {
  const { data: gymCustomer, isLoading: isCustomerLoading } = useGymCustomerById(id);
  const { data: user, isLoading: isUserLoading } = useUserById(id);
  const { data: trainersData, isLoading: isTrainersLoading } = useAssignedTrainersByCustomer(id);
  const { data: onboardingData, isLoading: isOnboardingLoading } = useCustomerOnboardingData(id);
  const { data: goalPreference, isLoading: isGoalLoading } = useCustomerGoalPreference(id);

  const calculateAge = (dob: string | undefined | null) => {
    if (!dob) return "-";
    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) return "-";
    const diff_ms = Date.now() - birthDate.getTime();
    const age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970) + " Years";
  };

  const mockData: PersonalDetailsData = useMemo(() => {
    const isGymCustomerActive = gymCustomer?.is_Active === true;
    const isUserActive = user?.status === "active";
    const status = (isGymCustomerActive && isUserActive) ? "Active" : "Inactive";
    const assignedTrainer = trainersData && trainersData.length > 0 && trainersData[0]?.trainer?.fullName 
      ? trainersData[0].trainer.fullName 
      : "-";

    return {
      id,
      memberCode: gymCustomer?.memberCode || "-",
      name: gymCustomer?.fullName || "-",
      status,
      avatarUrl: gymCustomer?.user?.profilePhoto || user?.profilePhoto || undefined,
      assignedTrainer,
      primaryGoal: onboardingData?.primaryGoal || "-",
      personalInfo: {
        fullName: gymCustomer?.fullName || "-",
        gender: gymCustomer?.gender ? gymCustomer.gender.charAt(0).toUpperCase() + gymCustomer.gender.slice(1) : "-",
        dateOfBirth: gymCustomer?.dateOfBirth || "-",
        age: calculateAge(gymCustomer?.dateOfBirth),
        email: gymCustomer?.email || user?.email || "-",
        phone: gymCustomer?.phone || user?.phone || "-",
      },
      address: {
        fullAddress: user?.address || "-",
        city: user?.city || "-",
        state: user?.state || "-",
        pincode: user?.pincode ? String(user.pincode) : "-",
      },
      healthInfo: {
        height: onboardingData?.height || "-",
        weight: onboardingData?.weight || "-",
      },
      emergencyContact: {
        contactName: gymCustomer?.emergencyContactName || "-",
        relationship: gymCustomer?.relationship ? gymCustomer.relationship.charAt(0).toUpperCase() + gymCustomer.relationship.slice(1) : "-",
        phone: gymCustomer?.emergencyContactNumber || "-",
      },
      additionalInfo: {
        fitnessGoal: goalPreference?.fitnessGoal 
          ? goalPreference.fitnessGoal.charAt(0).toUpperCase() + goalPreference.fitnessGoal.slice(1).toLowerCase() 
          : "-",
      }
    };
  }, [gymCustomer, user, trainersData, onboardingData, goalPreference, id]);

  if (isCustomerLoading || isUserLoading || isTrainersLoading || isOnboardingLoading || isGoalLoading) {
    return (
      <div className="flex flex-col w-full h-full bg-[#090D13] items-center justify-center">
        <span className="text-white">Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full bg-[#090D13]">
      <PersonalDetailsView data={mockData} />
    </div>
  );
}
