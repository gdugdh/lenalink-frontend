/**
 * Хук для создания бронирования
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
    // Проверяем что все данные есть
    if (!bookingState.selectedRoute) {
      const error = new Error('Маршрут не выбран');
      setError(error);
      toast({
        title: 'Ошибка',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    if (!bookingState.passengerData) {
      const error = new Error('Данные пассажира не заполнены');
      setError(error);
      toast({
        title: 'Ошибка',
        description: error.message,
        variant: 'destructive',
      });
      return;
    }

    if (!session) {
      const error = new Error('Необходимо войти в систему для создания бронирования');
      setError(error);
      toast({
        title: 'Ошибка',
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
        include_insurance: bookingState.tariff !== 'tariff1', // Включаем страховку если не базовый тариф
        payment_method: paymentMethodMap[selectedPayment] || 'card',
      };

      const booking = await backendApi.createBooking(bookingRequest);
      
      // Сохраняем ID бронирования
      setBookingId(booking.id);

      toast({
        title: 'Бронирование создано',
        description: 'Ваше бронирование успешно создано',
      });

      router.push(routes.confirmation);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Не удалось создать бронирование');
      setError(error);
      if (process.env.NODE_ENV === 'development') {
        console.error('Error creating booking:', err);
      }
      toast({
        title: 'Ошибка создания бронирования',
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

