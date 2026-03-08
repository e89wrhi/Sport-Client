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

interface DeleteDialogProps {
  open: boolean;
  name: string;
  published: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function PublishDialog(props: DeleteDialogProps) {
  const { open, onCancel, name, published, onConfirm } = props;

  const btn = published ? 'Unpublish' : 'Publish';
  const title = published ? 'Unpublish Item' : 'Publish Item';
  const text = published
    ? `Make ${name} inaccessable to public.`
    : `Make ${name} accessable to public`;

  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogTrigger asChild>
        <Button className="rounded-full" variant="secondary">
          {btn}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{text}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="default"
            className="w-full rounded-full"
            onClick={onConfirm}
          >
            {btn}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
