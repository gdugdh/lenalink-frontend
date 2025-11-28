'use client';

import { Button } from '@/app/components/ui/button';
import { Upload, FileText } from 'lucide-react';
import { EmptyState } from '@/app/components/shared/EmptyState';

export function DocumentsSection() {
  // Mock data
  const documents: any[] = [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Документы</h3>
        <Button size="sm">
          <Upload className="mr-2 h-4 w-4" />
          Загрузить
        </Button>
      </div>

      {documents.length > 0 ? (
        <div className="space-y-2">
          {documents.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">{doc.name}</p>
                  <p className="text-sm text-muted-foreground">{doc.type} • {doc.date}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">Скачать</Button>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Нет документов"
          description="Загрузите ваши документы для быстрого оформления билетов"
          actionLabel="Загрузить документ"
          onAction={() => {}}
        />
      )}
    </div>
  );
}

