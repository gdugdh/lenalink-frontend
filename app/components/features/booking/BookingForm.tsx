'use client';

import type React from 'react';
import { useState } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { routes } from '@/app/lib/routes';
import { useRouter } from 'next/navigation';
import { useBooking, type PassengerType } from '@/app/lib/booking-context';

export function BookingForm() {
  const router = useRouter();
  const { bookingState, setPassengerType } = useBooking();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    citizenship: '',
    gender: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
  });

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
    // Здесь можно добавить валидацию и отправку данных
    router.push(routes.insuranceSelection);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      <div className="rounded-lg border bg-white p-3 sm:p-4 md:p-6">
        <div className="mb-3 sm:mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#022444]">
            Данные пассажира
          </h2>
          <Select 
            value={bookingState.passengerType} 
            onValueChange={(value) => setPassengerType(value as PassengerType)}
          >
            <SelectTrigger className="w-full sm:w-[200px] md:w-[250px] h-8 sm:h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="adult">Взрослый (старше 12 лет)</SelectItem>
              <SelectItem value="child">Ребёнок (2-12 лет)</SelectItem>
              <SelectItem value="infant">Младенец (до 2 лет)</SelectItem>
            </SelectContent>
          </Select>
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

        <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="firstName" className="text-sm sm:text-base text-[#022444]">
              Имя
            </Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Например: Ivan"
              required
              className="h-8 sm:h-9 text-sm sm:text-base"
            />
          </div>
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="lastName" className="text-sm sm:text-base text-[#022444]">
              Фамилия(-и)
            </Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Например: Petrov"
              required
              className="h-8 sm:h-9 text-sm sm:text-base"
            />
          </div>
        </div>

        <div className="mt-3 sm:mt-4 grid gap-3 sm:gap-4 md:grid-cols-3">
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="citizenship" className="text-sm sm:text-base text-[#022444]">
              Гражданство
            </Label>
            <Select value={formData.citizenship} onValueChange={(value) => handleSelectChange('citizenship', value)}>
              <SelectTrigger id="citizenship" className="h-8 sm:h-9 text-sm sm:text-base">
                <SelectValue placeholder="Выбрать" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ru">Россия</SelectItem>
                <SelectItem value="de">Германия</SelectItem>
                <SelectItem value="us">США</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5 sm:space-y-2">
            <Label htmlFor="gender" className="text-sm sm:text-base text-[#022444]">
              Пол
            </Label>
            <Select value={formData.gender} onValueChange={(value) => handleSelectChange('gender', value)}>
              <SelectTrigger id="gender" className="h-8 sm:h-9 text-sm sm:text-base">
                <SelectValue placeholder="Выбрать" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Мужской</SelectItem>
                <SelectItem value="female">Женский</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5 sm:space-y-2">
            <Label className="text-sm sm:text-base text-[#022444]">Дата рождения</Label>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              <Input
                id="birthDay"
                value={formData.birthDay}
                onChange={handleInputChange}
                placeholder="ДД"
                required
                className="h-8 sm:h-9 text-sm sm:text-base text-center"
              />
              <Input
                id="birthMonth"
                value={formData.birthMonth}
                onChange={handleInputChange}
                placeholder="ММ"
                required
                className="h-8 sm:h-9 text-sm sm:text-base text-center"
              />
              <Input
                id="birthYear"
                value={formData.birthYear}
                onChange={handleInputChange}
                placeholder="ГГГГ"
                required
                className="h-8 sm:h-9 text-sm sm:text-base text-center"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row justify-between gap-2 sm:gap-0">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="text-[#022444] h-9 sm:h-10 text-sm sm:text-base w-full sm:w-auto"
        >
          Назад
        </Button>
        <Button
          type="submit"
          className="bg-[#7B91FF] hover:bg-[#E16D32] h-9 sm:h-10 text-sm sm:text-base w-full sm:w-auto"
        >
          Продолжить
        </Button>
      </div>
    </form>
  );
}

