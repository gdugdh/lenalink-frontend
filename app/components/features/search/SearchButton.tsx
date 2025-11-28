'use client';

interface SearchButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function SearchButton({ onClick, disabled = false }: SearchButtonProps) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className="rounded-lg bg-[#7B91FF] px-4 sm:px-8 text-sm sm:text-base font-medium text-white hover:bg-[#E16D32] w-full sm:w-auto transition-colors focus:outline-none focus:ring-0 focus:scale-100 active:scale-100 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
      style={{ boxSizing: 'border-box', height: '48px' }}
    >
      Найти билеты
    </button>
  );
}

