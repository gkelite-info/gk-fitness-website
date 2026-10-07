"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  MagnifyingGlass,
  ArrowsDownUp,
  CalendarBlank,
  ArrowClockwise
} from "@phosphor-icons/react/dist/ssr";
import Pagination from "../../../components/reusable/Pagination";
import LogCard from "./LogCard";
import { useUser } from "@/app/context/UserContext";
import { useBiometricAttendanceLogs } from "@/lib/hooks/biometrics/useBiometricAttendanceLogs";
import { useState, useEffect } from "react";

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

  const { roleData } = useUser();
  const gymId = roleData?.[0]?.gymId;

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchInput, setSearchInput] = useState(searchQuery);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchInput !== (searchParams.get("logSearch") || "")) {
        updateQueryParams("logSearch", searchInput);
      }
    }, 600);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const handleRefresh = async () => {
    if (!gymId) return;
    setIsSyncing(true);
    try {
      const { serverSyncGymLogs } = await import("@/app/actions/biometricDeviceActions");
      const res = await serverSyncGymLogs(gymId);
    } catch (err) {
      console.error("Error syncing device logs:", err);
    } finally {
      await refetch();
      setIsSyncing(false);
    }
  };

  const { data: logsData, isLoading, isFetching, refetch } = useBiometricAttendanceLogs(
    gymId,
    currentPage,
    itemsPerPage,
    {
      searchQuery,
      logType: filterType === "all" ? undefined : filterType === "check-in" ? "Check In" : "Check Out",
      fromDate: fromDate || undefined,
      toDate: toDate || undefined,
    }
  );

  const logs = logsData?.data || [];
  const totalItems = logsData?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const renderFilterPill = (id: string, label: string) => {
    const isActive = filterType === id;
    return (
      <button
        onClick={() => updateQueryParams("logType", id)}
        className={`flex justify-center items-center px-4 py-2 rounded-full font-sans font-semibold text-[13px] transition-colors cursor-pointer shrink-0 ${isActive
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
      <div className="flex flex-row items-center w-full gap-3 sm:gap-4">
        <div className="flex flex-row items-center flex-1 bg-[#141720] border border-[#202532] rounded-2xl px-4 sm:px-5 h-[46px] gap-3 focus-within:border-[#38BDF8] transition-colors shadow-sm">
          <MagnifyingGlass size={18} color="#A1A1AA" />
          <input
            type="text"
            placeholder="Search customer name..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none font-sans font-normal text-[13px] text-white placeholder:text-[#475569] h-full"
          />
        </div>
        <button
          onClick={toggleSort}
          className="flex justify-center items-center w-[46px] h-[46px] bg-[#141720] border border-[#202532] rounded-2xl hover:bg-[#1A1D24] transition-colors cursor-pointer shrink-0"
        >
          <ArrowsDownUp size={18} className="text-[#D4D4D8]" />
        </button>
        <button
          onClick={handleRefresh}
          disabled={isFetching || isSyncing}
          className="flex justify-center items-center w-[46px] h-[46px] bg-[#141720] border border-[#202532] rounded-2xl hover:bg-[#1A1D24] transition-colors cursor-pointer shrink-0 disabled:opacity-70 disabled:cursor-not-allowed"
          title="Refresh Logs"
        >
          <ArrowClockwise size={18} className={`text-[#D4D4D8] ${(isFetching || isSyncing) ? "animate-spin" : ""}`} />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-4">
        <div className="flex flex-row items-center flex-1 bg-[#141720] border border-[#202532] rounded-2xl px-4 sm:px-5 h-[46px] min-h-[46px] shrink-0 gap-3 focus-within:border-[#38BDF8] transition-colors shadow-sm">
          <CalendarBlank size={18} color="#A1A1AA" />
          <input
            type="text"
            placeholder="From Date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            onFocus={(e) => {
              e.target.type = 'date';
              try { e.target.showPicker?.(); } catch (err) { }
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
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            onFocus={(e) => {
              e.target.type = 'date';
              try { e.target.showPicker?.(); } catch (err) { }
            }}
            onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
            style={{ colorScheme: "dark" }}
            className="flex-1 bg-transparent border-none outline-none font-sans font-normal text-[13px] text-white placeholder:text-[#475569] h-full w-full relative [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
          />
        </div>
      </div>

      <div className="flex flex-row items-center w-full gap-3 overflow-x-auto no-scrollbar pb-1">
        {renderFilterPill("all", "All Types")}
        {renderFilterPill("check-in", "Check In")}
        {renderFilterPill("check-out", "Check Out")}
        {renderFilterPill("all-device", "All Device")}
      </div>

      <div className="flex flex-col w-full gap-4 mt-2">
        {isLoading ? (
          <div className="flex items-center justify-center w-full py-10 border border-[#232631] border-dashed rounded-2xl">
            <span className="font-sans text-[#64748B] text-sm">Loading logs...</span>
          </div>
        ) : logs.length > 0 ? (
          logs.map((log: any) => {
            const date = new Date(log.scanTimestamp || Date.now());
            return (
              <LogCard
                key={log.logId}
                log={{
                  id: log.logId,
                  name: log.customer?.fullName || "Unknown",
                  phone: log.customer?.phone || "N/A",
                  type: log.logType,
                  deviceName: log.device?.deviceName || "Unknown Device",
                  authMethod: log.authMethod || "Fingerprint",
                  scanTimeStr: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
                  scanDateStr: date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
                  status: log.processedStatus || "Unknown",
                  rejectReason: log.rejectionReason || undefined,
                  timestamp: date.getTime(),
                }}
              />
            );
          })
        ) : (
          <div className="flex items-center justify-center w-full py-10 border border-[#232631] border-dashed rounded-2xl">
            <span className="font-sans text-[#64748B] text-sm">No logs found.</span>
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => updateQueryParams("logPage", page.toString())}
      />
    </div>
  );
}
