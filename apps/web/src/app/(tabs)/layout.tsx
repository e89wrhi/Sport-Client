import { getCurrentUser } from '@/lib/api/user/get-current';
import { SportNavMobile } from './components/mobile-nav';
import { SportNavBar } from './components/navbar';
import { auth } from '@/auth';

interface SportLayoutProps {
  children: React.ReactNode;
}

export default async function SportLayout({ children }: SportLayoutProps) {
  const session = await auth();
  // Extract user ID from session to fetch admin profile
  const userId = session?.user?.id;

  // Fetch the user profile using the authenticated user's admin ID
  const userProfile = userId
    ? await getCurrentUser({ token: session?.accessToken })
    : null;

  return (
    <div className="flex w-full min-h-screen">
      <SportNavBar userProfile={userProfile} />
      <SportNavMobile userProfile={userProfile} />
      <div className="w-full flex-1">{children}</div>
    </div>
  );
}
