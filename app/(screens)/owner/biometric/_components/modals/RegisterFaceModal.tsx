"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { UserFocus } from "@phosphor-icons/react/dist/ssr";
import { CredentialUser } from "../types";

type Props = {
  user: CredentialUser;
  onClose: () => void;
};

export default function RegisterFaceModal({ user, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    user.enrolledType === "face" ? `https://i.pravatar.cc/150?u=${user.id}` : null
  );
  const [isCapturing, setIsCapturing] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const libraryInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => { 
    setMounted(true); 
    document.body.style.overflow = "hidden"; 
    return () => { document.body.style.overflow = "unset"; }; 
  }, []);

  useEffect(() => {
    if (isCapturing && videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [isCapturing, stream]);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);
  
  if (!mounted) return null;

  const handleCameraClick = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      setStream(mediaStream);
      setIsCapturing(true);
    } catch (err) {
      console.error("Error accessing camera:", err);
      // Fallback to file input if camera access fails or is denied
      cameraInputRef.current?.click();
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCapturing(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageUrl = canvas.toDataURL("image/jpeg");
        setSelectedImage(imageUrl);
        stopCamera();
      }
    }
  };

  const handleLibraryClick = () => {
    libraryInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  const modalContent = (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        transition={{ duration: 0.2 }} 
        className="fixed inset-0 bg-[#0C0D10]/80 backdrop-blur-sm" 
        onClick={handleClose} 
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

        {isCapturing ? (
          <div className="flex flex-col items-center justify-center gap-4 w-full py-1">
            <div className="w-full h-[240px] bg-black rounded-2xl overflow-hidden border border-[#232631] relative shadow-inner">
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className="w-full h-full object-cover scale-x-[-1]" 
              />
            </div>
            <div className="flex flex-col items-center gap-1 w-full mt-1">
              <h4 className="font-sans font-bold text-[18px] text-white text-center">
                Position your face
              </h4>
              <p className="font-sans font-normal text-[13px] text-[#A3A3A3] text-center px-2 leading-5">
                Ensure your face is clearly visible in the frame.
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 w-full py-1">
            <div className="flex justify-center items-center w-[120px] h-[120px] bg-[#2A3011] rounded-full shadow-inner overflow-hidden border border-[rgba(203,248,62,0.2)]">
              {selectedImage ? (
                <img src={selectedImage} alt="Captured Face" className="w-full h-full object-cover" />
              ) : (
                <UserFocus size={52} className="text-[#D2FF00]" weight="regular" />
              )}
            </div>
            <div className="flex flex-col items-center gap-1 w-full mt-1">
              <h4 className="font-sans font-bold text-[18px] text-white text-center">
                {selectedImage ? "Photo Captured" : "Register Face"}
              </h4>
              <p className="font-sans font-normal text-[13px] text-[#A3A3A3] text-center px-2 leading-5">
                {selectedImage ? "Review the photo below before confirming." : "Please choose a method to register a face."}
              </p>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2.5 w-full">
          {/* Hidden inputs for actual file capture (used for library or fallback) */}
          <input 
            type="file" 
            accept="image/*" 
            capture="environment" 
            ref={cameraInputRef} 
            className="hidden" 
            onChange={handleFileChange} 
          />
          <input 
            type="file" 
            accept="image/*" 
            ref={libraryInputRef} 
            className="hidden" 
            onChange={handleFileChange} 
          />

          {isCapturing ? (
            <>
              <button 
                onClick={capturePhoto}
                className="w-full h-[44px] bg-[#D2F800] rounded-xl shadow-[0px_4px_6px_-1px_rgba(210,248,0,0.1)] font-sans font-bold text-[14px] text-black hover:bg-[#d4ff32] transition-colors cursor-pointer"
              >
                Snap Photo
              </button>
              <button 
                onClick={stopCamera}
                className="w-full h-[44px] bg-[#232631] rounded-xl font-sans font-semibold text-[14px] text-white hover:bg-[#2A2E3B] transition-colors cursor-pointer shadow-sm"
              >
                Cancel Capture
              </button>
            </>
          ) : selectedImage ? (
            <>
              <button 
                onClick={handleClose} 
                className="w-full h-[44px] bg-[#D2F800] rounded-xl shadow-[0px_4px_6px_-1px_rgba(210,248,0,0.1)] font-sans font-bold text-[14px] text-black hover:bg-[#d4ff32] transition-colors cursor-pointer"
              >
                Confirm Registration
              </button>
              <div className="flex flex-row gap-2.5 w-full">
                <button 
                  onClick={() => {
                    setSelectedImage(null);
                    handleCameraClick();
                  }}
                  className="flex-1 h-[44px] bg-[#2A3011] border border-[#3E4817] rounded-xl font-sans font-semibold text-[13px] text-[#CBF83E] hover:bg-[#323814] transition-colors cursor-pointer shadow-sm"
                >
                  Retake Photo
                </button>
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="flex-1 h-[44px] bg-[#321719] border border-[#4C0519] rounded-xl font-sans font-semibold text-[13px] text-[#F43F5E] hover:bg-[#401D20] transition-colors cursor-pointer shadow-sm"
                >
                  Remove Photo
                </button>
              </div>
            </>
          ) : (
            <>
              <button 
                onClick={handleCameraClick}
                className="w-full h-[44px] bg-[#2A3011] border border-[#3E4817] rounded-xl font-sans font-semibold text-[14px] text-[#CBF83E] hover:bg-[#323814] transition-colors cursor-pointer shadow-sm"
              >
                Take Photo
              </button>
              <button 
                onClick={handleLibraryClick}
                className="w-full h-[44px] bg-[#2A3011] border border-[#3E4817] rounded-xl font-sans font-semibold text-[14px] text-[#CBF83E] hover:bg-[#323814] transition-colors cursor-pointer shadow-sm"
              >
                Choose from Library
              </button>
              <button 
                onClick={handleClose} 
                className="w-full h-[44px] bg-[#232631] rounded-xl font-sans font-semibold text-[14px] text-white hover:bg-[#2A2E3B] transition-colors cursor-pointer mt-1 shadow-sm"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
