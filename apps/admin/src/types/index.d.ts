import { Icons } from '@/components/shared/icons';

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  mailSupport: string;
  links: {
    twitter: string;
    github: string;
  };
}

export interface NavItem {
  title: string;
  href: string;
  badge?: number;
  disabled?: boolean;
  external?: boolean;
  authorizeOnly?: UserRole;
  icon?: keyof typeof Icons;
}

export type MainNavItem = NavItem;

export interface MarketingConfig {
  mainNav: MainNavItem[];
}

// compare plans
export type ColumnType = string | boolean | null;
export type PlansRow = { feature: string; tooltip?: string } & Record<
  (typeof plansColumns)[number],
  ColumnType
>;

// landing sections
export interface InfoList {
  icon: keyof typeof Icons;
  title: string;
  description: string;
}

export interface InfoLdg {
  title: string;
  image: string;
  description: string;
  list: InfoList[];
}

export interface FeatureLdg {
  title: string;
  description: string;
  link: string;
  icon: keyof typeof Icons;
}

export interface TestimonialType {
  name: string;
  job: string;
  image: string;
  review: string;
}
