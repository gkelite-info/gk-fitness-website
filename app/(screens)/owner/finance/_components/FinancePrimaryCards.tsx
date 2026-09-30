import { Info, Lightning, Warning, Star, CurrencyInr } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import { ReactNode } from "react";

interface BarData {
  height: string;
  bg: string;
  shadow?: string;
}

interface PrimaryKPICardProps {
  title: string;
  value: string;
  trendValue: number;
  trendSuffix: string;
  gradient: string;
  borderColor: string;
  trendColor: string;
  bars: BarData[];
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  footerIcon: ReactNode;
  footerIconBg: string;
  footerText: ReactNode;
  footerBg: string;
  footerBorder: string;
  className?: string;
}

function PrimaryKPICard(props: PrimaryKPICardProps) {
  return (
    <div className={`flex flex-col relative w-full h-[291px] rounded-[24px] overflow-hidden p-[21px] shrink-0 ${props.className || ""}`} style={{
      background: props.gradient,
      border: `1px solid ${props.borderColor}`
    }}>
      <div className="flex flex-row items-center gap-[6px] z-10">
        <span className="font-sans font-semibold text-[14px] leading-[20px] text-white">{props.title}</span>
        <Info size={14} color="#9CA3AF" />
      </div>

      <div className="flex flex-col gap-1 mt-3 z-10">
        <div className="max-w-[200px] sm:max-w-full overflow-x-auto overflow-y-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-row items-center">
          <CurrencyInr size={30} weight="bold" color="#FFFFFF" className="shrink-0" />
          <span className="font-sans font-extrabold text-[30px] leading-[36px] tracking-[-0.75px] text-white whitespace-nowrap pl-1 pr-2">
            {props.value}
          </span>
        </div>
        <div className="flex flex-row items-center gap-[6px]">
          <span className="font-sans font-semibold text-[12px] leading-[16px] whitespace-nowrap" style={{ color: props.trendColor }}>
            {props.trendValue > 0 ? "↑" : "↓"} {Math.abs(props.trendValue)}%
          </span>
          <span className="font-sans font-normal text-[11px] leading-[16px] text-[#9CA3AF] whitespace-nowrap">{props.trendSuffix}</span>
        </div>
      </div>

      <div className="absolute left-[21px] right-[21px] top-[109px] h-[90px] flex flex-row justify-between items-end z-0">
        <div className="flex flex-row items-end gap-[7px]">
          {props.bars.map((bar, i) => (
            <div key={i} className="w-[12px] rounded-full relative shrink-0" style={{ height: bar.height, background: bar.bg, boxShadow: bar.shadow }}>
              {bar.shadow && <div className="absolute inset-0 bg-[rgba(255,255,255,0.002)] rounded-full"></div>}
            </div>
          ))}
        </div>
        
        <div className="mb-0 shrink-0">
          <Image src={props.imageSrc} alt={props.imageAlt} width={props.imageWidth} height={props.imageHeight} className="w-[90px] h-auto object-contain" />
        </div>
      </div>

      <div className="absolute left-[21px] right-[21px] bottom-[21px] min-h-[53px] py-2 rounded-[16px] flex flex-row items-center px-2.5 gap-2.5 z-10" style={{ background: props.footerBg, border: `1px solid ${props.footerBorder}` }}>
        <div className="w-[24px] h-[24px] rounded-full flex items-center justify-center shrink-0" style={{ background: props.footerIconBg }}>
          {props.footerIcon}
        </div>
        <p className="font-sans font-normal text-[11px] leading-[15px] text-[#D1D5DB] break-words">
          {props.footerText}
        </p>
      </div>
    </div>
  );
}

export default function FinancePrimaryCards() {
  const cardsData: PrimaryKPICardProps[] = [
    {
      title: "Gross Profit",
      value: "1,24,500",
      trendValue: 15.2,
      trendSuffix: "vs last month",
      gradient: "linear-gradient(180deg, #0F1E17 0%, #0D1814 50%, #0A120E 100%)",
      borderColor: "rgba(6, 78, 59, 0.4)",
      trendColor: "#4ADE80",
      bars: [
        { height: "19px", bg: "rgba(16,185,129,0.2)" },
        { height: "28.5px", bg: "rgba(16,185,129,0.3)" },
        { height: "42.75px", bg: "rgba(16,185,129,0.5)" },
        { height: "57px", bg: "rgba(16,185,129,0.7)" },
        { height: "66.5px", bg: "#34D399", shadow: "0px 0px 29px -5px rgba(34,197,94,0.35)" }
      ],
      imageSrc: "/icons/gross-profit.svg",
      imageAlt: "Gross Profit",
      imageWidth: 90,
      imageHeight: 84,
      footerIcon: <Lightning size={14} color="#68F07C" weight="fill" />,
      footerIconBg: "#1F4932",
      footerText: (
        <>
          Profit increased by <CurrencyInr size={11} weight="bold" className="inline relative top-[-1px]" /> 16,500 compared to last month.
        </>
      ),
      footerBg: "#12261C",
      footerBorder: "#1A3F2C"
    },
    {
      title: "Expenditure",
      value: "62,300",
      trendValue: 8.1,
      trendSuffix: "vs last month",
      gradient: "linear-gradient(180deg, #211214 0%, #1B0F11 50%, #120A0B 100%)",
      borderColor: "rgba(76, 5, 25, 0.5)",
      trendColor: "#F43F5E",
      bars: [
        { height: "14.5px", bg: "rgba(244,63,94,0.2)" },
        { height: "24.3px", bg: "rgba(244,63,94,0.3)" },
        { height: "38.8px", bg: "rgba(244,63,94,0.5)" },
        { height: "53.4px", bg: "rgba(244,63,94,0.7)" },
        { height: "68px", bg: "#F43F5E", shadow: "0px 0px 30px -6px rgba(239,68,68,0.35)" }
      ],
      imageSrc: "/icons/expenditure.svg",
      imageAlt: "Expenditure",
      imageWidth: 90,
      imageHeight: 90,
      footerIcon: <Warning size={14} color="#F43F5E" weight="fill" />,
      footerIconBg: "#44171D",
      footerText: (
        <>
          Expenses increased by <CurrencyInr size={11} weight="bold" className="inline relative top-[-1px]" /> 4,700 compared to last month.
        </>
      ),
      footerBg: "#261316",
      footerBorder: "#441B20"
    },
    {
      title: "Net Profit",
      value: "62,200",
      trendValue: 22.6,
      trendSuffix: "vs last month",
      gradient: "linear-gradient(180deg, #0F1E28 0%, #0C1720 50%, #0A1016 100%)",
      borderColor: "rgba(8, 47, 73, 0.5)",
      trendColor: "#34D399",
      bars: [
        { height: "14.5px", bg: "#01214A" },
        { height: "24.3px", bg: "#002E69" },
        { height: "38.8px", bg: "#0148A4" },
        { height: "53.4px", bg: "#0055C1" },
        { height: "68px", bg: "#0D64DB", shadow: "0px 0px 30px -6px rgba(11,107,205,0.35)" }
      ],
      imageSrc: "/icons/net-profit.svg",
      imageAlt: "Net Profit",
      imageWidth: 90,
      imageHeight: 94,
      footerIcon: <Star size={14} color="#22D3EE" weight="fill" />,
      footerIconBg: "#183B55",
      footerText: (
        <>
          Great! Net profit grew by <CurrencyInr size={11} weight="bold" className="inline relative top-[-1px]" /> 11,800 compared to last month.
        </>
      ),
      footerBg: "#102434",
      footerBorder: "#183952"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 w-full">
      {cardsData.map((card, index) => (
        <PrimaryKPICard 
          key={index} 
          {...card} 
          className={index === 2 ? "md:col-span-2 xl:col-span-1" : ""} 
        />
      ))}
    </div>
  );
}
