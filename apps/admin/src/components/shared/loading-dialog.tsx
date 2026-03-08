import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Loader2 } from 'lucide-react';

type ActivityType = 'delete' | 'publish' | 'unpublish';
interface Props {
  name: string;
  type: ActivityType;
  isLoading: boolean;
}

const TITLE_BY_KEY: Record<ActivityType, string> = {
  delete: 'Delete Item.',
  publish: 'Publish Item',
  unpublish: 'Unpublish Item',
};

const TEXT_BY_KEY: Record<ActivityType, string> = {
  delete: 'Deleting ',
  publish: 'Publishing ',
  unpublish: 'Unpublishing ',
};

export default function LoadingDialog(props: Props) {
  const { name, type, isLoading } = props;
  const title = TITLE_BY_KEY[type];
  const text = TEXT_BY_KEY[type];
  return (
    <Dialog open={isLoading}>
      <DialogContent className="sm:max-w-[400px] flex flex-col items-center justify-center py-10 outline-none border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle>
            <h3 className="mt-6 text-lg font-semibold">{title}</h3>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
          <div className="relative flex items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin" />
          </div>
          <p className="text-sm line-clamp-1 text-muted-foreground mt-1">
            {text}
            <span className="font-mono">{name}</span>...
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
