'use client';

interface RouteSummaryProps {
  route: {
    departureCity: string;
    arrivalCity: string;
    duration?: string;
  };
}

export function RouteSummary({ route }: RouteSummaryProps) {
  return (
    <div className="rounded-lg border bg-white p-3 sm:p-4 md:p-6">
      <h2 className="mb-3 sm:mb-4 text-base sm:text-lg md:text-xl font-bold text-[#022444]">
        Обзор маршрута
      </h2>
      <div className="text-sm text-[#022444]">
        {route.departureCity} → {route.arrivalCity}
        {route.duration && ` • ${route.duration}`}
      </div>
    </div>
  );
}

