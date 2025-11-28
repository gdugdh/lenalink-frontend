'use client';

import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

interface RegisterFormFieldsProps {
  formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  showPassword: boolean;
  showConfirmPassword: boolean;
  isSubmitting: boolean;
  onChange: (field: string, value: string) => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
}

export function RegisterFormFields({
  formData,
  showPassword,
  showConfirmPassword,
  isSubmitting,
  onChange,
  onTogglePassword,
  onToggleConfirmPassword,
}: RegisterFormFieldsProps) {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="modal-register-name">Имя</Label>
        <Input
          id="modal-register-name"
          type="text"
          placeholder="Иван Иванов"
          value={formData.name}
          onChange={(e) => onChange('name', e.target.value)}
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
          value={formData.email}
          onChange={(e) => onChange('email', e.target.value)}
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
            value={formData.password}
            onChange={(e) => onChange('password', e.target.value)}
            required
            disabled={isSubmitting}
            minLength={6}
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
            value={formData.confirmPassword}
            onChange={(e) => onChange('confirmPassword', e.target.value)}
            required
            disabled={isSubmitting}
            minLength={6}
            className="pr-10"
          />
          <button
            type="button"
            onClick={onToggleConfirmPassword}
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
    </>
  );
}

