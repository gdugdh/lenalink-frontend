"use client";

import { ArrowLeft, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UnifiedHeader } from "@/components/unified-header";
import { PageLoader } from "@/components/page-loader";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SeatSelectionPage() {
  const router = useRouter();
  const [selectedOutbound, setSelectedOutbound] = useState<string>("random");

  const handleContinue = () => {
    router.push("/payment");
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

                  <div className="grid grid-cols-4 gap-4">
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
                        onChange={(e) => setSelectedOutbound(e.target.value)}
                        className="sr-only"
                      />
                      <div className="mb-2 flex justify-center">
                        <img
                          className="h-8 w-8 text-[#558DCA]"
                          src={"/random-svgrepo-com.svg"}
                          alt="dots icon"
                        />
                      </div>
                      <div className="mb-1 text-sm font-medium text-[#022444]">
                        Случайный выбор места
                      </div>
                      <div className="text-sm font-bold text-[#7B91FF]">
                        Бесплатно
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
                        onChange={(e) => setSelectedOutbound(e.target.value)}
                        className="sr-only"
                      />
                      <div className="mb-2 flex justify-center">
                        <img
                          className="h-8 w-8 text-[#558DCA]"
                          src={"/window-seat-svgrepo-com.svg"}
                          alt="dots icon"
                        />
                      </div>
                      <div className="mb-1 text-sm font-medium text-[#022444]">
                        Окно
                      </div>
                      <div className="text-sm font-bold text-[#7B91FF]">
                        3 000₽
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
                        onChange={(e) => setSelectedOutbound(e.target.value)}
                        className="sr-only"
                      />
                      <div className="mb-2 flex justify-center">
                        <img
                          className="h-8 w-8 text-[#558DCA]"
                          src={"/massage-chair-one-svgrepo-com.svg"}
                          alt="dots icon"
                        />
                      </div>
                      <div className="mb-1 text-sm font-medium text-[#022444]">
                        Проход
                      </div>
                      <div className="text-sm font-bold text-[#7B91FF]">
                        2 300₽
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
                        onChange={(e) => setSelectedOutbound(e.target.value)}
                        className="sr-only"
                      />
                      <div className="mb-2 flex justify-center">
                        <img
                          className="h-8 w-8 text-[#558DCA]"
                          src={"/massage-chair-one-svgrepo-com.svg"}
                          alt="dots icon"
                        />
                      </div>
                      <div className="mb-1 text-sm font-medium text-[#022444]">
                        Дополнительное пространство для ног
                      </div>
                      <div className="text-sm font-bold text-[#7B91FF]">
                        7 900₽
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

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#022444]">1x взрослый</span>
                    <span className="font-medium text-[#022444]">41 256₽</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#022444]">1x тариф Standard</span>
                    <span className="font-medium text-[#022444]">2 244₽</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#022444]">
                      1x место (доп. пространство)
                    </span>
                    <span className="font-medium text-[#022444]">7 900₽</span>
                  </div>
                </div>

                <div className="my-4 border-t"></div>

                <div className="flex justify-between">
                  <span className="font-bold text-[#022444]">Итого</span>
                  <span className="text-2xl font-bold text-[#7B91FF]">
                    51 400₽
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
