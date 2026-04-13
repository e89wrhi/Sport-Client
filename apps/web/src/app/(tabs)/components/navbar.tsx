'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MainNavOptions } from '../../../components/layout/main-nav-options';
import { UserDto } from '@/types/api/user/current-user';

interface NavBarProps {
  scroll?: boolean;
  large?: boolean;
  userProfile: UserDto | null;
}

export function SportNavBar({ userProfile }: NavBarProps) {
  return (
    <header
      className={`fixed flex justify-between px-10 py-5 top-0 z-40 w-full items-center transition-all
        bg-white dark:bg-black`}
    >
      <div className="">
        <Link
          href={'/'}
          className="flex flex-row font-black text-3xl items-center space-x-3 group"
        >
          <Image
            height={50}
            width={50}
            alt="logo"
            src={'/logo.png'}
            className="h-10 w-10"
          />
          <p>Sports</p>
        </Link>
      </div>
      <MainNavOptions userProfile={userProfile} />
    </header>
  );
}
