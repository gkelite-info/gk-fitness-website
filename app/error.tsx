"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error caught by error.tsx:", error);
  }, [error]);

  return (
    <div className="bg-[#090A0E] text-white flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-[#14151A] p-8 rounded-2xl border border-white/10 max-w-lg w-full text-center shadow-xl">
        <div className="text-[#ff4444] mb-4 flex justify-center">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-4">Oops! Something went wrong.</h2>
        <p className="text-gray-400 mb-6 text-sm break-words">
          {error.message || "An unexpected error occurred. If this is a production environment, ensure all environment variables are correctly set."}
        </p>
        <button
          onClick={() => reset()}
          className="bg-[#D4FF32] text-black px-6 py-2 rounded-full font-semibold hover:bg-[#bce628] transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
