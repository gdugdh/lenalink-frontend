'use client';

import { NotificationCenter } from '@/app/components/features/user/NotificationCenter';
import { Bell } from 'lucide-react';

export default function UserNotificationsPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#022444] mb-2 flex items-center gap-2">
          <Bell className="h-6 w-6 sm:h-8 sm:w-8" />
          Уведомления
        </h1>
        <p className="text-muted-foreground">Все ваши уведомления в одном месте</p>
      </div>

      <NotificationCenter filter="all" />
    </div>
  );
}

