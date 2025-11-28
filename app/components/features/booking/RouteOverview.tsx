'use client';

import { useBooking } from '@/app/lib/booking-context';
import { RouteSegmentCard } from './RouteSegmentCard';

export function RouteOverview() {
  const { bookingState } = useBooking();
  const route = bookingState.selectedRoute;

  // Default route data if none is provided
  const defaultRoute = {
    departureTime: '09:00',
    departureCity: 'Москва',
    departureDate: '2 дек, вт',
    arrivalTime: '19:30',
    arrivalCity: 'Якутск',
    arrivalDate: '2 дек, вт',
    duration: '10 ч 30 мин',
    carrier: 'S7 Airlines',
    carrierCode: 'S7',
    routeCodes: ['MOW', 'YKS'],
  };

  const displayRoute = route || defaultRoute;
  const routeCodes = displayRoute.routeCodes || [];
  
  const segments: Array<{
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
  }> = [];

  if (routeCodes.length > 0) {
    segments.push({
      type: 'flight',
      departureTime: displayRoute.departureTime,
      departureCity: displayRoute.departureCity,
      departureCode: routeCodes[0],
      arrivalTime: displayRoute.arrivalTime,
      arrivalCity: displayRoute.arrivalCity,
      arrivalCode: routeCodes[routeCodes.length - 1],
      duration: displayRoute.duration,
      carrier: displayRoute.carrier,
      carrierCode: displayRoute.carrierCode,
    });
  }

  if (displayRoute.departureCity === 'Москва' && displayRoute.arrivalCity === 'Олекминск' && routeCodes.length > 2) {
    segments.push({
      type: 'bus',
      departureTime: '20:00',
      departureCity: 'Аэропорт Якутск',
      arrivalTime: '20:30',
      arrivalCity: 'Якутск, речной порт',
      duration: '30 мин',
    });
    segments.push({
      type: 'river',
      departureTime: '21:00',
      departureCity: 'Якутск, речной порт',
      arrivalTime: displayRoute.arrivalTime,
      arrivalCity: 'Олекминск, речной порт',
      duration: '9 ч',
    });
  }

  return (
    <div className="rounded-lg border bg-white p-3 sm:p-4 md:p-6">
      <h2 className="mb-3 sm:mb-4 text-base sm:text-lg md:text-xl font-bold text-[#022444]">
        Обзор маршрута
      </h2>

      <div className="space-y-3 sm:space-y-4">
        {segments.map((segment, index) => (
          <RouteSegmentCard
            key={index}
            {...segment}
            index={index}
            totalSegments={segments.length}
          />
        ))}
      </div>
    </div>
  );
}

