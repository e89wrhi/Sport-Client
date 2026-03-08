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
  const { setOpenMobile } = useSidebar();
  const isActive = checkIsActive(href, item.url);
  const IconComponent = item.icon;
  console.info(`icon-${IconComponent}`);
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        tooltip={item.title}
        variant="default"
        className={`
          rounded-full my-2 flex items-center transition-all duration-200
          ${
            isActive
              ? 'text-white dark:text-black bg-orange-500 px-2 text-lg font-semibold'
              : 'text-black dark:text-white hover:text-foreground text-lg'
          }
        `}
      >
        <Link
          href={item.url}
          onClick={() => setOpenMobile(false)}
          className="flex"
        >
          <div className="flex flex-row items-center space-x-3">
            {IconComponent && (
              <IconComponent
                className={`shrink-0 transition-all duration-100 ${
                  isActive ? 'h-5 w-5' : 'h-5 w-5'
                }`}
              />
            )}
            <span>{item.title}</span>
            {item.badge && <NavBadge>{item.badge}</NavBadge>}
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
