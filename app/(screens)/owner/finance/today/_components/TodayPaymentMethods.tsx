import { Lightning, CreditCard, Money, Bank } from "@phosphor-icons/react/dist/ssr";

const METHODS_DATA = [
  { 
    name: "UPI", 
    revenue: "₹5,200", 
    icon: <Lightning size={16} weight="fill" />,
    color: "#CCFF00",
    bgColor: "#151B17"
  },
  { 
    name: "Card", 
    revenue: "₹2,300", 
    icon: <CreditCard size={16} weight="fill" />,
    color: "#A855F7",
    bgColor: "#171520"
  },
  { 
    name: "Cash", 
    revenue: "₹850", 
    icon: <Money size={16} weight="fill" />,
    color: "#F59E0B",
    bgColor: "#1B1713"
  },
  { 
    name: "Net Banking", 
    revenue: "₹100", 
    icon: <Bank size={16} weight="fill" />,
    color: "#3B82F6",
    bgColor: "#131821"
  }
];

export default function TodayPaymentMethods() {
  return (
    <div className="flex flex-col p-5 w-full h-full bg-[#14171C] border border-[#20252E] rounded-[12px]">
      <div className="flex flex-row items-center gap-2 pb-6">
        <CreditCard size={16} weight="regular" className="text-[#94A3B8]" />
        <h2 className="font-[600] text-[13px] leading-[16px] text-white m-0">
          Payment Methods
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {METHODS_DATA.map((method, index) => (
          <div 
            key={index} 
            className="flex flex-col justify-center items-center p-4 gap-2 w-full rounded-[8px] border border-[#1D222B]"
            style={{ backgroundColor: method.bgColor }}
          >
            <div style={{ color: method.color }}>
              {method.icon}
            </div>
            <div className="flex flex-col items-center gap-0.5 min-w-0 w-full">
              <span className="font-[500] text-[11px] leading-[14px] text-[#94A3B8] truncate w-full text-center">
                {method.name}
              </span>
              <span className="font-[700] text-[14px] leading-[20px] text-white truncate w-full text-center">
                {method.revenue}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
