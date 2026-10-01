import { Suspense } from "react";
import DeviceFormClient from "./_components/DeviceFormClient";

export const metadata = {
  title: "Device Management - GK-Gym Life",
};

export default function DeviceFormPage() {
  return (
    <div className="w-full h-full">
      <Suspense fallback={<div className="flex w-full h-full items-center justify-center text-white">Loading...</div>}>
        <DeviceFormClient />
      </Suspense>
    </div>
  );
}
