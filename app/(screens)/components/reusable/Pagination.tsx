"use client";

import { CaretLeft, CaretRight, CaretDoubleLeft, CaretDoubleRight } from "@phosphor-icons/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, totalItems, itemsPerPage = 20, onPageChange }: PaginationProps) {
  // Logic to calculate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  const pages = getPageNumbers();
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between w-full mt-6 py-4 border-t border-[#1D2127] gap-4 sm:gap-0">
      <span className="font-sans font-medium text-[13px] text-[#64748B]">
        Showing <strong className="text-white font-semibold">{startItem}</strong> to <strong className="text-white font-semibold">{endItem}</strong> of <strong className="text-white font-semibold">{totalItems}</strong> entries
      </span>
      
      <div className="flex flex-row items-center gap-1.5">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#14161A] border border-[#22262D] text-[#94A3B8] hover:text-white hover:border-[#323842] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <CaretDoubleLeft size={14} weight="bold" />
        </button>
        
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#14161A] border border-[#22262D] text-[#94A3B8] hover:text-white hover:border-[#323842] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <CaretLeft size={14} weight="bold" />
        </button>

        <div className="flex flex-row items-center gap-1 mx-2">
          {pages.map((page, index) => {
            if (page === '...') {
              return (
                <span key={`ellipsis-${index}`} className="flex items-center justify-center w-8 h-8 font-sans font-bold text-[14px] text-[#64748B]">
                  ...
                </span>
              );
            }

            const isCurrent = page === currentPage;
            return (
              <button
                key={`page-${page}`}
                onClick={() => onPageChange(page as number)}
                className={`flex items-center justify-center w-8 h-8 rounded-lg font-sans font-bold text-[13px] transition-all cursor-pointer ${
                  isCurrent 
                    ? "bg-[#D2F829] text-black shadow-[0_0_12px_rgba(210,248,41,0.2)]" 
                    : "bg-[#14161A] border border-[#22262D] text-[#94A3B8] hover:text-white hover:border-[#323842]"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#14161A] border border-[#22262D] text-[#94A3B8] hover:text-white hover:border-[#323842] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <CaretRight size={14} weight="bold" />
        </button>
        
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#14161A] border border-[#22262D] text-[#94A3B8] hover:text-white hover:border-[#323842] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <CaretDoubleRight size={14} weight="bold" />
        </button>
      </div>
    </div>
  );
}
