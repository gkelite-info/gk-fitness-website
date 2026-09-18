"use client";

import UserCard from "../../../components/reusable/UserCard";

export interface Customer {
  id: string;
  name: string;
  status: "Active" | "Inactive";
  phone: string;
  plan: string;
  joinedDate: string;
  validTill: string;
  avatarUrl?: string;
}

interface CustomersGridProps {
  customers: Customer[];
}

export default function CustomersGrid({ customers }: CustomersGridProps) {
  return (
    <div className="flex flex-col w-full mt-8 gap-4">
      <h2 className="font-sans font-bold text-[15px] leading-6 text-white tracking-[-0.2px]">
        Customers ({customers.length})
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 w-full">
        {customers.map((customer, index) => (
          <UserCard
            key={`${customer.id}-${index}`}
            id={customer.id}
            name={customer.name}
            status={customer.status}
            phone={customer.phone}
            plan={customer.plan}
            joinedDate={customer.joinedDate}
            validTill={customer.validTill}
          />
        ))}
      </div>
    </div>
  );
}
