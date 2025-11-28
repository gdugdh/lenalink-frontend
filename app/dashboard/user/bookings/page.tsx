'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Ticket, Search, QrCode, Download } from 'lucide-react';
import { EmptyState } from '@/app/components/shared/EmptyState';
import { useState } from 'react';

export default function UserBookingsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Mock data - will be replaced with real data
  const bookings = [
    {
      id: '1',
      route: 'Москва → Санкт-Петербург',
      date: '15 января 2025',
      departureTime: '08:30',
      arrivalTime: '12:45',
      departureCity: 'Москва',
      arrivalCity: 'Санкт-Петербург',
      status: 'active' as const,
      price: '12 500 ₽',
    },
    {
      id: '2',
      route: 'Москва → Казань',
      date: '20 января 2025',
      departureTime: '14:15',
      arrivalTime: '20:30',
      departureCity: 'Москва',
      arrivalCity: 'Казань',
      status: 'active' as const,
      price: '4 800 ₽',
    },
    {
      id: '3',
      route: 'Санкт-Петербург → Москва',
      date: '25 января 2025',
      departureTime: '18:00',
      arrivalTime: '22:15',
      departureCity: 'Санкт-Петербург',
      arrivalCity: 'Москва',
      status: 'active' as const,
      price: '11 900 ₽',
    },
    {
      id: '4',
      route: 'Москва → Новосибирск',
      date: '5 января 2025',
      departureTime: '10:45',
      arrivalTime: '16:20',
      departureCity: 'Москва',
      arrivalCity: 'Новосибирск',
      status: 'completed' as const,
      price: '18 700 ₽',
    },
    {
      id: '5',
      route: 'Москва → Екатеринбург',
      date: '12 февраля 2025',
      departureTime: '06:30',
      arrivalTime: '09:45',
      departureCity: 'Москва',
      arrivalCity: 'Екатеринбург',
      status: 'active' as const,
      price: '2 300 ₽',
    },
    {
      id: '6',
      route: 'Казань → Москва',
      date: '28 декабря 2024',
      departureTime: '16:00',
      arrivalTime: '22:30',
      departureCity: 'Казань',
      arrivalCity: 'Москва',
      status: 'completed' as const,
      price: '4 500 ₽',
    },
    {
      id: '7',
      route: 'Москва → Сочи',
      date: '10 февраля 2025',
      departureTime: '07:20',
      arrivalTime: '09:45',
      departureCity: 'Москва',
      arrivalCity: 'Сочи',
      status: 'active' as const,
      price: '9 800 ₽',
    },
  ];

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = booking.route?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#022444] mb-2">Мои бронирования</h1>
        <p className="text-muted-foreground">Управляйте своими билетами и поездками</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск по маршруту..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все</SelectItem>
            <SelectItem value="active">Активные</SelectItem>
            <SelectItem value="completed">Завершенные</SelectItem>
            <SelectItem value="cancelled">Отмененные</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bookings List */}
      {filteredBookings.length > 0 ? (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Ticket className="h-5 w-5" />
                      {booking.route}
                    </CardTitle>
                    <CardDescription>{booking.date}</CardDescription>
                  </div>
                  <Badge variant={
                    booking.status === 'active' ? 'default' : 
                    booking.status === 'completed' ? 'secondary' : 
                    'destructive'
                  }>
                    {booking.status === 'active' ? 'Активен' : booking.status === 'completed' ? 'Завершен' : 'Отменен'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Отправление</p>
                      <p className="font-medium">{booking.departureTime}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Прибытие</p>
                      <p className="font-medium">{booking.arrivalTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground">Стоимость</p>
                      <p className="text-lg font-bold">{booking.price || '—'}</p>
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Нет бронирований"
          description={bookings.length === 0 
            ? "У вас пока нет бронирований. Найдите и забронируйте билеты для вашей поездки"
            : "Не найдено бронирований по заданным критериям"}
          actionLabel="Найти билеты"
          onAction={() => window.location.href = '/search'}
        />
      )}
    </div>
  );
}

