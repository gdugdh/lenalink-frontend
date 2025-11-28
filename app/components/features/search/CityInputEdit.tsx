'use client';

import { getCityCode } from '@/app/lib/cities';

interface CityInputEditProps {
  value: string;
  code: string;
  placeholder: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  onFocus: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export function CityInputEdit({
  value,
  code,
  placeholder,
  onChange,
  onBlur,
  onFocus,
  inputRef,
}: CityInputEditProps) {
  const currentCode = getCityCode(value) || code;

  return (
    <div className="flex-1 min-w-0 relative flex flex-col justify-center h-full w-full">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        onFocus={onFocus}
        className="w-full text-xs sm:text-sm font-medium text-[#022444] bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus:border-none p-0 m-0"
        placeholder={placeholder}
        style={{ boxSizing: 'border-box' }}
      />
      <div className="text-xs text-[#022444]">{currentCode}</div>
    </div>
  );
}

