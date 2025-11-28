'use client';

interface PassengerInfoFieldProps {
  passengerCount: number;
  tariff: string;
}

export function PassengerInfoField({ passengerCount, tariff }: PassengerInfoFieldProps) {
  return (
    <div className="flex items-center border-l px-2 sm:px-4 py-2 sm:py-3 shrink-0" style={{ height: '48px', minWidth: '90px', width: 'auto', flexShrink: 0 }}>
      <div className="flex-1 min-w-0">
        <div className="text-xs sm:text-sm font-medium text-[#022444] whitespace-nowrap truncate">
          {passengerCount} пассажир
        </div>
        <div className="text-xs text-[#022444] hidden sm:block">{tariff}</div>
      </div>
    </div>
  );
}

