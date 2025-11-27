import type { PassengerType, TariffType, SeatType } from './booking-context';

// Базовые цены для разных типов пассажиров
const BASE_PRICES: Record<PassengerType, number> = {
  adult: 41256,
  child: 30942, // 75% от взрослого
  infant: 4126, // 10% от взрослого
};

// Доплаты за тарифы (относительно базовой цены взрослого)
const TARIFF_FEES: Record<TariffType, number> = {
  tariff1: 0, // Базовая цена
  tariff2: 2244, // +2 244₽
  tariff3: 4244, // +4 244₽
  tariff4: 6244, // +6 244₽
};

// Доплаты за места
const SEAT_FEES: Record<SeatType, number> = {
  random: 0,
  window: 3000,
  aisle: 2300,
  legroom: 7900,
};

export interface PriceBreakdown {
  basePrice: number;
  tariffFee: number;
  seatFee: number;
  total: number;
}

export function calculatePrice(
  passengerType: PassengerType,
  tariff: TariffType,
  seatType: SeatType
): PriceBreakdown {
  const basePrice = BASE_PRICES[passengerType];
  const tariffFee = TARIFF_FEES[tariff];
  const seatFee = SEAT_FEES[seatType];

  // Для детей и младенцев тарифная доплата применяется пропорционально
  const adjustedTariffFee =
    passengerType === 'adult'
      ? tariffFee
      : passengerType === 'child'
        ? Math.round(tariffFee * 0.75)
        : Math.round(tariffFee * 0.1);

  const total = basePrice + adjustedTariffFee + seatFee;

  return {
    basePrice,
    tariffFee: adjustedTariffFee,
    seatFee,
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
    tariff1: 'Тариф 1',
    tariff2: 'Тариф 2',
    tariff3: 'Тариф 3',
    tariff4: 'Тариф 4',
  };
  return names[tariff];
}

export function getSeatName(seat: SeatType): string {
  const names: Record<SeatType, string> = {
    random: 'Случайный выбор места',
    window: 'Окно',
    aisle: 'Проход',
    legroom: 'Дополнительное пространство для ног',
  };
  return names[seat];
}

export function getSeatPrice(seat: SeatType): number {
  return SEAT_FEES[seat];
}

