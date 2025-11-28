'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Briefcase, Calendar, MapPin, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BusinessTripCard } from '@/app/components/features/employee/BusinessTripCard';

export default function ActiveBusinessTripsPage() {
  const router = useRouter();

  // Mock data - активные командировки
  const activeTrips = [
    {
      id: '1',
      destination: 'Москва',
      purpose: 'Встреча с клиентами',
      startDate: '2024-12-15',
      endDate: '2024-12-18',
      status: 'active' as const,
    },
    {
      id: '2',
      destination: 'Санкт-Петербург',
      purpose: 'Участие в конференции',
      startDate: '2024-12-20',
      endDate: '2024-12-22',
      status: 'active' as const,
    },
    {
      id: '3',
      destination: 'Казань',
      purpose: 'Обучение сотрудников',
      startDate: '2024-12-25',
      endDate: '2024-12-27',
      status: 'active' as const,
    },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#022444] mb-2 flex items-center gap-2">
            <Briefcase className="h-6 w-6 sm:h-8 sm:w-8" />
            Поездки в работе
          </h1>
          <p className="text-muted-foreground">Активные командировки</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {activeTrips.map((trip) => (
          <BusinessTripCard key={trip.id} trip={trip} />
        ))}
      </div>

      {activeTrips.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Нет активных командировок</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

