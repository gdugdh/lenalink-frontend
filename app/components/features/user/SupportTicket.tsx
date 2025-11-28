'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { useToast } from '@/app/hooks/use-toast';

export function SupportTicket() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    subject: '',
    category: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Тикет создан',
      description: 'Ваш запрос отправлен в службу поддержки',
    });
    setFormData({ subject: '', category: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="category">Категория</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
          <SelectTrigger id="category">
            <SelectValue placeholder="Выберите категорию" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="booking">Бронирование</SelectItem>
            <SelectItem value="payment">Оплата</SelectItem>
            <SelectItem value="refund">Возврат</SelectItem>
            <SelectItem value="other">Другое</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="subject">Тема</Label>
        <Input
          id="subject"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          placeholder="Краткое описание проблемы"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Сообщение</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Опишите вашу проблему подробно"
          rows={6}
          required
        />
      </div>
      <Button type="submit" className="bg-[#7B91FF] hover:bg-[#E16D32]">
        Отправить тикет
      </Button>
    </form>
  );
}

