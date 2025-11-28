'use client';

import { Button } from '@/app/components/ui/button';
import { PageLoader } from '@/app/components/shared/page-loader';
import { UnifiedHeader } from '@/app/components/shared/unified-header';
import { RouteOverview } from '@/app/components/features/booking/RouteOverview';
import { BookingForm } from '@/app/components/features/booking/BookingForm';
import { MapView } from '@/app/components/features/booking/MapView';
import { PriceSummary } from '@/app/components/features/booking/PriceSummary';
import { useRouter } from 'next/navigation';
import { useBooking } from '@/app/lib/booking-context';

export function BookingPageClient() {
  const router = useRouter();
  const { bookingState } = useBooking();
  const route = bookingState.selectedRoute;

  // Default route if none selected - matches RouteOverview default
  const displayRoute = route || {
    departureTime: '09:00',
    departureCity: 'Москва',
    departureDate: '2 дек, вт',
    arrivalTime: '19:30',
    arrivalCity: 'Олекминск',
    arrivalDate: '2 дек, вт',
    duration: '10 ч 30 мин',
    carrier: 'S7 Airlines',
    carrierCode: 'S7',
    routeCodes: ['MOW', 'YKS'],
  };

  return (
    <>
      <PageLoader />
      <div className="min-h-screen bg-[#FFFFFF]">
        <UnifiedHeader />

        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 md:py-8">
          <div className="mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#022444]">
              {displayRoute.departureCity} → {displayRoute.arrivalCity}
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-5">
            {/* Left Side - Form */}
            <div className="lg:col-span-3 space-y-4 sm:space-y-6">
              <RouteOverview />
              <BookingForm />
            </div>

            {/* Right Side - Map and Price Summary */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              <MapView />
              <PriceSummary />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

