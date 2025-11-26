'use client';

import { Plane, Bus } from 'lucide-react';

export function RouteOverview() {
  return (
    <div className="rounded-lg border bg-white p-3 sm:p-4 md:p-6">
      <h2 className="mb-3 sm:mb-4 text-base sm:text-lg md:text-xl font-bold text-[#022444]">
        Обзор маршрута
      </h2>

      <div className="space-y-3 sm:space-y-4">
        {/* Flight segment */}
        <div className="flex items-start gap-2 sm:gap-3 md:gap-4 border-b pb-3 sm:pb-4">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full bg-[#558DCA]">
            <Plane className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <div className="min-w-0">
                <div className="text-base sm:text-lg font-bold text-[#022444]">
                  09:00
                </div>
                <div className="text-xs sm:text-sm text-[#022444] truncate">
                  Москва (DME)
                </div>
              </div>
              <div className="text-center w-full sm:w-auto order-2 sm:order-2">
                <div className="text-[10px] sm:text-xs text-[#022444]">
                  10 ч 30 мин
                </div>
                <div className="my-1 sm:my-2 h-px w-16 sm:w-20 md:w-24 bg-[#558DCA] mx-auto"></div>
                <div className="text-[10px] sm:text-xs font-medium text-[#022444]">
                  Самолет • S7 Airlines
                </div>
              </div>
              <div className="min-w-0 text-left sm:text-right order-3 sm:order-3">
                <div className="text-base sm:text-lg font-bold text-[#022444]">
                  19:30
                </div>
                <div className="text-xs sm:text-sm text-[#022444] truncate">
                  Якутск (YKS)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bus segment */}
        <div className="flex items-start gap-2 sm:gap-3 md:gap-4 border-b pb-3 sm:pb-4">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full bg-[#7B91FF]">
            <Bus className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <div className="min-w-0">
                <div className="text-base sm:text-lg font-bold text-[#022444]">
                  20:00
                </div>
                <div className="text-xs sm:text-sm text-[#022444] truncate">
                  Аэропорт Якутск
                </div>
              </div>
              <div className="text-center w-full sm:w-auto order-2 sm:order-2">
                <div className="text-[10px] sm:text-xs text-[#022444]">30 мин</div>
                <div className="my-1 sm:my-2 h-px w-16 sm:w-20 md:w-24 bg-[#7B91FF] mx-auto"></div>
                <div className="text-[10px] sm:text-xs font-medium text-[#022444]">
                  Автобус • АвиБус
                </div>
              </div>
              <div className="min-w-0 text-left sm:text-right order-3 sm:order-3">
                <div className="text-base sm:text-lg font-bold text-[#022444]">
                  20:30
                </div>
                <div className="text-xs sm:text-sm text-[#022444] truncate">
                  Якутск, речной порт
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* River segment */}
        <div className="flex items-start gap-2 sm:gap-3 md:gap-4 pb-3 sm:pb-4">
          <div className="flex h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-full bg-[#96FFFF]">
            <svg
              className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-[#022444]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.48.26-.6.5s-.15.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
              <div className="min-w-0">
                <div className="text-base sm:text-lg font-bold text-[#022444]">
                  21:00
                </div>
                <div className="text-xs sm:text-sm text-[#022444] truncate">
                  Якутск, речной порт
                </div>
              </div>
              <div className="text-center w-full sm:w-auto order-2 sm:order-2">
                <div className="text-[10px] sm:text-xs text-[#022444]">9 ч</div>
                <div className="flex justify-center">
                  <div className="my-auto h-px w-16 sm:w-20 md:w-24 bg-[#96FFFF] text-center"></div>
                </div>
                <div className="text-[10px] sm:text-xs font-medium text-[#022444]">
                  Речной транспорт • Ленские Зори
                </div>
              </div>
              <div className="min-w-0 text-left sm:text-right order-3 sm:order-3">
                <div className="text-base sm:text-lg font-bold text-[#022444]">
                  06:00
                </div>
                <div className="text-xs sm:text-sm text-[#022444] truncate">
                  Олекминск, речной порт
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

