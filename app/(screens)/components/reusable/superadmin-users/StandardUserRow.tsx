"use client";

import { MapPin, Eye } from "@phosphor-icons/react";
import { TableRow, TableCell } from "../table";
import Avatar from "../Avatar";
import { PlatformUser, UserRoleTab } from "./types";

interface StandardUserRowProps {
  user: PlatformUser;
  currentTab: UserRoleTab;
  onView?: (id: string, role: UserRoleTab) => void;
}

export default function StandardUserRow({
  user,
  currentTab,
  onView,
}: StandardUserRowProps) {
  const getRoleLabel = () => {
    switch (currentTab) {
      case "owners":
        return "Owner ID";
      case "trainers":
        return "Trainer ID";
      default:
        return "Customer ID";
    }
  };

  return (
    <TableRow className="border-b border-[#171B24] hover:bg-[#141720] transition-colors">
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar
            src={user.avatarUrl}
            alt={user.name}
            className="w-10 h-10 rounded-full border border-[#222836] shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-white font-bold text-sm tracking-tight truncate">
              {user.name}
            </span>
            <span className="text-[#94A3B8] text-xs font-normal">
              {getRoleLabel()}: {user.code}
            </span>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <div className="flex flex-col min-w-0">
          <span className="text-white font-semibold text-xs sm:text-sm truncate">
            {user.gymName}
          </span>
          <div className="flex items-center gap-1 text-[#94A3B8] text-xs mt-0.5">
            <MapPin size={13} className="shrink-0 text-[#64748B]" />
            <span className="truncate">{user.location}</span>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <span className="text-[#CBD5E1] text-xs sm:text-sm font-medium">
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
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={() => onView?.(user.id, currentTab)}
            title="View Details"
            aria-label={`View details for ${user.name}`}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#141824] border border-[#222A3B] hover:border-[#D4FF32] inline-flex items-center justify-center text-[#94A3B8] hover:text-white transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <Eye size={18} />
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
}
