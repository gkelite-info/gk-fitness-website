"use client";

import {
  CaretLeft,
  CaretRight,
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretDown,
} from "@phosphor-icons/react";

interface ReviewsPaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function ReviewsPagination({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
  onPageSizeChange,
}: ReviewsPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(totalItems, currentPage * pageSize);

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#1E2536] text-xs text-[#8E99AB]">
      <div className="flex items-center gap-3">
        <span>Items per page:</span>
        <div className="relative">
          <select
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="h-8 px-2.5 pr-6 bg-[#0E121A] border border-[#222938] rounded-lg text-white font-semibold text-xs appearance-none focus:outline-none focus:border-[#D4FF32] cursor-pointer"
          >
            <option value={6} className="bg-[#0E121A]">6</option>
            <option value={12} className="bg-[#0E121A]">12</option>
            <option value={24} className="bg-[#0E121A]">24</option>
          </select>
          <CaretDown
            size={12}
            weight="bold"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[#8E99AB] pointer-events-none"
          />
        </div>

        <span className="ml-2">
          Showing {startItem} to {endItem} of {totalItems} results
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="w-8 h-8 rounded-lg border border-[#222938] bg-[#0E121A] text-[#8E99AB] hover:text-white hover:border-[#384562] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center transition-colors"
          title="First page"
        >
          <CaretDoubleLeft size={13} weight="bold" />
        </button>

        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-8 h-8 rounded-lg border border-[#222938] bg-[#0E121A] text-[#8E99AB] hover:text-white hover:border-[#384562] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center transition-colors"
          title="Previous page"
        >
          <CaretLeft size={13} weight="bold" />
        </button>

        {Array.from({ length: totalPages }).map((_, i) => {
          const pageNum = i + 1;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                isActive
                  ? "bg-[#D4FF32] text-black shadow-[0_0_10px_rgba(212,255,50,0.3)]"
                  : "border border-[#222938] bg-[#0E121A] text-[#8E99AB] hover:text-white hover:border-[#384562]"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 rounded-lg border border-[#222938] bg-[#0E121A] text-[#8E99AB] hover:text-white hover:border-[#384562] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center transition-colors"
          title="Next page"
        >
          <CaretRight size={13} weight="bold" />
        </button>

        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="w-8 h-8 rounded-lg border border-[#222938] bg-[#0E121A] text-[#8E99AB] hover:text-white hover:border-[#384562] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center transition-colors"
          title="Last page"
        >
          <CaretDoubleRight size={13} weight="bold" />
        </button>
      </div>
    </div>
  );
}
