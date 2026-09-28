"use client";

import React from "react";
import PersonalDetailsHeader from "./personal-details/PersonalDetailsHeader";
import MemberIdentityBanner from "./personal-details/MemberIdentityBanner";
import PersonalInfoCard from "./personal-details/PersonalInfoCard";
import AddressCard from "./personal-details/AddressCard";
import HealthInfoCard from "./personal-details/HealthInfoCard";
import EmergencyContactCard from "./personal-details/EmergencyContactCard";
import AdditionalInfoCard from "./personal-details/AdditionalInfoCard";
import { PersonalDetailsData } from "./personal-details/types";

// Re-export type for consumers
export type { PersonalDetailsData };

interface PersonalDetailsViewProps {
  data: PersonalDetailsData;
  onEdit?: () => void;
}

export default function PersonalDetailsView({ data, onEdit }: PersonalDetailsViewProps) {
  return (
    <div className="flex flex-col items-start px-4 sm:px-8 py-6 gap-6 w-full max-w-[1024px] mx-auto overflow-y-auto scrollbar-themed h-full">
      
      {/* Header with Back Button and Edit Button */}
      <PersonalDetailsHeader memberCode={data.memberCode} onEdit={onEdit} />

      {/* Member Identity Banner */}
      <MemberIdentityBanner data={data} />

      {/* Main Grid Content */}
      <div className="flex flex-col lg:flex-row items-stretch gap-6 w-full shrink-0 pb-6">
        
        {/* Left Column (7 cols equivalent) */}
        <div className="flex flex-col gap-6 w-full lg:flex-[7]">
          <div className="shrink-0"><PersonalInfoCard data={data.personalInfo} /></div>
          <div className="flex-1"><AddressCard data={data.address} /></div>
        </div>

        {/* Right Column (5 cols equivalent) */}
        <div className="flex flex-col gap-6 w-full lg:flex-[5]">
          <div className="shrink-0"><HealthInfoCard data={data.healthInfo} /></div>
          <div className="shrink-0"><EmergencyContactCard data={data.emergencyContact} /></div>
          <div className="flex-1"><AdditionalInfoCard data={data.additionalInfo} /></div>
        </div>

      </div>

    </div>
  );
}
