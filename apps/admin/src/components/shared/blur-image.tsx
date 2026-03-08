'use client';

import { useState } from 'react';
import type { ComponentProps } from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

export default function BlurImage(props: ComponentProps<typeof Image>) {
  const [isLoading, setLoading] = useState(true);
  const { alt, className } = props;

  return (
    <Image
      {...props}
      alt={alt}
      className={cn(
        className,
        'duration-500 ease-in-out',
        isLoading ? 'blur-sm' : 'blur-0'
      )}
      onLoad={() => setLoading(false)}
    />
  );
}
