"use client";

import { Table, TableHeader, TableBody, TableRow, TableHeadCell, TableCell } from "../../../components/reusable/table";
import Avatar from "../../../components/reusable/Avatar";
import { CaretRight } from "@phosphor-icons/react";

interface Customer {
  id: string;
  name: string;
  status: "Active" | "Inactive";
  phone: string;
  plan: string;
  joinedDate: string;
  validTill: string;
  avatarUrl?: string;
}

interface CustomersTableProps {
  customers: Customer[];
  userType?: "customers" | "trainers";
}

export default function CustomersTable({ customers, userType = "customers" }: CustomersTableProps) {
  const isTrainer = userType === "trainers";
  const title = isTrainer ? "Trainers" : "Customers";

  return (
    <div className="flex flex-col w-full mt-8 gap-4">
      <h2 className="font-sans font-bold text-[15px] leading-6 text-white tracking-[-0.2px]">
        {title} ({customers.length})
      </h2>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeadCell>Member</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Phone</TableHeadCell>
            <TableHeadCell>{isTrainer ? "Specialization" : "Plan"}</TableHeadCell>
            <TableHeadCell>Joined Date</TableHeadCell>
            {!isTrainer && <TableHeadCell>Valid Till</TableHeadCell>}
            <TableHeadCell className="w-[40px]"></TableHeadCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer, index) => {
            const isActive = customer.status === "Active";
            
            return (
              <TableRow key={`${customer.id}-${index}`} className="cursor-pointer group hover:bg-[#1B1F24] transition-all duration-200">
                <TableCell>
                  <div className="flex flex-row items-center gap-3">
                    <Avatar src={customer.avatarUrl} className="w-9 h-9 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]" />
                    <div className="flex flex-col justify-center gap-0.5">
                      <span className="font-sans font-bold text-[13px] leading-[18px] text-white group-hover:text-[#D2F829] transition-colors">
                        {customer.name}
                      </span>
                      <span className="font-sans font-medium text-[11px] leading-4 text-[#717885]">
                        {customer.id}
                      </span>
                    </div>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className={`inline-flex px-2 py-0.5 rounded-full border items-center justify-center ${
                    isActive ? "bg-[#1C331A] border-[#234D20] text-[#4ADE80]" : "bg-[#2F1B1E] border-[#482025] text-[#F87171]"
                  }`}>
                    <span className="font-sans font-semibold text-[10px] leading-[15px]">
                      {customer.status}
                    </span>
                  </div>
                </TableCell>
                
                <TableCell>
                  <span className="text-[#848C99]">{customer.phone}</span>
                </TableCell>
                
                <TableCell>
                  <span className="font-semibold text-[#FFB931]">{customer.plan}</span>
                </TableCell>
                
                <TableCell>
                  <span className="text-[#848C99]">{customer.joinedDate}</span>
                </TableCell>
                
                {!isTrainer && (
                  <TableCell>
                    <strong className={`font-normal ${isActive ? "text-white" : "text-[#F87171]"}`}>
                      {customer.validTill}
                    </strong>
                  </TableCell>
                )}
                
                <TableCell>
                  <CaretRight size={16} className="text-[#656C79] group-hover:text-[#D2F829] transition-colors" weight="bold" />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
