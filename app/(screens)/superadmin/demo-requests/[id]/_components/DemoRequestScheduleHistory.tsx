import { ClockCounterClockwise } from "@phosphor-icons/react";
import { DemoBookingHistoryItem } from "@/app/actions/demoRequests";

interface DemoRequestScheduleHistoryProps {
  history: DemoBookingHistoryItem[];
}

export function DemoRequestScheduleHistory({ history }: DemoRequestScheduleHistoryProps) {
  if (!history || history.length === 0) return null;

  return (
    <div className="pt-3 mt-3 border-t border-[#1C2638] space-y-2">
      <span className="text-[11px] font-bold text-[#8E99AB] uppercase tracking-wider flex items-center gap-1.5">
        <ClockCounterClockwise size={13} />
        Schedule History ({history.length})
      </span>
      <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
        {history.map((h) => (
          <div
            key={h.id}
            className="p-2 rounded-lg bg-[#070A10] border border-[#1A2234] text-[11px] flex items-center justify-between gap-2"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-white">
                {h.rescheduleDate || "Date TBD"} • {h.rescheduleTime || "Time TBD"}
              </span>
              {h.previousDate && (
                <span className="text-[10px] text-[#64748B]">
                  Prev: {h.previousDate} {h.previousTime || ""}
                </span>
              )}
            </div>
            {h.status && (
              <span className="capitalize px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#141B28] text-[#8E99AB] border border-[#232F46]">
                {h.status}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
