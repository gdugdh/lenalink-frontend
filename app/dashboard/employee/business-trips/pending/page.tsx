'use client';

import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Briefcase, Calendar, MapPin, ArrowLeft, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BusinessTripCard } from '@/app/components/features/employee/BusinessTripCard';

export default function PendingBusinessTripsPage() {
  const router = useRouter();

  // Mock data - командировки на согласовании
  const pendingTrips = [
    {
      id: '1',
      destination: 'Новосибирск',
      purpose: 'Проведение переговоров',
      startDate: '2025-01-10',
      endDate: '2025-01-12',
      status: 'pending' as const,
    },
    {
      id: '2',
      destination: 'Екатеринбург',
      purpose: 'Работа с партнерами',
      startDate: '2025-01-15',
      endDate: '2025-01-17',
      status: 'pending' as const,
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
            <Clock className="h-6 w-6 sm:h-8 sm:w-8" />
            Ожидающие согласования
          </h1>
          <p className="text-muted-foreground">Командировки на согласовании</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {pendingTrips.map((trip) => (
          <BusinessTripCard key={trip.id} trip={trip} />
        ))}
      </div>

      {pendingTrips.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Нет командировок на согласовании</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

