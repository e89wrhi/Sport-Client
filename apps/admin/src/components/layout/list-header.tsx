'use client';

import React from 'react';
import { Separator } from '../ui/separator';
import { SidebarTrigger } from '../ui/sidebar';

interface Props {
  title?: string;
}
export default function ListHeader(props: Props) {
  const { title } = props;
  const title1 = title ? title : 'Items';

  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-black">
      <div className="flex flex-row my-4 pt-3 ml-5 items-center gap-4">
        <SidebarTrigger className="scale-120" />
        <p className="text-xl font-semibold">{title1}</p>
      </div>
      <Separator />
    </div>
  );
}
