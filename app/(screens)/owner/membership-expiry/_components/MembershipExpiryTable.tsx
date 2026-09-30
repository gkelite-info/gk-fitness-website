"use client";

import Avatar from "@/app/(screens)/components/reusable/Avatar";
import { useRouter } from "next/navigation";
import { Table } from "@/app/(screens)/components/reusable/table/Table";
import { TableHeader } from "@/app/(screens)/components/reusable/table/TableHeader";
import { TableBody } from "@/app/(screens)/components/reusable/table/TableBody";
import { TableRow, TableHeadCell, TableCell } from "@/app/(screens)/components/reusable/table/TableCells";

export const MOCK_EXPIRING_MEMBERS = [
  { id: 1, name: "Rahul Sharma", memberId: "MEM001", plan: "Gold Membership", planColor: "#FBBF24", phone: "+91 98765 43210", expiryDate: "May 10, 2024", daysLeft: 0, gender: "male" },
  { id: 2, name: "Sneha Patel", memberId: "MEM002", plan: "Premium Membership", planColor: "#A855F7", phone: "+91 98765 43211", expiryDate: "May 10, 2024", daysLeft: 0, gender: "female" },
  { id: 3, name: "Neha Kapoor", memberId: "MEM003", plan: "Silver Membership", planColor: "#94A3B8", phone: "+91 98765 43212", expiryDate: "May 10, 2024", daysLeft: 0, gender: "female" },
  { id: 4, name: "Arjun Kumar", memberId: "MEM004", plan: "Gold Membership", planColor: "#FBBF24", phone: "+91 98765 43213", expiryDate: "May 12, 2024", daysLeft: 2, gender: "male" },
  { id: 5, name: "Priya Singh", memberId: "MEM005", plan: "Premium Membership", planColor: "#A855F7", phone: "+91 98765 43214", expiryDate: "May 13, 2024", daysLeft: 3, gender: "female" },
  { id: 6, name: "Vikram Mehta", memberId: "MEM006", plan: "Gold Membership", planColor: "#FBBF24", phone: "+91 98765 43215", expiryDate: "May 14, 2024", daysLeft: 4, gender: "male" },
  { id: 7, name: "Karan Malhotra", memberId: "MEM007", plan: "Silver Membership", planColor: "#94A3B8", phone: "+91 98765 43216", expiryDate: "May 16, 2024", daysLeft: 6, gender: "male" },
  { id: 8, name: "Amit Kumar", memberId: "MEM008", plan: "Gold Membership", planColor: "#FBBF24", phone: "+91 98765 43217", expiryDate: "May 17, 2024", daysLeft: 7, gender: "male" },
];

export default function MembershipExpiryTable() {
  const router = useRouter();

  return (
    <div className="w-full flex flex-col bg-[#131926] rounded-[16px] border border-[#1A2234] overflow-hidden">
      <Table className="border-none bg-transparent rounded-none">
        <TableHeader className="bg-transparent border-[#1A2234]">
          <TableRow className="hover:bg-transparent">
            <TableHeadCell className="text-[#717E95]">Member</TableHeadCell>
            <TableHeadCell className="text-[#717E95]">Member ID</TableHeadCell>
            <TableHeadCell className="text-[#717E95]">Plan</TableHeadCell>
            <TableHeadCell className="text-[#717E95]">Phone Number</TableHeadCell>
            <TableHeadCell className="text-[#717E95]">Expiry Date</TableHeadCell>
            <TableHeadCell className="text-[#717E95] text-center">Days Left</TableHeadCell>
            <TableHeadCell className="text-[#717E95] text-center">Action</TableHeadCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {MOCK_EXPIRING_MEMBERS.map((member) => (
            <TableRow key={member.id} className="border-t border-[#1A2234] hover:bg-[#1A1C23]">
              <TableCell>
                <div className="flex flex-row items-center gap-3">
                  <Avatar gender={member.gender as any} className="w-8 h-8" />
                  <span className="font-sans font-medium text-[13px] leading-[20px] text-[#E2E8F0]">
                    {member.name}
                  </span>
                </div>
              </TableCell>

              <TableCell>
                <span className="font-sans font-medium text-[13px] leading-[20px] text-[#94A3B8]">
                  {member.memberId}
                </span>
              </TableCell>

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
                  className={`inline-flex items-center justify-center px-2 py-0.5 rounded-[4px] border border-opacity-30 ${
                    member.daysLeft === 0 
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
