'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Ticket, QrCode, Download, Calendar, MapPin, Clock, Plane, Train, Bus, Car } from 'lucide-react';
import { EmptyState } from '@/app/components/shared/EmptyState';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';

interface TicketData {
  id: string;
  route: string;
  date: string;
  departureTime: string;
  arrivalTime: string;
  departureCity: string;
  arrivalCity: string;
  transportType: 'plane' | 'train' | 'bus' | 'car';
  status: 'active' | 'completed' | 'cancelled';
  price: string;
  ticketNumber: string;
  passenger: string;
  bookingId: string;
}

function TicketCard({ ticket }: { ticket: TicketData }) {
  const getStatusVariant = () => {
    switch (ticket.status) {
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
    switch (ticket.status) {
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

  const getTransportIcon = () => {
    switch (ticket.transportType) {
      case 'plane':
        return Plane;
      case 'train':
        return Train;
      case 'bus':
        return Bus;
      case 'car':
        return Car;
      default:
        return Ticket;
    }
  };

  const TransportIcon = getTransportIcon();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TransportIcon className="h-5 w-5" />
            {ticket.route}
          </CardTitle>
          <Badge variant={getStatusVariant()}>{getStatusLabel()}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground flex items-center gap-1 mb-1">
              <Calendar className="h-4 w-4" />
              Дата
            </p>
            <p className="font-medium">{ticket.date}</p>
          </div>
          <div>
            <p className="text-muted-foreground flex items-center gap-1 mb-1">
              <MapPin className="h-4 w-4" />
              Маршрут
            </p>
            <p className="font-medium">{ticket.departureCity} → {ticket.arrivalCity}</p>
          </div>
          <div>
            <p className="text-muted-foreground flex items-center gap-1 mb-1">
              <Clock className="h-4 w-4" />
              Отправление
            </p>
            <p className="font-medium">{ticket.departureTime}</p>
          </div>
          <div>
            <p className="text-muted-foreground flex items-center gap-1 mb-1">
              <Clock className="h-4 w-4" />
              Прибытие
            </p>
            <p className="font-medium">{ticket.arrivalTime}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Номер билета</p>
            <p className="font-medium text-xs">{ticket.ticketNumber}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Пассажир</p>
            <p className="font-medium">{ticket.passenger}</p>
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <p className="text-sm text-muted-foreground">Стоимость</p>
            <p className="text-lg font-bold">{ticket.price}</p>
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
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function EmployeeTicketsPage() {
  // Mock data
  const tickets: TicketData[] = [
    {
      id: '1',
      route: 'Москва → Санкт-Петербург',
      date: '15 января 2025',
      departureTime: '08:30',
      arrivalTime: '12:45',
      departureCity: 'Москва',
      arrivalCity: 'Санкт-Петербург',
      transportType: 'plane',
      status: 'active',
      price: '12 500 ₽',
      ticketNumber: 'SU-1234-567890',
      passenger: 'Иванов Иван Иванович',
      bookingId: 'BK-001',
    },
    {
      id: '2',
      route: 'Москва → Казань',
      date: '20 января 2025',
      departureTime: '14:15',
      arrivalTime: '20:30',
      departureCity: 'Москва',
      arrivalCity: 'Казань',
      transportType: 'train',
      status: 'active',
      price: '4 800 ₽',
      ticketNumber: 'TK-9876-543210',
      passenger: 'Иванов Иван Иванович',
      bookingId: 'BK-002',
    },
    {
      id: '3',
      route: 'Санкт-Петербург → Москва',
      date: '25 января 2025',
      departureTime: '18:00',
      arrivalTime: '22:15',
      departureCity: 'Санкт-Петербург',
      arrivalCity: 'Москва',
      transportType: 'plane',
      status: 'active',
      price: '11 900 ₽',
      ticketNumber: 'SU-5678-901234',
      passenger: 'Иванов Иван Иванович',
      bookingId: 'BK-003',
    },
    {
      id: '4',
      route: 'Москва → Новосибирск',
      date: '5 января 2025',
      departureTime: '10:45',
      arrivalTime: '16:20',
      departureCity: 'Москва',
      arrivalCity: 'Новосибирск',
      transportType: 'plane',
      status: 'completed',
      price: '18 700 ₽',
      ticketNumber: 'SU-3456-789012',
      passenger: 'Иванов Иван Иванович',
      bookingId: 'BK-004',
    },
    {
      id: '5',
      route: 'Москва → Екатеринбург',
      date: '12 февраля 2025',
      departureTime: '06:30',
      arrivalTime: '09:45',
      departureCity: 'Москва',
      arrivalCity: 'Екатеринбург',
      transportType: 'bus',
      status: 'active',
      price: '2 300 ₽',
      ticketNumber: 'BS-2468-135790',
      passenger: 'Иванов Иван Иванович',
      bookingId: 'BK-005',
    },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#022444] mb-2 flex items-center gap-2">
          <Ticket className="h-6 w-6 sm:h-8 sm:w-8" />
          Билеты
        </h1>
        <p className="text-muted-foreground">Ваши билеты, купленные за счет корпоративного депозита</p>
      </div>

      {tickets.length > 0 ? (
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Нет билетов"
          description="Найдите и купите билеты для ваших командировок"
          actionLabel="Найти билеты"
          onAction={() => window.location.href = '/search'}
        />
      )}
    </div>
  );
}

