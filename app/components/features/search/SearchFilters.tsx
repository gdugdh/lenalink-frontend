'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/app/components/ui/sheet';
import type { RouteData } from './SearchResults';
import { useFilterStats } from '@/app/hooks/use-filter-stats';
import { SaveSearchButton } from './SaveSearchButton';
import { BaggageFilter } from './BaggageFilter';
import { TransfersFilter } from './TransfersFilter';

export interface FilterState {
  withBaggage: boolean;
  transfers: number[]; // массив количества пересадок [0, 1, 2, 3]
  maxTransferDuration: number; // в часах
  convenientTransfers: boolean;
  noRecheck: boolean;
  noVisa: boolean;
  noAirportChange: boolean;
  noNightTransfers: boolean;
}

interface SearchFiltersProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  isMobile?: boolean;
  routes?: RouteData[];
  filters?: FilterState;
  onFiltersChange?: (filters: FilterState) => void;
  loading?: boolean;
}

export function SearchFilters({
  isOpen = false,
  onOpenChange,
  isMobile = false,
  routes = [],
  filters,
  onFiltersChange,
  loading = false,
}: SearchFiltersProps) {
  // Локальное состояние фильтров, если не передано извне
  const [localFilters, setLocalFilters] = useState<FilterState>({
    withBaggage: false,
    transfers: [],
    maxTransferDuration: 6,
    convenientTransfers: false,
    noRecheck: false,
    noVisa: false,
    noAirportChange: false,
    noNightTransfers: false,
  });

  const currentFilters = filters || localFilters;
  const updateFilters = onFiltersChange || setLocalFilters;

  // Вычисляем цены на основе отфильтрованных маршрутов
  const { priceStats } = useFilterStats(routes, currentFilters, loading);

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    updateFilters({ ...currentFilters, [key]: value });
  };

  const handleTransferToggle = (count: number) => {
    const newTransfers = currentFilters.transfers.includes(count)
      ? currentFilters.transfers.filter(t => t !== count)
      : [...currentFilters.transfers, count];
    handleFilterChange('transfers', newTransfers);
  };

  const handleSelectAll = () => {
    if (currentFilters.transfers.length === 4) {
      handleFilterChange('transfers', []);
    } else {
      handleFilterChange('transfers', [0, 1, 2, 3]);
    }
  };

  const filtersContent = (
    <div className="space-y-4">
      <SaveSearchButton />
      <BaggageFilter
        checked={currentFilters.withBaggage}
        onChange={(checked) => handleFilterChange('withBaggage', checked)}
        price={priceStats.withBaggage}
        loading={loading}
      />
      <TransfersFilter
        selectedTransfers={currentFilters.transfers}
        onToggle={handleTransferToggle}
        priceStats={priceStats}
        loading={loading}
        filters={currentFilters}
        onFilterChange={updateFilters}
        onSelectAll={handleSelectAll}
      />
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent side="left" className="w-80 overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Фильтры</SheetTitle>
          </SheetHeader>
          <div className="mt-6">{filtersContent}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return <aside className="hidden lg:block w-80 shrink-0">{filtersContent}</aside>;
}

export function SearchFiltersButton({
  onClickAction,
}: {
  onClickAction: () => void;
}) {
  return (
    <button
      onClick={onClickAction}
      className="flex lg:hidden items-center gap-2 rounded-lg border bg-white p-3 text-sm font-medium text-[#7B91FF]"
    >
      <Menu className="h-4 w-4" />
      Фильтры
    </button>
  );
}

