'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'motion/react';
import { Chrome } from 'lucide-react';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const error = searchParams.get('error');

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.95 }}
            className={`p-3 rounded-xl border text-sm font-medium overflow-hidden ${
              error === 'RegistrationSuccess' || error === 'LogoutSuccess'
                ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400'
                : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}
          >
            {error === 'RegistrationSuccess'
              ? 'Account created successfully! Please sign in.'
              : error === 'LogoutSuccess'
                ? 'You have been signed out successfully.'
                : error === 'AccessDenied' || error === 'MissingRequiredRole'
                  ? 'Access denied. Missing required permissions.'
                  : error === 'Configuration'
                    ? 'Server configuration error.'
                    : error === 'OAuthCallbackError'
                      ? 'Authentication failed during the login flow.'
                      : 'Authentication failed. Please try again.'}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div variants={itemVariants} className="space-y-4">
        <Button
          onClick={() => signIn('google')}
          variant="outline"
          className="cursor-pointer w-full h-12 transition-all duration-300 rounded-full flex items-center justify-center gap-3 group"
          disabled={isLoading}
        >
          <Chrome className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          <span className="font-semibold">Continue with Google</span>
        </Button>

        <div className="relative flex items-center justify-center py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t" />
          </div>
          <span className="relative px-4 text-[10px] font-bold text-neutral-500 uppercase tracking-widest backdrop-blur-xl">
            Or
          </span>
        </div>
      </motion.div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setIsLoading(true);
          const formData = new FormData(e.currentTarget);
          await signIn('credentials', {
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            callbackUrl: '/',
            redirect: true,
          });
        }}
        className="space-y-4"
      >
        <motion.div variants={itemVariants} className="space-y-1.5">
          <Label
            htmlFor="email"
            className="text-xs font-bold text-neutral-400 uppercase tracking-wider ml-1"
          >
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            className="h-12 rounded-full focus-visible:ring-yellow-500/30 px-4 py-2 transition-all duration-300"
            required
            disabled={isLoading}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-1.5">
          <div className="flex justify-between items-center px-1">
            <Label
              htmlFor="password"
              className="text-xs font-bold text-neutral-400 uppercase tracking-wider"
            >
              Password
            </Label>
            <Link
              href="/identity/forgot-password"
              className="text-[10px] font-bold text-yellow-400/80 hover:text-yellow-400 transition-colors uppercase tracking-wider"
            >
              Forgot?
            </Link>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••••••"
            className="h-12 rounded-full focus-visible:ring-yellow-500/30 px-4 py-2 transition-all duration-300"
            required
            disabled={isLoading}
          />
        </motion.div>

        <motion.div variants={itemVariants} className="pt-2">
          <Button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer w-full h-12 bg-yellow-500 hover:bg-yellow-600 rounded-full font-bold shadow-lg shadow-yellow-600/20 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 rounded-full animate-spin" />
                <span>Signing in...</span>
              </div>
            ) : (
              'Sign in'
            )}
          </Button>
        </motion.div>
      </form>

      <motion.div variants={itemVariants} className="pt-6 border-t text-center">
        <p className="text-sm text-neutral-500">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="cursor-pointer text-yellow-400 font-bold hover:text-yellow-300 transition-colors"
          >
            Create one for free
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}
