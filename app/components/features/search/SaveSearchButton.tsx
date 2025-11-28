'use client';

import { Heart } from 'lucide-react';

interface SaveSearchButtonProps {
  onClick?: () => void;
}

export function SaveSearchButton({ onClick }: SaveSearchButtonProps) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <button 
        onClick={onClick}
        className="flex items-center gap-2 text-sm font-medium text-[#7B91FF]"
      >
        <Heart className="h-4 w-4" />
        Сохранить поиск
      </button>
    </div>
  );
}

