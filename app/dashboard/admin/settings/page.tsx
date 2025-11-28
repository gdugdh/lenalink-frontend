'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Settings } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#022444] mb-2 flex items-center gap-2">
          <Settings className="h-6 w-6 sm:h-8 sm:w-8" />
          Настройки платформы
        </h1>
        <p className="text-muted-foreground">Общие настройки системы</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Настройки платформы</CardTitle>
          <CardDescription>Конфигурация системы</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Platform settings will be here */}
        </CardContent>
      </Card>
    </div>
  );
}

