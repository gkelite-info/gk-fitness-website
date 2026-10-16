import { DemoRequestDetailShimmer } from "./_components/DemoRequestDetailShimmer";

export default function Loading() {
  return (
    <div className="w-full p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-101px)]">
      <DemoRequestDetailShimmer />
    </div>
  );
}
