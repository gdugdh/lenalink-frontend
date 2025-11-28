'use client';

import { Button } from '@/app/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

interface RegisterFormFooterProps {
  step: 'role' | 'details';
  isSubmitting: boolean;
  onBack?: () => void;
  onSubmit?: () => void;
  onContinue?: () => void;
}

export function RegisterFormFooter({
  step,
  isSubmitting,
  onBack,
  onSubmit,
  onContinue,
}: RegisterFormFooterProps) {
  if (step === 'role') {
    return (
      <Button
        onClick={onContinue}
        className="w-full"
        disabled={false}
      >
        Продолжить
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    );
  }

  return (
    <div className="flex gap-2">
      <Button
        type="button"
        variant="outline"
        onClick={onBack}
        disabled={isSubmitting}
        className="flex-1"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Назад
      </Button>
      <Button
        type="submit"
        onClick={onSubmit}
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
  );
}

