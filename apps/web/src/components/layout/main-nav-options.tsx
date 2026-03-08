'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import {
  UserIcon,
  LogOutIcon,
  SunIcon,
  MoonIcon,
  LogIn,
  UserPlus,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { UserDto } from '@/types/api/user/current-user';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { getDuendeLogoutUrl } from '@/auth/actions';
import { signOut } from 'next-auth/react';

interface Props {
  userProfile: UserDto | null;
}
export function MainNavOptions(params: Props) {
  const { setTheme, theme } = useTheme();
  const { userProfile: profile } = params;
  const router = useRouter();

  const handleOpenProfile = () => {
    router.push(`/account`);
  };

  const handleLogout = async () => {
    // Generate trace ID for the logout event
    const logoutTraceId = uuidv4();
    console.log(`[Logout] Initiated - Trace ID: ${logoutTraceId}`);

    try {
      // 1. Get the Duende logout URL (requires server-side session access)
      const duendeLogoutUrl = await getDuendeLogoutUrl();

      // 2. Sign out locally (clears Next.js session cookies)
      await signOut({ redirect: false });

      // 3. Redirect to Duende to clear its session
      if (duendeLogoutUrl) {
        window.location.href = duendeLogoutUrl;
      } else {
        // Fallback if no Duende session found
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Logout error:', error);
      window.location.href = '/login';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-9 w-9 overflow-hidden rounded-full border border-border"
        >
          {profile?.image ? (
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={profile.image}
                alt={profile.name}
                className="object-cover"
              />
              <AvatarFallback className="text-xl">
                {profile.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <UserIcon className="h-5 w-5 text-neutral-500" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        align="end"
        className="border-none w-56"
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1 p-2">
            <p className="text-sm font-medium leading-none">
              {profile ? profile.name : 'Guest User'}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {profile ? profile.status : 'Log in to sync your data'}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {profile ? (
          <DropdownMenuGroup className="space-y-1">
            <DropdownMenuItem onClick={handleOpenProfile}>
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        ) : (
          <DropdownMenuGroup className="space-y-1">
            <DropdownMenuItem onClick={() => router.push('/login')}>
              <LogIn className="mr-2 h-4 w-4" />
              <span>Log in</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('/register')}>
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Sign up</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {/* Theme Toggle */}
          <DropdownMenuItem
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? (
              <SunIcon className="mr-2 h-4 w-4" />
            ) : (
              <MoonIcon className="mr-2 h-4 w-4" />
            )}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {profile && (
          <DropdownMenuItem
            onClick={handleLogout}
            className="p-2 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950"
          >
            <LogOutIcon className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
