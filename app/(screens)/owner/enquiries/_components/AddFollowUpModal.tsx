import { X, FloppyDisk, Clock } from "@phosphor-icons/react";
import AddFollowUpLeftColumn from "./AddFollowUpLeftColumn";
import AddFollowUpRightColumn from "./AddFollowUpRightColumn";
import Avatar from "@/app/(screens)/components/reusable/Avatar";

interface AddFollowUpModalProps {
  onClose: () => void;
}

export default function AddFollowUpModal({ onClose }: AddFollowUpModalProps) {
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
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-6 lg:p-8">
        
        <div className="relative w-full max-w-[938px] bg-[#10161F] border border-[#212D3B] shadow-2xl rounded-2xl flex flex-col max-h-[90vh]">
          
          <div className="flex flex-row items-start justify-between px-6 py-5 pb-4 border-b border-[#212D3B]/60 shrink-0 rounded-t-2xl">
            <div className="flex flex-col gap-1">
              <h2 className="font-sans font-bold text-xl leading-7 text-white tracking-tight">Follow-up / Update Status</h2>
              <p className="font-sans text-xs text-[#94A3B8]">Record the latest interaction and schedule the next step for this enquiry.</p>
            </div>
            
            <button 
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 bg-slate-800/60 border border-slate-700/60 rounded-full hover:border-[#94A3B8]/30 transition-colors cursor-pointer shrink-0"
            >
              <X size={16} className="text-[#94A3B8]" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 custom-scrollbar">
            
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 sm:p-3.5 bg-[#151D28] border border-[#212D3B] rounded-xl gap-4 sm:gap-6 min-w-0">
              
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <div className="flex items-center justify-center rounded-full p-0.5 bg-[#102A28] shadow-[inset_0px_2px_4px_2px_rgba(0,0,0,0.05)] border-2 border-emerald-500/80 shrink-0">
                  <Avatar className="w-12 h-12 sm:w-10 sm:h-10" gender="male" />
                </div>
                
                <div className="flex flex-col sm:flex-row items-center sm:justify-between w-full sm:w-auto gap-2 sm:gap-6">
                  <div className="flex flex-col items-center sm:items-start text-center sm:text-left min-w-0">
                    <span className="font-sans font-semibold text-[10px] text-[#94A3B8] tracking-wider uppercase">Customer</span>
                    <span className="font-sans font-bold text-sm text-white tracking-wide truncate max-w-full">Rahul Sharma</span>
                  </div>
                  <div className="h-9 border-l border-[#212D3B] hidden sm:block"></div>
                  <div className="flex flex-col items-center sm:items-start text-center sm:text-left min-w-0">
                    <span className="font-sans font-semibold text-[10px] text-[#94A3B8] tracking-wider uppercase">Phone</span>
                    <span className="font-sans font-semibold text-sm text-[#CBD5E1] truncate max-w-full">9876543210</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-row items-center justify-between sm:justify-end gap-3 sm:gap-2.5 w-full sm:w-auto">
                <div className="flex flex-col gap-0.5 items-start">
                  <span className="font-sans font-medium text-[10px] text-[#94A3B8] tracking-wider uppercase whitespace-nowrap">Current Status</span>
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 px-3 py-1 bg-amber-950/40 border border-amber-600/60 rounded-md w-full sm:w-auto">
                    <Clock size={14} className="text-amber-400 shrink-0" />
                    <span className="font-sans font-semibold text-xs text-amber-300 whitespace-nowrap">Follow-up</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-0.5 items-start sm:items-end">
                  <span className="font-sans font-medium text-[10px] text-[#94A3B8] tracking-wider uppercase whitespace-nowrap">Current Category</span>
                  <div className="flex items-center justify-center sm:justify-start gap-1.5 px-3 py-1 bg-amber-950/40 border border-amber-600/60 rounded-md w-full sm:w-auto">
                    <div className="w-3.5 h-3.5 bg-amber-400 rounded-sm shrink-0" style={{ maskImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 256 256\' fill=\'currentColor\'%3E%3Cpath d=\'M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z\'/%3E%3C/svg%3E")', WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 256 256\' fill=\'currentColor\'%3E%3Cpath d=\'M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z\'/%3E%3C/svg%3E")' }}></div>
                    <span className="font-sans font-semibold text-xs text-amber-300 whitespace-nowrap">Warm</span>
                  </div>
                </div>
              </div>
              
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 min-w-0">
              
              <div className="lg:col-span-7 flex flex-col min-w-0">
                <AddFollowUpLeftColumn />
              </div>

              <div className="lg:col-span-5 flex flex-col min-w-0">
                <AddFollowUpRightColumn />
              </div>

            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-center justify-end px-6 py-4 border-t border-[#212D3B] gap-3 shrink-0 rounded-b-2xl bg-[#10161F]">
            <button 
              onClick={onClose}
              className="flex items-center justify-center px-5 py-3 sm:py-2.5 bg-transparent border border-[#212D3B] rounded-lg hover:bg-[#1E2632] transition-colors cursor-pointer w-full sm:w-auto"
            >
              <span className="font-sans font-semibold text-xs text-[#E2E8F0] whitespace-nowrap">Cancel</span>
            </button>
            <button 
              onClick={onClose}
              className="flex items-center justify-center px-5 py-3 sm:py-2.5 gap-2 bg-[#CCFF00] rounded-lg shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-4px_rgba(0,0,0,0.1)] hover:bg-[#D9F927] transition-colors cursor-pointer w-full sm:w-auto"
            >
              <FloppyDisk size={16} weight="fill" className="text-black shrink-0" />
              <span className="font-sans font-bold text-xs text-black whitespace-nowrap">Save Follow-up</span>
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
