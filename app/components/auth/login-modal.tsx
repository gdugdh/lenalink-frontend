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
import { LoginFormFields } from './LoginFormFields';
import { LoginFormFooter } from './LoginFormFooter';

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToRegister?: () => void;
}

export function LoginModal({ open, onOpenChange, onSwitchToRegister }: LoginModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, session } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close modal if user is already logged in
  useEffect(() => {
    if (session && open) {
      onOpenChange(false);
    }
  }, [session, open, onOpenChange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const session = await login(email, password);

      toast({
        title: 'Успешный вход',
        description: 'Вы успешно вошли в систему',
      });

      // Close modal
      onOpenChange(false);

      // Reset form
      setEmail('');
      setPassword('');
      setShowPassword(false);

      // Get redirect parameter or default to dashboard
      const redirectTo = searchParams.get('redirect') || `/dashboard/${session.user.role}`;
      router.push(redirectTo);
      router.refresh(); // Refresh to update header
    } catch (error) {
      // Log error for debugging
      console.error('Login error:', error);

      // Переводим сообщения об ошибках на русский язык
      let errorMessage = 'Произошла ошибка при входе. Попробуйте снова.';

      if (error instanceof Error) {
        const errorText = error.message.toLowerCase();

        // Log original error message
        console.error('Error message:', error.message);

        if (errorText.includes('invalid email') || errorText.includes('invalid password') || errorText.includes('неверный')) {
          errorMessage = 'Неверный email или пароль';
        } else if (errorText.includes('network') || errorText.includes('fetch') || errorText.includes('failed to fetch')) {
          errorMessage = 'Ошибка сети. Проверьте подключение к интернету';
        } else if (errorText.includes('timeout')) {
          errorMessage = 'Превышено время ожидания. Попробуйте позже';
        } else if (errorText.includes('401') || errorText.includes('unauthorized')) {
          errorMessage = 'Неверный email или пароль';
        } else if (errorText.includes('403') || errorText.includes('forbidden')) {
          errorMessage = 'Доступ запрещен';
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
        title: 'Ошибка входа',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    onOpenChange(newOpen);
    // Reset form when closing
    if (!newOpen) {
      setEmail('');
      setPassword('');
      setShowPassword(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Вход в систему</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <LoginFormFields
            email={email}
            password={password}
            showPassword={showPassword}
            isSubmitting={isSubmitting}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />
          <LoginFormFooter
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
            onSwitchToRegister={() => {
              handleOpenChange(false);
              onSwitchToRegister?.();
            }}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
