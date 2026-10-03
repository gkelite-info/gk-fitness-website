"use client";

import Pagination from "@/app/(screens)/components/reusable/Pagination";
import { Table, TableHeader, TableBody, TableRow, TableHeadCell, TableCell } from "@/app/(screens)/components/reusable/table";
import { Eye, ShareNetwork, UserPlus, Pen, Trash } from "@phosphor-icons/react";
import { useState } from "react";
import ViewEnquiryModal from "./ViewEnquiryModal";
import ConfirmationModal from "@/app/(screens)/components/reusable/ConfirmationModal";
import { useDeleteGymEnquiry } from "@/lib/hooks/gymEnquiries/useGymEnquiries";
import toast from "react-hot-toast";

const mockData = [
  {
    id: "01",
    name: "Rahul Sharma",
    phone: "9876543210",
    interestedIn: "Gym Membership",
    addedVia: "Social Media",
    source: "Instagram",
    enquiryCategory: "Hot",
    followUpDate: "22 Sep 2026",
    status: "New"
  },
  {
    id: "02",
    name: "Sneha Patel",
    phone: "9876543211",
    interestedIn: "Personal Training",
    addedVia: "Owner Added",
    source: "Owner Added",
    enquiryCategory: "Warm",
    followUpDate: "23 Sep 2026",
    status: "Follow-up"
  },
  {
    id: "03",
    name: "Amit Kumar",
    phone: "9876543212",
    interestedIn: "Gym Membership",
    addedVia: "Social Media",
    source: "Google",
    enquiryCategory: "Cold",
    followUpDate: "25 Sep 2026",
    status: "New"
  },
  {
    id: "04",
    name: "Neha Kapoor",
    phone: "9876543213",
    interestedIn: "Group Class",
    addedVia: "Social Media",
    source: "Facebook",
    enquiryCategory: "Warm",
    followUpDate: "21 Sep 2026",
    status: "Follow-up"
  },
  {
    id: "05",
    name: "Vikram Singh",
    phone: "9876543214",
    interestedIn: "Gym Membership",
    addedVia: "Owner Added",
    source: "Walk-in",
    enquiryCategory: "Hot",
    followUpDate: "20 Sep 2026",
    status: "In Progress"
  },
  {
    id: "06",
    name: "Priya Nair",
    phone: "9876543215",
    interestedIn: "Personal Training",
    addedVia: "Social Media",
    source: "Instagram",
    enquiryCategory: "Warm",
    followUpDate: "24 Sep 2026",
    status: "New"
  },
  {
    id: "07",
    name: "Karan Mehta",
    phone: "9876543216",
    interestedIn: "Gym Membership",
    addedVia: "Owner Added",
    source: "Owner Added",
    enquiryCategory: "Cold",
    followUpDate: "26 Sep 2026",
    status: "Follow-up"
  },
  {
    id: "08",
    name: "Ananya Reddy",
    phone: "9876543217",
    interestedIn: "Other",
    addedVia: "Social Media",
    source: "Referral",
    enquiryCategory: "Other",
    followUpDate: "28 Sep 2026",
    status: "New"
  },
  {
    id: "09",
    name: "Rohit Verma",
    phone: "9876543218",
    interestedIn: "Group Class",
    addedVia: "Social Media",
    source: "Google",
    enquiryCategory: "Warm",
    followUpDate: "22 Sep 2026",
    status: "In Progress"
  },
  {
    id: "10",
    name: "Pooja Desai",
    phone: "9876543219",
    interestedIn: "Gym Membership",
    addedVia: "Owner Added",
    source: "Owner Added",
    enquiryCategory: "Hot",
    followUpDate: "23 Sep 2026",
    status: "New"
  }
];

export default function EnquiriesTable({ enquiries = [], isLoading = false }: { enquiries?: any[], isLoading?: boolean }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [enquiryToDelete, setEnquiryToDelete] = useState<string | null>(null);

  const deleteEnquiryMutation = useDeleteGymEnquiry();
  
  const handleDeleteConfirm = async () => {
    if (!enquiryToDelete) return;
    try {
      await deleteEnquiryMutation.mutateAsync(enquiryToDelete);
      toast.success("Enquiry deleted successfully");
      setIsDeleteModalOpen(false);
      setEnquiryToDelete(null);
    } catch (error) {
      toast.error("Failed to delete enquiry");
    }
  };
  
  const itemsPerPage = 10;
  const totalItems = enquiries.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentEnquiries = enquiries.slice(startIndex, startIndex + itemsPerPage);

  const getAddedViaBadge = (addedVia: string) => {
    if (addedVia === "Social Media") {
      return (
        <div className="flex flex-row items-center justify-center px-2.5 py-1 gap-1 w-max bg-[#0B2E1D] border border-[#13492F] rounded-full">
          <ShareNetwork size={11} weight="bold" className="text-[#22C55E]" />
          <span className="font-sans font-medium text-[9px] text-[#22C55E] leading-[14px] whitespace-nowrap">Social Media</span>
        </div>
      );
    }
    return (
      <div className="flex flex-row items-center justify-center px-2.5 py-1 gap-1 w-max bg-[#312014] border border-[#482F1E] rounded-full">
        <UserPlus size={11} weight="bold" className="text-[#F97316]" />
        <span className="font-sans font-medium text-[9px] text-[#F97316] leading-[14px] whitespace-nowrap">Owner Added</span>
      </div>
    );
  };

  const getSourceBadge = (source: string) => {
    switch (source) {
      case "Instagram":
        return <div className="flex px-2.5 py-1 w-max bg-[#2C103D] rounded-full font-sans font-medium text-[9px] text-[#C084FC] leading-[14px]">Instagram</div>;
      case "Google":
        return <div className="flex px-2.5 py-1 w-max bg-[#0D2340] rounded-full font-sans font-medium text-[9px] text-[#38BDF8] leading-[14px]">Google</div>;
      case "Facebook":
        return <div className="flex px-2.5 py-1 w-max bg-[#0A2647] rounded-full font-sans font-medium text-[9px] text-[#2563EB] leading-[14px]">Facebook</div>;
      case "Walk-in":
        return <div className="flex px-2.5 py-1 w-max bg-[#082E20] rounded-full font-sans font-medium text-[9px] text-[#10B981] leading-[14px]">Walk-in</div>;
      case "Referral":
        return <div className="flex px-2.5 py-1 w-max bg-[#2C103D] rounded-full font-sans font-medium text-[9px] text-[#C084FC] leading-[14px]">Referral</div>;
      default:
        return <div className="flex px-2.5 py-1 w-max bg-[#17222E] rounded-full font-sans font-medium text-[9px] text-[#94A3B8] leading-[14px] whitespace-nowrap">{source}</div>;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category?.toLowerCase()) {
      case "hot":
        return <div className="flex justify-center items-center px-4 py-1 w-[48px] bg-[#321317] rounded-full font-sans font-semibold text-[9px] text-[#EF4444] leading-[14px]">Hot</div>;
      case "warm":
        return <div className="flex justify-center items-center px-4 py-1 w-[48px] bg-[#2E2012] rounded-full font-sans font-semibold text-[9px] text-[#F59E0B] leading-[14px]">Warm</div>;
      case "cold":
        return <div className="flex justify-center items-center px-4 py-1 w-[48px] bg-[#0C2433] rounded-full font-sans font-semibold text-[9px] text-[#0EA5E9] leading-[14px]">Cold</div>;
      default:
        return <div className="flex justify-center items-center px-4 py-1 w-[48px] bg-[#1C2631] rounded-full font-sans font-semibold text-[9px] text-[#94A3B8] leading-[14px] capitalize">{category}</div>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "new":
        return <div className="flex justify-center items-center px-4 py-1 w-[60px] bg-[#0B2545] rounded-full font-sans font-medium text-[9px] text-[#38BDF8] leading-[14px] capitalize">New</div>;
      case "followup":
        return <div className="flex justify-center items-center px-2.5 py-1 w-[70px] bg-[#33240F] rounded-full font-sans font-medium text-[9px] text-[#F59E0B] leading-[14px] whitespace-nowrap capitalize">Follow-up</div>;
      case "converted":
        return <div className="flex justify-center items-center px-2.5 py-1 w-[70px] bg-[#0C2419] rounded-full font-sans font-medium text-[9px] text-[#10B981] leading-[14px] whitespace-nowrap capitalize">Converted</div>;
      case "notinterested":
        return <div className="flex justify-center items-center px-2.5 py-1 w-[80px] bg-[#321317] rounded-full font-sans font-medium text-[9px] text-[#EF4444] leading-[14px] whitespace-nowrap capitalize">Not Interested</div>;
      default:
        return <div className="flex justify-center items-center px-4 py-1 w-max bg-[#1C2631] rounded-full font-sans font-medium text-[9px] text-[#94A3B8] leading-[14px] capitalize">{status}</div>;
    }
  };

  return (
    <div className="flex flex-col w-full min-w-0 bg-[#10161C] border border-[#1C2631] rounded-[13px] shrink-0 overflow-hidden flex-1">
      <Table className="border-none bg-transparent rounded-none flex-1 flex flex-col mb-2">
        <TableHeader className="bg-transparent border-[#18212B]">
          <TableRow className="hover:bg-transparent border-b border-[#18212B]">
            <TableHeadCell className="text-[9px] text-[#627282] px-3.5 py-5 text-center">#</TableHeadCell>
            <TableHeadCell className="text-[9px] text-[#627282] px-3.5 py-5">NAME</TableHeadCell>
            <TableHeadCell className="text-[9px] text-[#627282] px-3.5 py-5">PHONE</TableHeadCell>
            <TableHeadCell className="text-[9px] text-[#627282] px-3.5 py-5">INTERESTED IN</TableHeadCell>
            <TableHeadCell className="text-[9px] text-[#627282] px-3.5 py-5">ADDED VIA</TableHeadCell>
            <TableHeadCell className="text-[9px] text-[#627282] px-3.5 py-5">SOURCE</TableHeadCell>
            <TableHeadCell className="text-[9px] text-[#627282] px-3.5 py-5 text-center">ENQUIRY CATEGORY</TableHeadCell>
            <TableHeadCell className="text-[9px] text-[#627282] px-3.5 py-5 text-center">FOLLOW-UP DATE</TableHeadCell>
            <TableHeadCell className="text-[9px] text-[#627282] px-3.5 py-5 text-center">STATUS</TableHeadCell>
            <TableHeadCell className="text-[9px] text-[#627282] px-3.5 py-5 text-center">ACTIONS</TableHeadCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={10} className="h-[300px] text-center text-[#556475]">Loading enquiries...</TableCell>
            </TableRow>
          ) : currentEnquiries.length === 0 ? (
            <TableRow>
              <TableCell colSpan={10} className="h-[300px] text-center text-[#556475]">No enquiries found.</TableCell>
            </TableRow>
          ) : (
            currentEnquiries.map((row, idx) => (
              <TableRow key={row.gymEnquiryId} className={`${idx !== 0 ? 'border-t border-[#18212B]' : ''} hover:bg-[rgba(255,255,255,0.02)]`}>
                <TableCell className="px-3.5 py-3.5 text-center">
                  <span className="font-sans text-[10.6px] text-[#556475]">{startIndex + idx + 1}</span>
                </TableCell>
                <TableCell className="px-3.5 py-3.5">
                  <span className="font-sans font-semibold text-[10.6px] text-white whitespace-nowrap">{row.fullName}</span>
                </TableCell>
                <TableCell className="px-3.5 py-3.5">
                  <span className="font-sans text-[10.6px] text-[#A8B7C7]">{row.mobile}</span>
                </TableCell>
                <TableCell className="px-3.5 py-3.5">
                  <span className="font-sans text-[10.6px] text-[#A8B7C7] whitespace-nowrap capitalize">{row.interestedIn}</span>
                </TableCell>
                <TableCell className="px-3.5 py-3.5">
                  {getAddedViaBadge(row.addedThrough === 'socialmedia' ? 'Social Media' : 'Owner Added')}
                </TableCell>
                <TableCell className="px-3.5 py-3.5">
                  {getSourceBadge(row.enquirySource?.charAt(0).toUpperCase() + row.enquirySource?.slice(1))}
                </TableCell>
                <TableCell className="px-3.5 py-3.5">
                  <div className="flex justify-center w-full">
                    {getCategoryBadge(row.enquiryCategory)}
                  </div>
                </TableCell>
                <TableCell className="px-3.5 py-3.5 text-center">
                  <span className="font-sans text-[10.6px] text-[#CCD5E0] whitespace-nowrap">
                    {row.followUpDate ? new Date(row.followUpDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}
                  </span>
                </TableCell>
                <TableCell className="px-3.5 py-3.5">
                  <div className="flex justify-center w-full">
                    {getStatusBadge(row.status)}
                  </div>
                </TableCell>
                <TableCell className="px-3.5 py-3.5">
                  <div className="flex justify-center items-center w-full gap-3">
                    <Eye 
                      size={18} 
                      className="text-[#556475] cursor-pointer hover:text-white transition-colors" 
                      onClick={() => {
                        setSelectedEnquiry(row);
                        setIsModalOpen(true);
                      }}
                    />
                    <Pen 
                      size={16} 
                      className="text-[#556475] cursor-pointer hover:text-white transition-colors" 
                      onClick={() => {
                        window.location.href = `/owner/enquiries/add?edit=true&id=${row.gymEnquiryId}`;
                      }}
                    />
                    <Trash 
                      size={18} 
                      className="text-[#556475] cursor-pointer hover:text-red-500 transition-colors" 
                      onClick={() => {
                        setEnquiryToDelete(row.gymEnquiryId);
                        setIsDeleteModalOpen(true);
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
          {currentEnquiries.length > 0 && (
            <TableRow className="border-none hover:bg-transparent pointer-events-none h-full" style={{ height: "100%" }}>
              <TableCell colSpan={10}></TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex flex-col px-6 py-4 w-full gap-4 border-t border-[#18212B]">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
        />
      </div>
      
      <ViewEnquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        enquiry={selectedEnquiry} 
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Enquiry"
        message="Are you sure you want to delete this enquiry? This action cannot be undone."
        confirmText={deleteEnquiryMutation.isPending ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        isDestructive={true}
      />
    </div>
  );
}
