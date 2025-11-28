'use client';

import { useState, useRef, useEffect } from 'react';
import { useCitySearch } from '@/app/hooks/use-city-search';
import { useCitySuggestionsPosition } from '@/app/hooks/use-city-suggestions';
import { CityInputEdit } from './CityInputEdit';
import { CityInputDisplay } from './CityInputDisplay';
import { CitySuggestions } from './CitySuggestions';

interface CityInputFieldProps {
  value: string;
  code: string;
  placeholder: string;
  excludeCity?: string;
  isEditing: boolean;
  onEdit: () => void;
  onChange: (value: string) => void;
  onSelect: (city: string) => void;
  onBlur: () => void;
}

export function CityInputField({
  value,
  code,
  placeholder,
  excludeCity,
  isEditing,
  onEdit,
  onChange,
  onSelect,
  onBlur,
}: CityInputFieldProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  
  const { suggestions } = useCitySearch(value, excludeCity);
  const { position, updatePosition } = useCitySuggestionsPosition({
    inputRef,
    suggestionsRef,
    showSuggestions,
  });

  useEffect(() => {
    if (showSuggestions && value.trim().length > 0) {
      setTimeout(updatePosition, 0);
    }
  }, [showSuggestions, value, updatePosition]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    if (showSuggestions) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showSuggestions]);

  const handleFocus = () => {
    if (value.trim().length > 0) {
      setShowSuggestions(true);
      setTimeout(updatePosition, 0);
    }
  };

  const handleSelect = (city: string) => {
    setShowSuggestions(false);
    onSelect(city);
  };

  if (isEditing) {
    return (
      <>
        <CityInputEdit
          value={value}
          code={code}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={handleFocus}
          inputRef={inputRef}
        />
        {showSuggestions && value.trim().length > 0 && (
          <CitySuggestions
            suggestions={suggestions}
            showSuggestions={showSuggestions}
            position={position}
            onSelect={handleSelect}
            suggestionsRef={suggestionsRef}
          />
        )}
      </>
    );
  }

  return <CityInputDisplay value={value} code={code} onEdit={onEdit} />;
}

