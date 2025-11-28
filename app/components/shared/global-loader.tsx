"use client";

import { useEffect, useState, useMemo } from "react";
import { Spinner } from "@/app/components/ui/spinner";

export function GlobalLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  const minLoadTime = useMemo(() => 500, []);
  const fadeOutTime = useMemo(() => 300, []);

  useEffect(() => {
    // Показываем загрузку минимум немного для плавности
    const minLoadTimeout = setTimeout(() => {
      setIsVisible(false);
      // Даём время для fade-out анимации перед полным скрытием
      setTimeout(() => {
        setIsLoading(false);
      }, fadeOutTime);
    }, minLoadTime);

    // Также скрываем загрузку когда страница полностью загружена
    const handleLoad = () => {
      setTimeout(() => {
        setIsVisible(false);
        // Даём время для fade-out анимации перед полным скрытием
        setTimeout(() => {
          setIsLoading(false);
        }, fadeOutTime);
      }, 200);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => {
      clearTimeout(minLoadTimeout);
      window.removeEventListener("load", handleLoad);
    };
  }, [minLoadTime, fadeOutTime]);

  if (!isLoading) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <Spinner className="h-12 w-12 text-[#7B91FF]" />
    </div>
  );
}

