'use client';

import { useEffect, useRef, useState } from 'react';

export function MapView() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    // Check if script already exists
    if (document.querySelector('script[src*="api-maps.yandex.ru"]')) {
      // Script already loaded, just initialize map
      if (
        mapRef.current &&
        typeof window !== 'undefined' &&
        (window as any).ymaps
      ) {
        (window as any).ymaps.ready(() => {
          const map = new (window as any).ymaps.Map(mapRef.current, {
            center: [60.0, 105.0],
            zoom: 4,
            controls: ['zoomControl'],
          });

          const routeLine = new (window as any).ymaps.Polyline(
            [
              [55.7558, 37.6173], // Moscow
              [62.0355, 129.6755], // Yakutsk
              [60.4076, 120.4279], // Olekminsk
            ],
            {},
            {
              strokeColor: '#7B91FF',
              strokeWidth: 4,
              strokeStyle: 'solid',
            },
          );

          map.geoObjects.add(routeLine);

          const moscowPlacemark = new (window as any).ymaps.Placemark(
            [55.7558, 37.6173],
            {
              balloonContent: 'Москва',
            },
          );
          map.geoObjects.add(moscowPlacemark);

          const yakutskPlacemark = new (window as any).ymaps.Placemark(
            [62.0355, 129.6755],
            {
              balloonContent: 'Якутск',
            },
          );
          map.geoObjects.add(yakutskPlacemark);

          const olekminskPlacemark = new (window as any).ymaps.Placemark(
            [60.4076, 120.4279],
            {
              balloonContent: 'Олекминск',
            },
          );
          map.geoObjects.add(olekminskPlacemark);
        });
      }
      return;
    }

    const script = document.createElement('script');
    const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;
    script.src = apiKey
      ? `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${apiKey}`
      : 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    script.async = true;
    script.onload = () => {
      if (
        mapRef.current &&
        typeof window !== 'undefined' &&
        (window as any).ymaps
      ) {
        (window as any).ymaps.ready(() => {
          const map = new (window as any).ymaps.Map(mapRef.current, {
            center: [60.0, 105.0],
            zoom: 4,
            controls: ['zoomControl'],
          });

          const routeLine = new (window as any).ymaps.Polyline(
            [
              [55.7558, 37.6173], // Moscow
              [62.0355, 129.6755], // Yakutsk
              [60.4076, 120.4279], // Olekminsk
            ],
            {},
            {
              strokeColor: '#7B91FF',
              strokeWidth: 4,
              strokeStyle: 'solid',
            },
          );

          map.geoObjects.add(routeLine);

          const moscowPlacemark = new (window as any).ymaps.Placemark(
            [55.7558, 37.6173],
            {
              balloonContent: 'Москва',
            },
          );
          map.geoObjects.add(moscowPlacemark);

          const yakutskPlacemark = new (window as any).ymaps.Placemark(
            [62.0355, 129.6755],
            {
              balloonContent: 'Якутск',
            },
          );
          map.geoObjects.add(yakutskPlacemark);

          const olekminskPlacemark = new (window as any).ymaps.Placemark(
            [60.4076, 120.4279],
            {
              balloonContent: 'Олекминск',
            },
          );
          map.geoObjects.add(olekminskPlacemark);
        });
      }
    };
    document.head.appendChild(script);
  }, [isMounted]);

  return (
    <div className="rounded-lg border bg-white p-2 sm:p-3 md:p-4">
      <h3 className="mb-2 sm:mb-3 text-sm sm:text-base md:text-lg font-bold text-[#022444]">
        КАРТА
      </h3>
      {isMounted ? (
        <div
          ref={mapRef}
          className="h-[200px] sm:h-[250px] md:h-[300px] w-full rounded-lg bg-gray-100"
        ></div>
      ) : (
        <div className="h-[200px] sm:h-[250px] md:h-[300px] w-full rounded-lg bg-gray-100 flex items-center justify-center">
          <div className="text-xs sm:text-sm text-[#022444]">Загрузка карты...</div>
        </div>
      )}
    </div>
  );
}

