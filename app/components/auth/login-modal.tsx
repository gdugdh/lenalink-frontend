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
      await login(email, password);
      
      // Wait a moment for session state to update, then get role from API
      await new Promise((resolve) => setTimeout(resolve, 200));
      
      // Get session from API to get the correct role
      const sessionResponse = await fetch('/api/auth/session', {
        credentials: 'include',
      });
      
      if (sessionResponse.ok) {
        const sessionData = await sessionResponse.json();
        
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
        const redirectTo = searchParams.get('redirect') || `/dashboard/${sessionData.user.role}`;
        router.push(redirectTo);
        router.refresh(); // Refresh to update header
      } else {
        // Handle case when session fetch fails after successful login
        toast({
          title: 'Ошибка получения сессии',
          description: 'Не удалось получить информацию о сессии. Пожалуйста, попробуйте войти снова.',
          variant: 'destructive',
        });
        // Close modal to allow user to retry
        onOpenChange(false);
        // Reset form
        setEmail('');
        setPassword('');
        setShowPassword(false);
      }
    } catch (error) {
      // Переводим сообщения об ошибках на русский язык
      let errorMessage = 'Неверный email или пароль';
      
      if (error instanceof Error) {
        const errorText = error.message.toLowerCase();
        
        if (errorText.includes('invalid email') || errorText.includes('invalid password') || errorText.includes('неверный')) {
          errorMessage = 'Неверный email или пароль';
        } else if (errorText.includes('network') || errorText.includes('fetch')) {
          errorMessage = 'Ошибка сети. Проверьте подключение к интернету';
        } else if (errorText.includes('timeout')) {
          errorMessage = 'Превышено время ожидания. Попробуйте позже';
        } else if (errorText.includes('401') || errorText.includes('unauthorized')) {
          errorMessage = 'Неверный email или пароль';
        } else if (errorText.includes('403') || errorText.includes('forbidden')) {
          errorMessage = 'Доступ запрещен';
        } else if (errorText.includes('500') || errorText.includes('server')) {
          errorMessage = 'Ошибка сервера. Попробуйте позже';
        } else {
          // Используем оригинальное сообщение, если оно на русском или если не можем определить тип ошибки
          errorMessage = error.message;
        }
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
