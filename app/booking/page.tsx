import type { Metadata } from "next";
import { Suspense } from 'react';
import { BookingPageClient } from './BookingPageClient';

export const metadata: Metadata = {
  title: 'Бронирование | LenaLink',
  description: 'Заполните данные пассажира для завершения бронирования маршрута',
  openGraph: {
    title: 'Бронирование | LenaLink',
    description: 'Завершите бронирование вашего маршрута',
  },
};

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="h-12 w-12 border-4 border-[#7B91FF] border-t-transparent rounded-full animate-spin" /></div>}>
      <BookingPageClient />
    </Suspense>
  );
}
