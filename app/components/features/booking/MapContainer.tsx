'use client';

import { useEffect, useRef, useState } from 'react';

interface MapContainerProps {
  center: [number, number];
  zoom: number;
  markers: Array<{
    position: [number, number];
    label: string;
  }>;
  routeLine?: {
    points: Array<[number, number]>;
    color: string;
  };
}

export function MapContainer({ center, zoom, markers, routeLine }: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const initializeMap = () => {
      if (
        mapRef.current &&
        typeof window !== 'undefined' &&
        (window as any).ymaps
      ) {
        (window as any).ymaps.ready(() => {
          const map = new (window as any).ymaps.Map(mapRef.current, {
            center,
            zoom,
            controls: ['zoomControl'],
          });

          if (routeLine) {
            const polyline = new (window as any).ymaps.Polyline(
              routeLine.points,
              {},
              {
                strokeColor: routeLine.color,
                strokeWidth: 4,
                strokeStyle: 'solid',
              },
            );
            map.geoObjects.add(polyline);
          }

          markers.forEach((marker) => {
            const placemark = new (window as any).ymaps.Placemark(
              marker.position,
              {
                balloonContent: marker.label,
              },
            );
            map.geoObjects.add(placemark);
          });
        });
      }
    };

    if (document.querySelector('script[src*="api-maps.yandex.ru"]')) {
      initializeMap();
      return;
    }

    const script = document.createElement('script');
    const apiKey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;
    script.src = apiKey
      ? `https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=${apiKey}`
      : 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    script.async = true;
    script.onload = initializeMap;
    document.head.appendChild(script);
  }, [isMounted, center, zoom, markers, routeLine]);

  return (
    <div
      ref={mapRef}
      className="h-[200px] sm:h-[250px] md:h-[300px] w-full rounded-lg bg-gray-100"
    />
  );
}

