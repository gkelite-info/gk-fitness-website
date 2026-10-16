"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getWebsiteVideoByIdAction } from "@/app/actions/websiteVideos";
import { WebsiteVideo } from "@/lib/types/websiteVideos";
import { UploadVideoHeader } from "./_components/UploadVideoHeader";
import { UploadVideoForm } from "./_components/UploadVideoForm";

function UploadVideoContent() {
  const searchParams = useSearchParams();
  const replaceId = searchParams.get("replaceId");

  const [replaceTarget, setReplaceTarget] = useState<WebsiteVideo | null>(null);
  const [loading, setLoading] = useState(Boolean(replaceId));

  useEffect(() => {
    if (!replaceId) return;

    async function loadTarget() {
      setLoading(true);
      const res = await getWebsiteVideoByIdAction(replaceId as string);
      if (res.success && res.data) {
        setReplaceTarget(res.data);
      }
      setLoading(false);
    }
    loadTarget();
  }, [replaceId]);

  if (loading) {
    return (
      <div className="w-full flex flex-col gap-6 p-4 sm:p-6 lg:p-8 min-h-full">
        <div className="h-10 w-48 bg-[#121622]/60 animate-pulse rounded-xl" />
        <div className="w-full h-96 bg-[#0B0E14] border border-[#1B2232] rounded-2xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-6 p-4 sm:p-6 lg:p-8 min-h-full">
      <UploadVideoHeader isReplacing={Boolean(replaceTarget)} />
      <UploadVideoForm replaceTarget={replaceTarget} />
    </div>
  );
}

export default function UploadVideoPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full p-8 text-center text-[#94A3B8]">
          Loading upload screen...
        </div>
      }
    >
      <UploadVideoContent />
    </Suspense>
  );
}
