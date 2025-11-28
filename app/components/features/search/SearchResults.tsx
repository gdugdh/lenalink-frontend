'use client';

import React from 'react';
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
  loading?: boolean;
}

export const SearchResults = React.memo(function SearchResults({ routes = [], onRouteClick, loading = false }: SearchResultsProps) {
  // Показываем спиннер во время загрузки
  if (loading) {
    return (
      <main className="flex-1 min-w-0 overflow-x-hidden">
        <div className="flex items-center justify-center py-12">
          <div className="h-12 w-12 border-4 border-[#7B91FF] border-t-transparent rounded-full animate-spin" />
        </div>
      </main>
    );
  }

  // Если маршрутов нет, показываем сообщение (только когда не загружается)
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
        {routes.map((route, index) => (
          <RouteCard
            key={`${route.id}-${route.badge}-${index}`}
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
});

