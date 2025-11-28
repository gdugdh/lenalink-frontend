'use client';

import { Info } from 'lucide-react';

interface InsurancePlanCardProps {
  plan: 'benefits' | 'basic';
  price: number;
  onSelect: () => void;
  isSelected?: boolean;
}

interface PlanData {
  title: string;
  iconBg: string;
  iconColor: string;
  description: string;
  benefits: string[];
  protections: Array<{ label: string; protected: boolean }>;
  buttonText: string;
  buttonColor: string;
  buttonHover: string;
}

export function InsurancePlanCard({ plan, price, onSelect, isSelected = false }: InsurancePlanCardProps) {
  const planData: PlanData = plan === 'benefits' ? {
    title: 'Benefits',
    iconBg: 'bg-[#7B91FF]/10',
    iconColor: 'text-[#7B91FF]',
    description: 'Получите мгновенный возврат баллами на вашу учетную запись lena.linkpc.net в случае отмены рейса или задержек.',
    benefits: [
      'Дешевле багаж и места',
      'Мгновенный возврат баллами на Счет lena.linkpc.net при отмене рейса',
      'Актуальная информация о задержках и вылетах',
    ],
    protections: [
      { label: 'Отмена или задержка рейса', protected: true },
      { label: 'Отмена или изменение поездки', protected: true },
    ],
    buttonText: `Продолжить за ${Math.round(price * 1.05).toLocaleString('ru-RU')}₽`,
    buttonColor: 'bg-[#7B91FF]',
    buttonHover: 'hover:bg-[#E16D32]',
  } : {
    title: 'Basic',
    iconBg: 'bg-[#558DCA]/10',
    iconColor: 'text-[#558DCA]',
    description: 'Только билет на рейс, ничего больше. Вы можете добавить дополнительные услуги позже.',
    benefits: [
      'Дешевле багаж и места',
      'Мгновенный возврат баллами',
      'Актуальная информация о задержках',
    ],
    protections: [
      { label: 'Отмена или задержка рейса', protected: false },
      { label: 'Отмена или изменение поездки', protected: true },
    ],
    buttonText: `Продолжить за ${price.toLocaleString('ru-RU')}₽`,
    buttonColor: 'bg-[#558DCA]',
    buttonHover: 'hover:bg-[#4A7AB5]',
  };

  return (
    <div className="mb-4 rounded-lg bg-white p-4 sm:p-5 shadow-lg">
      <div className="mb-3 flex items-center gap-2">
        <div className={`flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full ${planData.iconBg}`}>
          <span className={`text-xs sm:text-sm font-bold ${planData.iconColor}`}>K</span>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-[#022444]">{planData.title}</h3>
      </div>

      <div className="mb-3 text-xs sm:text-sm text-[#022444]">
        {planData.description}
      </div>

      <div className="mb-3 space-y-1.5">
        {planData.benefits.map((benefit, index) => (
          <div
            key={index}
            className={`flex items-start gap-2 text-xs ${plan === 'basic' ? 'text-[#022444] line-through' : ''}`}
          >
            <span className={plan === 'basic' ? '' : 'text-green-600'}>✓</span>
            <span className="text-[#022444]">{benefit}</span>
          </div>
        ))}
      </div>

      <button className="text-xs text-[#7B91FF] underline">
        + Подробнее
      </button>

      <div className="mt-3 space-y-2 border-t pt-3">
        {planData.protections.map((protection, index) => (
          <div key={index}>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#022444]">{protection.label}</span>
              <Info className="h-3 w-3 text-[#022444]" />
            </div>
            <div className={`flex items-center gap-1 text-xs ${protection.protected ? 'text-green-600' : 'text-[#558DCA]'}`}>
              <span>✓</span>
              <span className={protection.protected ? '' : 'text-[#022444]'}>
                {protection.protected
                  ? plan === 'benefits' ? 'Защищено lena.linkpc.net' : 'Защитит от правил авиакомпаний'
                  : 'Защитит от правил авиакомпаний'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onSelect}
        className={`mt-4 w-full rounded-lg ${planData.buttonColor} py-2.5 text-sm font-semibold text-white ${planData.buttonHover}`}
      >
        {planData.buttonText}
      </button>
    </div>
  );
}

