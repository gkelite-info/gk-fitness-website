export default function GymLocationsHeader() {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
        Gym Locations
      </h1>
      <p className="text-xs sm:text-sm text-[#94A3B8] font-normal leading-relaxed">
        Manage gym locations used for the Nearby Gyms experience in the customer portal.
      </p>
    </div>
  );
}
