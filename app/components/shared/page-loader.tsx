"use client";

import { useEffect, useState } from "react";
import { Spinner } from "@/app/components/ui/spinner";

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading for 1-2 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Даём время для fade-out анимации перед полным скрытием
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }, 130);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <Spinner className="h-12 w-12 text-[#7B91FF]" />
    </div>
  );
}
