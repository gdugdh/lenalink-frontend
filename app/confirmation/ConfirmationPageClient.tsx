"use client";

import { Check, Plane, Download, Share2, Calendar } from "lucide-react";
import { UnifiedHeader } from "@/app/components/shared/unified-header";
import { PageLoader } from "@/app/components/shared/page-loader";
import { useRouter } from "next/navigation";

export function ConfirmationPageClient() {
  const router = useRouter();

  return (
    <>
      <PageLoader />
      <div className="min-h-screen bg-[#FFFFFF]">
        <UnifiedHeader />

      {/* Success message */}
      <div className="bg-gradient-to-r from-[#7B91FF] to-[#7B91FF] py-12 text-center text-white">
        <div className="mx-auto max-w-3xl px-4">
          <div className="mb-4 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white">
              <Check className="h-12 w-12 text-[#7B91FF]" />
            </div>
          </div>
          <h1 className="mb-2 text-3xl font-bold">
            Бронирование подтверждено!
          </h1>
          <p className="text-lg">Ваш билет был успешно забронирован</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-lg border bg-white p-6">
              <h2 className="mb-4 text-xl font-bold text-[#022444]">
                Номер бронирования
              </h2>
              <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
                <div>
                  <div className="text-sm text-[#022444]">Код бронирования</div>
                  <div className="text-2xl font-bold text-[#022444]">
                    MOW2OLZ2024
                  </div>
                </div>
                <button className="rounded-lg bg-[#7B91FF] px-4 py-2 text-sm font-semibold text-white hover:bg-[#E16D32]">
                  Скопировать
                </button>
              </div>
            </div>

            <div className="rounded-lg border bg-white p-6">
              <h2 className="mb-4 text-xl font-bold text-[#022444]">
                Детали поездки
              </h2>

              <div className="mb-6 border-b pb-6">
                <div className="mb-4 flex items-center gap-2 text-sm text-[#022444]">
                  <Calendar className="h-4 w-4" />
                  <span>вт, 2 декабря 2024</span>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#022444]">
                          09:00
                        </div>
                        <div className="text-sm text-[#022444]">MOW</div>
                      </div>
                      <div className="flex flex-1 flex-col items-center py-2">
                        <div className="mb-1 text-xs text-[#022444]">
                          10 ч. 30 мин.
                        </div>
                        <div className="relative w-full">
                          <div className="h-px w-full bg-[#558DCA]"></div>
                          <Plane className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-90 text-[#558DCA]" />
                        </div>
                        <div className="mt-1 text-xs text-[#022444]">
                          Прямой рейс
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-[#022444]">
                          19:30
                        </div>
                        <div className="text-sm text-[#022444]">YKS</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                    <span className="text-xs font-bold text-[#022444]">S7</span>
                  </div>
                  <span className="text-[#022444]">
                    S7 Airlines • Рейс S7 123
                  </span>
                </div>

                <div className="mt-2 text-sm text-[#022444]">
                  Москва (Домодедово DME) → Якутск
                  (Международный аэропорт Якутск YKS)
                </div>
              </div>

              <div className="border-b pb-6">
                <div className="mb-4 flex items-center gap-2 text-sm text-[#022444]">
                  <Calendar className="h-4 w-4" />
                  <span>вт, 2 декабря 2024</span>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#022444]">
                          20:00
                        </div>
                        <div className="text-sm text-[#022444]">YKS</div>
                      </div>
                      <div className="flex flex-1 flex-col items-center py-2">
                        <div className="mb-1 text-xs text-[#022444]">
                          30 мин.
                        </div>
                        <div className="relative w-full">
                          <div className="h-px w-full bg-[#7B91FF]"></div>
                          <svg className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-[#7B91FF]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 16c0 .88.39 1.67 1 2.22V20c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h8v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4v10zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17zm9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-6H6V6h12v5z"/>
                          </svg>
                        </div>
                        <div className="mt-1 text-xs text-[#022444]">
                          Автобус
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-[#022444]">
                          20:30
                        </div>
                        <div className="text-sm text-[#022444]">YKS</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                    <span className="text-xs font-bold text-[#022444]">АБ</span>
                  </div>
                  <span className="text-[#022444]">
                    АвиБус
                  </span>
                </div>

                <div className="mt-2 text-sm text-[#022444]">
                  Аэропорт Якутск → Якутск (Речной порт)
                </div>
              </div>

              <div>
                <div className="mb-4 flex items-center gap-2 text-sm text-[#022444]">
                  <Calendar className="h-4 w-4" />
                  <span>вт, 2 декабря 2024</span>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#022444]">
                          21:00
                        </div>
                        <div className="text-sm text-[#022444]">YKS</div>
                      </div>
                      <div className="flex flex-1 flex-col items-center py-2">
                        <div className="mb-1 text-xs text-[#022444]">
                          9 ч.
                        </div>
                        <div className="relative w-full">
                          <div className="h-px w-full bg-[#96FFFF]"></div>
                          <svg className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-[#96FFFF]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.65 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.42c-.26.08-.48.26-.6.5s-.15.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z"/>
                          </svg>
                        </div>
                        <div className="mt-1 text-xs text-[#022444]">
                          Речной транспорт
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-[#022444]">
                          06:00
                        </div>
                        <div className="text-sm text-[#022444]">OLZ</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                    <span className="text-xs font-bold text-[#022444]">ЛЗ</span>
                  </div>
                  <span className="text-[#022444]">
                    Ленские Зори
                  </span>
                </div>

                <div className="mt-2 text-sm text-[#022444]">
                  Якутск (Речной порт) → Олекминск (Речной порт)
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-white p-6">
              <h2 className="mb-4 text-xl font-bold text-[#022444]">
                Информация о пассажире
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#022444]">Имя:</span>
                  <span className="font-medium text-[#022444]">
                    Иван Петров
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#022444]">Гражданство:</span>
                  <span className="font-medium text-[#022444]">Россия</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#022444]">Дата рождения:</span>
                  <span className="font-medium text-[#022444]">15.03.1990</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border-l-4 border-[#7B91FF] bg-orange-50 p-6">
              <h3 className="mb-2 font-semibold text-[#022444]">
                Важная информация
              </h3>
              <ul className="space-y-2 text-sm text-[#022444]">
                <li>• Пожалуйста, прибудьте в аэропорт за 2 часа до вылета</li>
                <li>
                  • Убедитесь, что ваш паспорт действителен не менее 6 месяцев
                </li>
                <li>
                  • Проверьте визовые требования для вашего пункта назначения
                </li>
                <li>• Детали бронирования отправлены на ваш email</li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border bg-white p-6">
              <h2 className="mb-4 text-xl font-bold text-[#022444]">
                Сводка по стоимости
              </h2>

              <div className="space-y-3 border-b pb-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#022444]">Билеты (1 взрослый)</span>
                  <span className="font-medium text-[#022444]">41 256₽</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#022444]">1x место (доп. пространство)</span>
                  <span className="font-medium text-[#022444]">7 900₽</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#022444]">1x тариф Standard</span>
                  <span className="font-medium text-[#022444]">2 244₽</span>
                </div>
              </div>

              <div className="mt-4 flex justify-between text-lg">
                <span className="font-bold text-[#022444]">Итого</span>
                <span className="text-2xl font-bold text-[#7B91FF]">
                  51 400₽
                </span>
              </div>

              <div className="mt-4 text-xs text-[#022444]">
                Включает все налоги, сборы, платежи и сервисные сборы
                LenaLink. Сервисные сборы LenaLink рассчитываются
                для каждого пассажира и не подлежат возврату.
              </div>

              <button className="mt-4 w-full text-sm text-[#7B91FF] underline">
                Посмотреть структуру цены
              </button>
            </div>

            <div className="rounded-lg border bg-white p-6">
              <h3 className="mb-4 font-semibold text-[#022444]">Действия</h3>
              <div className="space-y-3">
                <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#7B91FF] px-4 py-3 text-sm font-semibold text-[#7B91FF] hover:bg-[#7B91FF] hover:text-white">
                  <Download className="h-4 w-4" />
                  Скачать билет
                </button>
                <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#7B91FF] px-4 py-3 text-sm font-semibold text-[#7B91FF] hover:bg-[#7B91FF] hover:text-white">
                  <Share2 className="h-4 w-4" />
                  Поделиться
                </button>
              </div>
            </div>

            <div className="rounded-lg bg-gradient-to-br from-[#558DCA] to-[#96FFFF] p-6 text-white">
              <h3 className="mb-3 font-semibold">Следующие шаги</h3>
              <ol className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="font-bold">1.</span>
                  <span>Проверьте email для подтверждения</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">2.</span>
                  <span>Сохраните номер бронирования</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">3.</span>
                  <span>Онлайн-регистрация за 24 часа</span>
                </li>
              </ol>
            </div>

            <button
              onClick={() => router.push("/")}
              className="w-full rounded-lg bg-[#7B91FF] py-3 text-center font-semibold text-white hover:bg-[#E16D32]"
            >
              Вернуться на главную
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

