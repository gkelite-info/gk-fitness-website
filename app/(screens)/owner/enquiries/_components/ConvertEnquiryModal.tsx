import Avatar from "@/app/(screens)/components/reusable/Avatar";
import { X, UserPlus, Phone, InstagramLogo, ShareNetwork, User, Barbell, CheckCircle } from "@phosphor-icons/react";
import { useEffect } from "react";

interface ConvertEnquiryModalProps {
  onClose: () => void;
}

export default function ConvertEnquiryModal({ onClose }: ConvertEnquiryModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px !important;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent !important;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #212D3B !important;
          border-radius: 20px !important;
          border: 2px solid transparent !important;
          background-clip: padding-box !important;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #CCFF00 !important;
        }
      `}</style>
      <div 
        className="flex flex-col bg-[#10141A] border border-[#232B35] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] w-full max-w-[530px] max-h-[90vh] sm:max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between px-6 py-5 pb-4 border-b border-[#232B35]/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-7 h-7 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 shrink-0">
              <UserPlus size={16} weight="bold" className="text-[#38EF7D]" />
            </div>
            <h2 className="font-sans font-semibold text-[22px] leading-7 text-white tracking-tight">Convert Enquiry to Member</h2>
          </div>
          <button 
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-[#94A3B8]/30 hover:bg-white/5 transition-colors cursor-pointer shrink-0"
          >
            <X size={18} className="text-[#94A3B8]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 custom-scrollbar">
          <div className="flex flex-col p-4 bg-[#161C24] border border-[#232B35] rounded-xl gap-4">
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#0E171B] border-2 border-[#10B981] shadow-[0_0_10px_rgba(212,255,0,0.25)] shrink-0 p-0.5">
                <Avatar className="w-12 h-12" gender="male" />
              </div>
              
              <div className="flex flex-col items-center sm:items-start gap-1.5 w-full min-w-0">
                <h3 className="font-sans font-semibold text-base text-white text-center sm:text-left truncate max-w-full">Rahul Sharma</h3>
                
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                  <div className="flex items-center gap-1.5">
                    <Phone size={14} className="text-[#94A3B8]" />
                    <span className="font-sans text-xs text-[#CBD5E1]">9876543210</span>
                  </div>
                  
                  <div className="flex items-center gap-1 px-2.5 py-0.5 bg-fuchsia-900/30 border border-fuchsia-600/30 rounded-full">
                    <InstagramLogo size={12} className="text-[#E1306C]" />
                    <span className="font-sans font-medium text-[11px] text-[#E1306C]">Instagram</span>
                  </div>
                  
                  <div className="flex items-center gap-1 px-2.5 py-0.5 bg-emerald-900/30 border border-emerald-500/30 rounded-full">
                    <ShareNetwork size={12} className="text-[#34D399]" />
                    <span className="font-sans font-medium text-[11px] text-[#34D399]">Social Media</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full border-t border-[#232B35]/70 pt-3">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-xs text-[#94A3B8] whitespace-nowrap">Current Category</span>
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-[#3D2A14] border border-[#B4530B]/50 rounded-full">
                    <User size={12} weight="fill" className="text-[#F59E0B]" />
                    <span className="font-sans font-medium text-[11px] text-[#F59E0B]">Warm</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-sans text-xs text-[#94A3B8] whitespace-nowrap">Interested In</span>
                  <span className="font-sans font-medium text-xs text-white whitespace-nowrap">Gym Membership</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center p-3.5 bg-[#161C24] border border-[#232B35] rounded-xl gap-3.5">
            <div className="flex items-center justify-center w-10 h-10 bg-[#202934] rounded-lg shrink-0">
              <Barbell size={20} weight="fill" className="text-[#10B981]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-sans font-medium text-xs text-[#94A3B8]">Selected Plan</span>
              <span className="font-sans font-semibold text-base text-white truncate">Gold Membership</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="font-sans font-semibold text-sm text-white tracking-wide">What will happen next?</h4>
            <ul className="flex flex-col gap-2.5">
              <li className="flex items-start gap-2.5">
                <CheckCircle size={16} weight="fill" className="text-[#10B981] shrink-0 mt-0.5" />
                <span className="font-sans text-[13px] sm:text-sm text-[#CBD5E1]">Create a new member profile</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle size={16} weight="fill" className="text-[#10B981] shrink-0 mt-0.5" />
                <span className="font-sans text-[13px] sm:text-sm text-[#CBD5E1]">Mark this enquiry as converted</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle size={16} weight="fill" className="text-[#10B981] shrink-0 mt-0.5" />
                <span className="font-sans text-[13px] sm:text-sm text-[#CBD5E1]">Preserve enquiry history and notes</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle size={16} weight="fill" className="text-[#10B981] shrink-0 mt-0.5" />
                <span className="font-sans text-[13px] sm:text-sm text-[#CBD5E1]">Enquiry will be moved to converted archive</span>
              </li>
            </ul>
          </div>
        </div>
          
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between px-6 py-4 border-t border-[#232B35] gap-3 shrink-0 bg-[#10141A]">
          <button 
            onClick={onClose}
            className="flex items-center justify-center py-2.5 sm:py-2.5 px-4 bg-[#161C24] border border-[#2B3542] rounded-xl hover:bg-[#1E2530] transition-colors w-full sm:w-auto min-w-[150px]"
          >
            <span className="font-sans font-medium text-sm text-[#CBD5E1] whitespace-nowrap">Cancel</span>
          </button>
          <button 
            onClick={onClose}
            className="flex items-center justify-center py-2.5 sm:py-2.5 px-5 bg-[#D4FF00] shadow-[0_10px_15px_-3px_rgba(212,255,0,0.15),0_4px_6px_-4px_rgba(212,255,0,0.15)] rounded-xl hover:brightness-105 transition-all w-full sm:flex-1"
          >
            <span className="font-sans font-bold text-sm text-black whitespace-nowrap">Confirm Conversion</span>
          </button>
        </div>
      </div>
    </div>
  );
}
