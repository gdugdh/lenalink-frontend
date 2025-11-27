'use client';

import { useState, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageLoader } from '@/app/components/shared/page-loader';
import { UnifiedHeader } from '@/app/components/shared/unified-header';
import { InsuranceModal } from '@/app/components/features/insurance/InsuranceModal';
import { SearchBar } from '@/app/components/features/search/SearchBar';
import { DatePriceBand } from '@/app/components/features/search/DatePriceBand';
import { SearchFilters, SearchFiltersButton } from '@/app/components/features/search/SearchFilters';
import { SearchResults, type RouteData } from '@/app/components/features/search/SearchResults';
import { useRouter } from 'next/navigation';
import { extractCityName, getCityCode } from '@/app/lib/cities';
import { backendApi, type Route as BackendRoute } from '@/app/lib/backend-api';
import { useToast } from '@/app/hooks/use-toast';

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
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<RouteData | null>(null);
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [loading, setLoading] = useState(false);

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
        // Преобразуем названия городов в формат бэкенда (lowercase, без пробелов)
        const fromSlug = fromCity.toLowerCase().replace(/\s+/g, '');
        const toSlug = toCity.toLowerCase().replace(/\s+/g, '');
        
        // Используем дату из параметров или сегодняшнюю дату
        const departureDate = dateParam || new Date().toISOString().split('T')[0];
        
        const response = await backendApi.searchRoutes({
          from: fromSlug,
          to: toSlug,
          departure_date: departureDate,
          passengers: 1,
        });

        // Проверяем, что response и routes существуют
        if (!response) {
          console.error('API returned null or undefined response');
          setRoutes([]);
          toast({
            title: 'Ошибка загрузки маршрутов',
            description: 'Сервер вернул неожиданный ответ',
            variant: 'destructive',
          });
          return;
        }

        if (!response.routes || !Array.isArray(response.routes)) {
          console.warn('API response missing routes array:', response);
          setRoutes([]);
          toast({
            title: 'Нет доступных маршрутов',
            description: 'По вашему запросу маршруты не найдены',
            variant: 'default',
          });
          return;
        }

        const transformedRoutes = response.routes.map((route, index) =>
          transformBackendRouteToRouteData(route, index)
        );
        
        setRoutes(transformedRoutes);
      } catch (error) {
        console.error('Error loading routes:', error);
        toast({
          title: 'Ошибка загрузки маршрутов',
          description: error instanceof Error ? error.message : 'Не удалось загрузить маршруты',
          variant: 'destructive',
        });
        setRoutes([]);
      } finally {
        setLoading(false);
      }
    };

    loadRoutes();
  }, [fromCity, toCity, dateParam, toast]);

  const handleRouteClick = (route: RouteData) => {
    setSelectedRoute(route);
    setIsModalOpen(true);
  };

  return (
    <>
      <PageLoader />
      <div className="min-h-screen bg-[#FFFFFF] overflow-x-hidden">
        <UnifiedHeader />

        <SearchBar fromCity={fromCity || 'Москва'} fromCode={fromCode || 'MOW'} toCity={toCity || 'Олекминск'} toCode={toCode || 'OLZ'} />

        <DatePriceBand />

        {/* Main Content */}
        <div className="mx-auto container px-2 sm:px-4 py-4 sm:py-6 max-w-full overflow-x-hidden">
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 max-w-[1200px] mx-auto">
            {/* Mobile Filter Button */}
            <SearchFiltersButton onClick={() => setIsFiltersOpen(true)} />

            {/* Desktop Sidebar */}
            <SearchFilters isMobile={false} />

            {/* Results */}
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="h-12 w-12 border-4 border-[#7B91FF] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <SearchResults routes={routes} onRouteClick={handleRouteClick} />
            )}
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

