import { useState, useEffect } from "react";
import {
  X,
  Phone,
  CalendarBlank,
  User,
  Trash,
  Check,
} from "@phosphor-icons/react";
import Avatar from "@/app/(screens)/components/reusable/Avatar";
import ConfirmationModal from "@/app/(screens)/components/reusable/ConfirmationModal";
import { GymPassVisitor } from "./types";

interface VisitorDetailsModalProps {
  visitor: GymPassVisitor | null;
  isOpen: boolean;
  onClose: () => void;
  onCancelVisit?: (id: string) => void;
}

export default function VisitorDetailsModal({
  visitor,
  isOpen,
  onClose,
  onCancelVisit,
}: VisitorDetailsModalProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !visitor) return null;

  const isVisited = visitor.status === "Visited";

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-[560px] max-h-[92vh] sm:max-h-[88vh] overflow-hidden bg-[#0F1117] border border-[#202430] rounded-2xl shadow-2xl flex flex-col text-white"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#1E2330] shrink-0 w-full bg-[#0F1117]">
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              Visitor Details
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-[#181B24] border border-[#252A38] text-[#94A3B8] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={16} weight="bold" />
            </button>
          </div>

          <div className="p-4 sm:p-6 overflow-y-auto scrollbar-themed flex-1 flex flex-col gap-4 sm:gap-5">
            <div className="bg-[#131620] border border-[#1E2330] rounded-xl p-4 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 w-full">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-3.5 min-w-0 flex-1 text-center sm:text-left">
                <div className="w-16 h-16 sm:w-14 sm:h-14 rounded-full ring-2 ring-[#D4FF32]/60 p-0.5 shrink-0 flex items-center justify-center">
                  <Avatar
                    src={visitor.avatarUrl}
                    gender={visitor.gender}
                    className="w-full h-full"
                  />
                </div>

                <div className="flex flex-col items-center sm:items-start min-w-0 flex-1">
                  <h3 className="text-base sm:text-base font-bold text-white leading-tight break-words">
                    {visitor.name}
                  </h3>

                  <div className="mt-1 sm:hidden">
                    {isVisited ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-[rgba(6,78,59,0.5)] border border-[rgba(52,211,153,0.3)] text-[#34D399] whitespace-nowrap">
                        <Check size={12} weight="bold" />
                        Visited
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold bg-[rgba(76,5,25,0.5)] border border-[rgba(244,63,94,0.3)] text-[#FB7185] whitespace-nowrap">
                        <X size={12} weight="bold" />
                        Cancelled
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs text-[#94A3B8] mt-1.5 sm:mt-1 whitespace-nowrap">
                    <Phone size={13} className="shrink-0 text-[#94A3B8]" />
                    <span className="whitespace-nowrap font-mono">{visitor.phone}</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#64748B] mt-0.5 whitespace-nowrap">
                    Pass ID: {visitor.passId}
                  </span>
                </div>
              </div>

              <div className="hidden sm:block shrink-0">
                {isVisited ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(6,78,59,0.5)] border border-[rgba(52,211,153,0.3)] text-[#34D399] whitespace-nowrap">
                    <Check size={13} weight="bold" />
                    Visited
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[rgba(76,5,25,0.5)] border border-[rgba(244,63,94,0.3)] text-[#FB7185] whitespace-nowrap">
                    <X size={13} weight="bold" />
                    Cancelled
                  </span>
                )}
              </div>
            </div>

            <div className="bg-[#131620] border border-[#1E2330] rounded-xl p-4 sm:p-5 flex flex-col gap-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[rgba(23,37,84,0.7)] border border-[rgba(56,189,248,0.3)] flex items-center justify-center text-[#38BDF8] shrink-0">
                  <CalendarBlank size={16} weight="bold" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white leading-tight">
                    Visit Information
                  </span>
                  <span className="text-[11px] text-[#94A3B8] leading-tight">
                    Timings and check-in log for this session
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="flex flex-col">
                  <span className="text-[#94A3B8]">Visit Date</span>
                  <span className="text-white font-medium mt-0.5">
                    {visitor.visitDateFormatted}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#94A3B8]">Gym Location</span>
                  <span className="text-white font-medium mt-0.5">
                    {visitor.gymLocation}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#94A3B8]">Check-in Time</span>
                  <span className="text-white font-medium mt-0.5">
                    {visitor.checkInTime}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#94A3B8]">Check-out Time</span>
                  <span className="text-white font-medium mt-0.5">
                    {visitor.checkOutTime}
                  </span>
                </div>
                <div className="flex flex-col sm:col-span-2">
                  <span className="text-[#94A3B8]">Duration</span>
                  <span className="text-[#34D399] font-semibold mt-0.5">
                    {visitor.duration}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-[#131620] border border-[#1E2330] rounded-xl p-4 sm:p-5 flex flex-col gap-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[rgba(59,7,100,0.7)] border border-[rgba(192,132,252,0.3)] flex items-center justify-center text-[#C084FC] shrink-0">
                  <User size={16} weight="bold" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-white leading-tight">
                    Customer Information
                  </span>
                  <span className="text-[11px] text-[#94A3B8] leading-tight">
                    Account profile and contact details
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                <div className="flex flex-col">
                  <span className="text-[#94A3B8]">Customer ID</span>
                  <span className="text-white font-mono font-medium mt-0.5">
                    {visitor.customerId}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#94A3B8]">Name</span>
                  <span className="text-white font-medium mt-0.5">
                    {visitor.name}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#94A3B8]">Phone</span>
                  <span className="text-white font-medium mt-0.5">
                    {visitor.phone}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[#94A3B8]">Email</span>
                  <span className="text-[#38BDF8] font-medium mt-0.5 truncate">
                    {visitor.email}
                  </span>
                </div>
                <div className="flex flex-col sm:col-span-2">
                  <span className="text-[#94A3B8]">Member Since</span>
                  <span className="text-white font-medium mt-0.5">
                    {visitor.memberSince}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-5 border-t border-[#1E2330] shrink-0 w-full bg-[#0F1117]">
            <div className={`flex flex-col-reverse min-[420px]:flex-row min-[420px]:items-center ${!isVisited ? "justify-end" : "justify-between"} gap-2.5 sm:gap-3`}>
              {isVisited && (
                <button
                  type="button"
                  onClick={() => setIsConfirmOpen(true)}
                  className="flex items-center justify-center gap-1.5 w-full min-[420px]:w-auto px-4 py-2.5 rounded-xl bg-[rgba(239,68,68,0.12)] border border-red-500/30 text-[#EF4444] hover:bg-red-500/20 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  <Trash size={15} weight="bold" />
                  <span>Cancel This Visit</span>
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="flex items-center justify-center gap-1.5 w-full min-[420px]:w-auto px-6 py-2.5 rounded-xl bg-[#D4FF32] text-black hover:bg-[#c4f026] text-xs sm:text-sm font-bold transition-all shadow-[0_0_12px_rgba(212,255,50,0.25)] cursor-pointer"
              >
                <X size={15} weight="bold" />
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          setIsConfirmOpen(false);
          if (onCancelVisit) {
            onCancelVisit(visitor.id);
          }
        }}
        title="Cancel Gym Pass Visit"
        message={`Are you sure you want to cancel the gym pass visit for ${visitor.name}? This will mark the visit as cancelled.`}
        confirmText="Yes, Cancel Visit"
        cancelText="No, Keep Visit"
        isDestructive={true}
      />
    </>
  );
}
