'use client';

import React from 'react';
import { Spinner } from '@/components/ui/spinner';

/* this is for full page not inside components */
export default function LoadingPageView() {
  return (
    <div>
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Spinner className="h-10 w-10" />
          <p>loading...</p>
        </div>
      </div>
    </div>
  );
}
