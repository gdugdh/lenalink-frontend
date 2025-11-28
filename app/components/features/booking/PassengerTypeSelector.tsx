'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import type { PassengerType } from '@/app/lib/booking-context';

interface PassengerTypeSelectorProps {
  value: PassengerType;
  onChange: (value: PassengerType) => void;
}

export function PassengerTypeSelector({ value, onChange }: PassengerTypeSelectorProps) {
  return (
    <Select value={value} onValueChange={(val) => onChange(val as PassengerType)}>
      <SelectTrigger className="w-full sm:w-[200px] md:w-[250px] h-8 sm:h-9 text-sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="adult">Взрослый (старше 12 лет)</SelectItem>
        <SelectItem value="child">Ребёнок (2-12 лет)</SelectItem>
        <SelectItem value="infant">Младенец (до 2 лет)</SelectItem>
      </SelectContent>
    </Select>
  );
}

