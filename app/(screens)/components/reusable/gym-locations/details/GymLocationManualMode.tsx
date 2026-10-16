import { NotePencil, CaretDown, NavigationArrow } from "@phosphor-icons/react";

interface GymLocationManualModeProps {
  address: string;
  onAddressChange: (val: string) => void;
  city: string;
  onCityChange: (val: string) => void;
  state: string;
  onStateChange: (val: string) => void;
  pincode: string;
  onPincodeChange: (val: string) => void;
  latitude: string;
  onLatitudeChange: (val: string) => void;
  longitude: string;
  onLongitudeChange: (val: string) => void;
  onPreviewMap?: () => void;
  title?: string;
  subtitle?: string;
}

export default function GymLocationManualMode({
  address,
  onAddressChange,
  city,
  onCityChange,
  state,
  onStateChange,
  pincode,
  onPincodeChange,
  latitude,
  onLatitudeChange,
  longitude,
  onLongitudeChange,
  onPreviewMap,
  title,
  subtitle,
}: GymLocationManualModeProps) {
  return (
    <div className="w-full bg-[#13151B] border border-[#232631] rounded-2xl p-4 sm:p-6 flex flex-col justify-between gap-5 shadow-sm h-full flex-1 min-w-0 max-w-full overflow-hidden">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#132A1E] border border-[#165330] text-[#22C55E] flex items-center justify-center shrink-0 shadow-inner">
            <NotePencil size={22} weight="fill" />
          </div>
          <div className="flex flex-col min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {title || "Enter Location Manually"}
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              {subtitle || "Fill in the gym's location details below."}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 mt-1">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-medium text-[#94A3B8]">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => onAddressChange(e.target.value)}
              placeholder="Enter street address"
              className="w-full h-[42px] px-3.5 py-2 bg-[#181A22] border border-[#242836] focus:border-[#D4FF32] rounded-xl text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-medium text-[#94A3B8]">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => onCityChange(e.target.value)}
                placeholder="City"
                className="w-full h-[42px] px-3.5 py-2 bg-[#181A22] border border-[#242836] focus:border-[#D4FF32] rounded-xl text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-medium text-[#94A3B8]">
                State
              </label>
              <div className="relative w-full">
                <select
                  value={state}
                  onChange={(e) => onStateChange(e.target.value)}
                  className="w-full h-[42px] px-3.5 pr-8 py-2 bg-[#181A22] border border-[#242836] focus:border-[#D4FF32] rounded-xl text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option value="Karnataka">Karnataka</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="West Bengal">West Bengal</option>
                </select>
                <CaretDown
                  size={14}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-medium text-[#94A3B8]">
              Pincode
            </label>
            <input
              type="text"
              value={pincode}
              onChange={(e) => onPincodeChange(e.target.value)}
              placeholder="Pincode"
              className="w-full h-[42px] px-3.5 py-2 bg-[#181A22] border border-[#242836] focus:border-[#D4FF32] rounded-xl text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-medium text-[#94A3B8]">
                Latitude
              </label>
              <input
                type="text"
                value={latitude}
                onChange={(e) => onLatitudeChange(e.target.value)}
                placeholder="e.g. 17.4355"
                className="w-full h-[42px] px-3.5 py-2 bg-[#181A22] border border-[#242836] focus:border-[#D4FF32] rounded-xl text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none transition-colors font-mono"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-medium text-[#94A3B8]">
                Longitude
              </label>
              <input
                type="text"
                value={longitude}
                onChange={(e) => onLongitudeChange(e.target.value)}
                placeholder="e.g. 78.4519"
                className="w-full h-[42px] px-3.5 py-2 bg-[#181A22] border border-[#242836] focus:border-[#D4FF32] rounded-xl text-xs sm:text-sm text-white placeholder-[#64748B] focus:outline-none transition-colors font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      {onPreviewMap && (
        <button
          type="button"
          onClick={onPreviewMap}
          className="w-full h-[42px] rounded-xl bg-[#181A22] hover:bg-[#202532] border border-[#282E40] hover:border-[#D4FF32] text-[#CBD5E1] hover:text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-[0.99] mt-2"
        >
          <NavigationArrow size={15} weight="bold" className="text-[#D4FF32]" />
          <span>Apply Coordinates & Preview on Map</span>
        </button>
      )}
    </div>
  );
}
