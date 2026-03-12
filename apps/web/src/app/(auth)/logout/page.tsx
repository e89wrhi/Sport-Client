'use client';

import { Suspense, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { getDuendeLogoutUrl } from '@/auth/actions';
import { motion } from 'motion/react';

function LogoutContent() {
  useEffect(() => {
    const handleLogout = async () => {
      try {
        const duendeLogoutUrl = await getDuendeLogoutUrl();
        await signOut({ redirect: false });

        if (duendeLogoutUrl) {
          window.location.href = duendeLogoutUrl;
        } else {
          window.location.href = '/login?error=LogoutSuccess';
        }
      } catch (error) {
        console.error('Logout error:', error);
        window.location.href = '/login';
      }
    };

    handleLogout();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center space-y-4 py-8"
    >
      <div className="w-12 h-12 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin mx-auto" />
      <div className="space-y-1">
        <p className="text-sm font-bold tracking-widest">Signing Out</p>
        <p className="text-xs text-neutral-500">Securing your session...</p>
      </div>
    </motion.div>
  );
}

export default function LogoutPage() {
  return (
    <Suspense>
      <LogoutContent />
    </Suspense>
  );
}
