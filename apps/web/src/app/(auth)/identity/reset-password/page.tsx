'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsSuccess(true);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <AnimatePresence mode="wait">
      {isSuccess ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="text-center space-y-6 py-8"
        >
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto text-emerald-500">
            <CheckCircle2 size={40} />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              Password Reset!
            </h2>
            <p className="text-neutral-400 text-sm max-w-[280px] mx-auto leading-relaxed">
              Your password has been successfully updated. You can now log in
              with your new credentials.
            </p>
          </div>
          <div className="pt-4">
            <Button
              asChild
              className="cursor-pointer w-full h-12 bg-yellow-600 hover:bg-yellow-500 rounded-xl font-bold shadow-lg shadow-yellow-600/20 active:scale-[0.98]"
            >
              <Link href="/login">Back to Login</Link>
            </Button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="form"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div className="text-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 border">
              <Lock size={20} />
            </div>
            <h2 className="text-xl font-bold tracking-tight">New Password</h2>
            <p className="text-neutral-400 text-sm mt-1">
              Please choose a strong password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-neutral-400 uppercase tracking-wider ml-1">
                New Password
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="h-11 rounded-full focus-visible:ring-yellow-500/30 pr-11 transition-all"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors p-1"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-neutral-400 uppercase tracking-wider ml-1">
                Confirm Password
              </Label>
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="h-11 rounded-full focus-visible:ring-yellow-500/30 transition-all"
                required
                disabled={isLoading}
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer w-full h-12 hover:bg-neutral-200 rounded-full font-bold transition-all active:scale-[0.98] disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 rounded-full animate-spin" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Update Password</span>
                  </div>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
