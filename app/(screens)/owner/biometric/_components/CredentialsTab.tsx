"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { MagnifyingGlass, Fingerprint, UserFocus } from "@phosphor-icons/react/dist/ssr";
import ConfirmationModal from "../../../components/reusable/ConfirmationModal";
import Pagination from "../../../components/reusable/Pagination";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import { CredentialUser } from "./types";
import EnrollmentModal from "./modals/EnrollmentModal";
import EnrolledUserDetailModal from "./modals/EnrolledUserDetailModal";
import RegisterFingerprintModal from "./modals/RegisterFingerprintModal";
import RegisterFaceModal from "./modals/RegisterFaceModal";

import { useUser } from "@/app/context/UserContext";
import { useBiometricCredentials, useSaveBiometricCredential, useDeleteBiometricCredential } from "@/lib/hooks/biometrics/useBiometricCredentials";
import { useBiometricDevices } from "@/lib/hooks/biometrics/useBiometricDevices";
import { useGymCustomers } from "@/lib/hooks/customers/useGymCustomers";
import { useGymCustomerMembershipPlans } from "@/lib/hooks/gymCustomerMembershipPlans/useGymCustomerMembershipPlans";
import { serverRegisterUserOnDevice, serverDeleteUserOnDevice, serverCaptureFingerprintOnDevice, serverUploadFaceToDevice, serverDeleteFaceFromDevice } from "@/app/actions/biometricDeviceActions";


export default function CredentialsTab() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { roleData } = useUser();
  const gymId = roleData?.[0]?.gymId;

  const { data: customersRaw, isLoading: custLoading } = useGymCustomers(gymId);
  const { data: credsRaw, isLoading: credsLoading } = useBiometricCredentials(gymId);
  const { data: devicesRaw } = useBiometricDevices(gymId);
  const { data: plansData } = useGymCustomerMembershipPlans(gymId);
  const saveMutation = useSaveBiometricCredential();
  const deleteMutation = useDeleteBiometricCredential();

  const parseBool = (val: any): boolean => {
    if (val === true || val === 1 || val === "true" || val === "1") return true;
    return false;
  };

  const users: (CredentialUser & { credentialId: string | null })[] = useMemo(() => {
    if (!customersRaw) return [];
    return customersRaw.map((cust: any) => {
      const creds = credsRaw?.filter((c: any) => c.customerId === cust.customerId && !c.is_deleted) || [];
      const cred = creds[0];
      const hasFace = creds.some((c: any) => parseBool(c.hasFace) || parseBool(c.has_face));
      const hasFingerprint = creds.some((c: any) => parseBool(c.hasFingerprint) || parseBool(c.has_fingerprint));

      let enrolledType: "fingerprint" | "face" | null = null;
      if (creds.length > 0) {
        if (hasFace) enrolledType = "face";
        else enrolledType = "fingerprint";
      }
      return {
        id: cust.customerId,
        name: cust.fullName,
        phone: cust.phone,
        deviceUserId: cred ? cred.deviceUserId : null,
        credentialId: cred ? cred.credentialId : null,
        enrolledType,
        hasFingerprint,
        hasFace,
        credentials: creds,
      };
    });
  }, [customersRaw, credsRaw]);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearch(searchInput);
      setCurrentPage(1);
    }, 600);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const [enrollUser, setEnrollUser] = useState<CredentialUser | null>(null);

  const detailId = searchParams.get("detail");
  const registerType = searchParams.get("register");

  const detailUser = users.find(u => u.id === detailId) || null;
  const [unenrollUser, setUnenrollUser] = useState<CredentialUser | null>(null);

  const filteredData = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || (u.phone && u.phone.includes(search)));
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;

  const handleEnroll = async (enrollments: { deviceId: string; deviceUserId: string }[]) => {
    if (!enrollUser || !gymId) return;

    const customerPlans = plansData?.filter((p: any) => p.customerId === enrollUser.id);
    const hasActivePlan = customerPlans?.some((p: any) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const endDate = new Date(p.endDate);
      endDate.setHours(0, 0, 0, 0);
      return endDate >= today;
    });

    if (!hasActivePlan) {
      setEnrollUser(null);
      setTimeout(() => {
        toast.error("No active plan", {
          style: { background: "#141720", color: "#fff", border: "1px solid #232834" }
        });
      }, 600);
      return;
    }

    let successCount = 0;

    for (const enrollment of enrollments) {
      const device = devicesRaw?.find(d => d.deviceId === enrollment.deviceId);
      if (!device) continue;

      try {
        await serverRegisterUserOnDevice({
          ip: device.deviceIp,
          port: device.devicePort,
          devIndex: device.deviceId,
          username: device.deviceUsername || undefined,
          password: device.devicePassword || undefined,
          employeeNo: enrollment.deviceUserId,
          name: enrollUser.name
        });

        await saveMutation.mutateAsync({
          gymId,
          customerId: enrollUser.id,
          deviceId: device.deviceId,
          deviceUserId: enrollment.deviceUserId,
          hasFingerprint: false,
        });

        successCount++;
      } catch (err: any) {
        toast.error(`Device ${device.deviceName || device.deviceIp} error: ${err.message}`);
      }
    }

    if (successCount > 0) {
      toast.success(`${enrollUser.name} successfully enrolled in ${successCount} device(s)!`, {
        style: { background: "#141720", color: "#fff", border: "1px solid #232834" }
      });
      setEnrollUser(null);
    }
  };

  const handleUnenrollClick = () => {
    if (detailUser) {
      setUnenrollUser(detailUser);
    }
  };

  const confirmUnenroll = async () => {
    if (!unenrollUser || !gymId) return;
    const userToUnenroll = users.find(u => u.id === unenrollUser.id);
    if (!userToUnenroll?.credentialId) return;

    try {
      const response = await fetch('/api/biometric/device/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          credentialId: userToUnenroll.credentialId,
          gymId: gymId,
          deviceUserId: userToUnenroll.deviceUserId
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to unenroll user from device");
      }

      toast.success("User removed from biometric device", {
        style: { background: "#141720", color: "#fff", border: "1px solid #232834" }
      });
    } catch (err: any) {
      toast.error("Device error: " + err.message);
      console.error("Failed to delete on device", err);
      return;
    }

    deleteMutation.mutate({ credentialId: userToUnenroll.credentialId, gymId }, {
      onSuccess: () => {
        toast.success(`${unenrollUser.name} unenrolled successfully!`, {
          style: { background: "#141720", color: "#fff", border: "1px solid #232834" }
        });
        setUnenrollUser(null);
        closeDetail();
      },
      onError: (err) => {
        toast.error(err.message || "Failed to unenroll user");
      }
    });
  };

  const openDetail = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("detail", id);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const closeDetail = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("detail");
    params.delete("register");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const openRegister = (type: "fingerprint" | "face") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("register", type);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const closeRegister = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("register");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleUploadFingerprint = async () => {
    if (!detailUser || !detailUser.credentials || detailUser.credentials.length === 0) return;

    let successCount = 0;
    for (const cred of detailUser.credentials) {
      const device = devicesRaw?.find(d => d.deviceId === cred.deviceId);
      if (!device) continue;

      try {
        await serverRegisterUserOnDevice({
          ip: device.deviceIp,
          port: device.devicePort,
          devIndex: device.deviceId,
          username: device.deviceUsername || undefined,
          password: device.devicePassword || undefined,
          employeeNo: cred.deviceUserId,
          name: detailUser.name
        });

        await serverCaptureFingerprintOnDevice({
          ip: device.deviceIp,
          port: device.devicePort,
          devIndex: device.deviceId,
          username: device.deviceUsername || undefined,
          password: device.devicePassword || undefined,
          employeeNo: cred.deviceUserId,
          fingerPrintID: cred.fingerPrintID || 1
        });

        await saveMutation.mutateAsync({
          gymId: cred.gymId,
          customerId: cred.customerId,
          deviceId: cred.deviceId,
          deviceUserId: cred.deviceUserId,
          credentialId: cred.credentialId,
          hasFingerprint: true,
          hasFace: cred.hasFace,
          hasCard: cred.hasCard,
          rfidCardNo: cred.rfidCardNo,
        });

        successCount++;
      } catch (err: any) {
        toast.error(`Device ${device.deviceName || device.deviceIp} error: ${err.message}`);
      }
    }

    if (successCount > 0) {
      toast.success(`Fingerprint registered successfully on ${successCount} device(s)!`, {
        style: { background: "#141720", color: "#fff", border: "1px solid #232834" }
      });
      closeRegister();
    }
  };

  const handleUploadFace = async (imageUrl: string) => {
    if (!detailUser || !detailUser.credentials || detailUser.credentials.length === 0) return;

    let successCount = 0;
    for (const cred of detailUser.credentials) {
      const device = devicesRaw?.find(d => d.deviceId === cred.deviceId);
      if (!device) continue;

      try {
        await serverRegisterUserOnDevice({
          ip: device.deviceIp,
          port: device.devicePort,
          devIndex: device.deviceId,
          username: device.deviceUsername || undefined,
          password: device.devicePassword || undefined,
          employeeNo: cred.deviceUserId,
          name: detailUser.name
        });

        await serverUploadFaceToDevice({
          ip: device.deviceIp,
          port: device.devicePort,
          devIndex: device.deviceId,
          username: device.deviceUsername || undefined,
          password: device.devicePassword || undefined,
          employeeNo: cred.deviceUserId,
          imageUri: imageUrl,
        });

        await saveMutation.mutateAsync({
          ...cred,
          hasFace: true,
        });

        successCount++;
      } catch (err: any) {
        let msg = err.message || "Failed to register face.";
        toast.error(`Device ${device.deviceName || device.deviceIp} error: ${msg}`);
      }
    }

    if (successCount > 0) {
      toast.success(`Face registered successfully on ${successCount} device(s)!`, {
        style: { background: "#141720", color: "#fff", border: "1px solid #232834" }
      });
      closeRegister();
    }
  };

  const handleDeleteFace = async () => {
    if (!detailUser || !detailUser.credentials || detailUser.credentials.length === 0) return;

    let successCount = 0;
    for (const cred of detailUser.credentials) {
      const device = devicesRaw?.find(d => d.deviceId === cred.deviceId);
      if (!device) continue;

      try {
        await serverDeleteFaceFromDevice({
          ip: device.deviceIp,
          port: device.devicePort,
          devIndex: device.deviceId,
          username: device.deviceUsername || undefined,
          password: device.devicePassword || undefined,
          employeeNo: cred.deviceUserId
        });

        await saveMutation.mutateAsync({
          ...cred,
          hasFace: false,
        });

        successCount++;
      } catch (err: any) {
        toast.error(`Device ${device.deviceName || device.deviceIp} error: ${err.message}`);
      }
    }

    if (successCount > 0) {
      toast.success(`Face removed successfully from ${successCount} device(s)!`, {
        style: { background: "#141720", color: "#fff", border: "1px solid #232834" }
      });
      closeRegister();
    }
  };

  return (
    <div className="flex flex-col w-full gap-6 mt-4">
      <div className="flex flex-row items-center w-full bg-[#141720] border border-[#202532] rounded-2xl px-4 sm:px-5 h-11 sm:h-[46px] gap-3 focus-within:border-[#38BDF8] transition-colors shadow-sm">
        <MagnifyingGlass size={18} color="#A1A1AA" />
        <input
          type="text"
          placeholder="Search customers..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none font-sans font-normal text-[13px] text-white placeholder:text-[#475569] h-full"
        />
      </div>

      <div className="flex flex-col w-full gap-3 sm:gap-4">
        {currentData.length > 0 ? (
          currentData.map(user => {
            const isEnrolled = user.enrolledType !== null;
            return (
              <div key={user.id} className="flex flex-row justify-between items-center p-5 bg-[#141720] border border-[#202532] rounded-2xl w-full hover:bg-[#181B26] transition-colors">
                <div className="flex flex-col items-start gap-1.5 min-w-0 flex-1 pr-4">
                  <h4 className="font-sans font-bold text-[14px] sm:text-[15px] leading-5 text-white truncate w-full">
                    {user.name}
                  </h4>
                  <div className="flex flex-col items-start gap-[2px]">
                    <span className="font-sans font-medium text-[11px] sm:text-xs leading-4 text-[#A1A1AA]">
                      {user.phone}
                    </span>
                    <span className="font-sans font-medium text-[11px] sm:text-xs leading-4 text-[#64748B]">
                      Device user ID: {isEnrolled ? user.deviceUserId : "—"}
                    </span>
                  </div>
                </div>

                {isEnrolled ? (
                  <div
                    onClick={() => openDetail(user.id)}
                    className="flex flex-row justify-center items-center px-3 py-1.5 sm:py-2 gap-1.5 sm:gap-2 bg-[rgba(210,248,0,0.05)] border border-[rgba(210,248,0,0.15)] rounded-xl shrink-0 cursor-pointer hover:bg-[rgba(210,248,0,0.1)] transition-colors"
                  >
                    {user.enrolledType === "fingerprint" ? (
                      <Fingerprint size={14} className="text-[#D2F800]" weight="bold" />
                    ) : (
                      <UserFocus size={14} className="text-[#D2F800]" weight="bold" />
                    )}
                    <span className="font-sans font-semibold text-[12px] sm:text-[13px] leading-5 text-[#D2F800]">
                      Enrolled
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={() => setEnrollUser(user)}
                    className="flex justify-center items-center px-4 sm:px-5 py-1.5 sm:py-2 bg-[#232834] border border-[#323842] rounded-xl hover:bg-[#2A303D] transition-colors cursor-pointer shrink-0"
                  >
                    <span className="font-sans font-medium text-[12px] sm:text-[13px] leading-5 text-white">
                      Enroll
                    </span>
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <div className="flex items-center justify-center w-full py-10 border border-[#202532] border-dashed rounded-2xl">
            <span className="font-sans text-[#64748B] text-sm">No customers found.</span>
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      <AnimatePresence>
        {enrollUser && (
          <EnrollmentModal user={enrollUser} devices={devicesRaw?.filter(d => d.isActive) || []} onClose={() => setEnrollUser(null)} onEnroll={handleEnroll} />
        )}
        {detailUser && !registerType && (
          <EnrolledUserDetailModal user={detailUser} onClose={closeDetail} onUnenroll={handleUnenrollClick} onRegister={openRegister} />
        )}
        {detailUser && registerType === "fingerprint" && (
          <RegisterFingerprintModal user={detailUser} onClose={closeRegister} onCapture={handleUploadFingerprint} />
        )}
        {detailUser && registerType === "face" && (
          <RegisterFaceModal user={detailUser} onClose={closeRegister} onCapture={handleUploadFace} onDelete={handleDeleteFace} />
        )}
      </AnimatePresence>

      <ConfirmationModal
        isOpen={unenrollUser !== null}
        onClose={() => setUnenrollUser(null)}
        onConfirm={confirmUnenroll}
        title="Unenroll User"
        message={`Are you sure you want to unenroll ${unenrollUser?.name}? This action will remove their device access and credentials.`}
        confirmText="Unenroll"
        confirmingText="Unenrolling..."
        isDestructive={true}
      />
    </div>
  );
}
