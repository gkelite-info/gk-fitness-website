"use client";

import { useState } from "react";
import MembershipExpiryHeader from "./_components/MembershipExpiryHeader";
import MembershipExpiryCards from "./_components/MembershipExpiryCards";
import MembershipExpiryFilterBar from "./_components/MembershipExpiryFilterBar";
import MembershipExpiryTable from "./_components/MembershipExpiryTable";
import Pagination from "@/app/(screens)/components/reusable/Pagination";

export default function MembershipExpiryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalCount = 18;
  const itemsPerPage = 8;

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#0A0D14] p-4 md:p-6 lg:p-8 overflow-x-hidden">
      <div className="flex flex-col max-w-[1200px] w-full mx-auto gap-6">
        <MembershipExpiryHeader />
        
        <MembershipExpiryCards />
        
        <div className="flex flex-col w-full">
          <MembershipExpiryFilterBar />
          <MembershipExpiryTable />
        </div>

        <Pagination 
          currentPage={currentPage} 
          totalPages={Math.ceil(totalCount / itemsPerPage)} 
          totalItems={totalCount}
          onPageChange={setCurrentPage} 
        />
      </div>
    </div>
  );
}
