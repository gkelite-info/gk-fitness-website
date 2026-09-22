"use client";

import { useUser } from "@/app/context/UserContext";
import { useMemo, useState } from "react";
import OverviewMetrics from "./_components/OverviewMetrics";
import ManualAttendanceBanner from "./_components/ManualAttendanceBanner";
import QuickActions from "./_components/QuickActions";
import ManagementShortcuts from "./_components/ManagementShortcuts";
import OperationsMetrics from "./_components/OperationsMetrics";
import AnnouncementsCard from "./_components/AnnouncementsCard";
import AlertsRemindersCard from "./_components/AlertsRemindersCard";
import FinancesCard from "./_components/FinancesCard";
import EnquiriesCard from "./_components/EnquiriesCard";
import RevenueTrendChart from "./_components/RevenueTrendChart";
import {
  useGymCustomers,
  useGymAttendanceToday,
  useGymPayments,
  useGymCustomerMembershipPlans,
  useCustomerTrainersByGym,
  useGymTrainers,
} from "@/lib/hooks/useOwnerDashboard";

export default function OwnerDashboardPage() {
  const { user, roleData } = useUser();
  const userId = user?.id;
  const gymId = roleData?.[0]?.gymId;

  const [selectedDate] = useState<Date>(new Date());

  const getYYYYMMDD = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const selectedDateStr = getYYYYMMDD(selectedDate);

  const { data: customerPlans, isLoading: isCustomerPlansLoading } = useGymCustomerMembershipPlans(userId);
  const { data: gymTrainers, isLoading: isGymTrainersLoading } = useGymTrainers(gymId);
  const { data: attendances, isLoading: isAttendancesLoading } = useGymAttendanceToday(gymId, selectedDateStr);
  const { data: payments, isLoading: isPaymentsLoading } = useGymPayments(userId);
  const { data: gymCustomerTrainers } = useCustomerTrainersByGym(gymId);

  const activeCustomersCount = customerPlans?.filter((plan: any) => {
    if (!plan.startDate || !plan.endDate) return false;
    return plan.startDate <= selectedDateStr && plan.endDate >= selectedDateStr;
  }).reduce((acc: Set<string>, plan: any) => {
    acc.add(plan.customerId);
    return acc;
  }, new Set<string>()).size || 0;

  const getTomorrowYYYYMMDD = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const tomorrowStr = getTomorrowYYYYMMDD();
  const expiringCount = customerPlans
    ? new Set(customerPlans.filter((p: any) => p.endDate === tomorrowStr).map((p: any) => p.customerId)).size
    : 0;

  const activeTrainersCount = gymTrainers?.filter((t: any) => t.is_Active !== false).length || 0;
  const totalActive = activeCustomersCount + activeTrainersCount;

  const checkInsCount = attendances
    ? new Set(attendances.map((att: any) => att.customerId)).size
    : 0;

  const paymentsToday = payments?.filter((payment: any) => payment.paymentDate === selectedDateStr) || [];

  const revenueToday = paymentsToday.reduce((sum: number, payment: any) => {
    return sum + Number(payment.amountPaid || 0);
  }, 0);

  const calculateMonthlyGrowth = () => {
    if (!payments || payments.length === 0) return "0%";

    const currentYear = selectedDate.getFullYear();
    const currentMonth = selectedDate.getMonth();
    const currentDay = selectedDate.getDate();

    const currentMonthStart = new Date(currentYear, currentMonth, 1);
    const prevMonthStart = new Date(currentYear, currentMonth - 1, 1);
    const prevMonthEnd = new Date(currentYear, currentMonth - 1, currentDay);

    let currentMonthRevenue = 0;
    let prevMonthRevenue = 0;

    payments.forEach((payment: any) => {
      if (payment.paymentDate) {
        const pDate = new Date(payment.paymentDate);
        if (pDate >= currentMonthStart && pDate <= selectedDate) {
          currentMonthRevenue += Number(payment.amountPaid || 0);
        } else if (pDate >= prevMonthStart && pDate <= prevMonthEnd) {
          prevMonthRevenue += Number(payment.amountPaid || 0);
        }
      }
    });

    if (prevMonthRevenue === 0) {
      return currentMonthRevenue > 0 ? "+100%" : "0%";
    }
    const growth = ((currentMonthRevenue - prevMonthRevenue) / prevMonthRevenue) * 100;
    return `${growth >= 0 ? "+" : ""}${growth.toFixed(1)}%`;
  };

  const growthValue = calculateMonthlyGrowth();

  const formatCurrency = (val: number) => {
    if (val === 0) return '₹0';
    if (val >= 100000) return `₹${Math.round((val / 100000) * 10) / 10}L`;
    if (val >= 1000) return `₹${Math.round((val / 1000) * 10) / 10}K`;
    return `₹${val}`;
  };

  const activePtSessionsCount = gymCustomerTrainers?.filter((ct: any) => ct.isActive).length || 0;

  const monthlyRevenueData = useMemo(() => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const monthlyRev: Record<string, number> = {};
    monthNames.forEach(m => { monthlyRev[m] = 0; });

    if (payments) {
      payments.forEach((payment: any) => {
        const amount = Number(payment.amountPaid || 0);
        if (amount > 0 && payment.paymentDate) {
          const pDate = new Date(payment.paymentDate);
          if (pDate.getFullYear() === currentYear) {
            const monthKey = monthNames[pDate.getMonth()];
            if (monthlyRev[monthKey] !== undefined) {
              monthlyRev[monthKey] += amount;
            }
          }
        }
      });
    }

    return monthNames.map(month => monthlyRev[month]);
  }, [payments]);

  return (
    <div className="flex flex-col items-start px-4 sm:px-8 py-6 pb-12 gap-7 w-full max-w-[1024px] mx-auto 2xl:max-w-[1200px]">
      <OverviewMetrics
        activeCustomers={isCustomerPlansLoading || isGymTrainersLoading ? null : totalActive}
        checkIns={isAttendancesLoading ? null : checkInsCount}
        revenueToday={isPaymentsLoading ? null : formatCurrency(revenueToday)}
        monthlyGrowth={isPaymentsLoading ? null : growthValue}
      />
      <ManualAttendanceBanner />

      <div className="w-full grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        <div className="flex flex-col gap-6 xl:col-span-7">
          <QuickActions />
          {/* <ManagementShortcuts /> */}
          <OperationsMetrics ptSessionsCount={activePtSessionsCount} />
        </div>

        <div className="flex flex-col gap-6 xl:col-span-5">
          <AnnouncementsCard />
          <AlertsRemindersCard expiringCount={expiringCount} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FinancesCard paymentsToday={paymentsToday} />
            <EnquiriesCard />
          </div>
        </div>
      </div>

      <RevenueTrendChart data={monthlyRevenueData} />
    </div>
  );
}
