// Маппинг русских названий городов в английские slug'и для API
const cityNameToSlug: Record<string, string> = {
  'москва': 'moscow',
  'якутск': 'yakutsk',
  'мирный': 'mirny',
  'нерюнгри': 'neryungri',
  'удачный': 'udachny',
  'олекминск': 'olekminsk',
  'ленск': 'lensky',
  'покровск': 'pokrovsk',
  'тикси': 'tiksi',
  'верхоянск': 'verkhoyansk',
  'оймякон': 'oymyakon',
  'вилюйск': 'vilyuysk',
  'нюрба': 'nyurba',
  'сунтар': 'suntar',
  'нижний бестях': 'nizhny_bestyakh',
  'томмот': 'tommot',
  'алдан': 'aldan',
};

// Функция для преобразования названия города в slug для API
export function getCitySlug(cityName: string): string {
  if (!cityName) return '';
  
  // Извлекаем только название города (без страны)
  const name = extractCityName(cityName).toLowerCase().trim();
  
  // Ищем в маппинге
  if (cityNameToSlug[name]) {
    return cityNameToSlug[name];
  }
  
  // Если не найдено, преобразуем в транслит (простая версия)
  // Удаляем пробелы и дефисы, заменяем на дефисы
  return name
    .replace(/\s+/g, '-')
    .replace(/[^a-zа-яё0-9-]/g, '')
    .toLowerCase();
}

// Список популярных городов для автокомплита
export const cities = [
  'Москва, Россия',
  'Якутск, Якутия',
  'Мирный, Якутия',
  'Нерюнгри, Якутия',
  'Удачный, Якутия',
  'Олекминск, Якутия',
  'Ленск, Якутия',
  'Покровск, Якутия',
  'Тикси, Якутия',
  'Верхоянск, Якутия',
  'Оймякон, Якутия',
  'Вилюйск, Якутия',
  'Нюрба, Якутия',
  'Сунтар, Якутия',
  'Нижний Бестях, Якутия',
  'Томмот, Якутия',
  'Алдан, Якутия',
] as const;

// Маппинг городов на коды аэропортов
export const cityCodeMap: Record<string, string> = {
  'Москва': 'MOW',
  'Якутск': 'YKS',
  'Мирный': 'MJZ',
  'Нерюнгри': 'NER',
  'Удачный': 'UDP',
  'Олекминск': 'OLZ',
  'Ленск': 'ULK',
  'Покровск': 'PKC',
  'Тикси': 'IKS',
  'Верхоянск': 'VHV',
  'Оймякон': 'OYM',
  'Вилюйск': 'VYI',
  'Нюрба': 'NYR',
  'Сунтар': 'SUY',
  'Нижний Бестях': 'NBE',
  'Томмот': 'TMT',
  'Алдан': 'ADN',
};

// Извлечение названия города из полной строки
export const extractCityName = (fullCity: string): string => {
  if (!fullCity) return '';
  const parts = fullCity.split(',');
  return parts[0]?.trim() || fullCity;
};

// Получение кода города
export const getCityCode = (cityName: string): string => {
  return cityCodeMap[cityName] || cityName.substring(0, 3).toUpperCase();
};

// Получение списка популярных городов (первые N городов)
export const getPopularCities = (limit: number = 5, excludeCity?: string): string[] => {
  const excludeCityName = excludeCity ? extractCityName(excludeCity).toLowerCase() : '';
  
  return cities
    .filter(city => {
      if (!excludeCityName) return true;
      const cityName = extractCityName(city).toLowerCase();
      return cityName !== excludeCityName;
    })
    .slice(0, limit);
};

