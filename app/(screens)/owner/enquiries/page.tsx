"use client";
import { useState, useMemo } from "react";
import EnquiriesHeader from "@/app/(screens)/owner/enquiries/_components/EnquiriesHeader";
import EnquiriesCards from "@/app/(screens)/owner/enquiries/_components/EnquiriesCards";
import EnquiriesFilterBar from "@/app/(screens)/owner/enquiries/_components/EnquiriesFilterBar";
import EnquiriesTable from "@/app/(screens)/owner/enquiries/_components/EnquiriesTable";
import { useGymEnquiries } from "@/lib/hooks/gymEnquiries/useGymEnquiries";
import { useUser } from "@/app/context/UserContext";

export default function EnquiriesPage() {
  const { roleData } = useUser();
  const gymId = roleData?.[0]?.gymId;
  const { data: enquiries = [], isLoading } = useGymEnquiries(gymId);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [source, setSource] = useState("all");
  const [status, setStatus] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((enquiry: any) => {
      if (search &&
        !enquiry.fullName?.toLowerCase().includes(search.toLowerCase()) &&
        !enquiry.mobile?.includes(search) &&
        !enquiry.gymEnquiryId?.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }

      if (category !== "all" && enquiry.enquiryCategory?.toLowerCase() !== category.toLowerCase()) {
        return false;
      }

      if (source !== "all" && enquiry.enquirySource?.toLowerCase() !== source.toLowerCase()) {
        if (source === 'owner' && enquiry.enquirySource !== 'owner') return false;
        if (source !== 'owner' && enquiry.enquirySource !== source) return false;
      }

      if (status !== "all" && enquiry.status?.toLowerCase() !== status.toLowerCase()) {
        return false;
      }

      return true;
    });
  }, [enquiries, search, category, source, status, dateRange]);

  return (
    <div className="flex flex-col px-4 md:px-6 lg:px-9 py-7 gap-5 w-full h-full min-w-0 overflow-y-auto overflow-x-hidden scrollbar-themed max-w-[1182px] mx-auto">
      <EnquiriesHeader />
      <EnquiriesCards enquiries={enquiries} />
      <EnquiriesFilterBar
        search={search} setSearch={setSearch}
        category={category} setCategory={setCategory}
        source={source} setSource={setSource}
        status={status} setStatus={setStatus}
        dateRange={dateRange} setDateRange={setDateRange}
      />
      <EnquiriesTable enquiries={filteredEnquiries} isLoading={isLoading} />
    </div>
  );
}
