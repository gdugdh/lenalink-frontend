'use client';

import { ArrowUpDown } from 'lucide-react';

interface SwapButtonProps {
  onClick: () => void;
}

export function SwapButton({ onClick }: SwapButtonProps) {
  return (
    <div className="flex justify-center -my-1 sm:-my-2">
      <button
        type="button"
        onClick={onClick}
        className="rounded-full bg-white border border-gray-200 p-1.5 sm:p-2 hover:bg-gray-50 transition-colors shadow-sm"
      >
        <ArrowUpDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600" />
      </button>
    </div>
  );
}

