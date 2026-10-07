import { LogEntry } from "./types";
import { ArrowDownLeft, ArrowUpRight, WarningCircle, CheckCircle } from "@phosphor-icons/react/dist/ssr";

type LogCardProps = {
  log: LogEntry;
};

export default function LogCard({ log }: LogCardProps) {
  const isCheckIn = log.type === "Check In";
  const isRejected = log.status.toLowerCase() === "rejected";
  const isAccepted = log.status.toLowerCase() === "accepted" || log.status.toLowerCase() === "success" || log.status.toLowerCase() === "approved";

  return (
    <div className="flex flex-col bg-[#14161A] border border-[#232631] rounded-2xl p-5 sm:p-6 gap-6 hover:bg-[#1A1D24] transition-colors w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 sm:gap-2">
        <div className="flex flex-col gap-1 w-full sm:w-auto">
          <h4 className="font-sans font-bold text-[18px] leading-5 text-white whitespace-nowrap overflow-visible">
            {log.name}
          </h4>
          <span className="font-sans font-normal text-sm leading-5 text-[#A1A1AA]">
            {log.phone}
          </span>
        </div>
        <div 
          className={`flex flex-row justify-center items-center px-3 py-1.5 gap-1.5 rounded-xl border shrink-0 w-fit ${
            isCheckIn 
              ? "bg-[rgba(15,148,110,0.1)] border-[rgba(15,148,110,0.2)]" 
              : "bg-[rgba(56,189,248,0.1)] border-[rgba(56,189,248,0.2)]"
          }`}
        >
          {isCheckIn ? (
            <ArrowDownLeft size={14} className="text-[#0F946E]" weight="bold" />
          ) : (
            <ArrowUpRight size={14} className="text-[#38BDF8]" weight="bold" />
          )}
          <span className={`font-sans font-semibold text-[13px] leading-5 ${isCheckIn ? "text-[#0F946E]" : "text-[#38BDF8]"}`}>
            {log.type}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-4 w-full">
        <div className="flex flex-col gap-1.5">
          <span className="font-sans font-bold text-[11px] text-[#64748B] uppercase tracking-wider">
            Device
          </span>
          <span className="font-sans font-bold text-[14px] leading-5 text-white truncate">
            {log.deviceName}
          </span>
          <span className="font-sans font-medium text-[13px] leading-5 text-[#A1A1AA]">
            Auth: <span className="text-[#CBF83E]">{log.authMethod}</span>
          </span>
        </div>
        
        <div className="flex flex-col gap-1.5">
          <span className="font-sans font-bold text-[11px] text-[#64748B] uppercase tracking-wider">
            Scan Time
          </span>
          <span className="font-sans font-bold text-[14px] leading-5 text-white">
            {log.scanTimeStr}
          </span>
          <span className="font-sans font-medium text-[13px] leading-5 text-[#A1A1AA]">
            {log.scanDateStr}
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="font-sans font-bold text-[11px] text-[#64748B] uppercase tracking-wider">
            Status
          </span>
          {isRejected ? (
            <>
              <div className="flex flex-row items-center gap-1.5 mt-[2px]">
                <WarningCircle size={16} className="text-[#F43F5E]" weight="fill" />
                <span className="font-sans font-bold text-[14px] leading-5 text-[#F43F5E]">
                  {log.status}
                </span>
              </div>
              {log.rejectReason && (
                <span className="font-sans font-medium text-[13px] leading-5 text-[#F43F5E]">
                  {log.rejectReason}
                </span>
              )}
            </>
          ) : isAccepted ? (
            <>
              <div className="flex flex-row items-center gap-1.5 mt-[2px]">
                <CheckCircle size={16} className="text-[#0F946E]" weight="fill" />
                <span className="font-sans font-bold text-[14px] leading-5 text-[#0F946E]">
                  {log.status}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-row items-center gap-1.5 mt-[2px]">
                <CheckCircle size={16} className="text-[#F59E0B]" weight="fill" />
                <span className="font-sans font-bold text-[14px] leading-5 text-[#F59E0B]">
                  {log.status}
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
