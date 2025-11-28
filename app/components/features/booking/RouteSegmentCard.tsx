'use client';

import { Plane, Bus } from 'lucide-react';

interface RouteSegmentCardProps {
  type: 'flight' | 'bus' | 'river';
  departureTime: string;
  departureCity: string;
  departureCode?: string;
  arrivalTime: string;
  arrivalCity: string;
  arrivalCode?: string;
  duration: string;
  carrier?: string;
  carrierCode?: string;
  index: number;
  totalSegments: number;
}

export function RouteSegmentCard({
  type,
  departureTime,
  departureCity,
  departureCode,
  arrivalTime,
  arrivalCity,
  arrivalCode,
  duration,
  carrier,
  carrierCode,
  index,
  totalSegments,
}: RouteSegmentCardProps) {
  const getIcon = () => {
    if (type === 'flight') {
      return (
        <div className="flex h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full bg-[#558DCA]">
          <Plane className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
        </div>
      );
    }
    if (type === 'bus') {
      return (
        <div className="flex h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full bg-[#7B91FF]">
          <Bus className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
        </div>
      );
    }
    return (
      <div className="flex h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full bg-[#96FFFF]">
        <svg
          className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[#022444]"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.48.26-.6.5s-.15.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z" />
        </svg>
      </div>
    );
  };

  const getLineColor = () => {
    if (type === 'flight') return 'bg-[#558DCA]';
    if (type === 'bus') return 'bg-[#7B91FF]';
    return 'bg-[#96FFFF]';
  };

  const getCarrierText = () => {
    if (type === 'flight') return `Самолет ${carrier ? `• ${carrier}` : ''}`;
    if (type === 'bus') return 'Автобус • АвиБус';
    return 'Речной транспорт • Ленские Зори';
  };

  return (
    <div className={`flex items-start gap-2 sm:gap-3 md:gap-4 ${index < totalSegments - 1 ? 'border-b pb-3 sm:pb-4' : 'pb-3 sm:pb-4'}`}>
      {getIcon()}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
          <div className="min-w-0">
            <div className="text-base sm:text-lg font-bold text-[#022444]">
              {departureTime}
            </div>
            <div className="text-xs sm:text-sm text-[#022444] truncate">
              {departureCity} {departureCode ? `(${departureCode})` : ''}
            </div>
          </div>
          <div className="text-center w-full sm:w-auto order-2 sm:order-2">
            <div className="text-[10px] sm:text-xs text-[#022444]">{duration}</div>
            <div className={`my-1 sm:my-2 h-px w-16 sm:w-20 md:w-24 ${getLineColor()} mx-auto`}></div>
            <div className="text-[10px] sm:text-xs font-medium text-[#022444]">
              {getCarrierText()}
            </div>
          </div>
          <div className="min-w-0 text-left sm:text-right order-3 sm:order-3">
            <div className="text-base sm:text-lg font-bold text-[#022444]">
              {arrivalTime}
            </div>
            <div className="text-xs sm:text-sm text-[#022444] truncate">
              {arrivalCity} {arrivalCode ? `(${arrivalCode})` : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

