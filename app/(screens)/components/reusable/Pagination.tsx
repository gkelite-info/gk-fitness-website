"use client";

import { useState, useRef, useEffect } from "react";
import { CaretLeft, CaretRight, CaretDoubleLeft, CaretDoubleRight } from "@phosphor-icons/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, totalItems, itemsPerPage = 20, onPageChange }: PaginationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isWrapped, setIsWrapped] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkWrap = () => {
      if (container.children.length >= 2) {
        const firstChild = container.children[0] as HTMLElement;
        const lastChild = container.children[container.children.length - 1] as HTMLElement;
        // If the top positions differ, the flex items have wrapped to multiple lines
        setIsWrapped(Math.abs(firstChild.offsetTop - lastChild.offsetTop) > 10);
      }
    };

    const observer = new ResizeObserver(checkWrap);
    observer.observe(container);
    
    // Check initial state
    setTimeout(checkWrap, 0);

    return () => observer.disconnect();
  }, [currentPage, totalPages]);

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
    <div 
      ref={containerRef}
      className={`flex flex-wrap items-center w-full mt-6 py-4 border-t border-[#1D2127] gap-y-4 gap-x-4 ${isWrapped ? 'justify-center' : 'justify-between'}`}
    >
      <span className="font-sans font-medium text-[13px] text-[#64748B] whitespace-nowrap text-center shrink-0">
        Showing <strong className="text-white font-semibold">{startItem}</strong> to <strong className="text-white font-semibold">{endItem}</strong> of <strong className="text-white font-semibold">{totalItems}</strong> entries
      </span>
      
      <div className="flex flex-row flex-wrap items-center justify-center gap-1 sm:gap-1.5 shrink-0">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="hidden sm:flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-lg bg-[#14161A] border border-[#22262D] text-[#94A3B8] hover:text-white hover:border-[#323842] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <CaretDoubleLeft size={14} weight="bold" />
        </button>
        
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-lg bg-[#14161A] border border-[#22262D] text-[#94A3B8] hover:text-white hover:border-[#323842] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <CaretLeft size={14} weight="bold" />
        </button>

        <div className="flex flex-row items-center gap-0.5 sm:gap-1 mx-1 sm:mx-2">
          {pages.map((page, index) => {
            if (page === '...') {
              return (
                <span key={`ellipsis-${index}`} className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 shrink-0 font-sans font-bold text-[12px] sm:text-[14px] text-[#64748B]">
                  ...
                </span>
              );
            }

            const isCurrent = page === currentPage;
            return (
              <button
                key={`page-${page}`}
                onClick={() => onPageChange(page as number)}
                className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-lg font-sans font-bold text-[11px] sm:text-[13px] transition-all cursor-pointer ${
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
          className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-lg bg-[#14161A] border border-[#22262D] text-[#94A3B8] hover:text-white hover:border-[#323842] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <CaretRight size={14} weight="bold" />
        </button>
        
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="hidden sm:flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 shrink-0 rounded-lg bg-[#14161A] border border-[#22262D] text-[#94A3B8] hover:text-white hover:border-[#323842] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <CaretDoubleRight size={14} weight="bold" />
        </button>
      </div>
    </div>
  );
}
