'use client';

import React, { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';
import type { RouteData } from '@/app/components/features/search/SearchResults';

export type PassengerType = 'adult' | 'child' | 'infant';
export type TariffType = 'tarif1' | 'tarif2' | 'tarif3' | 'tarif4';
export type SeatType = 'random' | 'window' | 'aisle' | 'extra_legroom';

export interface SeatSelection {
  segment_index: number;  // Индекс сегмента маршрута
  seat_type: SeatType;    // Тип выбранного места
}

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
  seatSelections: SeatSelection[];  // Массив выбранных мест для каждого сегмента
  includeInsurance: boolean;        // Опциональная страховка
  selectedRoute: RouteData | null;
  passengerData: PassengerData | null;
  bookingId: string | null;
}

interface BookingContextType {
  bookingState: BookingState;
  setPassengerType: (type: PassengerType) => void;
  setTariff: (tariff: TariffType) => void;
  setSeatSelections: (selections: SeatSelection[]) => void;
  setIncludeInsurance: (include: boolean) => void;
  setSelectedRoute: (route: RouteData | null) => void;
  setPassengerData: (data: PassengerData | null) => void;
  setBookingId: (id: string | null) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingState, setBookingState] = useState<BookingState>({
    passengerType: 'adult',
    tariff: 'tarif1',
    seatSelections: [],
    includeInsurance: false,
    selectedRoute: null,
    passengerData: null,
    bookingId: null,
  });

  const setPassengerType = useCallback((type: PassengerType) => {
    setBookingState((prev) => ({ ...prev, passengerType: type }));
  }, []);

  const setTariff = useCallback((tariff: TariffType) => {
    setBookingState((prev) => ({ ...prev, tariff }));
  }, []);

  const setSeatSelections = useCallback((selections: SeatSelection[]) => {
    setBookingState((prev) => ({ ...prev, seatSelections: selections }));
  }, []);

  const setIncludeInsurance = useCallback((include: boolean) => {
    setBookingState((prev) => ({ ...prev, includeInsurance: include }));
  }, []);

  const setSelectedRoute = useCallback((route: RouteData | null) => {
    setBookingState((prev) => ({ ...prev, selectedRoute: route }));
  }, []);

  const setPassengerData = useCallback((data: PassengerData | null) => {
    setBookingState((prev) => ({ ...prev, passengerData: data }));
  }, []);

  const setBookingId = useCallback((id: string | null) => {
    setBookingState((prev) => ({ ...prev, bookingId: id }));
  }, []);

  const value = useMemo(() => ({
        bookingState,
        setPassengerType,
        setTariff,
        setSeatSelections,
        setIncludeInsurance,
        setSelectedRoute,
        setPassengerData,
        setBookingId,
  }), [bookingState, setPassengerType, setTariff, setSeatSelections, setIncludeInsurance, setSelectedRoute, setPassengerData, setBookingId]);

  return (
    <BookingContext.Provider value={value}>
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

