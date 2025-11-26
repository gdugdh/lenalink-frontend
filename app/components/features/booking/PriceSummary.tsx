'use client';

export function PriceSummary() {
  return (
    <div className="rounded-lg border bg-white p-3 sm:p-4 md:p-6">
      <h3 className="mb-3 sm:mb-4 text-base sm:text-lg font-bold text-[#022444]">
        Итого
      </h3>

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
        Включает все налоги, сборы, платежи и сервисные сборы LenaLink.
        Сервисные сборы LenaLink рассчитываются для каждого пассажира и не
        подлежат возврату.
      </div>
    </div>
  );
}

