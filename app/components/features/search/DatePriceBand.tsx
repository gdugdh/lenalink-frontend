'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Calendar, ChevronLeftIcon, ChevronRight } from 'lucide-react';

interface DatePriceData {
  date: string; // Дата в формате YYYY-MM-DD
  price: number | null; // Цена или null, если данных нет
}

interface DatePriceBandProps {
  currentDate?: string; // Дата в формате YYYY-MM-DD
  prices?: DatePriceData[]; // Данные о ценах для дат (опционально)
}

interface DateItem {
  date: Date;
  price: number | null;
  isSelected: boolean;
}

export function DatePriceBand({ currentDate, prices = [] }: DatePriceBandProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [dates, setDates] = useState<DateItem[]>([]);
  const [visibleRange, setVisibleRange] = useState({ start: -3, end: 3 }); // Показываем 3 дня назад и 3 дня вперед (всего 7 дат)
  const [selectedDate, setSelectedDate] = useState<string | null>(currentDate || null);

  // Обновляем selectedDate при изменении currentDate
  useEffect(() => {
    if (currentDate) {
      setSelectedDate(currentDate);
    }
  }, [currentDate]);

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
    
    // Создаем Map для быстрого поиска цен по датам
    const pricesMap = new Map<string, number | null>();
    prices.forEach(item => {
      pricesMap.set(item.date, item.price);
    });

    // Генерируем даты от start до end
    for (let i = visibleRange.start; i <= visibleRange.end; i++) {
      const date = new Date(baseDate);
      date.setDate(date.getDate() + i);
      
      // Определяем, является ли это выбранной датой
      const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      const isSelected = selectedDate === dateString || (i === 0 && !selectedDate);
      
      // Ищем цену в переданных данных
      let price: number | null = null;
      if (pricesMap.has(dateString)) {
        price = pricesMap.get(dateString) ?? null;
      }
      // Если prices не передан или для этой даты нет данных, price остается null
      // Не генерируем случайные цены - показываем только дату
      
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
    // Результат будет в формате "13 нояб." (с точкой в конце)
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
    }
  };

  // Обработчик клика по дате
  const handleDateClick = (date: Date) => {
    const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    setSelectedDate(dateString);
    
    // Навигация на страницу поиска с новой датой без перезагрузки страницы
    const from = searchParams.get('from');
    const to = searchParams.get('to');
    
    if (from && to) {
      router.push(`/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${dateString}`);
    } else {
      // Если нет параметров поиска, просто обновляем дату в URL
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set('date', dateString);
      router.push(`/search?${newSearchParams.toString()}`);
    }
  };

  return (
    <div className="bg-[#1A1A1A] text-white overflow-x-hidden">
      <div className="container mx-auto px-2 sm:px-4 max-w-full">
        <div className="flex items-center justify-center gap-2 sm:gap-4 py-3 sm:py-4 max-w-4xl mx-auto">
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs sm:text-sm">Цены на соседние даты</span>
          </div>
          <button
            onClick={scrollLeft}
            className="sm:hidden rounded-full p-2 hover:bg-white/10 shrink-0 transition-colors"
            aria-label="Прокрутить влево"
          >
            <ChevronLeftIcon className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
          <div
            ref={scrollContainerRef}
            className="flex gap-1 sm:gap-2 overflow-x-auto scrollbar-hide sm:overflow-x-visible sm:justify-center sm:flex-nowrap"
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
                    <div className={`text-sm sm:text-lg font-bold text-center ${dateItem.isSelected ? 'text-white' : ''}`}>
                      {formatPrice(dateItem.price)}
                    </div>
                    <div className={`text-xs text-center ${dateItem.isSelected ? 'text-white' : 'text-gray-400'}`}>
                      {formatDate(dateItem.date)}
                    </div>
                  </>
                ) : (
                  <div className={`text-xs text-center ${dateItem.isSelected ? 'text-white' : 'text-gray-400'}`}>
                    {formatDate(dateItem.date)}
                  </div>
                )}
              </button>
            ))}
          </div>
          <button
            onClick={scrollRight}
            className="sm:hidden rounded-full p-2 hover:bg-white/10 shrink-0 transition-colors"
            aria-label="Прокрутить вправо"
          >
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

