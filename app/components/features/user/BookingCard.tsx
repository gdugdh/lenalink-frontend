'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Ticket, QrCode, Download, Calendar, MapPin, Clock } from 'lucide-react';

interface BookingCardProps {
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
  };
  onViewDetails?: () => void;
}

export function BookingCard({ booking, onViewDetails }: BookingCardProps) {
  const getStatusVariant = () => {
    switch (booking.status) {
      case 'active':
        return 'default';
      case 'completed':
        return 'secondary';
      case 'cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getStatusLabel = () => {
    switch (booking.status) {
      case 'active':
        return 'Активен';
      case 'completed':
        return 'Завершен';
      case 'cancelled':
        return 'Отменен';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Ticket className="h-5 w-5" />
            {booking.route}
          </CardTitle>
          <Badge variant={getStatusVariant()}>{getStatusLabel()}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground flex items-center gap-1 mb-1">
              <Calendar className="h-4 w-4" />
              Дата
            </p>
            <p className="font-medium">{booking.date}</p>
          </div>
          <div>
            <p className="text-muted-foreground flex items-center gap-1 mb-1">
              <MapPin className="h-4 w-4" />
              Маршрут
            </p>
            <p className="font-medium">{booking.departureCity} → {booking.arrivalCity}</p>
          </div>
          <div>
            <p className="text-muted-foreground flex items-center gap-1 mb-1">
              <Clock className="h-4 w-4" />
              Отправление
            </p>
            <p className="font-medium">{booking.departureTime}</p>
          </div>
          <div>
            <p className="text-muted-foreground flex items-center gap-1 mb-1">
              <Clock className="h-4 w-4" />
              Прибытие
            </p>
            <p className="font-medium">{booking.arrivalTime}</p>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <p className="text-sm text-muted-foreground">Стоимость</p>
            <p className="text-lg font-bold">{booking.price}</p>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <QrCode className="mr-2 h-4 w-4" />
              QR-код
            </Button>
            <Button size="sm" variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Скачать
            </Button>
            {onViewDetails && (
              <Button size="sm" onClick={onViewDetails}>
                Детали
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

