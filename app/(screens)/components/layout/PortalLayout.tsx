"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "@phosphor-icons/react";
import TopHeader from "./TopHeader";
import OwnerSidebar from "./sidebars/OwnerSidebar";
import CustomerSidebar from "./sidebars/CustomerSidebar";
import SuperAdminSidebar from "./sidebars/SuperAdminSidebar";
import TrainerSidebar from "./sidebars/TrainerSidebar";
import GlobalTrainerSidebar from "./sidebars/GlobalTrainerSidebar";
import SidebarShimmer from "./sidebars/SidebarShimmer";
import { usePathname } from "next/navigation";
import { useUser } from "@/app/context/UserContext";

interface PortalLayoutProps {
  children: React.ReactNode;
}

export default function PortalLayout({ children }: PortalLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { profile, loading } = useUser();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsSidebarOpen(false);
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
  }, [pathname]);

  const renderSidebar = () => {
    if (loading || !profile) {
      return <SidebarShimmer />;
    }

    switch (profile.role) {
      case "superadmin":
        return <SuperAdminSidebar />;
      case "owner":
        return <OwnerSidebar />;
      case "trainer":
        return <TrainerSidebar />;
      case "globaltrainer":
        return <GlobalTrainerSidebar />;
      case "customer":
        return <CustomerSidebar />;
      default:
        return <SidebarShimmer />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#0C0D10] overflow-hidden">
      <div className="hidden lg:block h-full flex-shrink-0 z-10">
        {renderSidebar()}
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
              onClick={() => setIsSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 left-0 h-full z-50 lg:hidden shadow-2xl"
            >
              {renderSidebar()}
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="absolute top-4 right-[-48px] p-2 bg-[#15161C] border border-[#232631] text-white rounded-xl shadow-lg flex items-center justify-center hover:bg-[#1f212a] transition-colors"
              >
                <X size={20} weight="bold" />
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <TopHeader onOpenSidebar={() => setIsSidebarOpen(true)} />
        <main ref={mainRef} className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-themed">
          <div className="min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
