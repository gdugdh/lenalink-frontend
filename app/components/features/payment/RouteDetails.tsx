'use client';

import { useBooking } from '@/app/lib/booking-context';
import { extractCityName } from '@/app/lib/cities';

export function RouteDetails() {
  const { bookingState } = useBooking();
  const route = bookingState.selectedRoute;

  if (!route) {
    return (
      <div className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-xl font-bold text-[#022444]">
          Детали маршрута
        </h2>
        <p className="text-[#022444]">Маршрут не выбран</p>
      </div>
    );
  }

  // Извлекаем названия городов
  const departureCity = extractCityName(route.departureCity);
  const arrivalCity = extractCityName(route.arrivalCity);
  const routeCodes = route.routeCodes || [];

  // Определяем количество сегментов (пересадок)
  const segmentsCount = routeCodes.length > 0 ? routeCodes.length - 1 : 1;
  const transfersText = segmentsCount > 1 ? `${segmentsCount} сегмента` : 'Без пересадок';

  // Иконки для разных типов транспорта
  const getTransportIcon = (index: number) => {
    if (index === 0) {
      // Первый сегмент - самолет
      return (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#558DCA]">
          <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
          </svg>
        </div>
      );
    } else if (routeCodes.length === 3 && index === 1) {
      // Промежуточный сегмент - автобус
      return (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7B91FF]">
          <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
          </svg>
        </div>
      );
    } else {
      // Последний сегмент - речной транспорт
      return (
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#96FFFF]">
          <svg className="h-5 w-5 text-[#022444]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.48.26-.6.5s-.15.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z"/>
          </svg>
        </div>
      );
    }
  };

  // Создаем сегменты маршрута
  const renderSegments = () => {
    const segments = [];

    if (routeCodes.length >= 2) {
      // Основной сегмент: от начальной до конечной точки или до первой пересадки
      segments.push(
        <div key="segment-0" className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-3">
            {getTransportIcon(0)}
            <div>
              <div className="font-medium text-[#022444]">
                {departureCity} {routeCodes[0]} → {routeCodes.length > 2 ? 'Якутск' : arrivalCity} {routeCodes.length > 2 ? routeCodes[1] : routeCodes[routeCodes.length - 1]}
              </div>
              <div className="text-xs text-[#022444]">
                {route.departureTime} - {routeCodes.length > 2 ? '19:30' : route.arrivalTime} • {route.carrier || 'S7 Airlines'} • {routeCodes.length > 2 ? '10ч 30мин' : route.duration}
              </div>
            </div>
          </div>
        </div>
      );

      // Если есть пересадки (больше 2 кодов)
      if (routeCodes.length === 3) {
        // Промежуточный сегмент (трансфер)
        segments.push(
          <div key="segment-1" className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-3">
              {getTransportIcon(1)}
              <div>
                <div className="font-medium text-[#022444]">
                  Аэропорт → Речной порт
                </div>
                <div className="text-xs text-[#022444]">
                  20:00 - 20:30 • АвиБус • 30мин
                </div>
              </div>
            </div>
          </div>
        );

        // Последний сегмент
        segments.push(
          <div key="segment-2" className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getTransportIcon(2)}
              <div>
                <div className="font-medium text-[#022444]">
                  Якутск → {arrivalCity}
                </div>
                <div className="text-xs text-[#022444]">
                  21:00 - {route.arrivalTime} • Ленские Зори • 9ч
                </div>
              </div>
            </div>
          </div>
        );
      }
    } else {
      // Прямой рейс без пересадок
      segments.push(
        <div key="segment-0" className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getTransportIcon(0)}
            <div>
              <div className="font-medium text-[#022444]">
                {departureCity} → {arrivalCity}
              </div>
              <div className="text-xs text-[#022444]">
                {route.departureTime} - {route.arrivalTime} • {route.carrier || 'S7 Airlines'} • {route.duration}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return segments;
  };

  return (
    <div className="rounded-lg border bg-white p-6">
      <h2 className="mb-4 text-xl font-bold text-[#022444]">
        Детали маршрута
      </h2>
      <div className="mb-4 flex items-center justify-between rounded-lg bg-blue-50 p-4">
        <div>
          <div className="text-2xl font-bold text-[#022444]">
            {departureCity} → {arrivalCity}
          </div>
          <div className="text-sm text-[#022444]">
            {route.departureDate} • {transfersText} • {route.duration}
          </div>
        </div>
      </div>

      <div className="space-y-3 text-sm">
        {renderSegments()}
      </div>
    </div>
  );
}
