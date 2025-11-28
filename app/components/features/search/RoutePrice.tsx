'use client';

interface RoutePriceProps {
  price: string;
  priceDetails: string;
}

export function RoutePrice({ price, priceDetails }: RoutePriceProps) {
  return (
    <div className="mb-3 sm:mb-4">
      <div className="text-2xl sm:text-3xl font-bold text-[#022444]">
        {price}
      </div>
      <div className="text-xs sm:text-sm text-[#022444]">{priceDetails}</div>
    </div>
  );
}

