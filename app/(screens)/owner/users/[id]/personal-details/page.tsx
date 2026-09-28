import React from "react";
import PersonalDetailsView, { PersonalDetailsData } from "../../../../components/reusable/PersonalDetailsView";

export default async function PersonalDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  // Mock data matching the design
  const mockData: PersonalDetailsData = {
    id: resolvedParams.id,
    memberCode: "MEM-000124",
    name: "Riya Sharma",
    status: "Active",
    avatarUrl: undefined,
    assignedTrainer: "Vikram Malhotra",
    primaryGoal: "Weight Gain & Hypertrophy",
    personalInfo: {
      fullName: "Riya Sharma",
      gender: "Female",
      dateOfBirth: "12 Mar 2001",
      age: "23 Years",
      email: "riya.sharma@email.com",
      phone: "+91 98765 43210",
    },
    address: {
      fullAddress: "101, Green Park Apartments, Andheri West",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400058",
    },
    healthInfo: {
      height: "165",
      weight: "58",
    },
    emergencyContact: {
      contactName: "Neha Sharma",
      relationship: "Sister",
      phone: "+91 91234 56789",
    },
    additionalInfo: {
      fitnessGoal: "Weight Gain",
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-[#090D13]">
      <PersonalDetailsView data={mockData} />
    </div>
  );
}
