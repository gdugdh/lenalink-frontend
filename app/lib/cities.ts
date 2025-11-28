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

// Координаты городов для отображения на карте
export const cityCoordinates: Record<string, [number, number]> = {
  'Москва': [55.7558, 37.6173],
  'Якутск': [62.0355, 129.6755],
  'Мирный': [62.5353, 114.0239],
  'Нерюнгри': [56.6639, 124.7139],
  'Удачный': [66.4167, 112.4000],
  'Олекминск': [60.4076, 120.4279],
  'Ленск': [60.7333, 114.9167],
  'Покровск': [61.4833, 129.1500],
  'Тикси': [71.6333, 128.8667],
  'Верхоянск': [67.5500, 133.3833],
  'Оймякон': [63.4606, 142.7856],
  'Вилюйск': [63.7539, 121.6231],
  'Нюрба': [63.2833, 118.3333],
  'Сунтар': [62.1500, 117.6333],
  'Нижний Бестях': [62.0167, 129.8667],
  'Томмот': [58.9667, 126.2833],
  'Алдан': [58.6167, 125.3833],
};

// Получение координат города по названию
export const getCityCoordinates = (cityName: string): [number, number] | null => {
  if (!cityName) return null;
  const name = extractCityName(cityName);
  return cityCoordinates[name] || null;
};

// Маппинг кода аэропорта на название города
export const airportCodeToCity: Record<string, string> = {
  'MOW': 'Москва',
  'YKS': 'Якутск',
  'MJZ': 'Мирный',
  'NER': 'Нерюнгри',
  'UDP': 'Удачный',
  'OLZ': 'Олекминск',
  'ULK': 'Ленск',
  'PKC': 'Покровск',
  'IKS': 'Тикси',
  'VHV': 'Верхоянск',
  'OYM': 'Оймякон',
  'VYI': 'Вилюйск',
  'NYR': 'Нюрба',
  'SUY': 'Сунтар',
  'NBE': 'Нижний Бестях',
  'TMT': 'Томмот',
  'ADN': 'Алдан',
};

// Получение названия города по коду аэропорта
export const getCityNameByCode = (code: string): string => {
  return airportCodeToCity[code] || code;
};

