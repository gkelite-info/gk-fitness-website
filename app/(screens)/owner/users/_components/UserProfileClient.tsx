"use client";

import { useMemo } from "react";
import CustomerProfileView, { CustomerProfileData } from "../../../components/reusable/CustomerProfileView";
import { useGymCustomerById } from "@/lib/hooks/customers/useGymCustomers";
import { useGymTrainerById } from "@/lib/hooks/trainers/useGymTrainers";
import { useAssignedTrainersByCustomer, useAssignedCustomersByTrainer } from "@/lib/hooks/customerTrainers/useCustomerTrainers";
import { useGymCustomerMembershipPlans } from "@/lib/hooks/gymCustomerMembershipPlans/useGymCustomerMembershipPlans";

import { useRouter } from "next/navigation";

export default function UserProfileClient({
  customerId,
  initialName,
  initialPhone,
  initialPlan,
  initialJoinedDate,
  initialValidTill,
  initialStatus,
  initialMemberCode,
  initialUserType,
}: {
  customerId: string;
  initialName: string;
  initialPhone: string;
  initialPlan: string;
  initialJoinedDate: string;
  initialValidTill: string;
  initialStatus: string;
  initialMemberCode?: string;
  initialUserType?: string;
}) {
  const router = useRouter();
  const isTrainer = initialUserType === "trainer";

  const { data: customerData, isLoading: isCustomerLoading } = useGymCustomerById(isTrainer ? undefined : customerId);
  const { data: trainerData, isLoading: isTrainerLoading } = useGymTrainerById(isTrainer ? customerId : undefined);

  const { data: trainersData, isLoading: isTrainersLoading } = useAssignedTrainersByCustomer(isTrainer ? undefined : customerId);
  const { data: customersData, isLoading: isCustomersLoading } = useAssignedCustomersByTrainer(isTrainer ? customerId : undefined);
  
  const { data: plansData, isLoading: isPlansLoading } = useGymCustomerMembershipPlans(undefined, isTrainer ? undefined : customerId);

  const mockData = useMemo(() => {
    const activeUser = isTrainer ? trainerData?.trainer : customerData;
    const email = activeUser?.email || activeUser?.user?.email || "No email provided";
    const avatarUrl = activeUser?.profilePhoto || activeUser?.user?.profilePhoto || undefined;

    let assignedEntity = undefined;
    let assignedList = undefined;

    if (isTrainer) {
      if (customersData && customersData.length > 0) {
        const activeCustomers = customersData.filter(c => c.isActive && !c.is_deleted);
        
        if (activeCustomers.length > 0) {
          assignedList = activeCustomers.filter(c => c.customer).map(c => ({
            name: c.customer!.fullName,
            specialty: "Gym Member",
            assignedSince: c.assignedOn ? new Date(c.assignedOn).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "Unknown",
            avatarUrl: c.customer!.user?.profilePhoto || undefined,
          }));
        }
      }
    } else {
      if (trainersData && trainersData.length > 0) {
        const activeTrainer = trainersData.find(t => t.isActive && !t.is_deleted);
        if (activeTrainer && activeTrainer.trainer) {
          assignedEntity = {
            name: activeTrainer.trainer.fullName,
            specialty: activeTrainer.trainer.specialization || "General Fitness",
            assignedSince: activeTrainer.assignedOn ? new Date(activeTrainer.assignedOn).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : "Unknown",
            avatarUrl: activeTrainer.trainer.user?.profilePhoto || undefined,
          };
        }
      }
    }

    let duration = "0 Months";
    let remainingDays = 0;

    if (plansData && plansData.length > 0) {
      const activePlan = plansData.find(p => !p.is_deleted && p.is_Active) || plansData.find(p => !p.is_deleted) || plansData[0];

      const start = new Date(activePlan.startDate || activePlan.createdAt);
      const end = activePlan.endDate ? new Date(activePlan.endDate) : null;

      if (end) {
        const timeDiff = end.getTime() - start.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (activePlan.plan?.durationMonths) {
          const rawDur = String(activePlan.plan.durationMonths);
          duration = rawDur.toLowerCase().includes("month") || rawDur.toLowerCase().includes("year")
            ? rawDur
            : `${rawDur} Months`;
        }

        const now = new Date();
        const remain = end.getTime() - now.getTime();
        remainingDays = Math.max(0, Math.ceil(remain / (1000 * 3600 * 24)));
      }
    }

    const shortUuid = customerId ? customerId.substring(0, 6).toUpperCase() : "XXXX";
    const idFallback = isTrainer ? `TRN-${shortUuid}` : `CUST-${shortUuid}`;

    return {
      id: initialMemberCode || idFallback,
      name: activeUser?.fullName || initialName || "Unknown",
      status: initialStatus as any,
      memberCode: initialMemberCode || idFallback,
      phone: activeUser?.phone || initialPhone || "No phone",
      email: email,
      avatarUrl: avatarUrl,
      membership: {
        planName: initialPlan || "No Plan",
        startDate: initialJoinedDate || "-",
        expiryDate: initialValidTill || "-",
        duration: duration,
        status: initialStatus as any,
        remainingDays: remainingDays,
      },
      trainer: assignedEntity,
      assignedList: assignedList,
    } as CustomerProfileData;
  }, [isTrainer, customerId, customerData, trainerData, trainersData, customersData, plansData, initialName, initialPhone, initialPlan, initialJoinedDate, initialValidTill, initialStatus, initialMemberCode]);

  if (isCustomerLoading || isTrainerLoading || isTrainersLoading || isCustomersLoading || isPlansLoading) {
    return (
      <div className="flex w-full h-full justify-center items-center bg-[#090D13]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#D2F829]"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full bg-[#090D13]">
      <CustomerProfileView 
        data={mockData} 
        title={isTrainer ? "Trainer Profile" : "Customer Profile"}
        subtitle={isTrainer ? "View and manage trainer details, schedule, assigned customers and more." : "View and manage member details, membership, trainer and more."}
        userType={isTrainer ? "trainer" : "customer"}
        onEditMember={() => {
          const typeString = isTrainer ? 'trainers' : 'customers';
          router.push(`/owner/users/add?type=${typeString}&editId=${customerId}`);
        }}
      />
    </div>
  );
}
