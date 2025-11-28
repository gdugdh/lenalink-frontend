'use client';

interface TimelinePointProps {
  time: string;
  city: string;
  date: string;
  align?: 'left' | 'right';
}

export function TimelinePoint({ time, city, date, align = 'left' }: TimelinePointProps) {
  const containerClass = align === 'right' ? 'min-w-0 text-right' : 'min-w-0';
  
  return (
    <div className={containerClass}>
      <div className="text-xl sm:text-2xl font-bold text-[#022444]">
        {time}
      </div>
      <div className="text-xs sm:text-sm text-[#022444] truncate">
        {city}
      </div>
      <div className="text-xs text-[#022444]">{date}</div>
    </div>
  );
}

