"use client";

import { SignIn, SignOut, Clock, Bed, Barbell } from "@phosphor-icons/react/dist/ssr";
import { formatDateStr } from "./utils";

interface SelectedDayDetailsProps {
  selectedDate: Date;
  attendanceData: Record<string, boolean>;
  checkInTime?: string | null;
  checkOutTime?: string | null;
  duration?: string | null;
  trainerName?: string;
  routineFocus?: string;
}

export default function SelectedDayDetails({ 
  selectedDate, 
  attendanceData,
  checkInTime,
  checkOutTime,
  duration,
  trainerName = "-",
  routineFocus = "Rest"
}: SelectedDayDetailsProps) {
  const dateStr = formatDateStr(selectedDate);
  const isPresent = attendanceData[dateStr] === true;
  
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const displayDate = `${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;

  return (
    <div className="flex flex-col items-start p-6 w-full bg-[#111319] border border-[#232730] rounded-2xl gap-5 flex-1 min-w-[300px]">
      
      <div className="flex flex-row flex-wrap justify-between items-start w-full pb-4 border-b border-[#232730] gap-4">
        <div className="flex flex-col items-start gap-1 min-w-0">
          <span className="font-sans font-semibold text-[10px] sm:text-xs leading-4 tracking-[0.6px] uppercase text-[#94A3B8]">
            Selected Day Details
          </span>
          <h3 className="font-sans font-bold text-lg sm:text-xl md:text-2xl leading-8 text-white m-0 whitespace-nowrap">
            {displayDate}
          </h3>
        </div>
        
        {isPresent ? (
          <div className="flex justify-center items-center px-2 sm:px-3 py-1 bg-[rgba(200,255,0,0.15)] border border-[rgba(200,255,0,0.3)] rounded-full shrink-0">
            <span className="font-sans font-bold text-[9px] sm:text-[10px] md:text-[11px] leading-4 tracking-[0.6px] uppercase text-[#C8FF00] whitespace-nowrap">
              Workout Day
            </span>
          </div>
        ) : (
          <div className="flex justify-center items-center px-2 sm:px-3 py-1 bg-[rgba(239,68,68,0.1)] border border-[rgba(239,68,68,0.3)] rounded-full shrink-0">
            <span className="font-sans font-bold text-[9px] sm:text-[10px] md:text-[11px] leading-4 tracking-[0.6px] uppercase text-red-400 whitespace-nowrap">
              Rest Day
            </span>
          </div>
        )}
      </div>

      {isPresent ? (
        <div className="grid grid-cols-3 gap-2 w-full">
          <div className="flex flex-col items-center text-center px-1.5 py-3 sm:p-3.5 pb-4 sm:pb-4 gap-1 w-full bg-[#14171D] border border-[rgba(35,39,48,0.8)] rounded-xl min-w-0">
            <div className="flex justify-center items-center w-6 h-6 sm:w-8 sm:h-8 bg-[rgba(16,185,129,0.2)] rounded-lg mb-1 sm:mb-2 shrink-0">
              <SignIn size={16} className="text-[#34D399]" />
            </div>
            <span className="font-sans font-semibold text-[9px] sm:text-[10px] leading-3 sm:leading-4 uppercase text-[#94A3B8] whitespace-nowrap tracking-tighter sm:tracking-normal">
              Check In
            </span>
            <span className="font-sans font-bold text-[11px] sm:text-xs lg:text-base leading-4 sm:leading-6 tracking-[-0.3px] text-white whitespace-nowrap">
              {checkInTime || "--:--"}
            </span>
          </div>

          <div className="flex flex-col items-center text-center px-1.5 py-3 sm:p-3.5 pb-4 sm:pb-4 gap-1 w-full bg-[#14171D] border border-[rgba(35,39,48,0.8)] rounded-xl min-w-0">
            <div className="flex justify-center items-center w-6 h-6 sm:w-8 sm:h-8 bg-[rgba(244,63,94,0.2)] rounded-lg mb-1 sm:mb-2 shrink-0">
              <SignOut size={16} className="text-[#FB7185]" />
            </div>
            <span className="font-sans font-semibold text-[9px] sm:text-[10px] leading-3 sm:leading-4 uppercase text-[#94A3B8] whitespace-nowrap tracking-tighter sm:tracking-normal">
              Check Out
            </span>
            <span className="font-sans font-bold text-[11px] sm:text-xs lg:text-base leading-4 sm:leading-6 tracking-[-0.3px] text-white whitespace-nowrap">
              {checkOutTime || "--:--"}
            </span>
          </div>

          <div className="flex flex-col items-center text-center px-1.5 py-3 sm:p-3.5 pb-4 sm:pb-4 gap-1 w-full bg-[#14171D] border border-[rgba(35,39,48,0.8)] rounded-xl min-w-0">
            <div className="flex justify-center items-center w-6 h-6 sm:w-8 sm:h-8 bg-[rgba(200,255,0,0.2)] rounded-lg mb-1 sm:mb-2 shrink-0">
              <Clock size={16} className="text-[#C8FF00]" />
            </div>
            <span className="font-sans font-semibold text-[9px] sm:text-[10px] leading-3 sm:leading-4 uppercase text-[#94A3B8] whitespace-nowrap tracking-tighter sm:tracking-normal">
              Duration
            </span>
            <span className="font-sans font-bold text-[11px] sm:text-xs lg:text-base leading-4 sm:leading-6 tracking-[-0.3px] text-white whitespace-nowrap">
              {duration || "--"}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex flex-row items-center justify-center p-6 gap-3 w-full bg-[#14171D] border border-[rgba(35,39,48,0.8)] rounded-xl">
          <Bed size={24} className="text-[#94A3B8]" />
          <span className="font-sans font-medium text-sm text-[#94A3B8]">
            No activity recorded for this date.
          </span>
        </div>
      )}

      {isPresent && (
        <div className="flex flex-col items-start p-4 sm:p-[18px] w-full bg-[rgba(20,23,29,0.6)] border border-[rgba(35,39,48,0.8)] rounded-[14px] gap-4">
          <div className="flex flex-row items-center gap-[7px] w-full">
            <Barbell size={16} className="text-[#C8FF00]" weight="bold" />
            <h4 className="font-sans font-bold text-[13px] sm:text-[14px] leading-[18px] tracking-[0.34px] uppercase text-white m-0">
              Session Breakdown
            </h4>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col items-start p-3 w-full bg-[rgba(17,19,25,0.8)] border border-[rgba(35,39,48,0.6)] rounded-[9px] gap-1">
              <span className="font-mono text-[11px] leading-[17px] uppercase text-[#94A3B8]">
                Routine Focus
              </span>
              <span className="font-sans font-semibold text-[13px] sm:text-[14px] leading-[18px] text-[#E2E8F0]">
                {routineFocus}
              </span>
            </div>

            <div className="flex flex-col items-start p-3 w-full bg-[rgba(17,19,25,0.8)] border border-[rgba(35,39,48,0.6)] rounded-[9px] gap-1">
              <span className="font-mono text-[11px] leading-[17px] uppercase text-[#94A3B8]">
                Floor Trainer
              </span>
              <span className="font-sans font-semibold text-[13px] sm:text-[14px] leading-[18px] text-[#E2E8F0]">
                {trainerName}
              </span>
            </div>

            {/* Est. Calories hidden per request
            <div className="flex flex-col items-start p-3 w-full bg-[rgba(17,19,25,0.8)] border border-[rgba(35,39,48,0.6)] rounded-[9px] gap-1">
              <span className="font-mono text-[11px] leading-[17px] uppercase text-[#94A3B8]">
                Est. Calories
              </span>
              <span className="font-sans font-semibold text-[13px] sm:text-[14px] leading-[18px] text-[#C8FF00]">
                640 kcal <span className="text-white">🔥</span>
              </span>
            </div>
            */}
          </div>
        </div>
      )}

    </div>
  );
}
