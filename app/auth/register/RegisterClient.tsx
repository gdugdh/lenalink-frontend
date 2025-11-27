'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import { useToast } from '@/app/hooks/use-toast';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Skeleton } from '@/app/components/ui/skeleton';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { Progress } from '@/app/components/ui/progress';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import type { UserRole } from '@/app/lib/mockUsers';

type RegisterStep = 'role' | 'details';

export function RegisterClient() {
  const router = useRouter();
  const { register, loading } = useAuth();
  const { toast } = useToast();

  const [step, setStep] = useState<RegisterStep>('role');
  const [role, setRole] = useState<UserRole>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleRoleSelect = () => {
    if (role) {
      setStep('details');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!validateEmail(email)) {
      toast({
        title: 'Ошибка валидации',
        description: 'Пожалуйста, введите корректный email',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    if (!validatePassword(password)) {
      toast({
        title: 'Ошибка валидации',
        description: 'Пароль должен содержать минимум 6 символов',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: 'Ошибка валидации',
        description: 'Пароли не совпадают',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    if (!name.trim()) {
      toast({
        title: 'Ошибка валидации',
        description: 'Пожалуйста, введите ваше имя',
        variant: 'destructive',
      });
      setIsSubmitting(false);
      return;
    }

    try {
      await register(email, password, name.trim(), role);
      
      toast({
        title: 'Регистрация успешна',
        description: 'Вы успешно зарегистрированы и вошли в систему',
      });

      router.push(`/dashboard/${role}`);
    } catch (error) {
      toast({
        title: 'Ошибка регистрации',
        description: error instanceof Error ? error.message : 'Произошла ошибка при регистрации',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading skeleton while checking session
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardHeader>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-10 w-full mb-4" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = step === 'role' ? 33 : 66;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Регистрация</CardTitle>
          <CardDescription className="text-center">
            Создайте новый аккаунт LenaLink
          </CardDescription>
          <div className="pt-4">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Шаг {step === 'role' ? '1' : '2'} из 2</span>
              <span>{progress}%</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {step === 'role' ? (
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-base">Выберите тип аккаунта</Label>
                <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                    <RadioGroupItem value="user" id="role-user" />
                    <Label htmlFor="role-user" className="font-normal cursor-pointer flex-1">
                      <div>
                        <div className="font-semibold">Пользователь</div>
                        <div className="text-sm text-muted-foreground">
                          Покупка билетов и управление бронированиями
                        </div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                    <RadioGroupItem value="partner" id="role-partner" />
                    <Label htmlFor="role-partner" className="font-normal cursor-pointer flex-1">
                      <div>
                        <div className="font-semibold">Партнёр</div>
                        <div className="text-sm text-muted-foreground">
                          Предоставление транспортных услуг
                        </div>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                    <RadioGroupItem value="admin" id="role-admin" />
                    <Label htmlFor="role-admin" className="font-normal cursor-pointer flex-1">
                      <div>
                        <div className="font-semibold">Администратор</div>
                        <div className="text-sm text-muted-foreground">
                          Управление системой и пользователями
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <Button
                onClick={handleRoleSelect}
                className="w-full"
                disabled={!role}
              >
                Продолжить
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Иван Иванов"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isSubmitting}
                  minLength={6}
                />
                <p className="text-xs text-muted-foreground">
                  Минимум 6 символов
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isSubmitting}
                  minLength={6}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep('role')}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Назад
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Регистрация...'
                  ) : (
                    <>
                      Зарегистрироваться
                      <CheckCircle2 className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}

          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">Уже есть аккаунт? </span>
            <Link href="/auth/login" className="text-primary hover:underline">
              Войти
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
