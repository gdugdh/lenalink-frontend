'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Calculator, TrendingUp } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';
import { BalanceTopUp } from '@/app/components/features/accountant/BalanceTopUp';
import { SpendingForecast } from '@/app/components/features/accountant/SpendingForecast';

export default function AccountantBalancePage() {
  const { session } = useAuth();
  const companyBalance = session?.user.companyBalance || 500000;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#022444] mb-2">Баланс компании</h1>
        <p className="text-muted-foreground">Управление корпоративным депозитом</p>
      </div>

      <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Текущий баланс
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-4xl sm:text-5xl font-bold">{companyBalance.toLocaleString('ru-RU')}</span>
            <span className="text-xl sm:text-2xl">₽</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BalanceTopUp />
        <SpendingForecast />
      </div>
    </div>
  );
}

