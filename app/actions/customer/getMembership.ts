"use server";

import { createClient } from "@/app/api/supabase/server";

export async function getMembership() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: customerByEmail } = await supabase
    .from("gym_customers")
    .select("customerId, gymId")
    .eq("email", user.email)
    .single();

  let customer = customerByEmail;

  if (!customer) {
     const { data: customerByUserId } = await supabase
      .from("gym_customers")
      .select("customerId, gymId")
      .eq("userId", user.id)
      .single();
      
      if (!customerByUserId) return null;
      customer = customerByUserId;
  }

  const customerId = customer?.customerId;
  const gymId = customer?.gymId;
  
  if (!customerId) return null;

  const { data: plans } = await supabase
    .from("gym_customer_membership_plans")
    .select("*, plan:gym_membership_plans(planName, durationMonths, price)")
    .eq("customerId", customerId)
    .eq("is_deleted", false)
    .order("createdAt", { ascending: false });

  if (!plans || plans.length === 0) {
    return { status: "none", gymId };
  }

  const activePlan = plans.find((p: any) => p.is_Active && p.endDate);

  if (!activePlan) {
    return { status: "none", gymId };
  }

  const end = new Date(activePlan.endDate);
  const now = new Date();
  const diffTime = end.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const currentDaysLeft = diffDays > 0 ? diffDays : 0;

  if (diffDays <= 0) {
    return {
      status: "expired",
      planName: "EXPIRED",
      daysLeft: 0,
      progressPercentage: 0,
      gymId,
      planId: activePlan.planId,
    };
  }

  let progressPercentage = 0;
  if (activePlan.startDate) {
    const start = new Date(activePlan.startDate);
    const totalTime = end.getTime() - start.getTime();
    const totalDays = Math.ceil(totalTime / (1000 * 60 * 60 * 24));
    if (totalDays > 0) {
      progressPercentage = (currentDaysLeft / totalDays) * 100;
      progressPercentage = Math.min(Math.max(progressPercentage, 0), 100);
    }
  }

  return {
    status: "active",
    planName: activePlan.plan?.planName?.toUpperCase() || "MEMBER",
    daysLeft: currentDaysLeft,
    progressPercentage,
    gymId,
    planId: activePlan.planId,
    startDate: activePlan.startDate,
    endDate: activePlan.endDate,
  };
}
