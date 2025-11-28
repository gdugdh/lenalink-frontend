'use client';

interface DatePriceItemProps {
  date: Date;
  price: number | null;
  isSelected: boolean;
  onClick: (date: Date) => void;
}

export function DatePriceItem({ date, price, isSelected, onClick }: DatePriceItemProps) {
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
  };

  const formatPrice = (price: number | null): string => {
    if (price === null) return '';
    return price.toLocaleString('ru-RU') + '₽';
  };

  return (
    <button
      onClick={() => onClick(date)}
      className={`flex min-w-[80px] sm:min-w-[100px] flex-col items-center justify-center rounded-lg px-2 sm:px-4 py-2 transition-colors ${
        isSelected
          ? 'bg-[#7B91FF]'
          : 'hover:bg-white/10'
      }`}
    >
      {price !== null ? (
        <>
          <div className={`text-sm sm:text-lg font-bold text-center ${isSelected ? 'text-white' : ''}`}>
            {formatPrice(price)}
          </div>
          <div className={`text-xs text-center ${isSelected ? 'text-white' : 'text-gray-400'}`}>
            {formatDate(date)}
          </div>
        </>
      ) : (
        <div className={`text-xs text-center ${isSelected ? 'text-white' : 'text-gray-400'}`}>
          {formatDate(date)}
        </div>
      )}
    </button>
  );
}

