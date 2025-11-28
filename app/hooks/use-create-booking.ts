/**
 * Hook for creating bookings
 */

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from './use-toast';
import { useBooking } from '../lib/booking-context';
import { routes } from '../lib/routes';

export function useCreateBooking(selectedPayment?: string, paymentMethodMap?: Record<string, 'card' | 'yookassa' | 'cloudpay' | 'sberpay'>) {
  const router = useRouter();
  const { toast } = useToast();
  const { bookingState, setBookingId } = useBooking();
  const [isCreatingBooking, setIsCreatingBooking] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createBooking = useCallback(async () => {
    // Check that all data is present
    if (!bookingState.selectedRoute) {
      const error = new Error('Маршрут не выбран');
      setError(error);
      toast({
        title: 'Ошибка',
        description: 'Маршрут не выбран',
        variant: 'destructive',
      });
      return;
    }

    if (!bookingState.passengerData) {
      const error = new Error('Данные пассажира не заполнены');
      setError(error);
      toast({
        title: 'Ошибка',
        description: 'Данные пассажира не заполнены',
        variant: 'destructive',
      });
      return;
    }

    setIsCreatingBooking(true);
    setError(null);

    try {
      // Mock payment processing - simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generate mock booking ID
      const mockBookingId = `BK-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // Save booking ID
      setBookingId(mockBookingId);

      toast({
        title: 'Оплата успешна',
        description: 'Ваше бронирование было успешно создано',
      });

      // Redirect to confirmation page with booking details
      router.push(routes.confirmation);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Ошибка при создании бронирования');
      setError(error);
      if (process.env.NODE_ENV === 'development') {
        console.error('Error creating booking:', err);
      }
      toast({
        title: 'Ошибка оплаты',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsCreatingBooking(false);
    }
  }, [bookingState, selectedPayment, paymentMethodMap, router, toast, setBookingId]);

  return {
    createBooking,
    isCreatingBooking,
    error,
  };
}

