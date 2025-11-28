'use client';

import { Search } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';

interface HomeSearchButtonProps {
  isValid: boolean;
  searchUrl: string;
}

export function HomeSearchButton({ isValid, searchUrl }: HomeSearchButtonProps) {
  if (isValid) {
    return (
      <Link href={searchUrl}>
        <Button className="w-full bg-[#7B91FF] hover:bg-[#E16D32] text-white text-sm sm:text-base font-medium py-3 sm:py-4 md:py-6 h-auto">
          <Search className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Найти варианты
        </Button>
      </Link>
    );
  }

  return (
    <Button 
      disabled 
      className="w-full bg-gray-400 cursor-not-allowed text-white text-sm sm:text-base font-medium py-3 sm:py-4 md:py-6 h-auto"
    >
      <Search className="mr-1.5 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
      Найти варианты
    </Button>
  );
}

