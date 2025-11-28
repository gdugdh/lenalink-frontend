'use client';

import { TimelinePoint } from './TimelinePoint';
import { TimelineConnector } from './TimelineConnector';

interface RouteTimelineProps {
  departureTime: string;
  departureCity: string;
  departureDate: string;
  arrivalTime: string;
  arrivalCity: string;
  arrivalDate: string;
  duration: string;
  transfers?: string;
  routeCodes?: string[];
}

export function RouteTimeline({
  departureTime,
  departureCity,
  departureDate,
  arrivalTime,
  arrivalCity,
  arrivalDate,
  duration,
  transfers,
  routeCodes,
}: RouteTimelineProps) {
  return (
    <div className="flex flex-1 items-center gap-2 sm:gap-4 min-w-0">
      <TimelinePoint
        time={departureTime}
        city={departureCity}
        date={departureDate}
        align="left"
      />
      <TimelineConnector
        duration={duration}
        transfers={transfers}
        routeCodes={routeCodes}
      />
      <TimelinePoint
        time={arrivalTime}
        city={arrivalCity}
        date={arrivalDate}
        align="right"
      />
    </div>
  );
}

