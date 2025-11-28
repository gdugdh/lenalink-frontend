'use client';

import { useRef, useEffect } from 'react';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { useCitySearch } from '@/app/hooks/use-city-search';

interface HomeCityInputProps {
  label: string;
  value: string;
  placeholder: string;
  excludeCity?: string;
  showSuggestions: boolean;
  onValueChange: (value: string) => void;
  onSelect: (city: string) => void;
  onFocus: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  suggestionsRef: React.RefObject<HTMLDivElement>;
}

export function HomeCityInput({
  label,
  value,
  placeholder,
  excludeCity,
  showSuggestions,
  onValueChange,
  onSelect,
  onFocus,
  onKeyDown,
  inputRef,
  suggestionsRef,
}: HomeCityInputProps) {
  const { suggestions } = useCitySearch(value, excludeCity);

  return (
    <div className="space-y-1.5 sm:space-y-2 relative">
      <Label className="text-[10px] sm:text-xs font-normal text-gray-500 uppercase">
        {label}
      </Label>
      <div className="relative">
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          placeholder={placeholder}
          className="border-gray-200 text-sm sm:text-base h-8 sm:h-9 px-2 sm:px-3"
        />
        {showSuggestions && (
          <div
            ref={suggestionsRef}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto"
          >
            {suggestions.length > 0 ? (
              suggestions.map((city, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => onSelect(city)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors first:rounded-t-lg last:rounded-b-lg"
                >
                  {city}
                </button>
              ))
            ) : (
              <div className="px-3 py-2 text-sm text-gray-500 text-center">
                Мы ничего не нашли
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

