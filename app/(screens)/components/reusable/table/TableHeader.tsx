import { ReactNode } from "react";

export interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}

export function TableHeader({ children, className = "" }: TableHeaderProps) {
  return (
    <thead className={`bg-[#1B1F24] border-b border-[#22262D] ${className}`}>
      {children}
    </thead>
  );
}
