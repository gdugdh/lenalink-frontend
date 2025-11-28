/**
 * Хук для вычисления статистики цен по фильтрам
 */

import { useMemo } from 'react';
import type { RouteData } from '../components/features/search/SearchResults';
import type { FilterState } from '../components/features/search/SearchFilters';

export function useFilterStats(
  routes: RouteData[],
  filters: FilterState,
  loading: boolean
) {
  const priceStats = useMemo(() => {
    if (!routes || routes.length === 0 || loading) {
      return {
        withBaggage: null,
        transfers: {
          0: null,
          1: null,
          2: null,
          3: null,
        },
      };
    }

    // Фильтруем маршруты по текущим фильтрам (кроме багажа и пересадок)
    let filteredRoutes = routes;

    // Применяем фильтры пересадок, если выбраны
    if (filters.transfers.length > 0) {
      filteredRoutes = filteredRoutes.filter(route => {
        const transferCount = route.transfers ? parseInt(route.transfers) : 0;
        return filters.transfers.includes(transferCount);
      });
    }

    // Вычисляем минимальные цены
    const withBaggagePrice = filteredRoutes.length > 0
      ? Math.min(...filteredRoutes.map(r => {
          const price = parseInt(r.priceDetails?.replace(/\D/g, '') || r.price.replace(/\D/g, ''));
          return isNaN(price) ? Infinity : price;
        }))
      : null;

    // Группируем по количеству пересадок
    const transfersByCount: Record<number, RouteData[]> = { 0: [], 1: [], 2: [], 3: [] };
    filteredRoutes.forEach(route => {
      // Извлекаем количество пересадок из строки "1 пересадка" или undefined
      let transferCount = 0;
      if (route.transfers) {
        const match = route.transfers.match(/(\d+)/);
        if (match) {
          transferCount = parseInt(match[1]);
        }
      }
      if (transferCount >= 0 && transferCount <= 3) {
        transfersByCount[transferCount].push(route);
      }
    });

    const transferPrices: Record<number, number | null> = { 0: null, 1: null, 2: null, 3: null };
    Object.keys(transfersByCount).forEach(key => {
      const count = parseInt(key);
      const routesForCount = transfersByCount[count];
      if (routesForCount.length > 0) {
        const minPrice = Math.min(...routesForCount.map(r => {
          const price = parseInt(r.price.replace(/\D/g, ''));
          return isNaN(price) ? Infinity : price;
        }));
        transferPrices[count] = isFinite(minPrice) ? minPrice : null;
      }
    });

    return {
      withBaggage: withBaggagePrice && isFinite(withBaggagePrice) ? withBaggagePrice : null,
      transfers: transferPrices,
    };
  }, [routes, filters.transfers, loading]);

  return { priceStats };
}

