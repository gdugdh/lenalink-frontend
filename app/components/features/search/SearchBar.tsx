'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { cities, extractCityName } from '@/app/lib/cities';
import { formatDateToString, parseDateFromString } from '@/app/lib/utils/date-utils';
import { CityInputField } from './CityInputField';
import { DatePickerField } from './DatePickerField';
import { ReturnDatePickerField } from './ReturnDatePickerField';
import { PassengerInfoField } from './PassengerInfoField';
import { SearchButton } from './SearchButton';

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
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isReturnDatePickerOpen, setIsReturnDatePickerOpen] = useState(false);

  // Get date from URL or use today's date
  const dateParam = searchParams.get('date') || '';
  const returnDateParam = searchParams.get('return_date') || '';
  const selectedDate = dateParam ? parseDateFromString(dateParam) : new Date();
  const selectedReturnDate = returnDateParam ? parseDateFromString(returnDateParam) : null;

  // Helper to get full city name
  const getFullCityName = useCallback((value: string, fallback: string): string => {
    return value ? cities.find(c => extractCityName(c).toLowerCase() === value.toLowerCase()) || `${value}, Россия` : fallback;
  }, []);

  // Handle date selection
  const handleDateSelect = useCallback((date: Date | undefined) => {
    if (!date) return;
    
    const dateString = formatDateToString(date);
    const currentFrom = getFullCityName(fromValue, '');
    const currentTo = getFullCityName(toValue, '');
    
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
  }, [fromValue, toValue, returnDateParam, router, getFullCityName]);

  // Handle return date selection
  const handleReturnDateSelect = useCallback((date: Date | undefined) => {
    if (!date) return;
    
    const dateString = formatDateToString(date);
    const currentFrom = getFullCityName(fromValue, '');
    const currentTo = getFullCityName(toValue, '');
    
    const departureDateString = dateParam || formatDateToString(selectedDate);
    const queryParams = new URLSearchParams();
    queryParams.set('from', currentFrom);
    queryParams.set('to', currentTo);
    queryParams.set('date', departureDateString);
    queryParams.set('return_date', dateString);
    
    router.push(`/search?${queryParams.toString()}`);
    setIsReturnDatePickerOpen(false);
  }, [fromValue, toValue, dateParam, selectedDate, router, getFullCityName]);

  // Handle return date removal
  const handleRemoveReturnDate = useCallback(() => {
    const currentFrom = getFullCityName(fromValue, '');
    const currentTo = getFullCityName(toValue, '');
    
    const departureDateString = dateParam || formatDateToString(selectedDate);
    const queryParams = new URLSearchParams();
    queryParams.set('from', currentFrom);
    queryParams.set('to', currentTo);
    queryParams.set('date', departureDateString);
    
    router.push(`/search?${queryParams.toString()}`);
    setIsReturnDatePickerOpen(false);
  }, [fromValue, toValue, dateParam, selectedDate, router, getFullCityName]);

  // Handle search button click
  const handleSearchClick = useCallback(() => {
    const currentFrom = getFullCityName(fromValue, fromCity);
    const currentTo = getFullCityName(toValue, toCity);
    const dateString = dateParam || formatDateToString(selectedDate);
    
    router.push(`/search?from=${encodeURIComponent(currentFrom)}&to=${encodeURIComponent(currentTo)}&date=${dateString}`);
  }, [fromValue, toValue, fromCity, toCity, dateParam, selectedDate, router, getFullCityName]);

  // Update values when props change
  useEffect(() => {
    setFromValue(fromCity);
    setToValue(toCity);
  }, [fromCity, toCity]);

  // Handle city selection for "From"
  const handleFromSelect = useCallback((city: string) => {
    const cityName = extractCityName(city);
    setFromValue(cityName);
    setIsEditingFrom(false);
    
    const currentTo = getFullCityName(toValue, '');
    const dateString = dateParam || formatDateToString(selectedDate);
    router.push(`/search?from=${encodeURIComponent(city)}&to=${encodeURIComponent(currentTo)}&date=${dateString}`);
  }, [toValue, dateParam, selectedDate, router, getFullCityName]);

  // Handle city selection for "To"
  const handleToSelect = useCallback((city: string) => {
    const cityName = extractCityName(city);
    setToValue(cityName);
    setIsEditingTo(false);
    
    const currentFrom = getFullCityName(fromValue, '');
    const dateString = dateParam || formatDateToString(selectedDate);
    router.push(`/search?from=${encodeURIComponent(currentFrom)}&to=${encodeURIComponent(city)}&date=${dateString}`);
  }, [fromValue, dateParam, selectedDate, router, getFullCityName]);

  // Handle blur for "From" field
  const handleFromBlur = useCallback(() => {
    setTimeout(() => {
      setIsEditingFrom(false);
      const isValid = cities.some(city => extractCityName(city).toLowerCase() === fromValue.toLowerCase());
      if (!isValid && fromValue !== fromCity) {
        setFromValue(fromCity);
      }
    }, 200);
  }, [fromValue, fromCity]);

  // Handle blur for "To" field
  const handleToBlur = useCallback(() => {
    setTimeout(() => {
      setIsEditingTo(false);
      const isValid = cities.some(city => extractCityName(city).toLowerCase() === toValue.toLowerCase());
      if (!isValid && toValue !== toCity) {
        setToValue(toCity);
      }
    }, 200);
  }, [toValue, toCity]);

  return (
    <div className="border-b bg-white overflow-x-hidden">
      <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4 max-w-7xl">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 justify-center">
          <div className="flex items-center gap-0 sm:gap-2 rounded-lg border border-gray-300 bg-white text-[#022444] overflow-x-auto scrollbar-hide w-full sm:w-auto shrink-0" style={{ height: '48px' }}>
            <div className="flex items-center border-r px-2 sm:px-4 py-2 sm:py-3 relative shrink-0" style={{ height: '48px', width: '120px', minWidth: '120px', maxWidth: '120px' }}>
              <CityInputField
                value={fromValue}
                code={fromCode}
                placeholder="Откуда"
                excludeCity={toValue}
                isEditing={isEditingFrom}
                onEdit={() => setIsEditingFrom(true)}
                onChange={setFromValue}
                onSelect={handleFromSelect}
                onBlur={handleFromBlur}
              />
            </div>
            <div className="flex items-center border-r px-2 sm:px-4 py-2 sm:py-3 relative shrink-0" style={{ height: '48px', width: '120px', minWidth: '120px', maxWidth: '120px' }}>
              <CityInputField
                value={toValue}
                code={toCode}
                placeholder="Куда"
                excludeCity={fromValue}
                isEditing={isEditingTo}
                onEdit={() => setIsEditingTo(true)}
                onChange={setToValue}
                onSelect={handleToSelect}
                onBlur={handleToBlur}
              />
            </div>
            <DatePickerField
              selectedDate={selectedDate}
              onSelect={handleDateSelect}
              isOpen={isDatePickerOpen}
              onOpenChange={setIsDatePickerOpen}
            />
            <ReturnDatePickerField
              selectedDate={selectedDate}
              returnDate={selectedReturnDate}
              onSelect={handleReturnDateSelect}
              onRemove={handleRemoveReturnDate}
              minDate={selectedDate}
              isOpen={isReturnDatePickerOpen}
              onOpenChange={setIsReturnDatePickerOpen}
            />
            <PassengerInfoField passengerCount={1} tariff="Эконом" />
          </div>
          <SearchButton onClick={handleSearchClick} />
        </div>
      </div>
    </div>
  );
}

