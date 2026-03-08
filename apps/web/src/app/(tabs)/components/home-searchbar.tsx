'use client';

import { Search } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function HomeSearchBar() {
  return (
    <div className="flex justify-center my-5 mt-15">
      <Link href="/search" className="mr-15 flex flex-1 items-center space-x-1">
        <div
          className="cursor-pointer flex flex-row w-full max-w-2xl rounded-full bg-neutral-200 dark:bg-neutral-800
                                 px-5 py-3 items-center my-3 space-x-3"
        >
          <Search className="h-5 w-5" />
          <p>Search what&apos;s happening...</p>
        </div>
      </Link>
    </div>
  );
}
