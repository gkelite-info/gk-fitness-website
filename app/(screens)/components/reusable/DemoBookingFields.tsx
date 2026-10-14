import { ConsultationRole } from "@/app/actions/consultation";
import { DemoFormErrors, DemoFormValues } from "@/lib/validations/demoValidation";

interface DemoBookingFieldsProps {
  role?: ConsultationRole;
  onRoleChange?: (role: ConsultationRole) => void;
  name: string;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  email: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  gymName: string;
  onGymNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  city: string;
  onCityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  memberCount: string;
  onMemberCountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  phone: string;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  agreeContact: boolean;
  onAgreeContactChange: (checked: boolean) => void;
  agreeMeta: boolean;
  onAgreeMetaChange: (checked: boolean) => void;
  errors: DemoFormErrors;
  touched: Partial<Record<keyof DemoFormValues, boolean>>;
  onBlur: (field: keyof DemoFormValues) => void;
}

export default function DemoBookingFields({
  role = "owner",
  onRoleChange,
  name,
  onNameChange,
  email,
  onEmailChange,
  gymName,
  onGymNameChange,
  city,
  onCityChange,
  memberCount,
  onMemberCountChange,
  phone,
  onPhoneChange,
  agreeContact,
  onAgreeContactChange,
  agreeMeta,
  onAgreeMetaChange,
  errors,
  touched,
  onBlur,
}: DemoBookingFieldsProps) {
  return (
    <div className="space-y-3.5">
      <div>
        <label className="block text-xs font-medium text-[#CBD5E1] mb-1">
          What is your role in this gym?
        </label>
        <input
          type="text"
          value={role ? (role === "owner" ? "Owner" : role.charAt(0).toUpperCase() + role.slice(1)) : "Owner"}
          readOnly
          disabled
          className="w-full h-11 px-3.5 rounded-xl bg-[#090A0E] border border-white/10 text-white/90 text-sm outline-none cursor-not-allowed select-none opacity-80"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-[#CBD5E1] mb-1">
          Your name
        </label>
        <input
          type="text"
          placeholder="Your full name"
          value={name}
          onChange={onNameChange}
          onBlur={() => onBlur("name")}
          className={`w-full h-11 px-3.5 rounded-xl bg-[#090A0E] border text-white text-sm outline-none transition-colors capitalize ${
            touched.name && errors.name
              ? "border-red-500/80 focus:border-red-500 ring-1 ring-red-500/20"
              : "border-white/10 focus:border-[#D4FF32]"
          }`}
        />
        {touched.name && errors.name && (
          <p className="text-[11px] text-red-400 mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-medium text-[#CBD5E1] mb-1">
          Your email address
        </label>
        <input
          type="email"
          placeholder="e.g. rahul@example.com"
          value={email}
          onChange={onEmailChange}
          onBlur={() => onBlur("email")}
          className={`w-full h-11 px-3.5 rounded-xl bg-[#090A0E] border text-white text-sm outline-none transition-colors ${
            touched.email && errors.email
              ? "border-red-500/80 focus:border-red-500 ring-1 ring-red-500/20"
              : "border-white/10 focus:border-[#D4FF32]"
          }`}
        />
        {touched.email && errors.email && (
          <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-[#CBD5E1] mb-1">
            Gym name
          </label>
          <input
            type="text"
            placeholder="e.g. Iron Fitness Hub"
            value={gymName}
            onChange={onGymNameChange}
            onBlur={() => onBlur("gymName")}
            className={`w-full h-11 px-3.5 rounded-xl bg-[#090A0E] border text-white text-sm outline-none transition-colors capitalize ${
              touched.gymName && errors.gymName
                ? "border-red-500/80 focus:border-red-500 ring-1 ring-red-500/20"
                : "border-white/10 focus:border-[#D4FF32]"
            }`}
          />
          {touched.gymName && errors.gymName && (
            <p className="text-[11px] text-red-400 mt-1">{errors.gymName}</p>
          )}
        </div>
        <div>
          <label className="block text-xs font-medium text-[#CBD5E1] mb-1">
            Gym city
          </label>
          <input
            type="text"
            placeholder="e.g. Hyderabad, Mumbai"
            value={city}
            onChange={onCityChange}
            onBlur={() => onBlur("city")}
            className={`w-full h-11 px-3.5 rounded-xl bg-[#090A0E] border text-white text-sm outline-none transition-colors capitalize ${
              touched.city && errors.city
                ? "border-red-500/80 focus:border-red-500 ring-1 ring-red-500/20"
                : "border-white/10 focus:border-[#D4FF32]"
            }`}
          />
          {touched.city && errors.city && (
            <p className="text-[11px] text-red-400 mt-1">{errors.city}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-[#CBD5E1] mb-1">
          Active member count
        </label>
        <input
          type="text"
          placeholder="e.g. 250"
          value={memberCount}
          onChange={onMemberCountChange}
          onBlur={() => onBlur("memberCount")}
          className={`w-full h-11 px-3.5 rounded-xl bg-[#090A0E] border text-white text-sm outline-none transition-colors ${
            touched.memberCount && errors.memberCount
              ? "border-red-500/80 focus:border-red-500 ring-1 ring-red-500/20"
              : "border-white/10 focus:border-[#D4FF32]"
          }`}
        />
        {touched.memberCount && errors.memberCount && (
          <p className="text-[11px] text-red-400 mt-1">{errors.memberCount}</p>
        )}
      </div>

      <div>
        <label className="block text-xs font-medium text-[#CBD5E1] mb-1">
          Your Indian mobile number
        </label>
        <div className="relative flex items-center">
          <span className="absolute left-3.5 text-xs font-semibold text-[#94A3B8] select-none pointer-events-none">
            +91
          </span>
          <input
            type="tel"
            maxLength={10}
            placeholder="9876543210"
            value={phone}
            onChange={onPhoneChange}
            onBlur={() => onBlur("phone")}
            className={`w-full h-11 pl-12 pr-3.5 rounded-xl bg-[#090A0E] border text-white text-sm outline-none transition-colors ${
              touched.phone && errors.phone
                ? "border-red-500/80 focus:border-red-500 ring-1 ring-red-500/20"
                : "border-white/10 focus:border-[#D4FF32]"
            }`}
          />
        </div>
        {touched.phone && errors.phone && (
          <p className="text-[11px] text-red-400 mt-1">{errors.phone}</p>
        )}
      </div>

      <div className="space-y-2 pt-1">
        <div>
          <label className="flex items-start gap-2.5 text-xs text-[#94A3B8] cursor-pointer">
            <input
              type="checkbox"
              checked={agreeContact}
              onChange={(e) => onAgreeContactChange(e.target.checked)}
              className="mt-0.5 rounded accent-[#D4FF32] h-4 w-4 shrink-0"
            />
            <span>I agree that GK- Gym Life may contact me about this gym business enquiry.</span>
          </label>
          {touched.agreeContact && errors.agreeContact && (
            <p className="text-[11px] text-red-400 mt-1 ml-6">{errors.agreeContact}</p>
          )}
        </div>

        <label className="flex items-start gap-2.5 text-xs text-[#94A3B8] cursor-pointer">
          <input
            type="checkbox"
            checked={agreeMeta}
            onChange={(e) => onAgreeMetaChange(e.target.checked)}
            className="mt-0.5 rounded accent-[#D4FF32] h-4 w-4 shrink-0"
          />
          <span>Optional: allow GK- Gym Life to share hashed contact identifiers and enquiry outcomes with Meta to measure its ads.</span>
        </label>
      </div>
    </div>
  );
}
