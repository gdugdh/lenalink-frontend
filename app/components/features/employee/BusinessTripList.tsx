'use client';

import { BusinessTripCard } from './BusinessTripCard';

interface BusinessTripListProps {
  trips: any[];
}

export function BusinessTripList({ trips }: BusinessTripListProps) {
  return (
    <div className="space-y-4">
      {trips.map((trip) => (
        <BusinessTripCard key={trip.id} trip={trip} />
      ))}
    </div>
  );
}

