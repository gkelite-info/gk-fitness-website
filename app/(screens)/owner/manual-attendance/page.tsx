"use client";

import { useState, useMemo, useEffect } from "react";
import ManualAttendanceHeader from "./_components/ManualAttendanceHeader";
import ManualAttendanceFilterBar from "./_components/ManualAttendanceFilterBar";
import ManualAttendanceTable, { CustomerData } from "./_components/ManualAttendanceTable";
import Pagination from "@/app/(screens)/components/reusable/Pagination";
import ConfirmationModal from "@/app/(screens)/components/reusable/ConfirmationModal";
import { useUser } from "@/app/context/UserContext";
import { useGymCustomers } from "@/lib/hooks/customers/useGymCustomers";
import { useGymCustomerMembershipPlans } from "@/lib/hooks/gymCustomerMembershipPlans/useGymCustomerMembershipPlans";
import { useGymLatestAttendance } from "@/lib/hooks/attendance/useGymLatestAttendance";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createClient } from "@/app/api/supabase/client";
import toast from "react-hot-toast";

function formatAttendanceDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();

  const isToday = date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday = date.getDate() === yesterday.getDate() && date.getMonth() === yesterday.getMonth() && date.getFullYear() === yesterday.getFullYear();

  const timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

  if (isToday) return `Today, ${timeStr}`;
  if (isYesterday) return `Yesterday, ${timeStr}`;

  const formattedDate = date.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
  return `${formattedDate}, ${timeStr}`;
}

export default function ManualAttendancePage() {
  const { roleData } = useUser();
  const gymId = roleData?.[0]?.gymId;
  const queryClient = useQueryClient();

  const { data: customersRaw, isLoading: custLoading } = useGymCustomers(gymId);
  const { data: plansRaw, isLoading: plansLoading } = useGymCustomerMembershipPlans(gymId);
  const { data: attendanceRaw, isLoading: attLoading } = useGymLatestAttendance(gymId);

  const [isBulkMode, setIsBulkMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [confirmAction, setConfirmAction] = useState<{ id: string; undo: boolean; attendanceId?: string } | null>(null);

  const markAttendanceMutation = useMutation({
    mutationFn: async ({ customerId, undo, attendanceId }: { customerId: string; undo: boolean; attendanceId?: string }) => {
      const supabase = createClient();
      if (undo && attendanceId) {
        const { error } = await supabase.from('gym_attendance').delete().eq('attendanceId', attendanceId);
        if (error) throw error;
      } else {
        const now = new Date();
        const tzOffset = now.getTimezoneOffset() * 60000;
        const localDate = (new Date(Date.now() - tzOffset)).toISOString().slice(0, 10);

        const { error } = await supabase.from('gym_attendance').insert({
          attendanceId: crypto.randomUUID(),
          gymId,
          customerId,
          date: localDate,
          markedAt: now.toISOString()
        });
        if (error) throw error;
      }
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['gymLatestAttendance', gymId] });
      setConfirmAction(null);
      if (variables.undo) {
        toast.success("Attendance removed!");
      } else {
        toast.success("Attendance marked!");
      }
    }
  });

  const latestAttMap = useMemo(() => {
    const map: Record<string, any> = {};
    if (attendanceRaw) {
      attendanceRaw.forEach(att => {
        if (!map[att.customerId]) {
          map[att.customerId] = att;
        }
      });
    }
    return map;
  }, [attendanceRaw]);

  const baseCustomers: CustomerData[] = useMemo(() => {
    if (!customersRaw) return [];

    const activeCustomers = customersRaw.filter(c => c.is_Active && !c.is_deleted && !c.deletedAt);

    return activeCustomers.map(c => {
      const planRecord = plansRaw?.find(p => p.customerId === c.customerId && p.is_Active && !p.is_deleted);
      const planName = planRecord?.plan?.planName || "No Plan";

      let planBg = "rgba(100, 116, 139, 0.1)";
      let planColor = "#CBD5E1";

      const lowerPlan = planName.toLowerCase();
      if (lowerPlan.includes("gold")) {
        planColor = "#FBBF24";
        planBg = "rgba(245, 158, 11, 0.1)";
      } else if (lowerPlan.includes("elite") || lowerPlan.includes("platinum")) {
        planColor = "#22D3EE";
        planBg = "rgba(6, 182, 212, 0.1)";
      } else if (lowerPlan.includes("premium")) {
        planColor = "#C084FC";
        planBg = "rgba(168, 85, 247, 0.1)";
      } else if (lowerPlan.includes("silver")) {
        planColor = "#CBD5E1";
        planBg = "rgba(100, 116, 139, 0.1)";
      }

      const lastAtt = latestAttMap[c.customerId];
      let attendanceText = "-";
      let isPresent = false;
      let attendanceId = undefined;

      if (lastAtt) {
        attendanceId = lastAtt.attendanceId;
        attendanceText = formatAttendanceDate(lastAtt.markedAt);
        if (attendanceText.startsWith('Today')) {
          isPresent = true;
        }
      }

      return {
        id: c.customerId,
        name: c.fullName || "Unknown",
        custId: `CUST-${c.customerId?.slice(0, 4).toUpperCase()}`,
        plan: planName,
        planColor,
        planBg,
        attendance: attendanceText,
        isPresent,
        phone: c.phone || "",
        attendanceId,
        hasNoPlan: planName === "No Plan"
      };
    });
  }, [customersRaw, plansRaw, latestAttMap]);

  const processedCustomers = useMemo(() => {
    let result = [...baseCustomers];

    if (searchTerm) {
      const lowerQuery = searchTerm.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(lowerQuery) ||
          (c.phone && c.phone.toLowerCase().includes(lowerQuery))
      );
    }

    result.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    return result;
  }, [baseCustomers, searchTerm, sortOrder]);

  const totalCount = processedCustomers.length;
  const activeCount = baseCustomers.length;
  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return processedCustomers.slice(startIndex, startIndex + itemsPerPage);
  }, [processedCustomers, currentPage, itemsPerPage]);

  const selectableCustomers = useMemo(() => paginatedCustomers.filter(c => !c.hasNoPlan), [paginatedCustomers]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const [showBulkConfirm, setShowBulkConfirm] = useState(false);

  const bulkMarkAttendanceMutation = useMutation({
    mutationFn: async () => {
      const supabase = createClient();
      const now = new Date();
      const tzOffset = now.getTimezoneOffset() * 60000;
      const localDate = (new Date(Date.now() - tzOffset)).toISOString().slice(0, 10);
      const markedAt = now.toISOString();

      const inserts = Array.from(selectedIds).map(customerId => ({
        attendanceId: crypto.randomUUID(),
        gymId,
        customerId,
        date: localDate,
        markedAt
      }));

      if (inserts.length === 0) return;

      const { error } = await supabase.from('gym_attendance').insert(inserts);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gymLatestAttendance', gymId] });
      setShowBulkConfirm(false);
      setIsBulkMode(false);
      setSelectedIds(new Set());
      toast.success("Bulk attendance marked!");
    }
  });

  const confirmBulkAttendance = () => {
    bulkMarkAttendanceMutation.mutate();
  };

  const handleToggleBulkMode = () => {
    setIsBulkMode(!isBulkMode);
    if (isBulkMode) {
      setSelectedIds(new Set());
    }
  };

  const handleSortToggle = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.size === selectableCustomers.length && selectableCustomers.length > 0) {
      setSelectedIds(new Set());
    } else {
      const allIds = new Set(selectableCustomers.map(c => c.id));
      setSelectedIds(allIds);
    }
  };

  const handleToggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const handleToggleIndividual = (id: string) => {
    const c = paginatedCustomers.find(c => c.id === id);
    if (!c) return;

    setConfirmAction({
      id,
      undo: c.isPresent,
      attendanceId: c.attendanceId
    });
  };

  const confirmAttendanceAction = () => {
    if (!confirmAction) return;
    markAttendanceMutation.mutate({
      customerId: confirmAction.id,
      undo: confirmAction.undo,
      attendanceId: confirmAction.attendanceId
    });
  };

  const handleSubmitBulk = () => {
    setShowBulkConfirm(true);
  };

  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-8 py-6 pb-12 mx-auto max-w-[1024px] 2xl:max-w-[1200px]">
      <div className="flex flex-col items-start w-full gap-6">

        <ManualAttendanceHeader
          totalCount={activeCount}
          isBulkMode={isBulkMode}
          onToggleBulkMode={handleToggleBulkMode}
        />

        <ManualAttendanceFilterBar
          isBulkMode={isBulkMode}
          isAllSelected={selectedIds.size === selectableCustomers.length && selectableCustomers.length > 0}
          onToggleSelectAll={handleToggleSelectAll}
          selectedCount={selectedIds.size}
          onSubmitBulk={handleSubmitBulk}
          onSortToggle={handleSortToggle}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          activeCount={activeCount}
        />

        {custLoading || plansLoading || attLoading ? (
          <div className="flex justify-center items-center p-8 w-full bg-[#131926] rounded-[16px] border border-[#1A2234]">
            <span className="text-[#717E95]">Loading active members...</span>
          </div>
        ) : paginatedCustomers.length === 0 ? (
          <div className="flex justify-center items-center p-8 w-full bg-[#131926] rounded-[16px] border border-[#1A2234]">
            <span className="text-[#717E95]">No active members found.</span>
          </div>
        ) : (
          <ManualAttendanceTable
            customers={paginatedCustomers}
            isBulkMode={isBulkMode}
            selectedIds={selectedIds}
            onToggleSelect={handleToggleSelect}
            onToggleIndividual={handleToggleIndividual}
          />
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(totalCount / itemsPerPage) || 1}
          totalItems={totalCount}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
        />

      </div>

      <ConfirmationModal
        isOpen={showBulkConfirm}
        onClose={() => setShowBulkConfirm(false)}
        onConfirm={confirmBulkAttendance}
        title="Mark Bulk Attendance"
        message={`Are you sure you want to mark ${selectedIds.size} members as present today?`}
        confirmText="Mark Present"
        isConfirming={bulkMarkAttendanceMutation.isPending}
        confirmingText="Processing..."
        isDestructive={false}
      />

      <ConfirmationModal
        isOpen={!!confirmAction}
        onClose={() => setConfirmAction(null)}
        onConfirm={confirmAttendanceAction}
        title={confirmAction?.undo ? "Undo Attendance" : "Mark Present"}
        message={confirmAction?.undo ? "Are you sure you want to undo this attendance?" : "Are you sure you want to mark this member as present today?"}
        confirmText={confirmAction?.undo ? "Undo" : "Mark Present"}
        isConfirming={markAttendanceMutation.isPending}
        confirmingText="Processing..."
        isDestructive={confirmAction?.undo ? true : false}
      />
    </div>
  );
}
