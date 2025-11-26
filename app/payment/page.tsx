import type { Metadata } from "next";
import { PaymentPageClient } from "./PaymentPageClient";

export const metadata: Metadata = {
  title: 'Оплата | LenaLink',
  description: 'Завершите оплату вашего бронирования выбранным способом',
  openGraph: {
    title: 'Оплата | LenaLink',
    description: 'Завершите оплату бронирования',
  },
};

export default function PaymentPage() {
  return <PaymentPageClient />;
}
