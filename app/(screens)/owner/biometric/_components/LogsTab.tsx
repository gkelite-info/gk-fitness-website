"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { 
  MagnifyingGlass, 
  ArrowsDownUp, 
  CalendarBlank
} from "@phosphor-icons/react/dist/ssr";
import Pagination from "../../../components/reusable/Pagination";
import { mockLogs } from "./mockLogs";
import LogCard from "./LogCard";

export default function LogsTab() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const searchQuery = searchParams.get("logSearch") || "";
  const filterType = searchParams.get("logType") || "all";
  const sortOrder = searchParams.get("logSort") || "desc";
  const currentPage = parseInt(searchParams.get("logPage") || "1", 10);
  const itemsPerPage = 4;

  const updateQueryParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    // Reset page on filter changes
    if (key !== "logPage") {
      params.set("logPage", "1");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const toggleSort = () => {
    updateQueryParams("logSort", sortOrder === "desc" ? "asc" : "desc");
  };

  const filteredLogs = mockLogs
    .filter(log => log.name.toLowerCase().includes(searchQuery.toLowerCase()) || log.phone.includes(searchQuery))
    .filter(log => {
      if (filterType === "check-in") return log.type === "Check In";
      if (filterType === "check-out") return log.type === "Check Out";
      return true;
    })
    .sort((a, b) => {
      return sortOrder === "desc" ? b.timestamp - a.timestamp : a.timestamp - b.timestamp;
    });

  const currentData = filteredLogs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage) || 1;

  const renderFilterPill = (id: string, label: string) => {
    const isActive = filterType === id;
    return (
      <button
        onClick={() => updateQueryParams("logType", id)}
        className={`flex justify-center items-center px-4 py-2 rounded-full font-sans font-semibold text-[13px] transition-colors cursor-pointer shrink-0 ${
          isActive
            ? "bg-[#CBF813] text-black"
            : "bg-[#14161A] border border-[#232631] text-[#A1A1AA] hover:bg-[#1A1D24]"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="flex flex-col w-full gap-5 mt-4">
      {/* Search and Sort Row */}
      <div className="flex flex-row items-center w-full gap-3 sm:gap-4">
        <div className="flex flex-row items-center flex-1 bg-[#141720] border border-[#202532] rounded-2xl px-4 sm:px-5 h-[46px] gap-3 focus-within:border-[#38BDF8] transition-colors shadow-sm">
          <MagnifyingGlass size={18} color="#A1A1AA" />
          <input 
            type="text"
            placeholder="Search customer name..."
            value={searchQuery}
            onChange={(e) => updateQueryParams("logSearch", e.target.value)}
            className="flex-1 bg-transparent border-none outline-none font-sans font-normal text-[13px] text-white placeholder:text-[#475569] h-full"
          />
        </div>
        <button 
          onClick={toggleSort}
          className="flex justify-center items-center w-[46px] h-[46px] bg-[#141720] border border-[#202532] rounded-2xl hover:bg-[#1A1D24] transition-colors cursor-pointer shrink-0"
        >
          <ArrowsDownUp size={18} className="text-[#D4D4D8]" />
        </button>
      </div>

      {/* Date Filters Row */}
      <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-4">
        <div className="flex flex-row items-center flex-1 bg-[#141720] border border-[#202532] rounded-2xl px-4 sm:px-5 h-[46px] min-h-[46px] shrink-0 gap-3 focus-within:border-[#38BDF8] transition-colors shadow-sm">
          <CalendarBlank size={18} color="#A1A1AA" />
          <input 
            type="text"
            placeholder="From Date"
            onFocus={(e) => {
              e.target.type = 'date';
              try { e.target.showPicker?.(); } catch (err) {}
            }}
            onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
            style={{ colorScheme: "dark" }}
            className="flex-1 bg-transparent border-none outline-none font-sans font-normal text-[13px] text-white placeholder:text-[#475569] h-full w-full relative [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
          />
        </div>
        <div className="flex flex-row items-center flex-1 bg-[#141720] border border-[#202532] rounded-2xl px-4 sm:px-5 h-[46px] min-h-[46px] shrink-0 gap-3 focus-within:border-[#38BDF8] transition-colors shadow-sm">
          <CalendarBlank size={18} color="#A1A1AA" />
          <input 
            type="text"
            placeholder="To Date"
            onFocus={(e) => {
              e.target.type = 'date';
              try { e.target.showPicker?.(); } catch (err) {}
            }}
            onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
            style={{ colorScheme: "dark" }}
            className="flex-1 bg-transparent border-none outline-none font-sans font-normal text-[13px] text-white placeholder:text-[#475569] h-full w-full relative [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
          />
        </div>
      </div>

      {/* Type Filters Row */}
      <div className="flex flex-row items-center w-full gap-3 overflow-x-auto no-scrollbar pb-1">
        {renderFilterPill("all", "All Types")}
        {renderFilterPill("check-in", "Check In")}
        {renderFilterPill("check-out", "Check Out")}
        {renderFilterPill("all-device", "All Device")}
      </div>

      {/* Logs List */}
      <div className="flex flex-col w-full gap-4 mt-2">
        {currentData.length > 0 ? (
          currentData.map((log) => (
            <LogCard key={log.id} log={log} />
          ))
        ) : (
          <div className="flex items-center justify-center w-full py-10 border border-[#232631] border-dashed rounded-2xl">
            <span className="font-sans text-[#64748B] text-sm">No logs found.</span>
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredLogs.length}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => updateQueryParams("logPage", page.toString())}
      />
    </div>
  );
}
