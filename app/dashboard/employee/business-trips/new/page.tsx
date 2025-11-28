'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Briefcase, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BusinessTripForm } from '@/app/components/features/employee/BusinessTripForm';

export default function NewBusinessTripPage() {
  const router = useRouter();

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#022444] mb-2 flex items-center gap-2">
            <Briefcase className="h-6 w-6 sm:h-8 sm:w-8" />
            Создать командировку
          </h1>
          <p className="text-muted-foreground">Заполните форму для создания новой командировки</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Новая командировка</CardTitle>
          <CardDescription>Укажите все необходимые данные о командировке</CardDescription>
        </CardHeader>
        <CardContent>
          <BusinessTripForm />
        </CardContent>
      </Card>
    </div>
  );
}

