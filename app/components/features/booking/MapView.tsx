'use client';

import { useState, useEffect } from 'react';
import { MapContainer } from './MapContainer';

export function MapView() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const markers = [
    { position: [55.7558, 37.6173] as [number, number], label: 'Москва' },
    { position: [62.0355, 129.6755] as [number, number], label: 'Якутск' },
    { position: [60.4076, 120.4279] as [number, number], label: 'Олекминск' },
  ];

  const routeLine = {
    points: [
      [55.7558, 37.6173],
      [62.0355, 129.6755],
      [60.4076, 120.4279],
    ] as Array<[number, number]>,
    color: '#7B91FF',
  };

  return (
    <div className="rounded-lg border bg-white p-2 sm:p-3 md:p-4">
      <h3 className="mb-2 sm:mb-3 text-sm sm:text-base md:text-lg font-bold text-[#022444]">
        КАРТА
      </h3>
      {isMounted ? (
        <MapContainer
          center={[60.0, 105.0]}
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

