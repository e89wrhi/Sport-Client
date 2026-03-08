'use client';

import { cn } from '@/lib/utils';
import { Spinner } from '../../ui/spinner';

interface Props {
  itemsname?: string;
}
/* this is for components generic loading view like list, detail components
   not for the page loading */
export default function LoadingView(props: Props) {
  const { itemsname } = props;
  const name = itemsname ? 'loading ' + itemsname + '...' : '';
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-16 text-center animate-in fade-in-50'
      )}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <Spinner className="h-8 w-8" />
        {name && <p>{name}</p>}
      </div>
    </div>
  );
}
