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

  const { data: userRec } = await supabase
    .from("users")
    .select("userId, role")
    .eq("userId", user.id)
    .maybeSingle();

  const isIndividual = userRec?.role === "individual";

  if (isIndividual) {
    const { data: indivPlans } = await supabase
      .from("individual_customer_plans")
      .select("*, subscription:subscriptions(planName, price)")
      .eq("userId", user.id)
      .is("deletedAt", null)
      .order("createdAt", { ascending: false });

    if (!indivPlans || indivPlans.length === 0) {
      return { status: "none", gymId: "", customerId: user.id };
    }

    const activePlan = indivPlans.find((p: any) => p.isActive && p.endDate && new Date(p.endDate) > new Date());
    const latestPlan = activePlan || indivPlans[0];

    const end = latestPlan?.endDate ? new Date(latestPlan.endDate) : null;
    const now = new Date();
    const diffTime = end ? end.getTime() - now.getTime() : 0;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const currentDaysLeft = diffDays > 0 ? diffDays : 0;
    const isExpired = end ? end.getTime() <= now.getTime() : true;
    const isActive = Boolean(latestPlan?.isActive);

    if (isExpired || !isActive) {
      return {
        status: "expired",
        planName: latestPlan?.subscription?.planName?.toUpperCase() || "PLAN EXPIRED",
        daysLeft: 0,
        progressPercentage: 0,
        gymId: "",
        customerId: user.id,
        planId: latestPlan?.subscriptionPlanId,
        startDate: latestPlan?.startDate,
        endDate: latestPlan?.endDate,
      };
    }

    let progressPercentage = 0;
    if (latestPlan?.startDate && end) {
      const start = new Date(latestPlan.startDate);
      const totalTime = end.getTime() - start.getTime();
      const totalDays = Math.ceil(totalTime / (1000 * 60 * 60 * 24));
      if (totalDays > 0) {
        progressPercentage = (currentDaysLeft / totalDays) * 100;
        progressPercentage = Math.min(Math.max(progressPercentage, 0), 100);
      }
    }

    return {
      status: "active",
      planName: latestPlan?.subscription?.planName?.toUpperCase() || "INDIVIDUAL MEMBER",
      daysLeft: currentDaysLeft,
      progressPercentage,
      gymId: "",
      customerId: user.id,
      planId: latestPlan?.subscriptionPlanId,
      startDate: latestPlan?.startDate,
      endDate: latestPlan?.endDate,
    };
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
      .maybeSingle();

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
    return { status: "none", gymId, customerId };
  }

  const activePlan = plans.find((p: any) => (p.is_Active ?? p.isActive) && p.endDate && new Date(p.endDate) > new Date());
  const latestPlan = activePlan || plans[0];

  const end = latestPlan?.endDate ? new Date(latestPlan.endDate) : null;
  const now = new Date();
  const diffTime = end ? end.getTime() - now.getTime() : 0;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const currentDaysLeft = diffDays > 0 ? diffDays : 0;
  const isExpired = end ? end.getTime() <= now.getTime() : true;
  const isActive = Boolean(latestPlan?.is_Active ?? latestPlan?.isActive);

  if (isExpired || !isActive) {
    return {
      status: "expired",
      planName: latestPlan?.plan?.planName?.toUpperCase() || "PLAN EXPIRED",
      daysLeft: 0,
      progressPercentage: 0,
      gymId,
      customerId,
      planId: latestPlan?.planId,
      startDate: latestPlan?.startDate,
      endDate: latestPlan?.endDate,
    };
  }

  let progressPercentage = 0;
  if (latestPlan?.startDate && end) {
    const start = new Date(latestPlan.startDate);
    const totalTime = end.getTime() - start.getTime();
    const totalDays = Math.ceil(totalTime / (1000 * 60 * 60 * 24));
    if (totalDays > 0) {
      progressPercentage = (currentDaysLeft / totalDays) * 100;
      progressPercentage = Math.min(Math.max(progressPercentage, 0), 100);
    }
  }

  return {
    status: "active",
    planName: latestPlan?.plan?.planName?.toUpperCase() || "MEMBER",
    daysLeft: currentDaysLeft,
    progressPercentage,
    gymId,
    customerId,
    planId: latestPlan?.planId,
    startDate: latestPlan?.startDate,
    endDate: latestPlan?.endDate,
  };
}

