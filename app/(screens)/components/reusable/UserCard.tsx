import { CaretRight, Phone, Star, CalendarBlank } from "@phosphor-icons/react/dist/ssr";

export interface UserCardProps {
  id: string;
  name: string;
  status: "Active" | "Inactive";
  phone: string;
  plan: string;
  joinedDate: string;
  validTill: string;
  avatarUrl?: string;
  type?: "customer" | "trainer";
  onClick?: () => void;
}

export default function UserCard({
  id,
  name,
  status,
  phone,
  plan,
  joinedDate,
  validTill,
  avatarUrl,
  type = "customer",
  onClick,
}: UserCardProps) {
  const isActive = status === "Active";

  return (
    <div
      onClick={onClick}
      className="flex flex-col items-start p-5 w-full min-h-[248px] bg-[#14161A] border border-[#22262D] rounded-[16px] cursor-pointer hover:border-[#323842] transition-colors"
    >
      <div className="flex flex-row items-start justify-between w-full mb-[18px]">
        <div className="flex flex-row gap-3">
          <div className="w-[38px] h-[38px] bg-[#2B2D31] rounded-full shadow-[0_0_0_1px_rgba(255,255,255,0.1)] flex items-center justify-center overflow-hidden shrink-0 mt-0.5">
            {avatarUrl ? (
              <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-[#717885] text-[12px] font-bold">{name.charAt(0)}</span>
            )}
          </div>

          <div className="flex flex-col justify-center gap-1.5">
            <h3 className="font-sans font-bold text-[14px] leading-[18px] text-white">
              {name}
            </h3>
            <span className="font-sans font-medium text-[11px] leading-4 text-[#717885]">
              {id}
            </span>
          </div>
        </div>

        <div className="flex flex-row items-center gap-1.5 mt-1">
          <div className={`px-2 py-0.5 rounded-full border flex items-center justify-center ${isActive ? "bg-[#1C331A] border-[#234D20] text-[#4ADE80]" : "bg-[#2F1B1E] border-[#482025] text-[#F87171]"
            }`}>
            <span className="font-sans font-semibold text-[10px] leading-[15px]">
              {status}
            </span>
          </div>
          <CaretRight size={16} className="text-[#656C79]" weight="regular" />
        </div>
      </div>

      <div className="w-full h-px border-t border-[#1D2127] mb-[15px]" />

      <div className="flex flex-col gap-2.5 w-full">
        <div className="flex flex-row items-center gap-2.5">
          <Phone size={14} className="text-[#737B88]" weight="regular" />
          <span className="font-sans font-normal text-[12px] leading-4 text-[#848C99]">
            {phone}
          </span>
        </div>

        <div className="flex flex-row items-center gap-2.5">
          <div className="w-3.5 h-3.5 bg-[#FFB931] rounded-full flex items-center justify-center">
            <Star size={10} className="text-black" weight="fill" />
          </div>
          <span className="font-sans font-semibold text-[12px] leading-4 text-[#FFB931]">
            {plan}
          </span>
        </div>

        <div className="flex flex-row items-center gap-2.5">
          <CalendarBlank size={14} className="text-[#737B88]" weight="regular" />
          <span className="font-sans font-normal text-[12px] leading-4 text-[#848C99]">
            Joined {joinedDate}
          </span>
        </div>
        {type !== "trainer" && (
          <div className="flex flex-row items-center gap-2.5">
            <CalendarBlank size={14} className="text-[#737B88]" weight="regular" />
            <span className="font-sans font-normal text-[12px] leading-4 text-[#848C99]">
              {isActive ? "Valid till " : "Inactive on "}
              <strong className={`font-normal ${isActive ? "text-white" : "text-[#F87171]"}`}>{validTill}</strong>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
