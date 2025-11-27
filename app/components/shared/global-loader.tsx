"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Spinner } from "@/app/components/ui/spinner";

export function GlobalLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Показываем загрузку минимум 1 секунду для плавности
    const minLoadTime = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Также скрываем загрузку когда страница полностью загружена
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-[#7B91FF] via-[#558DCA] to-[#96FFFF]">
      <div className="flex flex-col items-center gap-6">
        {/* Логотип */}
        <div className="flex items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white shadow-lg">
            <Image
              src="/logo.png"
              alt="LenaLink Logo"
              width={48}
              height={48}
              className="w-full h-full object-contain p-2"
              priority
            />
          </div>
          <span className="text-3xl font-bold text-white">LenaLink</span>
        </div>

        {/* Спиннер */}
        <div className="flex flex-col items-center gap-3">
          <Spinner className="h-10 w-10 text-white" />
          <p className="text-lg font-medium text-white/90">Загрузка...</p>
        </div>
      </div>
    </div>
  );
}

