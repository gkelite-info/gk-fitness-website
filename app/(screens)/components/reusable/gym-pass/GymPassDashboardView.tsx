"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import GymPassDashboardHeader from "./GymPassDashboardHeader";
import GymPassKpiCards from "./GymPassKpiCards";
import GymPassOverviewCards from "./GymPassOverviewCards";
import GymPassRevenueTrendCard from "./GymPassRevenueTrendCard";
import GymPassRecentPurchasesCard from "./GymPassRecentPurchasesCard";
import ConfirmationModal from "@/app/(screens)/components/reusable/ConfirmationModal";
import { GymPassItem, PurchaseItem } from "./GymPassTypes";
import { getStoredGymPasses, removeGymPass } from "./gymPassStore";

const initialPurchases: PurchaseItem[] = [
  {
    id: "p1",
    userName: "Rohit Sharma",
    userAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
    userGender: "male",
    passName: "Monthly Pass",
    passType: "Monthly Pass",
    price: 4999,
    timeAgo: "2h ago",
    date: "May 17, 2026",
  },
  {
    id: "p2",
    userName: "Neha Patel",
    userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    userGender: "female",
    passName: "Day Pass",
    passType: "Day Pass",
    price: 799,
    timeAgo: "5h ago",
    date: "May 17, 2026",
  },
  {
    id: "p3",
    userName: "Vikram Singh",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
    userGender: "male",
    passName: "Monthly Pass",
    passType: "Monthly Pass",
    price: 4999,
    timeAgo: "7h ago",
    date: "May 17, 2026",
  },
  {
    id: "p4",
    userName: "Neha Patel",
    userAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
    userGender: "female",
    passName: "Day Pass",
    passType: "Day Pass",
    price: 799,
    timeAgo: "5h ago",
    date: "May 17, 2026",
  },
  {
    id: "p5",
    userName: "Rajesh Kumar",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80",
    userGender: "male",
    passName: "Monthly Pass",
    passType: "Monthly Pass",
    price: 4999,
    timeAgo: "9h ago",
    date: "May 17, 2026",
  },
];

export default function GymPassDashboardView() {
  const router = useRouter();
  const pathname = usePathname();
  const [passes, setPasses] = useState<GymPassItem[]>([]);
  const [purchases] = useState<PurchaseItem[]>(initialPurchases);
  const [passToDelete, setPassToDelete] = useState<GymPassItem | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    setPasses(getStoredGymPasses());
  }, []);

  const handleCreate = () => {
    const targetRoute = pathname.endsWith("/") ? `${pathname}create` : `${pathname}/create`;
    router.push(targetRoute);
  };

  const handleEdit = (pass: GymPassItem) => {
    const targetRoute = pathname.endsWith("/")
      ? `${pathname}create?id=${pass.id}&edit=true`
      : `${pathname}/create?id=${pass.id}&edit=true`;
    router.push(targetRoute);
  };

  const handleDeleteClick = (pass: GymPassItem) => {
    setPassToDelete(pass);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (passToDelete) {
      const updated = removeGymPass(passToDelete.id);
      setPasses(updated);
      setIsDeleteModalOpen(false);
      setPassToDelete(null);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6 sm:gap-7 max-w-[1600px] mx-auto overflow-x-hidden min-w-0">
      <GymPassDashboardHeader onCreatePass={handleCreate} />

      <GymPassKpiCards />

      <GymPassOverviewCards
        passes={passes}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-7 flex flex-col min-w-0 h-full">
          <GymPassRevenueTrendCard />
        </div>
        <div className="lg:col-span-5 flex flex-col min-w-0 h-full">
          <GymPassRecentPurchasesCard purchases={purchases} />
        </div>
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setPassToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Gym Pass"
        message={`Are you sure you want to delete "${passToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        isDestructive={true}
      />
    </div>
  );
}
