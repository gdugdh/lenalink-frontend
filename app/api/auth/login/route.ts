import { NextRequest, NextResponse } from 'next/server';
import { loginMock, createSession } from '@/app/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email и пароль обязательны' },
        { status: 400 }
      );
    }

    const user = await loginMock(email, password);

    if (!user) {
      return NextResponse.json(
        { message: 'Неверный email или пароль' },
        { status: 401 }
      );
    }

    await createSession(user);

    const session = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
        balance: user.balance,
      },
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    };

    return NextResponse.json({
      message: 'Вход выполнен успешно',
      session,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}

