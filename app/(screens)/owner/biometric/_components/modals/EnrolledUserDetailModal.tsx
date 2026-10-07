"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { UserFocus, Fingerprint, Trash } from "@phosphor-icons/react/dist/ssr";
import { CredentialUser } from "../types";

type Props = {
  user: CredentialUser;
  onClose: () => void;
  onUnenroll: () => void;
  onRegister: (type: "face" | "fingerprint") => void;
};

export default function EnrolledUserDetailModal({ user, onClose, onUnenroll, onRegister }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = "unset"; };
  }, []);

  if (!mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-[#0C0D10]/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 10 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-[340px] max-h-[85vh] overflow-y-auto scrollbar-themed bg-[#14161A] border border-[#232631] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)] rounded-2xl p-5 flex flex-col gap-4 z-10"
      >
        <div className="flex flex-col gap-0.5 w-full">
          <h3 className="font-sans font-bold text-[18px] leading-7 tracking-[-0.45px] text-white">
            {user.name}
          </h3>
          <span className="font-sans font-medium text-[14px] leading-5 text-[#A3A3A3]">
            {user.phone}
          </span>
        </div>

        <div className="flex flex-row justify-between items-center px-4 py-[14px] bg-[#2A3011] border border-[#3E4817] rounded-xl w-full shadow-inner">
          <div className="flex flex-row items-center gap-3">
            <UserFocus size={24} className="text-[#CBF83E]" />
            <div className="flex flex-col">
              <span className="font-sans font-bold text-[16px] leading-5 text-[#CBF83E]">
                Enrolled
              </span>
              <span className="font-sans font-normal text-[13px] leading-5 text-[#A3A3A3]">
                Device User ID: {user.deviceUserId}
              </span>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <div
              onClick={() => onRegister("face")}
              className={`flex justify-center items-center w-10 h-10 rounded-full border cursor-pointer transition-colors shadow-sm ${user.hasFace
                  ? "bg-[#3C4613] border-[rgba(203,248,62,0.2)] hover:bg-[#4D5A18]"
                  : "bg-[#28292C] border-[#323438] hover:bg-[#323438]"
                }`}
            >
              <UserFocus size={20} className={user.hasFace ? "text-[#CBF83E]" : "text-[#A3A3A3]"} weight={user.hasFace ? "fill" : "regular"} />
            </div>
            <div
              onClick={() => onRegister("fingerprint")}
              className={`flex justify-center items-center w-10 h-10 rounded-full border cursor-pointer transition-colors shadow-sm ${user.hasFingerprint
                  ? "bg-[#3C4613] border-[rgba(203,248,62,0.2)] hover:bg-[#4D5A18]"
                  : "bg-[#28292C] border-[#323438] hover:bg-[#323438]"
                }`}
            >
              <Fingerprint size={20} className={user.hasFingerprint ? "text-[#D2FF00]" : "text-[#A3A3A3]"} weight={user.hasFingerprint ? "fill" : "regular"} />
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center gap-3 w-full mt-1">
          <button
            onClick={onClose}
            className="flex-1 flex justify-center items-center h-[40px] bg-[#28292C] rounded-[10px] font-sans font-semibold text-[12px] text-white hover:bg-[#323438] transition-colors cursor-pointer shadow-sm"
          >
            Cancel
          </button>
          <button
            onClick={onUnenroll}
            className="flex-1 flex flex-row justify-center items-center gap-1.5 h-[40px] bg-[#321719] border border-[#4C0519] rounded-[10px] hover:bg-[#401D20] transition-colors cursor-pointer shadow-sm"
          >
            <Trash size={14} className="text-[#F43F5E]" />
            <span className="font-sans font-semibold text-[12px] text-[#F43F5E]">
              Unenroll
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
