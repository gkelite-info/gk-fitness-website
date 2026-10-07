"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { Fingerprint } from "@phosphor-icons/react/dist/ssr";
import { CredentialUser } from "../types";

type Props = {
  user: CredentialUser;
  onClose: () => void;
  onCapture: () => void;
};

export default function RegisterFingerprintModal({ user, onClose, onCapture }: Props) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => { 
    setMounted(true); 
    document.body.style.overflow = "hidden"; 
    return () => { document.body.style.overflow = "unset"; }; 
  }, []);
  
  if (!mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
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
        className="relative w-full max-w-[400px] max-h-[85vh] overflow-y-auto scrollbar-themed bg-[#14161A] border border-[#232631] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)] rounded-3xl p-5 flex flex-col gap-4 z-10"
      >
        <div className="flex flex-col gap-0.5 w-full">
          <h3 className="font-sans font-bold text-[18px] leading-7 tracking-[-0.45px] text-white">
            {user.name}
          </h3>
          <span className="font-sans font-medium text-[14px] leading-5 text-[#A3A3A3]">
            {user.phone}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 w-full py-1">
          <div className="flex justify-center items-center w-[100px] h-[100px] bg-[#2A3011] rounded-full shadow-inner">
            <Fingerprint size={52} className="text-[#D2FF00]" weight="regular" />
          </div>
          <div className="flex flex-col items-center gap-1.5 w-full mt-2">
            <h4 className="font-sans font-bold text-[18px] text-white text-center">
              Place finger on device
            </h4>
            <p className="font-sans font-normal text-[13px] text-[#A3A3A3] text-center px-2 leading-5">
              Registering fingerprint on the device scanner.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full mt-1">
          <button 
            onClick={onCapture} 
            className="w-full h-[44px] bg-[#D2F800] rounded-xl font-sans font-bold text-[14px] text-black hover:bg-[#d4ff32] transition-colors cursor-pointer shadow-sm"
          >
            Start Scan
          </button>
          <button 
            onClick={onClose} 
            className="w-full h-[44px] bg-[#232631] rounded-xl font-sans font-semibold text-[14px] text-white hover:bg-[#2A2E3B] transition-colors cursor-pointer shadow-sm"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
