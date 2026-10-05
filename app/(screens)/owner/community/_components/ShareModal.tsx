"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { X, Link as LinkIcon, InstagramLogo, FacebookLogo, TwitterLogo, WhatsappLogo, EnvelopeSimple } from "@phosphor-icons/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  url: string;
};

export default function ShareModal({ isOpen, onClose, url }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setCopied(false);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy link");
    }
  };

  const shareOptions = [
    {
      name: "Copy Link",
      icon: <LinkIcon size={24} weight="regular" />,
      color: "bg-[#2A2E39] text-[#E2E8F0] hover:bg-[#333846]",
      onClick: handleCopy,
    },
    {
      name: "WhatsApp",
      icon: <WhatsappLogo size={24} weight="regular" />,
      color: "bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366]/20 border border-[#25D366]/20",
      onClick: () => window.open(`https://wa.me/?text=${encodeURIComponent(url)}`, '_blank'),
    },
    {
      name: "Instagram",
      icon: <InstagramLogo size={24} weight="regular" />,
      color: "bg-[#E1306C]/10 text-[#E1306C] hover:bg-[#E1306C]/20 border border-[#E1306C]/20",
      onClick: () => window.open(`https://www.instagram.com/`, '_blank'), // Instagram doesn't have a direct share URL, usually just opens app
    },
    {
      name: "X (Twitter)",
      icon: <TwitterLogo size={24} weight="regular" />,
      color: "bg-black text-white hover:bg-[#1A1A1A] border border-[#333333]",
      onClick: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`, '_blank'),
    },
    {
      name: "Facebook",
      icon: <FacebookLogo size={24} weight="regular" />,
      color: "bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 border border-[#1877F2]/20",
      onClick: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank'),
    },
    {
      name: "Email",
      icon: <EnvelopeSimple size={24} weight="regular" />,
      color: "bg-[#EA4335]/10 text-[#EA4335] hover:bg-[#EA4335]/20 border border-[#EA4335]/20",
      onClick: () => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=&su=Check out this post&body=${encodeURIComponent(url)}`, '_blank'),
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-[#161920] border border-[#232730] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex flex-row justify-between items-center p-5 border-b border-[#232730]">
          <h3 className="font-['Nimbus_Sans'] font-bold text-lg text-white">
            Share post
          </h3>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#2A2E39] text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {shareOptions.map((option, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <button
                  onClick={option.onClick}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer ${option.color}`}
                >
                  {option.icon}
                </button>
                <span className="font-['Nimbus_Sans'] text-xs font-medium text-[#94A3B8] text-center">
                  {option.name === "Copy Link" && copied ? "Copied!" : option.name}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-row items-center p-1 bg-[#1A1D24] border border-[#232730] rounded-lg overflow-hidden">
            <div className="flex-1 px-3 py-2 overflow-hidden">
              <p className="font-['Nimbus_Sans'] text-sm text-[#94A3B8] truncate select-all">
                {url}
              </p>
            </div>
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-[#D4FF32] hover:bg-[#c2e62e] text-black font-['Nimbus_Sans'] font-bold text-sm rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
