'use client';

import { useState, Suspense, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { UnifiedHeader } from '@/app/components/shared/unified-header';
import { InsuranceModal } from '@/app/components/features/insurance/InsuranceModal';
import { SearchBar } from '@/app/components/features/search/SearchBar';
import { DatePriceBand } from '@/app/components/features/search/DatePriceBand';
import { SearchFilters, SearchFiltersButton, type FilterState } from '@/app/components/features/search/SearchFilters';
import { SearchResults, type RouteData } from '@/app/components/features/search/SearchResults';
import { useRouter } from 'next/navigation';
import { extractCityName, getCityCode, getCitySlug } from '@/app/lib/cities';
import { backendApi, type Route as BackendRoute } from '@/app/lib/backend-api';

// Преобразуем формат бэкенда в формат фронтенда
function transformBackendRouteToRouteData(route: BackendRoute, index: number): RouteData {
  const firstSegment = route.segments[0];
  const lastSegment = route.segments[route.segments.length - 1];
  
  // Определяем badge в зависимости от типа маршрута
  const badgeMap: Record<string, string> = {
    optimal: 'Оптимальный',
    fastest: 'Самый быстрый',
    cheapest: 'Самый дешёвый',
  };
  
  // Форматируем дату и время
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', weekday: 'short' });
  };
  
  // Формируем коды маршрута
  const routeCodes = route.segments.map(seg => {
    // Извлекаем код из ID или используем первые буквы города
    return seg.from.id.split('_')[0].toUpperCase() || seg.from.city.substring(0, 3).toUpperCase();
  });
  
  return {
    id: route.id,
    badge: badgeMap[route.type] || 'Оптимальный',
    price: Math.round(route.total_price).toLocaleString('ru-RU') + '₽',
    priceDetails: `${Math.round(route.total_price * 1.1).toLocaleString('ru-RU')}₽ с багажом`,
    carrier: firstSegment.provider || '',
    carrierCode: firstSegment.provider?.substring(0, 2).toUpperCase() || '',
    departureTime: formatTime(firstSegment.departure_time),
    departureCity: firstSegment.from.city,
    departureDate: formatDate(firstSegment.departure_time),
    arrivalTime: formatTime(lastSegment.arrival_time),
    arrivalCity: lastSegment.to.city,
    arrivalDate: formatDate(lastSegment.arrival_time),
    duration: route.total_duration,
    transfers: route.segments.length > 1 ? `${route.segments.length - 1} пересадка` : undefined,
    routeCodes: routeCodes,
    showClock: true,
  };
}

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<RouteData | null>(null);
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [allRoutes, setAllRoutes] = useState<RouteData[]>([]); // Все загруженные маршруты
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    withBaggage: false,
    transfers: [],
    maxTransferDuration: 6,
    convenientTransfers: false,
    noRecheck: false,
    noVisa: false,
    noAirportChange: false,
    noNightTransfers: false,
  });

  // Получаем параметры из URL
  const fromParam = searchParams.get('from') || '';
  const toParam = searchParams.get('to') || '';
  const dateParam = searchParams.get('date') || '';

  const fromCity = extractCityName(fromParam);
  const toCity = extractCityName(toParam);
  const fromCode = getCityCode(fromCity);
  const toCode = getCityCode(toCity);

  // Загружаем маршруты при изменении параметров поиска
  useEffect(() => {
    const loadRoutes = async () => {
      if (!fromCity || !toCity) {
        setRoutes([]);
        return;
      }

      setLoading(true);
      try {
        // Преобразуем названия городов в формат бэкенда (английские slug'и)
        const fromSlug = getCitySlug(fromCity);
        const toSlug = getCitySlug(toCity);
        
        // Используем дату из параметров или сегодняшнюю дату
        const departureDate = dateParam || new Date().toISOString().split('T')[0];
        
        const response = await backendApi.searchRoutes({
          from: fromSlug,
          to: toSlug,
          departure_date: departureDate,
          passengers: 1,
        });

        // Детальное логирование для отладки
        console.log('API response:', response);
        console.log('Response type:', typeof response);
        console.log('Response keys:', response ? Object.keys(response) : 'null');

        // Проверяем, что response и routes существуют
        if (!response) {
          console.error('API returned null or undefined response');
          setRoutes([]);
          return;
        }

        // Проверяем разные возможные форматы ответа
        let routes: BackendRoute[] = [];
        
        if (Array.isArray(response)) {
          // Если ответ - это массив маршрутов напрямую
          routes = response;
          console.log('Response is array, routes count:', routes.length);
        } else if (response.data && response.data.routes && Array.isArray(response.data.routes)) {
          // Если ответ содержит поле data.routes (новый формат API)
          routes = response.data.routes;
          console.log('Response has data.routes field, routes count:', routes.length);
        } else if (response.routes && Array.isArray(response.routes)) {
          // Если ответ содержит поле routes напрямую (старый формат)
          routes = response.routes;
          console.log('Response has routes field, routes count:', routes.length);
        } else if (response.data && Array.isArray(response.data)) {
          // Если ответ содержит поле data как массив
          routes = response.data;
          console.log('Response has data field as array, routes count:', routes.length);
        } else {
          console.warn('API response missing routes array. Full response:', JSON.stringify(response, null, 2));
          setRoutes([]);
          return;
        }

        if (routes.length === 0) {
          console.log('No routes found in response');
          setRoutes([]);
          return;
        }

        const transformedRoutes = routes.map((route, index) =>
          transformBackendRouteToRouteData(route, index)
        );
        
        setAllRoutes(transformedRoutes);
        // Применяем фильтры к загруженным маршрутам
        applyFilters(transformedRoutes, filters);
      } catch (error) {
        console.error('Error loading routes:', error);
        setRoutes([]);
      } finally {
        setLoading(false);
      }
    };

    loadRoutes();
  }, [fromCity, toCity, dateParam]);

  // Функция применения фильтров
  const applyFilters = useCallback((routesToFilter: RouteData[], currentFilters: FilterState) => {
    let filtered = [...routesToFilter];

    // Фильтр по багажу (показываем priceDetails вместо price)
    if (currentFilters.withBaggage) {
      // В этом случае мы просто показываем маршруты с багажом
      // В реальном приложении это может быть отдельное поле в данных
    }

    // Фильтр по количеству пересадок
    if (currentFilters.transfers.length > 0) {
      filtered = filtered.filter(route => {
        // Извлекаем количество пересадок из строки "1 пересадка" или undefined
        let transferCount = 0;
        if (route.transfers) {
          const match = route.transfers.match(/(\d+)/);
          if (match) {
            transferCount = parseInt(match[1]);
          }
        }
        return currentFilters.transfers.includes(transferCount);
      });
    }

    // Другие фильтры можно добавить позже, когда будут соответствующие данные

    setRoutes(filtered);
  }, []);

  // Применяем фильтры при их изменении
  useEffect(() => {
    if (allRoutes.length > 0) {
      applyFilters(allRoutes, filters);
    }
  }, [filters, allRoutes, applyFilters]);

  const handleRouteClick = (route: RouteData) => {
    setSelectedRoute(route);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="min-h-screen bg-[#FFFFFF] overflow-x-hidden">
        <UnifiedHeader />

        <SearchBar fromCity={fromCity || 'Москва'} fromCode={fromCode || 'MOW'} toCity={toCity || 'Олекминск'} toCode={toCode || 'OLZ'} />

        <DatePriceBand currentDate={dateParam || new Date().toISOString().split('T')[0]} />

        {/* Main Content */}
        <div className="mx-auto container px-2 sm:px-4 py-4 sm:py-6 max-w-full overflow-x-hidden">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 max-w-[1200px] mx-auto">
            {/* Mobile Filter Button */}
            <SearchFiltersButton onClick={() => setIsFiltersOpen(true)} />

            {/* Desktop Sidebar */}
            <SearchFilters
              isMobile={false}
              routes={allRoutes}
              filters={filters}
              onFiltersChange={setFilters}
              loading={loading}
            />

            {/* Results */}
            <SearchResults routes={routes} onRouteClick={handleRouteClick} loading={loading} />
          </div>
        </div>

        <InsuranceModal
          isOpen={isModalOpen}
          onCloseAction={() => {
            setIsModalOpen(false);
            setSelectedRoute(null);
          }}
          route={selectedRoute}
        />

        {/* Mobile Filters Sheet */}
        <SearchFilters
          isMobile={true}
          isOpen={isFiltersOpen}
          onOpenChange={setIsFiltersOpen}
          routes={allRoutes}
          filters={filters}
          onFiltersChange={setFilters}
          loading={loading}
        />
      </div>
    </>
  );
}

export function SearchPageClient() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><div className="h-12 w-12 border-4 border-[#7B91FF] border-t-transparent rounded-full animate-spin" /></div>}>
      <SearchPageContent />
    </Suspense>
  );
}

