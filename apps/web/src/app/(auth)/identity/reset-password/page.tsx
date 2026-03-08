'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

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

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full p-12 bg-neutral-900 border border-white/5 rounded-3xl text-center shadow-2xl"
        >
          <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-orange-500">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Password reset!
          </h2>
          <p className="text-neutral-400 mb-10">
            Your password has been successfully updated. You can now log in with
            your new credentials.
          </p>
          <Link
            href="/login"
            className="block w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-indigo-500/20"
          >
            Back to Login
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[100px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full px-4"
      >
        <div className="p-10 bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden shadow-indigo-500/5">
          <div className="mb-10 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10">
              <Lock size={24} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Create New Password
            </h2>
            <p className="text-neutral-500 text-sm">
              Choose a strong password to protect your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] ml-1">
                  New Password
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full px-5 py-4 bg-black border border-white/5 rounded-2xl text-white placeholder:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all group-hover:border-white/20"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] ml-1">
                  Confirm Password
                </label>
                <div className="relative group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full px-5 py-4 bg-black border border-white/5 rounded-2xl text-white placeholder:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all group-hover:border-white/20"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-white text-black hover:invert rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-[0.98] disabled:opacity-50 ring-offset-4 ring-offset-black transition-all"
            >
              {isLoading ? 'Saving...' : 'Confirm New Password'}
            </button>
          </form>

          <div className="mt-8 flex justify-center gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-1 w-8 rounded-full bg-white/10" />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
