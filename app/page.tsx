import type { Metadata } from "next";
import { HomeSearchForm } from "@/app/components/features/search/HomeSearchForm";
import { HomeHeader } from "@/app/components/shared/home-header";

export const metadata: Metadata = {
  title: 'Главная | LenaLink',
  description: 'Найдите лучшие маршруты для вашей поездки на самолете, поезде, автобусе, пароме или машине',
  openGraph: {
    title: 'LenaLink - Найдите маршрут куда угодно',
    description: 'Найдите лучшие маршруты для вашей поездки',
    type: 'website',
  },
};

export default function Page() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[500px] sm:h-[600px] md:h-[800px] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(/placeholder.jpeg?height=600&width=1920&query=aerial+view+of+winding+road+through+green+landscape+with+river)",
          }}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Header */}
        <HomeHeader />

        {/* Hero Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-3 sm:px-6 pb-6">
          <div className="flex flex-col md:flex-row w-full max-w-6xl items-center justify-between gap-6 md:gap-12">
            {/* Left side - Text */}
            <div className="flex-1 text-white text-center md:text-left">
              <h1 className="mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-5xl font-bold leading-tight text-balance">
                Узнайте, как добраться куда угодно
              </h1>
              <p className="text-xs sm:text-sm font-light tracking-[0.1em] sm:tracking-[0.2em] uppercase">
                На самолете, поезде, автобусе, пароме или машине
              </p>
            </div>

            {/* Right side - Search Form */}
            <HomeSearchForm />
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="border-b bg-white py-4 sm:py-6 md:py-8">
        <div className="container mx-auto px-3 sm:px-6">
          <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8 flex-wrap">
            <span className="text-xs sm:text-sm text-gray-500">Наши партнеры:</span>
            <div className="h-7 sm:h-8 flex items-center px-2 sm:px-4 py-1.5 sm:py-2 bg-gray-100 rounded opacity-60">
              <span className="text-sm sm:text-lg font-bold text-gray-700">ГАРС</span>
            </div>
            <div className="h-7 sm:h-8 flex items-center px-2 sm:px-4 py-1.5 sm:py-2 bg-gray-100 rounded opacity-60">
              <span className="text-sm sm:text-lg font-bold text-gray-700">АвиБус</span>
            </div>
            <div className="h-7 sm:h-8 flex items-center px-2 sm:px-4 py-1.5 sm:py-2 bg-gray-100 rounded opacity-60">
              <span className="text-sm sm:text-lg font-bold text-gray-700">Aviasales</span>
            </div>
            <div className="h-7 sm:h-8 flex items-center px-2 sm:px-4 py-1.5 sm:py-2 bg-gray-100 rounded opacity-60">
              <span className="text-sm sm:text-lg font-bold text-gray-700">Tutu.ru</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-white py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-3 sm:px-6 text-center">
          <h2 className="mb-4 sm:mb-6 text-xl sm:text-2xl md:text-3xl font-bold text-balance">
            Что умеет LenaLink
          </h2>
          <p className="mx-auto max-w-3xl text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed text-balance">
            LenaLink найдет любое место, город или достопримечательность по
            всему миру и знает тысячи маршрутов для того, чтобы вы легко нашли
            путь из пункта А в пункт Б.
          </p>
        </div>
      </div>
    </div>
  );
}
