'use client';

import { useEffect } from 'react';
import { Button } from '@/app/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h2 className="text-2xl font-bold mb-4 text-[#022444]">Что-то пошло не так!</h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Произошла ошибка при загрузке страницы. Пожалуйста, попробуйте обновить страницу.
      </p>
      <div className="flex gap-4">
        <Button onClick={reset} className="bg-[#7B91FF] hover:bg-[#E16D32] text-white">
          Попробовать снова
        </Button>
        <Button 
          onClick={() => window.location.href = '/'} 
          variant="outline"
          className="border-[#7B91FF] text-[#7B91FF] hover:bg-[#7B91FF] hover:text-white"
        >
          На главную
        </Button>
      </div>
    </div>
  );
}

