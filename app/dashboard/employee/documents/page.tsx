'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { FileText, Upload } from 'lucide-react';
import { EmptyState } from '@/app/components/shared/EmptyState';

export default function EmployeeDocumentsPage() {
  // Mock data
  const documents: any[] = [];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#022444] mb-2 flex items-center gap-2">
            <FileText className="h-6 w-6 sm:h-8 sm:w-8" />
            Документы
          </h1>
          <p className="text-muted-foreground">Чеки и отчеты по командировкам</p>
        </div>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Загрузить документ
        </Button>
      </div>

      {documents.length > 0 ? (
        <div className="space-y-4">
          {/* Documents list will be here */}
        </div>
      ) : (
        <EmptyState
          title="Нет документов"
          description="Загрузите чеки и документы по вашим командировкам"
          actionLabel="Загрузить документ"
          onAction={() => {}}
        />
      )}
    </div>
  );
}

