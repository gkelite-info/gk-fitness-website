"use client";

import { useRouter } from "next/navigation";
import { Users } from "@phosphor-icons/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeadCell,
} from "../table";
import GlobalTrainerRow from "./GlobalTrainerRow";
import IndividualCustomerRow from "./IndividualCustomerRow";
import GymCustomerRow from "./GymCustomerRow";
import StandardUserRow from "./StandardUserRow";
import { PlatformUser, UserRoleTab } from "./types";

interface UsersTableProps {
  users: PlatformUser[];
  currentTab: UserRoleTab;
}

export default function UsersTable({ users, currentTab }: UsersTableProps) {
  const router = useRouter();
  const isGlobalTrainers = currentTab === "global-trainers";
  const isIndividualCustomers = currentTab === "individual-customers";
  const isGymCustomers = currentTab === "gym-customers";

  const getRoleHeader = () => {
    switch (currentTab) {
      case "owners":
        return "OWNER DETAILS";
      case "trainers":
        return "TRAINER DETAILS";
      default:
        return "CUSTOMER DETAILS";
    }
  };

  if (users.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] p-8 sm:p-14 rounded-2xl bg-[#13151D] border border-[#222634] text-center w-full">
        <div className="w-16 h-16 rounded-2xl bg-[#181C26] border border-[#262E3E] flex items-center justify-center mb-4 text-[#64748B]">
          <Users size={32} weight="duotone" className="text-[#94A3B8]" />
        </div>
        <p className="text-base sm:text-lg font-bold text-white mb-1.5">No users found</p>
        <p className="text-xs sm:text-sm text-[#94A3B8] max-w-sm">
          Try adjusting your search query, status, or gym filter options
        </p>
      </div>
    );
  }

  return (
    <Table className="bg-[#101217] border-[#1C212B]">
      <TableHeader>
        <TableRow className="border-b border-[#1C212B]">
          {isGlobalTrainers ? (
            <>
              <TableHeadCell>GLOBAL TRAINER DETAILS</TableHeadCell>
              <TableHeadCell>MOBILE NUMBER</TableHeadCell>
              <TableHeadCell>EMAIL</TableHeadCell>
              <TableHeadCell>JOINED DATE</TableHeadCell>
              <TableHeadCell>STATUS</TableHeadCell>
              <TableHeadCell className="text-right">ACTION</TableHeadCell>
            </>
          ) : isIndividualCustomers ? (
            <>
              <TableHeadCell>CUSTOMER DETAILS</TableHeadCell>
              <TableHeadCell>MOBILE NUMBER</TableHeadCell>
              <TableHeadCell>EMAIL ADDRESS</TableHeadCell>
              <TableHeadCell>JOINED DATE</TableHeadCell>
              <TableHeadCell>STATUS</TableHeadCell>
              <TableHeadCell className="text-right">ACTIONS</TableHeadCell>
            </>
          ) : isGymCustomers ? (
            <>
              <TableHeadCell>CUSTOMER DETAILS</TableHeadCell>
              <TableHeadCell>GYM NAME & LOCATION</TableHeadCell>
              <TableHeadCell>JOINED DATE</TableHeadCell>
              <TableHeadCell>STATUS</TableHeadCell>
              <TableHeadCell className="text-right">ACTION</TableHeadCell>
            </>
          ) : (
            <>
              <TableHeadCell>{getRoleHeader()}</TableHeadCell>
              <TableHeadCell>GYM NAME & LOCATION</TableHeadCell>
              <TableHeadCell>JOINED DATE</TableHeadCell>
              <TableHeadCell>STATUS</TableHeadCell>
              <TableHeadCell className="text-right">ACTION</TableHeadCell>
            </>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => {
          if (isGlobalTrainers) {
            return (
              <GlobalTrainerRow
                key={user.id}
                user={user}
                onView={(id) =>
                  router.push(
                    `/superadmin/trainers/${id}?from=${encodeURIComponent("/superadmin/users?tab=global-trainers")}`
                  )
                }
                onEdit={(id) =>
                  router.push(
                    `/superadmin/trainers/${id}/edit?from=${encodeURIComponent("/superadmin/users?tab=global-trainers")}`
                  )
                }
              />
            );
          }

          if (isIndividualCustomers) {
            return (
              <IndividualCustomerRow
                key={user.id}
                user={user}
                onView={(id) =>
                  router.push(
                    `/superadmin/users/customers/${id}?from=${encodeURIComponent("/superadmin/users?tab=individual-customers")}`
                  )
                }
              />
            );
          }

          if (isGymCustomers) {
            return (
              <GymCustomerRow
                key={user.id}
                user={user}
                onView={(id) =>
                  router.push(
                    `/superadmin/gyms/gym-1/customer/${id}?from=${encodeURIComponent("/superadmin/users?tab=gym-customers")}`
                  )
                }
              />
            );
          }

          return (
            <StandardUserRow
              key={user.id}
              user={user}
              currentTab={currentTab}
              onView={(id, role) => {
                if (role === "owners") {
                  router.push(
                    `/superadmin/gyms/gym-1/owner/${id}?from=${encodeURIComponent("/superadmin/users?tab=owners")}`
                  );
                } else if (role === "trainers") {
                  router.push(
                    `/superadmin/gyms/gym-1/trainer/${id}?from=${encodeURIComponent("/superadmin/users?tab=trainers")}`
                  );
                }
              }}
            />
          );
        })}
      </TableBody>
    </Table>
  );
}
