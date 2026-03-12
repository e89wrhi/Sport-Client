'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Mail, Send } from 'lucide-react';

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
    <div className="space-y-6">
      <Link
        href="/login"
        className="cursor-pointer inline-flex items-center gap-2 text-[10px] font-bold text-neutral-500 hover:text-neutral-300 transition-colors group uppercase tracking-widest"
      >
        <ChevronLeft
          size={14}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Back to Sign In
      </Link>

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-xl font-bold mb-2">Forgot Password?</h2>
              <p className="text-sm text-neutral-400">
                Enter your email address to receive reset instructions.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1.5">
                <Label
                  htmlFor="email"
                  className="text-xs font-bold text-neutral-400 uppercase tracking-wider ml-1"
                >
                  Email Address
                </Label>
                <div className="relative">
                  <Mail
                    size={16}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500"
                  />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="h-12 rounded-full focus-visible:ring-yellow-500/30 pl-11 transition-all"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="cursor-pointer w-full h-12 hover:bg-neutral-200 rounded-full font-bold transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 rounded-full animate-spin" />
                    <span>Requesting...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    <span>Send Reset Instructions</span>
                  </div>
                )}
              </Button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-4 text-center space-y-4"
          >
            <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-2 text-yellow-400">
              <Mail size={28} />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">Check your inbox</h2>
              <p className="text-sm text-neutral-400 max-w-[280px] mx-auto leading-relaxed">
                We&apos;ve sent password reset instructions to your email
                address.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setIsSubmitted(false)}
                className="cursor-pointer text-yellow-400 hover:text-yellow-300 font-bold text-xs uppercase tracking-widest transition-colors"
              >
                Didn&apos;t receive it? Try again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
