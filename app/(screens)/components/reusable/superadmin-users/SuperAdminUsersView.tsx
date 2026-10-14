"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import UsersHeader from "./UsersHeader";
import UsersTabsAndFilters from "./UsersTabsAndFilters";
import UsersSubHeader from "./UsersSubHeader";
import UsersTable from "./UsersTable";
import Pagination from "../Pagination";
import { generateMockUsers } from "./mockData";
import { PlatformUser, UserRoleTab, UserSortOption } from "./types";
import { DropdownOption } from "../Dropdown";

const ALL_USERS: PlatformUser[] = generateMockUsers();

interface SuperAdminUsersViewProps {
  initialTab?: string;
}

export default function SuperAdminUsersView({
  initialTab = "owners",
}: SuperAdminUsersViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const validTabs: UserRoleTab[] = [
    "owners",
    "trainers",
    "global-trainers",
    "gym-customers",
    "individual-customers",
  ];

  const searchParamTab = searchParams.get("tab") as UserRoleTab | null;
  const activeTabCandidate = mounted
    ? (searchParamTab || (initialTab as UserRoleTab))
    : (initialTab as UserRoleTab);

  const currentTab: UserRoleTab = validTabs.includes(activeTabCandidate)
    ? activeTabCandidate
    : "owners";

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [gymFilter, setGymFilter] = useState("all");
  const [sortOption, setSortOption] = useState<UserSortOption>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const handleTabChange = (newTab: UserRoleTab) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", newTab);
    params.set("page", "1");
    router.replace(`${pathname}?${params.toString()}`);
    setCurrentPage(1);
    setSearchQuery("");
    setStatusFilter("all");
    setGymFilter("all");
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };

  const gymOptions: DropdownOption[] = useMemo(() => {
    const roleUsers = ALL_USERS.filter((u) => u.role === currentTab);
    const uniqueGyms = Array.from(new Set(roleUsers.map((u) => u.gymName))).filter(
      Boolean
    );
    return [
      { label: "All Gyms", value: "all" },
      ...uniqueGyms.map((name) => ({ label: name, value: name })),
    ];
  }, [currentTab]);

  const filteredUsers = useMemo(() => {
    let list = ALL_USERS.filter((u) => u.role === currentTab);

    if (statusFilter !== "all") {
      list = list.filter((u) => u.status === statusFilter);
    }

    if (gymFilter !== "all") {
      list = list.filter((u) => u.gymName === gymFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (u) =>
          u.name.toLowerCase().includes(q) ||
          u.code.toLowerCase().includes(q) ||
          u.gymName.toLowerCase().includes(q) ||
          u.location.toLowerCase().includes(q)
      );
    }

    if (sortOption === "newest") {
      list = [...list].sort((a, b) => b.joinedTimestamp - a.joinedTimestamp);
    } else if (sortOption === "oldest") {
      list = [...list].sort((a, b) => a.joinedTimestamp - b.joinedTimestamp);
    } else if (sortOption === "name") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [currentTab, statusFilter, gymFilter, searchQuery, sortOption]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage) || 1;
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage]);

  return (
    <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-full overflow-x-hidden min-w-0">
      <UsersHeader
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setCurrentPage(1);
        }}
      />

      <UsersTabsAndFilters
        currentTab={currentTab}
        onTabChange={handleTabChange}
      />

      <UsersSubHeader
        count={filteredUsers.length}
        currentTab={currentTab}
        statusFilter={statusFilter}
        onStatusChange={(status) => {
          setStatusFilter(status);
          setCurrentPage(1);
        }}
        gymFilter={gymFilter}
        onGymChange={(gym) => {
          setGymFilter(gym);
          setCurrentPage(1);
        }}
        gymOptions={gymOptions}
        sortOption={sortOption}
        onSortChange={setSortOption}
        onAddTrainer={() => router.push("/superadmin/trainers/add?from=users")}
      />

      <UsersTable users={paginatedUsers} currentTab={currentTab} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredUsers.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
