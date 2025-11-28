'use client';

import type React from 'react';
import { useState, useEffect } from 'react';
import { routes } from '@/app/lib/routes';
import { useRouter } from 'next/navigation';
import { useBooking, type PassengerData } from '@/app/lib/booking-context';
import { useAuth } from '@/app/context/AuthContext';
import { validatePassengerData } from '@/app/lib/validation/passenger-validation';
import { PassengerTypeSelector } from './PassengerTypeSelector';
import { PassengerInfoFields } from './PassengerInfoFields';
import { BookingFormFooter } from './BookingFormFooter';

export function BookingForm() {
  const router = useRouter();
  const { bookingState, setPassengerType, setPassengerData } = useBooking();
  const { session } = useAuth();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    citizenship: '',
    gender: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
  });

  // Инициализация формы из сохраненных данных или данных пользователя
  useEffect(() => {
    // Если есть сохраненные данные пассажира, используем их
    if (bookingState.passengerData) {
      setFormData({
        firstName: bookingState.passengerData.firstName || '',
        lastName: bookingState.passengerData.lastName || '',
        citizenship: bookingState.passengerData.citizenship || '',
        gender: bookingState.passengerData.gender || '',
        birthDay: bookingState.passengerData.birthDay || '',
        birthMonth: bookingState.passengerData.birthMonth || '',
        birthYear: bookingState.passengerData.birthYear || '',
      });
    } else if (session?.user) {
      // Если нет сохраненных данных, но пользователь авторизован, заполняем из сессии
      const nameParts = session.user.name.trim().split(/\s+/);
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      setFormData(prev => ({
        ...prev,
        firstName: prev.firstName || firstName,
        lastName: prev.lastName || lastName,
        // Гражданство по умолчанию - Россия, если не заполнено
        citizenship: prev.citizenship || 'ru',
      }));
    }
  }, [session, bookingState.passengerData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация
    const validation = validatePassengerData(formData);
    if (!validation.isValid) {
      // Можно показать ошибки пользователю
      return;
    }
    
    // Сохраняем данные пассажира в контекст
    const passengerData: PassengerData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      citizenship: formData.citizenship,
      gender: formData.gender,
      birthDay: formData.birthDay,
      birthMonth: formData.birthMonth,
      birthYear: formData.birthYear,
    };
    
    setPassengerData(passengerData);
    router.push(routes.insuranceSelection);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="rounded-lg border bg-white p-3 sm:p-4 md:p-6">
        <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#022444]">
            Данные пассажира
          </h2>
          <PassengerTypeSelector
            value={bookingState.passengerType}
            onChange={setPassengerType}
          />
        </div>

        <div className="mb-3 sm:mb-4 rounded-lg bg-blue-50 p-2 sm:p-3 md:p-4">
          <div className="flex gap-1.5 sm:gap-2">
            <span className="text-[#558DCA] text-base sm:text-lg mx-1 sm:mx-3 font-bold shrink-0">
              ℹ
            </span>
            <p className="text-xs sm:text-sm text-[#022444]">
              Чтобы избежать трудностей при посадке, укажите имена и фамилии{' '}
              <strong>в точности, как они написаны в паспорте</strong>.
            </p>
          </div>
        </div>

        <PassengerInfoFields
          formData={formData}
          onInputChange={handleInputChange}
          onSelectChange={handleSelectChange}
        />
      </div>

      <BookingFormFooter onSubmit={handleSubmit} />
    </form>
  );
}

