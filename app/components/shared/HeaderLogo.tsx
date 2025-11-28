'use client';

import Link from 'next/link';
import Image from 'next/image';

interface HeaderLogoProps {
  href?: string;
}

export function HeaderLogo({ href = '/' }: HeaderLogoProps) {
  return (
    <Link href={href} className="flex items-center gap-1.5 sm:gap-2">
      <div className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-white shrink-0">
        <Image 
          src="/logo.png" 
          alt="LenaLink Logo" 
          fill
          className="object-contain p-1"
          priority
        />
      </div>
      <span className="text-lg sm:text-xl font-semibold text-white">LenaLink</span>
    </Link>
  );
}

