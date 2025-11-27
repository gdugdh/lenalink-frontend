'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { RouteData } from '@/app/components/features/search/SearchResults';

export type PassengerType = 'adult' | 'child' | 'infant';
export type TariffType = 'tariff1' | 'tariff2' | 'tariff3' | 'tariff4';
export type SeatType = 'random' | 'window' | 'aisle' | 'legroom';

interface BookingState {
  passengerType: PassengerType;
  tariff: TariffType;
  seatType: SeatType;
  selectedRoute: RouteData | null;
}

interface BookingContextType {
  bookingState: BookingState;
  setPassengerType: (type: PassengerType) => void;
  setTariff: (tariff: TariffType) => void;
  setSeatType: (seat: SeatType) => void;
  setSelectedRoute: (route: RouteData | null) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingState, setBookingState] = useState<BookingState>({
    passengerType: 'adult',
    tariff: 'tariff2',
    seatType: 'random',
    selectedRoute: null,
  });

  const setPassengerType = (type: PassengerType) => {
    setBookingState((prev) => ({ ...prev, passengerType: type }));
  };

  const setTariff = (tariff: TariffType) => {
    setBookingState((prev) => ({ ...prev, tariff }));
  };

  const setSeatType = (seat: SeatType) => {
    setBookingState((prev) => ({ ...prev, seatType: seat }));
  };

  const setSelectedRoute = (route: RouteData | null) => {
    setBookingState((prev) => ({ ...prev, selectedRoute: route }));
  };

  return (
    <BookingContext.Provider
      value={{
        bookingState,
        setPassengerType,
        setTariff,
        setSeatType,
        setSelectedRoute,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}

