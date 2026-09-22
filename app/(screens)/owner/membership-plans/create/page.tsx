"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Plus, ArrowRight } from "@phosphor-icons/react";
import PlanForm, { PlanData } from "./_components/PlanForm";
import { useUpsertMembershipPlans } from "@/lib/hooks/membership/useMutateMembershipPlan";
import { useUser } from "@/app/context/UserContext";
import { getOwnerGymId } from "@/lib/helpers/trainers/trainerHelper";
import { useGymMembershipPlans } from "@/lib/hooks/useGymMembershipPlans";

const ALL_FEATURES_MAP: Record<string, string> = {
  "workout plans": "workout-plans",
  "nutrition plans": "nutrition-plans",
  "water tracker": "water-tracker",
  "progress tracking": "progress-tracking",
  "attendance": "attendance",
  "recipes": "recipes",
  "community access": "community-access",
  "ai recommendations": "ai-recommendations",
};

const INITIAL_PLAN: PlanData = {
  id: "",
  name: "",
  price: "",
  duration: "1 month",
  features: [],
};

export default function Page() {
  return (
    <Suspense fallback={<div className="w-full h-full bg-[#0B0D10]" />}>
      <CreateMembershipPlanPage />
    </Suspense>
  );
}

function CreateMembershipPlanPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planIdToEdit = searchParams.get("planId");
  const { user } = useUser();
  const { data: rawPlans } = useGymMembershipPlans(user?.id || null);
  const upsertPlans = useUpsertMembershipPlans();
  const [plans, setPlans] = useState<PlanData[]>([{ ...INITIAL_PLAN, id: `plan-${crypto.randomUUID()}` }]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (planIdToEdit && rawPlans && rawPlans.length > 0 && !isEditing) {
      const planToEdit = rawPlans.find((p: any) => p.planId === planIdToEdit);
      if (planToEdit) {
        setIsEditing(true);
        let durationStr = "1 month";
        if (planToEdit.durationMonths) {
          if (planToEdit.durationMonths >= 12) {
             durationStr = "1 year";
          } else {
             durationStr = `${planToEdit.durationMonths} month${planToEdit.durationMonths > 1 ? 's' : ''}`;
          }
        }
        
        setPlans([{
          id: planToEdit.planId,
          name: planToEdit.planName || "",
          price: planToEdit.price?.toString() || "",
          duration: durationStr,
          features: planToEdit.gym_membership_plan_features?.map((f: any) => {
            const dbName = f.features?.featureName?.toLowerCase()?.trim();
            return dbName ? ALL_FEATURES_MAP[dbName] : null;
          }).filter(Boolean) || [],
        }]);
      }
    }
  }, [planIdToEdit, rawPlans, isEditing]);

  const updatePlan = (index: number, updated: PlanData) => {
    const newPlans = [...plans];
    newPlans[index] = updated;
    setPlans(newPlans);
  };

  const addPlan = () => {
    setPlans([...plans, { ...INITIAL_PLAN, id: `plan-${crypto.randomUUID()}` }]);
  };

  const handleSave = async () => {
    if (!user?.id) return;
    const gymId = await getOwnerGymId(user.id);
    if (!gymId) return;

    const drafts = plans.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      duration: p.duration,
      selectedFeatureIds: p.features,
    }));

    upsertPlans.mutate({ gymId, userId: user.id, plans: drafts }, {
      onSuccess: () => {
        router.push("/owner/membership-plans");
      }
    });
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#0B0D10] overflow-y-auto scrollbar-themed relative">
      <div className="flex flex-col p-6 md:p-8 max-w-[1024px] mx-auto w-full gap-8 pb-24 md:pb-22">
        <div className="flex flex-col items-start gap-4 w-full">
          <Link
            href="/owner/membership-plans"
            className="flex flex-row items-center gap-2 text-[#7E8796] hover:text-white transition-colors cursor-pointer group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-['Inter'] font-[500] text-[12px] leading-[16px]">
              Create Membership Plans
            </span>
          </Link>

          <div className="flex flex-col items-start gap-1">
            <h1 className="font-['Inter'] font-[700] text-[24px] leading-[32px] tracking-[-0.6px] text-white m-0">
              Name your membership plans
            </h1>
            <p className="font-['Inter'] font-[400] text-[12px] leading-[16px] text-[#7E8796] m-0">
              Give a name to each plan. You can change the names later anytime.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-6 w-full">
          {plans.map((plan, index) => (
            <PlanForm
              key={index}
              index={index}
              data={plan}
              onChange={(updated) => updatePlan(index, updated)}
            />
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 md:left-[240px] right-0 pb-6 pointer-events-none z-50 flex justify-center">
        <div className="flex flex-row justify-end items-center gap-3 w-full max-w-[1024px] px-6 md:px-8 pointer-events-auto">
          <button
            onClick={addPlan}
            className="box-border flex flex-row justify-center items-center w-[40px] h-[40px] bg-[#1C2214] border border-[#CCFF00]/30 rounded-[9999px] cursor-pointer shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] transition-colors hover:bg-[#252c1a]"
            aria-label="Add new plan"
          >
            <Plus size={20} className="text-[#CCFF00]" strokeWidth={2} />
          </button>

          <button
            onClick={handleSave}
            disabled={upsertPlans.isPending}
            className={`flex flex-row items-center justify-center px-[28px] py-[12px] h-[40px] rounded-[9999px] gap-[8px] shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)] transition-colors ${
              upsertPlans.isPending ? "bg-[#809900] cursor-not-allowed opacity-70" : "bg-[#CCFF00] cursor-pointer hover:bg-[#bbf000]"
            }`}
          >
            <span className="font-['Inter'] font-[700] text-[12px] leading-[16px] text-center tracking-[0.3px] text-black">
              {upsertPlans.isPending ? "Saving..." : "Save"}
            </span>
            <ArrowRight size={16} className="text-black" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
