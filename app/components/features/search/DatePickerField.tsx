'use client';

import { Calendar } from '@/app/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover';
import { formatDateForDisplay } from '@/app/lib/utils/date-utils';

interface DatePickerFieldProps {
  selectedDate: Date;
  onSelect: (date: Date | undefined) => void;
  minDate?: Date;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DatePickerField({
  selectedDate,
  onSelect,
  minDate,
  isOpen,
  onOpenChange,
}: DatePickerFieldProps) {
  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <div className="flex items-center border-r px-2 sm:px-4 py-2 sm:py-3 shrink-0 cursor-pointer hover:bg-gray-50 transition-colors focus:outline-none focus:ring-0" style={{ height: '48px', minWidth: '90px', width: 'auto', flexShrink: 0 }}>
          <div className="flex-1 min-w-0">
            <div className="text-xs sm:text-sm font-medium text-[#022444] whitespace-nowrap truncate">
              {formatDateForDisplay(selectedDate)}
            </div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={onSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

