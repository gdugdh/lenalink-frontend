'use client';

import React from 'react';
import { RouteHeader } from './RouteHeader';
import { RoutePrice } from './RoutePrice';
import { RouteTimeline } from './RouteTimeline';
import { RouteCarrier } from './RouteCarrier';

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

export const RouteCard = React.memo(function RouteCard({
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
        <RouteHeader
          badge={badge}
          showClock={showClock}
        />
        <RoutePrice price={price} priceDetails={priceDetails} />
        <div className="flex items-center gap-3 sm:gap-6">
          <RouteCarrier carrierCode={carrierCode} carrier={carrier} />
          <RouteTimeline
            departureTime={departureTime}
            departureCity={departureCity}
            departureDate={departureDate}
            arrivalTime={arrivalTime}
            arrivalCity={arrivalCity}
            arrivalDate={arrivalDate}
            duration={duration}
            transfers={transfers}
            routeCodes={routeCodes}
          />
        </div>
      </div>
    </div>
  );
});

