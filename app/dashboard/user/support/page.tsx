'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { SupportChat } from '@/app/components/features/user/SupportChat';
import { FAQSection } from '@/app/components/features/user/FAQSection';
import { SupportTicket } from '@/app/components/features/user/SupportTicket';

export default function UserSupportPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#022444] mb-2">Поддержка</h1>
        <p className="text-muted-foreground">Получите помощь и ответы на ваши вопросы</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Чат поддержки</CardTitle>
            <CardDescription>Свяжитесь с нашей службой поддержки</CardDescription>
          </CardHeader>
          <CardContent>
            <SupportChat />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Создать тикет</CardTitle>
            <CardDescription>Отправьте запрос в службу поддержки</CardDescription>
          </CardHeader>
          <CardContent>
            <SupportTicket />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Часто задаваемые вопросы</CardTitle>
            <CardDescription>Найдите ответы на популярные вопросы</CardDescription>
          </CardHeader>
          <CardContent>
            <FAQSection />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

