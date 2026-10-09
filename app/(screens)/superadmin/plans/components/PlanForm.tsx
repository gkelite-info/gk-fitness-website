"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CurrencyInr } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import Dropdown from "@/app/(screens)/components/reusable/Dropdown";
import PlanFeaturesEditor from "./PlanFeaturesEditor";

const PLAN_FOR_OPTIONS = [
  { label: "Gym Owner", value: "gym_owner" },
  { label: "Individual Customer", value: "individual_customer" },
];

const INITIAL_SUGGESTIONS = [
  "Own Gym Label",
  "Biometric Management System",
  "Multiple Owner Login",
  "Inventory Management",
  "Basic Reports",
  "Advanced Analytics",
  "Member App Access",
  "Priority Support"
];

interface PlanFormProps {
  isEdit?: boolean;
  initialData?: {
    planName: string;
    labelName: string;
    planFor: string;
    price: string;
    selectedFeatures: string[];
  };
}

export default function PlanForm({ isEdit = false, initialData }: PlanFormProps) {
  const router = useRouter();

  const [planName, setPlanName] = useState(initialData?.planName || "");
  const [labelName, setLabelName] = useState(initialData?.labelName || "");
  const [planFor, setPlanFor] = useState(initialData?.planFor || "");
  const [price, setPrice] = useState(initialData?.price || "");

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(initialData?.selectedFeatures || []);

  const handleSubmit = () => {
    if (!planName.trim()) {
      toast.error("Plan Name is required", { id: "plan-name-req" });
      return;
    }
    if (!planFor) {
      toast.error("Please select a target for the plan", { id: "plan-for-req" });
      return;
    }
    if (!price.trim()) {
      toast.error("Price is required", { id: "price-req" });
      return;
    }
    if (selectedFeatures.length === 0) {
      toast.error("Please select at least one feature", { id: "features-req" });
      return;
    }

    toast.success(isEdit ? "Plan updated successfully!" : "Plan created successfully!", { id: "plan-success" });
    setTimeout(() => {
      router.back();
    }, 1500);
  };

  return (
    <div className="w-full h-full p-6 sm:p-8 flex flex-col items-center bg-[#0C0D10] text-white overflow-y-auto overflow-x-hidden">
      <div className="w-full max-w-3xl flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3 sm:gap-4">
            <button 
              onClick={() => router.back()} 
              className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#111418] border border-[#1D222B] hover:bg-[#1A1F26] transition-colors cursor-pointer shrink-0 text-[#9CA3AF] hover:text-white"
            >
              <ArrowLeft size={16} weight="bold" />
            </button>
            <h1 className="text-[20px] sm:text-[22px] font-bold tracking-tight text-white leading-tight">
              {isEdit ? "Edit Plan Details" : "Add New Plan"}
            </h1>
          </div>
          <p className="text-[11.5px] font-normal text-[#9CA3AF] ml-[52px] sm:ml-[56px]">
            {isEdit 
              ? "Update the details and features of this subscription plan." 
              : "Create a new subscription plan for gym owners or individual customers."}
          </p>
        </div>

        <div className="w-full flex flex-col p-6 sm:p-8 rounded-xl bg-[#101620] border border-[#1D2634]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-medium text-[#D1D5DB]">
                Plan Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
                placeholder="e.g. Gold"
                className="w-full bg-[#1A2029] border border-[#303744] rounded-lg px-3 py-2.5 text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#BBF246] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-medium text-[#D1D5DB]">
                Label Name
              </label>
              <input
                type="text"
                value={labelName}
                onChange={(e) => setLabelName(e.target.value)}
                placeholder="e.g. White Label"
                className="w-full bg-[#1A2029] border border-[#303744] rounded-lg px-3 py-2.5 text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#BBF246] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-medium text-[#D1D5DB]">
                Plan For <span className="text-red-500">*</span>
              </label>
              <Dropdown
                options={PLAN_FOR_OPTIONS}
                value={planFor}
                onChange={setPlanFor}
                placeholder="Select Plan Target"
                triggerClassName="w-full flex flex-row justify-between items-center px-3 py-2.5 bg-[#1A2029] border border-[#303744] rounded-lg cursor-pointer transition-colors hover:border-[#4B5563]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-medium text-[#D1D5DB]">
                Price <span className="text-red-500">*</span>
              </label>
              <div className="relative w-full flex items-center">
                <div className="absolute left-3 text-[#9CA3AF]">
                  <CurrencyInr size={14} weight="bold" />
                </div>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="3,499"
                  className="w-full bg-[#1A2029] border border-[#303744] rounded-lg pl-8 pr-3 py-2.5 text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#BBF246] transition-colors"
                />
              </div>
            </div>

            <PlanFeaturesEditor 
              selectedFeatures={selectedFeatures}
              onChange={setSelectedFeatures}
              initialSuggestions={INITIAL_SUGGESTIONS}
            />
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-end gap-3 mt-8 pt-5 border-t border-[#1D2634]">
            <button 
              onClick={() => router.back()}
              className="w-full sm:w-auto cursor-pointer px-6 py-2.5 rounded-lg border border-[#303744] hover:border-[#4B5563] bg-transparent hover:bg-[#1A2029] text-xs font-semibold text-[#D1D5DB] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmit}
              className="w-full sm:w-auto cursor-pointer px-6 py-2.5 rounded-lg bg-[#BBF246] shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-black text-xs font-semibold hover:brightness-110 transition-all active:scale-[0.98]"
            >
              {isEdit ? "Save Changes" : "Create Plan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
