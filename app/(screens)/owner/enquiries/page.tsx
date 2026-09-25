import EnquiriesHeader from "@/app/(screens)/owner/enquiries/_components/EnquiriesHeader";
import EnquiriesCards from "@/app/(screens)/owner/enquiries/_components/EnquiriesCards";
import EnquiriesFilterBar from "@/app/(screens)/owner/enquiries/_components/EnquiriesFilterBar";
import EnquiriesTable from "@/app/(screens)/owner/enquiries/_components/EnquiriesTable";

export default function EnquiriesPage() {
  return (
    <div className="flex flex-col px-4 md:px-6 lg:px-9 py-7 gap-5 w-full h-full min-w-0 overflow-y-auto overflow-x-hidden scrollbar-themed max-w-[1182px] mx-auto">
      <EnquiriesHeader />
      <EnquiriesCards />
      <EnquiriesFilterBar />
      <EnquiriesTable />
    </div>
  );
}
