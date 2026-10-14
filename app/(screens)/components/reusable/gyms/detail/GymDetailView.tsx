"use client";

import { useState } from "react";
import GymDetailOverviewHeader from "./GymDetailOverviewHeader";
import GymIdentityAndKpiSection from "./GymIdentityAndKpiSection";
import GymOwnerAndAddressSection from "./GymOwnerAndAddressSection";
import GymContactAndActionsSection from "./GymContactAndActionsSection";
import { INITIAL_GYMS } from "../types";

interface GymDetailViewProps {
  gymId: string;
}

export default function GymDetailView({ gymId }: GymDetailViewProps) {
  const matchedGym = INITIAL_GYMS.find((g) => g.id === gymId);

  const [gymState, setGymState] = useState({
    name: matchedGym?.name || "PowerHouse Gym",
    status: (matchedGym?.status || "active") as "active" | "inactive",
    location: matchedGym
      ? `${matchedGym.area}, ${matchedGym.city}`
      : "Hyderabad, Telangana",
    registeredDate: matchedGym?.since
      ? matchedGym.since.replace("Since ", "")
      : "20 Jul 2026",
    gymCode: matchedGym?.id ? `GYM-${matchedGym.id.replace("gym-", "100")}` : "GYM-1001",
    totalCustomers: matchedGym?.totalMembers || 325,
    totalTrainers: 18,
    ownerName: "Rahul Sharma",
    ownerEmail: "rahul.sharma@powerhousegym.com",
    ownerPhone: matchedGym?.phone || "+91 98765 43210",
    ownerAvatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
    address: "Plot No. 45, Hitech City Road, Madhapur, Hyderabad, Telangana - 500081",
    phone: "+91 40 1234 5678",
    email: matchedGym?.email || "info@powerhousegym.com",
    website: "www.powerhousegym.com",
  });

  const handleStatusToggle = (newStatus: "active" | "inactive") => {
    setGymState((prev) => ({ ...prev, status: newStatus }));
  };

  return (
    <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-full overflow-x-hidden min-w-0">
      <GymDetailOverviewHeader />

      <GymIdentityAndKpiSection
        gymName={gymState.name}
        status={gymState.status}
        location={gymState.location}
        registeredDate={gymState.registeredDate}
        gymCode={gymState.gymCode}
        totalCustomers={gymState.totalCustomers}
        totalTrainers={gymState.totalTrainers}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full min-w-0 items-stretch">
        <GymOwnerAndAddressSection
          className="lg:col-span-7"
          ownerName={gymState.ownerName}
          ownerEmail={gymState.ownerEmail}
          ownerPhone={gymState.ownerPhone}
          ownerAvatarUrl={gymState.ownerAvatarUrl}
          address={gymState.address}
        />

        <GymContactAndActionsSection
          className="lg:col-span-5"
          gymId={gymId}
          gymName={gymState.name}
          phone={gymState.phone}
          email={gymState.email}
          website={gymState.website}
          status={gymState.status}
          onStatusToggle={handleStatusToggle}
        />
      </div>
    </div>
  );
}
