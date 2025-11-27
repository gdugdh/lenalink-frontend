'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { useToast } from '@/app/hooks/use-toast';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import { Progress } from '@/app/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';
import { ArrowLeft, ArrowRight, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import type { UserRole } from '@/app/lib/mockUsers';

interface RegisterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToLogin?: () => void;
}

type RegisterStep = 'role' | 'details';

export function RegisterModal({ open, onOpenChange, onSwitchToLogin }: RegisterModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register, session } = useAuth();
  const { toast } = useToast();

  const [step, setStep] = useState<RegisterStep>('role');
  const [role, setRole] = useState<UserRole>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close modal if user is already logged in
  useEffect(() => {
    if (session && open) {
      onOpenChange(false);
    }
  }, [session, open, onOpenChange]);

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setStep('role');
      setRole('user');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setName('');
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  }, [open]);

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
      
      // Wait a moment for session state to update, then get role from API
      await new Promise((resolve) => setTimeout(resolve, 200));
      
      // Get session from API to get the correct role
      const sessionResponse = await fetch('/api/auth/session', {
        credentials: 'include',
      });
      
      if (sessionResponse.ok) {
        const sessionData = await sessionResponse.json();
        
        toast({
          title: 'Регистрация успешна',
          description: 'Вы успешно зарегистрированы и вошли в систему',
        });

        // Close modal
        onOpenChange(false);
        
        // Reset form
        setStep('role');
        setRole('user');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setName('');
        setShowPassword(false);
        setShowConfirmPassword(false);
        
        // Get redirect parameter or default to dashboard
        const redirectTo = searchParams.get('redirect') || `/dashboard/${sessionData.user.role}`;
        router.push(redirectTo);
        router.refresh(); // Refresh to update header
      } else {
        toast({
          title: 'Ошибка получения сессии',
          description: 'Не удалось получить информацию о сессии. Пожалуйста, попробуйте зарегистрироваться снова.',
          variant: 'destructive',
        });
        onOpenChange(false);
      }
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

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen);
    if (!newOpen) {
      setStep('role');
      setRole('user');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setName('');
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  };

  const progress = step === 'role' ? 33 : 66;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Регистрация</DialogTitle>
          <div className="pt-4">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Шаг {step === 'role' ? '1' : '2'} из 2</span>
              <span>{progress}%</span>
            </div>
          </div>
        </DialogHeader>
        
        {step === 'role' ? (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base">Выберите тип аккаунта</Label>
              <RadioGroup value={role} onValueChange={(value) => setRole(value as UserRole)}>
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                  <RadioGroupItem value="user" id="modal-role-user" />
                  <Label htmlFor="modal-role-user" className="font-normal cursor-pointer flex-1">
                    <div>
                      <div className="font-semibold">Пользователь</div>
                      <div className="text-sm text-muted-foreground">
                        Покупка билетов и управление бронированиями
                      </div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                  <RadioGroupItem value="partner" id="modal-role-partner" />
                  <Label htmlFor="modal-role-partner" className="font-normal cursor-pointer flex-1">
                    <div>
                      <div className="font-semibold">Партнёр</div>
                      <div className="text-sm text-muted-foreground">
                        Предоставление транспортных услуг
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
              <Label htmlFor="modal-register-name">Имя</Label>
              <Input
                id="modal-register-name"
                type="text"
                placeholder="Иван Иванов"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isSubmitting}
                autoFocus
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="modal-register-email">Email</Label>
              <Input
                id="modal-register-email"
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="modal-register-password">Пароль</Label>
              <div className="relative">
                <Input
                  id="modal-register-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isSubmitting}
                  minLength={6}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  disabled={isSubmitting}
                  aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Минимум 6 символов
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="modal-register-confirm-password">Подтвердите пароль</Label>
              <div className="relative">
                <Input
                  id="modal-register-confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isSubmitting}
                  minLength={6}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  disabled={isSubmitting}
                  aria-label={showConfirmPassword ? 'Скрыть пароль' : 'Показать пароль'}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
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

        <div className="text-center text-sm">
          <span className="text-muted-foreground">
            {step === 'role' ? 'Уже есть аккаунт? ' : ''}
          </span>
          {step === 'role' && onSwitchToLogin && (
            <button
              type="button"
              onClick={() => {
                handleOpenChange(false);
                onSwitchToLogin();
              }}
              className="text-primary hover:underline"
            >
              Войти
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
