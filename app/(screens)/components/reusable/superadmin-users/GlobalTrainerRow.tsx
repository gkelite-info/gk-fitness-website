"use client";

import { Eye, NotePencil } from "@phosphor-icons/react";
import { TableRow, TableCell } from "../table";
import Avatar from "../Avatar";
import { PlatformUser } from "./types";

interface GlobalTrainerRowProps {
  user: PlatformUser;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
}

export default function GlobalTrainerRow({
  user,
  onView,
  onEdit,
}: GlobalTrainerRowProps) {
  return (
    <TableRow className="border-b border-[#171B24] hover:bg-[#141720] transition-colors">
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar
            src={user.avatarUrl}
            alt={user.name}
            className="w-10 h-10 rounded-full border border-[#222836] shrink-0"
          />
          <span className="text-white font-bold text-sm tracking-tight truncate">
            {user.name}
          </span>
        </div>
      </TableCell>

      <TableCell>
        <span className="text-[#CBD5E1] text-xs sm:text-sm font-medium whitespace-nowrap">
          {user.mobileNumber || "+91 98765 43210"}
        </span>
      </TableCell>

      <TableCell>
        <span className="text-[#CBD5E1] text-xs sm:text-sm font-medium">
          {user.email || `${user.name.toLowerCase().replace(/\s+/g, ".")}@gmail.com`}
        </span>
      </TableCell>

      <TableCell>
        <span className="text-[#CBD5E1] text-xs sm:text-sm font-medium whitespace-nowrap">
          {user.joinedDate}
        </span>
      </TableCell>

      <TableCell>
        {user.status === "Active" ? (
          <span className="px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 bg-[rgba(2,44,34,0.6)] border border-[rgba(6,95,70,0.5)] text-[#34D399]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" />
            Active
          </span>
        ) : (
          <span className="px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 bg-[rgba(69,26,3,0.6)] border border-[rgba(146,64,14,0.5)] text-[#FB923C]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FB923C]" />
            Inactive
          </span>
        )}
      </TableCell>

      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => onView(user.id)}
            title="View Details"
            aria-label={`View details for ${user.name}`}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#141824] border border-[#222A3B] hover:border-[#D4FF32] inline-flex items-center justify-center text-[#94A3B8] hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <Eye size={18} />
          </button>
          <button
            type="button"
            onClick={() => onEdit(user.id)}
            title="Edit Trainer"
            aria-label={`Edit ${user.name}`}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#141824] border border-[#222A3B] hover:border-[#D4FF32] inline-flex items-center justify-center text-[#94A3B8] hover:text-[#D4FF32] transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <NotePencil size={18} />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
}
