import type { Metadata } from "next";
import { InsuranceSelectionPageClient } from "./InsuranceSelectionPageClient";

export const metadata: Metadata = {
  title: 'Выбор тарифа | LenaLink',
  description: 'Выберите тариф для вашего бронирования с различными условиями изменения и возврата',
  openGraph: {
    title: 'Выбор тарифа | LenaLink',
    description: 'Выберите подходящий тариф для вашего маршрута',
  },
};

export default function InsuranceSelectionPage() {
  return <InsuranceSelectionPageClient />;
}
