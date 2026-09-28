"use client";

import { useState } from "react";
import { Phone, CaretDown } from "@phosphor-icons/react";
import { PersonalDetailsData } from "./types";
import Dropdown from "../Dropdown";

interface EmergencyContactCardProps {
  data: PersonalDetailsData["emergencyContact"];
}

export default function EmergencyContactCard({ data }: EmergencyContactCardProps) {
  const [relation, setRelation] = useState(data.relationship || "Sister");

  return (
    <div className="flex flex-col items-start p-6 gap-5 w-full bg-[#11151D] border border-[#242C3A] shadow-sm rounded-2xl">
      
      <div className="flex flex-row justify-between items-center pb-4 w-full border-b border-[#242C3A]/60">
        <div className="flex flex-row items-center gap-2.5">
          <Phone size={20} className="text-[#CCFF00]" weight="bold" />
          <h3 className="font-sans font-extrabold text-xs leading-4 tracking-[1.2px] uppercase text-[#CCFF00] m-0">
            Emergency Contact
          </h3>
        </div>
        <span className="font-sans font-medium text-[11px] leading-4 text-[#7E8B9F]">
          Primary Relation
        </span>
      </div>

      <div className="flex flex-col items-start gap-3.5 w-full">
        
        <div className="flex flex-col sm:flex-row gap-3.5 w-full">
          <div className="flex flex-col items-start p-3.5 gap-1 w-full bg-[#171C26] border border-[#242C3A] rounded-xl flex-1">
            <span className="font-sans font-bold text-[10px] leading-[15px] tracking-[0.5px] uppercase text-[#7E8B9F]">
              Contact Name
            </span>
            <span className="font-sans font-bold text-sm leading-5 text-white">
              {data.contactName}
            </span>
          </div>
          
          <div className="flex flex-col items-start p-3.5 gap-1 w-full bg-[#171C26] border border-[#242C3A] rounded-xl flex-1">
            <span className="font-sans font-bold text-[10px] leading-[15px] tracking-[0.5px] uppercase text-[#7E8B9F]">
              Relationship
            </span>
            <div className="w-full relative -mt-1 -mb-1">
              <Dropdown
                options={[
                  { label: "Sister", value: "Sister" },
                  { label: "Brother", value: "Brother" },
                  { label: "Mother", value: "Mother" },
                  { label: "Father", value: "Father" },
                  { label: "Spouse", value: "Spouse" },
                  { label: "Friend", value: "Friend" },
                  { label: "Other", value: "Other" },
                ]}
                value={relation}
                onChange={setRelation}
                triggerClassName="flex flex-row justify-between items-center w-full bg-transparent border-none cursor-pointer outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center p-3.5 w-full bg-[#171C26] border border-[#242C3A] rounded-xl">
          <div className="flex flex-col items-start gap-1">
            <span className="font-sans font-bold text-[10px] leading-[15px] tracking-[0.5px] uppercase text-[#7E8B9F]">
              Contact Phone Number
            </span>
            <span className="font-sans font-bold text-sm leading-5 tracking-[0.35px] text-white">
              {data.phone}
            </span>
          </div>
          <button className="flex items-center justify-center w-8 h-8 bg-[#11151D] border border-[#242C3A] rounded-lg hover:bg-white/5 transition-colors">
            <Phone size={16} className="text-[#CCFF00]" weight="bold" />
          </button>
        </div>

      </div>

    </div>
  );
}
