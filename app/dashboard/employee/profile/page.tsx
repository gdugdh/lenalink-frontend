'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { ProfileForm } from '@/app/components/features/user/ProfileForm';
import { User } from 'lucide-react';

export default function EmployeeProfilePage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#022444] mb-2 flex items-center gap-2">
          <User className="h-6 w-6 sm:h-8 sm:w-8" />
          Профиль
        </h1>
        <p className="text-muted-foreground">Управление личными данными</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Личные данные</CardTitle>
          <CardDescription>Обновите вашу личную информацию</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm />
        </CardContent>
      </Card>
    </div>
  );
}

