import { computeUpgradeCalculation } from "@/lib/helpers/gymCustomerMembershipPlans/membershipPaymentLogic";

interface UpgradeSummaryBoxProps {
  calculation: ReturnType<typeof computeUpgradeCalculation>;
}

export function UpgradeSummaryBox({ calculation }: UpgradeSummaryBoxProps) {
  if (!calculation) return null;

  return (
    <div className="bg-[#161E2E] border border-[#25334A] rounded-2xl p-4 space-y-2">
      <span className="text-[#9CA3AF] text-[10px] uppercase font-bold tracking-wider block">
        Upgrade & Proration Summary
      </span>
      <div className="flex justify-between text-xs text-[#D1D5DB]">
        <span>New Plan Price</span>
        <span className="font-semibold text-white">₹{calculation.newPlanPrice}</span>
      </div>
      {calculation.isUpgrade && calculation.unusedCredit > 0 && (
        <div className="flex justify-between text-xs text-[#A3E635]">
          <span>Credit from Current Plan ({calculation.remainingDays} days left)</span>
          <span className="font-semibold">-₹{calculation.unusedCredit}</span>
        </div>
      )}
      <div className="border-t border-[#25334A] pt-2 flex justify-between items-baseline">
        <span className="text-sm font-bold text-white">Amount for Customer to Pay</span>
        <span className="text-lg font-black text-[#D2F829]">₹{calculation.payableAmount}</span>
      </div>
      <p className="text-[11px] text-[#9CA3AF] mt-1">
        The customer will pay this amount via Razorpay online to activate the plan.
      </p>
    </div>
  );
}
