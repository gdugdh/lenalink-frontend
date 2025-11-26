import Link from 'next/link';
import { Button } from '@/app/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h2 className="text-4xl font-bold mb-4 text-[#022444]">404</h2>
      <p className="text-xl mb-2 text-[#022444]">Страница не найдена</p>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        К сожалению, запрашиваемая страница не существует или была перемещена.
      </p>
      <Link href="/">
        <Button className="bg-[#7B91FF] hover:bg-[#E16D32] text-white">
          Вернуться на главную
        </Button>
      </Link>
    </div>
  );
}

