"use client";

import type React from "react";

import { ArrowLeft, Bus, Plane, Train, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UnifiedHeader } from "@/components/unified-header";
import { PageLoader } from "@/components/page-loader";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function BookingPage() {
  const router = useRouter();
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Check if script already exists
    if (document.querySelector('script[src*="api-maps.yandex.ru"]')) {
      // Script already loaded, just initialize map
      if (
        mapRef.current &&
        typeof window !== "undefined" &&
        (window as any).ymaps
      ) {
        (window as any).ymaps.ready(() => {
          const map = new (window as any).ymaps.Map(mapRef.current, {
            center: [60.0, 105.0],
            zoom: 4,
            controls: ["zoomControl"],
          });

          const routeLine = new (window as any).ymaps.Polyline(
            [
              [55.7558, 37.6173], // Moscow
              [62.0355, 129.6755], // Yakutsk
              [60.4076, 120.4279], // Olekminsk
            ],
            {},
            {
              strokeColor: "#7B91FF",
              strokeWidth: 4,
              strokeStyle: "solid",
            },
          );

          map.geoObjects.add(routeLine);

          const moscowPlacemark = new (window as any).ymaps.Placemark(
            [55.7558, 37.6173],
            {
              balloonContent: "Москва",
            },
          );
          map.geoObjects.add(moscowPlacemark);

          const yakutskPlacemark = new (window as any).ymaps.Placemark(
            [62.0355, 129.6755],
            {
              balloonContent: "Якутск",
            },
          );
          map.geoObjects.add(yakutskPlacemark);

          const olekminskPlacemark = new (window as any).ymaps.Placemark(
            [60.4076, 120.4279],
            {
              balloonContent: "Олекминск",
            },
          );
          map.geoObjects.add(olekminskPlacemark);
        });
      }
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=your_api_key_here";
    script.async = true;
    script.onload = () => {
      if (
        mapRef.current &&
        typeof window !== "undefined" &&
        (window as any).ymaps
      ) {
        (window as any).ymaps.ready(() => {
          const map = new (window as any).ymaps.Map(mapRef.current, {
            center: [60.0, 105.0],
            zoom: 4,
            controls: ["zoomControl"],
          });

          const routeLine = new (window as any).ymaps.Polyline(
            [
              [55.7558, 37.6173], // Moscow
              [62.0355, 129.6755], // Yakutsk
              [60.4076, 120.4279], // Olekminsk
            ],
            {},
            {
              strokeColor: "#7B91FF",
              strokeWidth: 4,
              strokeStyle: "solid",
            },
          );

          map.geoObjects.add(routeLine);

          const moscowPlacemark = new (window as any).ymaps.Placemark(
            [55.7558, 37.6173],
            {
              balloonContent: "Москва",
            },
          );
          map.geoObjects.add(moscowPlacemark);

          const yakutskPlacemark = new (window as any).ymaps.Placemark(
            [62.0355, 129.6755],
            {
              balloonContent: "Якутск",
            },
          );
          map.geoObjects.add(yakutskPlacemark);

          const olekminskPlacemark = new (window as any).ymaps.Placemark(
            [60.4076, 120.4279],
            {
              balloonContent: "Олекминск",
            },
          );
          map.geoObjects.add(olekminskPlacemark);
        });
      }
    };
    document.head.appendChild(script);
  }, [isMounted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/insurance-selection");
  };

  return (
    <>
      <PageLoader />
      <div className="min-h-screen bg-[#FFFFFF]">
        {/* Header */}
        <UnifiedHeader />

        {/* Main Content */}
        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 md:py-8">
          <div className="mb-4 sm:mb-6">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-3 sm:mb-4 text-[#022444] hover:text-[#7B91FF] text-sm sm:text-base h-8 sm:h-9 px-2 sm:px-4"
            >
              <ArrowLeft className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Назад
            </Button>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#022444]">
              Москва → Олекминск
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-5">
            {/* Left Side - Form */}
            <div className="lg:col-span-3 space-y-4 sm:space-y-6">
              {/* Route Overview */}
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

              {/* Passenger Form */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="rounded-lg border bg-white p-3 sm:p-4 md:p-6">
                  <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
                    <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#022444]">
                      Данные пассажира
                    </h2>
                    <Select defaultValue="adult">
                      <SelectTrigger className="w-full sm:w-[200px] md:w-[250px] h-8 sm:h-9 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="adult">
                          Взрослый (старше 12 лет)
                        </SelectItem>
                        <SelectItem value="child">
                          Ребёнок (2-12 лет)
                        </SelectItem>
                        <SelectItem value="infant">
                          Младенец (до 2 лет)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="mb-3 sm:mb-4 rounded-lg bg-blue-50 p-2 sm:p-3 md:p-4">
                    <div className="flex gap-1.5 sm:gap-2">
                      <span className="text-[#558DCA] text-base sm:text-lg mx-1 sm:mx-3 font-bold shrink-0">
                        ℹ
                      </span>
                      <p className="text-xs sm:text-sm text-[#022444]">
                        Чтобы избежать трудностей при посадке, укажите имена и
                        фамилии{" "}
                        <strong>в точности, как они написаны в паспорте</strong>
                        .
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="firstName" className="text-sm sm:text-base text-[#022444]">
                        Имя
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="Например: Ivan"
                        required
                        className="h-8 sm:h-9 text-sm sm:text-base"
                      />
                    </div>
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="lastName" className="text-sm sm:text-base text-[#022444]">
                        Фамилия(-и)
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Например: Petrov"
                        required
                        className="h-8 sm:h-9 text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div className="mt-3 sm:mt-4 grid gap-3 sm:gap-4 md:grid-cols-3">
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="citizenship" className="text-sm sm:text-base text-[#022444]">
                        Гражданство
                      </Label>
                      <Select>
                        <SelectTrigger id="citizenship" className="h-8 sm:h-9 text-sm sm:text-base">
                          <SelectValue placeholder="Выбрать" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ru">Россия</SelectItem>
                          <SelectItem value="de">Германия</SelectItem>
                          <SelectItem value="us">США</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label htmlFor="gender" className="text-sm sm:text-base text-[#022444]">
                        Пол
                      </Label>
                      <Select>
                        <SelectTrigger id="gender" className="h-8 sm:h-9 text-sm sm:text-base">
                          <SelectValue placeholder="Выбрать" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Мужской</SelectItem>
                          <SelectItem value="female">Женский</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5 sm:space-y-2">
                      <Label className="text-sm sm:text-base text-[#022444]">Дата рождения</Label>
                      <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                        <Input placeholder="ДД" required className="h-8 sm:h-9 text-sm sm:text-base text-center" />
                        <Input placeholder="ММ" required className="h-8 sm:h-9 text-sm sm:text-base text-center" />
                        <Input placeholder="ГГГГ" required className="h-8 sm:h-9 text-sm sm:text-base text-center" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-between gap-2 sm:gap-0">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="text-[#022444] h-9 sm:h-10 text-sm sm:text-base w-full sm:w-auto"
                  >
                    Назад
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#7B91FF] hover:bg-[#E16D32] h-9 sm:h-10 text-sm sm:text-base w-full sm:w-auto"
                  >
                    Продолжить
                  </Button>
                </div>
              </form>
            </div>

            {/* Right Side - Map and Price Summary */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              {/* Yandex Map */}
              <div className="rounded-lg border bg-white p-2 sm:p-3 md:p-4">
                <h3 className="mb-2 sm:mb-3 text-sm sm:text-base md:text-lg font-bold text-[#022444]">КАРТА</h3>
                {isMounted ? (
                  <div
                    ref={mapRef}
                    className="h-[200px] sm:h-[250px] md:h-[300px] w-full rounded-lg bg-gray-100"
                  ></div>
                ) : (
                  <div className="h-[200px] sm:h-[250px] md:h-[300px] w-full rounded-lg bg-gray-100 flex items-center justify-center">
                    <div className="text-xs sm:text-sm text-[#022444]">Загрузка карты...</div>
                  </div>
                )}
              </div>

              {/* Price Summary */}
              <div className="rounded-lg border bg-white p-3 sm:p-4 md:p-6">
                <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-bold text-[#022444]">Итого</h3>

                <div className="space-y-1.5 sm:space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="text-[#022444]">1x взрослый</span>
                    <span className="font-medium text-[#022444]">41 256₽</span>
                  </div>
                </div>

                <div className="my-3 sm:my-4 border-t"></div>

                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm sm:text-base text-[#022444]">Итого</span>
                  <span className="text-xl sm:text-2xl font-bold text-[#7B91FF]">
                    41 256₽
                  </span>
                </div>

                <div className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-[#022444]">
                  Включает все налоги, сборы, платежи и сервисные сборы
                  LenaLink. Сервисные сборы LenaLink рассчитываются для каждого
                  пассажира и не подлежат возврату.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
