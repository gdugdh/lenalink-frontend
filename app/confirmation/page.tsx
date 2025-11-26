import type { Metadata } from "next";
import { ConfirmationPageClient } from "./ConfirmationPageClient";

export const metadata: Metadata = {
  title: 'Подтверждение бронирования | LenaLink',
  description: 'Ваше бронирование успешно подтверждено. Детали отправлены на ваш email.',
  openGraph: {
    title: 'Бронирование подтверждено | LenaLink',
    description: 'Ваше бронирование успешно подтверждено',
  },
};

export default function ConfirmationPage() {
  return <ConfirmationPageClient />;
}
