'use client';

import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { useToast } from '@/app/hooks/use-toast';

export function BusinessTripForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    destination: '',
    purpose: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Командировка создана',
      description: 'Ваша заявка отправлена на согласование',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="destination">Место назначения</Label>
        <Input
          id="destination"
          value={formData.destination}
          onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
          placeholder="Город или адрес"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="purpose">Цель командировки</Label>
        <Input
          id="purpose"
          value={formData.purpose}
          onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
          placeholder="Краткое описание цели"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Дата начала</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">Дата окончания</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Описание</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Дополнительная информация о командировке"
          rows={4}
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit" className="bg-[#7B91FF] hover:bg-[#E16D32]">
          Отправить на согласование
        </Button>
        <Button type="button" variant="outline">
          Сохранить как черновик
        </Button>
      </div>
    </form>
  );
}

