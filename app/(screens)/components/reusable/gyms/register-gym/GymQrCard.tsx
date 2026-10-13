"use client";

import { useState } from "react";
import { Barbell, ArrowClockwise, DownloadSimple } from "@phosphor-icons/react";
import toast from "react-hot-toast";
import { QR_PATTERNS } from "./qrPatterns";

interface GymQrCardProps {
  gymName?: string;
  onGenerate?: () => void;
}

export default function GymQrCard({ gymName, onGenerate }: GymQrCardProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [patternIndex, setPatternIndex] = useState(0);

  const currentPattern = QR_PATTERNS[patternIndex];

  const handleGenerateQr = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setPatternIndex((prev) => (prev + 1) % QR_PATTERNS.length);
      setIsGenerating(false);
      onGenerate?.();
      const nextCode = QR_PATTERNS[(patternIndex + 1) % QR_PATTERNS.length].code;
      toast.success(
        gymName
          ? `Generated new QR (${nextCode}) for ${gymName}!`
          : `Generated new Check-in QR (${nextCode})!`,
        { id: "qr-gen-toast" }
      );
    }, 450);
  };

  const handleDownload = () => {
    try {
      const svgString = `
        <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
          <rect width="600" height="600" rx="32" fill="#FFFFFF"/>
          <g transform="translate(60, 60) scale(4.8)">
            <path d="${currentPattern.svgPath}" fill="#000000"/>
          </g>
          <circle cx="300" cy="300" r="38" fill="#000000" stroke="#161B24" stroke-width="4"/>
          <rect x="282" y="297" width="36" height="6" rx="3" fill="#D4FF32"/>
          <rect x="277" y="289" width="6" height="22" rx="2" fill="#D4FF32"/>
          <rect x="317" y="289" width="6" height="22" rx="2" fill="#D4FF32"/>
          <text x="300" y="565" font-family="sans-serif" font-size="16" font-weight="bold" fill="#0F172A" text-anchor="middle" letter-spacing="1">
            ${currentPattern.code} • ${gymName || "GK FITNESS"}
          </text>
        </svg>
      `.trim();

      const blob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 600;
        canvas.height = 600;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const pngUrl = canvas.toDataURL("image/png");
          const a = document.createElement("a");
          const cleanName = (gymName || "gym")
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "-");
          a.href = pngUrl;
          a.download = `${cleanName}-qr-${currentPattern.code.toLowerCase()}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          toast.success(`Downloaded ${currentPattern.code}.png!`, {
            id: "qr-download-toast",
          });
        }
      };

      img.src = url;
    } catch {
      toast.error("Failed to download QR code image", { id: "qr-download-err" });
    }
  };

  return (
    <div className="w-full bg-[#121620] border border-[#1E2433] rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
      <button
        type="button"
        onClick={handleGenerateQr}
        disabled={isGenerating}
        className="w-full h-11 rounded-xl bg-[#D4FF32] hover:bg-[#bde826] text-black font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(212,255,50,0.25)] active:scale-95 disabled:opacity-75"
      >
        <ArrowClockwise
          size={18}
          weight="bold"
          className={isGenerating ? "animate-spin" : ""}
        />
        <span>{isGenerating ? "Generating New QR..." : "Generate QR"}</span>
      </button>

      <div className="relative w-full aspect-square max-w-[270px] mx-auto p-4 flex items-center justify-center">
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#D4FF32] rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#D4FF32] rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#D4FF32] rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#D4FF32] rounded-br-lg" />

        <div
          className={`relative w-full h-full bg-white rounded-xl p-3 flex items-center justify-center shadow-2xl transition-all duration-300 ${
            isGenerating ? "opacity-40 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-black"
            fill="currentColor"
          >
            <path d={currentPattern.svgPath} />
          </svg>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-11 h-11 rounded-full bg-black border-2 border-[#161B24] flex items-center justify-center shadow-lg">
              <Barbell size={20} weight="fill" className="text-[#D4FF32]" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 pt-3 border-t border-[#1F2637]">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D4FF32] animate-pulse" />
            <span className="text-[#94A3B8]">Active Check-in QR</span>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-[#1B202D] border border-[#263145] font-mono text-[11px] font-bold text-[#D4FF32]">
            {currentPattern.code}
          </span>
        </div>

        <button
          type="button"
          onClick={handleDownload}
          className="w-full h-11 rounded-xl bg-[#18202D] hover:bg-[#222C3E] border border-[#263145] hover:border-[#D4FF32]/50 text-xs sm:text-sm font-semibold text-white hover:text-[#D4FF32] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95 group"
        >
          <DownloadSimple
            size={16}
            weight="bold"
            className="text-[#D4FF32] group-hover:translate-y-0.5 transition-transform"
          />
          <span>Download QR Code (PNG)</span>
        </button>

        <span className="text-[11px] text-[#64748B] text-center">
          High-res 600×600 PNG format ready for print
        </span>
      </div>
    </div>
  );
}
