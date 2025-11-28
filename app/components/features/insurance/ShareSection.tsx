'use client';

interface ShareSectionProps {
  route?: { departureCity: string; arrivalCity: string };
}

export function ShareSection({ route }: ShareSectionProps) {
  return (
    <div className="rounded-lg border border-gray-200 p-3 sm:p-4">
      <div className="mb-2 text-sm sm:text-base font-medium text-[#022444]">
        Путешествуете с кем-то еще?
      </div>
      <button className="flex items-center gap-2 text-xs sm:text-sm text-[#7B91FF]">
        <span>📤</span>
        <span className="underline">Поделиться</span>
      </button>
      <div className="mt-1 text-xs text-[#022444]">
        Поделиться сведениями о маршруте
      </div>
    </div>
  );
}

