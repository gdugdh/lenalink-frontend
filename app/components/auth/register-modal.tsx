'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { useToast } from '@/app/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import { Progress } from '@/app/components/ui/progress';
import { RegisterFormFields } from './RegisterFormFields';
import { RoleSelector } from './RoleSelector';
import { RegisterFormFooter } from './RegisterFormFooter';
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
      const session = await register(email, password, name.trim(), role);

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
      const redirectTo = searchParams.get('redirect') || `/dashboard/${session.user.role}`;
      router.push(redirectTo);
      router.refresh(); // Refresh to update header
    } catch (error) {
      // Log error for debugging
      console.error('Registration error:', error);

      // Обработка ошибок
      let errorMessage = 'Произошла ошибка при регистрации. Попробуйте снова.';

      if (error instanceof Error) {
        const errorText = error.message.toLowerCase();

        // Log original error message
        console.error('Error message:', error.message);

        if (errorText.includes('user already exists') || errorText.includes('пользователь') || errorText.includes('существует')) {
          errorMessage = 'Пользователь с таким email уже существует';
        } else if (errorText.includes('network') || errorText.includes('fetch') || errorText.includes('failed to fetch')) {
          errorMessage = 'Ошибка сети. Проверьте подключение к интернету';
        } else if (errorText.includes('timeout')) {
          errorMessage = 'Превышено время ожидания. Попробуйте позже';
        } else if (errorText.includes('400') || errorText.includes('bad request')) {
          errorMessage = 'Неверные данные. Проверьте правильность введенной информации';
        } else if (errorText.includes('500') || errorText.includes('server')) {
          errorMessage = 'Ошибка сервера. Попробуйте позже';
        } else if (error.message && error.message.trim().length > 0) {
          // Используем оригинальное сообщение, если оно не пустое
          errorMessage = error.message;
        }
      } else if (typeof error === 'string' && error.trim().length > 0) {
        errorMessage = error;
      }

      // Ensure error message is not empty
      if (!errorMessage || errorMessage.trim().length === 0) {
        errorMessage = 'Произошла неизвестная ошибка. Пожалуйста, попробуйте позже.';
      }

      toast({
        title: 'Ошибка регистрации',
        description: errorMessage,
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
            <RoleSelector selectedRole={role} onRoleChange={setRole} />
            <RegisterFormFooter
              step="role"
              isSubmitting={false}
              onContinue={handleRoleSelect}
            />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <RegisterFormFields
              formData={{ name, email, password, confirmPassword }}
              showPassword={showPassword}
              showConfirmPassword={showConfirmPassword}
              isSubmitting={isSubmitting}
              onChange={(field, value) => {
                if (field === 'name') setName(value);
                else if (field === 'email') setEmail(value);
                else if (field === 'password') setPassword(value);
                else if (field === 'confirmPassword') setConfirmPassword(value);
              }}
              onTogglePassword={() => setShowPassword(!showPassword)}
              onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
            />
            <RegisterFormFooter
              step="details"
              isSubmitting={isSubmitting}
              onBack={() => setStep('role')}
              onSubmit={handleSubmit}
            />
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
