/**
 * Hook for creating bookings
 */

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from './use-toast';
import { backendApi } from '../lib/backend-api';
import { useBooking } from '../lib/booking-context';
import { useAuth } from '../context/AuthContext';
import { transformPassengerDataToApiFormat } from '../lib/booking-transforms';
import { routes } from '../lib/routes';
import type { PaymentMethod } from './use-payment-method';

export function useCreateBooking(selectedPayment: string, paymentMethodMap: Record<string, 'card' | 'yookassa' | 'cloudpay' | 'sberpay'>) {
  const router = useRouter();
  const { toast } = useToast();
  const { session } = useAuth();
  const { bookingState, setBookingId } = useBooking();
  const [isCreatingBooking, setIsCreatingBooking] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createBooking = useCallback(async () => {
    // Check that all data is present
    if (!bookingState.selectedRoute) {
      const error = new Error('Route not selected');
      setError(error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    if (!bookingState.passengerData) {
      const error = new Error('Passenger data not filled');
      setError(error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    if (!session) {
      const error = new Error('Login required to create booking');
      setError(error);
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
      router.push('/?modal=login');
      return;
    }

    setIsCreatingBooking(true);
    setError(null);

    try {
      const passenger = transformPassengerDataToApiFormat(bookingState.passengerData, session);

      const bookingRequest = {
        route_id: bookingState.selectedRoute.id,
        passenger,
        include_insurance: bookingState.tariff !== 'tariff1', // Include insurance if not base tariff
        payment_method: paymentMethodMap[selectedPayment] || 'card',
      };

      const booking = await backendApi.createBooking(bookingRequest);
      
      // Save booking ID
      setBookingId(booking.id);

      toast({
        title: 'Booking created',
        description: 'Your booking has been successfully created',
      });

      router.push(routes.confirmation);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create booking');
      setError(error);
      if (process.env.NODE_ENV === 'development') {
        console.error('Error creating booking:', err);
      }
      toast({
        title: 'Booking creation error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsCreatingBooking(false);
    }
  }, [bookingState, session, selectedPayment, paymentMethodMap, router, toast, setBookingId]);

  return {
    createBooking,
    isCreatingBooking,
    error,
  };
}

