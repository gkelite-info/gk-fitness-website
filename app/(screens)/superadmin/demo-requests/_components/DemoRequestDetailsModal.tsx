"use client";

import { useState } from "react";
import { X, User, Phone, EnvelopeSimple, Buildings, MapPin, Sparkle, Users, CalendarBlank } from "@phosphor-icons/react";
import { DemoRequestItem, updateDemoRequestStatusAction } from "@/app/actions/demoRequests";
import toast from "react-hot-toast";

interface DemoRequestDetailsModalProps {
  request: DemoRequestItem | null;
  onClose: () => void;
  onStatusUpdated: (id: string, newStatus: DemoRequestItem["status"]) => void;
}

export function DemoRequestDetailsModal({
  request,
  onClose,
  onStatusUpdated,
}: DemoRequestDetailsModalProps) {
  const [currentStatus, setCurrentStatus] = useState<DemoRequestItem["status"] | null>(null);
  const [updating, setUpdating] = useState(false);

  if (!request) return null;

  const activeStatus = currentStatus || request.status;

  const handleStatusChange = async (newStatus: DemoRequestItem["status"]) => {
    setCurrentStatus(newStatus);
    setUpdating(true);
    const res = await updateDemoRequestStatusAction(request.id, newStatus);
    setUpdating(false);
    if (res.success) {
      toast.success(`Status updated to "${newStatus}"`);
      onStatusUpdated(request.id, newStatus);
    } else {
      toast.error("Failed to update status.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-[#0F131D] border border-[#1E2536] rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-[#1E2536] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#18233A] border border-[#2B3B5E] flex items-center justify-center text-sm font-bold text-[#60A5FA]">
              {request.initials}
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">
                {request.ownerName}
              </h3>
              <p className="text-xs text-[#94A3B8]">{request.gymName}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1A2130] flex items-center justify-center text-[#8E99AB] hover:text-white transition-colors cursor-pointer"
          >
            <X size={16} weight="bold" />
          </button>
        </div>

        <div className="p-5 space-y-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#0B0E16] border border-[#1A2234]">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wide">
                Status
              </span>
              <select
                value={activeStatus}
                onChange={(e) => handleStatusChange(e.target.value as any)}
                disabled={updating}
                className="w-full h-9 bg-[#121724] border border-[#222C42] rounded-lg px-2.5 text-xs font-bold text-[#D4FF32] focus:outline-none cursor-pointer"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Demo Scheduled">Demo Scheduled</option>
                <option value="Converted">Converted</option>
                <option value="Not Interested">Not Interested</option>
              </select>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-[#64748B] uppercase tracking-wide">
                Plan Interested
              </span>
              <div className="h-9 flex items-center px-3 rounded-lg bg-[#121724] border border-[#222C42] text-xs font-bold text-white">
                <Sparkle size={14} className="text-[#FBBF24] mr-1.5" weight="fill" />
                {request.plan} Plan
              </div>
            </div>
          </div>

          <div className="space-y-2.5 text-xs text-[#CBD5E1]">
            <div className="flex items-center gap-2.5 py-1.5 border-b border-[#1A2234]">
              <Phone size={16} className="text-[#64748B] shrink-0" />
              <span className="text-[#8E99AB] w-24">Mobile:</span>
              <span className="font-semibold text-white">{request.mobile}</span>
            </div>

            <div className="flex items-center gap-2.5 py-1.5 border-b border-[#1A2234]">
              <EnvelopeSimple size={16} className="text-[#64748B] shrink-0" />
              <span className="text-[#8E99AB] w-24">Email:</span>
              <span className="font-semibold text-white">{request.email}</span>
            </div>

            <div className="flex items-center gap-2.5 py-1.5 border-b border-[#1A2234]">
              <MapPin size={16} className="text-[#64748B] shrink-0" />
              <span className="text-[#8E99AB] w-24">Location:</span>
              <span className="font-semibold text-white">{request.city}</span>
            </div>

            <div className="flex items-center gap-2.5 py-1.5 border-b border-[#1A2234]">
              <Users size={16} className="text-[#64748B] shrink-0" />
              <span className="text-[#8E99AB] w-24">Members:</span>
              <span className="font-semibold text-white">{request.members} active</span>
            </div>

            <div className="flex items-center gap-2.5 py-1.5 border-b border-[#1A2234]">
              <CalendarBlank size={16} className="text-[#64748B] shrink-0" />
              <span className="text-[#8E99AB] w-24">Requested On:</span>
              <span className="font-semibold text-white">{request.requestedOn}</span>
            </div>
          </div>

          {request.requirement && (
            <div className="p-3.5 rounded-xl bg-[#0B0E16] border border-[#1A2234]">
              <span className="text-[11px] font-bold text-[#8E99AB] uppercase tracking-wide block mb-1">
                Requirement Notes
              </span>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                {request.requirement}
              </p>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-[#1E2536] bg-[#0A0D14] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#1E2536] hover:bg-[#28324A] text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
