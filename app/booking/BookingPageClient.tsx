'use client';

import { ArrowLeft } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { PageLoader } from '@/app/components/shared/page-loader';
import { UnifiedHeader } from '@/app/components/shared/unified-header';
import { RouteOverview } from '@/app/components/features/booking/RouteOverview';
import { BookingForm } from '@/app/components/features/booking/BookingForm';
import { MapView } from '@/app/components/features/booking/MapView';
import { PriceSummary } from '@/app/components/features/booking/PriceSummary';
import { useRouter } from 'next/navigation';

export function BookingPageClient() {
  const router = useRouter();

  return (
    <>
      <PageLoader />
      <div className="min-h-screen bg-[#FFFFFF]">
        <UnifiedHeader />

        <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 md:py-8">
          <div className="mb-4 sm:mb-6">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="mb-3 sm:mb-4 text-[#022444] hover:text-[#7B91FF] text-sm sm:text-base h-8 sm:h-9 px-2 sm:px-4"
            >
              <ArrowLeft className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
              Назад
            </Button>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#022444]">
              Москва → Олекминск
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

