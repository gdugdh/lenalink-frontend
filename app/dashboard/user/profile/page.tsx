'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { ProfileForm } from '@/app/components/features/user/ProfileForm';
import { DocumentsSection } from '@/app/components/features/user/DocumentsSection';
import { PaymentMethodsSection } from '@/app/components/features/user/PaymentMethodsSection';
import { NotificationSettings } from '@/app/components/features/user/NotificationSettings';

export default function UserProfilePage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#022444] mb-2">Профиль</h1>
        <p className="text-muted-foreground">Управление личными данными и настройками</p>
      </div>

      <div className="space-y-6">
        {/* Personal Info Section */}
        <Card>
          <CardHeader>
            <CardTitle>Личные данные</CardTitle>
            <CardDescription>Обновите вашу личную информацию</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm />
          </CardContent>
        </Card>

        {/* Documents Section */}
        <Card>
          <CardHeader>
            <CardTitle>Документы</CardTitle>
            <CardDescription>Управление вашими документами</CardDescription>
          </CardHeader>
          <CardContent>
            <DocumentsSection />
          </CardContent>
        </Card>

        {/* Payment Methods Section */}
        <Card>
          <CardHeader>
            <CardTitle>Платежные методы</CardTitle>
            <CardDescription>Управление способами оплаты</CardDescription>
          </CardHeader>
          <CardContent>
            <PaymentMethodsSection />
          </CardContent>
        </Card>

        {/* Notifications Section */}
        <Card>
          <CardHeader>
            <CardTitle>Настройки уведомлений</CardTitle>
            <CardDescription>Выберите, какие уведомления вы хотите получать</CardDescription>
          </CardHeader>
          <CardContent>
            <NotificationSettings />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

