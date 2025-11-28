'use client';

import { NotificationItem } from './NotificationItem';
import { EmptyState } from '@/app/components/shared/EmptyState';
import { Bell } from 'lucide-react';

interface NotificationCenterProps {
  filter: 'all' | 'tickets' | 'delays' | 'promotions';
}

export function NotificationCenter({ filter }: NotificationCenterProps) {
  // Mock data - will be replaced with real data
  const notifications = [
    {
      id: '1',
      type: 'tickets' as const,
      title: 'Билет подтвержден',
      message: 'Ваш билет на рейс Москва - Санкт-Петербург успешно подтвержден. Номер бронирования: ABC123',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 часа назад
      read: false,
    },
    {
      id: '2',
      type: 'delays' as const,
      title: 'Задержка рейса',
      message: 'Рейс №1234 задерживается на 30 минут. Новое время отправления: 15:30',
      date: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 часов назад
      read: false,
    },
    {
      id: '3',
      type: 'promotions' as const,
      title: 'Специальное предложение',
      message: 'Скидка 20% на все билеты до конца месяца! Используйте промокод SAVE20',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 день назад
      read: true,
    },
    {
      id: '4',
      type: 'tickets' as const,
      title: 'Напоминание о поездке',
      message: 'Ваша поездка в Санкт-Петербург запланирована на завтра. Не забудьте взять документы!',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 дня назад
      read: false,
    },
    {
      id: '5',
      type: 'delays' as const,
      title: 'Изменение расписания',
      message: 'Рейс №5678 отменен. Вы можете выбрать альтернативный рейс или получить полный возврат средств.',
      date: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 часов назад
      read: false,
    },
    {
      id: '6',
      type: 'promotions' as const,
      title: 'Новая акция',
      message: 'Купите билет туда-обратно и получите скидку 15% на обратный путь!',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 дня назад
      read: true,
    },
    {
      id: '7',
      type: 'tickets' as const,
      title: 'Электронный билет готов',
      message: 'Ваш электронный билет доступен для скачивания в личном кабинете.',
      date: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 час назад
      read: false,
    },
    {
      id: '8',
      type: 'promotions' as const,
      title: 'Бонусные мили',
      message: 'Вы получили 500 бонусных миль за вашу последнюю поездку!',
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 дня назад
      read: true,
    },
  ];

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filter);

  return (
    <div className="space-y-4">
      {filteredNotifications.length > 0 ? (
        <div className="space-y-2">
          {filteredNotifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Bell}
          title="Нет уведомлений"
          description="У вас пока нет уведомлений этого типа"
        />
      )}
    </div>
  );
}

