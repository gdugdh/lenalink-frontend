'use client';

interface RouteCarrierProps {
  carrierCode?: string;
  carrier: string;
}

export function RouteCarrier({ carrierCode, carrier }: RouteCarrierProps) {
  return (
    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#558DCA] shrink-0">
      {carrierCode ? (
        <span className="text-lg sm:text-xl font-bold text-white">
          {carrierCode}
        </span>
      ) : (
        <svg
          className="h-5 w-5 sm:h-6 sm:w-6 text-white"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <circle cx="12" cy="12" r="10" />
        </svg>
      )}
    </div>
  );
}

