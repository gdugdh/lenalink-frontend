'use client';

import { Heart, Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/app/components/ui/sheet';

interface SearchFiltersProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  isMobile?: boolean;
}

export function SearchFilters({
  isOpen = false,
  onOpenChange,
  isMobile = false,
}: SearchFiltersProps) {
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
            <input type="checkbox" id="baggage" className="rounded" />
            <span className="text-sm text-[#022444]">С багажом</span>
          </div>
          <span className="text-sm text-[#022444]">23 605₽</span>
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
                id="transfer-1"
                className="rounded"
              />
              <span className="text-sm text-[#022444]">1 пересадка</span>
            </div>
            <span className="text-sm text-[#022444]">20 884₽</span>
          </label>
          <label className="flex cursor-pointer items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="transfer-2"
                className="rounded"
              />
              <span className="text-sm text-[#022444]">2 пересадки</span>
            </div>
            <span className="text-sm text-[#022444]">21 972₽</span>
          </label>
          <label className="flex cursor-pointer items-center justify-between">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="transfer-3"
                className="rounded"
              />
              <span className="text-sm text-[#022444]">3 пересадки</span>
            </div>
            <span className="text-sm text-[#022444]">25 232₽</span>
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
          <button className="text-sm text-[#7B91FF] hover:underline">
            Выбрать все
          </button>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#022444]">Условия пересадок</span>
            </div>

            <label className="flex cursor-pointer items-center justify-between">
              <span className="text-sm text-[#022444]">Удобные пересадки</span>
              <input type="checkbox" className="rounded" />
            </label>

            <label className="flex cursor-pointer items-center justify-between">
              <span className="text-sm text-[#022444]">
                Без повторной регистрации
              </span>
              <input type="checkbox" className="rounded" />
            </label>

            <label className="flex cursor-pointer items-center justify-between">
              <span className="text-sm text-[#022444]">Без виз на пересадках</span>
              <input type="checkbox" className="rounded" />
            </label>

            <label className="flex cursor-pointer items-center justify-between">
              <span className="text-sm text-[#022444]">Без смены аэропорта</span>
              <input type="checkbox" className="rounded" />
            </label>

            <label className="flex cursor-pointer items-center justify-between">
              <span className="text-sm text-[#022444]">Без ночных пересадок</span>
              <input type="checkbox" className="rounded" />
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

