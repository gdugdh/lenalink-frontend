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
      <Spinner className="h-12 w-12 text-[#7B91FF]" />
    </div>
  );
}

