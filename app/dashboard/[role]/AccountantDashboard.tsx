'use client';

import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Skeleton } from '@/app/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/app/components/ui/avatar';
import { Badge } from '@/app/components/ui/badge';
import { Separator } from '@/app/components/ui/separator';
import { LogOut, Calculator, TrendingUp, Users, FileText, Settings, Home } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/app/hooks/use-toast';

export function AccountantDashboard() {
  const { session, logout, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось выйти из системы',
        variant: 'destructive',
      });
    }
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

  // Mock data
  const companyBalance = session.user.companyBalance || 500000;
  const totalEmployees = 15;
  const monthlySpending = 125000;
  const pendingReports = 3;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
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
              <h1 className="text-2xl sm:text-3xl font-bold text-[#022444] flex items-center gap-2">
                {session.user.name}
                <Badge variant="secondary" className="ml-2">
                  <Calculator className="h-3 w-3 mr-1" />
                  Бухгалтер
                </Badge>
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground">{session.user.email}</p>
              {session.user.companyName && (
                <p className="text-xs sm:text-sm text-muted-foreground">{session.user.companyName}</p>
              )}
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

        {/* Company Balance Card */}
        <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              Баланс компании
            </CardTitle>
            <CardDescription className="text-white/80">
              Текущий остаток корпоративного депозита
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl sm:text-5xl font-bold">{companyBalance.toLocaleString('ru-RU')}</span>
              <span className="text-xl sm:text-2xl">₽</span>
            </div>
            <Button className="bg-white text-purple-600 hover:bg-white/90">
              Пополнить баланс
            </Button>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Сотрудников</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalEmployees}</div>
              <p className="text-xs text-muted-foreground">Активных сотрудников</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Расходы за месяц</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{monthlySpending.toLocaleString('ru-RU')} ₽</div>
              <p className="text-xs text-muted-foreground">Текущий месяц</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Отчеты</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingReports}</div>
              <p className="text-xs text-muted-foreground">Ожидают обработки</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Прогноз трат</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">150K ₽</div>
              <p className="text-xs text-muted-foreground">На следующий месяц</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="h-5 w-5 text-primary" />
                Баланс
              </CardTitle>
              <CardDescription>Управление балансом компании</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" className="w-full">
                Открыть
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-primary" />
                Транзакции
              </CardTitle>
              <CardDescription>Просмотр всех операций</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" className="w-full">
                Открыть
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-primary" />
                Сотрудники
              </CardTitle>
              <CardDescription>Управление сотрудниками</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" className="w-full">
                Открыть
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-primary" />
                Отчеты
              </CardTitle>
              <CardDescription>Генерация и экспорт отчетов</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" className="w-full">
                Открыть
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="h-5 w-5 text-primary" />
                Настройки компании
              </CardTitle>
              <CardDescription>Конфигурация компании</CardDescription>
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

