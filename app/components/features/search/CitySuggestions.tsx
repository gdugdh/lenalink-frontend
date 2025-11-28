'use client';

interface CitySuggestionsProps {
  suggestions: string[];
  showSuggestions: boolean;
  position: { top: number; left: number };
  onSelect: (city: string) => void;
  suggestionsRef: React.RefObject<HTMLDivElement>;
}

export function CitySuggestions({
  suggestions,
  showSuggestions,
  position,
  onSelect,
  suggestionsRef,
}: CitySuggestionsProps) {
  if (!showSuggestions) return null;

  return (
    <div
      ref={suggestionsRef}
      className="fixed z-[9999] bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: '120px',
        minWidth: '120px',
        maxWidth: '120px',
      }}
    >
      {suggestions.length > 0 ? (
        suggestions.map((city, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(city)}
            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors first:rounded-t-lg last:rounded-b-lg"
          >
            {city}
          </button>
        ))
      ) : (
        <div className="px-3 py-2 text-sm text-gray-500 text-center">
          Мы ничего не нашли
        </div>
      )}
    </div>
  );
}

