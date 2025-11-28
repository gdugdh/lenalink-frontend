'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Briefcase, Calendar, MapPin, FileText, Eye } from 'lucide-react';

interface BusinessTripCardProps {
  trip: {
    id: string;
    destination: string;
    purpose: string;
    startDate: string;
    endDate: string;
    status: 'draft' | 'pending' | 'approved' | 'rejected' | 'active' | 'completed';
  };
}

export function BusinessTripCard({ trip }: BusinessTripCardProps) {
  const getStatusVariant = () => {
    switch (trip.status) {
      case 'approved':
      case 'active':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'rejected':
        return 'destructive';
      case 'completed':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getStatusLabel = () => {
    switch (trip.status) {
      case 'draft':
        return 'Черновик';
      case 'pending':
        return 'На согласовании';
      case 'approved':
        return 'Одобрено';
      case 'rejected':
        return 'Отклонено';
      case 'active':
        return 'В работе';
      case 'completed':
        return 'Завершено';
      default:
        return '';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            {trip.destination}
          </CardTitle>
          <Badge variant={getStatusVariant()}>{getStatusLabel()}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Цель:</span>
            <span className="font-medium">{trip.purpose}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Период:</span>
            <span className="font-medium">{trip.startDate} - {trip.endDate}</span>
          </div>
        </div>
        <div className="flex gap-2 pt-4 border-t">
          <Button size="sm" variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Просмотр
          </Button>
          {trip.status === 'draft' && (
            <Button size="sm" variant="outline">
              Редактировать
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

