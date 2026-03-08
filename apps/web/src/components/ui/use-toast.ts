import { toast as sonnerToast, Toaster } from 'sonner';
import * as React from 'react';

interface ToastOptions {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: { label: string; onClick: () => void };
  duration?: number; // in ms
  type?: 'success' | 'error' | 'info';
}

function toast({
  title,
  description,
  action,
  duration = 5000,
  type,
}: ToastOptions) {
  const config = {
    description,
    duration,
    action,
  };

  switch (type) {
    case 'success':
      return sonnerToast.success(title || '', config);
    case 'error':
      return sonnerToast.error(title || '', config);
    case 'info':
      return sonnerToast(title || '', config);
    default:
      return sonnerToast(title || '', config);
  }
}

// Optional hook if you want access to programmatic dismissal
function useToast() {
  // Sonner manages internal state, so we just return toast functions
  return {
    toast,
    dismiss: sonnerToast.dismiss,
    //clearAll: sonnerToast.clearAll,
  };
}

export { toast, useToast, Toaster };
