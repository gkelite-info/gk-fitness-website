"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Plus, Fingerprint, Key, ClockCountdown } from "@phosphor-icons/react/dist/ssr";
import DeviceCard, { DeviceData } from "./DeviceCard";
import Pagination from "../../../components/reusable/Pagination";
import ConfirmationModal from "../../../components/reusable/ConfirmationModal";
import toast from "react-hot-toast";
import CredentialsTab from "./CredentialsTab";
import LogsTab from "./LogsTab";

const initialDevices: DeviceData[] = [
  { id: 1, name: "Main Entrance Device", status: "Active", sn: "DS-K1T320EFWX20241227V030520ENGE4865446", ip: "192.168.1.2 : 80" },
  { id: 2, name: "Reception Device", status: "Active", sn: "DS-K1T671MFWX20230814V00128C2F90672148", ip: "192.168.1.3 : 80" },
  { id: 3, name: "Workout Floor Device", status: "Offline", sn: "DS-K1T320MFWX20240111V00466A2D3F778901", ip: "192.168.1.4 : 80" },
  { id: 4, name: "Locker Room Device", status: "Active", sn: "DS-K1T671EFWX20230905V00284B7E2D991003", ip: "192.168.1.5 : 80" },
];

export default function BiometricClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const activeTab = searchParams.get("tab") || "devices";
  const [currentPage, setCurrentPage] = useState(1);
  const [devices, setDevices] = useState(initialDevices);
  
  // Modal state
  const [deviceToDelete, setDeviceToDelete] = useState<string | number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const itemsPerPage = 4;
  const totalItems = devices.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const TABS = [
    { id: "devices", label: "Devices", icon: Fingerprint },
    { id: "credentials", label: "Credentials", icon: Key },
    { id: "logs", label: "Logs", icon: ClockCountdown },
  ];

  const handleEdit = (id: string | number) => {
    router.push(`/owner/biometric/device?mode=edit&id=${id}`);
  };

  const handleAddDevice = () => {
    router.push(`/owner/biometric/device?mode=add`);
  };

  const handleDeleteConfirm = () => {
    if (deviceToDelete === null) return;
    setIsDeleting(true);
    
    // Simulate API call
    setTimeout(() => {
      setDevices(prev => prev.filter(d => d.id !== deviceToDelete));
      setIsDeleting(false);
      setDeviceToDelete(null);
      toast.success("Device deleted successfully", {
        style: {
          background: "#141720",
          color: "#fff",
          border: "1px solid #232834",
        }
      });
    }, 1000);
  };

  return (
    <div className="flex flex-col items-start p-6 lg:p-8 gap-5 w-full max-w-7xl mx-auto h-full">
      {/* Title Section */}
      <div className="flex flex-col items-start gap-1 w-full">
        <h2 className="font-sans font-extrabold text-[30px] leading-[36px] tracking-[-0.75px] text-white">
          Biometric Management
        </h2>
        <p className="font-sans font-normal text-sm leading-5 text-[#A1A1AA]">
          Manage your biometric devices, credentials, and logs.
        </p>
      </div>

      {/* Tabs and Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4 mt-2 overflow-hidden">
        <div className="flex flex-row items-center gap-3 w-full sm:w-auto overflow-x-auto flex-nowrap scrollbar-hide no-scrollbar pb-1 sm:pb-0">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("tab", tab.id);
                  router.push(`${pathname}?${params.toString()}`, { scroll: false });
                }}
                className={`flex flex-row justify-center items-center px-6 h-[42px] gap-2.5 rounded-xl border transition-colors cursor-pointer shrink-0 ${
                  isActive
                    ? "bg-[#CBF813] border-[#CBF813] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] text-black"
                    : "bg-[rgba(18,21,28,0.6)] border-[#232834] text-[#D4D4D8] hover:bg-[#1A1F2B]"
                }`}
              >
                <Icon size={16} weight={isActive ? "bold" : "regular"} className={isActive ? "text-black" : "text-[#D4D4D8]"} />
                <span className={`font-sans text-sm leading-5 ${isActive ? "font-semibold" : "font-medium"}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        <button 
          onClick={handleAddDevice}
          className="flex flex-row justify-center items-center px-5 h-[42px] gap-1.5 bg-[#CBF813] border border-[#CBF813] rounded-xl shadow-[0px_1px_2px_rgba(0,0,0,0.05)] hover:bg-[#d4ff32] hover:border-[#d4ff32] transition-colors cursor-pointer shrink-0 w-full sm:w-auto"
        >
          <Plus size={16} color="#000000" weight="bold" />
          <span className="font-sans font-semibold text-sm leading-5 text-black">
            Add Device
          </span>
        </button>
      </div>

      {/* Registered Devices Header */}
      {activeTab === "devices" && (
        <>
          <div className="flex flex-row items-center w-full mt-3">
            <h3 className="font-sans font-bold text-xl leading-7 tracking-[-0.5px] text-white">
              Registered Devices
            </h3>
          </div>

          {/* Devices Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
            {devices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((device) => (
              <DeviceCard 
                key={device.id} 
                device={device} 
                onEdit={handleEdit}
                onDelete={setDeviceToDelete}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {activeTab === "credentials" && (
        <CredentialsTab />
      )}

      {activeTab === "logs" && (
        <LogsTab />
      )}

      <ConfirmationModal
        isOpen={deviceToDelete !== null}
        onClose={() => setDeviceToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Device"
        message="Are you sure you want to delete this device? This action cannot be undone."
        confirmText="Delete Device"
        confirmingText="Deleting..."
        isConfirming={isDeleting}
        isDestructive={true}
      />
    </div>
  );
}
