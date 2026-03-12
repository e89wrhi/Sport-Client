'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion } from 'motion/react';
import { UserPlus, Mail, Lock, Code2 } from 'lucide-react';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const isMock = process.env.NODE_ENV === 'development';

    if (!isMock) {
      const issuer =
        process.env.NEXT_PUBLIC_AUTH_DUENDE_ISSUER || 'https://localhost:5001';
      window.location.href = `${issuer}/Account/Register?returnUrl=${encodeURIComponent(window.location.origin)}`;
      return;
    }

    setTimeout(() => {
      console.log('Mock Registration Successful');
      window.location.href = '/login?error=RegistrationSuccess';
    }, 1500);
  };

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
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <div className="text-center mb-5">
        <h2 className="text-xl font-bold">Create Account</h2>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <motion.div variants={itemVariants} className="space-y-1.5">
            <Label
              htmlFor="firstName"
              className="text-xs font-bold text-neutral-400 uppercase tracking-wider ml-1"
            >
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              placeholder="John"
              className="h-11 rounded-full focus-visible:ring-yellow-500/30 transition-all"
              required
              disabled={isLoading}
            />
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-1.5">
            <Label
              htmlFor="lastName"
              className="text-xs font-bold text-neutral-400 uppercase tracking-wider ml-1"
            >
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              placeholder="Doe"
              className="h-11 rounded-full focus-visible:ring-yellow-500/30 transition-all"
              required
              disabled={isLoading}
            />
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="space-y-1.5">
          <Label
            htmlFor="email"
            className="text-xs font-bold text-neutral-400 uppercase tracking-wider ml-1"
          >
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="user@journal.com"
              className="h-11 rounded-full focus-visible:ring-yellow-500/30 pl-10 transition-all"
              required
              disabled={isLoading}
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-1.5">
          <Label
            htmlFor="password"
            className="text-xs font-bold text-neutral-400 uppercase tracking-wider ml-1"
          >
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••••••"
              className="h-11 rounded-full focus-visible:ring-yellow-500/30 pl-10 transition-all"
              required
              disabled={isLoading}
            />
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-1.5">
          <Label
            htmlFor="accessCode"
            className="text-xs font-bold text-neutral-400 uppercase tracking-wider ml-1"
          >
            Access Code{' '}
            <span className="text-[10px] text-neutral-600 font-normal opacity-70">
              (Optional)
            </span>
          </Label>
          <div className="relative">
            <Code2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <Input
              id="accessCode"
              name="accessCode"
              placeholder="INVITE-2024"
              className="h-11 rounded-full focus-visible:ring-yellow-500/30 pl-10 transition-all"
              disabled={isLoading}
            />
          </div>
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
                <span>Creating Account...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                <span>Create Account</span>
              </div>
            )}
          </Button>
        </motion.div>
      </form>

      <motion.div variants={itemVariants} className="pt-6 border-t text-center">
        <p className="text-sm text-neutral-500">
          Already have an account?{' '}
          <Link
            href="/login"
            className="cursor-pointer text-yellow-400 font-bold hover:text-yellow-300 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}
