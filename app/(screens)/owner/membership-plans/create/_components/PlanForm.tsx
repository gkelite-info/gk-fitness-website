import { useState } from "react";
import {
  Barbell,
  ForkKnife,
  Drop,
  ChartLineUp,
  CalendarBlank,
  FileText,
  UsersThree,
  Sparkle,
  Info,
} from "@phosphor-icons/react";
import FeatureCard from "./FeatureCard";
import Dropdown from "@/app/(screens)/components/reusable/Dropdown";

const ALL_FEATURES = [
  { id: "workout-plans", title: "Workout Plans", description: "Personalised workout plans for members", icon: Barbell },
  { id: "nutrition-plans", title: "Nutrition Plans", description: "Personalised nutrition plans for members", icon: ForkKnife },
  { id: "water-tracker", title: "Water Tracker", description: "Track daily water intake and stay hydrated", icon: Drop },
  { id: "progress-tracking", title: "Progress Tracking", description: "Track body progress and see your transformation", icon: ChartLineUp },
  { id: "attendance", title: "Attendance", description: "View gym attendance and workout history", icon: CalendarBlank },
  { id: "recipes", title: "Recipes", description: "Access healthy recipes and meal ideas", icon: FileText },
  { id: "community-access", title: "Community Access", description: "Connect and engage with the community", icon: UsersThree },
  { id: "ai-recommendations", title: "AI Recommendations", description: "AI-powered workout and nutrition suggestions", icon: Sparkle },
];

const DURATION_OPTIONS = [
  { label: "1 month", value: "1 month" },
  { label: "3 months", value: "3 months" },
  { label: "6 months", value: "6 months" },
  { label: "1 year", value: "1 year" },
];

export interface PlanData {
  id: string;
  name: string;
  price: string;
  duration: string;
  features: string[];
}

interface PlanFormProps {
  index: number;
  data: PlanData;
  onChange: (updated: PlanData) => void;
}

export default function PlanForm({ index, data, onChange }: PlanFormProps) {
  const toggleFeature = (id: string) => {
    const isSelected = data.features.includes(id);
    const newFeatures = isSelected
      ? data.features.filter((f) => f !== id)
      : [...data.features, id];
    onChange({ ...data, features: newFeatures });
  };

  return (
    <div className="box-border flex flex-col items-start p-6 gap-6 relative w-full bg-[#111419] border border-[#1D222B] rounded-[12px] isolate overflow-hidden">
      <div className="absolute w-1 left-[1px] top-[37px] bottom-[25px] bg-[#CCFF00] rounded-r-[4px] z-0" />

      <div className="flex flex-col items-start pt-[5.5px] gap-[11.5px] w-full z-10">
        <span className="font-['Inter'] font-[700] text-[11px] leading-[16px] flex items-center tracking-[0.55px] uppercase text-[#CCFF00]">
          PLAN {index + 1}
        </span>
      </div>

      <div className="flex flex-col items-start gap-1.5 w-full z-10">
        <label className="font-['Inter'] font-[500] text-[12px] leading-[16px] text-[#7E8796] flex items-center w-full">
          Plan Name
        </label>
        <div className="relative flex flex-col items-start w-full">
          <input
            type="text"
            value={data.name}
            onChange={(e) => {
              if (e.target.value.length <= 100) {
                onChange({ ...data, name: e.target.value });
              }
            }}
            placeholder="Basic Membership"
            className="box-border flex flex-row items-center px-4 py-2.5 w-full bg-[#0B0D10] border border-[#262D38] rounded-[8px] focus:outline-none focus:border-[#D4FF00] font-['Inter'] font-[400] text-[14px] leading-[20px] text-white placeholder-[#7E8796] transition-colors"
          />
          <span className="absolute right-3 -bottom-5 font-['Inter'] font-[400] text-[11px] leading-[16px] text-[#525D6F]">
            {data.name.length}/100
          </span>
        </div>
      </div>

      <div className="flex flex-col items-start pt-2 gap-3 w-full z-10">
        <span className="font-['Inter'] font-[700] text-[11px] leading-[16px] flex items-center tracking-[0.55px] uppercase text-[#7E8796]">
          INCLUDED FEATURES
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {ALL_FEATURES.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              isSelected={data.features.includes(feature.id)}
              onToggle={toggleFeature}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 w-full z-10 pt-2 md:pt-4">
        <div className="flex flex-col items-start gap-1.5 flex-1 min-w-[200px] w-full">
          <label className="font-['Inter'] font-[500] text-[12px] leading-[16px] text-[#7E8796]">
            Price
          </label>
          <div className="relative flex flex-row items-center w-full">
            <span className="absolute left-[14px] font-['Inter'] font-[500] text-[12px] leading-[16px] text-[#7E8796]">
              ₹
            </span>
            <input
              type="text"
              value={data.price}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "");
                onChange({ ...data, price: val });
              }}
              placeholder="999"
              className="box-border flex flex-row items-center pl-8 pr-4 py-2.5 w-full bg-[#0B0D10] border border-[#262D38] rounded-[8px] focus:outline-none focus:border-[#D4FF00] font-['Inter'] font-[400] text-[12px] leading-[16px] text-white placeholder-[#7E8796] transition-colors h-[38px]"
            />
          </div>
        </div>

        <div className="flex flex-col items-start gap-1.5 flex-[0.7] min-w-[150px] w-full">
          <label className="font-['Inter'] font-[500] text-[12px] leading-[16px] text-[#7E8796]">
            Duration
          </label>
          <div className="w-full">
            <Dropdown
              options={DURATION_OPTIONS}
              value={data.duration}
              onChange={(val) => onChange({ ...data, duration: val })}
              triggerClassName="h-[38px] px-[14px] py-[10px] bg-[#0B0D10] border border-[#262D38] rounded-[8px] flex flex-row items-center justify-between text-white hover:border-[#333845] transition-colors w-full cursor-pointer font-['Inter'] text-[12px] font-[400]"
            />
          </div>
        </div>
      </div>

      <div className="box-border flex flex-row items-start p-3.5 gap-3 w-full bg-[#15191F] border border-[#202732] rounded-[12px] z-10 mt-2">
        <div className="flex flex-col items-start pt-[2px]">
          <Info size={20} className="text-[#CCFF00]" weight="regular" />
        </div>
        <div className="flex flex-col items-start gap-[2px] flex-1">
          <span className="font-['Inter'] font-[600] text-[12px] leading-[16px] text-white">
            You can edit plan names later
          </span>
          <span className="font-['Inter'] font-[400] text-[11px] leading-[16px] text-[#7E8796]">
            Don't worry, you can always update plan names from the Membership section.
          </span>
        </div>
      </div>
    </div>
  );
}
