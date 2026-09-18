"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { WarningCircle, X } from "@phosphor-icons/react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  cancelText?: string;
  isConfirming?: boolean;
  isDestructive?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText = "Cancel",
  isConfirming = false,
  isDestructive = true,
}: ConfirmationModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#0C0D10]/80 backdrop-blur-md"
            onClick={!isConfirming ? onClose : undefined}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="relative w-full max-w-[400px] bg-[#14161A] border border-[#232631] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)] rounded-2xl overflow-hidden z-10 p-6 flex flex-col items-center text-center"
          >
            <motion.div 
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)] ${isDestructive ? 'bg-gradient-to-b from-[#2F1B1E] to-[#201315] border border-[#482025] text-[#F43F5E]' : 'bg-gradient-to-b from-[#192B15] to-[#111c0f] border border-[rgba(210,248,41,0.2)] text-[#D2F829]'}`}
            >
              <WarningCircle size={32} weight="duotone" />
            </motion.div>

            <h2 className="font-['Nimbus_Sans'] font-bold text-xl leading-7 text-white tracking-[-0.4px] mb-2">
              {title}
            </h2>
            <p className="font-['Nimbus_Sans'] font-medium text-sm leading-5 text-[#94A3B8] mb-8 px-2">
              {message}
            </p>

            <div className="flex flex-col w-full gap-3">
              <button
                type="button"
                onClick={onConfirm}
                disabled={isConfirming}
                className={`flex items-center justify-center w-full h-[46px] rounded-xl font-['Nimbus_Sans'] font-bold text-[15px] transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed ${
                  isDestructive
                    ? "bg-[#E11D48] text-white hover:bg-[#BE123C] shadow-[0_4px_12px_rgba(225,29,72,0.2)]"
                    : "bg-[#D2F829] text-black hover:bg-[#c2ef2b] shadow-[0_4px_12px_rgba(210,248,41,0.2)]"
                }`}
              >
                {isConfirming ? (
                  <div className="flex flex-row items-center justify-center gap-2">
                    <div className="w-4 h-4 border-[2px] border-current border-t-transparent rounded-full animate-spin" />
                    Logging out...
                  </div>
                ) : (
                  confirmText
                )}
              </button>
              <button
                type="button"
                onClick={onClose}
                disabled={isConfirming}
                className="flex items-center justify-center w-full h-[46px] rounded-xl bg-transparent border border-[#232631] font-['Nimbus_Sans'] font-semibold text-[15px] text-[#94A3B8] hover:text-white hover:bg-[#1B1F24] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {cancelText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
