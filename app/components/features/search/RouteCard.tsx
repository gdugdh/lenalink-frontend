'use client';

import { Heart, Share2, Clock, Plane } from 'lucide-react';

interface RouteCardProps {
  badge: string;
  price: string;
  priceDetails: string;
  carrier: string;
  carrierCode?: string;
  departureTime: string;
  departureCity: string;
  departureDate: string;
  arrivalTime: string;
  arrivalCity: string;
  arrivalDate: string;
  duration: string;
  transfers?: string;
  routeCodes?: string[];
  onClick?: () => void;
  showClock?: boolean;
}

export function RouteCard({
  badge,
  price,
  priceDetails,
  carrier,
  carrierCode,
  departureTime,
  departureCity,
  departureDate,
  arrivalTime,
  arrivalCity,
  arrivalDate,
  duration,
  transfers,
  routeCodes,
  onClick,
  showClock = false,
}: RouteCardProps) {
  return (
    <div
      onClick={onClick}
      className="w-full max-w-full text-left cursor-pointer"
    >
      <div className="rounded-lg border bg-white p-3 sm:p-4 md:p-6 shadow-sm transition-shadow hover:shadow-md w-full overflow-hidden">
        <div className="mb-3 sm:mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-[#00C48C] px-2 sm:px-3 py-1 text-xs font-medium text-white">
              {badge}
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            {showClock && (
              <button className="text-[#7B91FF] hover:text-[#E16D32]">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            )}
            <button className="text-[#022444] hover:text-[#7B91FF]">
              <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button className="text-[#022444] hover:text-[#558DCA]">
              <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>

        <div className="mb-3 sm:mb-4">
          <div className="text-2xl sm:text-3xl font-bold text-[#022444]">
            {price}
          </div>
          <div className="text-xs sm:text-sm text-[#022444]">{priceDetails}</div>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#558DCA] shrink-0">
            {carrierCode ? (
              <span className="text-lg sm:text-xl font-bold text-white">
                {carrierCode}
              </span>
            ) : (
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <circle cx="12" cy="12" r="10" />
              </svg>
            )}
          </div>

          <div className="flex flex-1 items-center gap-2 sm:gap-4 min-w-0">
            <div className="min-w-0">
              <div className="text-xl sm:text-2xl font-bold text-[#022444]">
                {departureTime}
              </div>
              <div className="text-xs sm:text-sm text-[#022444] truncate">
                {departureCity}
              </div>
              <div className="text-xs text-[#022444]">{departureDate}</div>
            </div>

            <div className="hidden min-[376px]:flex flex-1 flex-col items-center min-w-0">
              <div className="mb-1 text-xs text-[#022444] text-center">
                {duration}
                {transfers && `, ${transfers}`}
              </div>
              <div className="relative w-full">
                <div className="h-px w-full bg-[#022444]"></div>
                <Plane className="absolute left-1/2 top-1/2 h-3 w-3 sm:h-4 sm:w-4 -translate-x-1/2 -translate-y-1/2 rotate-90 text-[#558DCA]" />
              </div>
              {routeCodes && (
                <div className="mt-1 flex items-center gap-1 sm:gap-2 text-xs flex-wrap justify-center">
                  {routeCodes.map((code, index) => (
                    <span
                      key={index}
                      className={
                        index === 1
                          ? 'font-medium text-[#7B91FF]'
                          : 'text-[#558DCA]'
                      }
                    >
                      {code}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="min-w-0 text-right">
              <div className="text-xl sm:text-2xl font-bold text-[#022444]">
                {arrivalTime}
              </div>
              <div className="text-xs sm:text-sm text-[#022444] truncate">
                {arrivalCity}
              </div>
              <div className="text-xs text-[#022444]">{arrivalDate}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

