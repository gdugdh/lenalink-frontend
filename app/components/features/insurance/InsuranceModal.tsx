"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { routes } from "@/app/lib/routes";
import type { RouteData } from "@/app/components/features/search/SearchResults";
import { useBooking } from "@/app/lib/booking-context";
import { TripDetailsSection } from "./TripDetailsSection";
import { ShareSection } from "./ShareSection";
import { InsurancePlanCard } from "./InsurancePlanCard";

interface InsuranceModalProps {
  isOpen: boolean;
  onCloseAction: () => void;
  route?: RouteData | null;
}

export function InsuranceModal({ isOpen, onCloseAction, route }: InsuranceModalProps) {
  const router = useRouter();
  const { setSelectedRoute } = useBooking();

  if (!isOpen) return null;

  // Default route data if none is provided
  const defaultRoute: RouteData = {
    id: '1',
    badge: 'Оптимальный',
    price: '41 256₽',
    priceDetails: '45 854₽ с багажом 23кг — 1 шт Ручная кладь 8кг — 1 шт',
    carrier: 'S7 Airlines',
    carrierCode: 'S7',
    departureTime: '09:00',
    departureCity: 'Москва',
    departureDate: '2 дек, вт',
    arrivalTime: '06:00',
    arrivalCity: 'Олекминск',
    arrivalDate: '3 дек, ср',
    duration: '21ч в пути',
    transfers: '1 пересадка',
    routeCodes: ['MOW', 'YKS', 'OLZ'],
  };

  const displayRoute = route || defaultRoute;
  
  // Extract price number for calculations
  // Remove all spaces and currency symbol, then parse
  const priceString = displayRoute.price.replace(/\s/g, '').replace(/₽/g, '').trim();
  const priceNumber = parseInt(priceString) || 0;

  const handleSelectInsurance = () => {
    // Save selected route to context before navigating
    setSelectedRoute(displayRoute);
    router.push(routes.booking);
    onCloseAction();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-2 sm:p-4">
      <div className="relative flex h-[95vh] sm:h-[90vh] w-full max-w-6xl overflow-y-auto md:overflow-hidden rounded-lg bg-white shadow-xl flex-col md:flex-row">
        <button
          onClick={onCloseAction}
          className="absolute right-2 top-2 sm:right-4 sm:top-4 z-10 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white hover:bg-gray-100"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6 text-[#022444]" />
        </button>

        <div className="flex flex-col md:flex-row w-full md:overflow-y-auto">
          <div className="flex-1 p-4 sm:p-6 md:p-8 md:overflow-y-auto">
            <div className="mb-4 sm:mb-6">
              <h2 className="mb-2 text-xl sm:text-2xl font-bold text-[#022444]">
                Детали поездки
              </h2>
            </div>

            <TripDetailsSection route={displayRoute} />
            <ShareSection route={displayRoute} />
          </div>

          <div className="flex-1 bg-gradient-to-b from-[#7B91FF] to-[#7B91FF] p-4 sm:p-6 md:overflow-y-auto">
            <div className="mb-4 sm:mb-6 text-center sm:text-right sm:mr-10">
              <div className="text-sm text-white">
                Цены на билеты от {displayRoute.price}
              </div>
              <div className="text-xs text-white/80">
                Прокрутите, чтобы увидеть варианты ⬇
              </div>
            </div>

            <InsurancePlanCard
              plan="benefits"
              price={priceNumber}
              onSelect={handleSelectInsurance}
            />
            <InsurancePlanCard
              plan="basic"
              price={priceNumber}
              onSelect={handleSelectInsurance}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
