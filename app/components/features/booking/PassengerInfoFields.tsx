'use client';

import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';

interface PassengerInfoFieldsProps {
  formData: {
    firstName: string;
    lastName: string;
    citizenship: string;
    gender: string;
    birthDay: string;
    birthMonth: string;
    birthYear: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (field: string, value: string) => void;
}

export function PassengerInfoFields({
  formData,
  onInputChange,
  onSelectChange,
}: PassengerInfoFieldsProps) {
  return (
    <>
      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="firstName" className="text-sm sm:text-base text-[#022444]">
            Имя
          </Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={onInputChange}
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
            onChange={onInputChange}
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
          <Select value={formData.citizenship} onValueChange={(value) => onSelectChange('citizenship', value)}>
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
          <Select value={formData.gender} onValueChange={(value) => onSelectChange('gender', value)}>
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
              onChange={onInputChange}
              placeholder="ДД"
              required
              className="h-8 sm:h-9 text-sm sm:text-base text-center"
            />
            <Input
              id="birthMonth"
              value={formData.birthMonth}
              onChange={onInputChange}
              placeholder="ММ"
              required
              className="h-8 sm:h-9 text-sm sm:text-base text-center"
            />
            <Input
              id="birthYear"
              value={formData.birthYear}
              onChange={onInputChange}
              placeholder="ГГГГ"
              required
              className="h-8 sm:h-9 text-sm sm:text-base text-center"
            />
          </div>
        </div>
      </div>
    </>
  );
}

