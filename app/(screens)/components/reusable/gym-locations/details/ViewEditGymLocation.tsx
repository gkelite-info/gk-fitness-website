"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Gear,
  Crosshair,
  PencilSimple,
  FloppyDisk,
} from "@phosphor-icons/react";
import GymLocationSummaryBanner from "./GymLocationSummaryBanner";
import GymLocationCaptureMode from "./GymLocationCaptureMode";
import GymLocationManualMode from "./GymLocationManualMode";
import { updateGymLocation } from "../gymLocationsData";
import { GymLocationItem } from "../gymLocationsTypes";

interface ViewEditGymLocationProps {
  gym: GymLocationItem;
}

export default function ViewEditGymLocation({ gym: initialGym }: ViewEditGymLocationProps) {
  const router = useRouter();
  const [gym, setGym] = useState<GymLocationItem>(initialGym);
  const [activeMode, setActiveMode] = useState<"current" | "manual">("current");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [address, setAddress] = useState(gym.address || "12, Residency Road, Ashok Nagar");
  const [city, setCity] = useState(gym.city || "Bangalore");
  const [state, setState] = useState(gym.state || "Karnataka");
  const [pincode, setPincode] = useState(gym.pincode || "560025");
  const [latitude, setLatitude] = useState(gym.latitude?.toString() || "12.9716");
  const [longitude, setLongitude] = useState(gym.longitude?.toString() || "77.5946");

  const handleCaptureLocation = (data?: {
    address?: string;
    city?: string;
    state?: string;
    pincode?: string;
    latitude: number;
    longitude: number;
  }) => {
    if (data) {
      if (data.address) setAddress(data.address);
      if (data.city) setCity(data.city);
      if (data.state) setState(data.state);
      if (data.pincode) setPincode(data.pincode);
      setLatitude(data.latitude.toString());
      setLongitude(data.longitude.toString());
    } else {
      setAddress("12, Residency Road, Ashok Nagar, Bangalore, Karnataka 560025");
      setCity("Bangalore");
      setState("Karnataka");
      setPincode("560025");
      setLatitude("12.9716");
      setLongitude("77.5946");
    }
  };

  const handleCityChange = (newCity: string) => {
    setCity(newCity);
    const cityCoords: Record<string, { lat: string; lng: string }> = {
      Bangalore: { lat: "12.9716", lng: "77.5946" },
      Delhi: { lat: "28.6139", lng: "77.2090" },
      Mumbai: { lat: "19.0760", lng: "72.8777" },
      Chennai: { lat: "13.0827", lng: "80.2707" },
      Hyderabad: { lat: "17.4355", lng: "78.4519" },
      Kolkata: { lat: "22.5726", lng: "88.3639" },
      Pune: { lat: "18.5204", lng: "73.8567" },
      Ahmedabad: { lat: "23.0225", lng: "72.5714" },
      Jaipur: { lat: "26.9124", lng: "75.7873" },
    };
    if (cityCoords[newCity] && (!latitude || latitude === "12.9716")) {
      setLatitude(cityCoords[newCity].lat);
      setLongitude(cityCoords[newCity].lng);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    const updated = updateGymLocation(gym.id, {
      status: "added",
      address,
      city,
      state,
      pincode,
      latitude: parseFloat(latitude) || 12.9716,
      longitude: parseFloat(longitude) || 77.5946,
      location: `${city}, ${state}`,
    });
    if (updated) {
      setGym(updated);
    }
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => {
        router.push("/superadmin/gym-locations");
      }, 700);
    }, 400);
  };

  const handleCancel = () => {
    router.push("/superadmin/gym-locations");
  };

  return (
    <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-5 sm:gap-6 max-w-[1600px] mx-auto overflow-x-hidden min-w-0">
      <div className="flex items-center gap-3.5 w-full">
        <button
          type="button"
          onClick={handleCancel}
          aria-label="Back to Gym Locations"
          className="w-9 h-9 flex items-center justify-center bg-[#18202D] hover:bg-[#202B3D] border border-[#263145] rounded-lg text-[#CBD5E1] hover:text-white transition-all cursor-pointer shadow-sm active:scale-95 shrink-0"
        >
          <ArrowLeft size={16} weight="bold" />
        </button>

        <div className="flex flex-col min-w-0">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white leading-tight">
            Location Details
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-normal mt-0.5">
            View and update the saved gym location details.
          </p>
        </div>
      </div>

      <GymLocationSummaryBanner gym={gym} />

      {saveSuccess && (
        <div className="w-full bg-[#102B20] border border-[#165330] rounded-xl p-3.5 flex items-center gap-2.5 text-[#22C55E] text-xs sm:text-sm font-semibold animate-in fade-in duration-200">
          <Check size={18} weight="bold" />
          <span>Location changes saved successfully! Redirecting...</span>
        </div>
      )}

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-8 w-full min-w-0 flex flex-col">
          {activeMode === "current" ? (
            <GymLocationCaptureMode
              address={address}
              latitude={parseFloat(latitude) || 12.9716}
              longitude={parseFloat(longitude) || 77.5946}
              onCapture={handleCaptureLocation}
            />
          ) : (
            <GymLocationManualMode
              title="Saved Location Details"
              subtitle="This gym location is already configured. You can update the details below."
              address={address}
              onAddressChange={setAddress}
              city={city}
              onCityChange={handleCityChange}
              state={state}
              onStateChange={setState}
              pincode={pincode}
              onPincodeChange={setPincode}
              latitude={latitude}
              onLatitudeChange={setLatitude}
              longitude={longitude}
              onLongitudeChange={setLongitude}
              onPreviewMap={() => setActiveMode("current")}
            />
          )}
        </div>

        <div className="lg:col-span-4 w-full min-w-0 flex flex-col">
          <div className="w-full bg-[#13151B] border border-[#232631] rounded-2xl p-4 sm:p-5 flex flex-col gap-4 sm:gap-5 shadow-sm min-w-0 max-w-full">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#132A1E] border border-[#165330] text-[#22C55E] flex items-center justify-center shrink-0 shadow-inner">
                <Gear size={22} weight="fill" />
              </div>
              <div className="flex flex-col min-w-0">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Update Location
                </h3>
                <p className="text-xs text-[#94A3B8]">
                  Choose how you want to update the gym location.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => setActiveMode("current")}
                className={`w-full p-3.5 sm:p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3.5 min-w-0 select-none ${
                  activeMode === "current"
                    ? "bg-[#161C24] border-[#D4FF32] shadow-[0_0_15px_rgba(212,255,50,0.18)]"
                    : "bg-[#101217] border-[#222736] hover:border-[#384158] hover:bg-[#141720]"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
                    activeMode === "current"
                      ? "bg-[#D4FF32]/10 border-[#D4FF32]/40 text-[#D4FF32]"
                      : "bg-[#181C26] border-[#252C3D] text-[#94A3B8]"
                  }`}
                >
                  <Crosshair size={20} weight={activeMode === "current" ? "bold" : "regular"} />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span
                    className={`text-xs sm:text-sm font-semibold tracking-tight ${
                      activeMode === "current" ? "text-white" : "text-[#CBD5E1]"
                    }`}
                  >
                    Update Using Current Location
                  </span>
                  <span className="text-[11px] sm:text-xs text-[#94A3B8] mt-0.5 line-clamp-1">
                    Detect and fill the current device location
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveMode("manual")}
                className={`w-full p-3.5 sm:p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3.5 min-w-0 select-none ${
                  activeMode === "manual"
                    ? "bg-[#161C24] border-[#D4FF32] shadow-[0_0_15px_rgba(212,255,50,0.18)]"
                    : "bg-[#101217] border-[#222736] hover:border-[#384158] hover:bg-[#141720]"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border transition-colors ${
                    activeMode === "manual"
                      ? "bg-[#D4FF32]/10 border-[#D4FF32]/40 text-[#D4FF32]"
                      : "bg-[#181C26] border-[#252C3D] text-[#94A3B8]"
                  }`}
                >
                  <PencilSimple size={20} weight={activeMode === "manual" ? "bold" : "regular"} />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span
                    className={`text-xs sm:text-sm font-semibold tracking-tight ${
                      activeMode === "manual" ? "text-white" : "text-[#CBD5E1]"
                    }`}
                  >
                    Edit Manually
                  </span>
                  <span className="text-[11px] sm:text-xs text-[#94A3B8] mt-0.5 line-clamp-1">
                    Manually update the location details
                  </span>
                </div>
              </button>
            </div>

            <div className="flex flex-col gap-2.5 pt-2 border-t border-[#1E222D]">
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="w-full h-[42px] sm:h-[44px] rounded-xl bg-[#D4FF32] hover:bg-[#c5ec2b] text-black text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(212,255,50,0.25)] active:scale-[0.99] disabled:opacity-75"
              >
                <FloppyDisk size={16} weight="bold" />
                <span>{isSaving ? "Saving..." : "Save Changes"}</span>
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="w-full h-[42px] rounded-xl border border-[#232631] hover:border-[#383D4E] hover:bg-[#181A22] text-white text-xs sm:text-sm font-semibold flex items-center justify-center transition-all cursor-pointer active:scale-[0.99]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
