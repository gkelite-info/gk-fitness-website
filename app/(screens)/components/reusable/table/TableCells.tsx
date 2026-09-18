import { ReactNode, TdHTMLAttributes, ThHTMLAttributes, HTMLAttributes } from "react";

export function TableRow({ children, className = "", ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr className={`hover:bg-[rgba(255,255,255,0.02)] transition-colors ${className}`} {...props}>
      {children}
    </tr>
  );
}

export function TableHeadCell({ children, className = "", ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th className={`px-5 py-4 font-sans font-semibold text-[12px] leading-4 text-[#848C99] tracking-wider uppercase border-none whitespace-nowrap ${className}`} {...props}>
      {children}
    </th>
  );
}

export function TableCell({ children, className = "", ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td className={`px-5 py-4 font-sans text-[13px] leading-5 text-white border-none whitespace-nowrap ${className}`} {...props}>
      {children}
    </td>
  );
}
