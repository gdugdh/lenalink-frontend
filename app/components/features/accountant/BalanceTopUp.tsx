'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { CreditCard } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/app/hooks/use-toast';

export function BalanceTopUp() {
  const { toast } = useToast();
  const [amount, setAmount] = useState('');

  const handleTopUp = () => {
    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      return;
    }
    toast({
      title: 'Пополнение баланса',
      description: `Запрос на пополнение на сумму ${numAmount.toLocaleString('ru-RU')}₽ отправлен`,
    });
    setAmount('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Пополнение баланса
        </CardTitle>
        <CardDescription>Пополните корпоративный депозит</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Сумма пополнения</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="10000"
            min="1"
          />
        </div>
        <Button onClick={handleTopUp} className="w-full bg-[#7B91FF] hover:bg-[#E16D32]">
          Пополнить баланс
        </Button>
      </CardContent>
    </Card>
  );
}

