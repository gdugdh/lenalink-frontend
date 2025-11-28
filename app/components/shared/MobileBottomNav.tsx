'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/app/lib/utils';
import { cloneElement, isValidElement } from 'react';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

interface MobileBottomNavProps {
  items: NavItem[];
}

export function MobileBottomNav({ items }: MobileBottomNavProps) {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-white">
      <div className="flex items-center justify-around h-16">
        {items.map((item) => {
          // For main dashboard pages (like /dashboard/admin), check exact match only
          // For subpages (like /dashboard/admin/users), check exact match or startsWith
          const isExactMatch = pathname === item.href;
          const isSubpage = pathname?.startsWith(item.href + '/');
          
          // Check if this is a main dashboard page (ends with role like /admin, /user, etc.)
          const isMainDashboardPage = /\/dashboard\/(admin|user|employee|accountant)$/.test(item.href);
          
          // Main dashboard pages should only be active on exact match
          // Other pages can be active on exact match or as parent of current page
          const isActive = isMainDashboardPage 
            ? isExactMatch 
            : (isExactMatch || isSubpage);
          
          // Clone icon and apply active/inactive classes
          // Remove any existing text color classes and apply the correct one
          const existingClassName = (item.icon as React.ReactElement<any>)?.props?.className || '';
          const cleanedClassName = existingClassName
            .replace(/\btext-(primary|muted-foreground|foreground)\b/g, '')
            .trim();
          
          const iconWithColor = isValidElement(item.icon)
            ? cloneElement(item.icon as React.ReactElement<any>, {
                className: cn(
                  cleanedClassName,
                  'transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                ),
              })
            : item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-0 flex-1 h-full transition-colors'
              )}
              title={item.title}
            >
              {iconWithColor}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

