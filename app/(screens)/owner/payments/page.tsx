"use client";

import { Wallet, CurrencyInr, TrendUp } from "@phosphor-icons/react";
import MetricCard from "./_components/MetricCard";
import PaymentsTable, { Transaction } from "./_components/PaymentsTable";
import { useUser } from "@/app/context/UserContext";
import { useGymPayments } from "@/lib/hooks/useGymPayments";
import { useCustomerGymPayments } from "@/lib/hooks/customerGymPayments/useCustomerGymPayments";
import { useMemo } from "react";


export default function PaymentsPage() {
  const { user, roleData } = useUser();
  const userId = user?.id;
  const gymId = roleData?.[0]?.gymId;

  const { data: manualPayments, isLoading: isLoadingManual } = useGymPayments(userId || null);
  const { data: customerPayments, isLoading: isLoadingCustomer } = useCustomerGymPayments(gymId);

  const { transactions, todaysRevenue, todaysPaymentsCount, isLoading } = useMemo(() => {
    const loading = isLoadingManual || isLoadingCustomer;
    
    let allTx: Transaction[] = [];
    let revenue = 0;
    let count = 0;
    
    const todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    const todayRaw = new Date().toISOString().split('T')[0];

    if (manualPayments) {
      manualPayments.forEach((p: any) => {
        const createdAt = new Date(p.createdAt || p.paymentDate);
        const timeStr = createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const dateStr = createdAt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        
        let method = "UPI";
        if (p.paymentMethod?.toLowerCase().includes('card')) method = "Card";
        else if (p.paymentMethod?.toLowerCase().includes('cash')) method = "Cash";

        allTx.push({
          id: p.gymPaymentId,
          name: p.gym_customers?.fullName || "Unknown",
          time: dateStr === todayStr ? timeStr : `${dateStr}, ${timeStr}`,
          membershipTier: p.gym_membership_plans?.planName || "No Plan",
          membershipDuration: p.gym_membership_plans?.durationMonths ? `${p.gym_membership_plans.durationMonths} Months` : "-",
          amount: `₹${p.amountPaid?.toLocaleString('en-IN') || 0}`,
          method: method,
          timestamp: createdAt.getTime(),
          avatarUrl: p.gym_customers?.userAccount?.profilePhoto || undefined,
        });

        if (p.paymentDate?.startsWith(todayRaw) || (p.createdAt && p.createdAt.startsWith(todayRaw))) {
          revenue += (p.amountPaid || 0);
          count++;
        }
      });
    }

    if (customerPayments) {
      customerPayments.forEach((p: any) => {
        const createdAt = new Date(p.createdAt);
        const timeStr = createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const dateStr = createdAt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        
        let method = "UPI";
        if (p.paymentMethod?.toLowerCase().includes('card')) method = "Card";
        else if (p.paymentMethod?.toLowerCase().includes('cash')) method = "Cash";

        allTx.push({
          id: p.customerPaymentId,
          name: p.gym_customers?.fullName || "Unknown",
          time: dateStr === todayStr ? timeStr : `${dateStr}, ${timeStr}`,
          membershipTier: p.plan?.planName || "No Plan",
          membershipDuration: p.plan?.durationMonths ? `${p.plan.durationMonths} Months` : "-",
          amount: `₹${p.amountPaid?.toLocaleString('en-IN') || 0}`,
          method: method,
          timestamp: createdAt.getTime(),
          avatarUrl: p.gym_customers?.creator?.profilePhoto || undefined,
        });

        if (p.createdAt && p.createdAt.startsWith(todayRaw)) {
          revenue += (p.amountPaid || 0);
          count++;
        }
      });
    }

    allTx.sort((a, b) => b.timestamp - a.timestamp);

    return {
      transactions: allTx,
      todaysRevenue: `₹${revenue.toLocaleString('en-IN')}`,
      todaysPaymentsCount: count,
      isLoading: loading,
    };
  }, [manualPayments, customerPayments, isLoadingManual, isLoadingCustomer]);

  const currentDate = new Date().toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="w-full h-full flex flex-col bg-[#0C0D10] overflow-y-auto scrollbar-themed relative">
      <div className="flex flex-col p-6 md:p-8 max-w-[1024px] mx-auto w-full gap-7 pb-6 md:pb-10">
        
        <div className="flex flex-col md:flex-row justify-between md:items-baseline gap-2 md:gap-4 w-full">
          <h1 className="font-['Plus_Jakarta_Sans'] font-[800] text-[24px] md:text-[30px] leading-[36px] tracking-[-0.75px] text-white m-0">
            Payments
          </h1>
          <span className="font-['Plus_Jakarta_Sans'] font-[600] text-[12px] leading-[16px] tracking-[0.3px] text-[#9CA3AF]">
            {currentDate}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <MetricCard
            title="Today's Revenue"
            subtitle="(today)"
            value={todaysRevenue}
            icon={<Wallet size={32} weight="fill" />}
            trendIcon={<TrendUp size={16} weight="bold" />}
          />
          <MetricCard
            title="Today's Payments"
            value={todaysPaymentsCount.toString()}
            icon={<CurrencyInr size={32} weight="bold" />}
            trendIcon={<TrendUp size={16} weight="bold" />}
          />
        </div>

        <PaymentsTable transactions={transactions} isLoading={isLoading} />

      </div>
    </div>
  );
}
