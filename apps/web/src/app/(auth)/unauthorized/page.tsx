'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function UnauthorizedPage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6"
    >
      <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-500">
        <ShieldAlert size={40} />
      </div>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold uppercase tracking-tight">
          Access Denied
        </h1>
        <p className="text-neutral-400 text-sm max-w-[280px] mx-auto leading-relaxed">
          You don&apos;t have the necessary permissions to access this area. If
          you believe this is an error, please contact support.
        </p>
      </div>

      <div className="pt-4">
        <Button
          asChild
          className="cursor-pointer w-full h-12 hover:bg-neutral-200 rounded-full font-bold transition-all shadow-lg active:scale-[0.98]"
        >
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft size={18} />
            Return to Safety
          </Link>
        </Button>
      </div>

      <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest pt-2">
        Error 403 • Unauthorized
      </p>
    </motion.div>
  );
}
