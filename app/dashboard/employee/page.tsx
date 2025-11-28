'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Briefcase, Calendar, Ticket, Plus, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { EmptyState } from '@/app/components/shared/EmptyState';

export default function EmployeeDashboardPage() {
  const { session } = useAuth();

  // Mock data
  const pendingApprovals = 2;
  const activeTrips = 3;
  const companyBalance = session?.user.companyBalance || 500000;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#022444] mb-2">Добро пожаловать!</h1>
        <p className="text-muted-foreground">Управляйте командировками и билетами</p>
      </div>

      {/* Company Balance Card */}
      <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            Баланс компании
          </CardTitle>
          <CardDescription className="text-white/80">
            Доступный баланс для покупки билетов
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl sm:text-5xl font-bold">{companyBalance.toLocaleString('ru-RU')}</span>
            <span className="text-xl sm:text-2xl">₽</span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-primary" />
              Ожидающие согласования
            </CardTitle>
            <CardDescription>Командировки на согласовании</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary mb-2">{pendingApprovals}</div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/employee/business-trips/pending">
                Просмотр
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Ticket className="h-5 w-5 text-primary" />
              Поездки в работе
            </CardTitle>
            <CardDescription>Активные командировки</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary mb-2">{activeTrips}</div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/employee/business-trips/active">
                Просмотр
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Briefcase className="h-5 w-5 text-primary" />
              Командировки
            </CardTitle>
            <CardDescription>Создание и управление командировками</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <Link href="/dashboard/employee/business-trips/new">
                <Plus className="mr-2 h-4 w-4" />
                Создать командировку
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Ticket className="h-5 w-5 text-primary" />
              Билеты
            </CardTitle>
            <CardDescription>Поиск и покупка билетов</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/search">Найти билеты</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

