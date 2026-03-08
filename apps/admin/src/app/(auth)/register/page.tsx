'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'motion/react';

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Check if we are in mock mode - strictly for dev
    // In production, this should always redirect to the real Identity Provider
    const isMock = process.env.NODE_ENV === 'development'; // Simplified check, ideally check env var

    if (!isMock) {
      // Real Keycloak/Duende Registration URL
      // This should be constructed based on your IDP configuration
      const issuer =
        process.env.NEXT_PUBLIC_AUTH_DUENDE_ISSUER || 'https://localhost:5001';
      window.location.href = `${issuer}/Account/Register?returnUrl=${encodeURIComponent(window.location.origin)}`;
      return;
    }

    // Simulate API call delay for Mock Mode
    setTimeout(() => {
      // In a real app, you would create the user via API
      console.log('Mock Registration Successful');

      // Redirect to login with success message
      // We use a query param so the login page can show a toast/alert
      window.location.href = '/login?error=RegistrationSuccess';
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black selection:bg-indigo-500/30">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[25%] -left-[10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[25%] -right-[10%] w-[50%] h-[50%] bg-purple-500/10 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="p-8 bg-neutral-900/50 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Create Admin Account
            </h2>
            <p className="mt-2 text-neutral-400">
              Join the sport administration team
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider ml-1 block">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="John"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider ml-1 block">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Doe"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider ml-1 block">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="admin@gmail.com"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider ml-1 block">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider ml-1 block">
                  Access Code
                </label>
                <input
                  type="text"
                  name="accessCode"
                  placeholder="Invitation Code (Optional)"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                'Continue to Registration'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-sm text-neutral-500">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-neutral-600 uppercase tracking-[0.2em]">
          Journal Admin Protocol v1.0
        </p>
      </motion.div>
    </div>
  );
}
