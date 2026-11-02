"use server";

import { createClient } from "@/app/api/supabase/server";
import { getCalendarDaysDifference } from "@/lib/planCalculations";

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

  const { data: indivPlans } = await supabase
    .from("individual_customer_plans")
    .select("*, subscription:subscriptions(subscriptionPlanId, planName, price, label)")
    .eq("userId", user.id)
    .is("deletedAt", null)
    .order("createdAt", { ascending: false });

  const hasIndivPlans = Boolean(indivPlans && indivPlans.length > 0);
  const isIndividual = userRec?.role === "individual" || hasIndivPlans;

  if (isIndividual) {
    if (!indivPlans || indivPlans.length === 0) {
      return { status: "none", gymId: "", customerId: user.id, canCheckIn: false, isIndividual: true };
    }

    const { data: allCustomerSubs } = await supabase
      .from("subscriptions")
      .select("subscriptionPlanId, planName, price, planFor")
      .in("planFor", ["customer", "customers", "individual_customer"])
      .eq("is_deleted", false);

    const customerSubsList = allCustomerSubs || [];
    const prices = customerSubsList.map((s) => Number(s.price) || 0);
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
    const goldSub = customerSubsList.find((s) => s.planName?.toLowerCase().includes("gold"));
    const goldPrice = goldSub ? Number(goldSub.price) || 0 : maxPrice;

    const activePlan = indivPlans.find(
      (p: any) =>
        Boolean(p.isActive) &&
        p.status !== "pending" &&
        p.endDate &&
        getCalendarDaysDifference(p.endDate) > 0
    );

    const pendingPlan = indivPlans.find(
      (p: any) => p.status === "pending" || (!p.endDate && !p.isActive)
    );

    const latestPlan = activePlan || indivPlans[0];
    const planPrice = latestPlan?.customAmount !== undefined && latestPlan?.customAmount !== null
      ? Number(latestPlan.customAmount)
      : (latestPlan?.subscription?.price !== undefined ? Number(latestPlan.subscription.price) : 0);

    const planName = latestPlan?.subscription?.planName?.toUpperCase() || "MEMBERSHIP";

    if (!activePlan) {
      const isPendingActivation =
        (latestPlan as any).status === "pending" ||
        !(latestPlan as any).transactionId ||
        !latestPlan.startDate ||
        !latestPlan.endDate ||
        (!Boolean(latestPlan.isActive) && !latestPlan.endDate);

      if (isPendingActivation) {
        return {
          status: "pending_activation",
          planName,
          daysLeft: 0,
          progressPercentage: 0,
          gymId: "",
          customerId: user.id,
          planId: latestPlan.subscriptionPlanId,
          pendingPlanId: latestPlan.subscriptionPlanId,
          pendingPlanName: latestPlan?.subscription?.planName || planName,
          pendingAmount: planPrice,
          startDate: null,
          endDate: null,
          canCheckIn: false,
          isIndividual: true,
        };
      }

      return {
        status: "expired",
        planName,
        daysLeft: 0,
        progressPercentage: 0,
        gymId: "",
        customerId: user.id,
        planId: latestPlan.subscriptionPlanId,
        pendingPlanId: latestPlan.subscriptionPlanId,
        pendingPlanName: latestPlan?.subscription?.planName || planName,
        pendingAmount: planPrice,
        startDate: latestPlan.startDate,
        endDate: latestPlan.endDate,
        canCheckIn: false,
        isIndividual: true,
      };
    }

    const diffDays = getCalendarDaysDifference(activePlan.endDate);
    const currentDaysLeft = diffDays > 0 ? diffDays : 0;

    let progressPercentage = 0;
    if (activePlan.startDate) {
      const totalDays = getCalendarDaysDifference(activePlan.endDate, activePlan.startDate);
      if (totalDays > 0) {
        progressPercentage = (currentDaysLeft / totalDays) * 100;
        progressPercentage = Math.min(Math.max(progressPercentage, 0), 100);
      }
    }

    const userPlanPrice = Number(activePlan.subscription?.price) || Number(activePlan.customAmount) || 0;
    const userPlanName = (activePlan.subscription?.planName || "").toLowerCase();
    const isGoldByPlanId = Boolean(goldSub && activePlan.subscriptionPlanId === goldSub.subscriptionPlanId);
    const isGoldByName = userPlanName.includes("gold");
    const isGoldByPrice = (userPlanPrice >= goldPrice && goldPrice > 0) || (userPlanPrice >= maxPrice && maxPrice > 0);
    const isGoldPlan = isGoldByPlanId || isGoldByName || isGoldByPrice;

    return {
      status: "active",
      planName: activePlan.subscription?.planName?.toUpperCase() || planName,
      daysLeft: currentDaysLeft,
      progressPercentage,
      gymId: "",
      customerId: user.id,
      planId: activePlan.subscriptionPlanId,
      pendingPlanId: pendingPlan ? pendingPlan.subscriptionPlanId : undefined,
      pendingPlanName: pendingPlan?.subscription?.planName || undefined,
      pendingAmount: pendingPlan
        ? Number(pendingPlan.customAmount || pendingPlan.subscription?.price || 0)
        : undefined,
      startDate: activePlan.startDate,
      endDate: activePlan.endDate,
      canCheckIn: isGoldPlan,
      isIndividual: true,
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

    if (!customerId) return { status: "none", gymId: "", customerId: user.id, canCheckIn: false, isIndividual: false };

    const { data: plans } = await supabase
      .from("gym_customer_membership_plans")
      .select("*, plan:gym_membership_plans!gym_customer_membership_plans_planId_fkey(planName, durationMonths, price), pendingPlan:gym_membership_plans!gym_customer_membership_plans_pendingPlanId_fkey(planName, durationMonths, price)")
      .eq("customerId", customerId)
      .eq("is_deleted", false)
      .order("createdAt", { ascending: false });

    if (!plans || plans.length === 0) {
      return { status: "none", gymId, customerId, canCheckIn: false, isIndividual: false };
    }

    const activePlan = plans.find((p: any) => {
      const isAct = p.is_Active ?? p.isActive;
      return Boolean(isAct) && p.endDate && getCalendarDaysDifference(p.endDate) > 0;
    });
    const latestPlan = activePlan || plans[0];

    const diffDays = getCalendarDaysDifference(latestPlan?.endDate);
    const currentDaysLeft = diffDays > 0 ? diffDays : 0;
    const isExpired = diffDays <= 0;
    const isActive = Boolean(latestPlan?.is_Active ?? latestPlan?.isActive);
    const isPendingActivation =
      !latestPlan?.startDate ||
      !latestPlan?.endDate ||
      (!isActive && !latestPlan?.endDate);

    if (isPendingActivation) {
      return {
        status: "pending_activation",
        planName: latestPlan?.plan?.planName?.toUpperCase() || "PENDING ACTIVATION",
        daysLeft: 0,
        progressPercentage: 0,
        gymId,
        customerId,
        planId: latestPlan?.planId,
        pendingPlanId: latestPlan?.pendingPlanId || null,
        pendingPlanName: latestPlan?.pendingPlan?.planName || null,
        pendingAmount: latestPlan?.pendingAmount ? Number(latestPlan.pendingAmount) : null,
        startDate: null,
        endDate: null,
        canCheckIn: false,
        isIndividual: false,
      };
    }

    if (isExpired || !isActive) {
      return {
        status: "expired",
        planName: latestPlan?.plan?.planName?.toUpperCase() || "PLAN EXPIRED",
        daysLeft: 0,
        progressPercentage: 0,
        gymId,
        customerId,
        planId: latestPlan?.planId,
        pendingPlanId: latestPlan?.pendingPlanId || null,
        pendingPlanName: latestPlan?.pendingPlan?.planName || null,
        pendingAmount: latestPlan?.pendingAmount ? Number(latestPlan.pendingAmount) : null,
        startDate: latestPlan?.startDate,
        endDate: latestPlan?.endDate,
        canCheckIn: false,
        isIndividual: false,
      };
    }

    let progressPercentage = 0;
    if (latestPlan?.startDate && latestPlan?.endDate) {
      const totalDays = getCalendarDaysDifference(latestPlan.endDate, latestPlan.startDate);
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
      pendingPlanId: latestPlan?.pendingPlanId || null,
      pendingPlanName: latestPlan?.pendingPlan?.planName || null,
      pendingAmount: latestPlan?.pendingAmount ? Number(latestPlan.pendingAmount) : null,
      startDate: latestPlan?.startDate,
      endDate: latestPlan?.endDate,
      canCheckIn: true,
      isIndividual: false,
    };
  }
