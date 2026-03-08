'use client';

import { Suspense, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { getDuendeLogoutUrl } from '@/auth/actions';

function LogoutContent() {
  useEffect(() => {
    const handleLogout = async () => {
      try {
        // 1. Get the Duende logout URL (server-side action)
        const duendeLogoutUrl = await getDuendeLogoutUrl();

        // 2. Sign out locally
        await signOut({ redirect: false });

        // 3. Redirect to Identity Provider logout or Login page
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

    handleLogout();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center space-y-4">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-white rounded-full animate-spin mx-auto" />
        <p className="text-sm font-medium text-neutral-400">
          Signing out securely...
        </p>
      </div>
    </div>
  );
}

export default function LogoutPage() {
  return (
    <Suspense>
      <LogoutContent />
    </Suspense>
  );
}
