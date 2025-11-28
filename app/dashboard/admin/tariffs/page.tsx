'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { DollarSign } from 'lucide-react';

export default function AdminTariffsPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#022444] mb-2 flex items-center gap-2">
          <DollarSign className="h-6 w-6 sm:h-8 sm:w-8" />
          Тарифы и комиссии
        </h1>
        <p className="text-muted-foreground">Управление тарифами и комиссиями платформы</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Настройки тарифов</CardTitle>
          <CardDescription>Конфигурация тарифов и комиссий</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Tariff settings will be here */}
        </CardContent>
      </Card>
    </div>
  );
}

