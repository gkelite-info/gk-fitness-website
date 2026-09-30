"use client";

import { useState } from "react";
import { Bell } from "@phosphor-icons/react/dist/ssr";
import { Table } from "@/app/(screens)/components/reusable/table/Table";
import { TableHeader } from "@/app/(screens)/components/reusable/table/TableHeader";
import { TableBody } from "@/app/(screens)/components/reusable/table/TableBody";
import { TableRow, TableHeadCell, TableCell } from "@/app/(screens)/components/reusable/table/TableCells";
import Pagination from "@/app/(screens)/components/reusable/Pagination";

const ALERTS_DATA = [
  {
    id: 1,
    title: "8 memberships expire tomorrow",
    subtitle: "Review members and renewals",
    type: "Membership",
    details: "8 members have memberships expiring on 30 Jul 2026.",
    date: "29 Jul 2026",
    time: "9:30 AM",
    color: "red",
  },
  {
    id: 2,
    title: "Rahul Sharma renewed Gold Membership",
    subtitle: "Valid till 31 Aug 2026",
    type: "Payment",
    details: "Rahul Sharma renewed Gold Membership.",
    date: "29 Jul 2026",
    time: "9:12 AM",
    color: "green",
  },
  {
    id: 3,
    title: "New member registration received",
    subtitle: "Priya Nair joined the gym",
    type: "Member",
    details: "New member Priya Nair has completed registration.",
    date: "29 Jul 2026",
    time: "8:55 AM",
    color: "yellow",
  },
  {
    id: 4,
    title: "Trainer leave request submitted",
    subtitle: "Amit Kumar • 2 Aug – 4 Aug",
    type: "Trainer",
    details: "Amit Kumar has requested leave from 2 Aug to 4 Aug.",
    date: "29 Jul 2026",
    time: "8:20 AM",
    color: "orange",
  },
  {
    id: 5,
    title: "Support ticket received",
    subtitle: '"Unable to book trainer"',
    type: "Support",
    details: "New support ticket received regarding trainer booking issue.",
    date: "29 Jul 2026",
    time: "7:48 AM",
    color: "blue",
  },
  {
    id: 6,
    title: "Payment failed",
    subtitle: "Membership payment failed for Arjun Singh",
    type: "Payment",
    details: "Payment failed for Arjun Singh. Please check.",
    date: "28 Jul 2026",
    time: "6:40 PM",
    color: "purple",
  },
  {
    id: 7,
    title: "Personal training package purchased",
    subtitle: "Sneha Patel purchased 12 PT Sessions",
    type: "PT Sessions",
    details: "Sneha Patel purchased a package of 12 PT Sessions.",
    date: "28 Jul 2026",
    time: "5:10 PM",
    color: "teal",
  },
  {
    id: 8,
    title: "Attendance milestone",
    subtitle: "50 members checked in today",
    type: "Attendance",
    details: "Reached 50 member check-ins today.",
    date: "28 Jul 2026",
    time: "4:00 PM",
    color: "orange",
  },
  {
    id: 9,
    title: "Low inventory alert",
    subtitle: "Protein Powder (Chocolate) only 3 units left",
    type: "Inventory",
    details: "Protein Powder (Chocolate) stock is low. Only 3 units left.",
    date: "28 Jul 2026",
    time: "3:45 PM",
    color: "pink",
  },
];

const getColorConfig = (color: string) => {
  switch (color) {
    case "red": return { circleBg: "bg-[rgba(69,10,10,0.4)]", circleBorder: "border-[rgba(153,27,27,0.4)]", iconColor: "#F87171", badgeBg: "bg-[rgba(69,10,10,0.4)]", badgeBorder: "border-[rgba(127,29,29,0.3)]", badgeText: "text-[#F87171]" };
    case "green": return { circleBg: "bg-[rgba(2,44,34,0.4)]", circleBorder: "border-[rgba(6,95,70,0.4)]", iconColor: "#34D399", badgeBg: "bg-[rgba(2,44,34,0.4)]", badgeBorder: "border-[rgba(6,78,59,0.3)]", badgeText: "text-[#34D399]" };
    case "yellow": return { circleBg: "bg-[rgba(69,26,3,0.4)]", circleBorder: "border-[rgba(146,64,14,0.4)]", iconColor: "#FBBF24", badgeBg: "bg-[rgba(69,26,3,0.4)]", badgeBorder: "border-[rgba(120,53,15,0.3)]", badgeText: "text-[#FBBF24]" };
    case "orange": return { circleBg: "bg-[rgba(67,20,7,0.4)]", circleBorder: "border-[rgba(154,52,18,0.4)]", iconColor: "#FB923C", badgeBg: "bg-[rgba(67,20,7,0.4)]", badgeBorder: "border-[rgba(154,52,18,0.4)]", badgeText: "text-[#FB923C]" };
    case "blue": return { circleBg: "bg-[rgba(23,37,84,0.4)]", circleBorder: "border-[rgba(30,64,175,0.4)]", iconColor: "#60A5FA", badgeBg: "bg-[rgba(23,37,84,0.4)]", badgeBorder: "border-[rgba(30,58,138,0.3)]", badgeText: "text-[#60A5FA]" };
    case "purple": return { circleBg: "bg-[rgba(59,7,100,0.4)]", circleBorder: "border-[rgba(107,33,168,0.4)]", iconColor: "#C084FC", badgeBg: "bg-[rgba(59,7,100,0.4)]", badgeBorder: "border-[rgba(88,28,135,0.3)]", badgeText: "text-[#C084FC]" };
    case "teal": return { circleBg: "bg-[rgba(2,44,34,0.4)]", circleBorder: "border-[rgba(6,95,70,0.4)]", iconColor: "#2DD4BF", badgeBg: "bg-[rgba(2,44,34,0.4)]", badgeBorder: "border-[rgba(6,78,59,0.3)]", badgeText: "text-[#2DD4BF]" };
    case "pink": return { circleBg: "bg-[rgba(76,5,25,0.4)]", circleBorder: "border-[rgba(159,18,57,0.4)]", iconColor: "#FB7185", badgeBg: "bg-[rgba(76,5,25,0.4)]", badgeBorder: "border-[rgba(136,19,55,0.3)]", badgeText: "text-[#FB7185]" };
    default: return { circleBg: "bg-[rgba(69,10,10,0.4)]", circleBorder: "border-[rgba(153,27,27,0.4)]", iconColor: "#F87171", badgeBg: "bg-[rgba(69,10,10,0.4)]", badgeBorder: "border-[rgba(127,29,29,0.3)]", badgeText: "text-[#F87171]" };
  }
};

export default function AlertsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11;
  const totalPages = Math.ceil(ALERTS_DATA.length / itemsPerPage);

  return (
    <div className="w-full bg-[rgba(18,23,30,0.7)] border border-[#1F2732] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] rounded-xl overflow-hidden mt-1">
      <Table className="border-none rounded-none bg-transparent">
        <TableHeader className="bg-[rgba(20,25,34,0.5)] border-b border-[#1F2732]">
          <TableRow className="hover:bg-transparent">
            <TableHeadCell className="pl-6 w-auto text-[12px]">Alert</TableHeadCell>
            <TableHeadCell className="w-[120px] text-[12px]">Type</TableHeadCell>
            <TableHeadCell className="w-[300px] text-[12px]">Details</TableHeadCell>
            <TableHeadCell className="w-[100px] text-[12px]">Date</TableHeadCell>
            <TableHeadCell className="w-[100px] text-[12px]">Time</TableHeadCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ALERTS_DATA.map((alert) => {
            const theme = getColorConfig(alert.color);
            return (
              <TableRow key={alert.id} className="border-b border-[#1B222C] last:border-b-0 hover:bg-[rgba(255,255,255,0.02)] cursor-pointer">
                <TableCell className="pl-6 py-4">
                  <div className="flex flex-row items-center gap-3.5">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${theme.circleBg} ${theme.circleBorder}`}>
                      <Bell size={16} color={theme.iconColor} weight="regular" />
                    </div>
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="font-sans font-semibold text-[12px] leading-4 tracking-[-0.3px] text-white truncate">
                        {alert.title}
                      </span>
                      <span className="font-sans font-normal text-[11px] leading-4 text-[#94A3B8] truncate">
                        {alert.subtitle}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className={`inline-flex items-center justify-center px-2.5 py-0.5 rounded-full border ${theme.badgeBg} ${theme.badgeBorder}`}>
                    <span className={`font-sans font-medium text-[11px] leading-4 ${theme.badgeText}`}>
                      {alert.type}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <span className="font-sans font-normal text-[12px] leading-4 text-[#CBD5E1] truncate block max-w-[200px] sm:max-w-xs md:max-w-md">
                    {alert.details}
                  </span>
                </TableCell>
                <TableCell className="py-4">
                  <span className="font-sans font-normal text-[11px] leading-4 text-[#CBD5E1]">
                    {alert.date}
                  </span>
                </TableCell>
                <TableCell className="py-4">
                  <span className="font-sans font-normal text-[11px] leading-4 text-[#94A3B8]">
                    {alert.time}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      
      <div className="px-4">
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages > 0 ? totalPages : 1}
          totalItems={ALERTS_DATA.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
