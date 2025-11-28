import { NextResponse } from 'next/server';
import { clearSession } from '@/app/lib/auth';

export async function POST() {
  try {
    await clearSession();
    return NextResponse.json({ message: 'Выход выполнен успешно' });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Logout error:', error);
    }
    return NextResponse.json(
      { message: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}

