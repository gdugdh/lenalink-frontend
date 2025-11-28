'use client';

import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Ticket, AlertCircle, Tag } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale/ru';

interface NotificationItemProps {
  notification: {
    id: string;
    type: 'tickets' | 'delays' | 'promotions';
    title: string;
    message: string;
    date: Date;
    read: boolean;
  };
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const getIcon = () => {
    switch (notification.type) {
      case 'tickets':
        return <Ticket className="h-5 w-5 text-primary" />;
      case 'delays':
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case 'promotions':
        return <Tag className="h-5 w-5 text-green-500" />;
      default:
        return null;
    }
  };

  const getTypeLabel = () => {
    switch (notification.type) {
      case 'tickets':
        return 'Билет';
      case 'delays':
        return 'Задержка';
      case 'promotions':
        return 'Скидка';
      default:
        return '';
    }
  };

  return (
    <Card className={notification.read ? 'opacity-60' : ''}>
      <CardContent className="flex items-start gap-4 p-4">
        <div className="mt-1">{getIcon()}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-semibold text-sm">{notification.title}</h4>
            <Badge variant="secondary" className="text-xs">
              {getTypeLabel()}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(notification.date), { addSuffix: true, locale: ru })}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

