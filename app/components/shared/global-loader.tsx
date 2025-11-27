"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@/app/components/ui/spinner";

export function GlobalLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Показываем загрузку минимум немного для плавности
    const minLoadTime = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    // Также скрываем загрузку когда страница полностью загружена
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 200);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      clearTimeout(minLoadTime);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">
        <Spinner className="h-12 w-12 text-[#7B91FF]" />
        <p className="text-lg font-medium text-[#022444]">Loading...</p>
      </div>
    </div>
  );
}

