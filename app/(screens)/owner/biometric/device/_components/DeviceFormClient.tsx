"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CaretLeft } from "@phosphor-icons/react/dist/ssr";
import toast from "react-hot-toast";
import { useUser } from "@/app/context/UserContext";
import { useBiometricDevices, useSaveBiometricDevice } from "@/lib/hooks/biometrics/useBiometricDevices";
import { useEffect } from "react";
import type { DeviceType } from "@/lib/helpers/biometrics/biometricDeviceAPI";

export default function DeviceFormClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const id = searchParams.get("id");
  const isEdit = mode === "edit";

  const { roleData, user } = useUser();
  const gymId = roleData?.[0]?.gymId;

  const { data: devices } = useBiometricDevices(gymId);
  const saveDevice = useSaveBiometricDevice();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    deviceName: "",
    deviceSerialNumber: "",
    deviceIp: "",
    devicePort: "80",
    deviceUsername: "",
    devicePassword: "",
    deviceType: "multi" as DeviceType,
  });

  useEffect(() => {
    if (isEdit && id && devices) {
      const device = devices.find((d: any) => d.deviceId === id);
      if (device) {
        setFormData({
          deviceName: device.deviceName || "",
          deviceSerialNumber: device.deviceSerialNumber || "",
          deviceIp: device.deviceIp || "",
          devicePort: device.devicePort?.toString() || "80",
          deviceUsername: device.deviceUsername || "",
          devicePassword: device.devicePassword || "",
          deviceType: device.deviceType || "multi",
        });
      }
    }
  }, [isEdit, id, devices]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!gymId || !user?.id) return;
    if (!formData.deviceName || !formData.deviceSerialNumber || !formData.deviceIp) {
      toast.error("Please fill required fields (Name, Serial No, IP).");
      return;
    }

    setIsLoading(true);
    saveDevice.mutate(
      {
        gymId,
        deviceId: isEdit && id ? id : undefined,
        createdBy: user.id,
        ...formData,
        devicePort: parseInt(formData.devicePort) || 80,
      },
      {
        onSuccess: () => {
          setIsLoading(false);
          toast.success(isEdit ? "Device updated successfully" : "Device added successfully", {
            style: {
              background: "#141720",
              color: "#fff",
              border: "1px solid #232834",
            },
          });
          router.back();
        },
        onError: (error) => {
          setIsLoading(false);
          toast.error(error.message || "Failed to save device");
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-start p-6 lg:p-8 gap-7 w-full max-w-5xl mx-auto h-full">
      <div className="flex flex-row items-center gap-3 w-full">
        <button
          onClick={() => router.back()}
          className="flex justify-center items-center w-8 h-8 sm:w-9 sm:h-9 bg-[#141822] border border-[#272E3D] rounded-lg shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#1A1F2B] transition-colors cursor-pointer shrink-0"
        >
          <CaretLeft size={16} className="text-[#CBD5E1]" weight="bold" />
        </button>
        <h1 className="font-sans font-bold text-xl sm:text-2xl leading-7 sm:leading-8 tracking-[-0.6px] text-white">
          Biometric Management
        </h1>
      </div>

      <div className="flex flex-col items-start p-6 sm:p-9 gap-8 w-full bg-[#10141D] border border-[#1D2433] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] rounded-2xl relative">
        <h2 className="font-sans font-bold text-lg sm:text-xl leading-7 tracking-[-0.5px] text-white w-full">
          {isEdit ? "Edit Device" : "Add Device"}
        </h2>

        <div className="flex flex-col items-start gap-6 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7 w-full">
            <div className="flex flex-col items-start gap-2.5 w-full">
              <label className="font-sans font-medium text-[13px] sm:text-sm leading-5 text-[#CBD5E1]">
                Device Name
              </label>
              <input
                type="text"
                name="deviceName"
                value={formData.deviceName}
                onChange={handleChange}
                autoComplete="off"
                placeholder="Main Entrance Device"
                className="w-full h-11 sm:h-[50px] bg-[#131924] border border-[#20293A] rounded-xl px-4 font-sans font-normal text-[13px] sm:text-sm text-[#F1F5F9] placeholder:text-[13px] sm:placeholder:text-sm placeholder-[#475569] outline-none focus:border-[#38BDF8] transition-colors"
              />
            </div>
            <div className="flex flex-col items-start gap-2.5 w-full">
              <label className="font-sans font-medium text-[13px] sm:text-sm leading-5 text-[#CBD5E1]">
                Serial Number
              </label>
              <input
                type="text"
                name="deviceSerialNumber"
                value={formData.deviceSerialNumber}
                onChange={handleChange}
                autoComplete="off"
                placeholder="Enter Device Serial No"
                className="w-full h-11 sm:h-[50px] bg-[#131924] border border-[#20293A] rounded-xl px-4 font-sans font-normal text-[13px] sm:text-sm text-[#F1F5F9] placeholder:text-[13px] sm:placeholder:text-sm placeholder-[#475569] outline-none focus:border-[#38BDF8] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7 w-full">
            <div className="flex flex-col items-start gap-2.5 w-full">
              <label className="font-sans font-medium text-[13px] sm:text-sm leading-5 text-[#CBD5E1]">
                IP Address
              </label>
              <input
                type="text"
                name="deviceIp"
                value={formData.deviceIp}
                onChange={handleChange}
                autoComplete="off"
                placeholder="e.g. 192.168.1.201"
                className="w-full h-11 sm:h-[50px] bg-[#131924] border border-[#20293A] rounded-xl px-4 font-sans font-normal text-[13px] sm:text-sm text-[#F1F5F9] placeholder:text-[13px] sm:placeholder:text-sm placeholder-[#475569] outline-none focus:border-[#38BDF8] transition-colors"
              />
            </div>
            <div className="flex flex-col items-start gap-2.5 w-full">
              <label className="font-sans font-medium text-[13px] sm:text-sm leading-5 text-[#CBD5E1]">
                Port
              </label>
              <input
                type="text"
                name="devicePort"
                value={formData.devicePort}
                onChange={handleChange}
                autoComplete="off"
                placeholder="80"
                className="w-full h-11 sm:h-[50px] bg-[#131924] border border-[#20293A] rounded-xl px-4 font-sans font-normal text-[13px] sm:text-sm text-[#F1F5F9] placeholder:text-[13px] sm:placeholder:text-sm placeholder-[#475569] outline-none focus:border-[#38BDF8] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7 w-full pb-2">
            <div className="flex flex-col items-start gap-2.5 w-full">
              <label className="font-sans font-medium text-[13px] sm:text-sm leading-5 text-[#CBD5E1]">
                Username (Hikvision/ZKTeco)
              </label>
              <input
                type="text"
                name="deviceUsername"
                value={formData.deviceUsername}
                onChange={handleChange}
                autoComplete="new-password"
                placeholder="admin"
                className="w-full h-11 sm:h-[50px] bg-[#131924] border border-[#20293A] rounded-xl px-4 font-sans font-normal text-[13px] sm:text-sm text-[#F1F5F9] placeholder:text-[13px] sm:placeholder:text-sm placeholder-[#475569] outline-none focus:border-[#38BDF8] transition-colors"
              />
            </div>
            <div className="flex flex-col items-start gap-2.5 w-full">
              <label className="font-sans font-medium text-[13px] sm:text-sm leading-5 text-[#CBD5E1]">
                Password
              </label>
              <input
                type="password"
                name="devicePassword"
                value={formData.devicePassword}
                onChange={handleChange}
                autoComplete="new-password"
                placeholder="Enter Device Password"
                className="w-full h-11 sm:h-[50px] bg-[#131924] border border-[#20293A] rounded-xl px-4 font-sans font-normal text-[13px] sm:text-sm text-[#F1F5F9] placeholder:text-[13px] sm:placeholder:text-sm placeholder-[#475569] outline-none focus:border-[#38BDF8] transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#1C2433] mt-2" />

        <div className="flex flex-col sm:flex-row justify-end items-center gap-3 w-full mt-2">
          <button
            onClick={() => router.back()}
            disabled={isLoading}
            className="flex justify-center items-center px-6 py-2.5 sm:px-8 sm:py-3 bg-[#1C2331] border border-[#252E3F] rounded-xl font-sans font-semibold text-[13px] sm:text-sm leading-5 text-[#E2E8F0] hover:bg-[#252E3F] transition-colors cursor-pointer w-full sm:w-auto disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="flex justify-center items-center px-8 py-2.5 sm:px-10 sm:py-3 bg-[#D2F800] rounded-xl shadow-[0px_4px_6px_-1px_rgba(210,248,0,0.1),0px_2px_4px_-2px_rgba(210,248,0,0.1)] font-sans font-bold text-[13px] sm:text-sm leading-5 text-black hover:bg-[#d4ff32] transition-colors cursor-pointer w-full sm:w-auto disabled:opacity-50"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
