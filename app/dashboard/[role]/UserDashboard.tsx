'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Skeleton } from '@/app/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';
import { Badge } from '@/app/components/ui/badge';
import { Separator } from '@/app/components/ui/separator';
import { LogOut, Wallet, Ticket, Settings, CreditCard, History, Home } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/app/hooks/use-toast';

export function UserDashboard() {
  const { session, logout, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: 'Выход выполнен',
        description: 'Вы успешно вышли из системы',
      });
      router.push('/');
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось выйти из системы',
        variant: 'destructive',
      });
    }
  };

  const handleTopUp = () => {
    toast({
      title: 'Пополнение баланса',
      description: 'Функция пополнения в разработке',
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const balance = session.user.balance ?? 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 sm:h-16 sm:w-16">
              <AvatarFallback className="text-lg sm:text-xl bg-primary text-primary-foreground">
                {session.user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#022444]">
                {session.user.name}
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">{session.user.email}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                На главную
              </Link>
            </Button>
            <Button onClick={handleLogout} variant="outline" className="w-full sm:w-auto">
              <LogOut className="mr-2 h-4 w-4" />
              Выйти
            </Button>
          </div>
        </div>

        <Separator />

        {/* Balance Card */}
        <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              Баланс
            </CardTitle>
            <CardDescription className="text-white/80">
              Текущий баланс вашего аккаунта
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl sm:text-5xl font-bold">{balance.toLocaleString('ru-RU')}</span>
              <span className="text-xl sm:text-2xl">₽</span>
            </div>
            <Button onClick={handleTopUp} className="bg-white text-blue-600 hover:bg-white/90">
              <CreditCard className="mr-2 h-4 w-4" />
              Пополнить
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Ticket className="h-5 w-5 text-primary" />
                Мои билеты
              </CardTitle>
              <CardDescription>Просмотр и управление бронированиями</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">0 активных</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <History className="h-5 w-5 text-primary" />
                История
              </CardTitle>
              <CardDescription>История ваших поездок</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary">Пусто</Badge>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="h-5 w-5 text-primary" />
                Настройки
              </CardTitle>
              <CardDescription>Управление профилем</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" className="w-full">
                Открыть
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
