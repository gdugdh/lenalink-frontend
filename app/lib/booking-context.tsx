'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { RouteData } from '@/app/components/features/search/SearchResults';

export type PassengerType = 'adult' | 'child' | 'infant';
export type TariffType = 'tariff1' | 'tariff2' | 'tariff3' | 'tariff4';
export type SeatType = 'random' | 'window' | 'aisle' | 'legroom';

export interface PassengerData {
  firstName: string;
  lastName: string;
  middleName?: string;
  citizenship: string;
  gender: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
  passportNumber?: string;
  email?: string;
  phone?: string;
}

interface BookingState {
  passengerType: PassengerType;
  tariff: TariffType;
  seatType: SeatType;
  selectedRoute: RouteData | null;
  passengerData: PassengerData | null;
  bookingId: string | null;
}

interface BookingContextType {
  bookingState: BookingState;
  setPassengerType: (type: PassengerType) => void;
  setTariff: (tariff: TariffType) => void;
  setSeatType: (seat: SeatType) => void;
  setSelectedRoute: (route: RouteData | null) => void;
  setPassengerData: (data: PassengerData | null) => void;
  setBookingId: (id: string | null) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingState, setBookingState] = useState<BookingState>({
    passengerType: 'adult',
    tariff: 'tariff1',
    seatType: 'random',
    selectedRoute: null,
    passengerData: null,
    bookingId: null,
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

  const setPassengerData = (data: PassengerData | null) => {
    setBookingState((prev) => ({ ...prev, passengerData: data }));
  };

  const setBookingId = (id: string | null) => {
    setBookingState((prev) => ({ ...prev, bookingId: id }));
  };

  return (
    <BookingContext.Provider
      value={{
        bookingState,
        setPassengerType,
        setTariff,
        setSeatType,
        setSelectedRoute,
        setPassengerData,
        setBookingId,
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

