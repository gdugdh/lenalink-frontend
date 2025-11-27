'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, ArrowUpDown } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import Link from 'next/link';
import { cities, extractCityName, getPopularCities } from '@/app/lib/cities';

interface HomeSearchFormProps {
  from?: string;
  to?: string;
}

export function HomeSearchForm({ from = '', to = '' }: HomeSearchFormProps) {
  const [fromValue, setFromValue] = useState(from);
  const [toValue, setToValue] = useState(to);
  const [fromSuggestions, setFromSuggestions] = useState<string[]>([]);
  const [toSuggestions, setToSuggestions] = useState<string[]>([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);
  const fromSuggestionsRef = useRef<HTMLDivElement>(null);
  const toSuggestionsRef = useRef<HTMLDivElement>(null);


  // Фильтрация городов по введенному тексту, исключая уже выбранный город из другого поля
  // Если запрос пустой, возвращает популярные города
  const filterCities = (query: string, excludeCity?: string): string[] => {
    if (!query.trim()) {
      // Если поле пустое, показываем популярные города
      return getPopularCities(5, excludeCity);
    }
    const lowerQuery = query.toLowerCase();
    const excludeCityName = excludeCity ? extractCityName(excludeCity).toLowerCase() : '';
    
    return cities
      .filter(city => {
        const cityLower = city.toLowerCase();
        const cityName = extractCityName(city).toLowerCase();
        // Исключаем город, если он уже выбран в другом поле
        if (excludeCityName && cityName === excludeCityName) {
          return false;
        }
        return cityLower.includes(lowerQuery);
      })
      .slice(0, 5); // Показываем максимум 5 результатов
  };

  // Проверка, является ли значение валидным городом из списка
  const isValidCity = (value: string): boolean => {
    if (!value.trim()) return false;
    return cities.some(city => city.toLowerCase() === value.toLowerCase());
  };

  // Обработка изменения поля "Откуда"
  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromValue(value);
    const suggestions = filterCities(value, toValue);
    setFromSuggestions(suggestions);
    // Показываем меню, если есть ввод или если поле пустое (для популярных городов)
    setShowFromSuggestions(true);
  };

  // Обработка изменения поля "Куда"
  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setToValue(value);
    const suggestions = filterCities(value, fromValue);
    setToSuggestions(suggestions);
    // Показываем меню, если есть ввод или если поле пустое (для популярных городов)
    setShowToSuggestions(true);
  };

  // Обработка клавиатуры для поля "Откуда"
  const handleFromKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setShowFromSuggestions(false);
    } else if (e.key === 'ArrowDown' && fromSuggestions.length > 0) {
      e.preventDefault();
      setShowFromSuggestions(true);
    }
  };

  // Обработка клавиатуры для поля "Куда"
  const handleToKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setShowToSuggestions(false);
    } else if (e.key === 'ArrowDown' && toSuggestions.length > 0) {
      e.preventDefault();
      setShowToSuggestions(true);
    }
  };

  // Выбор города из списка для "Откуда"
  const handleFromSelect = (city: string) => {
    setFromValue(city);
    setFromSuggestions([]);
    setShowFromSuggestions(false);
    fromInputRef.current?.blur();
  };

  // Выбор города из списка для "Куда"
  const handleToSelect = (city: string) => {
    setToValue(city);
    setToSuggestions([]);
    setShowToSuggestions(false);
    toInputRef.current?.blur();
  };

  // Обмен местами значений
  const handleSwap = () => {
    const temp = fromValue;
    setFromValue(toValue);
    setToValue(temp);
    // Закрываем выпадающие меню при обмене
    setShowFromSuggestions(false);
    setShowToSuggestions(false);
  };

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
  const isFormValid = isValidCity(fromValue) && isValidCity(toValue);

  // Формирование URL для поиска
  const searchUrl = `/search?from=${encodeURIComponent(fromValue)}&to=${encodeURIComponent(toValue)}`;

  return (
    <div className="w-full max-w-md">
      <div className="rounded-xl sm:rounded-2xl bg-white p-3 sm:p-4 md:p-6 shadow-xl">
        <div className="space-y-3 sm:space-y-4">
          {/* From Field */}
          <div className="space-y-1.5 sm:space-y-2 relative">
            <Label className="text-[10px] sm:text-xs font-normal text-gray-500 uppercase">
              Откуда
            </Label>
            <div className="relative">
              <Input
                ref={fromInputRef}
                value={fromValue}
                onChange={handleFromChange}
                onKeyDown={handleFromKeyDown}
                onFocus={() => {
                  const suggestions = filterCities(fromValue, toValue);
                  setFromSuggestions(suggestions);
                  setShowFromSuggestions(true);
                }}
                placeholder="Откуда"
                className="border-gray-200 text-sm sm:text-base h-8 sm:h-9 px-2 sm:px-3"
              />
              {showFromSuggestions && (
                <div
                  ref={fromSuggestionsRef}
                  className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto"
                >
                  {fromSuggestions.length > 0 ? (
                    fromSuggestions.map((city, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleFromSelect(city)}
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

          {/* Swap Button */}
          <div className="flex justify-center -my-1 sm:-my-2">
            <button
              type="button"
              onClick={handleSwap}
              className="rounded-full bg-white border border-gray-200 p-1.5 sm:p-2 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <ArrowUpDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-600" />
            </button>
          </div>

          {/* To Field */}
          <div className="space-y-1.5 sm:space-y-2 relative">
            <Label className="text-[10px] sm:text-xs font-normal text-gray-500 uppercase">
              Куда
            </Label>
            <div className="relative">
              <Input
                ref={toInputRef}
                value={toValue}
                onChange={handleToChange}
                onKeyDown={handleToKeyDown}
                onFocus={() => {
                  const suggestions = filterCities(toValue, fromValue);
                  setToSuggestions(suggestions);
                  setShowToSuggestions(true);
                }}
                placeholder="Куда"
                className="border-gray-200 text-sm sm:text-base h-8 sm:h-9 px-2 sm:px-3"
              />
              {showToSuggestions && (
                <div
                  ref={toSuggestionsRef}
                  className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto"
                >
                  {toSuggestions.length > 0 ? (
                    toSuggestions.map((city, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleToSelect(city)}
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

          {isFormValid ? (
            <Link href={searchUrl}>
              <Button className="w-full bg-[#7B91FF] hover:bg-[#E16D32] text-white text-sm sm:text-base font-medium py-3 sm:py-4 md:py-6 h-auto">
                <Search className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Найти варианты
              </Button>
            </Link>
          ) : (
            <Button 
              disabled 
              className="w-full bg-gray-400 cursor-not-allowed text-white text-sm sm:text-base font-medium py-3 sm:py-4 md:py-6 h-auto"
            >
              <Search className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Найти варианты
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

