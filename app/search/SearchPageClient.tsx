'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PageLoader } from '@/app/components/shared/page-loader';
import { UnifiedHeader } from '@/app/components/shared/unified-header';
import { InsuranceModal } from '@/app/components/features/insurance/InsuranceModal';
import { SearchBar } from '@/app/components/features/search/SearchBar';
import { DatePriceBand } from '@/app/components/features/search/DatePriceBand';
import { SearchFilters, SearchFiltersButton } from '@/app/components/features/search/SearchFilters';
import { SearchResults } from '@/app/components/features/search/SearchResults';
import { routes } from '@/app/lib/routes';
import { useRouter } from 'next/navigation';

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Получаем параметры из URL
  const fromParam = searchParams.get('from') || '';
  const toParam = searchParams.get('to') || '';

  // Извлекаем название города из полной строки (например, "Москва, Россия" -> "Москва")
  const extractCityName = (fullCity: string): string => {
    if (!fullCity) return '';
    const parts = fullCity.split(',');
    return parts[0]?.trim() || fullCity;
  };

  // Маппинг городов на коды аэропортов (можно расширить)
  const getCityCode = (cityName: string): string => {
    const cityCodeMap: Record<string, string> = {
      'Москва': 'MOW',
      'Олекминск': 'YKS',
      'Санкт-Петербург': 'LED',
      'Новосибирск': 'OVB',
      'Екатеринбург': 'SVX',
      'Казань': 'KZN',
      'Нижний Новгород': 'GOJ',
      'Челябинск': 'CEK',
      'Самара': 'KUF',
      'Омск': 'OMS',
      'Ростов-на-Дону': 'ROV',
      'Уфа': 'UFA',
      'Красноярск': 'KJA',
      'Воронеж': 'VOZ',
      'Пермь': 'PEE',
      'Волгоград': 'VOG',
      'Краснодар': 'KRR',
      'Саратов': 'RTW',
      'Тюмень': 'TJM',
      'Тольятти': 'TOL',
      'Якутск': 'YKS',
      'Иркутск': 'IKT',
      'Барнаул': 'BAX',
      'Ульяновск': 'ULY',
      'Томск': 'TOF',
      'Кемерово': 'KEJ',
      'Новокузнецк': 'NOZ',
      'Рязань': 'RZN',
      'Астрахань': 'ASF',
      'Пенза': 'PEZ',
      'Липецк': 'LPK',
      'Тула': 'TLA',
      'Киров': 'KVX',
      'Чебоксары': 'CSY',
      'Калининград': 'KGD',
      'Курск': 'URS',
      'Улан-Удэ': 'UUD',
      'Ставрополь': 'STW',
      'Сочи': 'AER',
      'Махачкала': 'MCX',
    };
    return cityCodeMap[cityName] || cityName.substring(0, 3).toUpperCase();
  };

  const fromCity = extractCityName(fromParam);
  const toCity = extractCityName(toParam);
  const fromCode = getCityCode(fromCity);
  const toCode = getCityCode(toCity);

  const handleRouteClick = (routeId: string) => {
    setIsModalOpen(true);
  };

  return (
    <>
      <PageLoader />
      <div className="min-h-screen bg-[#FFFFFF] overflow-x-hidden">
        <UnifiedHeader />

        <SearchBar fromCity={fromCity || 'Москва'} fromCode={fromCode || 'MOW'} toCity={toCity || 'Олекминск'} toCode={toCode || 'YKS'} />

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
          onCloseAction={() => setIsModalOpen(false)}
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

