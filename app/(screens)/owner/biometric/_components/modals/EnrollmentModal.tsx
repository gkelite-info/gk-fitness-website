"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { X } from "@phosphor-icons/react/dist/ssr";
import { CredentialUser } from "../types";

type Props = {
  user: CredentialUser;
  devices: any[];
  onClose: () => void;
  onEnroll: (enrollments: { deviceId: string; deviceUserId: string }[]) => Promise<void> | void;
};

export default function EnrollmentModal({ user, devices, onClose, onEnroll }: Props) {
  const [mounted, setMounted] = useState(false);
  const [selectedDevices, setSelectedDevices] = useState<{ [key: string]: boolean }>({});
  const [deviceUserIds, setDeviceUserIds] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    if (devices.length === 1) {
      setSelectedDevices({ [devices[0].deviceId]: true });
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [devices]);

  if (!mounted) return null;

  const handleCheckboxChange = (deviceId: string) => {
    setSelectedDevices(prev => ({ ...prev, [deviceId]: !prev[deviceId] }));
  };

  const handleIdChange = (deviceId: string, value: string) => {
    setDeviceUserIds(prev => ({ ...prev, [deviceId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const enrollments: { deviceId: string; deviceUserId: string }[] = [];

    for (const device of devices) {
      if (selectedDevices[device.deviceId]) {
        const id = deviceUserIds[device.deviceId];
        if (!id || id.trim() === "") {
          alert(`Please enter a Device User ID for ${device.deviceName || 'selected device'}`);
          return;
        }
        enrollments.push({ deviceId: device.deviceId, deviceUserId: id.trim() });
      }
    }

    if (enrollments.length === 0) {
      alert("Please select at least one device to enroll.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onEnroll(enrollments);
    } finally {
      setIsSubmitting(false);
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
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
        className="relative w-full max-w-[480px] max-h-[85vh] overflow-y-auto scrollbar-themed bg-[#14161A] border border-[#232631] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.5)] rounded-3xl z-10 p-6 sm:p-8 flex flex-col items-start"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-[#94A3B8] hover:text-white transition-colors cursor-pointer">
          <X size={20} weight="bold" />
        </button>

        <h2 className="font-sans font-bold text-2xl leading-8 tracking-[-0.6px] text-white mb-1 pr-8">
          {user.name}
        </h2>
        <span className="font-sans font-normal text-[15px] leading-5 text-[#94A3B8] mb-6">
          {user.phone}
        </span>

        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-6">

          <div className="flex flex-col gap-4 w-full">
            <p className="font-sans font-medium text-[14px] leading-5 text-[#64748B]">
              Select devices to enroll in:
            </p>
            {devices.map(device => (
              <div key={device.deviceId} className="flex flex-col gap-3 p-4 bg-[#0E0F13] border border-[#232631] rounded-2xl">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={!!selectedDevices[device.deviceId]}
                    onChange={() => handleCheckboxChange(device.deviceId)}
                    className="w-5 h-5 accent-[#D2F800] bg-[#14161A] border-[#232631] rounded"
                  />
                  <span className="font-sans font-semibold text-white text-base">
                    {device.deviceName || device.deviceIp}
                  </span>
                </label>

                {selectedDevices[device.deviceId] && (
                  <div className="flex flex-col gap-2 mt-1">
                    <span className="font-sans font-medium text-[13px] text-[#94A3B8]">
                      Device User ID
                    </span>
                    <input
                      type="text"
                      required
                      autoComplete="off"
                      placeholder="e.g. 105"
                      value={deviceUserIds[device.deviceId] || ""}
                      onChange={(e) => handleIdChange(device.deviceId, e.target.value)}
                      className="w-full h-11 bg-[#14161A] border border-[#232631] rounded-xl px-4 font-sans font-normal text-[14px] text-white placeholder:text-[#475569] outline-none focus:border-[#D2F800] transition-colors shadow-inner"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-row justify-between items-center gap-3 sm:gap-4 w-full mt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 flex justify-center items-center h-12 sm:h-[54px] bg-[#1B1F24] border border-[#232631] rounded-2xl font-sans font-semibold text-sm sm:text-[15px] text-[#E2E8F0] hover:bg-[#232834] transition-colors cursor-pointer shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 flex justify-center items-center h-12 sm:h-[54px] rounded-2xl shadow-[0px_4px_6px_-1px_rgba(210,248,0,0.1),0px_2px_4px_-2px_rgba(210,248,0,0.1)] font-sans font-bold text-sm sm:text-[15px] transition-colors ${isSubmitting
                  ? "bg-[#D2F800]/50 text-black/50 cursor-not-allowed"
                  : "bg-[#D2F800] text-black hover:bg-[#d4ff32] cursor-pointer"
                }`}
            >
              {isSubmitting ? "Enrolling..." : "Enroll"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
