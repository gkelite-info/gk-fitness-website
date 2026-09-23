import { useMemo } from 'react';
import { useGymCustomers } from '@/lib/hooks/customers/useGymCustomers';
import { useMembershipPlans } from '@/lib/hooks/membership/useMembershipPlans';
import { useGymCustomerMembershipPlans } from '@/lib/hooks/gymCustomerMembershipPlans/useGymCustomerMembershipPlans';
import { useGymPayments } from '@/lib/hooks/useGymPayments';
import { useCustomerGymPayments } from '@/lib/hooks/customerGymPayments/useCustomerGymPayments';

export function useFinanceDashboard(userId: string | null, gymId: string | null, selectedYear: number, selectedDate?: string) {
  const { data: customersData, isLoading: isLoadingCustomers } = useGymCustomers(gymId ?? undefined);
  const { data: membershipPlans, isLoading: isLoadingPlans } = useMembershipPlans(gymId);
  const { data: customerPlans, isLoading: isLoadingCustomerPlans } = useGymCustomerMembershipPlans(gymId ?? undefined);
  const { data: gymPaymentsData, isLoading: isLoadingPayments } = useGymPayments(userId);
  const { data: customerGymPaymentsData, isLoading: isLoadingCustomerGymPayments } = useCustomerGymPayments(gymId ?? undefined);

  const isLoading = isLoadingCustomers || isLoadingPlans || isLoadingCustomerPlans || isLoadingPayments || isLoadingCustomerGymPayments;

  const financeData = useMemo(() => {
    let todaysRevenue = 0;
    let yesterdayRev = 0;
    let currentMonthRev = 0;
    let lastMonthRev = 0;
    let totalRevenue = 0;

    let thisMonthNewCustomers = 0;
    let lastMonthNewCustomers = 0;

    const planRevenues: Record<string, number> = {};
    const planMembers: Record<string, number> = {};
    const monthlyRev: Record<string, number> = {};
    const todaysPlanRevenues: Record<string, number> = {};
    const todaysPayments: any[] = [];

    if (membershipPlans) {
      membershipPlans.forEach(plan => {
        planRevenues[plan.id!] = 0;
        planMembers[plan.id!] = 0;
      });
    }

    const now = new Date();
    const todayStr = now.toDateString();

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const currentYear = now.getFullYear();
    const currentMonthIndex = now.getMonth();

    const monthsToRender = selectedYear === currentYear
      ? monthNames.slice(0, currentMonthIndex + 1)
      : monthNames;

    monthsToRender.forEach(m => {
      monthlyRev[m] = 0;
    });

    const allPayments: any[] = [];
    if (gymPaymentsData) {
      gymPaymentsData.forEach((p: any) => {
        const foundPlan = membershipPlans?.find(plan => plan.id === p.planId);
        
        allPayments.push({
          ...p,
          paymentDate: p.paymentDate || p.createdAt,
          gym_membership_plans: { 
            ...(p.gym_membership_plans || {}),
            planName: p.gym_membership_plans?.planName || p.plan?.planName || foundPlan?.name || 'Unknown Plan',
            name: p.gym_membership_plans?.planName || p.plan?.planName || foundPlan?.name || 'Unknown Plan',
            durationMonths: p.gym_membership_plans?.durationMonths || foundPlan?.durationMonths 
          },
          gym_customers: p.gym_customers
        });
      });
    }

    if (customerGymPaymentsData) {
      customerGymPaymentsData.forEach((p: any) => {
        const foundPlan = membershipPlans?.find(plan => plan.id === p.planId);

        allPayments.push({
          ...p,
          gymPaymentId: p.customerPaymentId, // Map for UI compatibility
          paymentDate: p.createdAt,
          paymentMethod: p.paymentMethod,
          amountPaid: p.amountPaid,
          gym_membership_plans: { 
            ...(p.plan || {}),
            planName: p.plan?.planName || foundPlan?.name || 'Unknown Plan',
            name: p.plan?.planName || foundPlan?.name || 'Unknown Plan',
            durationMonths: p.plan?.durationMonths || foundPlan?.durationMonths
          },
          gym_customers: p.gym_customers
        });
      });
    }

    if (allPayments.length > 0) {
      allPayments.forEach((payment: any) => {
        const pDate = new Date(payment.paymentDate);

        if (selectedDate) {
          const sDate = new Date(selectedDate);
          sDate.setHours(23, 59, 59, 999); // Include the entire selected day
          if (pDate.getTime() > sDate.getTime()) {
            return; // Skip payments that occurred AFTER the selected date
          }
        }

        const amount = payment.amountPaid || 0;
        if (amount > 0) {
          totalRevenue += amount;
          const pDate = new Date(payment.paymentDate);

          if (pDate.toDateString() === todayStr) {
            todaysRevenue += amount;
            todaysPayments.push(payment);
            if (payment.planId) {
              if (todaysPlanRevenues[payment.planId] === undefined) todaysPlanRevenues[payment.planId] = 0;
              todaysPlanRevenues[payment.planId] += amount;
            }
          } else if (pDate.toDateString() === yesterdayStr) {
            yesterdayRev += amount;
          }

          if (pDate >= startOfCurrentMonth) {
            currentMonthRev += amount;
          } else if (pDate >= startOfLastMonth && pDate <= endOfLastMonth) {
            lastMonthRev += amount;
          }

          if (pDate.getFullYear() === selectedYear) {
            const monthKey = monthNames[pDate.getMonth()];
            if (monthlyRev[monthKey] !== undefined) {
              monthlyRev[monthKey] += amount;
            }
          }

          if (payment.planId) {
            if (planRevenues[payment.planId] === undefined) planRevenues[payment.planId] = 0;
            planRevenues[payment.planId] += amount;
          }
        }
      });
    }

    if (customerPlans) {
      customerPlans.forEach((plan: any) => {
        if (plan.planId) {
          if (planMembers[plan.planId] === undefined) planMembers[plan.planId] = 0;
          planMembers[plan.planId] += 1;
        }
      });
    }

    let totalCustomers = 0;
    if (customersData) {
      totalCustomers = customersData.length;
      customersData.forEach((c: any) => {
        const createdAt = new Date(c.createdAt || c.joiningDate || new Date());
        if (createdAt >= startOfCurrentMonth) {
          thisMonthNewCustomers++;
        } else if (createdAt >= startOfLastMonth && createdAt <= endOfLastMonth) {
          lastMonthNewCustomers++;
        }
      });
    }

    const todaysGrowth = yesterdayRev === 0 ? (todaysRevenue > 0 ? 100 : 0) : ((todaysRevenue - yesterdayRev) / yesterdayRev) * 100;
    const monthlyGrowth = lastMonthRev === 0 ? (currentMonthRev > 0 ? 100 : 0) : ((currentMonthRev - lastMonthRev) / lastMonthRev) * 100;
    const customerGrowth = lastMonthNewCustomers === 0 ? (thisMonthNewCustomers > 0 ? 100 : 0) : ((thisMonthNewCustomers - lastMonthNewCustomers) / lastMonthNewCustomers) * 100;

    const formattedRevenueByPlan = Object.keys(planRevenues).map(planId => {
      const planInfo = membershipPlans?.find(p => p.id === planId);
      return {
        planId,
        planName: planInfo?.name || 'Unknown Plan',
        revenue: planRevenues[planId],
        members: planMembers[planId],
      };
    }).sort((a, b) => b.revenue - a.revenue);

    const formattedTodaysRevenueByPlan = Object.keys(todaysPlanRevenues).map(planId => {
      const planInfo = membershipPlans?.find(p => p.id === planId);
      return {
        planId,
        planName: planInfo?.name || 'Unknown Plan',
        revenue: todaysPlanRevenues[planId],
        members: planMembers[planId], // using total members for that plan
      };
    }).sort((a, b) => b.revenue - a.revenue);

    const formattedMonthlyChart = Object.keys(monthlyRev).map(month => ({
      month,
      value: monthlyRev[month]
    }));

    const maxRevenue = Math.max(...formattedMonthlyChart.map(m => m.value), 0);

    const recentTransactions = allPayments ? [...allPayments].sort((a: any, b: any) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime()).slice(0, 5) : [];
    
    // All payments sorted by time
    const allTransactions = allPayments ? [...allPayments].sort((a: any, b: any) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime()) : [];

    // Sort today's payments directly by time
    const formattedTodaysPayments = todaysPayments.sort((a: any, b: any) => new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime());

    return {
      totalRevenue,
      todaysRevenue,
      todaysGrowth,
      monthlyGrowth,
      revenueByPlan: formattedRevenueByPlan,
      todaysRevenueByPlan: formattedTodaysRevenueByPlan,
      monthlyRevenueChart: formattedMonthlyChart,
      maxRevenue,
      totalCustomers,
      customerGrowth,
      recentTransactions,
      allTransactions,
      todaysPayments: formattedTodaysPayments,
      customersData,
      customerPlans
    };
  }, [gymPaymentsData, customerGymPaymentsData, customersData, membershipPlans, customerPlans, selectedYear, selectedDate]);

  return { ...financeData, isLoading };
}
