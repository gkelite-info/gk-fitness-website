"use server";

import { createClient } from "@/app/api/supabase/server";
import { revalidatePath } from "next/cache";
import { executeMembershipPaymentSuccess } from "@/lib/helpers/gymCustomerMembershipPlans/membershipPaymentLogic";

export interface RenewPlanParams {
  planId: string;
  customerId?: string;
  gymId?: string;
}

export async function renewPlan({ planId, customerId, gymId }: RenewPlanParams) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Authentication required" };
  }

  let resolvedCustomerId = customerId;
  let resolvedGymId = gymId;

  if (!resolvedCustomerId || !resolvedGymId) {
    const { data: customer } = await supabase
      .from("gym_customers")
      .select("customerId, gymId")
      .or(`userId.eq.${user.id},email.eq.${user.email}`)
      .maybeSingle();

    if (customer) {
      resolvedCustomerId = resolvedCustomerId || customer.customerId;
      resolvedGymId = resolvedGymId || customer.gymId;
    }
  }

  if (!resolvedCustomerId || !resolvedGymId) {
    return { success: false, error: "Customer record not found" };
  }

  try {
    const result = await executeMembershipPaymentSuccess({
      supabase,
      customerId: resolvedCustomerId,
      gymId: resolvedGymId,
      planId,
      customerUserId: user.id,
      gatewayPaymentId: `direct_${Date.now()}`,
      gatewayOrderId: null,
      paymentMethod: "direct",
    });

    revalidatePath("/customer");
    revalidatePath("/owner");
    revalidatePath("/owner/payments");
    revalidatePath("/owner/finance");
    return { success: true, planName: result.planName };
  } catch (err: any) {
    console.error("[renewPlan] Error:", err);
    return { success: false, error: err.message || "Failed to renew plan" };
  }
}
