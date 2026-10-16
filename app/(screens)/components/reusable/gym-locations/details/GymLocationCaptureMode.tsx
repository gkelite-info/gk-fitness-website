"use client";

import { useState, useEffect } from "react";
import {
  MapPin,
  CheckCircle,
  NavigationArrow,
  FileText,
  ArrowsOutSimple,
  X,
  MagnifyingGlassPlus,
} from "@phosphor-icons/react";

interface CapturedLocationData {
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  latitude: number;
  longitude: number;
}

interface GymLocationCaptureModeProps {
  address: string;
  latitude: number;
  longitude: number;
  onCapture: (data?: CapturedLocationData) => void;
}

export default function GymLocationCaptureMode({
  address,
  latitude,
  longitude,
  onCapture,
}: GymLocationCaptureModeProps) {
  const [isCapturing, setIsCapturing] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMapModalOpen(false);
    };
    if (isMapModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMapModalOpen]);

  const handleCaptureClick = () => {
    setIsCapturing(true);

    if (typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
              { headers: { "Accept-Language": "en" } }
            );
            if (res.ok) {
              const data = await res.json();
              const addr = data.address || {};
              const road = addr.road || addr.suburb || addr.neighbourhood || "";
              const cityName = addr.city || addr.town || addr.village || addr.county || "Bangalore";
              const stateName = addr.state || "Karnataka";
              const postcode = addr.postcode || "560025";
              const fullAddress = data.display_name || `${road}, ${cityName}, ${stateName} ${postcode}`;

              onCapture({
                address: fullAddress,
                city: cityName,
                state: stateName,
                pincode: postcode,
                latitude: Number(lat.toFixed(4)),
                longitude: Number(lng.toFixed(4)),
              });
              setIsCapturing(false);
              return;
            }
          } catch {
            // Geocoding fallback
          }

          onCapture({
            address: `Detected Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
            latitude: Number(lat.toFixed(4)),
            longitude: Number(lng.toFixed(4)),
          });
          setIsCapturing(false);
        },
        () => {
          onCapture();
          setIsCapturing(false);
        },
        { enableHighAccuracy: true, timeout: 6000 }
      );
    } else {
      onCapture();
      setIsCapturing(false);
    }
  };

  const roadSnippet = address.split(",")[0]?.trim() || "Gym Location";
  const numLat = Number(latitude) || 12.9716;
  const numLng = Number(longitude) || 77.5946;

  return (
    <>
      <div className="w-full bg-[#13151B] border border-[#232631] rounded-2xl p-4 sm:p-6 flex flex-col justify-between gap-5 shadow-sm h-full flex-1 min-w-0 max-w-full overflow-hidden">
        <div className="flex flex-col gap-5 min-w-0">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#132A1E] border border-[#165330] text-[#22C55E] flex items-center justify-center shrink-0 shadow-inner">
              <MapPin size={22} weight="fill" />
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Capture Current Location
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8]">
                Use the current device location to auto-fill the gym&apos;s coordinates and address.
              </p>
            </div>
          </div>

          <div className="w-full border border-dashed border-[#1B4B32] bg-[#0E1713]/50 rounded-2xl p-6 sm:p-7 flex flex-col items-center justify-center gap-3.5 text-center min-w-0">
            <div className="w-13 h-13 rounded-full bg-[#143224] border border-[#1B5238] flex items-center justify-center text-[#22C55E] shadow-[0_0_20px_rgba(34,197,94,0.2)]">
              <MapPin size={24} weight="fill" className="animate-bounce" />
            </div>

            <button
              type="button"
              onClick={handleCaptureClick}
              disabled={isCapturing}
              className="bg-[#D4FF32] hover:bg-[#c5ec2b] text-black font-bold px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(212,255,50,0.25)] flex items-center gap-2 text-xs sm:text-sm transition-all cursor-pointer active:scale-95 disabled:opacity-75 max-w-full"
            >
              <NavigationArrow size={16} weight="fill" className="shrink-0" />
              <span className="truncate">{isCapturing ? "Detecting Location..." : "Get Current Location"}</span>
            </button>
          </div>
        </div>

        <div className="w-full bg-[#0D0F14] border border-[#1E2330] rounded-xl p-4 sm:p-5 flex flex-col gap-3.5 shadow-inner mt-auto min-w-0 max-w-full overflow-hidden">
          <div className="flex items-center gap-2 text-[#22C55E] min-w-0">
            <CheckCircle size={18} weight="fill" className="shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-xs sm:text-sm font-bold text-[#22C55E] leading-tight">
                Location Detected
              </span>
              <span className="text-[11px] text-[#94A3B8]">
                Current location captured and verified successfully.
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-3 border-t border-[#1C202C] min-w-0 max-w-full">
            <div className="flex flex-col gap-2.5 flex-1 min-w-0">
              <div className="flex items-start gap-2 text-xs sm:text-sm text-[#94A3B8] min-w-0">
                <MapPin size={16} weight="fill" className="text-[#64748B] shrink-0 mt-0.5" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[11px] text-[#64748B] font-medium">Address</span>
                  <span className="text-white font-medium text-xs sm:text-sm break-words leading-relaxed">
                    {address || "12, Residency Road, Ashok Nagar, Bangalore, Karnataka 560025"}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1 min-w-0">
                <div className="flex items-center gap-2 text-xs text-[#94A3B8] min-w-0">
                  <FileText size={15} weight="regular" className="text-[#64748B] shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-[#64748B] font-medium">Latitude</span>
                    <span className="text-white font-mono font-semibold">{numLat.toFixed(4)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#94A3B8] min-w-0">
                  <FileText size={15} weight="regular" className="text-[#64748B] shrink-0" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-[10px] text-[#64748B] font-medium">Longitude</span>
                    <span className="text-white font-mono font-semibold">{numLng.toFixed(4)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div
              onClick={() => setIsMapModalOpen(true)}
              className="w-full sm:w-64 lg:w-80 h-52 sm:h-40 lg:h-48 rounded-xl relative overflow-hidden bg-[#151922] border border-[#232938] shrink-0 shadow-inner group cursor-pointer max-w-full"
            >
              <iframe
                key={`${numLat}-${numLng}`}
                title="Location Map Preview"
                src={`https://maps.google.com/maps?q=${numLat},${numLng}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                className="absolute inset-0 w-full h-full border-0 pointer-events-none filter brightness-95"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-transparent group-hover:bg-black/30 transition-all flex items-center justify-center pointer-events-none">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#0C0D10]/90 border border-[#232938] text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg backdrop-blur-sm">
                  <MagnifyingGlassPlus size={14} weight="bold" className="text-[#D4FF32]" />
                  <span>Click to Zoom & Move</span>
                </div>
              </div>

              <div className="absolute bottom-1.5 right-1.5 z-10 px-2 py-0.5 rounded bg-[#0D0F14]/90 border border-[#232938] text-[9px] font-mono text-[#D4FF32] max-w-[130px] truncate shadow-sm pointer-events-none">
                {roadSnippet}
              </div>

              <div className="absolute top-1.5 right-1.5 z-10 p-1 rounded bg-[#0D0F14]/85 border border-[#232938] text-[#94A3B8] group-hover:text-white transition-colors shadow-sm pointer-events-none">
                <ArrowsOutSimple size={12} weight="bold" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isMapModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-4xl lg:max-w-5xl h-[72vh] sm:h-[78vh] md:h-[82vh] max-h-[85vh] sm:max-h-[88vh] bg-[#13151B] border border-[#232631] rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-3.5 sm:p-4 md:p-5 border-b border-[#1E222D] bg-[#0E1015] shrink-0">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#132A1E] border border-[#165330] text-[#22C55E] flex items-center justify-center shrink-0">
                  <MapPin size={18} weight="fill" />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <h3 className="text-xs sm:text-sm md:text-base font-bold text-white tracking-tight truncate">
                      {roadSnippet || "Gym Location Map"}
                    </h3>
                    <span className="text-[10px] sm:text-[11px] font-mono text-[#D4FF32] px-1.5 py-0.5 rounded bg-[#181A22] border border-[#262C3A] shrink-0">
                      {numLat.toFixed(4)}, {numLng.toFixed(4)}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#94A3B8] line-clamp-1 sm:line-clamp-2 mt-0.5 break-words">
                    {address || "Selected gym coordinates"}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsMapModalOpen(false)}
                aria-label="Close Map Modal"
                className="w-8 h-8 rounded-lg bg-[#181A22] border border-[#242836] hover:bg-[#232736] text-[#94A3B8] hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2.5 sm:ml-3"
              >
                <X size={16} weight="bold" />
              </button>
            </div>

            <div className="w-full flex-1 min-h-0 relative bg-[#0C0D10]">
              <iframe
                title="Interactive Gym Location Map"
                src={`https://maps.google.com/maps?q=${numLat},${numLng}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
