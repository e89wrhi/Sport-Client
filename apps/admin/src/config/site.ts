import { SiteConfig } from '@/types';
import { env } from '@/../env.mjs';
import icon from '@/assets/favicon.png';

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: 'SnowBall Admin',
  description: ' SnowBall admin portal',
  url: site_url,
  ogImage: icon.src,
  links: {
    twitter: 'https://twitter.com/snowball',
    github: 'https://github.com/snowball',
  },
  mailSupport: 'support@snowball.com',
};
