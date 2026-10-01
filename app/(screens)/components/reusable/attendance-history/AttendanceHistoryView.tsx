"use client";

import { useState, useMemo, useEffect } from "react";
import { formatDateStr } from "./utils";
import AttendanceHistoryHeader from "./AttendanceHistoryHeader";
import MemberSummaryCard from "./MemberSummaryCard";
import ThisWeekStrip from "./ThisWeekStrip";
import CalendarPanel from "./CalendarPanel";
import SelectedDayDetails from "./SelectedDayDetails";
import { useGymCustomerById } from "@/lib/hooks/customers/useGymCustomers";
import { useCustomerAttendance } from "@/lib/hooks/attendance/useCustomerAttendance";
import { useBiometricAttendanceLogs } from "@/lib/hooks/biometrics/useBiometricAttendanceLogs";
import { useAssignedTrainersByCustomer } from "@/lib/hooks/customerTrainers/useCustomerTrainers";
import { useCustomerWeeklyPlan } from "@/lib/hooks/customerWorkouts/useCustomerWeeklyPlan";

export default function AttendanceHistoryView({ customerId }: { customerId?: string }) {
  const [isMounted, setIsMounted] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const { data: gymCustomer, isLoading: isCustomerLoading } = useGymCustomerById(customerId);
  const { data: attendanceLogs, isLoading: isAttendanceLoading } = useCustomerAttendance(customerId);
  const { data: biometricData, isLoading: isBiometricLoading } = useBiometricAttendanceLogs(gymCustomer?.gymId, 1, 300, { customerId });
  const { data: trainers, isLoading: isTrainersLoading } = useAssignedTrainersByCustomer(customerId);
  const { data: weeklyPlanData, isLoading: isPlanLoading } = useCustomerWeeklyPlan(customerId, selectedDate);

  useEffect(() => {
    setIsMounted(true);
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
  }, []);

  const attendanceData = useMemo(() => {
    const record: Record<string, boolean> = {};
    if (attendanceLogs) {
      attendanceLogs.forEach((log: any) => {
        if (log.markedAt) {
          record[formatDateStr(new Date(log.markedAt))] = true;
        }
      });
    }
    if (biometricData?.data) {
      biometricData.data.forEach((log: any) => {
        if (log.scanTimestamp) {
          record[formatDateStr(new Date(log.scanTimestamp))] = true;
        }
      });
    }
    return record;
  }, [attendanceLogs, biometricData]);

  const currentStreak = useMemo(() => {
    let streak = 0;
    let checkDate = new Date();

    const todayStr = formatDateStr(checkDate);
    if (!attendanceData[todayStr]) {
      checkDate.setDate(checkDate.getDate() - 1);
      if (!attendanceData[formatDateStr(checkDate)]) {
        return 0;
      }
    }

    while (true) {
      if (attendanceData[formatDateStr(checkDate)]) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }, [attendanceData]);

  const memberData = useMemo(() => {
    const initials = gymCustomer?.fullName?.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() || "--";
    const custId = gymCustomer?.gymId && gymCustomer?.customerId
      ? `#${gymCustomer.gymId.substring(0, 4)}-${gymCustomer.customerId.substring(0, 4)}`.toUpperCase()
      : "--";

    return {
      memberInitials: initials,
      memberName: gymCustomer?.fullName || "Loading...",
      memberStatus: gymCustomer?.is_Active ? "Active Member" : "Inactive Member",
      customerId: custId,
      daysAttended: `${Object.keys(attendanceData).length} Total`,
      currentStreak: `${currentStreak} Days 🔥`,
    };
  }, [gymCustomer, attendanceData, currentStreak]);

  const selectedDateStr = formatDateStr(selectedDate);
  const selectedDayLogs = useMemo(() => {
    const logs: { time: number, type: string }[] = [];
    if (attendanceLogs) {
      attendanceLogs.forEach((log: any) => {
        if (log.markedAt && formatDateStr(new Date(log.markedAt)) === selectedDateStr) {
          logs.push({ time: new Date(log.markedAt).getTime(), type: 'checkin' });
        }
      });
    }
    if (biometricData?.data) {
      biometricData.data.forEach((log: any) => {
        if (log.scanTimestamp && formatDateStr(new Date(log.scanTimestamp)) === selectedDateStr) {
          logs.push({ time: new Date(log.scanTimestamp).getTime(), type: log.logType === 'check-out' ? 'checkout' : 'checkin' });
        }
      });
    }
    return logs.sort((a, b) => a.time - b.time);
  }, [attendanceLogs, biometricData, selectedDateStr]);

  let checkInTime = null;
  let checkOutTime = null;
  let duration = null;

  if (selectedDayLogs.length > 0) {
    const firstLog = selectedDayLogs[0];
    const lastLog = selectedDayLogs[selectedDayLogs.length - 1];

    checkInTime = new Date(firstLog.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (selectedDayLogs.length > 1) {
      checkOutTime = new Date(lastLog.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const diffMs = lastLog.time - firstLog.time;
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      if (hours > 0) {
        duration = `${hours}h ${mins}m`;
      } else {
        duration = `${mins}m`;
      }
    }
  }

  const trainerName = useMemo(() => {
    if (trainers && trainers.length > 0) {
      return trainers[0].trainer?.fullName || trainers[0].gym_trainers?.fullName || "-";
    }
    return "-";
  }, [trainers]);

  const routineFocus = useMemo(() => {
    if (!weeklyPlanData?.loadedPlanDays) return "Rest";
    const weeklyPlan = weeklyPlanData.loadedPlanDays;

    const daysOfWeekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const jsDay = selectedDate.getDay();
    const isoDay = jsDay === 0 ? 7 : jsDay;

    const possibleMatches = [
      daysOfWeekNames[jsDay].toLowerCase(),
      daysOfWeekNames[jsDay].substring(0, 3).toLowerCase(),
      String(jsDay),
      String(isoDay),
    ];

    for (const week of Object.values(weeklyPlan) as any[]) {
      if (week && typeof week === 'object') {
        const dayPlan = Object.entries(week).find(([key]) => {
          const isMatch = possibleMatches.includes(key.trim().toLowerCase());
          return isMatch;
        });
        if (dayPlan && (dayPlan[1] as any)?.workoutType) {
          const wType = (dayPlan[1] as any).workoutType;
          if (wType) {
            return wType.charAt(0).toUpperCase() + wType.slice(1);
          }
        }
      }
    }
    return "Rest";
  }, [weeklyPlanData, selectedDate]);

  if (!isMounted) return null;

  if (isCustomerLoading || isAttendanceLoading || isBiometricLoading || isTrainersLoading || isPlanLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6 sm:gap-8 pb-12">
      <div className="w-full max-w-[960px]">
        <AttendanceHistoryHeader />
      </div>

      <div className="flex flex-col w-full max-w-[960px] gap-6">
        <MemberSummaryCard data={memberData} />

        <ThisWeekStrip selectedDate={selectedDate} setSelectedDate={setSelectedDate} attendanceData={attendanceData} />

        <div className="flex flex-col lg:flex-row items-stretch gap-6 w-full">
          <CalendarPanel
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            attendanceData={attendanceData}
          />
          <SelectedDayDetails
            selectedDate={selectedDate}
            attendanceData={attendanceData}
            checkInTime={checkInTime}
            checkOutTime={checkOutTime}
            duration={duration}
            trainerName={trainerName}
            routineFocus={routineFocus}
          />
        </div>
      </div>

    </div>
  );
}
