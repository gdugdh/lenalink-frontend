"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 1-2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 130);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <Spinner className="h-12 w-12 text-[#7B91FF]" />
        <p className="text-lg font-medium text-[#022444]">Loading...</p>
      </div>
    </div>
  );
}
