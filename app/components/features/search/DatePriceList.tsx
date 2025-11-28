'use client';

import { useRef, useEffect } from 'react';
import { DatePriceItem } from './DatePriceItem';

interface DateItem {
  date: Date;
  price: number | null;
  isSelected: boolean;
}

interface DatePriceListProps {
  dates: DateItem[];
  onDateClick: (date: Date) => void;
  scrollContainerRef: React.RefObject<HTMLDivElement>;
}

export function DatePriceList({ dates, onDateClick, scrollContainerRef }: DatePriceListProps) {
  return (
    <div
      ref={scrollContainerRef}
      className="flex gap-1 sm:gap-2 overflow-x-auto scrollbar-hide sm:overflow-x-visible sm:justify-center sm:flex-nowrap"
    >
      {dates.map((dateItem, index) => (
        <DatePriceItem
          key={`${dateItem.date.toISOString()}-${index}`}
          date={dateItem.date}
          price={dateItem.price}
          isSelected={dateItem.isSelected}
          onClick={onDateClick}
        />
      ))}
    </div>
  );
}

