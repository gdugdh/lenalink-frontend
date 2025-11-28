'use client';

import { Button } from '@/app/components/ui/button';
import { useRouter } from 'next/navigation';

interface BookingFormFooterProps {
  onSubmit: () => void;
}

export function BookingFormFooter({ onSubmit }: BookingFormFooterProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col-reverse sm:flex-row justify-between gap-2 sm:gap-0">
      <Button
        type="button"
        variant="outline"
        onClick={() => router.back()}
        className="text-[#022444] h-9 sm:h-10 text-sm sm:text-base w-full sm:w-auto"
      >
        Назад
      </Button>
      <Button
        type="submit"
        onClick={onSubmit}
        className="bg-[#7B91FF] hover:bg-[#E16D32] h-9 sm:h-10 text-sm sm:text-base w-full sm:w-auto"
      >
        Продолжить
      </Button>
    </div>
  );
}

