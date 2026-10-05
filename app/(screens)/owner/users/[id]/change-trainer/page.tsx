
import ChangeTrainerHeader from "../../../../components/reusable/change-trainer/ChangeTrainerHeader";
import CurrentTrainerHighlight from "../../../../components/reusable/change-trainer/CurrentTrainerHighlight";
import AvailableTrainersSection from "../../../../components/reusable/change-trainer/AvailableTrainersSection";
import { Info } from "@phosphor-icons/react/dist/ssr";

export default async function ChangeTrainerPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;

  return (
    <div className="flex flex-col items-start w-full min-h-screen bg-[#0A0D14]">
      <div className="flex flex-col items-center w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 gap-[20px]">

        <ChangeTrainerHeader
          customerId={resolvedParams.id}
        />

        <CurrentTrainerHighlight customerId={resolvedParams.id} />

        <AvailableTrainersSection customerId={resolvedParams.id} />

        <div className="flex flex-row items-center p-[16px] sm:p-[20px] gap-[12px] sm:gap-[14px] w-full bg-[#10141C] border border-[#212735] rounded-[12px] shrink-0 mt-2">
          <div className="flex justify-center items-center w-[20px] h-[20px] sm:w-[24px] sm:h-[24px] shrink-0 text-[#CCFF00]">
            <Info size={24} weight="bold" />
          </div>
          <span className="font-sans font-normal text-[13px] sm:text-[14px] leading-[18px] sm:leading-[20px] text-[#CBD5E1]">
            Selecting a new trainer will replace the current trainer for this member.
          </span>
        </div>
      </div>
    </div>
  );
}
