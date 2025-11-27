import type { Metadata } from 'next';
import { RegisterClient } from './RegisterClient';

export const metadata: Metadata = {
  title: 'Регистрация | LenaLink',
  description: 'Создайте новый аккаунт LenaLink',
};

export default function RegisterPage() {
  return <RegisterClient />;
}
