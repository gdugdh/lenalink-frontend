'use client';

import { Plane } from 'lucide-react';

interface TimelineConnectorProps {
  duration: string;
  transfers?: string;
  routeCodes?: string[];
}

export function TimelineConnector({ duration, transfers, routeCodes }: TimelineConnectorProps) {
  return (
    <div className="hidden min-[376px]:flex flex-1 flex-col items-center min-w-0">
      <div className="mb-1 text-xs text-[#022444] text-center">
        {duration}
        {transfers && `, ${transfers}`}
      </div>
      <div className="relative w-full">
        <div className="h-px w-full bg-[#022444]"></div>
        <Plane className="absolute left-1/2 top-1/2 h-3 w-3 sm:h-4 sm:w-4 -translate-x-1/2 -translate-y-1/2 rotate-90 text-[#558DCA]" />
      </div>
      {routeCodes && (
        <div className="mt-1 flex items-center gap-1 sm:gap-2 text-xs flex-wrap justify-center">
          {routeCodes.map((code, index) => (
            <span
              key={index}
              className={
                index === 1
                  ? 'font-medium text-[#7B91FF]'
                  : 'text-[#558DCA]'
              }
            >
              {code}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

