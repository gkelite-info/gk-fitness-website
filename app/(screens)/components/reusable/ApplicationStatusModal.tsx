"use client";

import { useState } from "react";
import { User, X, CircleNotch, FileText, CheckCircle, Clock, XCircle } from "@phosphor-icons/react";
import { checkLeadStatusAction } from "@/app/actions/auth";
import toast from "react-hot-toast";

interface ApplicationStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  typeId?: string | null;
}

export function ApplicationStatusModal({
  isOpen,
  onClose,
  typeId,
}: ApplicationStatusModalProps) {
  const [identifier, setIdentifier] = useState("");
  const [loading, setLoading] = useState(false);
  const [leadResult, setLeadResult] = useState<any>(null);

  if (!isOpen) return null;

  const handleCheckStatus = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!identifier.trim()) {
      toast.error("Please enter your email or mobile number.");
      return;
    }

    setLoading(true);
    setLeadResult(null);

    const res = await checkLeadStatusAction(identifier);
    setLoading(false);

    if (!res.success) {
      toast.error(res.error || "No application found.");
      return;
    }

    setLeadResult(res.lead);
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <CheckCircle size={16} weight="fill" /> Approved
          </div>
        );
      case "rejected":
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold">
            <XCircle size={16} weight="fill" /> Rejected
          </div>
        );
      case "underreview":
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
            <Clock size={16} weight="fill" /> Under Review
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4FF32]/10 border border-[#D4FF32]/30 text-[#D4FF32] text-xs font-bold">
            <FileText size={16} weight="fill" /> Submitted
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#121212] border border-[#1E1E1E] rounded-3xl p-6 sm:p-7 relative shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Check Application Status</h2>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#1E1E1E] flex items-center justify-center text-[#8E8E93] hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <p className="text-xs sm:text-sm text-[#8E8E93] leading-relaxed mb-5">
          Enter the email address or mobile number you used during your {typeId === "owner" ? "gym owner" : "trainer"} registration.
        </p>

        <form onSubmit={handleCheckStatus} className="space-y-4">
          <div className="relative">
            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6B6B6B]" />
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Email or Mobile Number"
              className="w-full h-12 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl pl-11 pr-4 text-sm text-white placeholder:text-[#6B6B6B] focus:outline-none focus:border-[#84CC16] transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-[#84CC16] hover:bg-[#72b012] text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? (
              <CircleNotch size={20} className="animate-spin" />
            ) : (
              "Check Status"
            )}
          </button>
        </form>

        {leadResult && (
          <div className="mt-6 p-4 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8E8E93] uppercase tracking-wide font-bold">Status</span>
              {getStatusBadge(leadResult.status)}
            </div>
            {leadResult.gymName && (
              <div className="text-sm text-white font-semibold">
                Gym: <span className="text-[#84CC16]">{leadResult.gymName}</span>
              </div>
            )}
            <div className="text-xs text-[#8E8E93]">
              Applicant: {leadResult.name}
            </div>
            {leadResult.createdAt && (
              <div className="text-[11px] text-[#6B6B6B]">
                Submitted on {new Date(leadResult.createdAt).toLocaleDateString()}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
