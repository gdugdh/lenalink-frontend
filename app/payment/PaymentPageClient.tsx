"use client";

import { ArrowLeft, CreditCard, Smartphone, Check } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { UnifiedHeader } from "@/app/components/shared/unified-header";
import { PageLoader } from "@/app/components/shared/page-loader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { routes } from "@/app/lib/routes";
import { useBooking } from "@/app/lib/booking-context";
import { calculatePrice, getPassengerTypeLabel, getTariffName, getSeatName } from "@/app/lib/price-calculator";

export function PaymentPageClient() {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState<string>("card");
  const { bookingState } = useBooking();
  const priceBreakdown = calculatePrice(
    bookingState.passengerType,
    bookingState.tariff,
    bookingState.seatType
  );

  const handlePayment = () => {
    router.push(routes.confirmation);
  };

  return (
    <>
      <PageLoader />
      <div className="min-h-screen bg-[#FFFFFF]">
        <UnifiedHeader />

        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 text-[#022444] hover:text-[#7B91FF]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Назад
          </Button>

          <h1 className="mb-2 text-3xl font-bold text-[#022444]">
            Оплата бронирования
          </h1>
          <p className="mb-8 text-[#022444]">
            Проверьте детали заказа и выберите способ оплаты
          </p>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left Side - Order Summary */}
            <div className="lg:col-span-2 space-y-6">
              {/* Route Overview */}
              <div className="rounded-lg border bg-white p-6">
                <h2 className="mb-4 text-xl font-bold text-[#022444]">
                  Детали маршрута
                </h2>
                <div className="mb-4 flex items-center justify-between rounded-lg bg-blue-50 p-4">
                  <div>
                    <div className="text-2xl font-bold text-[#022444]">
                      Москва → Олекминск
                    </div>
                    <div className="text-sm text-[#022444]">
                      вт, 2 декабря 2024 • 3 сегмента • ~20 часов
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#558DCA]">
                        <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-[#022444]">
                          Москва DME → Якутск YKS
                        </div>
                        <div className="text-xs text-[#022444]">
                          09:00 - 19:30 • S7 Airlines • 10ч 30мин
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-b pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#7B91FF]">
                        <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-[#022444]">
                          Аэропорт → Речной порт
                        </div>
                        <div className="text-xs text-[#022444]">
                          20:00 - 20:30 • АвиБус • 30мин
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#96FFFF]">
                        <svg className="h-5 w-5 text-[#022444]" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.48.26-.6.5s-.15.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-[#022444]">
                          Якутск → Олекминск
                        </div>
                        <div className="text-xs text-[#022444]">
                          21:00 - 06:00+1 • Ленские Зори • 9ч
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Services */}
              <div className="rounded-lg border bg-white p-6">
                <h2 className="mb-4 text-xl font-bold text-[#022444]">
                  Выбранные услуги
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start justify-between border-b pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="font-medium text-[#022444]">Пассажир</div>
                        <div className="text-sm text-[#022444]">
                          1 {getPassengerTypeLabel(bookingState.passengerType)} • Иван Петров
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#022444]">
                        {priceBreakdown.basePrice.toLocaleString('ru-RU')}₽
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start justify-between border-b pb-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        <Check className="h-5 w-5 text-[#558DCA]" />
                      </div>
                      <div>
                        <div className="font-medium text-[#022444]">
                          {getTariffName(bookingState.tariff)}
                        </div>
                        <div className="text-sm text-[#022444]">
                          {bookingState.tariff === 'tariff1' 
                            ? 'Базовый тариф'
                            : bookingState.tariff === 'tariff2'
                            ? 'Изменения разрешены • Возврат возможен'
                            : bookingState.tariff === 'tariff3'
                            ? 'Максимальная гибкость • Возврат ~80%'
                            : 'Полный возврат 100%'}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#022444]">
                        {priceBreakdown.tariffFee > 0 ? `${priceBreakdown.tariffFee.toLocaleString('ru-RU')}₽` : 'Включено'}
                      </div>
                    </div>
                  </div>

                  {priceBreakdown.seatFee > 0 && (
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                          <Check className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <div className="font-medium text-[#022444]">
                            {getSeatName(bookingState.seatType)}
                          </div>
                          <div className="text-sm text-[#022444]">
                            {bookingState.seatType === 'legroom' 
                              ? 'Дополнительное пространство для ног (1A)'
                              : bookingState.seatType === 'window'
                              ? 'Место у окна'
                              : 'Место у прохода'}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-[#022444]">
                          {priceBreakdown.seatFee.toLocaleString('ru-RU')}₽
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div className="rounded-lg border bg-white p-6">
                <h2 className="mb-4 text-xl font-bold text-[#022444]">
                  Способ оплаты
                </h2>

                <div className="space-y-3">
                  {/* Bank Card */}
                  <label
                    className={`flex cursor-pointer items-center justify-between rounded-lg border-2 p-4 transition-all ${
                      selectedPayment === "card"
                        ? "border-[#7B91FF] bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#558DCA]">
                        <CreditCard className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-[#022444]">
                          Банковская карта
                        </div>
                        <div className="text-sm text-[#022444]">
                          Visa, Mastercard, МИР
                        </div>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={selectedPayment === "card"}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="h-5 w-5"
                    />
                  </label>

                  {/* SBP */}
                  <label
                    className={`flex cursor-pointer items-center justify-between rounded-lg border-2 p-4 transition-all ${
                      selectedPayment === "sbp"
                        ? "border-[#7B91FF] bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7B91FF]">
                        <Smartphone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-[#022444]">
                          Система Быстрых Платежей
                        </div>
                        <div className="text-sm text-[#022444]">
                          Оплата через СБП
                        </div>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      value="sbp"
                      checked={selectedPayment === "sbp"}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="h-5 w-5"
                    />
                  </label>

                  {/* Apple Pay */}
                  <label
                    className={`flex cursor-pointer items-center justify-between rounded-lg border-2 p-4 transition-all ${
                      selectedPayment === "apple"
                        ? "border-[#7B91FF] bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black">
                        <svg className="h-7 w-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-[#022444]">Apple Pay</div>
                        <div className="text-sm text-[#022444]">
                          Быстрая оплата через Apple
                        </div>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      value="apple"
                      checked={selectedPayment === "apple"}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="h-5 w-5"
                    />
                  </label>

                  {/* Google Pay */}
                  <label
                    className={`flex cursor-pointer items-center justify-between rounded-lg border-2 p-4 transition-all ${
                      selectedPayment === "google"
                        ? "border-[#7B91FF] bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white border-2">
                        <svg className="h-7 w-7" viewBox="0 0 48 24" fill="none">
                          <path d="M23.7 12.8v7.3h-2.2V8h5.8c1.4 0 2.7.5 3.6 1.4.9.9 1.4 2.1 1.4 3.4s-.5 2.5-1.4 3.4c-.9.9-2.2 1.4-3.6 1.4h-3.6zm0-6.7v4.5h3.7c.8 0 1.5-.3 2-.8.5-.5.8-1.2.8-2s-.3-1.5-.8-2c-.5-.5-1.2-.8-2-.8h-3.7v1.1z" fill="#5F6368"/>
                          <path d="M41.3 13.8c0 1.8-.5 3.2-1.6 4.3-1.1 1.1-2.5 1.7-4.2 1.7s-3.1-.6-4.2-1.7c-1.1-1.1-1.6-2.5-1.6-4.3s.5-3.2 1.6-4.3c1.1-1.1 2.5-1.7 4.2-1.7s3.1.6 4.2 1.7c1.1 1.1 1.6 2.5 1.6 4.3zm-2.3 0c0-1.2-.3-2.2-1-3-.6-.8-1.5-1.2-2.5-1.2s-1.9.4-2.5 1.2c-.6.8-1 1.8-1 3s.3 2.2 1 3c.6.8 1.5 1.2 2.5 1.2s1.9-.4 2.5-1.2c.7-.8 1-1.8 1-3z" fill="#4285F4"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-[#022444]">Google Pay</div>
                        <div className="text-sm text-[#022444]">
                          Быстрая оплата через Google
                        </div>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      value="google"
                      checked={selectedPayment === "google"}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="h-5 w-5"
                    />
                  </label>
                </div>
              </div>

              {/* Important Info */}
              <div className="rounded-lg border-l-4 border-[#7B91FF] bg-blue-50 p-4">
                <div className="flex items-start gap-2">
                  <span className="text-[#558DCA] text-lg font-bold">ℹ</span>
                  <div className="text-sm text-[#022444]">
                    <strong>Безопасная оплата</strong>
                    <p className="mt-1">
                      Все платежи защищены и обрабатываются через безопасное
                      соединение. Мы не храним данные вашей карты.
                    </p>
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
                  onClick={handlePayment}
                  className="bg-[#7B91FF] hover:bg-[#E16D32] px-8"
                >
                  Оплатить {priceBreakdown.total.toLocaleString('ru-RU')}₽
                </Button>
              </div>
            </div>

            {/* Right Side - Price Summary */}
            <div className="space-y-6">
              <div className="rounded-lg border bg-white p-6 sticky top-4">
                <h3 className="mb-4 text-lg font-bold text-[#022444]">
                  Итого к оплате
                </h3>

                <div className="space-y-3 border-b pb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#022444]">1x {getPassengerTypeLabel(bookingState.passengerType)}</span>
                    <span className="font-medium text-[#022444]">
                      {priceBreakdown.basePrice.toLocaleString('ru-RU')}₽
                    </span>
                  </div>
                  {priceBreakdown.tariffFee > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#022444]">1x {getTariffName(bookingState.tariff)}</span>
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

                <div className="my-4 flex justify-between">
                  <span className="text-xl font-bold text-[#022444]">Итого</span>
                  <span className="text-3xl font-bold text-[#7B91FF]">
                    {priceBreakdown.total.toLocaleString('ru-RU')}₽
                  </span>
                </div>

                <div className="rounded-lg bg-green-50 p-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-green-700">
                    <Check className="h-4 w-4" />
                    <span>Все налоги и сборы включены</span>
                  </div>
                </div>

                <div className="mt-4 text-xs text-[#022444]">
                  Включает все налоги, сборы, платежи и сервисные сборы
                  LenaLink. Сервисные сборы LenaLink рассчитываются для каждого
                  пассажира и не подлежат возврату.
                </div>
              </div>

              <div className="rounded-lg bg-gradient-to-br from-[#558DCA] to-[#96FFFF] p-6 text-white">
                <h3 className="mb-3 font-semibold">Гарантия возврата</h3>
                <p className="text-sm">
                  {bookingState.tariff === 'tariff1' 
                    ? 'С базовым тарифом возврат минимальный и только по правилам перевозчиков.'
                    : bookingState.tariff === 'tariff2'
                    ? 'С выбранным тарифом вы можете отменить бронирование за 48 часов до вылета и получить возврат средств.'
                    : bookingState.tariff === 'tariff3'
                    ? 'С выбранным тарифом вы можете отменить бронирование в любой момент и получить возврат около 80% от стоимости.'
                    : 'С выбранным тарифом вы можете отменить бронирование в любой момент и получить полный возврат 100% стоимости.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

