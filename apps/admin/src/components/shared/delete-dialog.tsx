import { Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useState } from 'react';

interface DeleteDialogProps {
  open: boolean;
  name: string;
  confirmKey?: string | null;
  onCancel: () => void;
  onConfirm: () => void;
  notrigger?: boolean | null;
}

export function DeleteDialog(props: DeleteDialogProps) {
  const { open, onCancel, name, confirmKey, onConfirm, notrigger } = props;
  const [inputKey, setInputKey] = useState('');
  const isMatch = confirmKey == null || inputKey == confirmKey;

  const handleOnCancel = () => {
    setInputKey('');
    onCancel();
  };

  return (
    <Dialog open={open} onOpenChange={handleOnCancel}>
      {!notrigger && (
        <DialogTrigger asChild>
          <Button className="rounded-full" variant="destructive">
            Delete
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            <span className="font-semibold text-foreground"> {name}</span> item.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {confirmKey && (
            <div className="space-y-2 text-sm">
              <Label
                className="font-none text-muted-foreground items-center"
                htmlFor="verification"
              >
                To verify, type{' '}
                <span className="text-xl text-black dark:text-white font-bold">
                  {confirmKey}
                </span>{' '}
                below:
              </Label>
              <Input
                id="verification"
                value={inputKey}
                autoComplete="off"
                onChange={(e) => setInputKey(e.target.value)}
                className="bg-background"
                autoFocus
              />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            variant="destructive"
            className="w-full rounded-full"
            disabled={!isMatch}
            onClick={onConfirm}
          >
            <Trash2 className="mr-2 h-4 w-4" />I understand the consequences,
            delete this item
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
