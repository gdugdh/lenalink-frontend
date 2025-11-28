'use client';

import { useState } from 'react';
import { Heart, Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/app/components/ui/sheet';
import type { RouteData } from './SearchResults';
import { useFilterStats } from '@/app/hooks/use-filter-stats';

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

  const formatPrice = (price: number | null) => {
    if (price === null) return null;
    return price.toLocaleString('ru-RU') + '₽';
  };

  const filtersContent = (
    <div className="space-y-4">
      {/* Save Search */}
      <div className="rounded-lg border bg-white p-4">
        <button className="flex items-center gap-2 text-sm font-medium text-[#7B91FF]">
          <Heart className="h-4 w-4" />
          Сохранить поиск
        </button>
      </div>

      {/* Baggage Filter */}
      <div className="rounded-lg border bg-white p-4">
        <h3 className="mb-3 text-sm font-bold text-[#022444]">Багаж</h3>
        <label className="flex cursor-pointer items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="baggage"
              className="rounded"
              checked={currentFilters.withBaggage}
              onChange={(e) => handleFilterChange('withBaggage', e.target.checked)}
            />
            <span className="text-sm text-[#022444]">С багажом</span>
          </div>
          {loading ? (
            <span className="text-sm text-gray-400">...</span>
          ) : priceStats.withBaggage ? (
            <span className="text-sm text-[#022444]">{formatPrice(priceStats.withBaggage)}</span>
          ) : null}
        </label>
      </div>

      {/* Transfers Filter */}
      <div className="rounded-lg border bg-white p-4">
        <h3 className="mb-3 text-sm font-bold text-[#022444]">Пересадки</h3>
        <div className="space-y-2">
          <label className="flex cursor-pointer items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="transfer-0"
                className="rounded"
                checked={currentFilters.transfers.includes(0)}
                onChange={() => handleTransferToggle(0)}
              />
              <span className="text-sm text-[#022444]">Без пересадок</span>
            </div>
            {loading ? (
              <span className="text-sm text-gray-400">...</span>
            ) : priceStats.transfers[0] ? (
              <span className="text-sm text-[#022444]">{formatPrice(priceStats.transfers[0])}</span>
            ) : null}
          </label>
          <label className="flex cursor-pointer items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="transfer-1"
                className="rounded"
                checked={currentFilters.transfers.includes(1)}
                onChange={() => handleTransferToggle(1)}
              />
              <span className="text-sm text-[#022444]">1 пересадка</span>
            </div>
            {loading ? (
              <span className="text-sm text-gray-400">...</span>
            ) : priceStats.transfers[1] ? (
              <span className="text-sm text-[#022444]">{formatPrice(priceStats.transfers[1])}</span>
            ) : null}
          </label>
          <label className="flex cursor-pointer items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="transfer-2"
                className="rounded"
                checked={currentFilters.transfers.includes(2)}
                onChange={() => handleTransferToggle(2)}
              />
              <span className="text-sm text-[#022444]">2 пересадки</span>
            </div>
            {loading ? (
              <span className="text-sm text-gray-400">...</span>
            ) : priceStats.transfers[2] ? (
              <span className="text-sm text-[#022444]">{formatPrice(priceStats.transfers[2])}</span>
            ) : null}
          </label>
          <label className="flex cursor-pointer items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="transfer-3"
                className="rounded"
                checked={currentFilters.transfers.includes(3)}
                onChange={() => handleTransferToggle(3)}
              />
              <span className="text-sm text-[#022444]">3 пересадки</span>
            </div>
            {loading ? (
              <span className="text-sm text-gray-400">...</span>
            ) : priceStats.transfers[3] ? (
              <span className="text-sm text-[#022444]">{formatPrice(priceStats.transfers[3])}</span>
            ) : null}
          </label>
        </div>

        {/* Duration Slider */}
        <div className="mt-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-[#022444]">Длительность пересадок</span>
            <span className="text-[#022444]">До 6ч</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="50"
            step="1"
            className="mt-2 w-full"
          />
        </div>

        {/* Additional Filters */}
        <div className="mt-4 space-y-3">
          <button
            onClick={handleSelectAll}
            className="text-sm text-[#7B91FF] hover:underline"
          >
            {currentFilters.transfers.length === 4 ? 'Снять все' : 'Выбрать все'}
          </button>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#022444]">Условия пересадок</span>
            </div>

            <label className="flex cursor-pointer items-center justify-between">
              <span className="text-sm text-[#022444]">Удобные пересадки</span>
              <input
                type="checkbox"
                className="rounded"
                checked={currentFilters.convenientTransfers}
                onChange={(e) => handleFilterChange('convenientTransfers', e.target.checked)}
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between">
              <span className="text-sm text-[#022444]">
                Без повторной регистрации
              </span>
              <input
                type="checkbox"
                className="rounded"
                checked={currentFilters.noRecheck}
                onChange={(e) => handleFilterChange('noRecheck', e.target.checked)}
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between">
              <span className="text-sm text-[#022444]">Без виз на пересадках</span>
              <input
                type="checkbox"
                className="rounded"
                checked={currentFilters.noVisa}
                onChange={(e) => handleFilterChange('noVisa', e.target.checked)}
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between">
              <span className="text-sm text-[#022444]">Без смены аэропорта</span>
              <input
                type="checkbox"
                className="rounded"
                checked={currentFilters.noAirportChange}
                onChange={(e) => handleFilterChange('noAirportChange', e.target.checked)}
              />
            </label>

            <label className="flex cursor-pointer items-center justify-between">
              <span className="text-sm text-[#022444]">Без ночных пересадок</span>
              <input
                type="checkbox"
                className="rounded"
                checked={currentFilters.noNightTransfers}
                onChange={(e) => handleFilterChange('noNightTransfers', e.target.checked)}
              />
            </label>
          </div>
        </div>
      </div>
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
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex lg:hidden items-center gap-2 rounded-lg border bg-white p-3 text-sm font-medium text-[#7B91FF]"
    >
      <Menu className="h-4 w-4" />
      Фильтры
    </button>
  );
}

