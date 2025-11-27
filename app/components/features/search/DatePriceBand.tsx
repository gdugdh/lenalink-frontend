'use client';

import { Calendar, ChevronLeftIcon, ChevronRight } from 'lucide-react';

export function DatePriceBand() {
  return (
    <div className="bg-[#1A1A1A] text-white overflow-x-hidden">
      <div className="container mx-auto px-2 sm:px-4 max-w-full">
        <div className="flex items-center justify-center gap-2 sm:gap-4 py-3 sm:py-4 overflow-x-auto scrollbar-hide">
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs sm:text-sm">Цены на соседние даты</span>
          </div>
          <button className="rounded-full p-2 hover:bg-white/10 shrink-0">
            <ChevronLeftIcon className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
          <div className="flex gap-1 sm:gap-2 overflow-x-auto">
            <button className="flex min-w-[80px] sm:min-w-[100px] flex-col items-center justify-center rounded-lg bg-[#7B91FF] px-2 sm:px-4 py-2">
              <div className="text-sm sm:text-lg font-bold text-center">20 884₽</div>
              <div className="text-xs text-center">2 дек</div>
            </button>
            <button className="flex min-w-[80px] sm:min-w-[100px] flex-col items-center justify-center rounded-lg px-2 sm:px-4 py-2 hover:bg-white/10">
              <div className="text-xs sm:text-sm text-gray-400 text-center">30 ноя</div>
            </button>
            <button className="flex min-w-[80px] sm:min-w-[100px] flex-col items-center justify-center rounded-lg px-2 sm:px-4 py-2 hover:bg-white/10">
              <div className="text-xs sm:text-sm text-gray-400 text-center">1 дек</div>
            </button>
            <button className="flex min-w-[80px] sm:min-w-[100px] flex-col items-center justify-center rounded-lg px-2 sm:px-4 py-2 hover:bg-white/10">
              <div className="text-sm sm:text-lg font-bold text-center">21 251₽</div>
              <div className="text-xs text-gray-400 text-center">3 дек</div>
            </button>
            <button className="flex min-w-[80px] sm:min-w-[100px] flex-col items-center justify-center rounded-lg px-2 sm:px-4 py-2 hover:bg-white/10">
              <div className="text-sm sm:text-lg font-bold text-center">21 327₽</div>
              <div className="text-xs text-gray-400 text-center">4 дек</div>
            </button>
            <button className="flex min-w-[80px] sm:min-w-[100px] flex-col items-center justify-center rounded-lg px-2 sm:px-4 py-2 hover:bg-white/10">
              <div className="text-sm sm:text-lg font-bold text-center">21 866₽</div>
              <div className="text-xs text-gray-400 text-center">5 дек</div>
            </button>
            <button className="flex min-w-[80px] sm:min-w-[100px] flex-col items-center justify-center rounded-lg px-2 sm:px-4 py-2 hover:bg-white/10">
              <div className="text-sm sm:text-lg font-bold text-center">21 881₽</div>
              <div className="text-xs text-gray-400 text-center">6 дек</div>
            </button>
          </div>
          <button className="rounded-full p-2 hover:bg-white/10 shrink-0">
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

