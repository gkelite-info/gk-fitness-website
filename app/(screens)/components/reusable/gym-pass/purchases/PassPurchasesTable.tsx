"use client";

import { useState } from "react";
import { MagnifyingGlass, Ticket } from "@phosphor-icons/react";
import CustomDropdown, { DropdownOption } from "@/app/(screens)/components/reusable/CustomDropdown";
import Avatar from "@/app/(screens)/components/reusable/Avatar";
import Pagination from "@/app/(screens)/components/reusable/Pagination";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeadCell,
  TableCell,
} from "@/app/(screens)/components/reusable/table";

interface PurchaseRecord {
  id: string;
  customerName: string;
  customerId: string;
  avatarUrl?: string;
  gender?: "male" | "female";
  passType: "Monthly Pass" | "Day Pass";
  purchasedOn: string;
  usedVisits: number;
  totalVisits: number;
}

const mockPurchases: PurchaseRecord[] = [
  {
    id: "1",
    customerName: "Rohit Sharma",
    customerId: "ID: #GYM-9801",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    gender: "male",
    passType: "Monthly Pass",
    purchasedOn: "18 May 2025",
    usedVisits: 5,
    totalVisits: 30,
  },
  {
    id: "2",
    customerName: "Neha Patel",
    customerId: "ID: #GYM-9784",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    gender: "female",
    passType: "Day Pass",
    purchasedOn: "18 May 2025",
    usedVisits: 1,
    totalVisits: 1,
  },
  {
    id: "3",
    customerName: "Vikram Singh",
    customerId: "ID: #GYM-9632",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    gender: "male",
    passType: "Monthly Pass",
    purchasedOn: "17 May 2025",
    usedVisits: 2,
    totalVisits: 30,
  },
  {
    id: "4",
    customerName: "Ananya Iyer",
    customerId: "ID: #GYM-9550",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    gender: "female",
    passType: "Day Pass",
    purchasedOn: "17 May 2025",
    usedVisits: 0,
    totalVisits: 1,
  },
  {
    id: "5",
    customerName: "Arjun Mehta",
    customerId: "ID: #GYM-9411",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    gender: "male",
    passType: "Monthly Pass",
    purchasedOn: "16 May 2025",
    usedVisits: 0,
    totalVisits: 30,
  },
  {
    id: "6",
    customerName: "Arjun Mehta",
    customerId: "ID: #GYM-9390",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    gender: "male",
    passType: "Monthly Pass",
    purchasedOn: "16 May 2025",
    usedVisits: 0,
    totalVisits: 30,
  },
  {
    id: "7",
    customerName: "Vikram Singh",
    customerId: "ID: #GYM-9280",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    gender: "male",
    passType: "Monthly Pass",
    purchasedOn: "17 May 2025",
    usedVisits: 2,
    totalVisits: 30,
  },
];

const passTypeOptions: DropdownOption[] = [
  { label: "All", value: "All" },
  { label: "Day Pass", value: "Day Pass" },
  { label: "Monthly Pass", value: "Monthly Pass" },
];

export default function PassPurchasesTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPassType, setSelectedPassType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const filtered = mockPurchases.filter((record) => {
    const matchesSearch =
      record.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.customerId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType =
      selectedPassType === "All" || record.passType === selectedPassType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#13151B] border border-[#232631] rounded-2xl p-3 sm:p-4 shadow-sm">
        <div className="relative w-full sm:w-72 md:w-80">
          <MagnifyingGlass
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, phone.."
            className="w-full pl-10 pr-4 py-2 bg-[#181A22] border border-[#242836] focus:border-[#D4FF32] rounded-xl text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none transition-colors h-[40px]"
          />
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto shrink-0">
          <span className="text-xs uppercase font-bold text-[#64748B] tracking-wider shrink-0 whitespace-nowrap">
            Pass Type
          </span>
          <div className="flex-1 sm:w-44 sm:flex-none">
            <CustomDropdown
              options={passTypeOptions}
              value={selectedPassType}
              onChange={(val) => setSelectedPassType(val)}
              triggerClassName="relative flex flex-row items-center justify-between px-3 py-2 w-full bg-[#181A22] border border-[#242836] rounded-xl text-xs sm:text-sm text-white transition-colors cursor-pointer h-[40px]"
            />
          </div>
        </div>
      </div>

      <div className="w-full bg-[#13151B] border border-[#232631] rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <Table className="border-none rounded-none bg-transparent">
          <TableHeader className="bg-transparent border-b border-[#1E222D]">
            <TableRow className="hover:bg-transparent">
              <TableHeadCell className="py-4 pl-5">Customer</TableHeadCell>
              <TableHeadCell className="py-4 px-4">Pass Type</TableHeadCell>
              <TableHeadCell className="py-4 px-4">Purchased On</TableHeadCell>
              <TableHeadCell className="py-4 pr-5">Usage Track</TableHeadCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-[#181A22]">
            {filtered.map((item) => (
              <TableRow key={item.id} className="hover:bg-[#161822] transition-colors">
                <TableCell className="py-3.5 pl-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#2B303F]">
                      <Avatar
                        src={item.avatarUrl}
                        gender={item.gender}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-white truncate text-xs sm:text-sm">
                        {item.customerName}
                      </span>
                      <span className="text-[11px] text-[#64748B] font-mono mt-0.5">
                        {item.customerId}
                      </span>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-3 bg-[#D4FF32] rounded-[3px] flex items-center justify-center shrink-0">
                      <Ticket size={10} weight="fill" className="text-black" />
                    </div>
                    <span className="font-medium text-white text-xs sm:text-sm">
                      {item.passType}
                    </span>
                  </div>
                </TableCell>

                <TableCell className="py-3.5 px-4 text-[#94A3B8] font-medium text-xs sm:text-sm whitespace-nowrap">
                  {item.purchasedOn}
                </TableCell>

                <TableCell className="py-3.5 pr-5 text-xs sm:text-sm font-medium text-[#CBD5E1] whitespace-nowrap">
                  <span>Usage: </span>
                  <span className="text-[#D4FF32] font-bold">{item.usedVisits}</span>
                  <span> / {item.totalVisits} {item.totalVisits === 1 ? "visit" : "visits"}</span>
                </TableCell>
              </TableRow>
            ))}

            {filtered.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-12 text-center text-[#64748B]">
                  No pass purchases found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="p-4 border-t border-[#1E222D] bg-[#13151B]">
          <Pagination
            currentPage={currentPage}
            totalPages={3}
            totalItems={2315}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
}
