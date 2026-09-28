"use client";

import { useState, useMemo, useEffect } from "react";
import { generateMockAttendance } from "./utils";
import AttendanceHistoryHeader from "./AttendanceHistoryHeader";
import MemberSummaryCard from "./MemberSummaryCard";
import ThisWeekStrip from "./ThisWeekStrip";
import CalendarPanel from "./CalendarPanel";
import SelectedDayDetails from "./SelectedDayDetails";

export default function AttendanceHistoryView() {
  const [isMounted, setIsMounted] = useState(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    setIsMounted(true);
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
  }, []);

  const mockData = {
    memberInitials: "RS",
    memberName: "Rahul Sharma",
    memberStatus: "Active Member",
    customerId: "#GYM-8821",
    daysAttended: "14 / 20",
    currentStreak: "4 Days 🔥",
  };

  // Generate mock attendance based on current month viewing
  const attendanceData = useMemo(() => {
    return generateMockAttendance(currentMonth.getFullYear(), currentMonth.getMonth());
  }, [currentMonth.getFullYear(), currentMonth.getMonth()]);

  if (!isMounted) return null;

  return (
    <div className="flex flex-col items-center w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-6 sm:gap-8 pb-12">
      <div className="w-full max-w-[960px]">
        <AttendanceHistoryHeader />
      </div>
      
      <div className="flex flex-col w-full max-w-[960px] gap-6">
        <MemberSummaryCard data={mockData} />
        
        <ThisWeekStrip selectedDate={selectedDate} setSelectedDate={setSelectedDate} attendanceData={attendanceData} />
        
        <div className="flex flex-col lg:flex-row items-stretch gap-6 w-full">
          <CalendarPanel 
            currentMonth={currentMonth} 
            setCurrentMonth={setCurrentMonth} 
            selectedDate={selectedDate} 
            setSelectedDate={setSelectedDate} 
            attendanceData={attendanceData} 
          />
          <SelectedDayDetails selectedDate={selectedDate} attendanceData={attendanceData} />
        </div>
      </div>
    </div>
  );
}
