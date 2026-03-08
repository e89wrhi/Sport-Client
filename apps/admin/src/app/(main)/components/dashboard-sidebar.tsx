'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { NavGroupp } from './dashboard-sidebar-items';
import { Icons } from '@/components/shared/icons';
import { NavGroup } from '@/types/sidebar';
import { useRouter } from 'next/navigation';
import { CircleDollarSign, LogOut, Settings } from 'lucide-react';
import { SidebarHeaderLayout } from './sidebar-header';
import SidebarFooterLayout from './sidebar-footer';
import { UserDto } from '@/types/api/user/current-user';

export const Iconss = {
  ai: Icons.add,
  tool: Icons.appdesign,
  software: Icons.business,
  site: Icons.bookOpen,
  chat: Icons.help,
  search: Icons.search,
  rich: CircleDollarSign,
};

const profile = {
  name: 'Sample Name',
  image: 'Sample Image',
  status: 'Active',
};
const mainGroup: NavGroup = {
  title: '',
  items: [
    { title: 'Home', icon: Icons.home, url: '/en', enabled: true },
    {
      title: 'Sports',
      icon: Icons.bookOpen,
      url: '/sports',
      enabled: true,
    },
  ],
};

const accountGroup: NavGroup = {
  title: 'User',
  items: profile
    ? [
        {
          title: 'Settings',
          icon: Icons.settings,
          url: '/setting',
          enabled: true,
        },
        {
          title: 'Logout',
          icon: LogOut,
          url: '/logout',
          enabled: true,
        },
      ]
    : [
        {
          title: 'Refresh',
          icon: Settings,
          url: '#',
          enabled: true,
        },
        {
          title: 'Sign Up',
          icon: LogOut,
          url: '/signup',
          enabled: true,
        },
      ],
};
interface AppSidebarProps {
  userProfile: UserDto;
}

export function AppSidebar({ userProfile: profile }: AppSidebarProps) {
  const router = useRouter();

  // Merge existing sidebar with user group
  const navGroups: NavGroup[] = [mainGroup, accountGroup];

  const handleOpenMe = () => {
    router.push(`/me`);
  };

  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      className="w-[var(--sidebar-width)]"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {/* HEADER */}
      <SidebarHeader className="border-b border-border/90 dark:border-gray-800  h-14 transition-colors duration-200">
        <SidebarHeaderLayout />
      </SidebarHeader>

      <SidebarContent className="">
        {navGroups.map((group, idx) => (
          <NavGroupp key={idx} {...group} />
        ))}
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="border-t border-border/80 p-3">
        <SidebarFooterLayout
          name={profile.name}
          image={profile.image}
          status={profile.status}
          onOpen={handleOpenMe}
        />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
