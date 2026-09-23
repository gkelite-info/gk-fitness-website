"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ArrowLeft, MagnifyingGlass, CaretDown, List, SquaresFour, UsersThree, TrendUp } from "@phosphor-icons/react";
import SparklineChart from "@/app/(screens)/components/reusable/charts/SparklineChart";
import Avatar from "@/app/(screens)/components/reusable/Avatar";
import { Table } from "@/app/(screens)/components/reusable/table/Table";
import { TableRow, TableCell, TableHeadCell } from "@/app/(screens)/components/reusable/table/TableCells";
import Pagination from "@/app/(screens)/components/reusable/Pagination";

interface ActiveCustomersViewProps {
  initialData: { data: any[], total: number };
  currentPage: number;
  search: string;
  sort: 'newest' | 'oldest';
}

export default function ActiveCustomersView({ initialData, currentPage, search, sort }: ActiveCustomersViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState(search);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchInput !== search) {
      const handler = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (searchInput) {
          params.set('search', searchInput);
        } else {
          params.delete('search');
        }
        params.set('page', '1');
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      }, 600);
      return () => clearTimeout(handler);
    }
  }, [searchInput, search, searchParams, pathname, router]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSortChange = (newSort: "newest" | "oldest") => {
    setIsSortOpen(false);
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', newSort);
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const activePlans = initialData?.data || [];
  const totalItems = initialData?.total || 0;
  const totalPages = Math.ceil(totalItems / 10) || 1;

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "Gold":
        return <div className="px-4 py-1 bg-[#2A1C0D] border border-[#4D3215] rounded-full font-sans font-[600] text-[11px] text-[#E59B2C] text-center w-[60px]">Gold</div>;
      case "Premium":
        return <div className="px-3 py-1 bg-[#261329] border border-[#441A4A] rounded-full font-sans font-[600] text-[11px] text-[#C059D6] text-center w-[74px]">Premium</div>;
      case "Silver":
        return <div className="px-4 py-1 bg-[#1A212A] border border-[#2B3542] rounded-full font-sans font-[600] text-[11px] text-[#8FA4BF] text-center w-[64px]">Silver</div>;
      default:
        return <div className="px-4 py-1 bg-[#1A1F26] border border-[#2A313C] rounded-full font-sans font-[600] text-[11px] text-[#94A3B8] text-center">{plan}</div>;
    }
  };

  return (
    <div className="flex flex-col w-full h-full p-4 md:p-6 lg:p-8 overflow-y-auto custom-scrollbar">
      <div className="flex flex-col w-full max-w-[1280px] mx-auto gap-6 pb-10">
        <div className="flex flex-row items-start sm:items-center gap-4">
          <button
            onClick={() => router.push('/owner/finance')}
            className="flex items-center justify-center w-10 h-10 rounded-[8px] bg-[#111418] border border-[#1D222B] hover:bg-[#1A1F26] transition-colors cursor-pointer shrink-0 text-[#94A3B8] hover:text-white mt-1 sm:mt-0"
          >
            <ArrowLeft size={16} weight="bold" />
          </button>
          <div className="flex flex-col gap-1">
            <h1 className="font-sans font-[700] text-[24px] md:text-[28px] leading-[32px] md:leading-[36px] tracking-[-0.6px] text-white m-0">
              Active Customers
            </h1>
            <p className="font-sans font-[400] text-[12px] leading-[16px] text-[#9CA3AF] m-0">
              View and manage all your active gym members
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full p-4 sm:p-6 bg-[#14161A] border border-[#1D222E] rounded-[16px] gap-6 overflow-hidden">
          <div className="flex flex-row items-start gap-4 shrink-0 w-full md:w-auto">
            <div className="flex justify-center items-center w-12 h-12 rounded-full bg-[#172516] border border-[#2B4219] shrink-0 text-[#C6F432]">
              <UsersThree size={24} weight="fill" />
            </div>
            <div className="flex flex-col gap-1 mt-1">
              <span className="font-sans font-[600] text-[11px] leading-[16px] tracking-[0.55px] uppercase text-[#9CA3AF]">
                Total Active Customers
              </span>
              <div className="flex flex-col items-start mt-1">
                <span className="font-sans font-[800] text-[32px] sm:text-[36px] leading-[40px] tracking-[-0.9px] text-white">
                  {totalItems}
                </span>
                <div className="flex flex-row items-center gap-1 mt-1 sm:mt-1.5">
                  <div className="flex flex-row items-center text-[#C6F432] gap-0.5 sm:gap-1">
                    <TrendUp size={12} weight="bold" />
                    <span className="font-sans font-[600] text-[11px] sm:text-[12px] leading-[16px]">
                      +6.3%
                    </span>
                  </div>
                  <span className="font-sans font-[400] text-[11px] sm:text-[12px] leading-[16px] text-[#9CA3AF]">
                    vs last month
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end w-full max-w-[576px] gap-3 sm:gap-2">
            <button className="flex flex-row items-center justify-center gap-2 px-[14px] py-[6px] bg-[#171B26] border border-[#242B3D] rounded-[8px] cursor-pointer hover:bg-[#1C2230] transition-colors self-end">
              <span className="font-sans font-[500] text-[12px] leading-[16px] text-[#D1D5DB]">Last 30 days</span>
              {/* <CaretDown size={14} weight="bold" className="text-[#9CA3AF]" /> */}
            </button>
            <SparklineChart />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4 mt-2 sm:mt-0">
          <div className="relative w-full max-w-[735px]">
            <div className="absolute inset-y-0 left-0 pl-[14px] flex items-center pointer-events-none text-[#6B7280]">
              <MagnifyingGlass size={16} weight="bold" />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by name, phone or membership ID"
              className="w-full h-[38px] sm:h-[40px] pl-10 pr-4 bg-[#14161A] border border-[#202534] rounded-[12px] font-sans font-[400] text-[12px] text-white placeholder:text-[#6B7280] focus:outline-none focus:border-[#323842] transition-colors"
            />
          </div>

          <div className="flex flex-row items-center justify-between md:justify-end gap-3 w-full md:w-auto">
            <div className="relative" ref={sortRef}>
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex flex-row items-center justify-center gap-2 px-4 py-2.5 h-[38px] sm:h-[40px] bg-[#12141C] border border-[#202534] rounded-[12px] cursor-pointer hover:bg-[#1A1F2B] transition-colors"
              >
                <span className="font-sans font-[400] text-[12px] leading-[16px] text-[#9CA3AF]">Sort:</span>
                <span className="font-sans font-[500] text-[12px] leading-[16px] text-white">{sort === "newest" ? "Newest" : "Oldest"}</span>
                <CaretDown size={14} weight="bold" className={`text-[#9CA3AF] transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
              </button>

              {isSortOpen && (
                <div className="absolute right-0 top-[calc(100%+4px)] w-[140px] bg-[#12141C] border border-[#202534] rounded-[12px] shadow-lg z-50 overflow-hidden flex flex-col py-1">
                  <button
                    onClick={() => handleSortChange("newest")}
                    className={`flex items-center w-full px-4 py-2 font-sans font-[500] text-[12px] text-left hover:bg-[#1A1F2B] transition-colors ${sort === "newest" ? "text-white bg-[#1A1F2B]" : "text-[#9CA3AF]"}`}
                  >
                    Newest
                  </button>
                  <button
                    onClick={() => handleSortChange("oldest")}
                    className={`flex items-center w-full px-4 py-2 font-sans font-[500] text-[12px] text-left hover:bg-[#1A1F2B] transition-colors ${sort === "oldest" ? "text-white bg-[#1A1F2B]" : "text-[#9CA3AF]"}`}
                  >
                    Oldest
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full p-4 md:p-6 bg-[#14161A] border border-[#1E2330] rounded-[16px]">
          <div className="flex flex-col gap-4 w-full">
            <h3 className="font-sans font-[600] text-[14px] leading-[20px] text-white m-0">
              Active Members <span className="text-[#6B7280] font-normal">({totalItems})</span>
            </h3>

            <Table className="bg-transparent border-none">
              <thead>
                <TableRow className="border-y border-[#1A1E2A] bg-[#11131A] hover:bg-[#11131A]">
                  <TableHeadCell className="py-3 px-6 text-[#6B7280] font-[700] text-[10.5px] tracking-[0.5px]">Member</TableHeadCell>
                  <TableHeadCell className="py-3 px-4 text-[#6B7280] font-[700] text-[10.5px] tracking-[0.5px]">Phone</TableHeadCell>
                  <TableHeadCell className="py-3 px-4 text-[#6B7280] font-[700] text-[10.5px] tracking-[0.5px]">Joined On</TableHeadCell>
                  <TableHeadCell className="py-3 px-4 text-[#6B7280] font-[700] text-[10.5px] tracking-[0.5px]">Valid Till</TableHeadCell>
                  <TableHeadCell className="py-3 px-6 text-[#6B7280] font-[700] text-[10.5px] tracking-[0.5px]">Plan</TableHeadCell>
                </TableRow>
              </thead>
              <tbody>
                {activePlans.length > 0 ? (
                  activePlans.map((planObj: any, index: number) => {
                    const customer = planObj.gym_customers || {};
                    const profilePic = customer.userAccount?.profilePhoto || null;
                    const joinedDate = customer.createdAt ? new Date(customer.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-';
                    const validTill = planObj.endDate ? new Date(planObj.endDate).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '-';
                    const planName = planObj.gym_membership_plans?.planName || '-';

                    return (
                      <TableRow key={index} className="border-t border-[#171A25]">
                        <TableCell className="py-4 px-6">
                          <div className="flex flex-row items-center gap-3">
                            <Avatar src={profilePic} className="w-9 h-9 border border-[#374151]" />
                            <span className="font-sans font-[600] text-[12px] leading-[16px] text-white">
                              {customer.fullName || '-'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="py-4 px-4">
                          <span className="font-sans font-[400] text-[12px] leading-[16px] text-[#9CA3AF]">
                            {customer.phone || '-'}
                          </span>
                        </TableCell>
                        <TableCell className="py-4 px-4">
                          <span className="font-sans font-[400] text-[12px] leading-[16px] text-[#9CA3AF]">
                            {joinedDate}
                          </span>
                        </TableCell>
                        <TableCell className="py-4 px-4">
                          <span className="font-sans font-[400] text-[12px] leading-[16px] text-[#9CA3AF]">
                            {validTill}
                          </span>
                        </TableCell>
                        <TableCell className="py-4 px-6">
                          {getPlanBadge(planName)}
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center border-t border-[#171A25]">
                      <span className="font-sans font-[500] text-[14px] text-[#9CA3AF]">
                        No records found
                      </span>
                    </TableCell>
                  </TableRow>
                )}
              </tbody>
            </Table>

            <div className="px-2 w-full mt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={10}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
