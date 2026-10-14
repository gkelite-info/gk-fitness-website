import { ReactNode } from "react";

export interface TableProps {
  children: ReactNode;
  className?: string;
  tableClassName?: string;
}

export function Table({ children, className = "", tableClassName = "" }: TableProps) {
  return (
    <div
      className={`w-full max-w-full overflow-x-auto rounded-[16px] border border-[#22262D] bg-[#14161A] scrollbar-themed touch-pan-x ${className}`}
    >
      <table className={`w-full text-left border-collapse min-w-max ${tableClassName}`}>
        {children}
      </table>
    </div>
  );
}
