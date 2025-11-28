'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Wallet, Ticket, Calendar, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { EmptyState } from '@/app/components/shared/EmptyState';

export default function UserDashboardPage() {
  const { session } = useAuth();

  // Mock data
  const upcomingTrip = null; // Will be replaced with real data
  const recentBooking = null;
  const recommendations = [
    { from: 'Москва', to: 'Санкт-Петербург', price: '3500₽', date: '15 дек' },
    { from: 'Москва', to: 'Казань', price: '2800₽', date: '20 дек' },
  ];
  const balance = session?.user.balance || 0;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#022444] mb-2">Добро пожаловать!</h1>
        <p className="text-muted-foreground">Управляйте своими поездками и бронированиями</p>
      </div>

      {/* Balance Card */}
      {balance > 0 && (
        <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Баланс
            </CardTitle>
            <CardDescription className="text-white/80">Текущий баланс вашего аккаунта</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl sm:text-5xl font-bold">{balance.toLocaleString('ru-RU')}</span>
              <span className="text-xl sm:text-2xl">₽</span>
            </div>
            <Button className="bg-white text-blue-600 hover:bg-white/90">
              Пополнить
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Upcoming Trip */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Ближайшая поездка
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingTrip ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{upcomingTrip.from} → {upcomingTrip.to}</p>
                  <p className="text-sm text-muted-foreground">{upcomingTrip.date}</p>
                </div>
                <Badge>{upcomingTrip.status}</Badge>
              </div>
            </div>
          ) : (
            <EmptyState
              title="Нет предстоящих поездок"
              description="Найдите и забронируйте билеты для вашей следующей поездки"
              actionLabel="Найти билеты"
              onAction={() => window.location.href = '/search'}
            />
          )}
        </CardContent>
      </Card>

      {/* Recent Booking */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ticket className="h-5 w-5" />
            Новая бронь
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentBooking ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{recentBooking.from} → {recentBooking.to}</p>
                  <p className="text-sm text-muted-foreground">{recentBooking.date}</p>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/dashboard/user/bookings">Просмотр</Link>
                </Button>
              </div>
            </div>
          ) : (
            <EmptyState
              title="Нет новых бронирований"
              description="Ваши недавние бронирования появятся здесь"
              actionLabel="Посмотреть все"
              onAction={() => window.location.href = '/dashboard/user/bookings'}
            />
          )}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Рекомендации
          </CardTitle>
          <CardDescription>Популярные маршруты для вас</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors">
                <div>
                  <p className="font-semibold">{rec.from} → {rec.to}</p>
                  <p className="text-sm text-muted-foreground">от {rec.price} • {rec.date}</p>
                </div>
                <Button size="sm" variant="ghost" asChild>
                  <Link href={`/search?from=${rec.from}&to=${rec.to}`}>
                    Выбрать
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Поиск билетов</CardTitle>
            <CardDescription>Найдите лучшие маршруты</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <Link href="/search">Найти билеты</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Мои бронирования</CardTitle>
            <CardDescription>Просмотр всех бронирований</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/dashboard/user/bookings">Просмотр</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

