'use client';

import { BookingCard } from './BookingCard';
import { EmptyState } from '@/app/components/shared/EmptyState';

interface BookingListProps {
  bookings: any[];
  onViewDetails?: (bookingId: string) => void;
}

export function BookingList({ bookings, onViewDetails }: BookingListProps) {
  if (bookings.length === 0) {
    return (
      <EmptyState
        title="Нет бронирований"
        description="У вас пока нет бронирований. Найдите и забронируйте билеты для вашей поездки"
        actionLabel="Найти билеты"
        onAction={() => window.location.href = '/search'}
      />
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          onViewDetails={onViewDetails ? () => onViewDetails(booking.id) : undefined}
        />
      ))}
    </div>
  );
}

