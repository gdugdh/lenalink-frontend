'use client';

import { Plane, Bus } from 'lucide-react';
import type { RouteData } from '@/app/components/features/search/SearchResults';
import { RouteSegment } from './RouteSegment';

interface TripDetailsSectionProps {
  route: RouteData;
}

export function TripDetailsSection({ route }: TripDetailsSectionProps) {
  return (
    <div className="mb-6 sm:mb-8">
      <h3 className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 text-base sm:text-lg font-semibold text-[#022444]">
        {route.departureCity} → {route.arrivalCity}
        <span className="text-xs sm:text-sm font-normal text-[#022444]">
          🕐 {route.duration}
        </span>
      </h3>

      {route.routeCodes && route.routeCodes.length > 0 && (
        <RouteSegment
          type="flight"
          departureTime={route.departureTime}
          departureDate={route.departureDate}
          departureCity={route.departureCity}
          departureCode={route.routeCodes[0]}
          arrivalTime={route.arrivalTime}
          arrivalDate={route.arrivalDate}
          arrivalCity={route.arrivalCity}
          arrivalCode={route.routeCodes[route.routeCodes.length - 1]}
          duration={route.duration}
          transfers={route.transfers}
          carrierCode={route.carrierCode}
          carrier={route.carrier}
        />
      )}

      {route.routeCodes && route.routeCodes.length > 2 && (
        <>
          {route.departureCity === 'Москва' && route.arrivalCity === 'Олекминск' && (
            <>
              <RouteSegment
                type="bus"
                departureTime="20:00"
                departureDate={route.departureDate}
                departureCity="Аэропорт Якутск"
                arrivalTime="20:30"
                arrivalDate={route.departureDate}
                arrivalCity="Речной порт Якутск"
                duration="30 мин."
                carrierCode="АБ"
                carrier="АвиБус"
              />
              <RouteSegment
                type="river"
                departureTime="21:00"
                departureDate={route.departureDate}
                departureCity="Якутск • Речной порт"
                arrivalTime={route.arrivalTime}
                arrivalDate={route.arrivalDate}
                arrivalCity="Олекминск • Речной порт"
                duration="9 ч."
                carrierCode="ЛЗ"
                carrier="Ленские Зори"
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

