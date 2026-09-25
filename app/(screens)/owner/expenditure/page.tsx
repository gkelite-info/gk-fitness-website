import ExpenditureHeader from "./_components/ExpenditureHeader";
import ExpenditureCards from "./_components/ExpenditureCards";
import ExpenditureFilterBar from "./_components/ExpenditureFilterBar";
import ExpenditureTable from "./_components/ExpenditureTable";

export const metadata = {
  title: "Expenditure | GK-Gym Life",
  description: "Track and manage all gym expenses.",
};

export default function ExpenditurePage() {
  return (
    <div className="flex flex-col px-4 md:px-6 lg:px-7 py-6 gap-6 w-full h-full min-w-0 overflow-y-auto overflow-x-hidden scrollbar-themed max-w-[1024px] mx-auto">
      <ExpenditureHeader />
      <ExpenditureCards />
      <ExpenditureFilterBar />
      <ExpenditureTable />
    </div>
  );
}
