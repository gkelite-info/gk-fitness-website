import { CurrencyInr, ChartBar } from "@phosphor-icons/react/dist/ssr";

export default function TodayHeroBanner() {
  return (
    <div 
      className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 gap-6 w-full rounded-[12px] border border-[#203322] shadow-lg"
      style={{
        background: 'linear-gradient(90deg, #121C13 0%, #121815 50%, #121619 100%)'
      }}
    >
      <div className="flex flex-row items-center gap-5">
        <div 
          className="flex justify-center items-center w-[64px] h-[64px] rounded-full shrink-0 shadow-[inset_0px_2px_4px_1px_rgba(0,0,0,0.05)]"
          style={{ background: 'rgba(27, 52, 28, 0.8)', border: '1px solid #2E592F' }}
        >
          <span className="font-['FreeSans'] font-[700] text-[30px] leading-[36px] text-[#A3E635]">
            ₹
          </span>
        </div>
        <div className="flex flex-col items-start gap-0.5">
          <span className="font-[500] text-[12px] leading-[16px] text-[#94A3B8]">
            Today's Revenue
          </span>
          <span className="font-[800] text-[36px] leading-[40px] tracking-[-0.9px] text-white">
            8,450
          </span>
        </div>
      </div>
      
      <div className="flex flex-row items-center gap-7">
        <div className="flex flex-row items-end gap-1.5 shrink-0 opacity-80 h-12">
          <div className="w-2 h-3 bg-[#233F25] rounded-t-[4px]" />
          <div className="w-2 h-5 bg-[#264929] rounded-t-[4px]" />
          <div className="w-2 h-4 bg-[#2F5D33] rounded-t-[4px]" />
          <div className="w-2 h-7 bg-[#3D7942] rounded-t-[4px]" />
          <div className="w-2 h-9 bg-[#52A45A] rounded-t-[4px]" />
          <div className="w-2 h-12 bg-[#65C86F] rounded-t-[4px]" />
        </div>
        <div className="flex flex-col items-start gap-0.5">
          <span className="font-[700] text-[14px] leading-[20px] text-[#A3E635]">
            Great day!
          </span>
          <span className="font-[400] text-[12px] leading-[16px] text-[#94A3B8]">
            Keep up the momentum!
          </span>
        </div>
      </div>
    </div>
  );
}
