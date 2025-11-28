'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Briefcase, Plus, Search } from 'lucide-react';
import { BusinessTripList } from '@/app/components/features/employee/BusinessTripList';
import { EmptyState } from '@/app/components/shared/EmptyState';
import { useState, useMemo } from 'react';
import Link from 'next/link';

interface BusinessTrip {
  id: string;
  destination: string;
  purpose: string;
  startDate: string;
  endDate: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'active' | 'completed';
}

export default function EmployeeBusinessTripsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Mock data
  const trips: BusinessTrip[] = [
    {
      id: '1',
      destination: 'Москва',
      purpose: 'Встреча с клиентами',
      startDate: '2024-12-15',
      endDate: '2024-12-18',
      status: 'active',
    },
    {
      id: '2',
      destination: 'Санкт-Петербург',
      purpose: 'Участие в конференции',
      startDate: '2024-12-20',
      endDate: '2024-12-22',
      status: 'active',
    },
    {
      id: '3',
      destination: 'Казань',
      purpose: 'Обучение сотрудников',
      startDate: '2024-12-25',
      endDate: '2024-12-27',
      status: 'active',
    },
    {
      id: '4',
      destination: 'Новосибирск',
      purpose: 'Проведение переговоров',
      startDate: '2025-01-10',
      endDate: '2025-01-12',
      status: 'pending',
    },
    {
      id: '5',
      destination: 'Екатеринбург',
      purpose: 'Работа с партнерами',
      startDate: '2025-01-15',
      endDate: '2025-01-17',
      status: 'pending',
    },
    {
      id: '6',
      destination: 'Сочи',
      purpose: 'Корпоративное мероприятие',
      startDate: '2025-02-01',
      endDate: '2025-02-03',
      status: 'approved',
    },
    {
      id: '7',
      destination: 'Владивосток',
      purpose: 'Работа с региональным офисом',
      startDate: '2024-11-10',
      endDate: '2024-11-15',
      status: 'completed',
    },
    {
      id: '8',
      destination: 'Краснодар',
      purpose: 'Презентация проекта',
      startDate: '2025-01-20',
      endDate: '2025-01-22',
      status: 'draft',
    },
    {
      id: '9',
      destination: 'Нижний Новгород',
      purpose: 'Встреча с поставщиками',
      startDate: '2024-12-05',
      endDate: '2024-12-07',
      status: 'rejected',
    },
  ];

  const filteredTrips = useMemo(() => {
    return trips.filter((trip) => {
      const matchesSearch =
        trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.purpose.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || trip.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter, trips]);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#022444] mb-2 flex items-center gap-2">
            <Briefcase className="h-6 w-6 sm:h-8 sm:w-8" />
            Командировки
          </h1>
          <p className="text-muted-foreground">Создание и управление командировками</p>
        </div>
        <Button asChild className="bg-[#7B91FF] hover:bg-[#E16D32]">
          <Link href="/dashboard/employee/business-trips/new">
            <Plus className="mr-2 h-4 w-4" />
            Создать командировку
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск по командировкам..."
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
            <SelectItem value="draft">Черновики</SelectItem>
            <SelectItem value="pending">На согласовании</SelectItem>
            <SelectItem value="approved">Одобрено</SelectItem>
            <SelectItem value="rejected">Отклонено</SelectItem>
            <SelectItem value="active">В работе</SelectItem>
            <SelectItem value="completed">Завершено</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Trips List */}
      {filteredTrips.length > 0 ? (
        <BusinessTripList trips={filteredTrips} />
      ) : (
        <EmptyState
          title="Нет командировок"
          description={
            trips.length === 0
              ? 'Создайте новую командировку для начала работы'
              : 'Не найдено командировок по заданным критериям'
          }
          actionLabel={trips.length === 0 ? 'Создать командировку' : undefined}
          onAction={trips.length === 0 ? () => window.location.href = '/dashboard/employee/business-trips/new' : undefined}
        />
      )}
    </div>
  );
}

