import type { Metadata } from "next";
import { Suspense } from 'react';
import { SearchPageClient } from './SearchPageClient';

export const metadata: Metadata = {
  title: 'Поиск маршрутов | LenaLink',
  description: 'Найдите лучшие маршруты для вашей поездки. Сравните цены и время в пути.',
  openGraph: {
    title: 'Поиск маршрутов | LenaLink',
    description: 'Найдите лучшие маршруты для вашей поездки',
  },
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="h-12 w-12 border-4 border-[#7B91FF] border-t-transparent rounded-full animate-spin" /></div>}>
      <SearchPageClient />
    </Suspense>
  );
}
