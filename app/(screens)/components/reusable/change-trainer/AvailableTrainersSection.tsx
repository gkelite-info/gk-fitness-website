"use client";

import { useState } from "react";
import TrainerSearchFilters from "./TrainerSearchFilters";
import AvailableTrainersGrid from "./AvailableTrainersGrid";
import { useGymTrainers } from "@/lib/hooks/trainers/useGymTrainers";
import { useGymCustomerById } from "@/lib/hooks/customers/useGymCustomers";
import { useAssignedTrainersByCustomer } from "@/lib/hooks/customerTrainers/useCustomerTrainers";

export default function AvailableTrainersSection({ customerId }: { customerId: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const { data: customer } = useGymCustomerById(customerId);
  const { data: trainers, isLoading: isTrainersLoading } = useGymTrainers(customer?.gymId, !!customer?.gymId, searchQuery);
  const { data: assignedTrainers, isLoading: isAssignedLoading } = useAssignedTrainersByCustomer(customerId);

  const isLoading = isTrainersLoading || isAssignedLoading;

  const assignedTrainerIds = assignedTrainers?.map((at: any) => at.gymTrainerId || at.trainerId) || [];
  
  let filteredTrainers = trainers?.filter((t: any) => !assignedTrainerIds.includes(t.gymTrainerId || t.id)) || [];

  if (activeFilter !== "All") {
    filteredTrainers = filteredTrainers.filter((t: any) => {
      const spec = t.specialization || t.specialty || "";
      return spec.toLowerCase().includes(activeFilter.toLowerCase());
    });
  }

  return (
    <>
      <TrainerSearchFilters 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        activeFilter={activeFilter} 
        setActiveFilter={setActiveFilter} 
      />
      <AvailableTrainersGrid trainers={filteredTrainers} isLoading={isLoading} customerId={customerId} />
    </>
  );
}
