import { NextResponse } from 'next/server';
import { getSession } from '@/app/lib/auth';

export async function GET() {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { message: 'Сессия не найдена' },
        { status: 401 }
      );
    }

    return NextResponse.json(session);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Session error:', error);
    }
    return NextResponse.json(
      { message: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}

