"use client";

import { useState } from "react";
import { SignOut } from "@phosphor-icons/react";
import ConfirmationModal from "./ConfirmationModal";
import { logoutUser as logoutUserClient } from "@/app/api/supabase/helpers";
import { logoutUser as logoutUserServer } from "@/app/api/auth/actions";

export default function LogoutButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  const handleLogout = async () => {
    setIsConfirming(true);
    
    try {
      await logoutUserServer();
      await logoutUserClient();
      window.location.href = "/login";
    } catch (error) {
      console.error("Failed to log out:", error);
      setIsConfirming(false);
      setIsModalOpen(false);
      window.location.href = "/login";
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
        <span className="font-semibold text-sm leading-5 tracking-[0.35px]">
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
