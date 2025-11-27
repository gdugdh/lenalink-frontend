'use client';

import { ChevronDown, X } from 'lucide-react';

interface SearchBarProps {
  fromCity?: string;
  fromCode?: string;
  toCity?: string;
  toCode?: string;
}

export function SearchBar({ fromCity = 'Москва', fromCode = 'MOW', toCity = 'Олекминск', toCode = 'YKS' }: SearchBarProps) {
  return (
    <div className="border-b bg-white overflow-x-hidden">
      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4 max-w-full">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex flex-1 items-center gap-1 sm:gap-2 rounded-lg border border-gray-300 bg-white text-[#022444] overflow-x-auto scrollbar-hide">
            <div className="flex flex-1 min-w-[120px] items-center border-r px-2 sm:px-4 py-2 sm:py-3">
              <div className="flex-1 min-w-0">
                <div className="text-xs sm:text-sm font-medium text-[#022444] truncate">
                  {fromCity}
                </div>
                <div className="text-xs text-[#022444]">{fromCode}</div>
              </div>
              <button className="rounded-full p-1 hover:bg-gray-100 shrink-0">
                <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-[#022444]" />
              </button>
            </div>
            <div className="flex flex-1 min-w-[120px] items-center border-r px-2 sm:px-4 py-2 sm:py-3">
              <div className="flex-1 min-w-0">
                <div className="text-xs sm:text-sm font-medium text-[#022444] truncate">
                  {toCity}
                </div>
                <div className="text-xs text-[#022444]">{toCode}</div>
              </div>
            </div>
            <div className="flex items-center border-r px-2 sm:px-4 py-2 sm:py-3 shrink-0">
              <div className="flex-1 min-w-0">
                <div className="text-xs sm:text-sm font-medium text-[#022444]">
                  2 дек, вт
                </div>
              </div>
              <button className="ml-1 sm:ml-2 shrink-0">
                <X className="h-3 w-3 sm:h-4 sm:w-4 text-[#7B91FF]" />
              </button>
            </div>
            <div className="hidden sm:flex items-center px-2 sm:px-4 py-2 sm:py-3 shrink-0">
              <div className="flex-1">
                <div className="text-xs sm:text-sm font-medium text-[#022444]">
                  Обратно
                </div>
              </div>
            </div>
            <div className="flex items-center border-l px-2 sm:px-4 py-2 sm:py-3 shrink-0">
              <div className="flex-1 min-w-0">
                <div className="text-xs sm:text-sm font-medium text-[#022444]">
                  1 пассажир
                </div>
                <div className="text-xs text-[#022444] hidden sm:block">Эконом</div>
              </div>
            </div>
          </div>
          <button className="rounded-lg bg-[#7B91FF] px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium text-white hover:bg-[#E16D32] w-full sm:w-auto">
            Найти билеты
          </button>
        </div>
      </div>
    </div>
  );
}

