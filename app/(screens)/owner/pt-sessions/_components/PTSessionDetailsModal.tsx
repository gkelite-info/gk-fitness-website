import { useEffect, useState } from "react";
import { X, CaretLeft, Check, User, Clock, Barbell, Target, CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import Avatar from "../../../components/reusable/Avatar";
import { SessionData } from "./PTSessionsTable";

interface PTSessionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  session: SessionData | null;
}

export default function PTSessionDetailsModal({ isOpen, onClose, session }: PTSessionDetailsModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isVisible || !session) return null;

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Completed":
        return {
          bg: "bg-[#1A2C12]",
          border: "border-[#2B4B19]",
          text: "text-[#88E000]",
          icon: <Check size={14} weight="bold" className="text-[#88E000]" />,
          attendanceText: "Present",
          attendanceBg: "bg-[#162711]",
          attendanceBorder: "border-[#2D4B1A]",
          attendanceIconColor: "text-[#88E000]"
        };
      case "Upcoming":
        return {
          bg: "bg-[#271D0E]",
          border: "border-[#4D3615]",
          text: "text-[#F59E0B]",
          icon: <Clock size={14} weight="bold" className="text-[#F59E0B]" />,
          attendanceText: "Not Recorded",
          attendanceBg: "bg-[#1C1A17]",
          attendanceBorder: "border-[#2A2722]",
          attendanceIconColor: "text-[#71717A]"
        };
      case "Cancelled":
        return {
          bg: "bg-[#291316]",
          border: "border-[#522125]",
          text: "text-[#EF4444]",
          icon: <X size={14} weight="bold" className="text-[#EF4444]" />,
          attendanceText: "Absent",
          attendanceBg: "bg-[#271515]",
          attendanceBorder: "border-[#4A2424]",
          attendanceIconColor: "text-[#EF4444]"
        };
      default:
        return {
          bg: "bg-[#1A1C23]",
          border: "border-[#2A2E39]",
          text: "text-[#A0AEC0]",
          icon: null,
          attendanceText: "Unknown",
          attendanceBg: "bg-[#1A1C23]",
          attendanceBorder: "border-[#2A2E39]",
          attendanceIconColor: "text-[#A0AEC0]"
        };
    }
  };

  const statusConfig = getStatusConfig(session.status);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div 
        className={`relative flex flex-col w-full max-w-[530px] max-h-[85vh] bg-[#0F1115] border border-[#222730] rounded-3xl shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.8)] transition-transform duration-300 overflow-hidden ${isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row justify-between items-center w-full p-6 pb-4 border-b border-[#1F232B] shrink-0">
          <div className="flex flex-row items-center gap-3.5">
            <button 
              onClick={onClose}
              className="flex justify-center items-center w-9 h-9 bg-[#181B21] border border-[#272D38] rounded-full text-[#D4D4D8] hover:text-white hover:bg-[#20242C] transition-colors cursor-pointer shrink-0"
            >
              <CaretLeft size={16} weight="bold" />
            </button>
            <div className="flex flex-col">
              <h3 className="font-sans font-bold text-base leading-6 tracking-[-0.4px] text-white">
                PT Session Details
              </h3>
              <span className="font-sans font-normal text-xs leading-4 text-[#A1A1AA] hidden sm:block">
                View personal training session information.
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="flex justify-center items-center w-9 h-9 bg-[#181B21] border border-[#272D38] rounded-full text-[#A1A1AA] hover:text-white hover:bg-[#20242C] transition-colors cursor-pointer shrink-0"
          >
            <X size={16} weight="bold" />
          </button>
        </div>

        <div className="flex flex-col flex-1 overflow-y-auto p-6 pt-4 gap-5 scrollbar-themed">
          <div className="flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4 w-full bg-[#14161C] border border-[#1F232B] rounded-2xl shrink-0">
            <div className="relative flex justify-center items-center w-16 h-16 bg-[#27272A] border-2 border-[#2B313D] rounded-full shrink-0">
              <Avatar src={session.avatarUrl} alt={session.member} className="w-[60px] h-[60px]" />
              <div className="absolute right-0 bottom-0 flex justify-center items-center w-5 h-5 bg-[#88E000] border-2 border-[#14161C] rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.1)]">
                <Check size={12} weight="bold" className="text-black" />
              </div>
            </div>

            <div className="flex flex-col items-start gap-0.5 mt-2 sm:mt-0">
              <h4 className="font-sans font-bold text-lg leading-6 tracking-[-0.45px] text-white">
                {session.member}
              </h4>
              <span className="font-sans font-bold text-[10px] leading-[15px] tracking-[0.5px] uppercase text-[#71717A]">
                SESSION STATUS
              </span>
              <div className={`mt-1 flex flex-row items-center px-3 py-1 gap-1.5 ${statusConfig.bg} ${statusConfig.border} border rounded-lg shrink-0`}>
                {statusConfig.icon}
                <span className={`font-sans font-semibold text-xs leading-4 ${statusConfig.text}`}>
                  {session.status}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 w-full shrink-0">
            <h5 className="font-sans font-semibold text-sm leading-5 tracking-[-0.35px] text-white">
              Session Information
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 p-4 bg-[#14161C] border border-[#1F232B] rounded-2xl w-full">
              <div className="flex flex-row items-center gap-3">
                <div className="flex justify-center items-center w-8 h-8 shrink-0 bg-[#192215] border border-[#29391E] rounded-lg text-[#88E000]">
                  <User size={16} weight="regular" />
                </div>
                <div className="flex flex-col gap-1 overflow-hidden">
                  <span className="font-sans font-normal text-[11px] leading-[14px] text-[#71717A] truncate">Member</span>
                  <span className="font-sans font-medium text-xs leading-4 text-white truncate">{session.member}</span>
                </div>
              </div>

              <div className="flex flex-row items-center gap-3">
                <div className="flex justify-center items-center w-8 h-8 shrink-0 bg-[#192215] border border-[#29391E] rounded-lg text-[#88E000]">
                  <Clock size={16} weight="regular" />
                </div>
                <div className="flex flex-col gap-1 overflow-hidden">
                  <span className="font-sans font-normal text-[11px] leading-[14px] text-[#71717A] truncate">Time</span>
                  <span className="font-sans font-medium text-xs leading-4 text-white truncate">{session.time} {session.timeSuffix}</span>
                </div>
              </div>

              <div className="flex flex-row items-center gap-3">
                <div className="flex justify-center items-center w-8 h-8 shrink-0 bg-[#192215] border border-[#29391E] rounded-lg text-[#88E000]">
                  <Barbell size={16} weight="regular" />
                </div>
                <div className="flex flex-col gap-1 overflow-hidden">
                  <span className="font-sans font-normal text-[11px] leading-[14px] text-[#71717A] truncate">Trainer</span>
                  <span className="font-sans font-medium text-xs leading-4 text-white truncate">{session.trainer}</span>
                </div>
              </div>

              <div className="flex flex-row items-center gap-3">
                <div className="flex justify-center items-center w-8 h-8 shrink-0 bg-[#192215] border border-[#29391E] rounded-lg text-[#88E000]">
                  <Clock size={16} weight="regular" />
                </div>
                <div className="flex flex-col gap-1 overflow-hidden">
                  <span className="font-sans font-normal text-[11px] leading-[14px] text-[#71717A] truncate">Duration</span>
                  <span className="font-sans font-medium text-xs leading-4 text-white truncate">60 Minutes</span>
                </div>
              </div>

              <div className="flex flex-row items-center gap-3">
                <div className="flex justify-center items-center w-8 h-8 shrink-0 bg-[#192215] border border-[#29391E] rounded-lg text-[#88E000]">
                  <Target size={16} weight="regular" />
                </div>
                <div className="flex flex-col gap-1 overflow-hidden">
                  <span className="font-sans font-normal text-[11px] leading-[14px] text-[#71717A] truncate">Workout Type</span>
                  <span className="font-sans font-medium text-xs leading-4 text-white truncate">{session.workoutType !== '—' ? session.workoutType : 'Not Specified'}</span>
                </div>
              </div>

              <div className="flex flex-row items-center gap-3">
                <div className="flex justify-center items-center w-8 h-8 shrink-0 bg-[#192215] border border-[#29391E] rounded-lg text-[#88E000]">
                  <Target size={16} weight="fill" />
                </div>
                <div className="flex flex-col gap-1 overflow-hidden">
                  <span className="font-sans font-normal text-[11px] leading-[14px] text-[#71717A] truncate">Training Goal</span>
                  <span className="font-sans font-medium text-xs leading-4 text-white truncate">{session.workoutType !== '—' ? session.workoutType : 'General Fitness'}</span>
                </div>
              </div>

              <div className="flex flex-row items-center gap-3">
                <div className="flex justify-center items-center w-8 h-8 shrink-0 bg-[#192215] border border-[#29391E] rounded-lg text-[#88E000]">
                  <CalendarBlank size={16} weight="regular" />
                </div>
                <div className="flex flex-col gap-1 overflow-hidden">
                  <span className="font-sans font-normal text-[11px] leading-[14px] text-[#71717A] truncate">Date</span>
                  <span className="font-sans font-medium text-xs leading-4 text-white truncate">29 July 2026</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 w-full shrink-0">
            <h5 className="font-sans font-semibold text-sm leading-5 tracking-[-0.35px] text-white">
              Attendance
            </h5>
            <div className="flex flex-row items-center p-4 gap-4 w-full bg-[#14161C] border border-[#1F232B] rounded-2xl">
              <div className={`flex justify-center items-center w-10 h-10 shrink-0 ${statusConfig.attendanceBg} border ${statusConfig.attendanceBorder} rounded-full ${statusConfig.attendanceIconColor}`}>
                {statusConfig.attendanceText === "Present" ? (
                  <Check size={20} weight="bold" />
                ) : statusConfig.attendanceText === "Absent" ? (
                  <X size={20} weight="bold" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-[#71717A]" />
                )}
              </div>
              <div className="flex flex-col gap-[3px] overflow-hidden">
                <span className="font-sans font-normal text-[11px] leading-[14px] text-[#71717A] truncate">
                  Attendance Status
                </span>
                <span className={`font-sans font-bold text-sm leading-5 ${statusConfig.attendanceIconColor} truncate`}>
                  {statusConfig.attendanceText}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
