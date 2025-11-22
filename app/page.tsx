import { Search, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[800px] overflow-hidden">
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
        <header className="relative z-10 px-6 py-6">
          <div className="flex items-center gap-2 text-white">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#022444]">
              <svg
                className="h-5 w-5 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L4 7v10c0 5.5 3.8 9.3 8 10 4.2-.7 8-4.5 8-10V7l-8-5zm0 2.2L18 8v9c0 4.4-3 7.6-6 8.2-3-.6-6-3.8-6-8.2V8l6-3.8z" />
              </svg>
            </div>
            <span className="text-2xl font-semibold">LenaLink</span>
          </div>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-6">
          <div className="flex w-full max-w-6xl items-center justify-between gap-12">
            {/* Left side - Text */}
            <div className="flex-1 text-white">
              <h1 className="mb-4 text-5xl font-bold leading-tight text-balance">
                Узнайте, как добраться куда угодно
              </h1>
              <p className="text-sm font-light tracking-[0.2em] uppercase">
                На самолете, поезде, автобусе, пароме или машине
              </p>
            </div>

            {/* Right side - Search Form */}
            <div className="w-full max-w-md">
              <div className="rounded-2xl bg-white p-6 shadow-xl">
                <div className="space-y-4">
                  {/* From Field */}
                  <div className="space-y-2">
                    <Label className="text-xs font-normal text-gray-500 uppercase">
                      Еду из
                    </Label>
                    <Input
                      defaultValue="Москва, Россия"
                      className="border-gray-200 text-base"
                    />
                  </div>

                  {/* Swap Button */}
                  <div className="flex justify-center -my-2">
                    <button className="rounded-full bg-white border border-gray-200 p-2 hover:bg-gray-50 transition-colors shadow-sm">
                      <ArrowUpDown className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>

                  {/* To Field */}
                  <div className="space-y-2">
                    <Label className="text-xs font-normal text-gray-500 uppercase">
                      В
                    </Label>
                    <Input
                      defaultValue="Олекминск, Якутия"
                      className="border-gray-200 text-base"
                    />
                  </div>

                  <Link href="/search">
                    <Button className="w-full bg-[#7B91FF] hover:bg-[#E06D32] text-white text-base font-medium py-6">
                      <Search className="mr-2 h-5 w-5" />
                      Найти варианты
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="border-b bg-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <span className="text-sm text-gray-500">Наши партнеры:</span>
            <div className="h-8 flex items-center px-4 py-2 bg-gray-100 rounded opacity-60">
              <span className="text-lg font-bold text-gray-700">Tutu.ru</span>
            </div>
            <div className="h-8 flex items-center px-4 py-2 bg-gray-100 rounded opacity-60">
              <span className="text-lg font-bold text-gray-700">Aviasales</span>
            </div>
            <div className="h-8 flex items-center px-4 py-2 bg-gray-100 rounded opacity-60">
              <span className="text-lg font-bold text-gray-700">АвиБус</span>
            </div>
            <div className="h-8 flex items-center px-4 py-2 bg-gray-100 rounded opacity-60">
              <span className="text-lg font-bold text-gray-700">ГАРС</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="mb-6 text-3xl font-bold text-balance">
            Что умеет LenaLink
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 leading-relaxed text-balance">
            LenaLink найдет любое место, город или достопримечательность по
            всему миру и знает тысячи маршрутов для того, чтобы вы легко нашли
            путь из пункта А в пункт Б.
          </p>
        </div>
      </div>
    </div>
  );
}
