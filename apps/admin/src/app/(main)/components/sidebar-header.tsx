import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function SidebarHeaderLayout() {
  const { open, setOpen } = useSidebar();

  return (
    <Button
      variant={'ghost'}
      onClick={() => setOpen(!open)}
      className="flex text-yellow-500 items-center font-bold text-xl tracking-tight hover:scale-110 transition"
    >
      {/* ICON / LOGO */}
      <div className="flex h-8 w-8 ml-2 items-center justify-center shrink-0">
        <Image
          src="/sport.png"
          alt="Logo"
          width={32}
          height={32}
          className="h-8 w-8 rounded-full object-cover"
        />
      </div>

      {/* TITLE – auto hidden when collapsed */}
      <span
        className={cn(
          'whitespace-nowrap transition-all uppercase duration-200',
          !open && 'opacity-0 w-0 overflow-hidden'
        )}
      >
        Sports
      </span>
    </Button>
  );
}
