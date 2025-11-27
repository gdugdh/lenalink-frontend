'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cities, extractCityName, getCityCode } from '@/app/lib/cities';

interface SearchBarProps {
  fromCity?: string;
  fromCode?: string;
  toCity?: string;
  toCode?: string;
}

export function SearchBar({ fromCity = 'Москва', fromCode = 'MOW', toCity = 'Олекминск', toCode = 'YKS' }: SearchBarProps) {
  const router = useRouter();
  const [isEditingFrom, setIsEditingFrom] = useState(false);
  const [isEditingTo, setIsEditingTo] = useState(false);
  const [fromValue, setFromValue] = useState(fromCity);
  const [toValue, setToValue] = useState(toCity);
  const [fromSuggestions, setFromSuggestions] = useState<string[]>([]);
  const [toSuggestions, setToSuggestions] = useState<string[]>([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);
  const fromSuggestionsRef = useRef<HTMLDivElement>(null);
  const toSuggestionsRef = useRef<HTMLDivElement>(null);

  // Обновляем значения при изменении пропсов
  useEffect(() => {
    setFromValue(fromCity);
    setToValue(toCity);
  }, [fromCity, toCity]);

  // Фильтрация городов по введенному тексту, исключая уже выбранный город из другого поля
  const filterCities = (query: string, excludeCity?: string): string[] => {
    if (!query.trim()) return [];
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

  // Обработка изменения поля "Откуда"
  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromValue(value);
    const suggestions = filterCities(value, toValue);
    setFromSuggestions(suggestions);
    setShowFromSuggestions(value.trim().length > 0);
  };

  // Обработка изменения поля "Куда"
  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setToValue(value);
    const suggestions = filterCities(value, fromValue);
    setToSuggestions(suggestions);
    setShowToSuggestions(value.trim().length > 0);
  };

  // Выбор города из списка для "Откуда"
  const handleFromSelect = (city: string) => {
    const cityName = extractCityName(city);
    setFromValue(cityName);
    setFromSuggestions([]);
    setShowFromSuggestions(false);
    setIsEditingFrom(false);
    fromInputRef.current?.blur();
    
    // Обновляем URL с полным названием города
    const currentTo = toCity ? cities.find(c => extractCityName(c).toLowerCase() === toCity.toLowerCase()) || `${toCity}, Россия` : '';
    router.push(`/search?from=${encodeURIComponent(city)}&to=${encodeURIComponent(currentTo)}`);
  };

  // Выбор города из списка для "Куда"
  const handleToSelect = (city: string) => {
    const cityName = extractCityName(city);
    setToValue(cityName);
    setToSuggestions([]);
    setShowToSuggestions(false);
    setIsEditingTo(false);
    toInputRef.current?.blur();
    
    // Обновляем URL с полным названием города
    const currentFrom = fromCity ? cities.find(c => extractCityName(c).toLowerCase() === fromCity.toLowerCase()) || `${fromCity}, Россия` : '';
    router.push(`/search?from=${encodeURIComponent(currentFrom)}&to=${encodeURIComponent(city)}`);
  };

  // Обработка клика на поле "Откуда"
  const handleFromClick = () => {
    setIsEditingFrom(true);
    setTimeout(() => {
      fromInputRef.current?.focus();
      fromInputRef.current?.select();
    }, 0);
  };

  // Обработка клика на поле "Куда"
  const handleToClick = () => {
    setIsEditingTo(true);
    setTimeout(() => {
      toInputRef.current?.focus();
      toInputRef.current?.select();
    }, 0);
  };

  // Обработка потери фокуса для "Откуда"
  const handleFromBlur = () => {
    // Не закрываем сразу, чтобы можно было кликнуть на предложение
    setTimeout(() => {
      if (!fromSuggestionsRef.current?.contains(document.activeElement)) {
        setIsEditingFrom(false);
        setShowFromSuggestions(false);
        // Если значение не валидно, возвращаем исходное
        const isValid = cities.some(city => extractCityName(city).toLowerCase() === fromValue.toLowerCase());
        if (!isValid && fromValue !== fromCity) {
          setFromValue(fromCity);
        }
      }
    }, 200);
  };

  // Обработка потери фокуса для "Куда"
  const handleToBlur = () => {
    // Не закрываем сразу, чтобы можно было кликнуть на предложение
    setTimeout(() => {
      if (!toSuggestionsRef.current?.contains(document.activeElement)) {
        setIsEditingTo(false);
        setShowToSuggestions(false);
        // Если значение не валидно, возвращаем исходное
        const isValid = cities.some(city => extractCityName(city).toLowerCase() === toValue.toLowerCase());
        if (!isValid && toValue !== toCity) {
          setToValue(toCity);
        }
      }
    }, 200);
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

  const currentFromCode = isEditingFrom ? getCityCode(fromValue) : fromCode;
  const currentToCode = isEditingTo ? getCityCode(toValue) : toCode;

  return (
    <div className="border-b bg-white overflow-x-hidden">
      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4 max-w-full">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex flex-1 items-center gap-1 sm:gap-2 rounded-lg border border-gray-300 bg-white text-[#022444] overflow-x-auto scrollbar-hide">
            <div className="flex flex-1 min-w-[120px] items-center border-r px-2 sm:px-4 py-2 sm:py-3 relative">
              {isEditingFrom ? (
                <div className="flex-1 min-w-0 relative">
                  <input
                    ref={fromInputRef}
                    type="text"
                    value={fromValue}
                    onChange={handleFromChange}
                    onBlur={handleFromBlur}
                    onFocus={() => {
                      if (fromValue.trim().length > 0) {
                        const suggestions = filterCities(fromValue, toValue);
                        setFromSuggestions(suggestions);
                        setShowFromSuggestions(true);
                      }
                    }}
                    className="w-full text-xs sm:text-sm font-medium text-[#022444] bg-transparent border-none outline-none"
                    placeholder="Откуда"
                  />
                  <div className="text-xs text-[#022444]">{currentFromCode}</div>
                  {showFromSuggestions && fromValue.trim().length > 0 && (
                    <div
                      ref={fromSuggestionsRef}
                      className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto top-full left-0"
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
              ) : (
                <>
                  <div className="flex-1 min-w-0" onClick={handleFromClick}>
                    <div className="text-xs sm:text-sm font-medium text-[#022444] truncate cursor-pointer">
                      {fromCity}
                    </div>
                    <div className="text-xs text-[#022444]">{fromCode}</div>
                  </div>
                  <button 
                    onClick={handleFromClick}
                    className="rounded-full p-1 hover:bg-gray-100 shrink-0"
                  >
                    <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-[#022444]" />
                  </button>
                </>
              )}
            </div>
            <div className="flex flex-1 min-w-[120px] items-center border-r px-2 sm:px-4 py-2 sm:py-3 relative">
              {isEditingTo ? (
                <div className="flex-1 min-w-0 relative">
                  <input
                    ref={toInputRef}
                    type="text"
                    value={toValue}
                    onChange={handleToChange}
                    onBlur={handleToBlur}
                    onFocus={() => {
                      if (toValue.trim().length > 0) {
                        const suggestions = filterCities(toValue, fromValue);
                        setToSuggestions(suggestions);
                        setShowToSuggestions(true);
                      }
                    }}
                    className="w-full text-xs sm:text-sm font-medium text-[#022444] bg-transparent border-none outline-none"
                    placeholder="Куда"
                  />
                  <div className="text-xs text-[#022444]">{currentToCode}</div>
                  {showToSuggestions && toValue.trim().length > 0 && (
                    <div
                      ref={toSuggestionsRef}
                      className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto top-full left-0"
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
              ) : (
                <div className="flex-1 min-w-0" onClick={handleToClick}>
                  <div className="text-xs sm:text-sm font-medium text-[#022444] truncate cursor-pointer">
                    {toCity}
                  </div>
                  <div className="text-xs text-[#022444]">{toCode}</div>
                </div>
              )}
            </div>
            <div className="flex items-center border-r px-2 sm:px-4 py-2 sm:py-3 shrink-0">
              <div className="flex-1 min-w-0">
                <div className="text-xs sm:text-sm font-medium text-[#022444]">
                  2 дек, вт
                </div>
              </div>
              <button className="ml-1 sm:ml-2 shrink-0">
                <X className="h-3 w-3 sm:h-4 sm:w-4 text-[#7B91FF]" />
              </button>
            </div>
            <div className="hidden sm:flex items-center px-2 sm:px-4 py-2 sm:py-3 shrink-0">
              <div className="flex-1">
                <div className="text-xs sm:text-sm font-medium text-[#022444]">
                  Обратно
                </div>
              </div>
            </div>
            <div className="flex items-center border-l px-2 sm:px-4 py-2 sm:py-3 shrink-0">
              <div className="flex-1 min-w-0">
                <div className="text-xs sm:text-sm font-medium text-[#022444]">
                  1 пассажир
                </div>
                <div className="text-xs text-[#022444] hidden sm:block">Эконом</div>
              </div>
            </div>
          </div>
          <button className="rounded-lg bg-[#7B91FF] px-4 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-medium text-white hover:bg-[#E16D32] w-full sm:w-auto">
            Найти билеты
          </button>
        </div>
      </div>
    </div>
  );
}

