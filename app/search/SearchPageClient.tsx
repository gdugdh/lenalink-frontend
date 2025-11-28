'use client';

import { useState, Suspense, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { UnifiedHeader } from '@/app/components/shared/unified-header';
import { InsuranceModal } from '@/app/components/features/insurance/InsuranceModal';
import { SearchBar } from '@/app/components/features/search/SearchBar';
import { DatePriceBand } from '@/app/components/features/search/DatePriceBand';
import { SearchFilters, SearchFiltersButton, type FilterState } from '@/app/components/features/search/SearchFilters';
import { SearchResults, type RouteData } from '@/app/components/features/search/SearchResults';
import { extractCityName, getCityCode } from '@/app/lib/cities';
import { useRoutes } from '@/app/hooks/use-routes';
import { useRouteFilters } from '@/app/hooks/use-route-filters';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<RouteData | null>(null);

  // Получаем параметры из URL
  const fromParam = searchParams.get('from') || '';
  const toParam = searchParams.get('to') || '';
  const dateParam = searchParams.get('date') || '';

  const fromCity = extractCityName(fromParam);
  const toCity = extractCityName(toParam);
  const fromCode = getCityCode(fromCity);
  const toCode = getCityCode(toCity);

  // Загружаем маршруты
  const { allRoutes, loading } = useRoutes(fromCity, toCity, dateParam);

  // Фильтруем маршруты
  const initialFilters: FilterState = {
    withBaggage: false,
    transfers: [],
    maxTransferDuration: 6,
    convenientTransfers: false,
    noRecheck: false,
    noVisa: false,
    noAirportChange: false,
    noNightTransfers: false,
  };

  const { filters, setFilters, filteredRoutes } = useRouteFilters(allRoutes, initialFilters);

  const handleRouteClick = useCallback((route: RouteData) => {
    setSelectedRoute(route);
    setIsModalOpen(true);
  }, []);

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
            <SearchResults routes={filteredRoutes} onRouteClick={handleRouteClick} loading={loading} />
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

