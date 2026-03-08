'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Mail } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Logic to trigger password reset via Keycloak or backend
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black selection:bg-indigo-500/30">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[40%] h-[40%] bg-blue-500/5 blur-[100px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full px-4"
      >
        <div className="p-8 bg-neutral-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-3xl overflow-hidden relative">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-white transition-colors mb-8 group"
          >
            <ChevronLeft
              size={16}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Login
          </Link>

          {!isSubmitted ? (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Forgot Password?
                </h2>
                <p className="text-neutral-400">
                  Enter your email and we&apos;ll send you a link to reset your
                  password.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-neutral-400 uppercase tracking-widest ml-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                    />
                    <input
                      type="email"
                      placeholder="user@gmail.com"
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all shadow-inner"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-white text-black hover:bg-neutral-200 rounded-2xl font-bold transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? 'Requesting...' : 'Reset Password'}
                </button>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-8 text-center"
            >
              <div className="w-20 h-20 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail size={32} className="text-indigo-400" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Check your email
              </h2>
              <p className="text-neutral-400 mb-8">
                We&apos;ve sent password reset instructions to your email
                address.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
              >
                Didn&apos;t receive it? Try again
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
