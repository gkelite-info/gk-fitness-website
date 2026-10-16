"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarBlank } from "@phosphor-icons/react";
import {
  DemoRequestItem,
  DemoBookingHistoryItem,
  scheduleDemoAction,
  cancelDemoScheduleAction,
  updateDemoRequestStatusAction,
} from "@/app/actions/demoRequests";
import { DemoRequestInfoCard } from "./DemoRequestInfoCard";
import { DemoRequestScheduleCard } from "./DemoRequestScheduleCard";
import { DemoRequestStatusCard } from "./DemoRequestStatusCard";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUser } from "@/app/context/UserContext";

interface DemoRequestDetailsClientProps {
  request: DemoRequestItem;
}

export function DemoRequestDetailsClient({
  request,
}: DemoRequestDetailsClientProps) {
  const router = useRouter();
  const { profile } = useUser();
  const initiallyScheduled = Boolean(request.scheduledDate) || request.status === "Demo Scheduled";

  const [isScheduled, setIsScheduled] = useState(initiallyScheduled);
  const [scheduledDate, setScheduledDate] = useState(request.scheduledDate || "");
  const [scheduledTime, setScheduledTime] = useState(request.scheduledTime || "11:00 AM");
  const [historyList, setHistoryList] = useState(request.history || []);
  const [status, setStatus] = useState<DemoRequestItem["status"]>(request.status);
  const [statusSaved, setStatusSaved] = useState(initiallyScheduled);
  const [savedTimestamp, setSavedTimestamp] = useState(
    initiallyScheduled ? request.requestedOn : ""
  );

  const getStatusBadge = (s: DemoRequestItem["status"]) => {
    switch (s) {
      case "Pending":
      case "New":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#0B2518] text-[#10B981] border border-[#10B981]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
            Pending
          </span>
        );
      case "Demo Scheduled":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#0E2038] text-[#60A5FA] border border-[#3B82F6]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
            Demo Scheduled
          </span>
        );
      case "Contacted":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#26153B] text-[#C084FC] border border-[#A855F7]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
            Contacted
          </span>
        );
      case "Converted":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#1F2911] text-[#D4FF32] border border-[#D4FF32]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF32]" />
            Converted
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#261217] text-[#F87171] border border-[#EF4444]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
            {s}
          </span>
        );
    }
  };

  const handleSaveSchedule = async (date: string, time: string) => {
    const res = await scheduleDemoAction(request.id, date, time, profile?.userId);
    if (!res.success) {
      toast.error(res.error || "Failed to schedule demo.");
      return;
    }

    const prevItem = historyList.find((h) => Boolean(h.rescheduleDate));
    const isFirst = !prevItem;

    const newHistoryItem: DemoBookingHistoryItem = {
      id: prevItem?.id || crypto.randomUUID(),
      rescheduleDate: date,
      rescheduleTime: time,
      previousDate: isFirst ? null : prevItem?.rescheduleDate || null,
      previousTime: isFirst ? null : prevItem?.rescheduleTime || null,
      status: null,
      notes: null,
      reason: null,
      createdAt: prevItem?.createdAt || new Date().toISOString(),
    };

    setHistoryList([newHistoryItem]);
    setScheduledDate(date);
    setScheduledTime(time);
    setIsScheduled(true);

    const now = new Date();
    const formattedNow =
      now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) +
      ", " +
      now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

    setSavedTimestamp(formattedNow);
    toast.success(isFirst ? "Demo scheduled (pending)!" : "Demo rescheduled successfully!");
    router.refresh();
  };

  const handleRemoveSchedule = async () => {
    const res = await cancelDemoScheduleAction(request.id);
    if (!res.success) {
      toast.error(res.error || "Failed to remove schedule.");
      return;
    }
    setIsScheduled(false);
    setScheduledDate("");
    setStatus("Pending");
    setStatusSaved(false);
    setSavedTimestamp("");
    toast.success("Demo schedule removed.");
    router.refresh();
  };

  const handleSaveStatus = async (newStatus: DemoRequestItem["status"]) => {
    const res = await updateDemoRequestStatusAction(request.id, newStatus);
    if (!res.success) {
      toast.error(res.error || "Failed to update status.");
      return;
    }
    setStatus(newStatus);
    setStatusSaved(true);

    const now = new Date();
    const formattedNow =
      now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) +
      ", " +
      now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

    setSavedTimestamp(formattedNow);
    toast.success(`Status updated to "${newStatus}"`);
    router.refresh();
  };

  return (
    <div className="w-full flex flex-col gap-6 text-white max-w-7xl mx-auto">
      <div>
        <Link
          href="/superadmin/demo-requests"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-[#8E99AB] hover:text-white transition-colors cursor-pointer group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          <span>Back to Demo Requests</span>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              Demo Request Details
            </h1>
            <div>{getStatusBadge(status)}</div>
          </div>
          <p className="text-xs sm:text-sm text-[#8E99AB]">
            View the details submitted by the gym owner for a demo request.
          </p>
        </div>

        <div className="flex items-center gap-3 bg-[#0E131E] border border-[#1C2638] px-4 py-2.5 rounded-xl self-start md:self-auto">
          <div className="w-8 h-8 rounded-lg bg-[#141B28] border border-[#232F46] flex items-center justify-center text-[#8E99AB] shrink-0">
            <CalendarBlank size={18} />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] text-[#8E99AB] leading-tight">
              Requested on
            </span>
            <span className="text-xs font-semibold text-white whitespace-nowrap">
              {request.requestedOn}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 xl:col-span-8">
          <DemoRequestInfoCard request={request} />
        </div>

        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-5">
          <h2 className="text-sm font-bold text-white tracking-tight">
            Actions
          </h2>

          <DemoRequestScheduleCard
            isScheduled={isScheduled}
            scheduledDate={scheduledDate}
            scheduledTime={scheduledTime}
            history={historyList}
            onSaveSchedule={handleSaveSchedule}
            onRemoveSchedule={handleRemoveSchedule}
          />

          <DemoRequestStatusCard
            currentStatus={status}
            isScheduled={isScheduled}
            statusSaved={statusSaved}
            savedTimestamp={savedTimestamp}
            onSaveStatus={handleSaveStatus}
          />
        </div>
      </div>
    </div>
  );
}
