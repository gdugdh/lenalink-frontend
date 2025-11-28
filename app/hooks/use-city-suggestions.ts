/**
 * Hook for managing city suggestions dropdown positioning
 */

import { useState, useRef, useEffect, useCallback } from 'react';

interface UseCitySuggestionsPositionProps {
  inputRef: React.RefObject<HTMLInputElement>;
  suggestionsRef: React.RefObject<HTMLDivElement>;
  showSuggestions: boolean;
}

export function useCitySuggestionsPosition({
  inputRef,
  suggestionsRef,
  showSuggestions,
}: UseCitySuggestionsPositionProps) {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  // Update dropdown menu position
  const updatePosition = useCallback(() => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [inputRef]);

  // Update positions on scroll or window resize
  useEffect(() => {
    if (!showSuggestions) return;

    const updatePositions = () => {
      updatePosition();
    };

    window.addEventListener('scroll', updatePositions, true);
    window.addEventListener('resize', updatePositions);
    
    return () => {
      window.removeEventListener('scroll', updatePositions, true);
      window.removeEventListener('resize', updatePositions);
    };
  }, [showSuggestions, updatePosition]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        // This will be handled by parent component
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputRef, suggestionsRef]);

  return {
    position,
    updatePosition,
  };
}

