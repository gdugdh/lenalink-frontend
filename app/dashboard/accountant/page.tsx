'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Calculator, Users, TrendingUp, FileText } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';

export default function AccountantDashboardPage() {
  const { session } = useAuth();

  // Mock data
  const companyBalance = session?.user.companyBalance || 500000;
  const totalEmployees = 15;
  const monthlySpending = 125000;
  const pendingReports = 3;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#022444] mb-2">Добро пожаловать!</h1>
        <p className="text-muted-foreground">Управление корпоративными финансами и сотрудниками</p>
      </div>

      {/* Company Balance Card */}
      <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Выделенный бюджет на командировку
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
    </div>
  );
}

