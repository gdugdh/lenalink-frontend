'use client';

import { Calendar } from '@/app/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover';
import { formatDateForDisplay } from '@/app/lib/utils/date-utils';

interface ReturnDatePickerFieldProps {
  selectedDate: Date;
  returnDate: Date | null;
  onSelect: (date: Date | undefined) => void;
  onRemove: () => void;
  minDate: Date;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReturnDatePickerField({
  selectedDate,
  returnDate,
  onSelect,
  onRemove,
  minDate,
  isOpen,
  onOpenChange,
}: ReturnDatePickerFieldProps) {
  return (
    <Popover open={isOpen} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <div className="flex items-center px-2 sm:px-4 py-2 sm:py-3 shrink-0 cursor-pointer hover:bg-gray-50 transition-colors focus:outline-none focus:ring-0" style={{ height: '48px', minWidth: '90px', width: 'auto', flexShrink: 0 }}>
          <div className="flex-1 min-w-0">
            <div className="text-xs sm:text-sm font-medium text-[#022444] whitespace-nowrap truncate">
              {returnDate ? formatDateForDisplay(returnDate) : 'Обратно'}
            </div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={returnDate || undefined}
          onSelect={onSelect}
          disabled={(date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const min = new Date(minDate);
            min.setHours(0, 0, 0, 0);
            // Return date must be no earlier than today and no earlier than departure date
            return date < today || date < min;
          }}
          initialFocus
        />
        {returnDate && (
          <div className="p-3 border-t">
            <button
              onClick={onRemove}
              className="w-full text-sm text-[#7B91FF] hover:text-[#E16D32] transition-colors text-center"
            >
              Обратный билет ненужен
            </button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

