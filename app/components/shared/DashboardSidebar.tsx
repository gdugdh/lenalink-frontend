'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/app/lib/utils';
import { cloneElement, isValidElement } from 'react';
import type { UserRole } from '@/app/lib/mockUsers';

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

interface DashboardSidebarProps {
  role: UserRole;
  items: NavItem[];
}

export function DashboardSidebar({ role, items }: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r bg-white">
      <nav className="flex-1 space-y-1 p-4">
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
            .replace(/\btext-(primary|muted-foreground|foreground|primary-foreground)\b/g, '')
            .trim();
          
          const iconWithColor = isValidElement(item.icon)
            ? cloneElement(item.icon as React.ReactElement<any>, {
                className: cn(
                  cleanedClassName,
                  'transition-colors',
                  isActive ? 'text-primary-foreground' : 'text-muted-foreground'
                ),
              })
            : item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              {iconWithColor}
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

