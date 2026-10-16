"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, NavigationArrow, PencilSimple, Check } from "@phosphor-icons/react";
import GymLocationSummaryBanner from "./GymLocationSummaryBanner";
import GymLocationCaptureMode from "./GymLocationCaptureMode";
import GymLocationManualMode from "./GymLocationManualMode";
import GymLocationSideActions from "./GymLocationSideActions";
import ViewEditGymLocation from "./ViewEditGymLocation";
import { getGymLocationById, updateGymLocation } from "../gymLocationsData";
import { GymLocationItem } from "../gymLocationsTypes";

interface AddGymLocationViewProps {
  gymId: string;
}

export default function AddGymLocationView({ gymId }: AddGymLocationViewProps) {
  const router = useRouter();
  const [gym, setGym] = useState<GymLocationItem>(() => getGymLocationById(gymId));

  const [activeTab, setActiveTab] = useState<"current" | "manual">("current");
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [address, setAddress] = useState(gym.address || "12, Residency Road, Ashok Nagar");
  const [city, setCity] = useState(gym.city || "Bangalore");
  const [state, setState] = useState(gym.state || "Karnataka");
  const [pincode, setPincode] = useState(gym.pincode || "560025");
  const [latitude, setLatitude] = useState(gym.latitude?.toString() || "12.9716");
  const [longitude, setLongitude] = useState(gym.longitude?.toString() || "77.5946");

  if (gym.status === "added") {
    return <ViewEditGymLocation gym={gym} />;
  }

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
            Add Gym Location
          </h1>
          <p className="text-xs sm:text-sm text-[#94A3B8] font-normal mt-0.5">
            {activeTab === "current"
              ? "Capture and save the current location for the selected gym."
              : "Manually enter the gym location details for the selected gym."}
          </p>
        </div>
      </div>

      <GymLocationSummaryBanner gym={gym} />

      {saveSuccess && (
        <div className="w-full bg-[#102B20] border border-[#165330] rounded-xl p-3.5 flex items-center gap-2.5 text-[#22C55E] text-xs sm:text-sm font-semibold animate-in fade-in duration-200">
          <Check size={18} weight="bold" />
          <span>Location saved successfully! Redirecting to Gym Locations...</span>
        </div>
      )}

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-8 w-full min-w-0 flex flex-col gap-4 h-full">
          <div className="w-full bg-[#13151B] border border-[#232631] rounded-2xl p-1.5 grid grid-cols-2 gap-1.5 sm:gap-2 min-w-0 max-w-full">
            <button
              type="button"
              onClick={() => setActiveTab("current")}
              className={`w-full min-h-[44px] sm:h-[46px] px-2 sm:px-4 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer select-none min-w-0 ${
                activeTab === "current"
                  ? "bg-[#D4FF32] text-black shadow-[0_0_15px_rgba(212,255,50,0.25)]"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              <NavigationArrow size={16} weight={activeTab === "current" ? "fill" : "regular"} className="shrink-0" />
              <span className="whitespace-nowrap font-bold text-xs sm:text-sm">
                <span className="hidden sm:inline">Use Current Location</span>
                <span className="sm:hidden">Current Location</span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("manual")}
              className={`w-full min-h-[44px] sm:h-[46px] px-2 sm:px-4 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 transition-all cursor-pointer select-none min-w-0 ${
                activeTab === "manual"
                  ? "bg-[#D4FF32] text-black shadow-[0_0_15px_rgba(212,255,50,0.25)]"
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              <PencilSimple size={16} weight={activeTab === "manual" ? "fill" : "bold"} className="shrink-0" />
              <span className="whitespace-nowrap font-bold text-xs sm:text-sm">
                Enter Manually
              </span>
            </button>
          </div>

          <div className="flex-1 flex flex-col min-w-0 h-full">
            {activeTab === "current" ? (
              <GymLocationCaptureMode
                address={address}
                latitude={parseFloat(latitude) || 12.9716}
                longitude={parseFloat(longitude) || 77.5946}
                onCapture={handleCaptureLocation}
              />
            ) : (
              <GymLocationManualMode
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
                onPreviewMap={() => setActiveTab("current")}
              />
            )}
          </div>
        </div>

        <div className="lg:col-span-4 w-full min-w-0 flex flex-col">
          <GymLocationSideActions
            onSave={handleSave}
            onCancel={handleCancel}
            isSaving={isSaving}
            latitude={latitude}
            longitude={longitude}
            city={city}
          />
        </div>
      </div>
    </div>
  );
}
