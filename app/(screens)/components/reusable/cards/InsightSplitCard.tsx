interface InsightCardData {
  title: string;
  tag: {
    text: string;
    type: "success" | "neutral" | "danger" | "warning";
  };
  subtitle: string;
  value: string;
}

interface InsightSplitCardProps {
  sectionTitle: string;
  sectionSubtitle?: string;
  sectionBadge?: string;
  cards: InsightCardData[];
}

export default function InsightSplitCard({
  sectionTitle,
  sectionSubtitle,
  sectionBadge,
  cards
}: InsightSplitCardProps) {
  return (
    <div className="flex flex-col p-4 md:p-6 gap-6 w-full bg-[#10151C] border border-[#1E2A1E] rounded-[16px] shadow-lg">
      <div className="flex flex-row justify-between items-center w-full gap-2 flex-wrap">
        <div className="flex flex-row items-center gap-2">
          <h2 className="font-[700] text-[16px] leading-[24px] text-white m-0">
            {sectionTitle}
          </h2>
          {sectionSubtitle && (
            <>
              <span className="text-[#64748B] text-[10px]">•</span>
              <span className="font-[500] text-[12px] leading-[16px] text-[#64748B]">
                {sectionSubtitle}
              </span>
            </>
          )}
        </div>

        {sectionBadge && (
          <div className="flex flex-row items-center gap-1.5 px-3 py-1 bg-[#1A2613] rounded-full border border-[#2B4019]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#CCFF00]"></div>
            <span className="font-[500] text-[11px] leading-[16px] text-[#D2F829]">
              {sectionBadge}
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {cards.map((card, index) => {
          const isSuccess = card.tag.type === "success";
          const tagBg = isSuccess ? "bg-[#203A11] border border-[#3E6B1D]" : card.tag.type === "danger" ? "bg-[#3A1111] border border-[#6B1D1D]" : "bg-[#161B22] border border-[#30363D]";
          const tagText = isSuccess ? "text-[#A3E635]" : card.tag.type === "danger" ? "text-[#F43F5E]" : "text-[#94A3B8]";

          return (
            <div
              key={index}
              className="flex flex-col justify-between items-start w-full h-[125px] p-4 gap-[10px] bg-[#090D10] border border-[#1A232F] rounded-[12px]"
            >
              <div className="flex flex-row justify-between items-center w-full gap-2">
                <span className="font-sans font-[500] text-[12px] leading-[16px] text-[#A3A3A3]">
                  {card.title}
                </span>
                <div className={`flex items-center justify-center px-2 h-[21px] rounded-full ${tagBg}`}>
                  <span className={`font-sans font-[600] text-[10px] leading-[15px] ${tagText}`}>
                    {card.tag.text}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-start pt-[5px] gap-[5px] w-full">
                <span className="font-sans font-[500] text-[12px] leading-[16px] text-[#A3A3A3]">
                  {card.subtitle}
                </span>
                <span className="font-sans font-[800] text-[24px] leading-[32px] tracking-[-0.6px] text-white">
                  {card.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
