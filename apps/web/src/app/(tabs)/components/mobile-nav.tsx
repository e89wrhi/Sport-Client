'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  History,
  CreditCardIcon,
  LogOutIcon,
  Menu,
  SaveAll,
  SettingsIcon,
  UserIcon,
  X,
} from 'lucide-react';

//import { docsConfig } from '@/config/';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
//import { DocsSidebarNav } from '@/components/docs/sidebar-nav';
import { Icons } from '@/components/shared/icons';
import { ModeToggle } from '@/components/shared/mode-toggle';
import { UserDto } from '@/types/api/user/current-user';
import Image from 'next/image';
import { topics } from './nav-tabs';
import { getDuendeLogoutUrl } from '@/auth';
import { signOut } from 'next-auth/react';

interface Props {
  userProfile: UserDto | null;
}
export function SportNavMobile({ userProfile: profile }: Props) {
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    //const logoutTraceId = uuidv4();
    try {
      const duendeLogoutUrl = await getDuendeLogoutUrl();
      await signOut({ redirect: false });
      if (duendeLogoutUrl) {
        window.location.href = duendeLogoutUrl;
      } else {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Logout error:', error);
      window.location.href = '/login';
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'fixed right-2 top-2.5 z-50 rounded-full p-2 transition-colors duration-200 hover:bg-muted focus:outline-none active:bg-muted md:hidden',
          open && 'hover:bg-muted active:bg-muted text-foreground'
        )}
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      <nav
        className={cn(
          'fixed inset-0 z-40 hidden w-full flex-col overflow-auto bg-background px-6 py-20 md:hidden',
          open && 'flex'
        )}
      >
        <div className="flex flex-col space-y-6">
          {/* User Profile Section */}
          <div className="flex flex-col space-y-4">
            {profile ? (
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-border">
                    <Image
                      fill
                      src={profile.image || '/_avatars/a1.png'}
                      alt="User avatar"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold">{profile.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {profile.status}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/me"
                    onClick={() => setOpen(false)}
                    className="flex items-center space-x-2 rounded-lg bg-muted/50 p-2 text-sm font-medium"
                  >
                    <UserIcon className="h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setOpen(false)}
                    className="flex items-center space-x-2 rounded-lg bg-muted/50 p-2 text-sm font-medium"
                  >
                    <SettingsIcon className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <p className="text-sm text-muted-foreground">
                  Welcome to Tribal Journal
                </p>
                <div className="flex space-x-2">
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-lg bg-primary px-4 py-2 text-center text-sm font-medium text-primary-foreground"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="flex-1 rounded-lg border border-input bg-background px-4 py-2 text-center text-sm font-medium hover:bg-accent"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="h-px bg-border" />

          {/* Topics Navigation */}
          <div className="flex flex-col space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Exploration
            </span>
            {topics.map((topic) => {
              const Icon = topic.icon;
              return (
                <Link
                  key={topic.id}
                  href={topic.path}
                  onClick={() => setOpen(false)}
                  className="flex items-center space-x-3 rounded-lg p-2 text-lg font-medium transition-colors hover:bg-muted"
                >
                  <Icon className="h-5 w-5" />
                  <span>{topic.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Account Extras (if logged in) */}
          {profile && (
            <>
              <div className="h-px bg-border" />
              <div className="flex flex-col space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Account
                </span>
                <Link
                  href="/saved"
                  onClick={() => setOpen(false)}
                  className="flex items-center space-x-3 rounded-lg p-2 text-base font-medium transition-colors hover:bg-muted"
                >
                  <SaveAll className="h-5 w-5" />
                  <span>Saved Items</span>
                </Link>
                <Link
                  href="/history"
                  onClick={() => setOpen(false)}
                  className="flex items-center space-x-3 rounded-lg p-2 text-base font-medium transition-colors hover:bg-muted"
                >
                  <History className="h-5 w-5" />
                  <span>History</span>
                </Link>
                <Link
                  href="/subscription"
                  onClick={() => setOpen(false)}
                  className="flex items-center space-x-3 rounded-lg p-2 text-base font-medium transition-colors hover:bg-muted"
                >
                  <CreditCardIcon className="h-5 w-5" />
                  <span>Subscription</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 rounded-lg p-2 text-base font-medium text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <LogOutIcon className="h-5 w-5" />
                  <span>Log out</span>
                </button>
              </div>
            </>
          )}

          <div className="h-px bg-border" />

          {/* Bottom Bar */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <Icons.gitHub className="size-6 text-muted-foreground hover:text-foreground" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
            <ModeToggle />
          </div>
        </div>
      </nav>
    </div>
  );
}
