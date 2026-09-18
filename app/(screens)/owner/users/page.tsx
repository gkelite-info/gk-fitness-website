import UsersDashboard from "./_components/UsersDashboard";

export default function UsersPage() {
  return (
    <div className="flex flex-col w-full min-h-screen bg-transparent px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-[1200px] mx-auto flex flex-col">
        <UsersDashboard />
      </div>
    </div>
  );
}
