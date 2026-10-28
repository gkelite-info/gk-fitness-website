interface GlobalTrainerGreetingProps {
  trainerName?: string;
}

export default function GlobalTrainerGreeting({
  trainerName = "Rahul",
}: GlobalTrainerGreetingProps) {
  const currentHour = new Date().getHours();
  let greeting = "Good morning";
  if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon";
  } else if (currentHour >= 17) {
    greeting = "Good evening";
  }

  return (
    <div className="mb-5 pt-1">
      <h1 className="text-white text-2xl sm:text-3xl font-extrabold tracking-tight">
        {greeting},{trainerName}
      </h1>
      <span className="text-[#8E8E93] text-sm font-medium tracking-wide block mt-1">
        Global Trainer
      </span>
    </div>
  );
}

