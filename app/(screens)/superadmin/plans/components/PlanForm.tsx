"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CurrencyInr, Plus, CheckCircle, X, CircleNotch } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import Dropdown from "@/app/(screens)/components/reusable/Dropdown";
import { useUser } from "@/app/context/UserContext";
import { useSaveSubscription } from "@/lib/hooks/superadmin/subscriptions/subscriptions";
import {
  useSaveSubscriptionFeature,
  useDeleteSubscriptionFeature,
  useSubscriptionFeatures,
} from "@/lib/hooks/superadmin/subscriptions/subscriptionFeatures";

const PLAN_FOR_OPTIONS = [
  { label: "Gyms", value: "gyms" },
  { label: "Customers", value: "customer" },
];

const INITIAL_SUGGESTIONS = [
  "Own Gym Label",
  "Biometric Management System",
  "Multiple Owner Login",
  "Inventory Management",
  "Customer Management",
  "Attendance Tracking",
  "Basic Reports",
  "Advanced Analytics",
  "Member App Access",
  "Priority Support",
];

interface PlanFormProps {
  isEdit?: boolean;
  initialData?: {
    subscriptionPlanId?: string;
    planName: string;
    labelName?: string | null;
    planFor: string;
    price: string;
    selectedFeatures: string[];
  };
}

export default function PlanForm({ isEdit = false, initialData }: PlanFormProps) {
  const router = useRouter();
  const { user, profile } = useUser();
  const saveSubscriptionMutation = useSaveSubscription();
  const saveFeatureMutation = useSaveSubscriptionFeature();
  const deleteFeatureMutation = useDeleteSubscriptionFeature();
  const { data: dbFeatures = [] } = useSubscriptionFeatures(initialData?.subscriptionPlanId);

  const [planName, setPlanName] = useState(initialData?.planName || "");
  const [labelName, setLabelName] = useState(initialData?.labelName || "");
  const [planFor, setPlanFor] = useState(
    initialData?.planFor === "gyms" ? "gyms" : initialData?.planFor ? "customer" : ""
  );
  const [price, setPrice] = useState(initialData?.price || "");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(initialData?.selectedFeatures || []);
  const [suggestions, setSuggestions] = useState<string[]>(
    INITIAL_SUGGESTIONS.filter((s) => !(initialData?.selectedFeatures || []).includes(s))
  );
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customFeatureText, setCustomFeatureText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      if (initialData.planName) setPlanName(initialData.planName);
      if (initialData.labelName !== undefined) setLabelName(initialData.labelName || "");
      if (initialData.planFor) {
        setPlanFor(initialData.planFor === "gyms" ? "gyms" : "customer");
      }
      if (initialData.price) setPrice(initialData.price);
      if (initialData.selectedFeatures) {
        setSelectedFeatures(initialData.selectedFeatures);
        setSuggestions(INITIAL_SUGGESTIONS.filter((s) => !initialData.selectedFeatures.includes(s)));
      }
    }
  }, [initialData]);

  const handleAddFeature = (feature: string) => {
    if (!selectedFeatures.includes(feature)) setSelectedFeatures((prev) => [...prev, feature]);
    setSuggestions((prev) => prev.filter((s) => s !== feature));
  };

  const handleRemoveFeature = (feature: string) => {
    setSelectedFeatures((prev) => prev.filter((f) => f !== feature));
    if (INITIAL_SUGGESTIONS.includes(feature) && !suggestions.includes(feature)) {
      setSuggestions((prev) => [feature, ...prev]);
    }
  };

  const handleSaveCustomFeature = () => {
    const trimmed = customFeatureText.trim();
    if (trimmed && !selectedFeatures.includes(trimmed)) setSelectedFeatures((prev) => [...prev, trimmed]);
    setCustomFeatureText("");
    setIsAddingCustom(false);
  };

  const handleSubmit = async () => {
    console.log("[PlanForm] Validate form inputs (isEdit:", isEdit, "):", { planName, labelName, planFor, price, selectedFeatures });
    if (!planName.trim()) {
      console.warn("[PlanForm] Validation failed: planName is empty");
      toast.error("Plan Name is required", { id: "plan-name-req" });
      return;
    }
    if (!planFor) {
      console.warn("[PlanForm] Validation failed: planFor is empty");
      toast.error("Please select a target for the plan", { id: "plan-for-req" });
      return;
    }
    if (!price.trim()) {
      console.warn("[PlanForm] Validation failed: price is empty");
      toast.error("Price is required", { id: "price-req" });
      return;
    }
    if (selectedFeatures.length === 0) {
      console.warn("[PlanForm] Validation failed: selectedFeatures is empty");
      toast.error("Please select at least one feature", { id: "features-req" });
      return;
    }

    setIsSubmitting(true);
    try {
      const creatorId = user?.id || profile?.userId || crypto.randomUUID();
      const numericPrice = parseFloat(price.replace(/[^0-9.]/g, "")) || 0;
      const planPayload = {
        subscriptionPlanId: initialData?.subscriptionPlanId,
        planName: planName.trim(),
        label: labelName.trim() || null,
        price: numericPrice,
        planFor,
        createdBy: creatorId,
        isActive: true,
      };

      console.log("[PlanForm] Saving subscription payload:", planPayload);
      const savedPlan = await saveSubscriptionMutation.mutateAsync(planPayload);
      console.log("[PlanForm] Subscription saved response:", savedPlan);

      const targetPlanId = initialData?.subscriptionPlanId || savedPlan?.subscriptionPlanId;
      if (!targetPlanId) throw new Error("Missing targetPlanId after saving subscription");

      if (isEdit && dbFeatures && dbFeatures.length > 0) {
        console.log("[PlanForm] Syncing features with existing DB features:", dbFeatures);
        const existingNames = dbFeatures.map((f: { featureName: string }) => f.featureName);
        const featuresToAdd = selectedFeatures.filter((name) => !existingNames.includes(name));
        const featuresToRemove = dbFeatures.filter((f: { featureName: string; subscriptionFeatureId: string }) => !selectedFeatures.includes(f.featureName));

        console.log("[PlanForm] Features to add:", featuresToAdd, "Features to remove:", featuresToRemove);
        for (const feat of featuresToAdd) {
          console.log("[PlanForm] Adding feature:", feat);
          await saveFeatureMutation.mutateAsync({ subscriptionPlanId: targetPlanId, featureName: feat });
        }
        for (const feat of featuresToRemove) {
          if (feat.subscriptionFeatureId) {
            console.log("[PlanForm] Removing feature:", feat.subscriptionFeatureId);
            await deleteFeatureMutation.mutateAsync(feat.subscriptionFeatureId);
          }
        }
      } else {
        console.log(`[PlanForm] Inserting ${selectedFeatures.length} features for planId:`, targetPlanId);
        for (const feature of selectedFeatures) {
          console.log(`[PlanForm] Saving feature "${feature}"...`);
          const res = await saveFeatureMutation.mutateAsync({ subscriptionPlanId: targetPlanId, featureName: feature });
          console.log(`[PlanForm] Feature "${feature}" saved:`, res);
        }
      }

      console.log("[PlanForm] Completed plan & feature mutations successfully!");
      toast.success(isEdit ? "Plan updated successfully!" : "Plan created successfully!", { id: "plan-success" });
      setTimeout(() => router.back(), 1200);
    } catch (error: any) {
      console.error("[PlanForm] Error while saving plan/features:", {
        message: error?.message,
        code: error?.code,
        details: error?.details,
        hint: error?.hint,
        error,
      });
      toast.error(error?.message || (isEdit ? "Failed to update plan." : "Failed to create plan."), { id: "plan-err" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full p-6 sm:p-8 flex flex-col items-center bg-[#0C0D10] text-white overflow-y-auto overflow-x-hidden">
      <div className="w-full max-w-3xl flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3 sm:gap-4">
            <button onClick={() => router.back()} className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#111418] border border-[#1D222B] hover:bg-[#1A1F26] transition-colors cursor-pointer shrink-0 text-[#9CA3AF] hover:text-white">
              <ArrowLeft size={16} weight="bold" />
            </button>
            <h1 className="text-[20px] sm:text-[22px] font-bold tracking-tight text-white leading-tight">
              {isEdit ? "Edit Plan Details" : "Add New Plan"}
            </h1>
          </div>
          <p className="text-[11.5px] font-normal text-[#9CA3AF] ml-[52px] sm:ml-[56px]">
            {isEdit ? "Update the details and features of this subscription plan." : "Create a new subscription plan for gym owners or individual customers."}
          </p>
        </div>

        <div className="w-full flex flex-col p-6 sm:p-8 rounded-xl bg-[#101620] border border-[#1D2634]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-medium text-[#D1D5DB]">Plan Name <span className="text-red-500">*</span></label>
              <input type="text" value={planName} onChange={(e) => setPlanName(e.target.value)} placeholder="e.g. Gold" className="w-full bg-[#1A2029] border border-[#303744] rounded-lg px-3 py-2.5 text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#BBF246] transition-colors" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-medium text-[#D1D5DB]">Label Name</label>
              <input type="text" value={labelName} onChange={(e) => setLabelName(e.target.value)} placeholder="e.g. White Label" className="w-full bg-[#1A2029] border border-[#303744] rounded-lg px-3 py-2.5 text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#BBF246] transition-colors" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-medium text-[#D1D5DB]">Plan For <span className="text-red-500">*</span></label>
              <Dropdown options={PLAN_FOR_OPTIONS} value={planFor} onChange={setPlanFor} placeholder="Select Plan Target" triggerClassName="w-full flex flex-row justify-between items-center px-3 py-2.5 bg-[#1A2029] border border-[#303744] rounded-lg cursor-pointer transition-colors hover:border-[#4B5563]" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-medium text-[#D1D5DB]">Price <span className="text-red-500">*</span></label>
              <div className="relative w-full flex items-center">
                <div className="absolute left-3 text-[#9CA3AF]"><CurrencyInr size={14} weight="bold" /></div>
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="3,499" className="w-full bg-[#1A2029] border border-[#303744] rounded-lg pl-8 pr-3 py-2.5 text-xs text-white placeholder-[#6B7280] focus:outline-none focus:border-[#BBF246] transition-colors" />
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col gap-1">
                <h3 className="text-[14px] font-medium text-white">Features</h3>
                <span className="text-[10px] font-medium text-[#BBF246]">Suggestions</span>
              </div>

              {isAddingCustom && (
                <div className="flex items-center w-full bg-[#1A2029] border border-[#BBF246] rounded-lg px-3 py-2 transition-colors shadow-[0_0_8px_rgba(187,242,70,0.15)]">
                  <input type="text" autoFocus value={customFeatureText} onChange={(e) => setCustomFeatureText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") handleSaveCustomFeature(); if (e.key === "Escape") { setIsAddingCustom(false); setCustomFeatureText(""); } }} placeholder="Type feature..." className="flex-1 min-w-0 bg-transparent text-xs text-white placeholder-[#6B7280] focus:outline-none" />
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-2">
                    <button onClick={handleSaveCustomFeature} className="cursor-pointer text-xs font-semibold text-[#BBF246] hover:text-[#c5f55e] transition-colors">Save</button>
                    <button onClick={() => { setIsAddingCustom(false); setCustomFeatureText(""); }} className="cursor-pointer px-2 py-1 rounded hover:bg-[#303744]/50 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors">Cancel</button>
                  </div>
                </div>
              )}

              {selectedFeatures.length > 0 && (
                <div className="flex flex-col gap-2">
                  {selectedFeatures.map((feature, idx) => (
                    <div key={`sel-${idx}`} className="flex items-center justify-between w-full bg-[#1A2029] border border-[#232B36] rounded-lg px-3 py-2.5 transition-all">
                      <div className="flex items-center gap-2.5">
                        <CheckCircle size={16} weight="fill" className="text-[#BBF246]" />
                        <span className="text-[11.5px] font-normal text-white">{feature}</span>
                      </div>
                      <button onClick={() => handleRemoveFeature(feature)} className="cursor-pointer text-[#6B7280] hover:text-red-400 transition-colors p-1 rounded-full hover:bg-[#303744]">
                        <X size={12} weight="bold" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {suggestions.length > 0 && (
                <div className="flex flex-col gap-2">
                  {suggestions.map((suggestion, idx) => (
                    <div key={`sug-${idx}`} className="flex items-center justify-between w-full bg-[#1A2029] border border-[#232B36] rounded-lg px-3 py-2.5 transition-all hover:border-[#303744]">
                      <span className="text-[11.5px] font-normal text-[#9CA3AF]">{suggestion}</span>
                      <button onClick={() => handleAddFeature(suggestion)} className="cursor-pointer flex items-center justify-center w-5 h-5 rounded-[4px] bg-[#222A35] hover:bg-[#2A3441] border border-[#303744] text-[#9CA3AF] hover:text-white transition-colors">
                        <Plus size={10} weight="bold" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {!isAddingCustom && (
                <button onClick={() => setIsAddingCustom(true)} className="cursor-pointer self-start flex items-center gap-1.5 px-3 py-1.5 border border-dashed border-[#BBF246]/40 rounded-[6px] text-[#BBF246] hover:bg-[#BBF246]/10 transition-colors text-[10.5px] font-medium mt-1">
                  <Plus size={10} weight="bold" />
                  Add Another Feature
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-end gap-3 mt-8 pt-5 border-t border-[#1D2634]">
            <button disabled={isSubmitting} onClick={() => router.back()} className="w-full sm:w-auto cursor-pointer px-6 py-2.5 rounded-lg border border-[#303744] hover:border-[#4B5563] bg-transparent hover:bg-[#1A2029] text-xs font-semibold text-[#D1D5DB] hover:text-white transition-colors disabled:opacity-50">
              Cancel
            </button>
            <button disabled={isSubmitting} onClick={handleSubmit} className="w-full sm:w-auto cursor-pointer px-6 py-2.5 rounded-lg bg-[#BBF246] shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-black text-xs font-semibold hover:brightness-110 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting && <CircleNotch size={14} className="animate-spin text-black" />}
              <span>{isSubmitting ? "Saving..." : isEdit ? "Save Changes" : "Create Plan"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
