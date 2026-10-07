"use client";

import { useState, useMemo, useEffect } from "react";
import AlertsHeader from "./_components/AlertsHeader";
import AlertsFilterBar from "./_components/AlertsFilterBar";
import AlertsTable, { AlertItem } from "./_components/AlertsTable";
import { useUser } from "@/app/context/UserContext";
import { useGymCustomers } from "@/lib/hooks/customers/useGymCustomers";
import { useGymCustomerMembershipPlans } from "@/lib/hooks/gymCustomerMembershipPlans/useGymCustomerMembershipPlans";
import { useGymAttendanceToday } from "@/lib/hooks/attendance/useGymAttendanceToday";
import { useBiometricAttendanceLogs } from "@/lib/hooks/biometrics/useBiometricAttendanceLogs";
import { useGymInventoryList } from "@/lib/hooks/inventory/useGymInventory";
import { useCustomerTrainersByGym } from "@/lib/hooks/customerTrainers/useCustomerTrainers";

export default function AlertsRemindersPage() {
  const { roleData } = useUser();
  const gymId = roleData?.[0]?.gymId;
  const [selectedType, setSelectedType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 600);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const { data: customersRaw } = useGymCustomers(gymId);
  const { data: plansRaw } = useGymCustomerMembershipPlans(gymId);
  const { data: inventoryRaw } = useGymInventoryList(gymId);
  const { data: ptSessionsRaw } = useCustomerTrainersByGym(gymId);
  
  const tzOffset = new Date().getTimezoneOffset() * 60000;
  const localToday = new Date(Date.now() - tzOffset).toISOString().slice(0, 10);

  const { data: attendanceRaw } = useGymAttendanceToday(gymId, localToday);
  const { data: biometricRaw } = useBiometricAttendanceLogs(gymId, 1, 1000, { fromDate: localToday, toDate: localToday });

  const alerts: AlertItem[] = useMemo(() => {
    if (!gymId) return [];
    let items: AlertItem[] = [];
    const today = new Date(localToday);

    const getCustomerName = (id: string) => {
      const c = customersRaw?.find((cust: any) => cust.customerId === id);
      return c?.fullName || "Unknown Member";
    };

    // 1. Membership & 2. Payment
    if (plansRaw) {
      plansRaw.forEach((plan: any) => {
        if (!plan.is_Active || plan.is_deleted) return;
        if (plan.endDate) {
          const endDateStr = new Date(plan.endDate).toISOString().slice(0,10);
          const endDate = new Date(endDateStr);
          const diffDays = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
          if ([1, 3, 5, 7].includes(diffDays)) {
            items.push({
              id: `mem-${plan.customerGymPlanId}`,
              title: `${diffDays === 1 ? '1 day' : diffDays + ' days'} left for membership expiry`,
              subtitle: `Review renewal for ${getCustomerName(plan.customerId)}`,
              type: "Membership",
              details: `Membership for ${getCustomerName(plan.customerId)} expires on ${new Date(plan.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}.`,
              date: new Date(plan.updatedAt || localToday).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
              rawDate: new Date(plan.updatedAt || localToday).toISOString(),
              color: "red"
            });
          }
        }
        
        if (plan.updatedAt && plan.startDate) {
          const updateD = new Date(plan.updatedAt).toISOString().slice(0,10);
          const startD = new Date(plan.startDate).toISOString().slice(0,10);
          if (updateD === localToday && startD === localToday) {
            items.push({
              id: `pay-${plan.customerGymPlanId}`,
              title: `${getCustomerName(plan.customerId)} made a payment`,
              subtitle: `Purchased ${plan.gymMembershipPlanName}`,
              type: "Payment",
              details: `${getCustomerName(plan.customerId)} renewed/purchased ${plan.gymMembershipPlanName}.`,
              date: new Date(plan.updatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
              rawDate: new Date(plan.updatedAt).toISOString(),
              color: "green"
            });
          }
        }
      });
    }

    // 3. Attendance
    const attendedSet = new Set<string>();
    if (attendanceRaw) {
      attendanceRaw.forEach((a: any) => attendedSet.add(a.customerId));
    }
    if (biometricRaw?.data) {
      biometricRaw.data.forEach((b: any) => {
        if (b.customerId) attendedSet.add(b.customerId);
      });
    }

    const count = attendedSet.size;
    let milestone = 0;
    if (count >= 50) milestone = 50;
    else if (count >= 40) milestone = 40;
    else if (count >= 30) milestone = 30;
    else if (count >= 20) milestone = 20;

    if (milestone > 0) {
      items.push({
        id: `att-milestone-${localToday}`,
        title: "Attendance milestone",
        subtitle: `${milestone}${milestone === 50 ? '+' : ''} members checked in today`,
        type: "Attendance",
        details: `Reached ${milestone}${milestone === 50 ? '+' : ''} member check-ins today.`,
        date: new Date(localToday).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        rawDate: new Date(localToday).toISOString(),
        color: "orange"
      });
    }

    // 4. Inventory
    if (inventoryRaw) {
      inventoryRaw.forEach((inv: any) => {
        if (inv.available <= 5 && !inv.is_deleted && inv.is_Active !== false) {
          items.push({
            id: `inv-${inv.gymInventoryId}`,
            title: "Low inventory alert",
            subtitle: `${inv.equipmentName} only ${inv.available} units left`,
            type: "Inventory",
            details: `${inv.equipmentName} stock is low. Only ${inv.available} units left.`,
            date: new Date(inv.updatedAt || localToday).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            rawDate: new Date(inv.updatedAt || localToday).toISOString(),
            color: "pink"
          });
        }
      });
    }

    // 5. PT Sessions
    if (ptSessionsRaw) {
      ptSessionsRaw.forEach((pt: any) => {
        const updateD = new Date(pt.updatedAt || pt.createdAt).toISOString().slice(0, 10);
        if (updateD === localToday && pt.is_Active && !pt.is_deleted) {
          items.push({
            id: `pt-${pt.customerTrainerId}`,
            title: "Personal training package purchased",
            subtitle: `${getCustomerName(pt.customerId)} purchased PT Sessions`,
            type: "PT Sessions",
            details: `${getCustomerName(pt.customerId)} purchased a package of PT Sessions.`,
            date: new Date(pt.updatedAt || pt.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            rawDate: new Date(pt.updatedAt || pt.createdAt).toISOString(),
            color: "teal"
          });
        }
      });
    }

    return items;
  }, [gymId, customersRaw, plansRaw, attendanceRaw, biometricRaw, inventoryRaw, ptSessionsRaw, localToday]);

  const filteredAlerts = useMemo(() => {
    let result = alerts;

    if (selectedType) {
      result = result.filter(a => a.type === selectedType);
    }

    if (debouncedSearch) {
      const lower = debouncedSearch.toLowerCase();
      result = result.filter(a => 
        a.title.toLowerCase().includes(lower) || 
        a.subtitle.toLowerCase().includes(lower) || 
        a.details.toLowerCase().includes(lower)
      );
    }

    if (fromDate) {
      const fd = new Date(fromDate);
      result = result.filter(a => a.rawDate && new Date(a.rawDate) >= fd);
    }
    if (toDate) {
      const td = new Date(toDate);
      td.setHours(23, 59, 59, 999);
      result = result.filter(a => a.rawDate && new Date(a.rawDate) <= td);
    }

    // Sort by date descending
    result.sort((a, b) => {
      const dateA = a.rawDate ? new Date(a.rawDate).getTime() : 0;
      const dateB = b.rawDate ? new Date(b.rawDate).getTime() : 0;
      return dateB - dateA;
    });

    return result;
  }, [alerts, selectedType, debouncedSearch, fromDate, toDate]);

  return (
    <div className="flex flex-col items-start px-4 sm:px-8 py-6 pb-12 gap-5 w-full max-w-[1024px] mx-auto">
      <AlertsHeader />
      <AlertsFilterBar 
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />
      <AlertsTable alerts={filteredAlerts} />
    </div>
  );
}
