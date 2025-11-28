'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/app/components/ui/accordion';

const faqItems = [
  {
    question: 'Как отменить бронирование?',
    answer: 'Вы можете отменить бронирование в разделе "Мои бронирования". Условия возврата зависят от тарифа.',
  },
  {
    question: 'Как получить билет?',
    answer: 'Билет будет отправлен на ваш email после оплаты. Также вы можете скачать его в разделе "Мои бронирования".',
  },
  {
    question: 'Что делать при задержке рейса?',
    answer: 'Мы автоматически уведомим вас о задержках. Вы можете связаться с перевозчиком или нашей поддержкой.',
  },
  {
    question: 'Как изменить данные пассажира?',
    answer: 'Данные пассажира можно изменить до оплаты. После оплаты изменения возможны только через поддержку.',
  },
  {
    question: 'Какие способы оплаты доступны?',
    answer: 'Мы принимаем банковские карты, электронные кошельки и другие популярные способы оплаты.',
  },
];

export function FAQSection() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqItems.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

