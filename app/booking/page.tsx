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
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-4 text-[#022444] hover:text-[#7B91FF]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Назад
            </Button>
            <h1 className="text-3xl font-bold text-[#022444]">
              Москва → Олекминск
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
            {/* Left Side - Form */}
            <div className="lg:col-span-3 space-y-6">
              {/* Route Overview */}
              <div className="rounded-lg border bg-white p-6">
                <h2 className="mb-4 text-xl font-bold text-[#022444]">
                  Обзор маршрута
                </h2>

                <div className="space-y-4">
                  {/* Flight segment */}
                  <div className="flex items-start gap-4 border-b pb-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#558DCA]">
                      <Plane className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-bold text-[#022444]">
                            09:00
                          </div>
                          <div className="text-sm text-[#022444]">
                            Москва (DME)
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-[#022444]">
                            10 ч 30 мин
                          </div>
                          <div className="my-2 h-px w-24 bg-[#558DCA]"></div>
                          <div className="text-xs font-medium text-[#022444]">
                            Самолет • S7 Airlines
                          </div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-[#022444] text-right">
                            19:30
                          </div>
                          <div className="text-sm text-[#022444]">
                            Якутск (YKS)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bus segment */}
                  <div className="flex items-start gap-4 border-b pb-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#7B91FF]">
                      <Bus className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-bold text-[#022444]">
                            20:00
                          </div>
                          <div className="text-sm text-[#022444]">
                            Аэропорт Якутск
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-[#022444]">30 мин</div>
                          <div className="my-2 h-px w-24 bg-[#7B91FF]"></div>
                          <div className="text-xs font-medium text-[#022444]">
                            Автобус • АвиБус
                          </div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-[#022444] text-right">
                            20:30
                          </div>
                          <div className="text-sm text-[#022444]">
                            Якутск, речной порт
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* River segment */}
                  <div className="flex items-start gap-4 pb-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#96FFFF]">
                      <svg
                        className="h-6 w-6 text-[#022444]"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.48.26-.6.5s-.15.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-bold text-[#022444]">
                            21:00
                          </div>
                          <div className="text-sm text-[#022444]">
                            Якутск, речной порт
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-[#022444]">9 ч</div>
                          <div className="flex justify-center">
                            <div className="my-auto h-px w-24 bg-[#96FFFF] text-center"></div>
                          </div>
                          <div className="text-xs font-medium text-[#022444]">
                            Речной транспорт • Ленские Зори
                          </div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-[#022444] text-right">
                            06:00
                          </div>
                          <div className="text-sm text-[#022444]">
                            Олекминск, речной порт
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Passenger Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="rounded-lg border bg-white p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-[#022444]">
                      Данные пассажира
                    </h2>
                    <Select defaultValue="adult">
                      <SelectTrigger className="w-[250px]">
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

                  <div className="mb-4 rounded-lg bg-blue-50 p-4">
                    <div className="flex gap-2">
                      <span className="text-[#558DCA] text-lg mx-3 font-bold">
                        ℹ
                      </span>
                      <p className="text-sm text-[#022444]">
                        Чтобы избежать трудностей при посадке, укажите имена и
                        фамилии{" "}
                        <strong>в точности, как они написаны в паспорте</strong>
                        .
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-[#022444]">
                        Имя
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="Например: Ivan"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-[#022444]">
                        Фамилия(-и)
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Например: Petrov"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="citizenship" className="text-[#022444]">
                        Гражданство
                      </Label>
                      <Select>
                        <SelectTrigger id="citizenship">
                          <SelectValue placeholder="Выбрать" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ru">Россия</SelectItem>
                          <SelectItem value="de">Германия</SelectItem>
                          <SelectItem value="us">США</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gender" className="text-[#022444]">
                        Пол
                      </Label>
                      <Select>
                        <SelectTrigger id="gender">
                          <SelectValue placeholder="Выбрать" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Мужской</SelectItem>
                          <SelectItem value="female">Женский</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#022444]">Дата рождения</Label>
                      <div className="grid grid-cols-3 gap-2">
                        <Input placeholder="ДД" required />
                        <Input placeholder="ММ" required />
                        <Input placeholder="ГГГГ" required />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="text-[#022444]"
                  >
                    Назад
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#7B91FF] hover:bg-[#E16D32]"
                  >
                    Продолжить
                  </Button>
                </div>
              </form>
            </div>

            {/* Right Side - Map and Price Summary */}
            <div className="lg:col-span-2 space-y-6">
              {/* Yandex Map */}
              <div className="rounded-lg border bg-white p-4">
                <h3 className="mb-3 text-lg font-bold text-[#022444]">КАРТА</h3>
                {isMounted ? (
                  <div
                    ref={mapRef}
                    className="h-[300px] w-full rounded-lg bg-gray-100"
                  ></div>
                ) : (
                  <div className="h-[300px] w-full rounded-lg bg-gray-100 flex items-center justify-center">
                    <div className="text-[#022444]">Загрузка карты...</div>
                  </div>
                )}
              </div>

              {/* Price Summary */}
              <div className="rounded-lg border bg-white p-6">
                <h3 className="mb-4 text-lg font-bold text-[#022444]">Итого</h3>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#022444]">1x взрослый</span>
                    <span className="font-medium text-[#022444]">41 256₽</span>
                  </div>
                </div>

                <div className="my-4 border-t"></div>

                <div className="flex justify-between">
                  <span className="font-bold text-[#022444]">Итого</span>
                  <span className="text-2xl font-bold text-[#7B91FF]">
                    41 256₽
                  </span>
                </div>

                <div className="mt-4 text-xs text-[#022444]">
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
