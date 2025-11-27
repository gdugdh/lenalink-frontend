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
  onRouteClick?: (route: RouteData) => void;
}

export function SearchResults({ onRouteClick }: SearchResultsProps) {
  const routes: RouteData[] = [
    {
      id: '1',
      badge: 'Оптимальный',
      price: '41 256₽',
      priceDetails:
        '45 854₽ с багажом 23кг — 1 шт Ручная кладь 8кг — 1 шт',
      carrier: 'S7 Airlines',
      carrierCode: 'S7',
      departureTime: '09:00',
      departureCity: 'Москва',
      departureDate: '2 дек, вт',
      arrivalTime: '06:00',
      arrivalCity: 'Олекминск',
      arrivalDate: '3 дек, ср',
      duration: '21ч в пути',
      transfers: '1 пересадка',
      routeCodes: ['MOW', 'YKS', 'OLZ'],
    },
    {
      id: '2',
      badge: 'Самый дешёвый',
      price: '20 884₽',
      priceDetails: '26 818₽ с багажом 10кг — 1 шт Ручная кладь — 1 шт',
      carrier: '',
      carrierCode: undefined,
      departureTime: '13:55',
      departureCity: 'Франкфурт-на-...',
      departureDate: '2 дек, вт',
      arrivalTime: '20:40',
      arrivalCity: 'Казань',
      arrivalDate: '3 дек, ср',
      duration: '1д4ч45м в пути',
      transfers: '1 пересадка',
      routeCodes: ['FRA', 'SAW - IST', 'KZN'],
      showClock: true,
    },
    {
      id: '3',
      badge: 'Самый быстрый',
      price: '41 218₽',
      priceDetails: '45 854₽ с багажом 23кг — 1 шт Ручная кладь 8кг — 1 шт',
      carrier: '',
      carrierCode: 'T',
      departureTime: '18:25',
      departureCity: 'Франкфурт-на-...',
      departureDate: '2 дек, вт',
      arrivalTime: '06:20',
      arrivalCity: 'Казань',
      arrivalDate: '3 дек, ср',
      duration: '9ч55м в пути',
      transfers: '1 пересадка',
      routeCodes: ['FRA', 'IST', 'KZN'],
    },
  ];

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

