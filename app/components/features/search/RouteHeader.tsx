'use client';

import { Heart, Share2, Clock } from 'lucide-react';

interface RouteHeaderProps {
  badge: string;
  showClock?: boolean;
  onClockClick?: () => void;
  onFavoriteClick?: () => void;
  onShareClick?: () => void;
}

export function RouteHeader({
  badge,
  showClock = false,
  onClockClick,
  onFavoriteClick,
  onShareClick,
}: RouteHeaderProps) {
  return (
    <div className="mb-3 sm:mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-[#00C48C] px-2 sm:px-3 py-1 text-xs font-medium text-white">
          {badge}
        </span>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        {showClock && (
          <button 
            onClick={onClockClick}
            className="text-[#7B91FF] hover:text-[#E16D32]"
          >
            <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        )}
        <button 
          onClick={onFavoriteClick}
          className="text-[#022444] hover:text-[#7B91FF]"
        >
          <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        <button 
          onClick={onShareClick}
          className="text-[#022444] hover:text-[#558DCA]"
        >
          <Share2 className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
    </div>
  );
}

