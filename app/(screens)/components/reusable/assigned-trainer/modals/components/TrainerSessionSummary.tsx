"use client";

import { TrendUp, Barbell, CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import { useTrainerSessionsByCustomerTrainerId } from "@/lib/hooks/trainerSessions/useTrainerSessions";

interface TrainerSessionSummaryProps {
  customerTrainerId?: string;
}

export default function TrainerSessionSummary({ customerTrainerId }: TrainerSessionSummaryProps) {
  const { data: sessions } = useTrainerSessionsByCustomerTrainerId(customerTrainerId);

  const completedSessions = sessions?.filter((s: any) => s.status === "completed") || [];
  const totalSessions = completedSessions.length;

  const lastSession = completedSessions.length > 0 ? completedSessions[0] : null;
  const lastSessionDate = lastSession?.sessionDate
    ? new Date(lastSession.sessionDate).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })
    : "-";

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return parseFloat((count / 1000).toFixed(count >= 10000 ? 0 : 1)) + "k";
    }
    return count.toString();
  };

  return (
    <div className="relative flex flex-col items-start p-[24px_24px_46px] flex-1 w-full min-h-[284px] bg-[#181C25] border border-[#252B38] rounded-[12px] overflow-hidden">
      <div className="absolute -top-[39px] -right-[39px] w-[144px] h-[144px] bg-[#CCFF00]/5 blur-[20px] rounded-full pointer-events-none z-0" />
      
      <div className="flex flex-col items-start gap-[16px] w-full z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-3 sm:gap-2">
          <div className="flex flex-row items-center gap-[10px]">
            <div className="flex justify-center items-center w-[28px] h-[28px] bg-[#CCFF00]/10 border border-[#CCFF00]/25 rounded-[8px] shrink-0">
              <TrendUp size={16} className="text-[#CCFF00]" weight="bold" />
            </div>
            <h4 className="font-sans font-bold text-[14px] leading-[20px] tracking-[0.7px] uppercase text-white m-0">
              SESSION SUMMARY
            </h4>
          </div>
          <div className="flex flex-row items-center px-[8px] py-[2px] gap-[6px] bg-[#CCFF00]/10 border border-[#CCFF00]/20 rounded-full shrink-0">
            <div className="w-[6px] h-[6px] bg-[#CCFF00] rounded-full" />
            <span className="font-sans font-semibold text-[11px] leading-[16px] text-[#CCFF00]">
              Tracked
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start gap-[12px] w-full mt-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end p-[16px] w-full bg-[#13161F] border border-[#232835] rounded-[12px] gap-4 sm:gap-3">
            <div className="flex flex-col items-start gap-[12px] min-w-0 flex-1 w-full sm:w-auto">
              <div className="flex justify-center items-center w-[40px] h-[40px] bg-[#CCFF00]/10 border border-[#CCFF00]/20 rounded-[8px] shrink-0">
                <Barbell size={20} className="text-[#CCFF00]" weight="bold" />
              </div>
              <div className="flex flex-col items-start gap-[2px]">
                <span className="font-sans font-semibold text-[11px] leading-[16px] tracking-[0.55px] uppercase text-[#9CA3AF]">
                  TOTAL SESSIONS
                </span>
                <div className="flex flex-row items-center gap-[4px]">
                  <TrendUp size={12} className="text-[#CCFF00] shrink-0" />
                  <span className="font-sans font-normal text-[10px] leading-[16px] text-[#9CA3AF]">
                    Sessions Completed
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-baseline justify-start sm:justify-end gap-1 shrink-0 w-full sm:w-auto text-left sm:text-right">
              <span className="font-sans font-bold text-[28px] sm:text-[30px] leading-[28px] sm:leading-[32px] tracking-[-0.75px] text-white">
                {formatCount(totalSessions)}
              </span>
              <span className="font-sans font-bold text-[10px] leading-[15px] tracking-[0.5px] uppercase text-[#CCFF00]">
                DONE
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end p-[16px] w-full bg-[#13161F] border border-[#232835] rounded-[12px] gap-4 sm:gap-3">
            <div className="flex flex-col items-start gap-[12px] min-w-0 flex-1 w-full sm:w-auto">
              <div className="flex justify-center items-center w-[40px] h-[40px] bg-[#202533] border border-[#2D3446] rounded-[8px] shrink-0">
                <CalendarBlank size={20} className="text-[#D1D5DB]" weight="bold" />
              </div>
              <div className="flex flex-col items-start gap-[2px]">
                <span className="font-sans font-semibold text-[11px] leading-[16px] tracking-[0.55px] uppercase text-[#9CA3AF]">
                  LAST SESSION
                </span>
                <div className="flex flex-row items-center px-[8px] py-[2px] gap-[6px] bg-[#202533] border border-[#2C3242] rounded-[6px] w-auto">
                  <TrendUp size={12} className="text-[#CCFF00] shrink-0" />
                  <span className="font-sans font-medium text-[10px] leading-[15px] text-[#D1D5DB]">
                    Duration: -
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start sm:items-end justify-start sm:justify-end shrink-0 w-full sm:w-auto text-left sm:text-right">
              <span className="font-sans font-bold text-[16px] leading-[24px] tracking-[-0.4px] text-white whitespace-nowrap">
                {lastSessionDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
