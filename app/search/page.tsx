"use client";

import {
  Calendar,
  ChevronDown,
  ChevronLeftIcon,
  ChevronRight,
  Clock,
  Heart,
  Plane,
  Share2,
  X,
} from "lucide-react";
import { useState } from "react";
import { InsuranceModal } from "@/components/insurance-modal";
import { UnifiedHeader } from "@/components/unified-header";
import { PageLoader } from "@/components/page-loader";

export default function SearchPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <PageLoader />
      <div className="min-h-screen bg-[#FFFFFF]">
        <UnifiedHeader />

        {/* Search Bar */}
        <div className="border-b bg-white">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2">
              <div className="flex flex-1 items-center gap-2 rounded-lg border border-gray-300 bg-white text-[#022444]">
                <div className="flex flex-1 items-center border-r px-4 py-3">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#022444]">
                      Москва
                    </div>
                    <div className="text-xs text-[#022444]">MOW</div>
                  </div>
                  <button className="rounded-full p-1 hover:bg-gray-100">
                    <ChevronDown className="h-4 w-4 text-[#022444]" />
                  </button>
                </div>
                <div className="flex flex-1 items-center border-r px-4 py-3">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#022444]">
                      Олекминск
                    </div>
                    <div className="text-xs text-[#022444]">YKS</div>
                  </div>
                </div>
                <div className="flex items-center border-r px-4 py-3">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#022444]">
                      2 декабря, вт
                    </div>
                  </div>
                  <button className="ml-2">
                    <X className="h-4 w-4 text-[#7B91FF]" />
                  </button>
                </div>
                <div className="flex items-center px-4 py-3">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#022444]">
                      Обратно
                    </div>
                  </div>
                </div>
                <div className="flex items-center border-l px-4 py-3">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[#022444]">
                      1 пассажир
                    </div>
                    <div className="text-xs text-[#022444]">Эконом</div>
                  </div>
                </div>
              </div>
              <button className="rounded-lg bg-[#7B91FF] px-8 py-4 text-base font-medium text-white hover:bg-[#E16D32]">
                Найти билеты
              </button>
            </div>
          </div>
        </div>

        {/* Date Price Band */}
        <div className="bg-[#1A1A1A] text-white">
          <div className="container mx-auto px-4">
            <div className="flex  items-center gap-4 py-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span className="text-sm">Цены на соседние даты</span>
              </div>
              <button className="rounded-full p-2 hover:bg-white/10">
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <div className="flex gap-2 overflow-x-auto">
                <button className="flex min-w-[100px] flex-col items-center rounded-lg bg-[#7B91FF] px-4 py-2">
                  <div className="text-lg font-bold">20 884₽</div>
                  <div className="text-xs">2 дек</div>
                </button>
                <button className="flex min-w-[100px] flex-col items-center rounded-lg px-4 py-2 hover:bg-white/10">
                  <div className="text-sm text-gray-400">30 ноя</div>
                </button>
                <button className="flex min-w-[100px] flex-col items-center rounded-lg px-4 py-2 hover:bg-white/10">
                  <div className="text-sm text-gray-400">1 дек</div>
                </button>
                <button className="flex min-w-[100px] flex-col items-center rounded-lg px-4 py-2 hover:bg-white/10">
                  <div className="text-lg font-bold">21 251₽</div>
                  <div className="text-xs text-gray-400">3 дек</div>
                </button>
                <button className="flex min-w-[100px] flex-col items-center rounded-lg px-4 py-2 hover:bg-white/10">
                  <div className="text-lg font-bold">21 327₽</div>
                  <div className="text-xs text-gray-400">4 дек</div>
                </button>
                <button className="flex min-w-[100px] flex-col items-center rounded-lg px-4 py-2 hover:bg-white/10">
                  <div className="text-lg font-bold">21 866₽</div>
                  <div className="text-xs text-gray-400">5 дек</div>
                </button>
                <button className="flex min-w-[100px] flex-col items-center rounded-lg px-4 py-2 hover:bg-white/10">
                  <div className="text-lg font-bold">21 881₽</div>
                  <div className="text-xs text-gray-400">6 дек</div>
                </button>
              </div>
              <button className="rounded-full p-2 hover:bg-white/10">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mx-auto container px-4 py-6">
          <div className="flex gap-6">
            {/* Left Sidebar - Filters */}
            <aside className="w-80 shrink-0">
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
                  <h3 className="mb-3 text-sm font-bold text-[#022444]">
                    Багаж
                  </h3>
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
                  <h3 className="mb-3 text-sm font-bold text-[#022444]">
                    Пересадки
                  </h3>
                  <div className="space-y-2">
                    <label className="flex cursor-pointer items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="transfer-1"
                          className="rounded"
                        />
                        <span className="text-sm text-[#022444]">
                          1 пересадка
                        </span>
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
                        <span className="text-sm text-[#022444]">
                          2 пересадки
                        </span>
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
                        <span className="text-sm text-[#022444]">
                          3 пересадки
                        </span>
                      </div>
                      <span className="text-sm text-[#022444]">25 232₽</span>
                    </label>
                  </div>

                  {/* Duration Slider */}
                  <div className="mt-4">
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-[#022444]">
                        Длительность пересадок
                      </span>
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
                        <span className="text-sm text-[#022444]">
                          Условия пересадок
                        </span>
                      </div>

                      <label className="flex cursor-pointer items-center justify-between">
                        <span className="text-sm text-[#022444]">
                          Удобные пересадки
                        </span>
                        <input type="checkbox" className="rounded" />
                      </label>

                      <label className="flex cursor-pointer items-center justify-between">
                        <span className="text-sm text-[#022444]">
                          Без повторной регистрации
                        </span>
                        <input type="checkbox" className="rounded" />
                      </label>

                      <label className="flex cursor-pointer items-center justify-between">
                        <span className="text-sm text-[#022444]">
                          Без виз на пересадках
                        </span>
                        <input type="checkbox" className="rounded" />
                      </label>

                      <label className="flex cursor-pointer items-center justify-between">
                        <span className="text-sm text-[#022444]">
                          Без смены аэропорта
                        </span>
                        <input type="checkbox" className="rounded" />
                      </label>

                      <label className="flex cursor-pointer items-center justify-between">
                        <span className="text-sm text-[#022444]">
                          Без ночных пересадок
                        </span>
                        <input type="checkbox" className="rounded" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right Side - Results */}
            <main className="flex-1">
              <div className="space-y-4">
                {/* Result 1 - Optimal */}
                <div
                  onClick={() => setIsModalOpen(true)}
                  className="w-full text-left cursor-pointer"
                >
                  <div className="rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-[#00C48C] px-3 py-1 text-xs font-medium text-white">
                          Оптимальный
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="text-[#022444] hover:text-[#7B91FF]">
                          <Heart className="h-5 w-5" />
                        </button>
                        <button className="text-[#022444] hover:text-[#558DCA]">
                          <Share2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-3xl font-bold text-[#022444]">
                        41 256₽
                      </div>
                      <div className="text-sm text-[#022444]">
                        45 854₽ с багажом 23кг — 1 шт Ручная кладь 8кг — 1 шт
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#558DCA]">
                        <span className="text-xl font-bold text-white">S7</span>
                      </div>

                      <div className="flex flex-1 items-center gap-4">
                        <div>
                          <div className="text-2xl font-bold text-[#022444]">
                            09:00
                          </div>
                          <div className="text-sm text-[#022444]">Москва</div>
                          <div className="text-xs text-[#022444]">
                            2 дек, вт
                          </div>
                        </div>

                        <div className="flex flex-1 flex-col items-center">
                          <div className="mb-1 text-xs text-[#022444]">
                            21ч в пути, 1 пересадка
                          </div>
                          <div className="relative w-full">
                            <div className="h-px w-full bg-[#022444]"></div>
                            <Plane className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-90 text-[#558DCA]" />
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-xs">
                            <span className="text-[#558DCA]">MOW</span>
                            <span className="font-medium text-[#7B91FF]">
                              YKS
                            </span>
                            <span className="text-[#558DCA]">OLZ</span>
                          </div>
                        </div>

                        <div>
                          <div className="text-2xl font-bold text-[#022444]">
                            06:00
                          </div>
                          <div className="text-sm text-[#022444]">
                            Олекминск
                          </div>
                          <div className="text-xs text-[#022444]">
                            3 дек, ср
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Result 2 - Cheapest */}
                <div
                  onClick={() => setIsModalOpen(true)}
                  className="w-full text-left cursor-pointer"
                >
                  <div className="rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-[#00C48C] px-3 py-1 text-xs font-medium text-white">
                          Самый дешёвый
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="text-[#7B91FF] hover:text-[#E16D32]">
                          <Clock className="h-5 w-5" />
                        </button>
                        <button className="text-[#022444] hover:text-[#7B91FF]">
                          <Heart className="h-5 w-5" />
                        </button>
                        <button className="text-[#022444] hover:text-[#558DCA]">
                          <Share2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-3xl font-bold text-[#022444]">
                        20 884₽
                      </div>
                      <div className="text-sm text-[#022444]">
                        26 818₽ с багажом 10кг — 1 шт Ручная кладь — 1 шт
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#558DCA]">
                        <svg
                          className="h-6 w-6 text-white"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <circle cx="12" cy="12" r="10" />
                        </svg>
                      </div>

                      <div className="flex flex-1 items-center gap-4">
                        <div>
                          <div className="text-2xl font-bold text-[#022444]">
                            13:55
                          </div>
                          <div className="text-sm text-[#022444]">
                            Франкфурт-на-...
                          </div>
                          <div className="text-xs text-[#022444]">
                            2 дек, вт
                          </div>
                        </div>

                        <div className="flex flex-1 flex-col items-center">
                          <div className="mb-1 text-xs text-[#022444]">
                            1д4ч45м в пути, 1 пересадка
                          </div>
                          <div className="relative w-full">
                            <div className="h-px w-full bg-[#022444]"></div>
                            <Plane className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-90 text-[#558DCA]" />
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-xs">
                            <span className="text-[#558DCA]">FRA</span>
                            <span className="font-medium text-[#7B91FF]">
                              SAW - IST
                            </span>
                            <span className="text-[#558DCA]">KZN</span>
                          </div>
                        </div>

                        <div>
                          <div className="text-2xl font-bold text-[#022444]">
                            20:40
                          </div>
                          <div className="text-sm text-[#022444]">Казань</div>
                          <div className="text-xs text-[#022444]">
                            3 дек, ср
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Result 3 - Fastest */}
                <div
                  onClick={() => setIsModalOpen(true)}
                  className="w-full text-left cursor-pointer"
                >
                  <div className="rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="rounded-full bg-[#00C48C] px-3 py-1 text-xs font-medium text-white">
                          Самый быстрый
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="text-[#022444] hover:text-[#7B91FF]">
                          <Heart className="h-5 w-5" />
                        </button>
                        <button className="text-[#022444] hover:text-[#558DCA]">
                          <Share2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-3xl font-bold text-[#022444]">
                        41 218₽
                      </div>
                      <div className="text-sm text-[#022444]">
                        45 854₽ с багажом 23кг — 1 шт Ручная кладь 8кг — 1 шт
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7B91FF]">
                        <span className="text-xl font-bold text-white">T</span>
                      </div>

                      <div className="flex flex-1 items-center gap-4">
                        <div>
                          <div className="text-2xl font-bold text-[#022444]">
                            18:25
                          </div>
                          <div className="text-sm text-[#022444]">
                            Франкфурт-на-...
                          </div>
                          <div className="text-xs text-[#022444]">
                            2 дек, вт
                          </div>
                        </div>

                        <div className="flex flex-1 flex-col items-center">
                          <div className="mb-1 text-xs text-[#022444]">
                            9ч55м в пути, 1 пересадка
                          </div>
                          <div className="relative w-full">
                            <div className="h-px w-full bg-[#022444]"></div>
                            <Plane className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-90 text-[#558DCA]" />
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-xs">
                            <span className="text-[#558DCA]">FRA</span>
                            <span className="font-medium text-[#7B91FF]">
                              IST
                            </span>
                            <span className="text-[#558DCA]">KZN</span>
                          </div>
                        </div>

                        <div>
                          <div className="text-2xl font-bold text-[#022444]">
                            06:20
                          </div>
                          <div className="text-sm text-[#022444]">Казань</div>
                          <div className="text-xs text-[#022444]">
                            3 дек, ср
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>

        <InsuranceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </>
  );
}
