import type { Metadata } from 'next';
import { LoginClient } from './LoginClient';

export const metadata: Metadata = {
  title: 'Вход | LenaLink',
  description: 'Войдите в свой аккаунт LenaLink',
};

export default function LoginPage() {
  return <LoginClient />;
}

