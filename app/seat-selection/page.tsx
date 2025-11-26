import type { Metadata } from "next";
import { SeatSelectionPageClient } from "./SeatSelectionPageClient";

export const metadata: Metadata = {
  title: 'Выбор места | LenaLink',
  description: 'Выберите место для вашего рейса с дополнительными опциями комфорта',
  openGraph: {
    title: 'Выбор места | LenaLink',
    description: 'Выберите место для вашего рейса',
  },
};

export default function SeatSelectionPage() {
  return <SeatSelectionPageClient />;
}
