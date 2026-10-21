import Link from "next/link";
import {
  Buildings,
  User,
  Users,
  Ticket,
  CaretRight,
} from "@phosphor-icons/react/dist/ssr";
import { BreakdownItem } from "./types";

interface BreakdownItemRowProps {
  item: BreakdownItem;
}

export default function BreakdownItemRow({ item }: BreakdownItemRowProps) {
  const getIcon = () => {
    switch (item.iconType) {
      case "gym":
        return (
          <div className="w-10 h-10 rounded-xl bg-[#0D261C] border border-[#164E37]/40 flex items-center justify-center shrink-0">
            <Buildings size={20} weight="fill" className="text-[#10B981]" />
          </div>
        );
      case "user":
        return (
          <div className="w-10 h-10 rounded-xl bg-[#0E2038] border border-[#1E3A5F]/40 flex items-center justify-center shrink-0">
            <User size={20} weight="fill" className="text-[#38BDF8]" />
          </div>
        );
      case "global":
        return (
          <div className="w-10 h-10 rounded-xl bg-[#241432] border border-[#482069]/40 flex items-center justify-center shrink-0">
            <Users size={20} weight="fill" className="text-[#C084FC]" />
          </div>
        );
      case "pass":
        return (
          <div className="w-10 h-10 rounded-xl bg-[#2E180E] border border-[#633017]/40 flex items-center justify-center shrink-0">
            <Ticket size={20} weight="fill" className="text-[#FB923C]" />
          </div>
        );
    }
  };

  const content = (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          {getIcon()}
          <span className="text-xs sm:text-sm font-semibold text-white leading-snug group-hover:text-[#D4FF32] transition-colors">
            {item.title}
          </span>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0 pl-[50px] sm:pl-0">
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <span className="text-xs sm:text-sm font-bold text-white whitespace-nowrap shrink-0">
              {item.amount}
            </span>
            <span className="text-xs font-semibold text-[#94A3B8] w-7 sm:w-8 text-right shrink-0">
              {item.percentage}%
            </span>
          </div>
          <CaretRight
            size={14}
            weight="bold"
            className="text-[#64748B] group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0"
          />
        </div>
      </div>

      <div className="w-full bg-[#1A1D27] h-1.5 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${item.percentage}%`,
            backgroundColor: item.barColor,
          }}
        />
      </div>
    </>
  );

  const containerClasses =
    "flex flex-col gap-2.5 p-3 sm:p-3.5 rounded-xl hover:bg-[#161822] transition-colors group cursor-pointer block";

  if (item.href) {
    return (
      <Link href={item.href} className={containerClasses}>
        {content}
      </Link>
    );
  }

  return <div className={containerClasses}>{content}</div>;
}
