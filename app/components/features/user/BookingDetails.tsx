'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { QrCode, Download, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BookingDetailsProps {
  booking: {
    id: string;
    route: string;
    date: string;
    departureTime: string;
    arrivalTime: string;
    departureCity: string;
    arrivalCity: string;
    status: 'active' | 'completed' | 'cancelled';
    price: string;
    tariff: string;
    passengerName: string;
    bookingNumber: string;
  };
}

export function BookingDetails({ booking }: BookingDetailsProps) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Назад
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{booking.route}</CardTitle>
              <CardDescription>Номер бронирования: {booking.bookingNumber}</CardDescription>
            </div>
            <Badge>{booking.status === 'active' ? 'Активен' : booking.status === 'completed' ? 'Завершен' : 'Отменен'}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Дата поездки</p>
              <p className="font-medium">{booking.date}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Пассажир</p>
              <p className="font-medium">{booking.passengerName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Отправление</p>
              <p className="font-medium">{booking.departureTime} • {booking.departureCity}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Прибытие</p>
              <p className="font-medium">{booking.arrivalTime} • {booking.arrivalCity}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Тариф</p>
              <p className="font-medium">{booking.tariff}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Стоимость</p>
              <p className="font-medium text-lg">{booking.price}</p>
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t">
            <Button>
              <QrCode className="mr-2 h-4 w-4" />
              Показать QR-код
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Скачать билет
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

