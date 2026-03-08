'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { LogIn, Heart, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AuthGuardDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  action?: 'vote' | 'predict';
}

export function AuthGuardDialog({
  isOpen,
  onOpenChange,
  action = 'vote',
}: AuthGuardDialogProps) {
  const router = useRouter();

  const handleLogin = () => {
    const currentPath =
      typeof window !== 'undefined' ? window.location.pathname : '';
    router.push(`/login?callbackUrl=${encodeURIComponent(currentPath)}`);
    onOpenChange(false);
  };

  const handleRegister = () => {
    router.push('/register');
    onOpenChange(false);
  };

  const actionConfig = {
    vote: {
      icon: <Heart className="w-12 h-12 text-red-500" />,
      title: 'Join Sports to interact',
      description: 'Sign in to vote for youre favourite Team.',
    },
    predict: {
      icon: <Sparkles className="w-12 h-12 text-blue-500" />,
      title: 'Predict Match',
      description: 'You need an account to a match with AI.',
    },
  };

  const config = actionConfig[action] || actionConfig.vote;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
        <div className="bg-gradient-to-b from-primary/5 to-transparent p-6 flex flex-col items-center text-center">
          <div className="mb-4 animate-in zoom-in-50 duration-300">
            {config.icon}
          </div>
          <DialogHeader className="items-center">
            <DialogTitle className="text-2xl font-black tracking-tight">
              {config.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-md max-w-[300px] pt-1">
              {config.description}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6 pt-0 space-y-3">
          <Button
            onClick={handleLogin}
            className="w-full h-12 rounded-full text-md font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <LogIn className="mr-2 h-5 w-5" />
            Sign In
          </Button>
          <Button
            variant="outline"
            onClick={handleRegister}
            className="w-full h-12 rounded-full text-md font-bold border-2 transition-all hover:bg-secondary hover:scale-[1.02]"
          >
            Create Account
          </Button>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="w-full rounded-full text-muted-foreground font-medium"
          >
            Maybe later
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
