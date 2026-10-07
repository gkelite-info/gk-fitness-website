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

import { useUser } from "@/app/context/UserContext";
import { useBiometricDevicesPaginated, useDeleteBiometricDevice, useRestoreBiometricDevice } from "@/lib/hooks/biometrics/useBiometricDevices";

export default function BiometricClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { roleData } = useUser();
  const gymId = roleData?.[0]?.gymId;

  const activeTab = searchParams.get("tab") || "devices";
  const [activeDeviceTab, setActiveDeviceTab] = useState<'active' | 'inactive'>('active');
  const [currentPage, setCurrentPage] = useState(1);

  const [deviceToDelete, setDeviceToDelete] = useState<string | number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [deviceToRestore, setDeviceToRestore] = useState<string | number | null>(null);
  const [isRestoring, setIsRestoring] = useState(false);

  const itemsPerPage = 4;
  const { data: devicesData, isLoading } = useBiometricDevicesPaginated(gymId, currentPage, itemsPerPage, activeDeviceTab);

  const devices = devicesData?.data || [];
  const totalItems = devicesData?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const deleteDeviceMutation = useDeleteBiometricDevice();
  const restoreDeviceMutation = useRestoreBiometricDevice();

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
    if (!deviceToDelete || !gymId) return;
    setIsDeleting(true);

    deleteDeviceMutation.mutate(
      { deviceId: deviceToDelete.toString(), gymId },
      {
        onSuccess: () => {
          setIsDeleting(false);
          setDeviceToDelete(null);
          toast.success("Device deleted successfully", {
            style: {
              background: "#141720",
              color: "#fff",
              border: "1px solid #232834",
            }
          });
        },
        onError: (error) => {
          setIsDeleting(false);
          toast.error(error.message || "Failed to delete device", {
            style: {
              background: "#141720",
              color: "#fff",
              border: "1px solid #232834",
            }
          });
        }
      }
    );
  };

  const handleRestoreConfirm = () => {
    if (!deviceToRestore || !gymId) return;
    setIsRestoring(true);

    restoreDeviceMutation.mutate(
      { deviceId: deviceToRestore.toString(), gymId },
      {
        onSuccess: () => {
          setIsRestoring(false);
          setDeviceToRestore(null);
          toast.success("Device restored successfully", {
            style: {
              background: "#141720",
              color: "#fff",
              border: "1px solid #232834",
            }
          });
        },
        onError: (error) => {
          setIsRestoring(false);
          toast.error(error.message || "Failed to restore device", {
            style: {
              background: "#141720",
              color: "#fff",
              border: "1px solid #232834",
            }
          });
        }
      }
    );
  };

  return (
    <div className="flex flex-col items-start p-6 lg:p-8 gap-5 w-full max-w-7xl mx-auto h-full">
      <div className="flex flex-col items-start gap-1 w-full">
        <h2 className="font-sans font-extrabold text-[30px] leading-[36px] tracking-[-0.75px] text-white">
          Biometric Management
        </h2>
        <p className="font-sans font-normal text-sm leading-5 text-[#A1A1AA]">
          Manage your biometric devices, credentials, and logs.
        </p>
      </div>

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
                className={`flex flex-row justify-center items-center px-6 h-[42px] gap-2.5 rounded-xl border transition-colors cursor-pointer shrink-0 ${isActive
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full mt-3 gap-3">
            <h3 className="font-sans font-bold text-xl leading-7 tracking-[-0.5px] text-white">
              Registered Devices
            </h3>
            
            <div className="flex flex-row items-center bg-[#131720] border border-[#232834] rounded-lg p-1">
              <button
                onClick={() => { setActiveDeviceTab('active'); setCurrentPage(1); }}
                className={`px-4 py-1.5 rounded-md font-sans text-sm font-medium transition-colors ${
                  activeDeviceTab === 'active' 
                    ? 'bg-[#1D2230] text-white shadow-sm' 
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Active
              </button>
              <button
                onClick={() => { setActiveDeviceTab('inactive'); setCurrentPage(1); }}
                className={`px-4 py-1.5 rounded-md font-sans text-sm font-medium transition-colors ${
                  activeDeviceTab === 'inactive' 
                    ? 'bg-[#1D2230] text-white shadow-sm' 
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                Inactive
              </button>
            </div>
          </div>

          {/* Devices Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
            {isLoading ? (
              <div className="col-span-2 text-center text-[#94A3B8] py-8">Loading devices...</div>
            ) : devices.length === 0 ? (
              <div className="col-span-2 text-center text-[#94A3B8] py-8">No devices found.</div>
            ) : (
              devices.map((device: any) => (
                <DeviceCard
                  key={device.deviceId}
                  device={{
                    id: device.deviceId,
                    name: device.deviceName,
                    status: device.isActive ? "Active" : "Offline",
                    sn: device.deviceSerialNumber,
                    ip: `${device.deviceIp} : ${device.devicePort}`
                  }}
                  onEdit={activeDeviceTab === 'active' ? handleEdit : undefined}
                  onDelete={activeDeviceTab === 'active' ? setDeviceToDelete : undefined}
                  onRestore={activeDeviceTab === 'inactive' ? setDeviceToRestore : undefined}
                />
              ))
            )}
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

      <ConfirmationModal
        isOpen={deviceToRestore !== null}
        onClose={() => setDeviceToRestore(null)}
        onConfirm={handleRestoreConfirm}
        title="Restore Device"
        message="Are you sure you want to restore this device to active status?"
        confirmText="Restore Device"
        confirmingText="Restoring..."
        isConfirming={isRestoring}
        isDestructive={false}
      />
    </div>
  );
}
