'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { TrendingUp } from 'lucide-react';

export function SpendingForecast() {
  // Mock data
  const forecast = {
    currentMonth: 125000,
    nextMonth: 150000,
    trend: '+20%',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Прогноз трат
        </CardTitle>
        <CardDescription>Прогнозируемые расходы на следующий месяц</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-1">Текущий месяц</p>
          <p className="text-2xl font-bold">{forecast.currentMonth.toLocaleString('ru-RU')} ₽</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-1">Следующий месяц (прогноз)</p>
          <p className="text-2xl font-bold">{forecast.nextMonth.toLocaleString('ru-RU')} ₽</p>
          <p className="text-sm text-green-600 mt-1">{forecast.trend} к текущему месяцу</p>
        </div>
      </CardContent>
    </Card>
  );
}

