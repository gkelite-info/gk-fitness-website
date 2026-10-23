export default function SuperAdminProfileHeader() {
  return (
    <div className="flex items-center gap-2.5 w-full shrink-0">
      <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
        Profile
      </h1>
      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[rgba(212,255,50,0.15)] text-[#D4FF32] border border-[#D4FF32]/30 whitespace-nowrap">
        Super Admin
      </span>
    </div>
  );
}
