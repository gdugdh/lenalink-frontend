'use client';

import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

interface LoginFormFieldsProps {
  email: string;
  password: string;
  showPassword: boolean;
  isSubmitting: boolean;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onTogglePassword: () => void;
}

export function LoginFormFields({
  email,
  password,
  showPassword,
  isSubmitting,
  onEmailChange,
  onPasswordChange,
  onTogglePassword,
}: LoginFormFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="modal-email">Email</Label>
        <Input
          id="modal-email"
          type="email"
          placeholder="user@example.com"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          required
          disabled={isSubmitting}
          autoFocus
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="modal-password">Пароль</Label>
        <div className="relative">
          <Input
            id="modal-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            required
            disabled={isSubmitting}
            className="pr-10"
          />
          <button
            type="button"
            onClick={onTogglePassword}
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
      </div>
    </>
  );
}

