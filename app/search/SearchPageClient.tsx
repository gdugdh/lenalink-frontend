'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageLoader } from '@/app/components/shared/page-loader';
import { UnifiedHeader } from '@/app/components/shared/unified-header';
import { InsuranceModal } from '@/app/components/features/insurance/InsuranceModal';
import { SearchBar } from '@/app/components/features/search/SearchBar';
import { DatePriceBand } from '@/app/components/features/search/DatePriceBand';
import { SearchFilters, SearchFiltersButton } from '@/app/components/features/search/SearchFilters';
import { SearchResults, type RouteData } from '@/app/components/features/search/SearchResults';
import { routes } from '@/app/lib/routes';
import { useRouter } from 'next/navigation';
import { extractCityName, getCityCode } from '@/app/lib/cities';

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<RouteData | null>(null);

  // Получаем параметры из URL
  const fromParam = searchParams.get('from') || '';
  const toParam = searchParams.get('to') || '';

  const fromCity = extractCityName(fromParam);
  const toCity = extractCityName(toParam);
  const fromCode = getCityCode(fromCity);
  const toCode = getCityCode(toCity);

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
            <SearchResults onRouteClick={handleRouteClick} />
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

