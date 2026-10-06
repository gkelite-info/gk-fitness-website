"use client";

import Avatar from "@/app/(screens)/components/reusable/Avatar";
import { useRouter } from "next/navigation";
import { Table } from "@/app/(screens)/components/reusable/table/Table";
import { TableHeader } from "@/app/(screens)/components/reusable/table/TableHeader";
import { TableBody } from "@/app/(screens)/components/reusable/table/TableBody";
import { TableRow, TableHeadCell, TableCell } from "@/app/(screens)/components/reusable/table/TableCells";

export interface ExpiringMember {
  id: string;
  name: string;
  memberId: string;
  plan: string;
  planColor?: string;
  phone: string;
  expiryDate: string;
  daysLeft: number;
  gender: string;
}

interface MembershipExpiryTableProps {
  data: ExpiringMember[];
  isLoading?: boolean;
}

export default function MembershipExpiryTable({ data, isLoading }: MembershipExpiryTableProps) {
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8 w-full bg-[#131926] rounded-[16px] border border-[#1A2234]">
        <span className="text-[#717E95]">Loading members...</span>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center p-8 w-full bg-[#131926] rounded-[16px] border border-[#1A2234]">
        <span className="text-[#717E95]">No expiring members found.</span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col bg-[#131926] rounded-[16px] border border-[#1A2234] overflow-hidden">
      <Table className="border-none bg-transparent rounded-none">
        <TableHeader className="bg-transparent border-[#1A2234]">
          <TableRow className="hover:bg-transparent">
            <TableHeadCell className="text-[#717E95]">Member</TableHeadCell>
            {/* <TableHeadCell className="text-[#717E95]">Member ID</TableHeadCell> */}
            <TableHeadCell className="text-[#717E95]">Plan</TableHeadCell>
            <TableHeadCell className="text-[#717E95]">Phone Number</TableHeadCell>
            <TableHeadCell className="text-[#717E95]">Expiry Date</TableHeadCell>
            <TableHeadCell className="text-[#717E95] text-center">Days Left</TableHeadCell>
            <TableHeadCell className="text-[#717E95] text-center">Action</TableHeadCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((member) => (
            <TableRow key={member.id} className="border-t border-[#1A2234] hover:bg-[#1A1C23]">
              <TableCell>
                <div className="flex flex-row items-center gap-3">
                  <Avatar gender={member.gender as any} className="w-8 h-8" />
                  <span className="font-sans font-medium text-[13px] leading-[20px] text-[#E2E8F0]">
                    {member.name}
                  </span>
                </div>
              </TableCell>

              {/* <TableCell>
                <span className="font-sans font-medium text-[13px] leading-[20px] text-[#94A3B8]">
                  {member.memberId}
                </span>
              </TableCell> */}

              <TableCell>
                <div className="flex flex-row items-center gap-1.5">
                  <span style={{ color: member.planColor }}>👑</span>
                  <span className="font-sans font-medium text-[13px] leading-[20px] text-[#E2E8F0]">
                    {member.plan}
                  </span>
                </div>
              </TableCell>

              <TableCell>
                <span className="font-sans font-medium text-[13px] leading-[20px] text-[#94A3B8]">
                  {member.phone}
                </span>
              </TableCell>

              <TableCell>
                <span className="font-sans font-medium text-[13px] leading-[20px] text-[#E2E8F0]">
                  {member.expiryDate}
                </span>
              </TableCell>

              <TableCell className="text-center">
                <div
                  className={`inline-flex items-center justify-center px-2 py-0.5 rounded-[4px] border border-opacity-30 ${member.daysLeft === 0
                    ? 'bg-[rgba(239,68,68,0.1)] border-[#EF4444] text-[#EF4444]'
                    : member.daysLeft <= 4
                      ? 'bg-[rgba(245,158,11,0.1)] border-[#F59E0B] text-[#F59E0B]'
                      : 'bg-[rgba(16,185,129,0.1)] border-[#10B981] text-[#10B981]'
                    }`}
                >
                  <span className="font-sans font-bold text-[11px] leading-[16px]">
                    {member.daysLeft}
                  </span>
                </div>
              </TableCell>

              <TableCell className="text-center">
                <button
                  onClick={() => router.push(`/owner/users/${member.id}`)}
                  className="inline-flex items-center justify-center px-3 py-1.5 h-[28px] border border-[#232936] bg-[#0E1117] hover:bg-[#1A1C23] rounded-lg cursor-pointer transition-colors"
                >
                  <span className="font-sans font-semibold text-[11px] leading-[16px] text-[#E2E8F0]">
                    View Profile
                  </span>
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
