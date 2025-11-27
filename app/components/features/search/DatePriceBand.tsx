'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { Calendar, ChevronLeftIcon, ChevronRight } from 'lucide-react';

interface DatePriceBandProps {
  currentDate?: string; // Дата в формате YYYY-MM-DD
}

interface DateItem {
  date: Date;
  price: number | null;
  isSelected: boolean;
}

export function DatePriceBand({ currentDate }: DatePriceBandProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [dates, setDates] = useState<DateItem[]>([]);
  const [visibleRange, setVisibleRange] = useState({ start: -3, end: 10 }); // Показываем 3 дня назад и 10 дней вперед

  // Функция для парсинга даты из строки YYYY-MM-DD
  const parseDateFromString = useCallback((dateString: string): Date => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }, []);

  // Генерация списка дат
  useEffect(() => {
    const baseDate = currentDate ? parseDateFromString(currentDate) : new Date();
    const newDates: DateItem[] = [];
    
    // Сохраняем текущую позицию прокрутки
    const container = scrollContainerRef.current;
    const scrollLeft = container?.scrollLeft || 0;
    const scrollWidth = container?.scrollWidth || 0;
    
    // Генерируем даты от start до end
    for (let i = visibleRange.start; i <= visibleRange.end; i++) {
      const date = new Date(baseDate);
      date.setDate(date.getDate() + i);
      
      // Определяем, является ли это выбранной датой
      const isSelected = i === 0;
      
      // Генерируем случайную цену для демонстрации (в реальном приложении это будет из API)
      // Используем seed на основе даты для стабильности цен
      const seed = date.getTime();
      const price = isSelected ? 20884 : Math.floor(20000 + (seed % 5000));
      
      newDates.push({
        date,
        price,
        isSelected,
      });
    }
    
    setDates(newDates);
    
    // Восстанавливаем позицию прокрутки после обновления
    if (container && scrollWidth > 0) {
      // Используем requestAnimationFrame для восстановления позиции после рендера
      requestAnimationFrame(() => {
        if (container) {
          const newScrollWidth = container.scrollWidth;
          // Сохраняем относительную позицию
          const ratio = scrollLeft / scrollWidth;
          container.scrollLeft = newScrollWidth * ratio;
        }
      });
    }
  }, [currentDate, visibleRange, parseDateFromString]);

  // Форматирование даты для отображения
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
  };

  // Форматирование цены
  const formatPrice = (price: number | null): string => {
    if (price === null) return '';
    return price.toLocaleString('ru-RU') + '₽';
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 200; // Шаг прокрутки в пикселях
      container.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      });
      
      // Проверяем, достигли ли мы начала списка, и добавляем новые даты назад
      const { scrollLeft } = container;
      const isNearStart = scrollLeft <= 100; // 100px от начала
      
      if (isNearStart) {
        // Добавляем еще 5 дат назад
        setVisibleRange(prev => ({ ...prev, start: prev.start - 5 }));
      }
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 200; // Шаг прокрутки в пикселях
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
      
      // Проверяем, достигли ли мы конца списка, и добавляем новые даты
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const isNearEnd = scrollLeft + clientWidth >= scrollWidth - 100; // 100px до конца
      
      if (isNearEnd) {
        // Добавляем еще 5 дат вперед
        setVisibleRange(prev => ({ ...prev, end: prev.end + 5 }));
      }
    }
  };

  // Обработчик клика по дате
  const handleDateClick = (date: Date) => {
    // В будущем здесь можно добавить навигацию на страницу поиска с новой датой
    const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    console.log('Selected date:', dateString);
  };

  return (
    <div className="bg-[#1A1A1A] text-white overflow-x-hidden">
      <div className="container mx-auto px-2 sm:px-4 max-w-full">
        <div className="flex items-center justify-center gap-2 sm:gap-4 py-3 sm:py-4 overflow-x-auto scrollbar-hide">
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs sm:text-sm">Цены на соседние даты</span>
          </div>
          <button
            onClick={scrollLeft}
            className="rounded-full p-2 hover:bg-white/10 shrink-0 transition-colors"
            aria-label="Прокрутить влево"
          >
            <ChevronLeftIcon className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
          <div
            ref={scrollContainerRef}
            className="flex gap-1 sm:gap-2 overflow-x-auto scrollbar-hide"
          >
            {dates.map((dateItem, index) => (
              <button
                key={`${dateItem.date.toISOString()}-${index}`}
                onClick={() => handleDateClick(dateItem.date)}
                className={`flex min-w-[80px] sm:min-w-[100px] flex-col items-center justify-center rounded-lg px-2 sm:px-4 py-2 transition-colors ${
                  dateItem.isSelected
                    ? 'bg-[#7B91FF]'
                    : 'hover:bg-white/10'
                }`}
              >
                {dateItem.price !== null ? (
                  <>
                    <div className="text-sm sm:text-lg font-bold text-center">
                      {formatPrice(dateItem.price)}
                    </div>
                    <div className={`text-xs text-center ${dateItem.isSelected ? '' : 'text-gray-400'}`}>
                      {formatDate(dateItem.date)}
                    </div>
                  </>
                ) : (
                  <div className="text-xs sm:text-sm text-gray-400 text-center">
                    {formatDate(dateItem.date)}
                  </div>
                )}
              </button>
            ))}
          </div>
          <button
            onClick={scrollRight}
            className="rounded-full p-2 hover:bg-white/10 shrink-0 transition-colors"
            aria-label="Прокрутить вправо"
          >
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

