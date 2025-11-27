'use client';

import { RouteCard } from './RouteCard';

export interface RouteData {
  id: string;
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
  showClock?: boolean;
}

interface SearchResultsProps {
  routes?: RouteData[];
  onRouteClick?: (route: RouteData) => void;
}

export function SearchResults({ routes = [], onRouteClick }: SearchResultsProps) {
  // Если маршрутов нет, показываем сообщение
  if (routes.length === 0) {
    return (
      <main className="flex-1 min-w-0 overflow-x-hidden">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-gray-500 text-lg">Маршруты не найдены</p>
            <p className="text-gray-400 text-sm mt-2">Попробуйте изменить параметры поиска</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 min-w-0 overflow-x-hidden">
      <div className="space-y-3 sm:space-y-4 w-full">
        {routes.map((route) => (
          <RouteCard
            key={route.id}
            badge={route.badge}
            price={route.price}
            priceDetails={route.priceDetails}
            carrier={route.carrier}
            carrierCode={route.carrierCode}
            departureTime={route.departureTime}
            departureCity={route.departureCity}
            departureDate={route.departureDate}
            arrivalTime={route.arrivalTime}
            arrivalCity={route.arrivalCity}
            arrivalDate={route.arrivalDate}
            duration={route.duration}
            transfers={route.transfers}
            routeCodes={route.routeCodes}
            showClock={route.showClock}
            onClick={() => onRouteClick?.(route)}
          />
        ))}
      </div>
    </main>
  );
}

