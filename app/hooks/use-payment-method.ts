/**
 * Хук для управления выбранным способом оплаты
 */

import { useState, useMemo } from 'react';

export type PaymentMethod = 'card' | 'yookassa' | 'cloudpay' | 'sberpay' | 'sbp' | 'apple' | 'google';

export function usePaymentMethod() {
  const [selectedPayment, setSelectedPayment] = useState<string>('card');

  const paymentMethodMap: Record<string, 'card' | 'yookassa' | 'cloudpay' | 'sberpay'> = useMemo(() => ({
    card: 'card',
    yookassa: 'yookassa',
    cloudpay: 'cloudpay',
    sberpay: 'sberpay',
  }), []);

  return {
    selectedPayment,
    setSelectedPayment,
    paymentMethodMap,
  };
}

