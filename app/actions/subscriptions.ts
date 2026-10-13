"use server";

import {
  fetchSubscriptionPlans,
  DynamicSubscriptionPlan,
} from "@/lib/helpers/subscriptions/subscriptionsHelper";

export async function getSubscriptionPlansAction(planFor?: "gyms" | "customer"): Promise<{
  success: boolean;
  data: DynamicSubscriptionPlan[];
  error?: string;
}> {
  return await fetchSubscriptionPlans(planFor);
}

export async function getAllPlansGroupedAction(): Promise<{
  success: boolean;
  gymPlans: DynamicSubscriptionPlan[];
  customerPlans: DynamicSubscriptionPlan[];
  error?: string;
}> {
  const res = await fetchSubscriptionPlans();
  if (!res.success) {
    return {
      success: false,
      gymPlans: [],
      customerPlans: [],
      error: res.error,
    };
  }

  const gymPlans = res.data.filter((p) => p.planFor === "gyms");
  const customerPlans = res.data.filter((p) => p.planFor === "customer");

  return {
    success: true,
    gymPlans,
    customerPlans,
  };
}
