import { Megaphone, CaretRight } from "@phosphor-icons/react/dist/ssr";

export default function AnnouncementsCard() {
  return (
    <div className="w-full bg-[#14151A] border border-white/[0.06] rounded-2xl p-5 pt-[18px] flex flex-col gap-3">
      <div className="flex flex-row justify-between items-center w-full">
        <h3 className="font-['Nimbus_Sans'] font-bold text-[16px] leading-[24px] tracking-[0.4px] text-white">
          Announcements
        </h3>
        <button className="flex flex-row items-center gap-1 group cursor-pointer">
          <span className="font-['Nimbus_Sans'] font-semibold text-[12px] leading-4 text-[#D4FF32] group-hover:underline">
            View All
          </span>
          <CaretRight size={12} color="#D4FF32" weight="bold" />
        </button>
      </div>

      <div className="w-full h-[48px] bg-[#1C1A24] border border-[#6B21A8]/30 rounded-xl px-4 flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-3">
          <Megaphone size={18} color="#D8B4FE" weight="fill" />
          <span className="font-['Nimbus_Sans'] font-medium text-[13px] leading-5 text-[#CBD5E1]">
            Share updates
          </span>
        </div>
        <button className="h-[30px] px-3 bg-[#D4FF32] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#c5f020] transition-colors">
          <span className="font-['Nimbus_Sans'] font-semibold text-[12px] leading-4 text-[#0C0D10]">
            Create Announcement
          </span>
        </button>
      </div>
    </div>
  );
}
