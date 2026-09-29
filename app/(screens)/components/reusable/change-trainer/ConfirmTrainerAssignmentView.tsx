"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CaretLeft, ArrowRight, ArrowDown, ChatCircleText, Phone, EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";
import toast from "react-hot-toast";
import ConfirmationModal from "../ConfirmationModal";
import Avatar from "../Avatar";


export default function ConfirmTrainerAssignmentView({ customerId, trainerId }: { customerId: string, trainerId: string }) {
  const router = useRouter();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  
  const handleConfirm = () => {
    setIsConfirming(true);
    setTimeout(() => {
      setIsConfirming(false);
      setShowConfirmModal(false);
      
      toast.custom(
        (t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-[#1A2215] border border-[#CCFF00] shadow-[0_10px_25px_rgba(204,255,0,0.15)] rounded-[12px] p-4 flex items-center gap-3 pointer-events-auto`}
          >
            <div className="w-8 h-8 rounded-full bg-[#CCFF00]/20 flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="#CCFF00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold text-[14px] text-white">Trainer Reassigned</span>
              <span className="font-sans font-normal text-[12px] text-[#9CA3AF]">Amit Sharma is now the active trainer.</span>
            </div>
          </div>
        ),
        { 
          id: 'trainer-reassigned-toast',
          position: 'top-right',
          duration: 4000 
        }
      );

      router.push(`/owner/users/${customerId}/assigned-trainer`);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-start w-full gap-[24px]">
        

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-[16px] shrink-0">
          <div className="flex flex-row items-center gap-[16px] w-full sm:w-auto">
            <button
              onClick={() => router.back()}
              className="flex justify-center items-center w-[44px] h-[44px] bg-[#141822] border border-[#272E3D] rounded-[12px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#1A1F2B] transition-colors cursor-pointer shrink-0"
            >
              <CaretLeft size={20} className="text-[#E2E8F0]" weight="bold" />
            </button>
            <div className="flex flex-col items-start gap-[2px]">
              <h1 className="font-sans font-bold text-[20px] sm:text-[24px] leading-[26px] sm:leading-[32px] tracking-[-0.5px] text-white">
                Confirm Trainer Assignment
              </h1>
              <span className="font-sans font-normal text-[12px] sm:text-[14px] leading-[16px] sm:leading-[20px] text-[#94A3B8]">
                Customer: <span className="text-[#CCFF00]">Riya Sharma ({customerId})</span>
              </span>
            </div>
          </div>
          
          <div className="flex flex-row items-center px-[12px] py-[4px] gap-[6px] bg-[#161B10] border border-[#2B3D14] rounded-full shrink-0">
            <div className="w-[6px] h-[6px] bg-[#CCFF00] rounded-full" />
            <span className="font-sans font-medium text-[12px] leading-[18px] text-[#CCFF00]">
              Trainer Reassignment Flow
            </span>
          </div>
        </div>


        <div className="flex flex-col items-start p-[20px] sm:p-[24px] w-full bg-[#13161F] border border-[#232835] rounded-[16px] gap-[24px]">
          <span className="font-sans font-normal text-[14px] leading-[20px] text-[#94A3B8]">
            You are about to change the trainer for this customer
          </span>

          <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-[16px]">

            <div className="flex flex-col sm:flex-row items-center p-[16px] w-full lg:flex-1 bg-[#151922] border border-[#262C3B] rounded-[12px] gap-[12px]">
              <div className="w-[80px] h-[80px] rounded-[12px] overflow-hidden shrink-0 border border-[#272E3F]">
                <Avatar src={undefined} alt="Rahul Verma" className="w-full h-full" />
              </div>
              <div className="flex flex-col items-start gap-[4px] w-full text-center sm:text-left">
                <div className="flex items-center px-[8px] py-[2px] bg-[#1E2533] rounded-[6px] mx-auto sm:mx-0">
                  <span className="font-sans font-bold text-[10px] uppercase text-[#94A3B8] tracking-[0.5px]">Current Trainer</span>
                </div>
                <h3 className="font-sans font-bold text-[16px] sm:text-[18px] text-white mx-auto sm:mx-0">Rahul Verma</h3>
                <div className="flex items-center px-[10px] py-[2px] bg-[#1A2312] border border-[#344B1C] rounded-[6px] mx-auto sm:mx-0">
                  <span className="font-sans font-semibold text-[11px] text-[#CCFF00]">Strength & Conditioning</span>
                </div>
                <div className="flex flex-row items-center gap-[6px] mt-1 mx-auto sm:mx-0">
                  <span className="font-sans font-normal text-[12px] text-[#94A3B8]">Assigned Since</span>
                  <span className="font-sans font-bold text-[12px] text-white">03 Jul 2026</span>
                </div>
              </div>
            </div>


            <div className="flex justify-center items-center w-[40px] h-[40px] bg-[#1A1F2B] rounded-full shrink-0">
              <ArrowRight size={20} className="text-[#CCFF00] hidden lg:block" weight="bold" />
              <ArrowDown size={20} className="text-[#CCFF00] block lg:hidden" weight="bold" />
            </div>


            <div className="flex flex-col sm:flex-row items-center p-[16px] w-full lg:flex-1 bg-[#1A2215]/20 border border-[#CCFF00]/30 shadow-[0_0_20px_rgba(204,255,0,0.05)] rounded-[12px] gap-[12px]">
              <div className="w-[80px] h-[80px] rounded-[12px] overflow-hidden shrink-0 border border-[#272E3F]">
                <Avatar src={undefined} alt="Amit Sharma" className="w-full h-full" />
              </div>
              <div className="flex flex-col items-start gap-[4px] w-full text-center sm:text-left">
                <div className="flex items-center px-[8px] py-[2px] bg-[#344B1C] rounded-[6px] mx-auto sm:mx-0">
                  <span className="font-sans font-bold text-[10px] uppercase text-[#CCFF00] tracking-[0.5px]">New Trainer</span>
                </div>
                <h3 className="font-sans font-bold text-[16px] sm:text-[18px] text-white mx-auto sm:mx-0">Amit Sharma</h3>
                <div className="flex items-center px-[10px] py-[2px] bg-[#1A2312] border border-[#344B1C] rounded-[6px] mx-auto sm:mx-0">
                  <span className="font-sans font-semibold text-[11px] text-[#CCFF00]">Weight Loss</span>
                </div>
                <div className="flex flex-col items-start gap-[2px] mt-[2px] mx-auto sm:mx-0 w-full max-w-[200px]">
                  <div className="flex flex-row items-center gap-[6px] min-w-0">
                    <Phone size={14} className="text-[#64748B] shrink-0" weight="fill" />
                    <span className="font-sans font-normal text-[11px] leading-[16px] text-[#94A3B8] truncate">
                      +91 98765 43211
                    </span>
                  </div>
                  <div className="flex flex-row items-center gap-[6px] min-w-0">
                    <EnvelopeSimple size={14} className="text-[#64748B] shrink-0" weight="fill" />
                    <span className="font-sans font-normal text-[11px] leading-[16px] text-[#94A3B8] truncate">
                      amit.sharma@fitzone.com
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="flex flex-col items-start p-[24px] sm:p-[32px] w-full bg-[#13161F] border border-[#232835] rounded-[16px] gap-[24px]">
          <div className="flex flex-row items-center gap-[8px]">
            <ChatCircleText size={20} className="text-[#E2E8F0]" weight="fill" />
            <h2 className="font-sans font-bold text-[18px] text-white">Reason for Change (Optional)</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 items-stretch w-full gap-[24px]">
            <div className="flex flex-col w-full h-full">
              <div className="flex flex-col w-full bg-[#1A1F2B] border border-[#2C3344] rounded-[12px] overflow-hidden h-full">
                {['Member Request', 'Trainer Availability', 'Schedule Conflict', 'Performance', 'Other'].map((reason, idx) => (
                  <label key={reason} className={`flex flex-row justify-between items-center px-[16px] py-[14px] cursor-pointer hover:bg-[#202533] ${idx !== 0 ? 'border-t border-[#2C3344]' : ''}`}>
                    <span className="font-sans font-normal text-[14px] text-[#CBD5E1]">{reason}</span>
                    <input type="radio" name="reason" className="w-[16px] h-[16px] accent-[#CCFF00] cursor-pointer" />
                  </label>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col w-full h-full">
              <textarea 
                placeholder="Add additional notes (Optional)" 
                className="flex-1 w-full bg-[#1A1F2B] border border-[#2C3344] rounded-[12px] p-[16px] text-[#CBD5E1] text-[14px] outline-none resize-none placeholder-[#64748B] min-h-[140px]"
              ></textarea>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end items-center w-full gap-[16px] pt-[24px] border-t border-[#232835] mt-[8px]">
            <button 
              onClick={() => router.back()}
              className="flex justify-center items-center px-[24px] py-[12px] bg-transparent border border-[#2C3344] rounded-[12px] w-full sm:w-auto hover:bg-[#1A1F2B] transition-colors cursor-pointer"
            >
              <span className="font-sans font-semibold text-[14px] text-white">Cancel</span>
            </button>
            <button 
              onClick={() => setShowConfirmModal(true)}
              className="flex justify-center items-center px-[24px] py-[12px] bg-[#CCFF00] rounded-[12px] w-full sm:w-auto hover:bg-[#b3e600] transition-colors cursor-pointer"
            >
              <span className="font-sans font-bold text-[14px] text-black">Confirm →</span>
            </button>
          </div>
        </div>
      
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirm}
        title="Confirm Reassignment"
        message="Are you sure you want to assign Amit Sharma as the new trainer? The current trainer will be notified."
        confirmText="Yes, Assign Trainer"
        cancelText="Cancel"
        isConfirming={isConfirming}
        confirmingText="Assigning..."
      />
    </div>
  );
}
