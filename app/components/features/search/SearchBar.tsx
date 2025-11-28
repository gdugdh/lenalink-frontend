'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cities, extractCityName, getCityCode } from '@/app/lib/cities';
import { Calendar } from '@/app/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/app/components/ui/popover';

interface SearchBarProps {
  fromCity?: string;
  fromCode?: string;
  toCity?: string;
  toCode?: string;
}

export function SearchBar({ fromCity = 'Москва', fromCode = 'MOW', toCity = 'Олекминск', toCode = 'OLZ' }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isEditingFrom, setIsEditingFrom] = useState(false);
  const [isEditingTo, setIsEditingTo] = useState(false);
  const [fromValue, setFromValue] = useState(fromCity);
  const [toValue, setToValue] = useState(toCity);
  const [fromSuggestions, setFromSuggestions] = useState<string[]>([]);
  const [toSuggestions, setToSuggestions] = useState<string[]>([]);
  const [showFromSuggestions, setShowFromSuggestions] = useState(false);
  const [showToSuggestions, setShowToSuggestions] = useState(false);
  const [fromSuggestionsPosition, setFromSuggestionsPosition] = useState({ top: 0, left: 0, width: 0 });
  const [toSuggestionsPosition, setToSuggestionsPosition] = useState({ top: 0, left: 0, width: 0 });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isReturnDatePickerOpen, setIsReturnDatePickerOpen] = useState(false);
  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);
  const fromSuggestionsRef = useRef<HTMLDivElement>(null);
  const toSuggestionsRef = useRef<HTMLDivElement>(null);

  // Функция для форматирования даты в строку YYYY-MM-DD (локальное время)
  const formatDateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Функция для парсинга даты из строки YYYY-MM-DD (локальное время)
  const parseDateFromString = (dateString: string): Date => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  };

  // Получаем дату из URL или используем сегодняшнюю
  const dateParam = searchParams.get('date') || '';
  const returnDateParam = searchParams.get('return_date') || '';
  const selectedDate = dateParam ? parseDateFromString(dateParam) : new Date();
  const selectedReturnDate = returnDateParam ? parseDateFromString(returnDateParam) : null;
  
  // Форматируем дату для отображения
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'short', 
      weekday: 'short' 
    });
  };

  // Обработка выбора даты
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    // Используем локальное форматирование вместо ISO, чтобы избежать проблем с часовыми поясами
    const dateString = formatDateToString(date);
    const currentFrom = fromValue ? cities.find(c => extractCityName(c).toLowerCase() === fromValue.toLowerCase()) || `${fromValue}, Россия` : '';
    const currentTo = toValue ? cities.find(c => extractCityName(c).toLowerCase() === toValue.toLowerCase()) || `${toValue}, Россия` : '';
    
    const returnDateString = returnDateParam || '';
    const queryParams = new URLSearchParams();
    queryParams.set('from', currentFrom);
    queryParams.set('to', currentTo);
    queryParams.set('date', dateString);
    if (returnDateString) {
      queryParams.set('return_date', returnDateString);
    }
    
    router.push(`/search?${queryParams.toString()}`);
    setIsDatePickerOpen(false);
  };

  // Обработка выбора обратной даты
  const handleReturnDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    const dateString = formatDateToString(date);
    const currentFrom = fromValue ? cities.find(c => extractCityName(c).toLowerCase() === fromValue.toLowerCase()) || `${fromValue}, Россия` : '';
    const currentTo = toValue ? cities.find(c => extractCityName(c).toLowerCase() === toValue.toLowerCase()) || `${toValue}, Россия` : '';
    
    const departureDateString = dateParam || formatDateToString(selectedDate);
    const queryParams = new URLSearchParams();
    queryParams.set('from', currentFrom);
    queryParams.set('to', currentTo);
    queryParams.set('date', departureDateString);
    queryParams.set('return_date', dateString);
    
    router.push(`/search?${queryParams.toString()}`);
    setIsReturnDatePickerOpen(false);
  };

  // Обработка удаления обратной даты
  const handleRemoveReturnDate = () => {
    const currentFrom = fromValue ? cities.find(c => extractCityName(c).toLowerCase() === fromValue.toLowerCase()) || `${fromValue}, Россия` : '';
    const currentTo = toValue ? cities.find(c => extractCityName(c).toLowerCase() === toValue.toLowerCase()) || `${toValue}, Россия` : '';
    
    const departureDateString = dateParam || formatDateToString(selectedDate);
    const queryParams = new URLSearchParams();
    queryParams.set('from', currentFrom);
    queryParams.set('to', currentTo);
    queryParams.set('date', departureDateString);
    // Не добавляем return_date, что удалит его из URL
    
    router.push(`/search?${queryParams.toString()}`);
    setIsReturnDatePickerOpen(false);
  };

  // Обработка нажатия на кнопку "Найти билеты"
  const handleSearchClick = () => {
    // Получаем полные названия городов
    const currentFrom = fromValue ? cities.find(c => extractCityName(c).toLowerCase() === fromValue.toLowerCase()) || `${fromValue}, Россия` : fromCity;
    const currentTo = toValue ? cities.find(c => extractCityName(c).toLowerCase() === toValue.toLowerCase()) || `${toValue}, Россия` : toCity;
    
    // Получаем дату из URL или используем выбранную дату
    const dateString = dateParam || formatDateToString(selectedDate);
    
    // Обновляем URL, что автоматически запустит поиск на странице SearchPageClient
    router.push(`/search?from=${encodeURIComponent(currentFrom)}&to=${encodeURIComponent(currentTo)}&date=${dateString}`);
  };

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

  // Обновление позиции выпадающего меню для "Откуда"
  const updateFromSuggestionsPosition = () => {
    if (fromInputRef.current) {
      const rect = fromInputRef.current.getBoundingClientRect();
      setFromSuggestionsPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  // Обработка изменения поля "Откуда"
  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromValue(value);
    const suggestions = filterCities(value, toValue);
    setFromSuggestions(suggestions);
    setShowFromSuggestions(value.trim().length > 0);
    if (value.trim().length > 0) {
      setTimeout(updateFromSuggestionsPosition, 0);
    }
  };

  // Обновление позиции выпадающего меню для "Куда"
  const updateToSuggestionsPosition = () => {
    if (toInputRef.current) {
      const rect = toInputRef.current.getBoundingClientRect();
      setToSuggestionsPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  };

  // Обработка изменения поля "Куда"
  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setToValue(value);
    const suggestions = filterCities(value, fromValue);
    setToSuggestions(suggestions);
    setShowToSuggestions(value.trim().length > 0);
    if (value.trim().length > 0) {
      setTimeout(updateToSuggestionsPosition, 0);
    }
  };

  // Выбор города из списка для "Откуда"
  const handleFromSelect = (city: string) => {
    const cityName = extractCityName(city);
    setFromValue(cityName);
    setFromSuggestions([]);
    setShowFromSuggestions(false);
    setIsEditingFrom(false);
    fromInputRef.current?.blur();
    
    // Обновляем URL с полным названием города и сохраняем дату
    const currentTo = toValue ? cities.find(c => extractCityName(c).toLowerCase() === toValue.toLowerCase()) || `${toValue}, Россия` : '';
    const dateString = dateParam || selectedDate.toISOString().split('T')[0];
    router.push(`/search?from=${encodeURIComponent(city)}&to=${encodeURIComponent(currentTo)}&date=${dateString}`);
  };

  // Выбор города из списка для "Куда"
  const handleToSelect = (city: string) => {
    const cityName = extractCityName(city);
    setToValue(cityName);
    setToSuggestions([]);
    setShowToSuggestions(false);
    setIsEditingTo(false);
    toInputRef.current?.blur();
    
    // Обновляем URL с полным названием города и сохраняем дату
    const currentFrom = fromValue ? cities.find(c => extractCityName(c).toLowerCase() === fromValue.toLowerCase()) || `${fromValue}, Россия` : '';
    const dateString = dateParam || selectedDate.toISOString().split('T')[0];
    router.push(`/search?from=${encodeURIComponent(currentFrom)}&to=${encodeURIComponent(city)}&date=${dateString}`);
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

  // Обновление позиций при скролле или изменении размера окна
  useEffect(() => {
    const updatePositions = () => {
      if (showFromSuggestions && fromInputRef.current) {
        updateFromSuggestionsPosition();
      }
      if (showToSuggestions && toInputRef.current) {
        updateToSuggestionsPosition();
      }
    };

    window.addEventListener('scroll', updatePositions, true);
    window.addEventListener('resize', updatePositions);
    
    return () => {
      window.removeEventListener('scroll', updatePositions, true);
      window.removeEventListener('resize', updatePositions);
    };
  }, [showFromSuggestions, showToSuggestions]);

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
      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4 max-w-7xl">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 justify-center">
          <div className="flex items-center gap-0 sm:gap-2 rounded-lg border border-gray-300 bg-white text-[#022444] overflow-x-auto scrollbar-hide w-full sm:w-auto shrink-0" style={{ height: '48px' }}>
            <div className="flex items-center border-r px-2 sm:px-4 py-2 sm:py-3 relative shrink-0" style={{ height: '48px', width: '120px', minWidth: '120px', maxWidth: '120px' }}>
              {isEditingFrom ? (
                <div className="flex-1 min-w-0 relative flex flex-col justify-center h-full w-full">
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
                        setTimeout(updateFromSuggestionsPosition, 0);
                      }
                    }}
                    className="w-full text-xs sm:text-sm font-medium text-[#022444] bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus:border-none p-0 m-0"
                    placeholder="Откуда"
                    style={{ boxSizing: 'border-box' }}
                  />
                  <div className="text-xs text-[#022444]">{currentFromCode}</div>
                  {showFromSuggestions && fromValue.trim().length > 0 && (
                    <div
                      ref={fromSuggestionsRef}
                      className="fixed z-[9999] bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto"
                      style={{
                        top: `${fromSuggestionsPosition.top}px`,
                        left: `${fromSuggestionsPosition.left}px`,
                        width: '120px',
                        minWidth: '120px',
                        maxWidth: '120px',
                      }}
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
                    className="rounded-full p-1 hover:bg-gray-100 shrink-0 focus:outline-none focus:ring-0 focus:scale-100 active:scale-100 transition-none"
                    style={{ boxSizing: 'border-box' }}
                  >
                    <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-[#022444]" />
                  </button>
                </>
              )}
            </div>
            <div className="flex items-center border-r px-2 sm:px-4 py-2 sm:py-3 relative shrink-0" style={{ height: '48px', width: '120px', minWidth: '120px', maxWidth: '120px' }}>
              {isEditingTo ? (
                <div className="flex-1 min-w-0 relative flex flex-col justify-center h-full w-full">
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
                        setTimeout(updateToSuggestionsPosition, 0);
                      }
                    }}
                    className="w-full text-xs sm:text-sm font-medium text-[#022444] bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus:border-none p-0 m-0"
                    placeholder="Куда"
                    style={{ boxSizing: 'border-box' }}
                  />
                  <div className="text-xs text-[#022444]">{currentToCode}</div>
                  {showToSuggestions && toValue.trim().length > 0 && (
                    <div
                      ref={toSuggestionsRef}
                      className="fixed z-[9999] bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto"
                      style={{
                        top: `${toSuggestionsPosition.top}px`,
                        left: `${toSuggestionsPosition.left}px`,
                        width: '120px',
                        minWidth: '120px',
                        maxWidth: '120px',
                      }}
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
            <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
              <PopoverTrigger asChild>
                <div className="flex items-center border-r px-2 sm:px-4 py-2 sm:py-3 shrink-0 cursor-pointer hover:bg-gray-50 transition-colors focus:outline-none focus:ring-0" style={{ height: '48px', minWidth: '90px', width: 'auto', flexShrink: 0 }}>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm font-medium text-[#022444] whitespace-nowrap truncate">
                      {formatDate(selectedDate)}
                    </div>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => handleDateSelect(date)}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    return date < today;
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Popover open={isReturnDatePickerOpen} onOpenChange={setIsReturnDatePickerOpen}>
              <PopoverTrigger asChild>
                <div className="flex items-center px-2 sm:px-4 py-2 sm:py-3 shrink-0 cursor-pointer hover:bg-gray-50 transition-colors focus:outline-none focus:ring-0" style={{ height: '48px', minWidth: '90px', width: 'auto', flexShrink: 0 }}>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm font-medium text-[#022444] whitespace-nowrap truncate">
                      {selectedReturnDate ? formatDate(selectedReturnDate) : 'Обратно'}
                    </div>
                  </div>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedReturnDate || undefined}
                  onSelect={(date) => handleReturnDateSelect(date)}
                  disabled={(date) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    const minDate = new Date(selectedDate);
                    minDate.setHours(0, 0, 0, 0);
                    // Обратная дата должна быть не раньше сегодня и не раньше даты отправления
                    return date < today || date < minDate;
                  }}
                  initialFocus
                />
                {selectedReturnDate && (
                  <div className="p-3 border-t">
                    <button
                      onClick={handleRemoveReturnDate}
                      className="w-full text-sm text-[#7B91FF] hover:text-[#E16D32] transition-colors text-center"
                    >
                      Обратный билет ненужен
                    </button>
                  </div>
                )}
              </PopoverContent>
            </Popover>
            <div className="flex items-center border-l px-2 sm:px-4 py-2 sm:py-3 shrink-0" style={{ height: '48px', minWidth: '90px', width: 'auto', flexShrink: 0 }}>
              <div className="flex-1 min-w-0">
                <div className="text-xs sm:text-sm font-medium text-[#022444] whitespace-nowrap truncate">
                  1 пассажир
                </div>
                <div className="text-xs text-[#022444] hidden sm:block">Эконом</div>
              </div>
            </div>
          </div>
          <button 
            onClick={handleSearchClick}
            className="rounded-lg bg-[#7B91FF] px-4 sm:px-8 text-sm sm:text-base font-medium text-white hover:bg-[#E16D32] w-full sm:w-auto transition-colors focus:outline-none focus:ring-0 focus:scale-100 active:scale-100 shrink-0"
            style={{ boxSizing: 'border-box', height: '48px' }}
          >
            Найти билеты
          </button>
        </div>
      </div>
    </div>
  );
}

