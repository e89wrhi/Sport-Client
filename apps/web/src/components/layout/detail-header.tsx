'use client';

import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';

interface Props {
  dropdown?: ReactNode;
}
export default function DetailHeader(props: Props) {
  const router = useRouter();
  const { dropdown } = props;

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-row pt-18 items-center justify-between sticky top-0 z-10 bg-white dark:bg-black">
      <Button
        variant="ghost"
        onClick={handleGoBack}
        className="rounded-full items-center mb-4 text-xl"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        <p>Go back</p>
      </Button>

      <div className="ml-auto">{dropdown}</div>
    </div>
  );
}
