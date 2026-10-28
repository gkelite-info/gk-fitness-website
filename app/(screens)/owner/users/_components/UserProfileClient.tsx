"use client";

import { useMemo, useState } from "react";
import CustomerProfileView, { CustomerProfileData } from "../../../components/reusable/CustomerProfileView";
import { useGymCustomerById } from "@/lib/hooks/customers/useGymCustomers";
import { useGymTrainerById } from "@/lib/hooks/trainers/useGymTrainers";
import { useAssignedTrainersByCustomer, useAssignedCustomersByTrainer } from "@/lib/hooks/customerTrainers/useCustomerTrainers";
import { useGymCustomerMembershipPlans, useRevokeGymCustomerPendingPlan } from "@/lib/hooks/gymCustomerMembershipPlans/useGymCustomerMembershipPlans";
import ChangePlanModal from "./ChangePlanModal";
import ConfirmationModal from "@/app/(screens)/components/reusable/ConfirmationModal";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

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
  const [isChangePlanOpen, setIsChangePlanOpen] = useState(false);
  const [isRevokeModalOpen, setIsRevokeModalOpen] = useState(false);

  const { data: customerData, isLoading: isCustomerLoading } = useGymCustomerById(isTrainer ? undefined : customerId);
  const { data: trainerData, isLoading: isTrainerLoading } = useGymTrainerById(isTrainer ? customerId : undefined);

  const { data: trainersData, isLoading: isTrainersLoading } = useAssignedTrainersByCustomer(isTrainer ? undefined : customerId);
  const { data: customersData, isLoading: isCustomersLoading } = useAssignedCustomersByTrainer(isTrainer ? customerId : undefined);
  
  const { data: plansData, isLoading: isPlansLoading, refetch: refetchPlans } = useGymCustomerMembershipPlans(undefined, isTrainer ? undefined : customerId);

  const currentPlanForModal = useMemo(() => {
    if (!plansData || plansData.length === 0) return null;
    const active = plansData.find((p: any) => !p.is_deleted && p.is_Active) || plansData[0];
    return {
      planId: active.planId,
      pendingPlanId: active.pendingPlanId || null,
      pendingPlanName: active.pendingPlan?.planName || null,
      pendingAmount: active.pendingAmount ? Number(active.pendingAmount) : null,
      planName: active.plan?.planName,
      price: active.plan?.price,
      durationMonths: active.plan?.durationMonths,
      startDate: active.startDate,
      endDate: active.endDate,
      is_Active: active.is_Active,
      customAmount: active.customAmount,
    };
  }, [plansData]);

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
    let actualPlanName = initialPlan || "No Plan";
    let actualStartDate = initialJoinedDate || "-";
    let actualExpiryDate = initialValidTill || "-";
    let memberPlanStatus = initialStatus;
    let pendingPlanId: string | null = null;
    let pendingPlanName: string | null = null;
    let pendingAmount: number | null = null;
    let gymCustomerMembershipPlanId: string | undefined = undefined;

    if (plansData && plansData.length > 0) {
      const activePlan = plansData.find((p: any) => !p.is_deleted && p.is_Active) || plansData.find((p: any) => !p.is_deleted) || plansData[0];
      gymCustomerMembershipPlanId = activePlan.GymCustomerMembershipPlanId;
      pendingPlanId = activePlan.pendingPlanId || null;
      pendingPlanName = activePlan.pendingPlan?.planName || null;
      pendingAmount = activePlan.pendingAmount ? Number(activePlan.pendingAmount) : null;

      const isPendingActivation =
        !activePlan.startDate ||
        !activePlan.endDate ||
        (!activePlan.is_Active && !activePlan.endDate);

      if (activePlan.plan?.planName) {
        actualPlanName = activePlan.plan.planName;
      }

      if (isPendingActivation) {
        memberPlanStatus = "Pending Activation";
        actualStartDate = "Pending Activation";
        actualExpiryDate = "-";
      } else {
        const start = new Date(activePlan.startDate || activePlan.createdAt);
        if (!initialJoinedDate || initialJoinedDate === "-") {
          actualStartDate = start.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
        }
        
        const end = activePlan.endDate ? new Date(activePlan.endDate) : null;
        if (end) {
          if (!initialValidTill || initialValidTill === "-") {
            actualExpiryDate = end.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
          }
          
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
    }

    const shortUuid = customerId ? customerId.substring(0, 6).toUpperCase() : "XXXX";
    const idFallback = isTrainer ? `TRN-${shortUuid}` : `CUST-${shortUuid}`;

    return {
      id: initialMemberCode || idFallback,
      name: activeUser?.fullName || initialName || "Unknown",
      status: memberPlanStatus as any,
      memberCode: initialMemberCode || idFallback,
      phone: activeUser?.phone || initialPhone || "No phone",
      email: email,
      avatarUrl: avatarUrl,
      membership: {
        planName: actualPlanName,
        startDate: actualStartDate,
        expiryDate: actualExpiryDate,
        duration: duration,
        status: memberPlanStatus as any,
        remainingDays: remainingDays,
        pendingPlanId,
        pendingPlanName,
        pendingAmount,
        GymCustomerMembershipPlanId: gymCustomerMembershipPlanId,
      },
      trainer: assignedEntity,
      assignedList: assignedList,
    } as CustomerProfileData;
  }, [isTrainer, customerId, customerData, trainerData, trainersData, customersData, plansData, initialName, initialPhone, initialPlan, initialJoinedDate, initialValidTill, initialStatus, initialMemberCode]);

  const revokePendingPlanMutation = useRevokeGymCustomerPendingPlan();

  const handleRevokePendingPlan = async () => {
    const planRecId = mockData.membership?.GymCustomerMembershipPlanId;
    if (!planRecId) return;
    try {
      await revokePendingPlanMutation.mutateAsync({
        GymCustomerMembershipPlanId: planRecId,
        customerId,
        gymId: customerData?.gymId,
      });
      toast.success("Pending plan upgrade revoked");
      setIsRevokeModalOpen(false);
      refetchPlans();
      router.refresh();
    } catch {
      toast.error("Failed to revoke pending plan upgrade");
    }
  };

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
        onEditPlan={isTrainer ? undefined : () => setIsChangePlanOpen(true)}
        onRevokePlan={isTrainer || !mockData.membership?.pendingPlanId ? undefined : () => setIsRevokeModalOpen(true)}
      />

      <ConfirmationModal
        isOpen={isRevokeModalOpen}
        onClose={() => !revokePendingPlanMutation.isPending && setIsRevokeModalOpen(false)}
        onConfirm={handleRevokePendingPlan}
        title="Revoke Pending Upgrade"
        message={`Are you sure you want to revoke the pending upgrade to ${mockData.membership?.pendingPlanName ? `"${mockData.membership.pendingPlanName}"` : "the new plan"}? The customer's current active plan remains completely undisturbed.`}
        confirmText="Revoke Upgrade"
        cancelText="Cancel"
        isConfirming={revokePendingPlanMutation.isPending}
        confirmingText="Revoking..."
        isDestructive={true}
      />

      {!isTrainer && (
        <ChangePlanModal
          isOpen={isChangePlanOpen}
          onClose={() => setIsChangePlanOpen(false)}
          customerId={customerId}
          customerName={mockData.name}
          gymId={customerData?.gymId || ""}
          currentPlan={currentPlanForModal}
          onSuccess={() => {
            refetchPlans();
            router.refresh();
          }}
        />
      )}
    </div>
  );
}
