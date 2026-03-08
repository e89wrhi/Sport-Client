'use client';

import React, { ElementType } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icons } from '@/components/shared/icons';
import { ChartBarBig, Goal, Music } from 'lucide-react';

export interface Topic {
  id: string;
  label: string;
  path: string;
  icon: ElementType;
  type: 'pinned' | 'generic';
}

export const topics: Topic[] = [
  // Pinned Tabs
  { id: 'home', icon: Icons.home, label: 'Home', path: '/', type: 'pinned' },

  {
    id: 'business',
    icon: ChartBarBig,
    label: 'Business',
    path: '/business',
    type: 'pinned',
  },
  {
    id: 'sport',
    icon: Goal,
    label: 'Sport',
    path: '/sports',
    type: 'pinned',
  },
  {
    id: 'entertainment',
    icon: Music,
    label: 'Entertainment',
    path: '/entertainment',
    type: 'pinned',
  },
];

export default function TopicTabs() {
  const pathname = usePathname();

  const pinnedTabs = topics.filter((t) => t.type === 'pinned');
  return (
    <div className="flex items-center space-x-2">
      {/* Pinned Tabs */}
      {pinnedTabs.map((tab) => {
        const isActive = checkIsActive(pathname, tab.path);
        const Icon = tab.icon;

        return (
          <Link
            key={tab.id}
            href={tab.path}
            className={`
        flex items-center space-x-3
        px-4 py-2 rounded-md
        transition-colors duration-200
        ${isActive ? 'text-bold underline' : ''}
      `}
          >
            {/* Icon with conditional fill */}
            <Icon
              className={`text-xl transition-colors duration-200 ${
                isActive ? 'fill-black dark:fill-white' : 'fill-none'
              }`}
            />

            {/* Label visible only on md+ screens */}
            <span className="hidden md:inline text-sm font-medium">
              {tab.label}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

function normalizePath(path: string) {
  // Remove locale (first segment like /en or /am)
  const segments = path.split('/').filter(Boolean); // remove empty segments
  if (segments.length > 0 && segments[0]?.length === 2) {
    segments.shift(); // remove locale
  }

  // Remove query params and trailing slash
  const cleanPath = '/' + segments.join('/');
  return cleanPath.endsWith('/') && cleanPath !== '/'
    ? cleanPath.slice(0, -1)
    : cleanPath;
}

function checkIsActive(href: string, itemUrl: string) {
  const current = normalizePath(href);
  const target = normalizePath(itemUrl);

  return current === target;
}
