/**
 * Хук для загрузки и управления маршрутами
 */

import { useState, useEffect } from 'react';
import { backendApi, type Route as BackendRoute } from '../lib/backend-api';
import { transformBackendRouteToRouteData } from '../lib/route-transforms';
import { extractCityName, getCitySlug } from '../lib/cities';
import type { RouteData } from '../components/features/search/SearchResults';

export function useRoutes(fromCity: string, toCity: string, dateParam: string) {
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [allRoutes, setAllRoutes] = useState<RouteData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadRoutes = async () => {
      if (!fromCity || !toCity) {
        setRoutes([]);
        setAllRoutes([]);
        setError(null);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        // Преобразуем названия городов в формат бэкенда (английские slug'и)
        const fromSlug = getCitySlug(fromCity);
        const toSlug = getCitySlug(toCity);
        
        // Используем дату из параметров или сегодняшнюю дату
        const departureDate = dateParam || new Date().toISOString().split('T')[0];
        
        const response = await backendApi.searchRoutes({
          from: fromSlug,
          to: toSlug,
          departure_date: departureDate,
          passengers: 1,
        });

        // Детальное логирование для отладки
        if (process.env.NODE_ENV === 'development') {
          console.log('API response:', response);
          console.log('Response type:', typeof response);
          console.log('Response keys:', response ? Object.keys(response) : 'null');
        }

        // Проверяем, что response и routes существуют
        if (!response) {
          if (process.env.NODE_ENV === 'development') {
            console.error('API returned null or undefined response');
          }
          setRoutes([]);
          setAllRoutes([]);
          return;
        }

        // Проверяем разные возможные форматы ответа
        let routes: BackendRoute[] = [];
        
        if (Array.isArray(response)) {
          // Если ответ - это массив маршрутов напрямую
          routes = response;
          if (process.env.NODE_ENV === 'development') {
            console.log('Response is array, routes count:', routes.length);
          }
        } else if (response.data && response.data.routes && Array.isArray(response.data.routes)) {
          // Если ответ содержит поле data.routes (новый формат API)
          routes = response.data.routes;
          if (process.env.NODE_ENV === 'development') {
            console.log('Response has data.routes field, routes count:', routes.length);
          }
        } else if (response.routes && Array.isArray(response.routes)) {
          // Если ответ содержит поле routes напрямую (старый формат)
          routes = response.routes;
          if (process.env.NODE_ENV === 'development') {
            console.log('Response has routes field, routes count:', routes.length);
          }
        } else if (response.data && Array.isArray(response.data)) {
          // Если ответ содержит поле data как массив
          routes = response.data;
          if (process.env.NODE_ENV === 'development') {
            console.log('Response has data field as array, routes count:', routes.length);
          }
        } else {
          if (process.env.NODE_ENV === 'development') {
            console.warn('API response missing routes array. Full response:', JSON.stringify(response, null, 2));
          }
          setRoutes([]);
          setAllRoutes([]);
          return;
        }

        if (routes.length === 0) {
          if (process.env.NODE_ENV === 'development') {
            console.log('No routes found in response');
          }
          setRoutes([]);
          setAllRoutes([]);
          return;
        }

        const transformedRoutes = routes.map((route, index) =>
          transformBackendRouteToRouteData(route, index)
        );
        
        setAllRoutes(transformedRoutes);
        setRoutes(transformedRoutes); // Изначально показываем все маршруты
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Error loading routes:', err);
        }
        setError(err instanceof Error ? err : new Error('Ошибка загрузки маршрутов'));
        setRoutes([]);
        setAllRoutes([]);
      } finally {
        setLoading(false);
      }
    };

    loadRoutes();
  }, [fromCity, toCity, dateParam]);

  return { routes, allRoutes, loading, error };
}

