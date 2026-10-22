"use client";

import { User, Clock, Calendar, CheckCircle, Warning, XCircle } from "@phosphor-icons/react";
import { TrainerClientMembership } from "@/app/actions/trainer/getTrainerIndividualClients";

interface TrainerClientRowProps {
  client: TrainerClientMembership;
}

export default function TrainerClientRow({ client }: TrainerClientRowProps) {
  const formatDate = (isoString?: string | null) => {
    if (!isoString) return "N/A";
    const d = new Date(isoString);
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  };

  return (
    <>
      <tr className="hidden md:table-row border-b border-[#1E1E1E] hover:bg-[#181818] transition-colors">
        <td className="py-4 px-4">
          <div className="flex items-center gap-3">
            {client.profilePhoto ? (
              <img
                src={client.profilePhoto}
                alt={client.customerName}
                className="w-10 h-10 rounded-full object-cover border border-[#2A2A2A]"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#202020] border border-[#2D2D2D] flex items-center justify-center text-white">
                <User size={18} />
              </div>
            )}
            <div>
              <div className="text-white text-sm font-semibold">{client.customerName}</div>
              <div className="text-[#8E8E93] text-xs">{client.customerEmail || client.customerPhone || "—"}</div>
            </div>
          </div>
        </td>

        <td className="py-4 px-4">
          <div className="text-white text-xs font-medium flex items-center gap-1.5 mb-1">
            <Clock size={13} className="text-[#D7FF00]" />
            <span>{client.timings || "Flexible"}</span>
          </div>
          <div className="flex flex-wrap gap-1 max-w-[180px]">
            {client.weekDays.length > 0 ? (
              client.weekDays.map((day) => (
                <span
                  key={day}
                  className="px-1.5 py-0.5 rounded bg-[#1F1F1F] text-[#8E8E93] text-[10px] font-medium"
                >
                  {day.slice(0, 3)}
                </span>
              ))
            ) : (
              <span className="text-[#8E8E93] text-[11px]">All days</span>
            )}
          </div>
        </td>

        <td className="py-4 px-4">
          <div className="text-white text-xs font-medium">{formatDate(client.assignedOn)}</div>
          <div className="text-[#8E8E93] text-[11px] flex items-center gap-1 mt-0.5">
            <Calendar size={11} />
            <span>Expires: {formatDate(client.expiryOn)}</span>
          </div>
        </td>

        <td className="py-4 px-4">
          {client.status === "active" ? (
            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#34C759]/15 border border-[#34C759]/30 text-[#34C759] text-xs font-semibold">
                <CheckCircle size={12} weight="fill" />
                Active ({client.daysLeft}d left)
              </span>
              {client.isExpiringSoon && (
                <p className="text-[#FF9F0A] text-[10px] mt-1 font-medium">Expiring within 7 days</p>
              )}
            </div>
          ) : client.status === "pending" ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FF9F0A]/15 border border-[#FF9F0A]/30 text-[#FF9F0A] text-xs font-semibold">
              <Warning size={12} weight="fill" />
              Pending Review
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#EF4444]/15 border border-[#EF4444]/30 text-[#EF4444] text-xs font-semibold">
              <XCircle size={12} weight="fill" />
              Expired
            </span>
          )}
        </td>

        <td className="py-4 px-4 text-right">
          <div className="text-[#D7FF00] text-sm font-bold">
            ₹{client.lastPayment?.amountPaid || client.trainerPrice || 0}
          </div>
          <div className="text-[#8E8E93] text-[10px] uppercase">
            {client.lastPayment?.paymentMode || "UPI"} • {client.lastPayment?.status || "Paid"}
          </div>
        </td>
      </tr>

      <div className="md:hidden bg-[#161616] border border-[#222222] rounded-2xl p-4 mb-3 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {client.profilePhoto ? (
              <img
                src={client.profilePhoto}
                alt={client.customerName}
                className="w-10 h-10 rounded-full object-cover border border-[#2A2A2A]"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#202020] border border-[#2D2D2D] flex items-center justify-center text-white">
                <User size={18} />
              </div>
            )}
            <div>
              <div className="text-white text-sm font-semibold">{client.customerName}</div>
              <div className="text-[#8E8E93] text-xs">{client.customerPhone || client.customerEmail}</div>
            </div>
          </div>

          <div>
            {client.status === "active" ? (
              <span className="px-2 py-0.5 rounded-full bg-[#34C759]/15 border border-[#34C759]/30 text-[#34C759] text-[11px] font-semibold">
                {client.daysLeft}d left
              </span>
            ) : client.status === "pending" ? (
              <span className="px-2 py-0.5 rounded-full bg-[#FF9F0A]/15 border border-[#FF9F0A]/30 text-[#FF9F0A] text-[11px] font-semibold">
                Pending
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-full bg-[#EF4444]/15 border border-[#EF4444]/30 text-[#EF4444] text-[11px] font-semibold">
                Expired
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-[#202020]">
          <div>
            <span className="text-[#8E8E93] text-[10px] uppercase">Timings</span>
            <p className="text-white text-xs">{client.timings || "Flexible"}</p>
          </div>
          <div className="text-right">
            <span className="text-[#8E8E93] text-[10px] uppercase">Expiry</span>
            <p className="text-white text-xs">{formatDate(client.expiryOn)}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-[#202020]">
          <span className="text-[#8E8E93] text-xs">Monthly Coaching Fee:</span>
          <span className="text-[#D7FF00] font-bold text-sm">
            ₹{client.lastPayment?.amountPaid || client.trainerPrice || 0}
          </span>
        </div>
      </div>
    </>
  );
}
