'use client';

import { useState, useEffect, useMemo } from 'react';
import { MapContainer } from './MapContainer';
import { useBooking } from '@/app/lib/booking-context';
import { getCityCoordinates, extractCityName, getCityNameByCode } from '@/app/lib/cities';

export function MapView() {
  const [isMounted, setIsMounted] = useState(false);
  const { bookingState } = useBooking();
  const route = bookingState.selectedRoute;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Вычисляем маркеры и линию маршрута на основе выбранного маршрута
  const { markers, routeLine, center } = useMemo(() => {
    // Дефолтные значения если маршрут не выбран
    const defaultDepartureCity = 'Москва';
    const defaultArrivalCity = 'Якутск';

    const departureCity = route?.departureCity || defaultDepartureCity;
    const arrivalCity = route?.arrivalCity || defaultArrivalCity;

    // Получаем координаты городов
    const departureCityName = extractCityName(departureCity);
    const arrivalCityName = extractCityName(arrivalCity);

    const departureCoords = getCityCoordinates(departureCityName);
    const arrivalCoords = getCityCoordinates(arrivalCityName);

    // Если есть routeCodes, строим маршрут с промежуточными точками
    const routeCodes = route?.routeCodes || [];
    const markersArray: Array<{ position: [number, number]; label: string }> = [];
    const pointsArray: Array<[number, number]> = [];

    console.log('MapView Debug:', {
      route,
      routeCodes,
      departureCity,
      arrivalCity,
      departureCityName,
      arrivalCityName,
      departureCoords,
      arrivalCoords,
    });

    // Если есть routeCodes, используем их для построения маршрута
    if (routeCodes.length > 0) {
      // Строим маршрут используя все коды из routeCodes
      for (let i = 0; i < routeCodes.length; i++) {
        const code = routeCodes[i];
        const cityName = getCityNameByCode(code);
        const coords = getCityCoordinates(cityName);

        console.log('Processing code:', { code, cityName, coords });

        if (coords) {
          markersArray.push({ position: coords, label: cityName });
          pointsArray.push(coords);
        }
      }
    }

    // Если маршрут не построен через routeCodes, пробуем через города
    if (markersArray.length === 0 && departureCoords && arrivalCoords) {
      markersArray.push({ position: departureCoords, label: departureCityName });
      markersArray.push({ position: arrivalCoords, label: arrivalCityName });
      pointsArray.push(departureCoords);
      pointsArray.push(arrivalCoords);
    }

    // Если все еще пусто, используем дефолтные значения
    if (markersArray.length === 0) {
      const moscowCoords = getCityCoordinates('Москва');
      const yakutskCoords = getCityCoordinates('Якутск');

      if (moscowCoords && yakutskCoords) {
        markersArray.push({ position: moscowCoords, label: 'Москва' });
        markersArray.push({ position: yakutskCoords, label: 'Якутск' });
        pointsArray.push(moscowCoords);
        pointsArray.push(yakutskCoords);
      }
    }

    // Вычисляем центр карты
    let mapCenter: [number, number] = [60.0, 105.0]; // Дефолтный центр

    // Если есть точки маршрута, вычисляем центр на основе всех точек
    if (pointsArray.length > 0) {
      const avgLat = pointsArray.reduce((sum, point) => sum + point[0], 0) / pointsArray.length;
      const avgLng = pointsArray.reduce((sum, point) => sum + point[1], 0) / pointsArray.length;
      mapCenter = [avgLat, avgLng];
    } else if (departureCoords && arrivalCoords) {
      mapCenter = [
        (departureCoords[0] + arrivalCoords[0]) / 2,
        (departureCoords[1] + arrivalCoords[1]) / 2,
      ];
    }

    console.log('MapView Result:', {
      markersCount: markersArray.length,
      pointsCount: pointsArray.length,
      center: mapCenter,
      markers: markersArray,
      points: pointsArray,
    });

    return {
      markers: markersArray,
      routeLine: {
        points: pointsArray,
        color: '#7B91FF',
      },
      center: mapCenter,
    };
  }, [route]);

  return (
    <div className="rounded-lg border bg-white p-2 sm:p-3 md:p-4">
      <h3 className="mb-2 sm:mb-3 text-sm sm:text-base md:text-lg font-bold text-[#022444]">
        КАРТА
      </h3>
      {isMounted ? (
        <MapContainer
          center={center}
          zoom={4}
          markers={markers}
          routeLine={routeLine}
        />
      ) : (
        <div className="h-[200px] sm:h-[250px] md:h-[300px] w-full rounded-lg bg-gray-100 flex items-center justify-center">
          <div className="text-xs sm:text-sm text-[#022444]">Загрузка карты...</div>
        </div>
      )}
    </div>
  );
}

