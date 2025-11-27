"use client";

import { X, Plane, Bus, ChevronDown, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { routes } from "@/app/lib/routes";
import type { RouteData } from "@/app/components/features/search/SearchResults";
import { useBooking } from "@/app/lib/booking-context";

interface InsuranceModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  route?: RouteData | null;
}

export function InsuranceModal({ isOpen, onCloseAction, route }: InsuranceModalProps) {
  const router = useRouter();
  const { setSelectedRoute } = useBooking();

  if (!isOpen) return null;

  // Default route data if none is provided
  const defaultRoute: RouteData = {
    id: '1',
    badge: 'Оптимальный',
    price: '41 256₽',
    priceDetails: '45 854₽ с багажом 23кг — 1 шт Ручная кладь 8кг — 1 шт',
    carrier: 'S7 Airlines',
    carrierCode: 'S7',
    departureTime: '09:00',
    departureCity: 'Москва',
    departureDate: '2 дек, вт',
    arrivalTime: '06:00',
    arrivalCity: 'Олекминск',
    arrivalDate: '3 дек, ср',
    duration: '21ч в пути',
    transfers: '1 пересадка',
    routeCodes: ['MOW', 'YKS', 'OLZ'],
  };

  const displayRoute = route || defaultRoute;
  
  // Extract price number for calculations
  // Remove all spaces and currency symbol, then parse
  const priceString = displayRoute.price.replace(/\s/g, '').replace(/₽/g, '').trim();
  const priceNumber = parseInt(priceString) || 0;

  const handleSelectInsurance = () => {
    // Save selected route to context before navigating
    setSelectedRoute(displayRoute);
    router.push(routes.booking);
    onCloseAction();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4">
      <div className="relative flex h-[95vh] sm:h-[90vh] w-full max-w-6xl overflow-y-auto md:overflow-hidden rounded-lg bg-white shadow-xl flex-col md:flex-row">
        <button
          onClick={onCloseAction}
          className="absolute right-2 top-2 sm:right-4 sm:top-4 z-10 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:bg-gray-100"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6 text-[#022444]" />
        </button>

        <div className="flex flex-col md:flex-row w-full md:overflow-y-auto">
          <div className="flex-1 p-4 sm:p-6 md:p-8 md:overflow-y-auto">
            <div className="mb-4 sm:mb-6">
              <h2 className="mb-2 text-xl sm:text-2xl font-bold text-[#022444]">
                Детали поездки
              </h2>
            </div>

            <div className="mb-6 sm:mb-8">
              <h3 className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2 text-base sm:text-lg font-semibold text-[#022444]">
                {displayRoute.departureCity} → {displayRoute.arrivalCity}
                <span className="text-xs sm:text-sm font-normal text-[#022444]">
                  🕐 {displayRoute.duration}
                </span>
              </h3>

              {/* Flight Segment */}
              {displayRoute.routeCodes && displayRoute.routeCodes.length > 0 && (
                <div className="mb-4 space-y-3 sm:space-y-4 rounded-lg border border-gray-200 p-3 sm:p-4">
                  <div className="flex items-start gap-2 sm:gap-4">
                    <div className="text-right min-w-[60px] sm:min-w-[80px]">
                      <div className="text-base sm:text-lg font-bold text-[#022444]">
                        {displayRoute.departureTime}
                      </div>
                      <div className="text-xs text-[#022444]">{displayRoute.departureDate}</div>
                    </div>
                    <Plane className="mt-1 h-4 w-4 sm:h-5 sm:w-5 rotate-90 text-[#558DCA] shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm sm:text-base text-[#022444]">
                        {displayRoute.departureCity} {displayRoute.routeCodes[0] ? `• ${displayRoute.routeCodes[0]}` : ''}
                      </div>
                      <div className="text-xs sm:text-sm text-[#022444]">
                        {displayRoute.departureCity === 'Москва' ? 'Аэропорт Домодедово' : 
                         displayRoute.departureCity === 'Франкфурт-на-...' ? 'Аэропорт Франкфурт' :
                         `Аэропорт ${displayRoute.departureCity}`}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4 pl-12 sm:pl-20">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-[#022444]">
                      <span>{displayRoute.duration}</span>
                      {displayRoute.transfers && <span>, {displayRoute.transfers}</span>}
                    </div>
                    {displayRoute.carrierCode && (
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-green-100">
                          <span className="text-xs font-bold text-green-700">
                            {displayRoute.carrierCode}
                          </span>
                        </div>
                        {displayRoute.carrier && (
                          <span className="text-xs sm:text-sm font-medium text-[#022444]">
                            {displayRoute.carrier}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex items-start gap-2 sm:gap-4">
                    <div className="text-right min-w-[60px] sm:min-w-[80px]">
                      <div className="text-base sm:text-lg font-bold text-[#022444]">
                        {displayRoute.arrivalTime}
                      </div>
                      <div className="text-xs text-[#022444]">{displayRoute.arrivalDate}</div>
                    </div>
                    <Plane className="mt-1 h-4 w-4 sm:h-5 sm:w-5 -rotate-90 text-[#558DCA] shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm sm:text-base text-[#022444]">
                        {displayRoute.arrivalCity} {displayRoute.routeCodes[displayRoute.routeCodes.length - 1] ? `• ${displayRoute.routeCodes[displayRoute.routeCodes.length - 1]}` : ''}
                      </div>
                      <div className="text-xs sm:text-sm text-[#022444]">
                        {displayRoute.arrivalCity === 'Олекминск' ? 'Речной порт Олекминск' :
                         displayRoute.arrivalCity === 'Казань' ? 'Аэропорт Казань' :
                         `Аэропорт ${displayRoute.arrivalCity}`}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Additional segments - only show for multi-segment routes like Moscow -> Olekminisk */}
              {displayRoute.routeCodes && displayRoute.routeCodes.length > 2 && (
                <>
                  {/* Bus Segment - only for Moscow -> Olekminisk route */}
                  {displayRoute.departureCity === 'Москва' && displayRoute.arrivalCity === 'Олекминск' && (
                    <div className="mb-4 space-y-3 sm:space-y-4 rounded-lg border border-gray-200 p-3 sm:p-4">
                      <div className="flex items-start gap-2 sm:gap-4">
                        <div className="text-right min-w-[60px] sm:min-w-[80px]">
                          <div className="text-base sm:text-lg font-bold text-[#022444]">
                            20:00
                          </div>
                          <div className="text-xs text-[#022444]">{displayRoute.departureDate}</div>
                        </div>
                        <Bus className="mt-1 h-4 w-4 sm:h-5 sm:w-5 text-[#558DCA] shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm sm:text-base text-[#022444]">
                            Аэропорт Якутск
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-4 pl-12 sm:pl-20">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#022444]">
                          <span>30 мин.</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-blue-100">
                            <span className="text-xs font-bold text-blue-700">
                              АБ
                            </span>
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-[#022444]">
                            АвиБус
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 sm:gap-4">
                        <div className="text-right min-w-[60px] sm:min-w-[80px]">
                          <div className="text-base sm:text-lg font-bold text-[#022444]">
                            20:30
                          </div>
                          <div className="text-xs text-[#022444]">{displayRoute.departureDate}</div>
                        </div>
                        <Bus className="mt-1 h-4 w-4 sm:h-5 sm:w-5 text-[#558DCA] shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm sm:text-base text-[#022444]">
                            Речной порт Якутск
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* River Segment - only for Moscow -> Olekminisk route */}
                  {displayRoute.departureCity === 'Москва' && displayRoute.arrivalCity === 'Олекминск' && (
                    <div className="space-y-3 sm:space-y-4 rounded-lg border border-gray-200 p-3 sm:p-4">
                      <div className="flex items-start gap-2 sm:gap-4">
                        <div className="text-right min-w-[60px] sm:min-w-[80px]">
                          <div className="text-base sm:text-lg font-bold text-[#022444]">
                            21:00
                          </div>
                          <div className="text-xs text-[#022444]">{displayRoute.departureDate}</div>
                        </div>
                        <svg
                          className="mt-1 h-4 w-4 sm:h-5 sm:w-5 text-[#558DCA] shrink-0"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.48.26-.6.5s-.15.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z" />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm sm:text-base text-[#022444]">
                            Якутск • Речной порт
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-4 pl-12 sm:pl-20">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-[#022444]">
                          <span>9 ч.</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-cyan-100">
                            <span className="text-xs font-bold text-cyan-700">
                              ЛЗ
                            </span>
                          </div>
                          <span className="text-xs sm:text-sm font-medium text-[#022444]">
                            Ленские Зори
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 sm:gap-4">
                        <div className="text-right min-w-[60px] sm:min-w-[80px]">
                          <div className="text-base sm:text-lg font-bold text-[#022444]">
                            {displayRoute.arrivalTime}
                          </div>
                          <div className="text-xs text-[#022444]">{displayRoute.arrivalDate}</div>
                        </div>
                        <svg
                          className="mt-1 h-4 w-4 sm:h-5 sm:w-5 text-[#558DCA] shrink-0"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.48.26-.6.5s-.15.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z" />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm sm:text-base text-[#022444]">
                            Олекминск • Речной порт
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="rounded-lg border border-gray-200 p-3 sm:p-4">
              <div className="mb-2 text-sm sm:text-base font-medium text-[#022444]">
                Путешествуете с кем-то еще?
              </div>
              <button className="flex items-center gap-2 text-xs sm:text-sm text-[#7B91FF]">
                <span>📤</span>
                <span className="underline">Поделиться</span>
              </button>
              <div className="mt-1 text-xs text-[#022444]">
                Поделиться сведениями о маршруте
              </div>
            </div>
          </div>

          <div className="flex-1 bg-gradient-to-b from-[#7B91FF] to-[#7B91FF] p-4 sm:p-6 md:overflow-y-auto">
            <div className="mb-4 sm:mb-6 text-center sm:text-right sm:mr-10">
              <div className="text-sm text-white">
                Цены на билеты от {displayRoute.price}
              </div>
              <div className="text-xs text-white/80">
                Прокрутите, чтобы увидеть варианты ⬇
              </div>
            </div>

            <div className="mb-4 rounded-lg bg-white p-4 sm:p-5 shadow-lg">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#7B91FF]/10">
                  <span className="text-xs sm:text-sm font-bold text-[#7B91FF]">K</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#022444]">Benefits</h3>
              </div>

              <div className="mb-3 text-xs sm:text-sm text-[#022444]">
                Получите мгновенный возврат баллами на вашу учетную запись
                lena.linkpc.net в случае отмены рейса или задержек.
              </div>

              <div className="mb-3 space-y-1.5">
                <div className="flex items-start gap-2 text-xs">
                  <span className="text-green-600">✓</span>
                  <span className="text-[#022444]">Дешевле багаж и места</span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <span className="text-green-600">✓</span>
                  <span className="text-[#022444]">
                    Мгновенный возврат баллами на Счет lena.linkpc.net при
                    отмене рейса
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  <span className="text-green-600">✓</span>
                  <span className="text-[#022444]">
                    Актуальная информация о задержках и вылетах
                  </span>
                </div>
              </div>

              <button className="text-xs text-[#7B91FF] underline">
                + Подробнее
              </button>

              <div className="mt-3 space-y-2 border-t pt-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#022444]">
                    Отмена или задержка рейса
                  </span>
                  <Info className="h-3 w-3 text-[#022444]" />
                </div>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <span>✓</span>
                  <span>Защищено lena.linkpc.net</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#022444]">
                    Отмена или изменение поездки
                  </span>
                  <Info className="h-3 w-3 text-[#022444]" />
                </div>
                <div className="flex items-center gap-1 text-xs text-green-600">
                  <span>✓</span>
                  <span>Защитит от правил авиакомпаний</span>
                </div>
              </div>

              <button
                onClick={handleSelectInsurance}
                className="mt-4 w-full rounded-lg bg-[#7B91FF] py-2.5 text-sm font-semibold text-white hover:bg-[#E16D32]"
              >
                Продолжить за {Math.round(priceNumber * 1.05).toLocaleString('ru-RU')}₽
              </button>
            </div>

            <div className="rounded-lg bg-white p-4 sm:p-5 shadow-lg">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#558DCA]/10">
                  <span className="text-xs sm:text-sm font-bold text-[#558DCA]">K</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#022444]">Basic</h3>
              </div>

              <div className="mb-3 text-xs sm:text-sm text-[#022444]">
                Только билет на рейс, ничего больше. Вы можете добавить
                дополнительные услуги позже.
              </div>

              <div className="mb-3 space-y-1.5">
                <div className="flex items-start gap-2 text-xs text-[#022444] line-through">
                  <span>✗</span>
                  <span>Дешевле багаж и места</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-[#022444] line-through">
                  <span>✗</span>
                  <span>Мгновенный возврат баллами</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-[#022444] line-through">
                  <span>✗</span>
                  <span>Актуальная информация о задержках</span>
                </div>
              </div>

              <button className="text-xs text-[#7B91FF] underline">
                + Подробнее
              </button>

              <div className="mt-3 space-y-2 border-t pt-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#022444]">
                    Отмена или задержка рейса
                  </span>
                  <Info className="h-3 w-3 text-[#022444]" />
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <span className="text-[#558DCA]">✓</span>
                  <span className="text-[#022444]">
                    Защитит от правил авиакомпаний
                  </span>
                </div>
              </div>

              <button
                onClick={handleSelectInsurance}
                className="mt-4 w-full rounded-lg bg-[#558DCA] py-2.5 text-sm font-semibold text-white hover:bg-[#4A7AB5]"
              >
                Продолжить за {priceNumber.toLocaleString('ru-RU')}₽
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
