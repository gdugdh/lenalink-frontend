/**
 * Hook for loading and managing routes
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
        // Convert city names to backend format (English slugs)
        const fromSlug = getCitySlug(fromCity);
        const toSlug = getCitySlug(toCity);
        
        // Use date from parameters or today's date
        const departureDate = dateParam || new Date().toISOString().split('T')[0];
        
        const response = await backendApi.searchRoutes({
          from: fromSlug,
          to: toSlug,
          departure_date: departureDate,
          passengers: 1,
        });

        // Detailed logging for debugging
        if (process.env.NODE_ENV === 'development') {
          console.log('API response:', response);
          console.log('Response type:', typeof response);
          console.log('Response keys:', response ? Object.keys(response) : 'null');
        }

        // Check that response and routes exist
        if (!response) {
          if (process.env.NODE_ENV === 'development') {
            console.error('API returned null or undefined response');
          }
          setRoutes([]);
          setAllRoutes([]);
          return;
        }

        // Check different possible response formats
        let routes: BackendRoute[] = [];
        
        if (Array.isArray(response)) {
          // If response is an array of routes directly
          routes = response;
          if (process.env.NODE_ENV === 'development') {
            console.log('Response is array, routes count:', routes.length);
          }
        } else if (response.data && response.data.routes && Array.isArray(response.data.routes)) {
          // If response contains data.routes field (new API format)
          routes = response.data.routes;
          if (process.env.NODE_ENV === 'development') {
            console.log('Response has data.routes field, routes count:', routes.length);
          }
        } else if (response.routes && Array.isArray(response.routes)) {
          // If response contains routes field directly (old format)
          routes = response.routes;
          if (process.env.NODE_ENV === 'development') {
            console.log('Response has routes field, routes count:', routes.length);
          }
        } else if (response.data && Array.isArray(response.data)) {
          // If response contains data field as array
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
        setRoutes(transformedRoutes); // Initially show all routes
      } catch (err) {
        // Handle network errors gracefully
        let errorMessage = 'Не удалось загрузить маршруты';
        
        if (err instanceof Error) {
          // Check if it's a network/server connection error
          if (
            err.message.includes('Failed to connect') ||
            err.message.includes('Failed to fetch') ||
            err.message.includes('NetworkError') ||
            err.message.includes('fetch failed')
          ) {
            errorMessage = 'Сервер недоступен. Проверьте подключение к интернету или попробуйте позже.';
            
            if (process.env.NODE_ENV === 'development') {
              console.warn('Backend server is not available. This is expected if backend is not running.', {
                error: err.message,
                url: 'Check BACKEND_BASE_URL in backend-api.ts'
              });
            }
          } else {
            errorMessage = err.message || 'Ошибка при загрузке маршрутов';
            
            if (process.env.NODE_ENV === 'development') {
              console.error('Error loading routes:', err);
            }
          }
        } else {
          if (process.env.NODE_ENV === 'development') {
            console.error('Unknown error loading routes:', err);
          }
        }
        
        setError(new Error(errorMessage));
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

