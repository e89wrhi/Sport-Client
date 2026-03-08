import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Metadata } from 'next';
import ms from 'ms';

import { siteConfig } from '@/config/site';
import icon from '@/assets/favicon.png';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  icons = icon.src,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    keywords: [],
    authors: [],
    creator: 'sport',
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: siteConfig.url,
      title,
      description,
      siteName: title,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: 'sport',
    },
    icons,
    metadataBase: new URL(siteConfig.url),
    manifest: `${siteConfig.url}/site.webmanifest`,
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

// formatted time for list item
export function formatDate(input: Date | null): string {
  if (!input) return 'N/A';
  var date = new Date(input);
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: '2-digit',
  });
}

export function absoluteUrl(path: string) {
  return `${path}`;
}

// Utils from precedent.dev
export const timeAgo = (timestamp: Date | null, timeOnly?: boolean): string => {
  if (!timestamp) return 'never';
  return `${ms(Date.now() - new Date(timestamp).getTime())}${
    timeOnly ? '' : ' ago'
  }`;
};

export async function fetcher<JSON = unknown>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);

  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number;
      };
      error.status = res.status;
      throw error;
    } else {
      throw new Error('An unexpected error occurred');
    }
  }

  return res.json();
}

export function nFormatter(num: number, digits?: number) {
  if (!num) return '0';
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits || 1).replace(rx, '$1') + item.symbol
    : '0';
}

export function capitalize(str: string) {
  if (!str || typeof str !== 'string') return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const truncate = (str: string, length: number) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};

export const getBlurDataURL = async (url: string | null) => {
  if (!url) {
    return 'data:image/webp;base64,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=';
  }

  if (url.startsWith('/_static/')) {
    url = `${siteConfig.url}${url}`;
  }

  try {
    const response = await fetch(
      `https://wsrv.nl/?url=${url}&w=50&h=50&blur=5`
    );
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');

    return `data:image/png;base64,${base64}`;
  } catch {
    return 'data:image/webp;base64,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=';
  }
};

export const placeholderBlurhash =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAoJJREFUWEfFl4lu4zAMRO3cx/9/au6reMaOdkxTTl0grQFCRoqaT+SQotq2bV9N8rRt28xms87m83l553eZ/9vr9Wpkz+ezkT0ej+6dv1X81AFw7M4FBACPVn2c1Z3zLgDeJwHgeLFYdAARYioAEAKJEG2WAjl3gCwNYymQQ9b7/V4spmIAwO6Wy2VnAMikBWlDURBELf8CuN1uHQSrPwMAHK5WqwFELQ01AIXdAa7XawfAb3p6AOwK5+v1ugAoEq4FRSFLgavfQ49jAGQpAE5wjgGCeRrGdBArwHOPcwFcLpcGU1X0IsBuN5tNgYhaiFFwHTiAwq8I+O5xfj6fOz38K+X/fYAdb7fbAgFAjIJ6Aav3AYlQ6nfnDoDz0+lUxNiLALvf7XaDNGQ6GANQBKR85V27B4D3QQRw7hGIYlQKWGM79hSweyCUe1blXhEAogfABwHAXAcqSYkxCtHLUK3XBajSc4Dj8dilAeiSAgD2+30BAEKV4GKcAuDqB4TdYwBgPQByCgApUBoE4EJUGvxUjF3Q69/zLw3g/HA45ABKgdIQu+JPIyDnisCfAxAFNFM0EFNQ64gfS0EUoQP8ighrZSjn3oziZEQpauyKbfjbZchHUL/3AS/Dd30gAkxuRACgfO+EWQW8qwI1o+wseNuKcQiESjALvwNoMI0TcRzD4lFcPYwIM+JTF5x6HOs8yI7jeB5oKhpMRFH9UwaSCDB2Jmg4rc6E2TT0biIaG0rQhNqyhpHBcayTTSXH6vcDL7/sdqRK8LkwTsU499E8vRcAojHcZ4AxABdilgrp4lsXk8oVqgwh7+6H3phqd8J0Kk4vbx/+sZqCD/vNLya/5dT9fAH8g1WdNGgwbQAAAABJRU5ErkJggg==';

// formatted time for detail page
export function formatDateDetail(input: Date): string {
  const date = new Date(input);
  return date.toLocaleDateString('en-US', {
    minute: '2-digit',
    hour: '2-digit',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// formatted count
export function formatCount(value: number): string {
  return Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(value);
}

type Locale = 'en' | 'zh';

const unitMap: Record<Locale, Record<string, string>> = {
  en: {
    s: 's',
    m: 'm',
    h: 'h',
    d: 'd',
    w: 'w',
    mo: 'mo',
    y: 'y',
    sd: ' seconds ago',
    md: ' minutes ago',
    hd: ' hours ago',
    dd: ' days ago',
    wd: ' weeks ago',
    mod: ' months ago',
    yd: ' years ago',
  },
  zh: {
    s: '秒前',
    m: '分钟前',
    h: '小时前',
    d: '天前',
    w: '周前',
    mo: '个月前',
    y: '年前',
    sd: '秒前',
    md: '分钟前',
    hd: '小时前',
    dd: '天前',
    wd: '周前',
    mod: '个月前',
    yd: '年前',
  },
};

// relative time for list 2mo
export function formatRelativeTime(date: Date, locale: Locale = 'en'): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  // If in the future, return formatted date
  if (date > now) {
    return date.toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', {
      month: 'short',
      year: '2-digit',
    });
  }

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const map = unitMap[locale];

  if (seconds < 60) return `${seconds}${map.s}`;
  if (minutes < 60) return `${minutes}${map.m}`;
  if (hours < 24) return `${hours}${map.h}`;
  if (days < 7) return `${days}${map.d}`;
  if (weeks < 4) return `${weeks}${map.w}`;
  if (months < 12) return `${months}${map.mo}`;
  return `${years}${map.y}`;
}

// relative time for detail 2 months ago
export function formatRelativeTimeDetail(
  date: Date,
  locale: Locale = 'en'
): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  // If in the future, return formatted date
  if (date > now) {
    return date.toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', {
      month: 'short',
      year: '2-digit',
    });
  }

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const map = unitMap[locale];

  if (seconds < 60) return `${seconds}${map.sd}`;
  if (minutes < 60) return `${minutes}${map.md}`;
  if (hours < 24) return `${hours}${map.hd}`;
  if (days < 7) return `${days}${map.dd}`;
  if (weeks < 4) return `${weeks}${map.wd}`;
  if (months < 12) return `${months}${map.mod}`;
  return `${years}${map.yd}`;
}

export function CalculateRange(range: string) {
  const currentDate = new Date();
  let from;

  switch (range) {
    case '1d':
      currentDate.setDate(currentDate.getDate() - 1);
      break;
    case '1w':
      currentDate.setDate(currentDate.getDate() - 7);
      break;
    case '1m':
      currentDate.setMonth(currentDate.getMonth() - 1);
      break;
    case '3m':
      currentDate.setMonth(currentDate.getMonth() - 3);
      break;
    case '1y':
      currentDate.setFullYear(currentDate.getFullYear() - 1);
      break;
    default:
      throw new Error(`Invalid range: ${range}`);
  }

  from = currentDate.toISOString().split('T')[0]; // format date to 'YYYY-MM-DD'
  return from;
}

export function calculateInterval(range: string) {
  let interval;

  switch (range) {
    case '1d':
      interval = '15m'; // 15 minutes
      break;
    case '1w':
    case '1m':
      interval = '1h'; // 1 hour
      break;
    case '3m':
    case '1y':
      interval = '1d'; // 1 day
      break;
    default:
      throw new Error(`Invalid range: ${range}`);
  }

  return interval;
}
