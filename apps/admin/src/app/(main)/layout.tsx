import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { cn } from '@/lib/utils';
import { AppSidebar } from './components/dashboard-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { cookies } from 'next/headers';
import { DashboardHeader } from './components/dashboard-header';
import { getCurrentUser } from '@/lib/api/user/get-current';
import NotificationBar from '@/components/shared/notification-bar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await auth();

  // Extract accessKey from session to fetch admin profile
  // next-auth session user might have accessKey if we added it to the session callback
  const accessKey = session?.user?.id;
  // Fetch the admin profile using the authenticated user's accessKey
  const userProfile = accessKey ? await getCurrentUser() : null;
  // If session exists but no admin profile linked, don't open the portal
  if (!userProfile) {
    redirect('/login?error=SessionNotFound');
  }

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

  return (
    <div className="flex flex-col min-h-screen">
      <NotificationBar />
      <SidebarProvider
        defaultOpen={defaultOpen}
        className="flex bg-white dark:bg-black flex-1"
      >
        <AppSidebar userProfile={userProfile} />
        <div
          id="content"
          className={cn(
            'ml-auto w-full max-w-full',
            'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
            'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
            'sm:transition-[width] sm:duration-200 sm:ease-linear',
            'flex h-svh flex-col',
            'group-data-[scroll-locked=1]/body:h-full',
            'has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh'
          )}
        >
          <DashboardHeader className="" />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
