"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@/app/components/ui/spinner";

export function GlobalLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Показываем загрузку минимум немного для плавности
    const minLoadTime = setTimeout(() => {
      setIsVisible(false);
      // Даём время для fade-out анимации перед полным скрытием
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }, 500);

    // Также скрываем загрузку когда страница полностью загружена
    const handleLoad = () => {
      setTimeout(() => {
        setIsVisible(false);
        // Даём время для fade-out анимации перед полным скрытием
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
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
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <Spinner className="h-12 w-12 text-[#7B91FF]" />
    </div>
  );
}

