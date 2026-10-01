"use client";

import { useState } from "react";
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

const mockCredentials: CredentialUser[] = [
  { id: "1", name: "Ramu", phone: "+91 6300263791", deviceUserId: "4", enrolledType: "fingerprint" },
  { id: "2", name: "Suresh Kumar", phone: "+91 9876543210", deviceUserId: "5", enrolledType: "face" },
  { id: "3", name: "Priya Sharma", phone: "+91 9823456781", deviceUserId: "6", enrolledType: "fingerprint" },
  { id: "4", name: "Rahul Verma", phone: "+91 9765432109", deviceUserId: "7", enrolledType: "face" },
  { id: "5", name: "Ananya Patel", phone: "+91 9812345670", deviceUserId: "8", enrolledType: "fingerprint" },
  { id: "6", name: "Website test", phone: "9000273128", deviceUserId: null, enrolledType: null },
  { id: "7", name: "Vikram Singh", phone: "+91 9876543210", deviceUserId: null, enrolledType: null },
  { id: "8", name: "Arjun Reddy", phone: "+91 7654321098", deviceUserId: null, enrolledType: null },
];

export default function CredentialsTab() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [search, setSearch] = useState("");
  const [enrollUser, setEnrollUser] = useState<CredentialUser | null>(null);
  const [users, setUsers] = useState(mockCredentials);

  const detailId = searchParams.get("detail");
  const registerType = searchParams.get("register");
  
  const detailUser = users.find(u => u.id === detailId) || null;
  const [unenrollUser, setUnenrollUser] = useState<CredentialUser | null>(null);

  const filteredData = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.phone.includes(search));
  const currentData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enrollUser) return;
    
    setUsers(prev => prev.map(u => u.id === enrollUser.id ? { ...u, enrolledType: "fingerprint", deviceUserId: "105" } : u));
    
    toast.success(`${enrollUser.name} successfully enrolled!`, {
      style: { background: "#141720", color: "#fff", border: "1px solid #232834" }
    });
    setEnrollUser(null);
  };

  const handleUnenrollClick = () => {
    if (detailUser) {
      setUnenrollUser(detailUser);
    }
  };

  const confirmUnenroll = () => {
    if (!unenrollUser) return;
    setUsers(prev => prev.map(u => u.id === unenrollUser.id ? { ...u, enrolledType: null, deviceUserId: null } : u));
    toast.success(`${unenrollUser.name} unenrolled successfully!`, {
      style: { background: "#141720", color: "#fff", border: "1px solid #232834" }
    });
    setUnenrollUser(null);
    closeDetail();
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

  return (
    <div className="flex flex-col w-full gap-6 mt-4">
      {/* Search Bar */}
      <div className="flex flex-row items-center w-full bg-[#141720] border border-[#202532] rounded-2xl px-4 sm:px-5 h-11 sm:h-[46px] gap-3 focus-within:border-[#38BDF8] transition-colors shadow-sm">
        <MagnifyingGlass size={18} color="#A1A1AA" />
        <input 
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="flex-1 bg-transparent border-none outline-none font-sans font-normal text-[13px] text-white placeholder:text-[#475569] h-full"
        />
      </div>

      {/* List */}
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
          <EnrollmentModal user={enrollUser} onClose={() => setEnrollUser(null)} onEnroll={handleEnroll} />
        )}
        {detailUser && !registerType && (
          <EnrolledUserDetailModal user={detailUser} onClose={closeDetail} onUnenroll={handleUnenrollClick} onRegister={openRegister} />
        )}
        {detailUser && registerType === "fingerprint" && (
          <RegisterFingerprintModal user={detailUser} onClose={closeRegister} />
        )}
        {detailUser && registerType === "face" && (
          <RegisterFaceModal user={detailUser} onClose={closeRegister} />
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
