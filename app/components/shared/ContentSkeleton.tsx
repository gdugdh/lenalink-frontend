'use client';

import { Skeleton } from '@/app/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/app/components/ui/card';

interface ContentSkeletonProps {
  lines?: number;
  showCard?: boolean;
}

export function ContentSkeleton({ lines = 3, showCard = true }: ContentSkeletonProps) {
  const content = (
    <div className="space-y-4">
      <Skeleton className="h-8 w-64" />
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton key={i} className="h-20 w-full" />
      ))}
    </div>
  );

  if (showCard) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>{content}</CardContent>
      </Card>
    );
  }

  return content;
}

