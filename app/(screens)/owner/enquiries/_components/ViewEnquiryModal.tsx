"use client";

import {
  X,
  Phone,
  EnvelopeSimple,
  CalendarDots,
} from "@phosphor-icons/react";
import Avatar from "@/app/(screens)/components/reusable/Avatar";
import { useEffect } from "react";
import { getCategoryBadge, getStatusBadge, getAddedViaBadge, getSourceBadge } from "./EnquiryBadges";
import EnquiryCustomerInfo from "./EnquiryCustomerInfo";
import EnquiryInterestRequirement from "./EnquiryInterestRequirement";
import EnquiryStatusSource from "./EnquiryStatusSource";
import EnquiryFollowUpHistory from "./EnquiryFollowUpHistory";
import ConfirmationModal from "@/app/(screens)/components/reusable/ConfirmationModal";
import { useState } from "react";
import { useUpdateGymEnquiryStatus } from "@/lib/hooks/gymEnquiries/useGymEnquiries";
import { useSaveGymEnquiryFollowup } from "@/lib/hooks/gymEnquiries/useGymEnquiryFollowups";
import { useUser } from "@/app/context/UserContext";
import toast from "react-hot-toast";

interface ViewEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  enquiry?: any;
}

export default function ViewEnquiryModal({ isOpen, onClose, enquiry }: ViewEnquiryModalProps) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const updateStatusMutation = useUpdateGymEnquiryStatus();
  const saveFollowupMutation = useSaveGymEnquiryFollowup();
  const { user } = useUser();

  const handleConvertConfirm = async () => {
    if (!enquiry) return;
    try {
      await updateStatusMutation.mutateAsync({
        gymEnquiryId: enquiry.gymEnquiryId,
        status: "converted",
        category: enquiry.enquiryCategory
      });
      await saveFollowupMutation.mutateAsync({
        gymEnquiryId: enquiry.gymEnquiryId,
        gymId: enquiry.gymId,
        actionType: "converted",
        followUpnotes: "Converted from Enquiries View",
        createdBy: user?.id || null,
      });
      toast.success("Member converted successfully");
      setIsConfirmOpen(false);
      onClose();
    } catch (error) {
      toast.error("Failed to convert member");
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        .custom-scrollbar {
          scrollbar-width: thin !important;
          scrollbar-color: #CCFF00 transparent !important;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px !important;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 38, 56, 0.3) !important;
          border-radius: 8px !important;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #CCFF00 !important;
          border-radius: 8px !important;
          box-shadow: 0 0 10px rgba(204, 255, 0, 0.5) !important;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #D9F927 !important;
          box-shadow: 0 0 15px rgba(217, 249, 39, 0.8) !important;
        }
      `}</style>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 lg:p-8">
        <div className="relative w-full max-w-[973px] bg-[#0F141F] border border-[#1E2638] shadow-2xl rounded-2xl flex flex-col max-h-[90vh]">
          <div className="flex flex-row items-center justify-between px-6 py-[22px] bg-gradient-to-r from-[#0F141F] via-[#131926]/40 to-[#0F141F] border-b border-[#1E2638]/80 shrink-0 rounded-t-2xl">
            <div className="flex flex-row items-center gap-4">
              <div className="flex items-center justify-center w-11 h-11 bg-[#CCFF00]/10 border border-[#CCFF00]/20 rounded-xl">
                <div className="w-2.5 h-[22px] bg-[#CCFF00] rounded-full"></div>
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="font-sans font-bold text-xl leading-7 text-white tracking-tight">Enquiry Details</h2>
                <p className="font-sans text-xs text-[#94A3B8] hidden sm:block">View and manage complete enquiry records, preferences, and interaction timeline.</p>
              </div>
            </div>

              <div className="flex items-center gap-3">
                {enquiry?.status?.toLowerCase() !== "converted" && (
                  <button
                    onClick={() => setIsConfirmOpen(true)}
                    className="flex items-center justify-center px-4 py-2 bg-[#CCFF00] rounded-lg shadow-[0_4px_10px_-2px_rgba(204,255,0,0.3)] hover:bg-[#D9F927] transition-colors cursor-pointer"
                  >
                    <span className="font-sans font-bold text-xs text-black whitespace-nowrap">Convert Member</span>
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="flex items-center justify-center w-[35px] h-[35px] rounded-lg border border-transparent hover:border-[#94A3B8]/30 transition-colors cursor-pointer"
                >
                  <X size={18} className="text-[#94A3B8]" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar">
              <div className="flex flex-col xl:flex-row items-center xl:items-center justify-between p-5 bg-[#141B24] border border-[#202938] rounded-2xl gap-6 min-w-0 w-full">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 min-w-0 w-full xl:w-auto">
                  <div className="relative shrink-0 flex items-center justify-center rounded-full p-0.5 bg-[#101720] shadow-[0_0_15px_-3px_rgba(204,255,0,0.4)] border-2 border-[#CCFF00]">
                    <Avatar className="w-16 h-16 sm:w-14 sm:h-14" gender={enquiry?.gender || 'male'} />
                  </div>

                  <div className="flex flex-col items-center sm:items-start gap-2 min-w-0 w-full">
                    <div className="flex flex-col text-center sm:text-left w-full">
                      <h2 className="font-sans font-bold text-lg leading-6 text-white tracking-wide truncate capitalize">{enquiry?.fullName || 'N/A'}</h2>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-2">
                        <div className="flex items-center gap-1.5 shrink-0">
                          <Phone size={14} className="text-[#9CA3AF]" />
                          <span className="font-sans font-medium text-xs text-[#D1D5DB]">{enquiry?.mobile || 'N/A'}</span>
                        </div>
                        <span className="hidden sm:block text-[#4B5563] shrink-0">•</span>
                        <div className="flex items-center gap-1.5 shrink-0 min-w-0">
                          <EnvelopeSimple size={14} className="text-[#9CA3AF]" />
                          <span className="font-sans text-xs text-[#D1D5DB] truncate">{enquiry?.email || 'N/A'}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-center sm:justify-start gap-1.5 shrink-0">
                        <CalendarDots size={14} className="text-[#9CA3AF]" />
                        <span className="font-sans text-xs text-[#9CA3AF] whitespace-nowrap">Enquired on:</span>
                        <span className="font-sans font-semibold text-xs text-[#D1D5DB] whitespace-nowrap">
                          {enquiry?.createdAt ? new Date(enquiry.createdAt).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }) : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-y-4 shrink-0 overflow-x-auto pb-1 sm:pb-0 w-full xl:w-auto items-center xl:items-end">
                  <div className="flex flex-wrap justify-center xl:justify-end gap-4 sm:gap-x-6 w-full">
                    <div className="flex flex-col gap-1.5 min-w-[100px] sm:min-w-[110px]">
                      <span className="font-sans font-semibold text-[10px] text-[#9CA3AF] tracking-wide uppercase whitespace-nowrap text-center sm:text-left">Enquiry Category</span>
                      {getCategoryBadge(enquiry?.enquiryCategory)}
                    </div>
                    <div className="flex flex-col gap-1.5 min-w-[100px] sm:min-w-[110px]">
                      <span className="font-sans font-semibold text-[10px] text-[#9CA3AF] tracking-wide uppercase whitespace-nowrap text-center sm:text-left">Current Status</span>
                      {getStatusBadge(enquiry?.status)}
                    </div>
                    <div className="flex flex-col gap-1.5 min-w-[100px] sm:min-w-[110px]">
                      <span className="font-sans font-semibold text-[10px] text-[#9CA3AF] tracking-wide uppercase whitespace-nowrap text-center sm:text-left">Added Via</span>
                      {getAddedViaBadge(enquiry?.addedThrough)}
                    </div>
                    <div className="flex flex-col gap-1.5 min-w-[100px] sm:min-w-[110px]">
                      <span className="font-sans font-semibold text-[10px] text-[#9CA3AF] tracking-wide uppercase whitespace-nowrap text-center sm:text-left">Source</span>
                      {getSourceBadge(enquiry?.enquirySource)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-w-0">
                <div className="lg:col-span-7 flex flex-col gap-6 min-w-0">
                  <EnquiryCustomerInfo enquiry={enquiry} />
                  <EnquiryInterestRequirement enquiry={enquiry} />
                </div>
                <div className="lg:col-span-5 flex flex-col gap-6 min-w-0">
                  <EnquiryStatusSource enquiry={enquiry} />

                  <div className="flex flex-col gap-3 p-0 bg-gradient-to-br from-[#141B24] to-[#10151C] border border-[#202938] rounded-2xl">
                    <div className="flex items-center justify-between px-3.5 pt-2">
                      <span className="font-sans font-semibold text-xs text-[#9CA3AF] tracking-wide uppercase">Scheduled Actions</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 mx-2 mb-2 bg-[#0E131A] border border-[#1E2734] rounded-xl">
                      <span className="font-sans text-xs text-[#9CA3AF]">Next Scheduled Call</span>
                      <span className="font-sans font-semibold text-xs text-[#CCFF00]">
                        {enquiry?.followUpDate ? new Date(enquiry.followUpDate).toLocaleString('en-US', { dateStyle: 'medium' }) : 'Not set'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <EnquiryFollowUpHistory enquiry={enquiry} onConvertSuccess={onClose} />

            </div>
          </div>
        </div>

        <ConfirmationModal
          isOpen={isConfirmOpen}
          onClose={() => setIsConfirmOpen(false)}
          onConfirm={handleConvertConfirm}
          title="Convert Member"
          message="Are you sure you want to mark this enquiry as converted?"
          confirmText={updateStatusMutation.isPending || saveFollowupMutation.isPending ? "Converting..." : "Convert"}
          cancelText="Cancel"
          isDestructive={false}
        />
      </>
    );
  }
