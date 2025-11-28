'use client';

import { Plane, Bus } from 'lucide-react';

interface RouteSegmentProps {
  type: 'flight' | 'bus' | 'river';
  departureTime: string;
  departureDate: string;
  departureCity: string;
  departureCode?: string;
  arrivalTime: string;
  arrivalDate: string;
  arrivalCity: string;
  arrivalCode?: string;
  duration: string;
  transfers?: string;
  carrierCode?: string;
  carrier?: string;
}

export function RouteSegment({
  type,
  departureTime,
  departureDate,
  departureCity,
  departureCode,
  arrivalTime,
  arrivalDate,
  arrivalCity,
  arrivalCode,
  duration,
  transfers,
  carrierCode,
  carrier,
}: RouteSegmentProps) {
  const getIcon = () => {
    if (type === 'flight') {
      return <Plane className="mt-1 h-4 w-4 sm:h-5 sm:w-5 rotate-90 text-[#558DCA] shrink-0" />;
    }
    if (type === 'bus') {
      return <Bus className="mt-1 h-4 w-4 sm:h-5 sm:w-5 text-[#558DCA] shrink-0" />;
    }
    return (
      <svg
        className="mt-1 h-4 w-4 sm:h-5 sm:w-5 text-[#558DCA] shrink-0"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.48.26-.6.5s-.15.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z" />
      </svg>
    );
  };

  const getCarrierColor = () => {
    if (type === 'bus') return 'bg-blue-100 text-blue-700';
    if (type === 'river') return 'bg-cyan-100 text-cyan-700';
    return 'bg-green-100 text-green-700';
  };

  return (
    <div className="mb-4 space-y-3 sm:space-y-4 rounded-lg border border-gray-200 p-3 sm:p-4">
      <div className="flex items-start gap-2 sm:gap-4">
        <div className="text-right min-w-[60px] sm:min-w-[80px]">
          <div className="text-base sm:text-lg font-bold text-[#022444]">
            {departureTime}
          </div>
          <div className="text-xs text-[#022444]">{departureDate}</div>
        </div>
        {getIcon()}
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm sm:text-base text-[#022444]">
            {departureCity} {departureCode ? `• ${departureCode}` : ''}
          </div>
          <div className="text-xs sm:text-sm text-[#022444]">
            {departureCity === 'Москва' ? 'Аэропорт Домодедово' :
             departureCity === 'Франкфурт-на-...' ? 'Аэропорт Франкфурт' :
             departureCity.includes('Аэропорт') ? departureCity :
             `Аэропорт ${departureCity}`}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 sm:gap-4 pl-12 sm:pl-20">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#022444]">
          <span>{duration}</span>
          {transfers && <span>, {transfers}</span>}
        </div>
        {carrierCode && (
          <div className="flex items-center gap-2">
            <div className={`flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full ${getCarrierColor()}`}>
              <span className="text-xs font-bold">
                {carrierCode}
              </span>
            </div>
            {carrier && (
              <span className="text-xs sm:text-sm font-medium text-[#022444]">
                {carrier}
              </span>
            )}
          </div>
        )}
      </div>
      <div className="flex items-start gap-2 sm:gap-4">
        <div className="text-right min-w-[60px] sm:min-w-[80px]">
          <div className="text-base sm:text-lg font-bold text-[#022444]">
            {arrivalTime}
          </div>
          <div className="text-xs text-[#022444]">{arrivalDate}</div>
        </div>
        {type === 'flight' ? (
          <Plane className="mt-1 h-4 w-4 sm:h-5 sm:w-5 -rotate-90 text-[#558DCA] shrink-0" />
        ) : type === 'bus' ? (
          <Bus className="mt-1 h-4 w-4 sm:h-5 sm:w-5 text-[#558DCA] shrink-0" />
        ) : (
          <svg
            className="mt-1 h-4 w-4 sm:h-5 sm:w-5 text-[#558DCA] shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.48.26-.6.5s-.15.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z" />
          </svg>
        )}
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm sm:text-base text-[#022444]">
            {arrivalCity} {arrivalCode ? `• ${arrivalCode}` : ''}
          </div>
          <div className="text-xs sm:text-sm text-[#022444]">
            {arrivalCity === 'Олекминск' ? 'Речной порт Олекминск' :
             arrivalCity === 'Казань' ? 'Аэропорт Казань' :
             arrivalCity.includes('Речной порт') ? arrivalCity :
             `Аэропорт ${arrivalCity}`}
          </div>
        </div>
      </div>
    </div>
  );
}

