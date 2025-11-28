'use client';

import { useState } from 'react';
import { Label } from '@/app/components/ui/label';
import { Switch } from '@/app/components/ui/switch';
import { Button } from '@/app/components/ui/button';
import { useToast } from '@/app/hooks/use-toast';

export function NotificationSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    email: true,
    push: true,
    tickets: true,
    delays: true,
    promotions: false,
  });

  const handleSave = () => {
    toast({
      title: 'Настройки сохранены',
      description: 'Ваши предпочтения уведомлений обновлены',
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email">Email уведомления</Label>
            <p className="text-sm text-muted-foreground">Получать уведомления на email</p>
          </div>
          <Switch
            id="email"
            checked={settings.email}
            onCheckedChange={(checked) => setSettings({ ...settings, email: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="push">Push уведомления</Label>
            <p className="text-sm text-muted-foreground">Получать push-уведомления</p>
          </div>
          <Switch
            id="push"
            checked={settings.push}
            onCheckedChange={(checked) => setSettings({ ...settings, push: checked })}
          />
        </div>
      </div>

      <div className="space-y-4 border-t pt-4">
        <h4 className="font-semibold">Типы уведомлений</h4>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="tickets">Билеты</Label>
            <p className="text-sm text-muted-foreground">Уведомления о билетах</p>
          </div>
          <Switch
            id="tickets"
            checked={settings.tickets}
            onCheckedChange={(checked) => setSettings({ ...settings, tickets: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="delays">Задержки</Label>
            <p className="text-sm text-muted-foreground">Уведомления о задержках рейсов</p>
          </div>
          <Switch
            id="delays"
            checked={settings.delays}
            onCheckedChange={(checked) => setSettings({ ...settings, delays: checked })}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="promotions">Скидки</Label>
            <p className="text-sm text-muted-foreground">Уведомления о специальных предложениях</p>
          </div>
          <Switch
            id="promotions"
            checked={settings.promotions}
            onCheckedChange={(checked) => setSettings({ ...settings, promotions: checked })}
          />
        </div>
      </div>

      <Button onClick={handleSave} className="bg-[#7B91FF] hover:bg-[#E16D32]">
        Сохранить настройки
      </Button>
    </div>
  );
}

