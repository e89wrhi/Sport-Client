'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { NavGroupp } from './dashboard-sidebar-items';
import { Icons } from '@/components/shared/icons';
import { NavGroup } from '@/types/sidebar';
import { useRouter } from 'next/navigation';
import { 
  CircleDollarSign, 
  LogOut, 
  Settings, 
  LayoutDashboard, 
  Trophy, 
  Users as UsersIcon, 
  BarChart3, 
  Calendar,
  ShieldCheck,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { SidebarHeaderLayout } from './sidebar-header';
import SidebarFooterLayout from './sidebar-footer';
import { UserDto } from '@/types/api/user/current-user';

const mainGroup: NavGroup = {
  title: 'Overview',
  items: [
    { title: 'Dashboard', icon: LayoutDashboard, url: '/', enabled: true },
    { title: 'Real-time Feed', icon: Icons.trend, url: '/feed', enabled: true },
    { title: 'Performance', icon: BarChart3, url: '/performance', enabled: true },
  ],
};

const sportsGroup: NavGroup = {
  title: 'Sports Management',
  items: [
    { title: 'All Matches', icon: Icons.sport, url: '/sports', enabled: true },
    { title: 'Tournaments', icon: Trophy, url: '/tournaments', enabled: true, badge: '3' },
    { title: 'Teams & Players', icon: UsersIcon, url: '/teams', enabled: true },
    { title: 'Schedule', icon: Calendar, url: '/schedule', enabled: true },
  ],
};

const managementGroup: NavGroup = {
  title: 'Administration',
  items: [
    { title: 'Users Control', icon: ShieldCheck, url: '/users', enabled: true },
    { title: 'Messages', icon: MessageSquare, url: '/messages', enabled: true, badge: 'New' },
    { title: 'Revenue', icon: CircleDollarSign, url: '/revenue', enabled: true },
  ],
};

const accountGroup: NavGroup = {
  title: 'System',
  items: [
    {
      title: 'Settings',
      icon: Settings,
      url: '/setting',
      enabled: true,
    },
    {
      title: 'Logout',
      icon: LogOut,
      url: '/logout',
      enabled: true,
    },
  ],
};

interface AppSidebarProps {
  userProfile: UserDto;
}

export function AppSidebar({ userProfile: profile }: AppSidebarProps) {
  const router = useRouter();

  const navGroups: NavGroup[] = [
    mainGroup, 
    sportsGroup, 
    managementGroup, 
    accountGroup
  ];

  const handleOpenMe = () => {
    router.push(`/me`);
  };

  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      className="w-[var(--sidebar-width)] border-r border-border/50"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {/* HEADER */}
      <SidebarHeader className="h-16 flex items-center justify-center">
        <SidebarHeaderLayout />
      </SidebarHeader>

      <SidebarContent className="px-2 py-4 gap-0">
        {navGroups.map((group, idx) => (
          <NavGroupp key={idx} {...group} />
        ))}
        
        {/* Decorative Upgrade Card in Sidebar */}
        <SidebarGroup className="mt-4 px-2 lg:block hidden">
          <div className="rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-4 border border-primary/10 relative overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-500">
             <div className="relative z-10">
               <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Pro Plan</span>
               <h4 className="text-xs font-bold mt-1">Unlock Advanced ML</h4>
               <p className="text-[10px] text-muted-foreground mt-1 leading-relaxed">Get predictive analytics for all upcoming matches.</p>
               <div className="mt-3 flex items-center text-xs font-bold text-primary animate-pulse">
                 Learn more <ChevronRight className="h-3 w-3 ml-0.5" />
               </div>
             </div>
             <ShieldCheck className="absolute -bottom-2 -right-2 h-12 w-12 text-primary/10 group-hover:scale-125 transition-transform duration-500" />
          </div>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="border-t border-border/50 p-4 bg-muted/20">
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
