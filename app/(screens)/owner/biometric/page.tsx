import { Suspense } from "react";
import BiometricClient from "./_components/BiometricClient";

export const metadata = {
  title: "Biometric Management - GK-Gym Life",
};

export default function BiometricPage() {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<div className="flex w-full h-full items-center justify-center text-white">Loading...</div>}>
        <BiometricClient />
      </Suspense>
    </div>
  );
}
