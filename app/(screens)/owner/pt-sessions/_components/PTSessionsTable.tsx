import { useState } from "react";
import { CaretRight, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import Pagination from "../../../components/reusable/Pagination";
import Avatar from "../../../components/reusable/Avatar";
import { SessionFilter } from "./PTSessionsCards";
import PTSessionDetailsModal from "./PTSessionDetailsModal";

export interface SessionData {
  id: string;
  time: string;
  timeSuffix: string;
  member: string;
  avatarUrl: string;
  trainer: string;
  trainerColor: string;
  workoutType: string;
  status: SessionFilter;
}

interface PTSessionsTableProps {
  sessions: SessionData[];
  currentPage: number;
  onPageChange: (page: number) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function PTSessionsTable({
  sessions,
  currentPage,
  onPageChange,
  searchQuery,
  onSearchChange,
}: PTSessionsTableProps) {
  const [selectedSession, setSelectedSession] = useState<SessionData | null>(null);

  const getStatusStyles = (status: SessionFilter) => {
    switch (status) {
      case "Completed":
        return "bg-[#0C2419] border-[#134931] text-[#10B981]";
      case "Upcoming":
        return "bg-[#271D0E] border-[#4D3615] text-[#F59E0B]";
      case "Cancelled":
        return "bg-[#291316] border-[#522125] text-[#EF4444]";
      default:
        return "bg-[#1A1C23] border-[#2A2E39] text-[#A0AEC0]";
    }
  };

  const getStatusIconColor = (status: SessionFilter) => {
    switch (status) {
      case "Completed":
        return "text-[#10B981]";
      case "Upcoming":
        return "text-[#F59E0B]";
      case "Cancelled":
        return "text-[#EF4444]";
      default:
        return "text-[#A0AEC0]";
    }
  };

  return (
    <div className="flex flex-col w-full gap-6">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <MagnifyingGlass size={16} className="text-[#5B6A7E]" />
        </div>
        <input
          type="text"
          className="w-full bg-[#10141D] border border-[#1B222F] rounded-xl pl-11 pr-4 py-[13px] text-sm text-white placeholder-[#5B6A7E] focus:outline-none focus:border-[#323842]"
          placeholder="Search member or trainer..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="flex flex-col w-full bg-[#10141D]/50 border border-[#1B222F] rounded-2xl overflow-hidden">
        <div className="flex flex-row justify-between items-center px-6 py-4 border-b border-[#19202C]">
          <div className="flex flex-row items-center gap-2">
            <span className="font-sans font-bold text-sm text-white">Today</span>
            <span className="font-sans font-normal text-xs text-[#4B5563]">•</span>
            <span className="font-sans font-medium text-xs text-[#7F8EA3]">29 July 2026</span>
          </div>
          <span className="font-sans font-semibold text-xs text-[#8B99AC]">18 Sessions</span>
        </div>

        <div className="w-full overflow-x-auto scrollbar-themed">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-[#181F2B]">
                <th className="px-6 py-3 font-sans font-bold text-[11px] leading-4 text-[#64748B]">Time</th>
                <th className="px-6 py-3 font-sans font-bold text-[11px] leading-4 text-[#64748B]">Member</th>
                <th className="px-6 py-3 font-sans font-bold text-[11px] leading-4 text-[#64748B]">Trainer</th>
                <th className="px-6 py-3 font-sans font-bold text-[11px] leading-4 text-[#64748B]">Workout Type</th>
                <th className="px-6 py-3 font-sans font-bold text-[11px] leading-4 text-[#64748B]">Status</th>
                <th className="px-6 py-3 font-sans font-bold text-[11px] leading-4 text-[#64748B] text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((session, index) => (
                <tr key={session.id} className={`${index > 0 ? 'border-t border-[#171D27]' : ''} hover:bg-[#151A25] transition-colors`}>
                  <td className="px-6 py-3.5">
                    <div className="flex flex-row items-center gap-3">
                      <div className={`w-1 h-8 rounded-full ${session.status === 'Cancelled' ? 'bg-[#EF4444]' : 'bg-[#EAB308]'}`} />
                      <div className="flex flex-col">
                        <span className="font-sans font-bold text-xs text-white">{session.time}</span>
                        <span className="font-sans font-semibold text-[10px] text-[#6C7B91]">{session.timeSuffix}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3.5">
                    <div className="flex flex-row items-center gap-3">
                      <Avatar src={session.avatarUrl} alt={session.member} className="w-8 h-8" />
                      <span className="font-sans font-semibold text-xs text-white">{session.member}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="font-sans font-medium text-xs" style={{ color: session.trainerColor }}>
                      {session.trainer}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    {session.workoutType === "—" || session.workoutType === "-" ? (
                      <div className="w-3 h-[1px] bg-[#64748B]" />
                    ) : (
                      <span className="font-sans font-normal text-xs text-[#94A3B8]">{session.workoutType}</span>
                    )}
                  </td>
                  <td className="px-6 py-3.5">
                    <div className={`inline-flex items-center px-3 py-1 gap-1.5 border rounded-full ${getStatusStyles(session.status)}`}>
                      {session.status === "Completed" && (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.6666 3.5L5.24992 9.91667L2.33325 7" stroke="currentColor" strokeWidth="1.45833" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                      {session.status === "Upcoming" && (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7 3.5V7L9.33333 9.33333M12.8333 7C12.8333 10.2217 10.2217 12.8333 7 12.8333C3.77834 12.8333 1.16667 10.2217 1.16667 7C1.16667 3.77834 3.77834 1.16667 7 1.16667C10.2217 1.16667 12.8333 3.77834 12.8333 7Z" stroke="currentColor" strokeWidth="1.45833" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                      {session.status === "Cancelled" && (
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.91667 4.08333L4.08333 9.91667M4.08333 4.08333L9.91667 9.91667M12.8333 7C12.8333 10.2217 10.2217 12.8333 7 12.8333C3.77834 12.8333 1.16667 10.2217 1.16667 7C1.16667 3.77834 3.77834 1.16667 7 1.16667C10.2217 1.16667 12.8333 3.77834 12.8333 7Z" stroke="currentColor" strokeWidth="1.45833" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                      <span className="font-sans font-medium text-[11px] leading-4">
                        {session.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <button 
                      onClick={() => setSelectedSession(session)}
                      className="inline-flex justify-center items-center w-6 h-6 rounded-md hover:bg-[#1A202C] transition-colors cursor-pointer"
                    >
                      <CaretRight size={16} weight="bold" className="text-[#576477]" />
                    </button>
                  </td>
                </tr>
              ))}
              {sessions.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center font-sans text-sm text-[#94A3B8]">
                    No sessions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-6">
          <Pagination
            currentPage={currentPage}
            totalPages={1}
            totalItems={sessions.length}
            itemsPerPage={10}
            onPageChange={onPageChange}
          />
        </div>
      </div>

      <PTSessionDetailsModal 
        isOpen={selectedSession !== null} 
        onClose={() => setSelectedSession(null)} 
        session={selectedSession} 
      />
    </div>
  );
}
