'use client';

import { ReactNode } from 'react';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { NavLink, type NavGroup } from '@/types/sidebar';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export function NavGroupp({ title, items }: NavGroup) {
  const href = usePathname();
  return (
    <SidebarGroup className="">
      <SidebarGroupLabel>{title}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const key = `${item.title}-${item.url}`;

          if (!item.items)
            return (
              <SidebarMenuLink
                key={key}
                href={href}
                item={{
                  url: item.url,
                  icon: item.icon,
                  title: item.title,
                  enabled: item.enabled,
                }}
              />
            );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

const NavBadge = ({ children }: { children: ReactNode }) => (
  <Badge className="rounded-full px-1 py-0 text-xs">{children}</Badge>
);
const SidebarMenuLink = ({ item, href }: { item: NavLink; href: string }) => {
  const { setOpenMobile, state } = useSidebar();
  const isActive = checkIsActive(href, item.url);
  const IconComponent = item.icon;
  const isCollapsed = state === 'collapsed';

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        tooltip={item.title}
        variant="default"
        className={cn(
          'rounded-xl my-1 flex items-center transition-all duration-300 group overflow-hidden',
          isActive
            ? 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 font-bold shadow-[0_0_15px_rgba(234,179,8,0.1)] border-yellow-500/20 border'
            : 'text-muted-foreground hover:bg-accent hover:text-foreground',
          isCollapsed ? 'justify-center px-0' : 'px-2'
        )}
      >
        <Link
          href={item.url}
          onClick={() => setOpenMobile(false)}
          className="flex w-full py-2 items-center"
        >
          <div className={cn(
            "flex items-center w-full",
            isCollapsed ? "justify-center" : "px-2"
          )}>
            {IconComponent && (
              <div className={cn(
                "p-1.5 rounded-lg transition-colors shrink-0 flex items-center justify-center",
                isActive 
                  ? "bg-yellow-500 text-white shadow-lg shadow-yellow-500/20" 
                  : "group-hover:bg-yellow-500/10 group-hover:text-yellow-500"
              )}>
                <IconComponent className="h-4 w-4" />
              </div>
            )}
            {!isCollapsed && (
              <>
                <span className="ml-3 flex-1 text-sm truncate transition-opacity duration-300">
                  {item.title}
                </span>
                {item.badge && <NavBadge>{item.badge}</NavBadge>}
              </>
            )}
          </div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

function normalizePath(path: string) {
  const segments = path.split('/').filter(Boolean);

  const first = segments[0];
  if (first && first.length === 2) {
    segments.shift();
  }

  // Remove query params and trailing slash
  const cleanPath = '/' + segments.join('/');
  return cleanPath.endsWith('/') && cleanPath !== '/'
    ? cleanPath.slice(0, -1)
    : cleanPath;
}

function checkIsActive(href: string, itemUrl: string) {
  const current = normalizePath(href);
  const target = normalizePath(itemUrl);

  return current === target;
}
