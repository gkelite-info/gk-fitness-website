import { ReactNode } from "react";

export interface TableBodyProps {
  children: ReactNode;
  className?: string;
}

export function TableBody({ children, className = "" }: TableBodyProps) {
  return (
    <tbody className={`divide-y divide-[#22262D] ${className}`}>
      {children}
    </tbody>
  );
}
