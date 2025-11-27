"use client";

import { Plane } from "lucide-react";
import Image from "next/image";
import { Button } from "@/app/components/ui/button";
import { UnifiedHeader } from "@/app/components/shared/unified-header";
import { PageLoader } from "@/app/components/shared/page-loader";
import { useRouter } from "next/navigation";
import { routes } from "@/app/lib/routes";
import { useBooking, type SeatType } from "@/app/lib/booking-context";
import { calculatePrice, getTariffName, getPassengerTypeLabel, getSeatName, getSeatPrice } from "@/app/lib/price-calculator";

export function SeatSelectionPageClient() {
  const router = useRouter();
  const { bookingState, setSeatType } = useBooking();
  const selectedOutbound = bookingState.seatType;

  const handleContinue = () => {
    router.push(routes.payment);
  };

  return (
    <>
      <PageLoader />
      <div className="min-h-screen bg-[#FFFFFF]">
        <UnifiedHeader />

        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-8 text-3xl font-bold text-[#022444]">
            Москва → Олекминск
          </h1>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left Side - Seat Selection */}
            <div className="lg:col-span-2 space-y-8">
              {/* Outbound Flight */}
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#558DCA]">
                    <Plane className="h-6 w-6 rotate-90 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-[#022444]">
                      Выбор мест
                    </h2>
                    <p className="text-sm text-[#022444]">
                      Выбор мест для авиарейса
                    </p>
                  </div>
                </div>

                <div className="mb-4 rounded-lg border bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-[#022444]">
                        Москва DME → Якутск YKS
                      </div>
                      <div className="text-sm text-[#022444]">
                        Вылет из DME в 09:00
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="rounded bg-green-100 px-2 py-1 text-green-700">
                        ✓ У вас будет дополнительное пространство для ног
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border bg-white p-6">
                  <h3 className="mb-4 font-medium text-[#022444]">
                    У нас нет схемы мест для этого рейса
                  </h3>
                  <p className="mb-6 text-sm text-[#022444]">
                    Выберите предпочитаемый вариант ниже.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Random seat */}
                    <label
                      className={`cursor-pointer rounded-lg border-2 p-4 text-center transition-all ${
                        selectedOutbound === "random"
                          ? "border-[#7B91FF] bg-orange-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="outbound"
                        value="random"
                        checked={selectedOutbound === "random"}
                        onChange={(e) => setSeatType(e.target.value as SeatType)}
                        className="sr-only"
                      />
                      <div className="mb-2 flex justify-center">
                        <Image
                          className="h-8 w-8 text-[#558DCA]"
                          src="/random-svgrepo-com.svg"
                          alt="dots icon"
                          width={32}
                          height={32}
                        />
                      </div>
                      <div className="mb-1 text-sm font-medium text-[#022444]">
                        {getSeatName("random")}
                      </div>
                      <div className="text-sm font-bold text-[#7B91FF]">
                        {getSeatPrice("random") === 0 ? "Бесплатно" : `${getSeatPrice("random").toLocaleString('ru-RU')}₽`}
                      </div>
                    </label>

                    {/* Window seat */}
                    <label
                      className={`cursor-pointer rounded-lg border-2 p-4 text-center transition-all ${
                        selectedOutbound === "window"
                          ? "border-[#7B91FF] bg-orange-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="outbound"
                        value="window"
                        checked={selectedOutbound === "window"}
                        onChange={(e) => setSeatType(e.target.value as SeatType)}
                        className="sr-only"
                      />
                      <div className="mb-2 flex justify-center">
                        <Image
                          className="h-8 w-8 text-[#558DCA]"
                          src="/window-seat-svgrepo-com.svg"
                          alt="window seat icon"
                          width={32}
                          height={32}
                        />
                      </div>
                      <div className="mb-1 text-sm font-medium text-[#022444]">
                        {getSeatName("window")}
                      </div>
                      <div className="text-sm font-bold text-[#7B91FF]">
                        {getSeatPrice("window").toLocaleString('ru-RU')}₽
                      </div>
                    </label>

                    {/* Aisle seat */}
                    <label
                      className={`cursor-pointer rounded-lg border-2 p-4 text-center transition-all ${
                        selectedOutbound === "aisle"
                          ? "border-[#7B91FF] bg-orange-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="outbound"
                        value="aisle"
                        checked={selectedOutbound === "aisle"}
                        onChange={(e) => setSeatType(e.target.value as SeatType)}
                        className="sr-only"
                      />
                      <div className="mb-2 flex justify-center">
                        <Image
                          className="h-8 w-8 text-[#558DCA]"
                          src="/massage-chair-one-svgrepo-com.svg"
                          alt="aisle seat icon"
                          width={32}
                          height={32}
                        />
                      </div>
                      <div className="mb-1 text-sm font-medium text-[#022444]">
                        {getSeatName("aisle")}
                      </div>
                      <div className="text-sm font-bold text-[#7B91FF]">
                        {getSeatPrice("aisle").toLocaleString('ru-RU')}₽
                      </div>
                    </label>

                    {/* Extra legroom */}
                    <label
                      className={`cursor-pointer rounded-lg border-2 p-4 text-center transition-all ${
                        selectedOutbound === "legroom"
                          ? "border-[#7B91FF] bg-orange-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="outbound"
                        value="legroom"
                        checked={selectedOutbound === "legroom"}
                        onChange={(e) => setSeatType(e.target.value as SeatType)}
                        className="sr-only"
                      />
                      <div className="mb-2 flex justify-center">
                        <Image
                          className="h-8 w-8 text-[#558DCA]"
                          src="/massage-chair-one-svgrepo-com.svg"
                          alt="extra legroom icon"
                          width={32}
                          height={32}
                        />
                      </div>
                      <div className="mb-1 text-sm font-medium text-[#022444]">
                        {getSeatName("legroom")}
                      </div>
                      <div className="text-sm font-bold text-[#7B91FF]">
                        {getSeatPrice("legroom").toLocaleString('ru-RU')}₽
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => router.back()}
                  className="text-[#022444]"
                >
                  Предыдущий рейс
                </Button>
                <Button
                  onClick={handleContinue}
                  className="bg-[#7B91FF] hover:bg-[#E16D32]"
                >
                  Далее
                </Button>
              </div>
            </div>

            {/* Right Side - Price Summary */}
            <div className="space-y-6">
              <div className="rounded-lg border bg-white p-6">
                <h3 className="mb-4 text-lg font-bold text-[#022444]">Итого</h3>

                {(() => {
                  const priceBreakdown = calculatePrice(
                    bookingState.passengerType,
                    bookingState.tariff,
                    bookingState.seatType
                  );
                  
                  return (
                    <>
                      <div className="space-y-2">
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
                            <span className="text-[#022444]">
                              1x место
                            </span>
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
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

