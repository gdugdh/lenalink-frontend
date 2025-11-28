/**
 * Утилиты для преобразования данных бронирования
 */

import type { PassengerData } from '../lib/booking-context';
import type { Session } from '../lib/types/auth.types';
import type { Passenger } from './backend-api';

export function transformPassengerDataToApiFormat(
  passengerData: PassengerData,
  session: Session | null
): Passenger {
  // Преобразуем дату рождения
  const birthDate = `${passengerData.birthYear}-${passengerData.birthMonth.padStart(2, '0')}-${passengerData.birthDay.padStart(2, '0')}`;

  return {
    first_name: passengerData.firstName,
    last_name: passengerData.lastName,
    middle_name: passengerData.middleName || '',
    date_of_birth: birthDate,
    passport_number: passengerData.passportNumber || '0000 000000', // Заглушка, если не указан
    email: passengerData.email || session?.user.email || '',
    phone: passengerData.phone || '+79000000000', // Заглушка, если не указан
  };
}

