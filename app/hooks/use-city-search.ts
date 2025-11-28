/**
 * Хук для поиска городов с автодополнением
 */

import { useMemo } from 'react';
import { cities, extractCityName, getPopularCities } from '../lib/cities';

export function useCitySearch(query: string, excludeCity?: string) {
  const suggestions = useMemo(() => {
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
  }, [query, excludeCity]);

  const isValid = useMemo(() => {
    if (!query.trim()) return false;
    return cities.some(city => city.toLowerCase() === query.toLowerCase());
  }, [query]);

  return { suggestions, isValid };
}

