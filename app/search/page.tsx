import type { Metadata } from "next";
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
  return <SearchPageClient />;
}
