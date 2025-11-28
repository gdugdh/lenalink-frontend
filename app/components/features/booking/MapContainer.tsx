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
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    console.log('MapContainer: Initializing with', {
      center,
      zoom,
      markers,
      routeLine,
      markersCount: markers.length,
      routePointsCount: routeLine?.points.length,
    });

    const initializeMap = () => {
      if (
        mapRef.current &&
        typeof window !== 'undefined' &&
        (window as any).ymaps
      ) {
        (window as any).ymaps.ready(() => {
          // Очищаем предыдущую карту если она есть
          if (mapInstanceRef.current) {
            mapInstanceRef.current.destroy();
            mapInstanceRef.current = null;
          }

          const map = new (window as any).ymaps.Map(mapRef.current, {
            center,
            zoom,
            controls: ['zoomControl'],
          });

          mapInstanceRef.current = map;

          console.log('MapContainer: Map created', map);

          if (routeLine && routeLine.points.length > 0) {
            console.log('MapContainer: Adding route line', routeLine.points);
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

          markers.forEach((marker, index) => {
            console.log(`MapContainer: Adding marker ${index}`, marker);
            const placemark = new (window as any).ymaps.Placemark(
              marker.position,
              {
                balloonContent: marker.label,
              },
            );
            map.geoObjects.add(placemark);
          });

          console.log('MapContainer: All objects added');
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

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, [isMounted, center, zoom, markers, routeLine]);

  return (
    <div
      ref={mapRef}
      className="h-[200px] sm:h-[250px] md:h-[300px] w-full rounded-lg bg-gray-100"
    />
  );
}

