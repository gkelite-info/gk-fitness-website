import { CalendarBlank, Clock, Pen, CaretDown, CaretUp, ClockCounterClockwise } from "@phosphor-icons/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AddFollowUpModal from "./AddFollowUpModal";
import ConvertEnquiryModal from "./ConvertEnquiryModal";

export default function EnquiryFollowUpHistory() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isAddFollowUpOpen, setIsAddFollowUpOpen] = useState(false);
  const [isConvertOpen, setIsConvertOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col w-full bg-[#0F141F] border border-[#1E2638] shadow-[0_27px_54px_-13px_rgba(0,0,0,0.25)] rounded-2xl overflow-hidden relative mt-2">
        
        <div 
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full px-5 sm:px-6 py-5 bg-gradient-to-r from-[#0F141F] via-[#131926]/40 to-[#0F141F] border-b border-[#1E2638]/80 cursor-pointer select-none hover:bg-white/[0.02] transition-colors gap-4 sm:gap-0"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3.5 w-full sm:w-auto">
            <div className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 bg-[#CCFF00]/10 border border-[#CCFF00]/20 rounded-xl shrink-0">
              <ClockCounterClockwise size={20} weight="bold" className="text-[#CCFF00]" />
            </div>
            <h1 className="font-sans font-bold text-base sm:text-[18px] text-white tracking-tight leading-snug">Follow-up History & Activity</h1>
          </div>
          
          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setIsAddFollowUpOpen(true)}
              className="flex items-center px-4 py-2 sm:py-1.5 gap-1.5 bg-[#131926] border border-[#1E2638] rounded-lg hover:bg-[#1E2638] transition-colors cursor-pointer w-full sm:w-auto justify-center"
            >
              <span className="text-[#CCFF00]">+</span>
              <span className="font-sans font-semibold text-sm text-slate-200">Add Follow-up</span>
            </button>
            <button 
            className="flex items-center justify-center w-10 h-10 sm:w-9 sm:h-9 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 cursor-pointer shrink-0"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <CaretUp size={18} className="text-[#94A3B8]" /> : <CaretDown size={18} className="text-[#94A3B8]" />}
          </button>
        </div>
      </div>

      <div 
        className={`grid transition-all duration-300 ease-in-out ${
          isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col p-4 sm:p-6 gap-6">
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center p-4 gap-4 bg-[#121929]/90 border border-sky-500/20 rounded-xl">
                <div className="flex items-center justify-center w-12 h-12 bg-sky-500/15 border border-sky-500/30 shadow-inner rounded-xl shrink-0">
                  <CalendarBlank size={24} className="text-sky-400" />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-semibold text-[11px] text-slate-400 tracking-wide uppercase">Next Follow-up Date</span>
                  <span className="font-sans font-bold text-base text-white">23 Sep 2026, 06:00 PM</span>
                </div>
              </div>
              <div className="flex-1 flex items-center p-4 gap-4 bg-[#191924]/90 border border-amber-500/20 rounded-xl">
                <div className="flex items-center justify-center w-12 h-12 bg-amber-500/15 border border-amber-500/30 shadow-inner rounded-xl shrink-0">
                  <Clock size={24} className="text-amber-400" />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-semibold text-[11px] text-slate-400 tracking-wide uppercase">Last Follow-up Date</span>
                  <span className="font-sans font-bold text-base text-white">20 Sep 2026, 04:15 PM</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col pt-2 gap-4">
              <h2 className="font-sans font-semibold text-xs text-slate-400 tracking-wide uppercase px-1">Activity Log & Interaction Notes</h2>
              
              <div className="relative flex flex-col pl-7 gap-7 ml-2">
                <div className="absolute left-0 top-3 bottom-5 w-0.5 bg-slate-800"></div>

                <div className="relative flex flex-col bg-[#131926]/80 border border-[#1E2638]/70 rounded-xl p-4 gap-2.5">
                  <div className="absolute -left-[37px] top-4 flex items-center justify-center w-5 h-5 bg-[#0F141F] rounded-full">
                    <div className="w-2.5 h-2.5 bg-amber-400 rounded-full shadow-[0_0_0_4px_rgba(251,191,36,0.2)]"></div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-white/5 gap-3 sm:gap-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                      <span className="font-sans font-semibold text-xs sm:text-sm text-amber-400 tracking-tight">20 Sep 2026, 04:15 PM</span>
                      <div className="flex items-center px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 rounded w-fit">
                        <span className="font-sans font-bold text-[10px] text-amber-400 uppercase tracking-wide">Pricing Shared</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 self-start sm:self-auto">
                      <span className="font-sans text-xs text-slate-500">By</span>
                      <span className="font-sans font-medium text-xs text-slate-300">Amit Gupta</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <h3 className="font-sans font-semibold text-sm text-white">Asked for membership pricing</h3>
                    <p className="font-sans text-sm text-slate-300">Shared membership plans. He will check and revert.</p>
                  </div>
                </div>

                <div className="relative flex flex-col bg-[#131926]/80 border border-[#1E2638]/70 rounded-xl p-4 gap-2.5">
                  <div className="absolute -left-[37px] top-4 flex items-center justify-center w-5 h-5 bg-[#0F141F] rounded-full">
                    <div className="w-2.5 h-2.5 bg-sky-400 rounded-full shadow-[0_0_0_4px_rgba(56,189,248,0.2)]"></div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-white/5 gap-3 sm:gap-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                      <span className="font-sans font-semibold text-xs sm:text-sm text-sky-400 tracking-tight">18 Sep 2026, 11:30 AM</span>
                      <div className="flex items-center px-2 py-0.5 bg-sky-500/10 border border-sky-500/20 rounded w-fit">
                        <span className="font-sans font-bold text-[10px] text-sky-400 uppercase tracking-wide">Call Scheduled</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 self-start sm:self-auto">
                      <span className="font-sans text-xs text-slate-500">By</span>
                      <span className="font-sans font-medium text-xs text-slate-300">Amit Gupta</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <h3 className="font-sans font-semibold text-sm text-white">Requested callback in evening</h3>
                    <p className="font-sans text-sm text-slate-300">Busy at the moment. Requested to call after 6 PM.</p>
                  </div>
                </div>

                <div className="relative flex flex-col bg-[#131926]/80 border border-[#1E2638]/70 rounded-xl p-4 gap-2.5">
                  <div className="absolute -left-[37px] top-4 flex items-center justify-center w-5 h-5 bg-[#0F141F] rounded-full">
                    <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full shadow-[0_0_0_4px_rgba(52,211,153,0.2)]"></div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-white/5 gap-3 sm:gap-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                      <span className="font-sans font-semibold text-xs sm:text-sm text-emerald-400 tracking-tight">15 Sep 2026, 02:20 PM</span>
                      <div className="flex items-center px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded w-fit">
                        <span className="font-sans font-bold text-[10px] text-emerald-400 uppercase tracking-wide">Gym Visit</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 self-start sm:self-auto">
                      <span className="font-sans text-xs text-slate-500">By</span>
                      <span className="font-sans font-medium text-xs text-slate-300">Amit Gupta</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1">
                    <h3 className="font-sans font-semibold text-sm text-white">Interested in PT + Gold plan</h3>
                    <p className="font-sans text-sm text-slate-300">Visited the gym. Showed around the facilities. Seemed very interested.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-[#0C1018] border-t border-[#1E2638]/90 gap-4 sm:gap-0 sticky bottom-0 z-10">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={() => router.push('/owner/enquiries/add?edit=true')}
            className="flex items-center justify-center px-4 py-2.5 gap-2 bg-slate-800/80 border border-slate-700/70 shadow-sm rounded-xl flex-1 sm:flex-none hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <Pen size={16} className="text-slate-400" />
            <span className="font-sans font-medium text-[15px] text-slate-200">Edit Enquiry</span>
          </button>
        </div>
        <button 
          onClick={() => setIsConvertOpen(true)}
          className="flex items-center justify-center px-6 py-2.5 gap-2 bg-[#CCFF00] rounded-xl shadow-[0_0_21px_-3px_rgba(204,255,0,0.35)] hover:brightness-110 transition-all w-full sm:w-auto cursor-pointer"
        >
          <span className="font-sans font-bold text-[15px] text-black tracking-tight">Convert to Member</span>
        </button>
      </div>
    </div>
    
    {isAddFollowUpOpen && (
      <AddFollowUpModal onClose={() => setIsAddFollowUpOpen(false)} />
    )}

    {isConvertOpen && (
      <ConvertEnquiryModal onClose={() => setIsConvertOpen(false)} />
    )}
    </>
  );
}
