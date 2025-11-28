'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useCitySearch } from '@/app/hooks/use-city-search';
import { HomeCityInput } from './HomeCityInput';
import { SwapButton } from './SwapButton';
import { HomeSearchButton } from './HomeSearchButton';

interface HomeSearchFormProps {
  from?: string;
  to?: string;
}

export function HomeSearchForm({ from = '', to = '' }: HomeSearchFormProps) {
  const [fromValue, setFromValue] = useState(from);
  const [toValue, setToValue] = useState(to);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);
  const fromSuggestionsRef = useRef<HTMLDivElement>(null);
  const toSuggestionsRef = useRef<HTMLDivElement>(null);

  // Используем хуки для поиска городов
  const fromSearch = useCitySearch(fromValue, toValue);
  const toSearch = useCitySearch(toValue, fromValue);

  // Обработка изменения поля "Откуда"
  const handleFromChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromValue(value);
    // Показываем меню, если есть ввод или если поле пустое (для популярных городов)
    setShowFromSuggestions(true);
  }, []);

  // Обработка изменения поля "Куда"
  const handleToChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setToValue(value);
    // Показываем меню, если есть ввод или если поле пустое (для популярных городов)
    setShowToSuggestions(true);
  }, []);

  // Обработка клавиатуры для поля "Откуда"
  const handleFromKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setShowFromSuggestions(false);
    } else if (e.key === 'ArrowDown' && fromSearch.suggestions.length > 0) {
      e.preventDefault();
      setShowFromSuggestions(true);
    }
  }, [fromSearch.suggestions]);

  // Обработка клавиатуры для поля "Куда"
  const handleToKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setShowToSuggestions(false);
    } else if (e.key === 'ArrowDown' && toSearch.suggestions.length > 0) {
      e.preventDefault();
      setShowToSuggestions(true);
    }
  }, [toSearch.suggestions]);

  // Выбор города из списка для "Откуда"
  const handleFromSelect = useCallback((city: string) => {
    setFromValue(city);
    setShowFromSuggestions(false);
    fromInputRef.current?.blur();
  }, []);

  // Выбор города из списка для "Куда"
  const handleToSelect = useCallback((city: string) => {
    setToValue(city);
    setShowToSuggestions(false);
    toInputRef.current?.blur();
  }, []);

  // Обмен местами значений
  const handleSwap = useCallback(() => {
    setFromValue((prevFrom) => {
      const currentTo = toValue;
      setToValue(prevFrom);
      return currentTo;
    });
    // Закрываем выпадающие меню при обмене
    setShowFromSuggestions(false);
    setShowToSuggestions(false);
  }, [toValue]);

  // Закрытие выпадающих меню при клике вне их
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        fromSuggestionsRef.current &&
        !fromSuggestionsRef.current.contains(event.target as Node) &&
        fromInputRef.current &&
        !fromInputRef.current.contains(event.target as Node)
      ) {
        setShowFromSuggestions(false);
      }
      if (
        toSuggestionsRef.current &&
        !toSuggestionsRef.current.contains(event.target as Node) &&
        toInputRef.current &&
        !toInputRef.current.contains(event.target as Node)
      ) {
        setShowToSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Проверка валидности формы
  const isFormValid = useMemo(() => fromSearch.isValid && toSearch.isValid, [fromSearch.isValid, toSearch.isValid]);

  // Формирование URL для поиска
  const searchUrl = useMemo(() => `/search?from=${encodeURIComponent(fromValue)}&to=${encodeURIComponent(toValue)}`, [fromValue, toValue]);

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl sm:rounded-2xl bg-white p-3 sm:p-4 md:p-6 shadow-xl">
        <div className="space-y-3 sm:space-y-4">
          <HomeCityInput
            label="Откуда"
            value={fromValue}
            placeholder="Откуда"
            excludeCity={toValue}
            showSuggestions={showFromSuggestions}
            onValueChange={setFromValue}
            onSelect={handleFromSelect}
            onFocus={() => setShowFromSuggestions(true)}
            onKeyDown={handleFromKeyDown}
            inputRef={fromInputRef}
            suggestionsRef={fromSuggestionsRef}
          />
          <SwapButton onClick={handleSwap} />
          <HomeCityInput
            label="Куда"
            value={toValue}
            placeholder="Куда"
            excludeCity={fromValue}
            showSuggestions={showToSuggestions}
            onValueChange={setToValue}
            onSelect={handleToSelect}
            onFocus={() => setShowToSuggestions(true)}
            onKeyDown={handleToKeyDown}
            inputRef={toInputRef}
            suggestionsRef={toSuggestionsRef}
          />
          <HomeSearchButton isValid={isFormValid} searchUrl={searchUrl} />
        </div>
      </div>
    </div>
  );
}

