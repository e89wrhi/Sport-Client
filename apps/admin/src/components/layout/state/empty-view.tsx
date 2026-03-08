'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface Props {
  title?: string;
  description?: string;
  itemsname?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}
/* this is for components generic empty view like list, detail */
export default function EmptyView(props: Props) {
  const { title, description, itemsname, actionLabel, onAction, className } =
    props;
  const name = itemsname ? itemsname : 'Item';
  const title2 = 'No ' + name + ' Found';
  const description2 = 'No ' + itemsname + ' to show right now.';
  const displaytitle = title ? title : title2;
  const displaydesc = description ? description : description2;
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-16 text-center animate-in fade-in-50',
        className
      )}
    >
      <div className="mb-4">
        <Image
          src={'/empty.png'}
          height={600}
          width={600}
          alt="nolimit"
          className="h-50 w-50"
        />
      </div>
      <h3 className="text-xl font-semibold tracking-tight">{displaytitle}</h3>
      <p className="text-muted-foreground max-w-sm mt-2 mb-6 text-sm">
        {displaydesc}
      </p>
      {actionLabel && onAction && (
        <Button variant="default" onClick={onAction} className="rounded-full">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
