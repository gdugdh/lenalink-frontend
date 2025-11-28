/**
 * Утилиты для преобразования данных маршрутов
 */

import type { Route as BackendRoute, RouteSegment } from './backend-api';
import type { RouteData } from '../components/features/search/SearchResults';

// Форматирование времени маршрута
export function formatRouteTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

// Форматирование даты маршрута
export function formatRouteDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', weekday: 'short' });
}

// Извлечение кодов маршрута из сегментов
export function extractRouteCodes(segments: RouteSegment[]): string[] {
  return segments.map(seg => {
    // Извлекаем код из ID или используем первые буквы города
    return seg.from.id.split('_')[0].toUpperCase() || seg.from.city.substring(0, 3).toUpperCase();
  });
}

// Преобразуем формат бэкенда в формат фронтенда
export function transformBackendRouteToRouteData(route: BackendRoute, index: number): RouteData {
  const firstSegment = route.segments[0];
  const lastSegment = route.segments[route.segments.length - 1];
  
  // Определяем badge в зависимости от типа маршрута
  const badgeMap: Record<string, string> = {
    optimal: 'Оптимальный',
    fastest: 'Самый быстрый',
    cheapest: 'Самый дешёвый',
  };
  
  // Формируем коды маршрута
  const routeCodes = extractRouteCodes(route.segments);
  
  return {
    id: route.id,
    badge: badgeMap[route.type] || 'Оптимальный',
    price: Math.round(route.total_price).toLocaleString('ru-RU') + '₽',
    priceDetails: `${Math.round(route.total_price * 1.1).toLocaleString('ru-RU')}₽ с багажом`,
    carrier: firstSegment.provider || '',
    carrierCode: firstSegment.provider?.substring(0, 2).toUpperCase() || '',
    departureTime: formatRouteTime(firstSegment.departure_time),
    departureCity: firstSegment.from.city,
    departureDate: formatRouteDate(firstSegment.departure_time),
    arrivalTime: formatRouteTime(lastSegment.arrival_time),
    arrivalCity: lastSegment.to.city,
    arrivalDate: formatRouteDate(lastSegment.arrival_time),
    duration: route.total_duration,
    transfers: route.segments.length > 1 ? `${route.segments.length - 1} пересадка` : undefined,
    routeCodes: routeCodes,
    showClock: true,
  };
}

