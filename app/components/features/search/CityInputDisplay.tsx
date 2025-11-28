'use client';

import { ChevronDown } from 'lucide-react';

interface CityInputDisplayProps {
  value: string;
  code: string;
  onEdit: () => void;
}

export function CityInputDisplay({ value, code, onEdit }: CityInputDisplayProps) {
  return (
    <>
      <div className="flex-1 min-w-0" onClick={onEdit}>
        <div className="text-xs sm:text-sm font-medium text-[#022444] truncate cursor-pointer">
          {value}
        </div>
        <div className="text-xs text-[#022444]">{code}</div>
      </div>
      <button 
        onClick={onEdit}
        className="rounded-full p-1 hover:bg-gray-100 shrink-0 focus:outline-none focus:ring-0 focus:scale-100 active:scale-100 transition-none"
        style={{ boxSizing: 'border-box' }}
      >
        <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-[#022444]" />
      </button>
    </>
  );
}

