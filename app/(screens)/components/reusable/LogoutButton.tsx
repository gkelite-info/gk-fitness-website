"use client";

import { useState } from "react";
import { SignOut } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import ConfirmationModal from "./ConfirmationModal";
import { logoutUser } from "@/app/api/supabase/helpers";

export default function LogoutButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsConfirming(true);
    
    try {
      await logoutUser();
      router.push("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
      setIsConfirming(false);
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="flex flex-row items-center justify-center gap-2 w-full h-[46px] rounded-xl bg-[rgba(244,63,94,0.05)] border border-[rgba(244,63,94,0.15)] text-[#F43F5E] hover:bg-[rgba(244,63,94,0.1)] transition-colors cursor-pointer"
      >
        <SignOut size={20} weight="bold" />
        <span className="font-['Nimbus_Sans'] font-semibold text-sm leading-5 tracking-[0.35px]">
          Log Out
        </span>
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
        title="Log Out of GK-Gym Life"
        message="Are you sure you want to log out? You will need to enter your credentials to access the portal again."
        confirmText="Log Out"
        isConfirming={isConfirming}
        isDestructive={true}
      />
    </>
  );
}
