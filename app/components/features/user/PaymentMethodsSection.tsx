'use client';

import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { CreditCard, Plus } from 'lucide-react';
import { EmptyState } from '@/app/components/shared/EmptyState';

export function PaymentMethodsSection() {
  // Mock data
  const paymentMethods: any[] = [];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Платежные методы</h3>
        <Button size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Добавить карту
        </Button>
      </div>

      {paymentMethods.length > 0 ? (
        <div className="space-y-2">
          {paymentMethods.map((method) => (
            <Card key={method.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">**** {method.last4}</p>
                    <p className="text-sm text-muted-foreground">{method.brand} • {method.expiry}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">Удалить</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Нет платежных методов"
          description="Добавьте карту для быстрой оплаты билетов"
          actionLabel="Добавить карту"
          onAction={() => {}}
        />
      )}
    </div>
  );
}

