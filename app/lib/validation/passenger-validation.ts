/**
 * Утилиты для валидации данных пассажира
 */

export interface PassengerFormData {
  firstName: string;
  lastName: string;
  citizenship: string;
  gender: string;
  birthDay: string;
  birthMonth: string;
  birthYear: string;
}

export function validatePassengerData(formData: PassengerFormData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!formData.firstName || !formData.firstName.trim()) {
    errors.push('Имя обязательно для заполнения');
  }

  if (!formData.lastName || !formData.lastName.trim()) {
    errors.push('Фамилия обязательна для заполнения');
  }

  if (!formData.citizenship) {
    errors.push('Гражданство обязательно для заполнения');
  }

  if (!formData.gender) {
    errors.push('Пол обязателен для заполнения');
  }

  if (!formData.birthDay || !formData.birthMonth || !formData.birthYear) {
    errors.push('Дата рождения обязательна для заполнения');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

