// Маппинг русских названий городов в английские slug'и для API
const cityNameToSlug: Record<string, string> = {
  'москва': 'moscow',
  'санкт-петербург': 'saint-petersburg',
  'новосибирск': 'novosibirsk',
  'екатеринбург': 'ekaterinburg',
  'казань': 'kazan',
  'нижний новгород': 'nizhny-novgorod',
  'челябинск': 'chelyabinsk',
  'самара': 'samara',
  'омск': 'omsk',
  'ростов-на-дону': 'rostov-on-don',
  'уфа': 'ufa',
  'красноярск': 'krasnoyarsk',
  'воронеж': 'voronezh',
  'пермь': 'perm',
  'волгоград': 'volgograd',
  'краснодар': 'krasnodar',
  'саратов': 'saratov',
  'тюмень': 'tyumen',
  'тольятти': 'tolyatti',
  'якутск': 'yakutsk',
  'иркутск': 'irkutsk',
  'барнаул': 'barnaul',
  'ульяновск': 'ulyanovsk',
  'томск': 'tomsk',
  'кемерово': 'kemerovo',
  'новокузнецк': 'novokuznetsk',
  'рязань': 'ryazan',
  'астрахань': 'astrakhan',
  'пенза': 'penza',
  'липецк': 'lipetsk',
  'тула': 'tula',
  'киров': 'kirov',
  'чебоксары': 'cheboksary',
  'калининград': 'kaliningrad',
  'курск': 'kursk',
  'ставрополь': 'stavropol',
  'сочи': 'sochi',
  'улан-удэ': 'ulan-ude',
  'магнитогорск': 'magnitogorsk',
  'орел': 'orel',
  'олекминск': 'olekminsk',
  'махачкала': 'makhachkala',
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
  'Олекминск, Якутия',
  'Санкт-Петербург, Россия',
  'Новосибирск, Россия',
  'Екатеринбург, Россия',
  'Казань, Россия',
  'Нижний Новгород, Россия',
  'Челябинск, Россия',
  'Самара, Россия',
  'Омск, Россия',
  'Ростов-на-Дону, Россия',
  'Уфа, Россия',
  'Красноярск, Россия',
  'Воронеж, Россия',
  'Пермь, Россия',
  'Волгоград, Россия',
  'Краснодар, Россия',
  'Саратов, Россия',
  'Тюмень, Россия',
  'Тольятти, Россия',
  'Якутск, Якутия',
  'Иркутск, Россия',
  'Барнаул, Россия',
  'Ульяновск, Россия',
  'Томск, Россия',
  'Кемерово, Россия',
  'Новокузнецк, Россия',
  'Рязань, Россия',
  'Астрахань, Россия',
  'Пенза, Россия',
  'Липецк, Россия',
  'Тула, Россия',
  'Киров, Россия',
  'Чебоксары, Россия',
  'Калининград, Россия',
  'Курск, Россия',
  'Улан-Удэ, Бурятия',
  'Ставрополь, Россия',
  'Сочи, Россия',
  'Махачкала, Дагестан',
] as const;

// Маппинг городов на коды аэропортов
export const cityCodeMap: Record<string, string> = {
  'Москва': 'MOW',
  'Олекминск': 'OLZ',
  'Санкт-Петербург': 'LED',
  'Новосибирск': 'OVB',
  'Екатеринбург': 'SVX',
  'Казань': 'KZN',
  'Нижний Новгород': 'GOJ',
  'Челябинск': 'CEK',
  'Самара': 'KUF',
  'Омск': 'OMS',
  'Ростов-на-Дону': 'ROV',
  'Уфа': 'UFA',
  'Красноярск': 'KJA',
  'Воронеж': 'VOZ',
  'Пермь': 'PEE',
  'Волгоград': 'VOG',
  'Краснодар': 'KRR',
  'Саратов': 'RTW',
  'Тюмень': 'TJM',
  'Тольятти': 'TOL',
  'Якутск': 'YKS',
  'Иркутск': 'IKT',
  'Барнаул': 'BAX',
  'Ульяновск': 'ULY',
  'Томск': 'TOF',
  'Кемерово': 'KEJ',
  'Новокузнецк': 'NOZ',
  'Рязань': 'RZN',
  'Астрахань': 'ASF',
  'Пенза': 'PEZ',
  'Липецк': 'LPK',
  'Тула': 'TLA',
  'Киров': 'KVX',
  'Чебоксары': 'CSY',
  'Калининград': 'KGD',
  'Курск': 'URS',
  'Улан-Удэ': 'UUD',
  'Ставрополь': 'STW',
  'Сочи': 'AER',
  'Махачкала': 'MCX',
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

