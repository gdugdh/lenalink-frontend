import type { PassengerType, TariffType, SeatType, SeatSelection } from './booking-context';
import type { RouteData } from '@/app/components/features/search/SearchResults';

// Вспомогательная функция для извлечения цены из маршрута
export function extractPriceFromRoute(route: RouteData | null | undefined): number | undefined {
  if (!route?.price) return undefined;
  const priceString = route.price.replace(/\s/g, '').replace(/₽/g, '').trim();
  const price = parseInt(priceString);
  return isNaN(price) ? undefined : price;
}

// Базовые цены для разных типов пассажиров
const BASE_PRICES: Record<PassengerType, number> = {
  adult: 41256,
  child: 30942, // 75% от взрослого
  infant: 4126, // 10% от взрослого
};

// Доплаты за тарифы (фиксированные суммы)
const TARIFF_FEES: Record<TariffType, number> = {
  tarif1: 0,     // 0₽
  tarif2: 2244,  // 2 244₽
  tarif3: 4244,  // 4 244₽
  tarif4: 6244,  // 6 244₽
};

// Доплаты за места (только для авиа-сегментов)
const SEAT_FEES: Record<SeatType, number> = {
  random: 0,            // 0₽ (случайный выбор)
  window: 3000,         // 3 000₽ (у окна)
  aisle: 2300,          // 2 300₽ (у прохода)
  extra_legroom: 7900,  // 7 900₽ (дополнительное пространство для ног)
};

export interface PriceBreakdown {
  basePrice: number;
  tariffFee: number;
  totalSeatFees: number;  // Сумма всех выбранных мест
  insuranceFee: number;   // Страховка (опционально)
  total: number;
}

// Новая функция для расчета с учетом массива мест
export function calculatePrice(
  passengerType: PassengerType,
  tariff: TariffType,
  seatSelections: SeatSelection[],
  includeInsurance: boolean,
  basePriceFromRoute?: number
): PriceBreakdown {
  // Используем цену из маршрута, если она предоставлена, иначе используем базовую цену по типу пассажира
  const basePrice = basePriceFromRoute
    ? (passengerType === 'adult'
        ? basePriceFromRoute
        : passengerType === 'child'
          ? Math.round(basePriceFromRoute * 0.75)
          : Math.round(basePriceFromRoute * 0.1))
    : BASE_PRICES[passengerType];

  const tariffFee = TARIFF_FEES[tariff];

  // Считаем общую стоимость всех выбранных мест
  const totalSeatFees = (seatSelections || []).reduce((sum, selection) => {
    return sum + SEAT_FEES[selection.seat_type];
  }, 0);

  // Страховка (примерно 5% от базовой цены, если включена)
  const insuranceFee = includeInsurance ? Math.round(basePrice * 0.05) : 0;

  // Итого = Цена рейса + Тариф + Все места + Страховка
  const total = basePrice + tariffFee + totalSeatFees + insuranceFee;

  return {
    basePrice,
    tariffFee,
    totalSeatFees,
    insuranceFee,
    total,
  };
}

export function getPassengerTypeLabel(type: PassengerType): string {
  const labels: Record<PassengerType, string> = {
    adult: 'взрослый',
    child: 'ребёнок',
    infant: 'младенец',
  };
  return labels[type];
}

export function getTariffName(tariff: TariffType): string {
  const names: Record<TariffType, string> = {
    tarif1: 'Базовый',
    tarif2: 'Стандарт',
    tarif3: 'Комфорт',
    tarif4: 'Премиум',
  };
  return names[tariff];
}

export function getTariffPrice(tariff: TariffType): number {
  return TARIFF_FEES[tariff];
}

export function getSeatName(seat: SeatType): string {
  const names: Record<SeatType, string> = {
    random: 'Случайный выбор места',
    window: 'У окна',
    aisle: 'У прохода',
    extra_legroom: 'Дополнительное пространство для ног',
  };
  return names[seat];
}

export function getSeatPrice(seat: SeatType): number {
  return SEAT_FEES[seat];
}

