"use client";

import { Spinner } from "@/app/components/ui/spinner";

export function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-300">
      <Spinner className="h-12 w-12 text-[#7B91FF]" />
    </div>
  );
}

