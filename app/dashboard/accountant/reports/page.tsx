'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { FileText, Download } from 'lucide-react';
import { EmptyState } from '@/app/components/shared/EmptyState';

export default function AccountantReportsPage() {
  // Mock data
  const reports: any[] = [];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#022444] mb-2 flex items-center gap-2">
          <FileText className="h-6 w-6 sm:h-8 sm:w-8" />
          Отчеты
        </h1>
        <p className="text-muted-foreground">Генерация и экспорт отчетов</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Создать отчет</CardTitle>
          <CardDescription>Выберите период и тип отчета</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Report generator will be here */}
          <Button className="bg-[#7B91FF] hover:bg-[#E16D32]">
            Сгенерировать отчет
          </Button>
        </CardContent>
      </Card>

      {reports.length > 0 ? (
        <div className="space-y-4">
          {reports.map((report) => (
            <Card key={report.id}>
              <CardHeader>
                <CardTitle>{report.name}</CardTitle>
                <CardDescription>{report.period}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Скачать
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Нет отчетов"
          description="Создайте отчет для анализа расходов компании"
        />
      )}
    </div>
  );
}

