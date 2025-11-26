'use client';

import { useState } from 'react';
import { PageLoader } from '@/app/components/shared/page-loader';
import { UnifiedHeader } from '@/app/components/shared/unified-header';
import { InsuranceModal } from '@/app/components/features/insurance/InsuranceModal';
import { SearchBar } from '@/app/components/features/search/SearchBar';
import { DatePriceBand } from '@/app/components/features/search/DatePriceBand';
import { SearchFilters, SearchFiltersButton } from '@/app/components/features/search/SearchFilters';
import { SearchResults } from '@/app/components/features/search/SearchResults';
import { routes } from '@/app/lib/routes';
import { useRouter } from 'next/navigation';

export default function SearchPage() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleRouteClick = (routeId: string) => {
    setIsModalOpen(true);
  };

  return (
    <>
      <PageLoader />
      <div className="min-h-screen bg-[#FFFFFF] overflow-x-hidden">
        <UnifiedHeader />

        <SearchBar />

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
