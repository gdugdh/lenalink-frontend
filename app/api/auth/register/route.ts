import { NextRequest, NextResponse } from 'next/server';
import { registerMock, createSession } from '@/app/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, role } = body;

    if (!email || !password || !name || !role) {
      return NextResponse.json(
        { message: 'Все поля обязательны' },
        { status: 400 }
      );
    }

    // Only allow 'user' and 'employee' roles for registration
    // 'admin' and 'accountant' roles should be assigned manually by existing admins
    if (!['user', 'employee'].includes(role)) {
      return NextResponse.json(
        { message: 'Недопустимая роль. Доступны только роли: пользователь, сотрудник' },
        { status: 400 }
      );
    }

    try {
      const user = await registerMock(email, password, name, role);
      await createSession(user);

      const session = {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
          balance: user.balance,
          companyId: user.companyId,
          companyName: user.companyName,
          companyBalance: user.companyBalance,
        },
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
      };

      return NextResponse.json({
        message: 'Регистрация выполнена успешно',
        session,
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Ошибка регистрации';
      return NextResponse.json(
        { message: errorMessage },
        { status: 400 }
      );
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Register error:', error);
    }
    return NextResponse.json(
      { message: 'Ошибка сервера' },
      { status: 500 }
    );
  }
}

