/**
 * Хук для фильтрации маршрутов
 */

import { useState, useEffect, useCallback } from 'react';
import type { RouteData } from '../components/features/search/SearchResults';
import type { FilterState } from '../components/features/search/SearchFilters';

export function useRouteFilters(
  allRoutes: RouteData[],
  initialFilters: FilterState
) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Функция применения фильтров
  const applyFilters = useCallback((routesToFilter: RouteData[], currentFilters: FilterState): RouteData[] => {
    let filtered = [...routesToFilter];

    // Фильтр по багажу (показываем priceDetails вместо price)
    if (currentFilters.withBaggage) {
      // В этом случае мы просто показываем маршруты с багажом
      // В реальном приложении это может быть отдельное поле в данных
    }

    // Фильтр по количеству пересадок
    if (currentFilters.transfers.length > 0) {
      filtered = filtered.filter(route => {
        // Извлекаем количество пересадок из строки "1 пересадка" или undefined
        let transferCount = 0;
        if (route.transfers) {
          const match = route.transfers.match(/(\d+)/);
          if (match) {
            transferCount = parseInt(match[1]);
          }
        }
        return currentFilters.transfers.includes(transferCount);
      });
    }

    // Другие фильтры можно добавить позже, когда будут соответствующие данные

    return filtered;
  }, []);

  // Вычисляем отфильтрованные маршруты
  const filteredRoutes = applyFilters(allRoutes, filters);

  return {
    filters,
    setFilters,
    filteredRoutes,
    applyFilters,
  };
}

