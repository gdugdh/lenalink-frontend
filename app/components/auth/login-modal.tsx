'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const router = useRouter();
  const { login, session } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
        
        // Redirect to dashboard
        router.push(`/dashboard/${sessionData.user.role}`);
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
      }
    } catch (error) {
      toast({
        title: 'Ошибка входа',
        description: error instanceof Error ? error.message : 'Неверный email или пароль',
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
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Вход в систему</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="modal-email">Email</Label>
            <Input
              id="modal-email"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="modal-password">Пароль</Label>
            <Input
              id="modal-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Вход...' : 'Войти'}
          </Button>
        </form>

        <div className="text-center text-sm">
          <span className="text-muted-foreground">Нет аккаунта? </span>
          <Link 
            href="/auth/register" 
            className="text-primary hover:underline"
            onClick={() => handleOpenChange(false)}
          >
            Зарегистрироваться
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
