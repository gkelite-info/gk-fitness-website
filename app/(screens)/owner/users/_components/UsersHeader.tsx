import { Plus } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export default function UsersHeader() {
  return (
    <div className="flex flex-row justify-between items-center w-full mt-2">
      <div className="flex flex-col gap-1">
        <h1 className="font-sans font-bold text-[28px] leading-[34px] tracking-tight text-white">
          Users
        </h1>
        <p className="font-sans font-medium text-[13px] leading-5 text-[#94A3B8]">
          Manage your gym members and trainers
        </p>
      </div>
      <Link
        href="/owner/users/add"
        className="flex flex-row items-center justify-center px-5 py-2.5 gap-2 bg-[#D4FF32] hover:bg-[#c2ef2b] rounded-xl transition-all cursor-pointer shadow-[0_4px_6px_-4px_rgba(212,255,50,0.1)] active:scale-[0.98]"
      >
        <Plus size={16} weight="bold" className="text-black" />
        <span className="font-sans font-bold text-[12px] leading-4 text-black uppercase tracking-[0.3px]">
          Register User
        </span>
      </Link>
    </div>
  );
}
