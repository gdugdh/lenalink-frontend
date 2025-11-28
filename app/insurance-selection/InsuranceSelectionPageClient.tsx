"use client";

import { Check, Info } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { UnifiedHeader } from "@/app/components/shared/unified-header";
import { PageLoader } from "@/app/components/shared/page-loader";
import { useRouter } from "next/navigation";
import { routes } from "@/app/lib/routes";
import { useBooking, type TariffType } from "@/app/lib/booking-context";
import { calculatePrice, getTariffName, getPassengerTypeLabel, extractPriceFromRoute } from "@/app/lib/price-calculator";

export function InsuranceSelectionPageClient() {
  const router = useRouter();
  const { bookingState, setTariff } = useBooking();
  const selectedPlan = bookingState.tariff;

  const handleContinue = () => {
    router.push(routes.seatSelection);
  };

  const basePriceFromRoute = extractPriceFromRoute(bookingState.selectedRoute);
  const priceBreakdown = calculatePrice(
    bookingState.passengerType,
    bookingState.tariff,
    bookingState.seatSelections || [],
    bookingState.includeInsurance || false,
    basePriceFromRoute
  );

  // Рассчитываем цены для каждого тарифа для отображения
  const tariffPrices = {
    tarif1: calculatePrice(bookingState.passengerType, 'tarif1', bookingState.seatSelections || [], false, basePriceFromRoute).total,
    tarif2: calculatePrice(bookingState.passengerType, 'tarif2', bookingState.seatSelections || [], false, basePriceFromRoute).total,
    tarif3: calculatePrice(bookingState.passengerType, 'tarif3', bookingState.seatSelections || [], false, basePriceFromRoute).total,
    tarif4: calculatePrice(bookingState.passengerType, 'tarif4', bookingState.seatSelections || [], false, basePriceFromRoute).total,
  };

  return (
    <>
      <PageLoader />
      <div className="min-h-screen bg-[#FFFFFF]">
        <UnifiedHeader />

        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-2 text-3xl font-bold text-[#022444]">
            Москва → Олекминск
          </h1>
          <p className="mb-8 text-[#022444]">
            Выберите более высокий тариф для возможности изменить бронирование
            или вернуть уплаченные средства, если ваши планы изменятся.{" "}
            <button className="text-[#7B91FF] underline">Подробнее</button>
          </p>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left Side - Tariff Options */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Tariff 1 */}
                <label
                  className={`cursor-pointer rounded-lg border-2 p-6 transition-all ${
                    selectedPlan === "tarif1"
                      ? "border-[#7B91FF] bg-orange-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="plan"
                    value="tarif1"
                    checked={selectedPlan === "tarif1"}
                    onChange={(e) => setTariff(e.target.value as TariffType)}
                    className="sr-only"
                  />
                  <div className="mb-4 text-center">
                    <div className="mb-2 text-4xl">💼</div>
                    <h3 className="mb-1 font-bold text-[#022444]">Тариф 1</h3>
                    <div className="text-2xl font-bold text-[#7B91FF]">
                      {tariffPrices.tarif1.toLocaleString('ru-RU')}₽
                    </div>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 shrink-0">✗</span>
                      <span className="text-[#022444]">
                        Изменить поездку нельзя
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 shrink-0">✗</span>
                      <span className="text-[#022444]">
                        Возврат минимальный и только по правилам перевозчиков
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-500 shrink-0">✗</span>
                      <span className="text-[#022444]">
                        За отмену взимается фиксированный штраф за каждый
                        сегмент
                      </span>
                    </div>
                    <p className="mt-3 text-gray-600 italic">
                      Подходит тем, кто точно знает дату
                    </p>
                  </div>
                </label>

                {/* Tariff 2 */}
                <label
                  className={`cursor-pointer rounded-lg border-2 p-6 transition-all ${
                    selectedPlan === "tarif2"
                      ? "border-[#7B91FF] bg-orange-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="plan"
                    value="tarif2"
                    checked={selectedPlan === "tarif2"}
                    onChange={(e) => setTariff(e.target.value as TariffType)}
                    className="sr-only"
                  />
                  <div className="mb-2 flex justify-center">
                    <span className="rounded bg-[#7B91FF] px-2 py-1 text-xs font-medium text-white">
                      Мы рекомендуем
                    </span>
                  </div>
                  <div className="mb-4 text-center">
                    <div className="mb-2 flex items-center justify-center gap-1 text-4xl">
                      <span>💼</span>
                      <Check className="h-8 w-8 text-[#7B91FF]" />
                    </div>
                    <h3 className="mb-1 font-bold text-[#022444]">Тариф 2</h3>
                    <div className="text-2xl font-bold text-[#7B91FF]">
                      {tariffPrices.tarif2.toLocaleString('ru-RU')}₽
                    </div>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 shrink-0 text-green-600" />
                      <span className="text-[#022444]">
                        Изменения разрешены: оплачивается только разница
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 shrink-0 text-green-600" />
                      <span className="text-[#022444]">
                        Отмена возможна не позднее 48 часов до начала
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 shrink-0 text-green-600" />
                      <span className="text-[#022444]">
                        Можно отменять отдельные сегменты маршрута
                      </span>
                    </div>
                    <p className="mt-3 text-gray-600 italic">
                      Подходит для стандартных поездок
                    </p>
                  </div>
                </label>

                {/* Tariff 3 */}
                <label
                  className={`cursor-pointer rounded-lg border-2 p-6 transition-all ${
                    selectedPlan === "tarif3"
                      ? "border-[#7B91FF] bg-orange-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="plan"
                    value="tarif3"
                    checked={selectedPlan === "tarif3"}
                    onChange={(e) => setTariff(e.target.value as TariffType)}
                    className="sr-only"
                  />
                  <div className="mb-4 text-center">
                    <div className="mb-2 text-4xl">🎯</div>
                    <h3 className="mb-1 font-bold text-[#022444]">Тариф 3</h3>
                    <div className="text-2xl font-bold text-[#7B91FF]">
                      {tariffPrices.tarif3.toLocaleString('ru-RU')}₽
                    </div>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 shrink-0 text-green-600" />
                      <span className="text-[#022444]">
                        Изменения возможны в любой момент
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 shrink-0 text-green-600" />
                      <span className="text-[#022444]">
                        Возврат составляет около 80% от стоимости
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 shrink-0 text-green-600" />
                      <span className="text-[#022444]">
                        Отмена оформляется сразу для всех сегментов
                      </span>
                    </div>
                    <p className="mt-3 text-gray-600 italic">
                      Подходит тем, кому нужна максимальная гибкость
                    </p>
                  </div>
                </label>

                {/* Tariff 4 */}
                <label
                  className={`cursor-pointer rounded-lg border-2 p-6 transition-all ${
                    selectedPlan === "tarif4"
                      ? "border-[#7B91FF] bg-orange-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="plan"
                    value="tarif4"
                    checked={selectedPlan === "tarif4"}
                    onChange={(e) => setTariff(e.target.value as TariffType)}
                    className="sr-only"
                  />
                  <div className="mb-4 text-center">
                    <div className="mb-2 text-4xl">🛡️</div>
                    <h3 className="mb-1 font-bold text-[#022444]">Тариф 4</h3>
                    <div className="text-2xl font-bold text-[#7B91FF]">
                      {tariffPrices.tarif4.toLocaleString('ru-RU')}₽
                    </div>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 shrink-0 text-green-600" />
                      <span className="text-[#022444]">
                        Полный возврат 100% стоимости маршрута
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 shrink-0 text-green-600" />
                      <span className="text-[#022444]">
                        Возврат оформляется сервисом, не через перевозчиков
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 shrink-0 text-green-600" />
                      <span className="text-[#022444]">
                        Не возвращаются только комиссии за доп. услуги
                      </span>
                    </div>
                    <p className="mt-3 text-gray-600 italic">
                      Максимальная защита для сложных маршрутов
                    </p>
                  </div>
                </label>
              </div>

              <div className="rounded-lg border border-[#558DCA] bg-blue-50 p-4">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 shrink-0 text-[#558DCA]" />
                  <div className="text-sm text-[#022444]">
                    <strong>
                      Бронирование можно изменить или отменить не позднее, чем
                      за 48 ч. до отправления первого рейса по вашему маршруту.
                    </strong>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => router.back()}
                  className="text-[#022444]"
                >
                  Назад
                </Button>
                <Button
                  onClick={handleContinue}
                  className="bg-[#7B91FF] hover:bg-[#E16D32]"
                >
                  Продолжить
                </Button>
              </div>
            </div>

            {/* Right Side - Price Summary */}
            <div className="space-y-6">
              <div className="rounded-lg border bg-white p-6">
                <h3 className="mb-4 text-lg font-bold text-[#022444]">Итого</h3>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#022444]">1x {getPassengerTypeLabel(bookingState.passengerType)}</span>
                    <span className="font-medium text-[#022444]">
                      {priceBreakdown.basePrice.toLocaleString('ru-RU')}₽
                    </span>
                  </div>
                  {priceBreakdown.tariffFee > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#022444]">1x {getTariffName(selectedPlan)}</span>
                      <span className="font-medium text-[#022444]">
                        {priceBreakdown.tariffFee.toLocaleString('ru-RU')}₽
                      </span>
                    </div>
                  )}
                  {priceBreakdown.seatFee > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#022444]">1x место</span>
                      <span className="font-medium text-[#022444]">
                        {priceBreakdown.seatFee.toLocaleString('ru-RU')}₽
                      </span>
                    </div>
                  )}
                </div>

                <div className="my-4 border-t"></div>

                <div className="flex justify-between">
                  <span className="font-bold text-[#022444]">Итого</span>
                  <span className="text-2xl font-bold text-[#7B91FF]">
                    {priceBreakdown.total.toLocaleString('ru-RU')}₽
                  </span>
                </div>

                <div className="mt-4 text-xs text-[#022444]">
                  Включает все налоги, сборы, платежи и сервисные сборы
                  LenaLink.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

