import { FloppyDisk, Clock, MapPin, CheckCircle, NavigationArrow } from "@phosphor-icons/react";

interface GymLocationSideActionsProps {
  onSave: () => void;
  onCancel: () => void;
  isSaving?: boolean;
  latitude?: string;
  longitude?: string;
  city?: string;
}

export default function GymLocationSideActions({
  onSave,
  onCancel,
  isSaving = false,
  latitude = "12.9716",
  longitude = "77.5946",
  city = "Bangalore",
}: GymLocationSideActionsProps) {
  const numLat = parseFloat(latitude) || 12.9716;
  const numLng = parseFloat(longitude) || 77.5946;

  return (
    <div className="w-full flex flex-col gap-4 sm:gap-5 min-w-0 max-w-full">
      <div className="w-full bg-[#13151B] border border-[#232631] rounded-2xl p-4 sm:p-5 flex flex-col gap-4 shadow-sm min-w-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#132A1E] border border-[#165330] text-[#22C55E] flex items-center justify-center shrink-0 shadow-inner">
            <FloppyDisk size={22} weight="fill" />
          </div>
          <div className="flex flex-col min-w-0">
            <h3 className="text-base font-bold text-white tracking-tight">
              Save Location
            </h3>
            <p className="text-xs text-[#94A3B8]">
              Review the detected location and save it for this gym.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between py-2 border-y border-[#1E222D]">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-[#94A3B8]">
            <Clock size={16} weight="regular" className="text-[#94A3B8] shrink-0" />
            <span className="font-medium">Location Status</span>
          </div>

          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[rgba(245,158,11,0.12)] border border-[rgba(245,158,11,0.25)] text-[#F59E0B]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] shrink-0" />
            Pending Save
          </span>
        </div>

        <div className="flex items-center justify-between px-3.5 py-2.5 bg-[#0D0F14] border border-[#1E2330] rounded-xl text-xs">
          <div className="flex items-center gap-2 text-[#94A3B8]">
            <NavigationArrow size={14} weight="bold" className="text-[#D4FF32]" />
            <span>Target Point ({city})</span>
          </div>
          <span className="text-white font-mono font-semibold">
            {numLat.toFixed(4)}, {numLng.toFixed(4)}
          </span>
        </div>

        <div className="flex flex-col gap-2.5 pt-1">
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="w-full h-[42px] rounded-xl bg-[#D4FF32] hover:bg-[#c5ec2b] text-black text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_15px_rgba(212,255,50,0.25)] active:scale-[0.99] disabled:opacity-75"
          >
            <FloppyDisk size={16} weight="bold" />
            <span>{isSaving ? "Saving..." : "Save Location"}</span>
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="w-full h-[42px] rounded-xl border border-[#232631] hover:border-[#383D4E] hover:bg-[#181A22] text-white text-xs sm:text-sm font-semibold flex items-center justify-center transition-all cursor-pointer active:scale-[0.99]"
          >
            Cancel
          </button>
        </div>
      </div>

      <div className="w-full bg-[#13151B] border border-[#232631] rounded-2xl p-4 sm:p-5 flex flex-col gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#132A1E] border border-[#165330] text-[#22C55E] flex items-center justify-center shrink-0 shadow-inner">
            <MapPin size={22} weight="fill" />
          </div>
          <div className="flex flex-col min-w-0">
            <h3 className="text-base font-bold text-white tracking-tight">
              Enable Nearby Gyms
            </h3>
            <span className="text-[11px] text-[#22C55E] font-medium">Active upon saving</span>
          </div>
        </div>

        <p className="text-xs text-[#94A3B8] leading-relaxed">
          This location will be indexed for the Nearby Gyms feature in the customer portal, helping users find this gym on the map.
        </p>

        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1E222D]">
          <div className="flex items-center gap-1.5 text-[11px] text-[#94A3B8]">
            <CheckCircle size={14} weight="fill" className="text-[#22C55E] shrink-0" />
            <span>15km Search Radius</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#94A3B8]">
            <CheckCircle size={14} weight="fill" className="text-[#22C55E] shrink-0" />
            <span>Live Navigation</span>
          </div>
        </div>
      </div>
    </div>
  );
}
